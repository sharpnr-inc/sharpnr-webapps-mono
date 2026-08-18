// CI/CD for every app in this monorepo.
//
// Only the apps affected by a push are built and deployed:
//   - change one app        -> that app alone goes out
//   - change packages/ui    -> every app that depends on it goes out
//   - change nothing shared -> the pipeline exits early, touching nothing
//
// "Affected" is derived from the real dependency graph (each app's
// package.json), not from hand-written path rules.

pipeline {
    agent any

    tools {
        nodejs 'node-20'
    }

    environment {
        WEB_BASE    = '/var/www'
        BACKUP_BASE = '/media/sharpnrllpDrive/sharpnr-webapps-backup'
        // The last commit that deployed successfully. Diffing against this
        // rather than HEAD~1 means a failed build never strands an app on a
        // stale bundle: the next green run picks up everything since the last
        // good deploy.
        MARKER      = '/var/www/.sharpnr-last-deploy'
        STORE_DIR   = '/var/lib/jenkins/.pnpm-store'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        // Builds are serialized (turbo concurrency 1) on a memory-tight host, so
        // a wedged run would otherwise block every later deploy indefinitely.
        timeout(time: 45, unit: 'MINUTES')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                // Diffing needs real history; Jenkins clones shallow by default.
                sh '''
                    if [ "$(git rev-parse --is-shallow-repository)" = "true" ]; then
                        git fetch --unshallow --no-tags origin || true
                    fi
                    git fetch --no-tags origin +refs/heads/main:refs/remotes/origin/main
                '''
            }
        }

        stage('Setup') {
            steps {
                sh '''
                    corepack enable pnpm
                    pnpm config set store-dir "$STORE_DIR"
                    pnpm install --frozen-lockfile
                '''
                script {
                    env.TIMESTAMP = sh(
                        script: 'date +"%Y%m%d_%H%M%S"', returnStdout: true
                    ).trim()

                    env.BASE = sh(
                        script: '''
                            if [ -f "$MARKER" ] && git cat-file -e "$(cat $MARKER)^{commit}" 2>/dev/null; then
                                cat "$MARKER"
                            else
                                echo "origin/main~1"
                            fi
                        ''',
                        returnStdout: true
                    ).trim()

                    echo "Diffing against: ${env.BASE}"
                }
            }
        }

        stage('Plan') {
            steps {
                script {
                    env.DEPLOY_PLAN = sh(
                        script: "node scripts/deploy-plan.mjs '${env.BASE}'",
                        returnStdout: true
                    ).trim()

                    if (env.DEPLOY_PLAN) {
                        echo "Apps to deploy:\n${env.DEPLOY_PLAN}"
                    } else {
                        echo 'Nothing affected. Exiting without touching /var/www.'
                    }
                }
            }
        }

        stage('Build') {
            when { expression { env.DEPLOY_PLAN } }
            steps {
                // One .env.production at the repo root serves every app --
                // each app's vite.config.ts sets envDir to the root.
                withCredentials([file(credentialsId: 'sharpnr-webapps-production-env', variable: 'ENV_FILE')]) {
                    sh 'cp "$ENV_FILE" .env.production'
                }
                sh "pnpm turbo build --filter='...[${env.BASE}]'"
            }
        }

        stage('Deploy') {
            when { expression { env.DEPLOY_PLAN } }
            steps {
                script {
                    env.DEPLOY_PLAN.split('\n').each { line ->
                        def parts   = line.split('\t')
                        def name    = parts[0]
                        def wsPath  = parts[1]
                        def dir     = parts[2]
                        // split() drops trailing empty fields, so a static app's
                        // line is 4 columns, not 5.
                        def runtime = parts.size() > 3 ? parts[3] : 'static'
                        def service = parts.size() > 4 ? parts[4] : ''

                        echo "Deploying ${name} (${runtime}) -> ${WEB_BASE}/${dir}"

                        if (runtime == 'node') {
                            // Next.js standalone: a self-contained server with its
                            // own pruned node_modules, so the web root needs neither
                            // pnpm nor the workspace. Next mirrors the workspace
                            // layout inside the bundle, so server.js ends up at
                            // <root>/${wsPath}/server.js.
                            sh """
                                set -e
                                if [ ! -d '${wsPath}/.next/standalone' ]; then
                                    echo 'no standalone output for ${name} -- is output:"standalone" set in next.config?'; exit 1
                                fi
                                if [ -d '${WEB_BASE}/${dir}' ]; then
                                    mkdir -p '${BACKUP_BASE}/${dir}/${TIMESTAMP}'
                                    cp -r '${WEB_BASE}/${dir}' '${BACKUP_BASE}/${dir}/${TIMESTAMP}/'
                                fi
                                # Keep the 5 most recent backups per app. The docs bundle is
                                # ~74 MB, so unbounded retention fills the backup drive.
                                ls -1dt '${BACKUP_BASE}/${dir}'/*/ 2>/dev/null | tail -n +6 | xargs -r rm -rf
                                # Clear the contents, not the directory: it was created once
                                # with 2775 sharpnrllp:webdeploy and the systemd unit reads it
                                # as sharpnrllp. Recreating it here would hand it to jenkins.
                                mkdir -p '${WEB_BASE}/${dir}'
                                find '${WEB_BASE}/${dir}' -mindepth 1 -delete
                                cp -r '${wsPath}/.next/standalone/.' '${WEB_BASE}/${dir}/'

                                # standalone deliberately omits .next/static. Without
                                # this the app boots and answers 200, but serves no JS
                                # or CSS at all.
                                mkdir -p '${WEB_BASE}/${dir}/${wsPath}/.next/static'
                                cp -r '${wsPath}/.next/static/.' '${WEB_BASE}/${dir}/${wsPath}/.next/static/'

                                # jenkins writes it, but the unit runs as sharpnrllp.
                                chmod -R a+rX '${WEB_BASE}/${dir}'

                                sudo systemctl restart '${service}'
                            """
                        } else {
                            sh """
                                set -e
                                if [ ! -d '${wsPath}/dist' ]; then
                                    echo 'no dist produced for ${name}'; exit 1
                                fi
                                if [ -d '${WEB_BASE}/${dir}/dist' ]; then
                                    mkdir -p '${BACKUP_BASE}/${dir}/${TIMESTAMP}'
                                    cp -r '${WEB_BASE}/${dir}/dist' '${BACKUP_BASE}/${dir}/${TIMESTAMP}/dist'
                                fi
                                # Keep the 5 most recent backups per app. The docs bundle is
                                # ~74 MB, so unbounded retention fills the backup drive.
                                ls -1dt '${BACKUP_BASE}/${dir}'/*/ 2>/dev/null | tail -n +6 | xargs -r rm -rf
                                rm -rf '${WEB_BASE}/${dir}/dist'
                                mkdir -p '${WEB_BASE}/${dir}/dist'
                                cp -r '${wsPath}/dist/.' '${WEB_BASE}/${dir}/dist/'
                            """
                        }
                    }
                }
            }
        }

        stage('Record') {
            when { expression { env.DEPLOY_PLAN } }
            steps {
                // Advance the marker only once every affected app is live.
                sh 'git rev-parse HEAD > "$MARKER"'
            }
        }
    }

    post {
        success {
            echo env.DEPLOY_PLAN ? "Deployed:\n${env.DEPLOY_PLAN}" : 'Nothing affected.'
        }
        failure {
            echo 'Failed. Marker not advanced, so the next run retries these apps.'
        }
        always {
            cleanWs()
        }
    }
}

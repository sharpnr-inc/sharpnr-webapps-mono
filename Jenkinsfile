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
                // `checkout scm` already fetches +refs/heads/*:refs/remotes/origin/*
                // using the job's credentials, so origin/main and full history are
                // present here. Do NOT re-fetch: a bare `sh 'git fetch'` runs
                // without GIT_ASKPASS and dies with "could not read Username".
                // Just assert the two things the deploy plan depends on.
                sh '''
                    if [ "$(git rev-parse --is-shallow-repository)" = "true" ]; then
                        echo "FATAL: shallow clone -- deploy-plan.mjs needs real history."
                        echo "Turn off 'Shallow clone' in the job's Git behaviours."
                        exit 1
                    fi
                    git rev-parse --verify refs/remotes/origin/main >/dev/null \
                        || { echo "FATAL: origin/main missing after checkout"; exit 1; }
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
                                # -mindepth 1: the web root itself is owned by sharpnrllp
                                # (created once with install -d), and chmod needs ownership,
                                # not just group write -- so touching it fails with EPERM.
                                # Everything below it was created by this cp, so jenkins owns it.
                                # Only real files and dirs: chmod follows symlinks, and the
                                # bundle carries vestigial pnpm aliases that point at packages
                                # Next did not need to trace, so they dangle and abort the run.
                                # Symlink modes are meaningless on Linux anyway.
                                find '${WEB_BASE}/${dir}' -mindepth 1 ! -type l -exec chmod a+rX {} +

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

        // Static deploys do not strictly need this -- nginx reads files from
        // `root` per request, and open_file_cache is off by default. It matters
        // only if that cache is ever enabled, or a served path is recreated
        // rather than overwritten. Cheap, and `nginx -t` first means a broken
        // config is reported instead of taking every site down on reload.
        stage('Reload nginx') {
            when { expression { env.DEPLOY_PLAN } }
            steps {
                // Never fails the build. By this point the files are already live
                // -- nginx reads them from `root` per request -- so a reload
                // problem is worth reporting but must not strand a successful
                // deploy or block the marker. -n keeps sudo non-interactive
                // instead of hanging on a password prompt.
                sh '''
                    if ! sudo -n true 2>/dev/null; then
                        echo "SKIP: jenkins has no passwordless sudo for nginx. To enable:"
                        echo "  jenkins ALL=(root) NOPASSWD: /usr/bin/systemctl reload nginx, /usr/sbin/nginx -t"
                        exit 0
                    fi
                    if sudo -n nginx -t 2>&1; then
                        sudo -n systemctl reload nginx && echo "nginx reloaded"
                    else
                        echo "WARNING: nginx -t reports a bad config; not reloading."
                        echo "Deployed files are already live -- this is a pre-existing config issue."
                    fi
                '''
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

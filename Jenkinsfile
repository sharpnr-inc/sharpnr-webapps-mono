pipeline {

    // Single build box that owns /var/www and the systemd unit.
    // If you ever add a second agent, pin this with a label.
    agent any

    options {
        disableConcurrentBuilds()
        timeout(time: 20, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
        skipDefaultCheckout(true)
    }

    tools {
        // Vite 7 requires Node >= 20.19 (or >= 22.12).
        nodejs 'node-20'
    }

    environment {
        APP_DIR      = 'website'
        WEB_BASE     = '/var/www'
        APP_ROOT     = '/var/www/website'
        BACKUP_BASE  = '/media/sharpnrllpDrive/frontends'

        // Nitro node-server output — self-contained, no node_modules needed.
        SSR_OUTPUT   = '.output'

        // systemd unit: /etc/systemd/system/sharpnr-website.service
        SERVICE      = 'sharpnr-website'

        // The app listens here (see journalctl: "Listening on http://127.0.0.1:5353").
        HEALTH_URL   = 'http://127.0.0.1:5353/'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Checking out source...'
                checkout scm
                script {
                    env.TIMESTAMP  = sh(script: 'date +"%Y%m%d_%H%M%S"', returnStdout: true).trim()
                    env.GIT_SHORT  = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.RELEASE_ID = "${env.TIMESTAMP}_${env.GIT_SHORT}"
                    currentBuild.displayName = "#${env.BUILD_NUMBER} ${env.RELEASE_ID}"
                }
            }
        }

        stage('Install') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                echo '🔍 Linting...'
                sh 'npm run lint --if-present'
            }
        }

        stage('Build') {
            steps {
                withCredentials([file(credentialsId: 'sharpnr-website-env-production', variable: 'ENV_FILE')]) {
                    echo '🔑 Injecting .env.production...'
                    sh 'install -m 600 "$ENV_FILE" .env.production'

                    echo '🔨 Building SSR app (client + server bundles)...'
                    sh 'npm run build'
                }
            }
            post {
                // Don't leave the secret in the workspace after the build needs it.
                always {
                    sh 'rm -f .env.production'
                }
            }
        }

        stage('Verify build output') {
            steps {
                // Fail here rather than shipping an empty .output and finding out
                // when systemd refuses to start.
                sh '''
                    set -eu
                    test -d "$SSR_OUTPUT"                  || { echo "❌ $SSR_OUTPUT missing";        exit 1; }
                    test -f "$SSR_OUTPUT/server/index.mjs" || { echo "❌ Nitro server entry missing"; exit 1; }
                    test -d "$SSR_OUTPUT/public"           || { echo "❌ client assets missing";      exit 1; }
                    echo "✅ Build output looks sane ($(du -sh "$SSR_OUTPUT" | cut -f1))"
                '''
            }
        }

        stage('Backup') {
            steps {
                echo '🗂️ Backing up currently live build...'
                sh '''
                    set -eu
                    umask 002

                    if [ -d "$APP_ROOT/$SSR_OUTPUT" ]; then
                        DEST="$BACKUP_BASE/$APP_DIR/$RELEASE_ID"
                        mkdir -p "$DEST"
                        cp -a "$APP_ROOT/$SSR_OUTPUT/." "$DEST/"
                        echo "✅ Backup saved to $DEST"
                    else
                        echo "⚠ No existing $SSR_OUTPUT found, skipping backup"
                    fi

                    # NOTE: old backups are NOT pruned — clean them up manually.
                    echo "ℹ️ $(ls -1d "$BACKUP_BASE/$APP_DIR"/*/ 2>/dev/null | wc -l) backup(s) currently retained"
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying SSR build to /var/www/website/.output ...'
                script {
                    // Where the rollback should restore from, if this build goes bad.
                    env.BACKUP_PATH = "${env.BACKUP_BASE}/${env.APP_DIR}/${env.RELEASE_ID}"
                }
                sh '''
                    set -eu
                    umask 002

                    mkdir -p "$APP_ROOT"

                    # Stage beside the live copy first, so a failed cp never
                    # destroys a working deployment.
                    rm -rf "$APP_ROOT/$SSR_OUTPUT.new"
                    cp -a "$SSR_OUTPUT/." "$APP_ROOT/$SSR_OUTPUT.new/" 2>/dev/null \\
                        || { mkdir -p "$APP_ROOT/$SSR_OUTPUT.new"; cp -a "$SSR_OUTPUT/." "$APP_ROOT/$SSR_OUTPUT.new/"; }

                    # Make it group-writable so sharpnrllp can clean up by hand.
                    chmod -R g+w "$APP_ROOT/$SSR_OUTPUT.new"

                    # Swap. Brief window with no .output, but the service is being
                    # restarted anyway, so nothing is serving from it during the gap.
                    rm -rf "$APP_ROOT/$SSR_OUTPUT.old" 2>/dev/null || true
                    if [ -d "$APP_ROOT/$SSR_OUTPUT" ]; then
                        mv "$APP_ROOT/$SSR_OUTPUT" "$APP_ROOT/$SSR_OUTPUT.old.$$"
                    fi
                    mv "$APP_ROOT/$SSR_OUTPUT.new" "$APP_ROOT/$SSR_OUTPUT"

                    # Cleanup of the displaced build must never fail the deploy —
                    # the swap above already succeeded. Legacy trees may contain
                    # files jenkins can't delete; warn and move on.
                    rm -rf "$APP_ROOT/$SSR_OUTPUT.old.$$" 2>/dev/null \\
                        || echo "⚠ Could not fully remove $SSR_OUTPUT.old.$$ — clean it up manually"

                    echo "✅ Build deployed to $APP_ROOT/$SSR_OUTPUT"
                '''
            }
        }

        stage('Restart') {
            steps {
                echo '♻️ Restarting service via systemd...'
                // Requires a sudoers rule for the jenkins user, e.g.:
                //   jenkins ALL=(root) NOPASSWD: /bin/systemctl restart sharpnr-website, \
                //                                /bin/systemctl is-active sharpnr-website
                sh 'sudo systemctl restart "$SERVICE"'
            }
        }

        stage('Health check') {
            steps {
                echo '🩺 Waiting for the app to answer on :5353 ...'
                sh '''
                    set -eu

                    for i in $(seq 1 20); do
                        if curl -fsS --max-time 5 "$HEALTH_URL" > /dev/null 2>&1; then
                            echo "✅ Healthy after ${i} attempt(s)"
                            exit 0
                        fi
                        sleep 3
                    done

                    echo "❌ App did not become healthy at $HEALTH_URL"
                    sudo systemctl is-active "$SERVICE" || true
                    exit 1
                '''
            }
        }
    }

    post {

        failure {
            script {
                def backup = env.BACKUP_PATH ?: ''
                if (backup && sh(script: "test -d '${backup}'", returnStatus: true) == 0) {
                    echo "⏪ Restoring previous build from ${backup} ..."
                    sh '''
                        set -eu
                        umask 002
                        rm -rf "$APP_ROOT/$SSR_OUTPUT.bad" 2>/dev/null || true
                        [ -d "$APP_ROOT/$SSR_OUTPUT" ] && mv "$APP_ROOT/$SSR_OUTPUT" "$APP_ROOT/$SSR_OUTPUT.bad"
                        mkdir -p "$APP_ROOT/$SSR_OUTPUT"
                        cp -a "$BACKUP_PATH/." "$APP_ROOT/$SSR_OUTPUT/"
                        chmod -R g+w "$APP_ROOT/$SSR_OUTPUT"
                        rm -rf "$APP_ROOT/$SSR_OUTPUT.bad" 2>/dev/null \\
                            || echo "⚠ Could not fully remove $SSR_OUTPUT.bad — clean it up manually"
                        sudo systemctl restart "$SERVICE"
                        echo "↩️ Rolled back to the previous build"
                    '''
                } else {
                    echo '⚠ No backup from this run — nothing to roll back to automatically.'
                }
                // Double quotes so these actually interpolate.
                echo "❌ Pipeline failed. Inspect: journalctl -u ${env.SERVICE} -n 200 --no-pager"
                echo "   Backups live in ${env.BACKUP_BASE}/${env.APP_DIR}"
            }
        }

        success {
            echo "✅ sharpnr.com deployed successfully (${env.RELEASE_ID})"
        }

        always {
            cleanWs()
        }
    }
}
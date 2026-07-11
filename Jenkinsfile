pipeline {
    agent any

    tools {
        // Vite 7 requires Node >= 20.19 (or >= 22.12) — make sure this
        // Jenkins NodeJS tool points at a new enough version.
        nodejs 'node-20'
    }

    environment {
        APP_DIR     = 'website'
        WEB_BASE    = '/var/www'
        BACKUP_BASE = '/media/sharpnrllpDrive/frontends'
        // Nitro node-server output — self-contained, no node_modules needed
        SSR_OUTPUT  = '.output'
        // systemd unit installed from deploy/sharpnr-website.service
        SERVICE     = 'sharpnr-website'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Checking out source...'
                checkout scm
            }
        }

        stage('Timestamp') {
            steps {
                script {
                    env.TIMESTAMP = sh(script: 'date +"%Y%m%d_%H%M%S"', returnStdout: true).trim()
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
                // Inject .env.production before building
                withCredentials([file(credentialsId: 'sharpnr-website-env-production', variable: 'ENV_FILE')]) {
                    echo '🔑 Injecting .env.production...'
                    sh 'cp $ENV_FILE .env.production'
                    echo '🔨 Building SSR app (client + server bundles)...'
                    sh 'npm run build'
                }
            }
        }

        stage('Backup') {
            steps {
                echo '🗂️ Backing up current SSR build...'
                sh '''
                    if [ -d $WEB_BASE/$APP_DIR/$SSR_OUTPUT ]; then
                        mkdir -p $BACKUP_BASE/$APP_DIR/$TIMESTAMP
                        cp -r $WEB_BASE/$APP_DIR/$SSR_OUTPUT $BACKUP_BASE/$APP_DIR/$TIMESTAMP/$SSR_OUTPUT
                        echo "✅ Backup saved to $BACKUP_BASE/$APP_DIR/$TIMESTAMP"
                    else
                        echo "⚠ No existing $SSR_OUTPUT found, skipping backup"
                    fi
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying SSR build to /var/www/website...'
                // Stage the new build next to the old one, then swap —
                // keeps the window where assets are missing to milliseconds
                sh '''
                    mkdir -p $WEB_BASE/$APP_DIR
                    rm -rf $WEB_BASE/$APP_DIR/$SSR_OUTPUT.new
                    cp -r $SSR_OUTPUT $WEB_BASE/$APP_DIR/$SSR_OUTPUT.new
                    rm -rf $WEB_BASE/$APP_DIR/$SSR_OUTPUT
                    mv $WEB_BASE/$APP_DIR/$SSR_OUTPUT.new $WEB_BASE/$APP_DIR/$SSR_OUTPUT
                    echo "✅ Build copied"
                '''

                echo '♻️ Restarting sharpnr-website systemd service...'
                // Requires sudoers rule — see deploy/sharpnr-website.service
                sh 'sudo systemctl restart $SERVICE'
            }
        }

        stage('Health Check') {
            steps {
                echo '🩺 Verifying SSR server responds...'
                sh '''
                    sleep 2
                    for i in 1 2 3 4 5; do
                        if curl -sf -o /dev/null http://127.0.0.1:3000/; then
                            echo "✅ SSR server is up and rendering"
                            exit 0
                        fi
                        echo "⏳ Not ready yet, retrying ($i/5)..."
                        sleep 3
                    done
                    echo "❌ SSR server did not respond on port 3000"
                    echo "   Check: journalctl -u $SERVICE -n 50"
                    exit 1
                '''
            }
        }
    }

    post {
        success {
            echo '✅ sharpnr.com deployed successfully!'
        }
        failure {
            echo '❌ Pipeline failed! Check journalctl -u sharpnr-website — restore backup from $BACKUP_BASE if needed.'
        }
        always {
            cleanWs()
        }
    }
}

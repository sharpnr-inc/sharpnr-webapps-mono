pipeline {
    agent any

    tools {
        nodejs 'node-20'
    }

    environment {
        APP_DIR     = 'silo'
        WEB_BASE    = '/var/www'
        BACKUP_BASE = '/media/sharpnrllpDrive/frontends'
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
                    echo '🔨 Building React app...'
                    sh 'npm run build'
                }
            }
        }

        stage('Backup') {
            steps {
                echo '🗂️ Backing up current dist...'
                sh '''
                    if [ -d $WEB_BASE/$APP_DIR/dist ]; then
                        mkdir -p $BACKUP_BASE/$APP_DIR/$TIMESTAMP
                        cp -r $WEB_BASE/$APP_DIR/dist $BACKUP_BASE/$APP_DIR/$TIMESTAMP/dist
                        echo "✅ Backup saved to $BACKUP_BASE/$APP_DIR/$TIMESTAMP"
                    else
                        echo "⚠ No existing dist found, skipping backup"
                    fi
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying to /var/www/website...'
                sh '''
                    rm -rf $WEB_BASE/$APP_DIR/dist
                    mkdir -p $WEB_BASE/$APP_DIR/dist
                    cp -r dist/* $WEB_BASE/$APP_DIR/dist/
                    echo "✅ website deployed!"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ sharpnr.com deployed successfully!'
        }
        failure {
            echo '❌ Pipeline failed! Old version still live (backup untouched).'
        }
        always {
            cleanWs()
        }
    }
}
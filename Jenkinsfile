pipeline {
    agent any

    tools {
        nodejs 'node-20'
    }

    environment {
        APP_NAME        = 'sharpnr-docs'
        APP_PORT        = '6956'
        PM2_APP_NAME    = 'sharpnr-docs'
        NODE_ENV        = 'production'
    }

    stages {

        // ─────────────────────────────────────────
        // 1. CHECKOUT
        // ─────────────────────────────────────────
        stage('Checkout') {
            steps {
                echo '📦 Checking out source code...'
                checkout scm
            }
        }

        // ─────────────────────────────────────────
        // 2. INSTALL DEPENDENCIES
        // ─────────────────────────────────────────
        stage('Install') {
            steps {
                echo '📥 Installing dependencies...'
                sh 'npm ci --include=dev'
            }
        }

        // ─────────────────────────────────────────
        // 4. BUILD
        // ─────────────────────────────────────────
        stage('Build') {
            steps {
                echo '🏗️  Building Next.js app...'
                sh 'npm run build'
            }
        }

        // ─────────────────────────────────────────
        // 5. START / RESTART WITH PM2
        // ─────────────────────────────────────────
        stage('Start') {
            steps {
                echo '🚀 Starting app with PM2...'
                sh """
                    # Install PM2 globally if not present
                    which pm2 || npm install -g pm2

                    # If already running, reload gracefully — otherwise start fresh
                    pm2 describe ${PM2_APP_NAME} > /dev/null 2>&1 \
                        && pm2 reload ${PM2_APP_NAME} --update-env \
                        || pm2 start npm --name "${PM2_APP_NAME}" -- start -- -p ${APP_PORT}

                    # Persist PM2 process list across reboots
                    pm2 save
                """
            }
        }
    }

    // ─────────────────────────────────────────
    // POST ACTIONS
    // ─────────────────────────────────────────
    post {
        success {
            echo "✅ Deployment successful! ${APP_NAME} is running on port ${APP_PORT}."
        }
        failure {
            echo "❌ Build or deployment failed. Check the console output above."
        }
        always {
            echo '🧹 Pipeline finished.'
        }
    }
}
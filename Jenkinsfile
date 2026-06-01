pipeline {
    agent any

    environment {
        APP_NAME   = 'sharpnr-docs'
        APP_PORT   = '6956'
        DEPLOY_DIR = '/media/sharpnrllpDrive/frontends/sharpnr-docs'
        NODE_HOME  = '/home/sharpnrllp/.nvm/versions/node/v22.17.0/bin'
        PATH       = "/home/sharpnrllp/.nvm/versions/node/v22.17.0/bin:${env.PATH}"
    }

    stages {

        // ─────────────────────────────────────────
        // 1. CHECKOUT
        // ─────────────────────────────────────────
        stage('Checkout') {
            steps {
                echo '📦 Syncing source code to deploy directory...'
                sh """
                    mkdir -p ${DEPLOY_DIR}
                    rsync -a --delete \
                        --exclude='.git' \
                        --exclude='node_modules' \
                        --exclude='.next' \
                        ${WORKSPACE}/ ${DEPLOY_DIR}/
                """
            }
        }

        // ─────────────────────────────────────────
        // 2. INSTALL DEPENDENCIES
        // ─────────────────────────────────────────
        stage('Install') {
            steps {
                echo '📥 Installing dependencies...'
                sh "cd ${DEPLOY_DIR} && npm ci --include=dev"
            }
        }

        // ─────────────────────────────────────────
        // 3. BUILD
        // ─────────────────────────────────────────
        stage('Build') {
            steps {
                echo '🏗️  Building Next.js app...'
                sh "cd ${DEPLOY_DIR} && npm run build"
            }
        }

        // ─────────────────────────────────────────
        // 4. RESTART
        // ─────────────────────────────────────────
        stage('Restart') {
            steps {
                echo '🚀 Restarting app via systemd...'
                sh 'sudo systemctl restart sharpnr-docs'
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
            echo '🧹 Cleaning up Jenkins workspace...'
            cleanWs()
        }
    }
}
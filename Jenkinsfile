pipeline {
    agent any

    tools {
        nodejs 'node-20'
    }

    environment {
        APP_NAME   = 'sharpnr-docs'
        APP_PORT   = '6956'
        DEPLOY_DIR = '/media/sharpnrllpDrive/frontends/sharpnr-docs'
    }

    stages {

        // ─────────────────────────────────────────
        // 1. CHECKOUT
        // ─────────────────────────────────────────
        stage('Checkout') {
            steps {
                echo '📦 Checking out source code...'
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
        // 4. START
        // ─────────────────────────────────────────
        stage('Start') {
            steps {
                echo '🚀 Starting app on port ${APP_PORT}...'
                sh """
                    # Kill any process already on port 6956
                    fuser -k ${APP_PORT}/tcp || true

                    # Start fresh in background, log to deploy dir
                    cd ${DEPLOY_DIR}
                    nohup npm start > ${DEPLOY_DIR}/app.log 2>&1 &
                    echo \$! > ${DEPLOY_DIR}/app.pid

                    echo "✅ App started with PID \$(cat ${DEPLOY_DIR}/app.pid)"
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
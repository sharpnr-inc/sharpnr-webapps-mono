pipeline {
agent any

```
environment {
    APP_NAME   = 'sharpnr-docs'
    APP_PORT   = '6956'
    DEPLOY_DIR = '/media/sharpnrllpDrive/frontends/sharpnr-docs'

    NODE_BIN = '/var/lib/jenkins/.nvm/versions/node/v22.22.3/bin'
    PATH = "/var/lib/jenkins/.nvm/versions/node/v22.22.3/bin:${env.PATH}"
}

stages {

    stage('Checkout') {
        steps {
            echo '📦 Syncing source code to deploy directory...'
            sh '''
                mkdir -p ${DEPLOY_DIR}

                rsync -a --delete \
                    --exclude=.git \
                    --exclude=node_modules \
                    --exclude=.next \
                    ${WORKSPACE}/ ${DEPLOY_DIR}/
            '''
        }
    }

    stage('Install') {
        steps {
            echo '📥 Installing dependencies...'
            sh '''
                ${NODE_BIN}/node -v
                ${NODE_BIN}/npm -v

                cd ${DEPLOY_DIR}
                ${NODE_BIN}/npm ci --include=dev
            '''
        }
    }

    stage('Build') {
        steps {
            echo '🏗️ Building Next.js app...'
            sh '''
                cd ${DEPLOY_DIR}
                ${NODE_BIN}/npm run build
            '''
        }
    }

    stage('Restart') {
        steps {
            echo '🚀 Restarting app via systemd...'
            sh 'sudo systemctl restart sharpnr-docs'
        }
    }
}

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
```

}

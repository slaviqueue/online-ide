import { template, unescape } from 'lodash'
import { WorkerExposedPort } from '../config'

const prerequisites = `
WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install -y git
`

const secrets = `
ARG SSH_PRIVATE_KEY
RUN mkdir /root/.ssh/
RUN echo "\${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa

RUN chmod 400 ~/.ssh/id_rsa

RUN echo "\${SSH_PRIVATE_KEY}"

RUN touch /root/.ssh/known_hosts
RUN ssh-keyscan github.com >> /root/.ssh/known_hosts
`

const embeddingWorker = `
RUN git clone git@github.com:slaviqueue/online-ide-worker.git .
`

const addingUser = `
RUN ls -al
RUN npm install

RUN useradd -ms /bin/bash user

USER user
WORKDIR /home/user
`

const exposingWorkerPort = `
EXPOSE ${WorkerExposedPort}
`

const command = `
CMD cd /usr/src/app/ && npm start
`

const installingNode = `
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash - && apt-get install -y nodejs
`

function makeDockerfile (languageDockerfile: string): string {
  const temp = template(languageDockerfile)
  const result = temp({
    prerequisites,
    secrets,
    embeddingWorker,
    addingUser,
    exposingWorkerPort,
    command,
    installingNode
  })

  return unescape(result)
}

export default makeDockerfile

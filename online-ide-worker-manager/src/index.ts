/* eslint-disable import/first */
require('dotenv').config()

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createConnection } from 'typeorm'

import 'reflect-metadata'

import WorkerImagesBuilder from './services/WorkerImagesBuilder/WorkerImagesBuilder'

import Machine from './entity/Machine'
import Project from './entity/Project'
import handle from './utils/handle'
import ContainerController from './controllers/ContainerController'
import auth from './middleware/auth'
import User from './entity/User'
import StaleWorkerContainerStopper from './services/StaleWorkerContainerStopper/StaleWorkerContainerStopper'
import WorkerProxy from './services/WorkerProxy/WorkerProxy'

const app = express()

app.use(cors())

async function start (): Promise<void> {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'ide',
    entities: [
      Machine,
      Project,
      User
    ],
    synchronize: true
  })

  await new WorkerImagesBuilder().buildImages(__dirname, require('./languages.json'))

  app.post('/projects/:id/container', [auth], handle(ContainerController, 'create'))
  app.delete('/projects/container/:containerId', [auth], handle(ContainerController, 'delete'))

  app.post('/projects/:id/container/start', [auth], handle(ContainerController, 'startContainer'))
  app.post('/projects/:id/container/stop', [auth], handle(ContainerController, 'stopContainer'))

  app.post('/projects/:id/container/ping', [auth], handle(ContainerController, 'pingContainer'))

  new StaleWorkerContainerStopper().watch()
}

start()

const server = app.listen(3003, () => {
  console.log('app listening on :3003')
})

new WorkerProxy(app, server).start()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

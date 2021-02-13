/* eslint-disable import/first */
require('dotenv').config()

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createConnection } from 'typeorm'
import 'reflect-metadata'

import Project from './entity/Project'
import Machine from './entity/Machine'

import ProjectController from './controllers/ProjectController'
import handle from './utils/handle'
import User from './entity/User'
import UserController from './controllers/UserController'
import auth from './middleware/auth'
import Receipt from './entity/Receipt'

async function start (): Promise<void> {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'ide',
    entities: [
      Project,
      Machine,
      User,
      Receipt
    ],
    synchronize: true
  })

  const app = express()

  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.get('/auth/github/callback', handle(UserController, 'authenticateWithGithub'))

  app.get('/users/me', [auth], handle(UserController, 'getMe'))

  app.get('/projects', [auth], handle(ProjectController, 'get'))
  app.get('/projects/:id', [auth], handle(ProjectController, 'getById'))
  app.patch('/projects/:id', [auth], handle(ProjectController, 'update'))
  app.delete('/projects/:id', [auth], handle(ProjectController, 'delete'))
  app.post('/projects', [auth], handle(ProjectController, 'create'))

  app.get('/projects/:projectId/receipts', [auth], handle(ProjectController, 'getReceipts'))
  app.post('/projects/:projectId/receipts', [auth], handle(ProjectController, 'createReceipt'))
  app.delete('/projects/receipts/:receiptId', [auth], handle(ProjectController, 'deleteReceipt'))

  app.listen(3002, () => {
    console.log('app listening on :3002')
  })
}

start()

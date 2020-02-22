import * as mongoose from 'mongoose'
import { User } from './models/user'

const models = {
  User
}

const connectToDb = mongoUri =>
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

export { connectToDb, models }

import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  // @ts-ignore
  this.password = bcrypt.hashSync(this.password, 10)

  next()
})

userSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password))
}

const User = mongoose.model('User', userSchema)

export { User }

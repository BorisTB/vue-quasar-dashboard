import * as jwt from 'jsonwebtoken'

const getJwtForUser = user =>
  jwt.sign({ id: user.id }, process.env.TOKEN_SECRET)

export { getJwtForUser }

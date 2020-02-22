import * as jwt from 'jsonwebtoken'

const authMiddleware = async (resolve, parent, args, ctx) => {
  const authHeaderValue = ctx.request.get('Authorization')

  if (authHeaderValue) {
    const [prefix, token] = authHeaderValue.split(' ')

    if (prefix === 'Bearer' && token) {
      try {
        const { id } = jwt.verify(token, process.env.TOKEN_SECRET) as {
          id: string
        }
        ctx.user = await ctx.models.User.findOne({ id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  return resolve()
}

export default authMiddleware

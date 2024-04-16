const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')
const secretKey = 'Jovesohandsome^-^fortokenkey' // 密钥
const options = {
  expiresIn: '24h', // token 有效期
}
// 生成 token
const generateToken = payload => {
  const token = 'Bearer ' + jwt.sign(payload, secretKey, options)
  return token
}
// 解析 token 的中间件
const authenticateJwt = () => {
  return expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],
    getToken: req => req.headers.authorization?.split(' ')[1],
  }).unless({ path: [/^\/api\/user\/.*/] })
}
// token 解析失败的中间件
const errorHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.send({ retCode: 401, msg: '身份识别失败' })
    return //直接停止中间链
  } else {
    next(err)
  }
}
// 通过 req.auth 访问 token，req.user 访问用户信息

module.exports = {
  generateToken,
  authenticateJwt,
  errorHandler,
}

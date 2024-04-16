// user 路由处理函数
const { query, insert } = require('../utils/mysql')
const bcrypt = require('bcryptjs') // 用于对密码进行加密处理
const { generateToken } = require('../utils/token')

// 注册 {cellphone,nickname,password}
const regUser = async (req, res) => {
  // 用户名查重
  const sqlStr = 'select * from user where nickname = ?'
  try {
    const results = await query(sqlStr, req.body.nickname)
    if (results.length > 0) {
      return res.send({ retCode: 400, msg: '用户名被占用' })
    }
  } catch (err) {
    return res.send({ retCode: 503, msg: err })
  }
  // 手机号码查重
  const sqlStr2 = 'select * from user where cellphone = ?'
  try {
    const results = await query(sqlStr2, req.body.cellphone)
    if (results.length > 0) {
      return res.send({ retCode: 400, msg: '该手机号已注册' })
    }
  } catch (err) {
    return res.send({ retCode: 503, msg: err })
  }
  // 用户密码加密
  const data = {
    nickname: req.body.nickname,
    cellphone: req.body.cellphone,
  }
  data.password = bcrypt.hashSync(req.body.password, 10)
  // 上传数据库
  try {
    const results = await insert('user', data)
    if (results.warningCount === 0) {
      // 生成 token字符串
      const tokenObj = {
        id: results.insertId,
        cellphone: data.cellphone,
      }
      return res.send({
        retCode: 200,
        msg: '注册成功',
        data: {
          id: results[0].id,
          nickname: results[0].nickname,
          cellphone: results[0].cellphone,
        },
        token: generateToken(tokenObj),
      })
    }
  } catch (err) {
    return res.send({ retCode: 503, msg: err })
  }
}

// 登录 {cellphone,password}
const login = async (req, res) => {
  const sqlStr = 'select * from user where cellphone = ?'
  try {
    const results = await query(sqlStr, req.body.cellphone)
    const comRes = bcrypt.compareSync(req.body.password, results[0].password) // 解密并比较密码是否正确
    if (results.length === 1 && comRes) {
      // 生成 token字符串
      const tokenObj = {
        id: results[0].id,
        cellphone: results[0].cellphone,
      }
      return res.send({
        retCode: 200,
        msg: '登陆成功',
        data: {
          id: results[0].id,
          nickname: results[0].nickname,
          cellphone: results[0].cellphone,
        },
        token: generateToken(tokenObj),
      })
    } else {
      return res.send({ retCode: 400, msg: '用户未注册或密码错误' })
    }
  } catch (err) {
    return res.send({ retCode: 503, msg: err })
  }
}

// 退出登录
const logout = (req, res) => {
  res.send('logout')
}

module.exports = {
  regUser,
  login,
  logout,
}

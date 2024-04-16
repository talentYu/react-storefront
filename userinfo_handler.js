// userinfo 路由处理函数
const { query, update } = require('../utils/mysql')

// 获取用户信息
const getInfo = async (req, res) => {
  const sqlStr = 'select * from user where id = ?'
  try {
    const results = await query(sqlStr, req.auth.id)
    if (results.length !== 1) {
      return res.send({ retCode: 406, msg: '未找到该用户' })
    } else {
      return res.send({
        retCode: 200,
        msg: '获取用户信息成功',
        data: {
          id: results[0].id,
          nickname: results[0].nickname,
          cellphone: results[0].cellphone,
        },
      })
    }
  } catch (err) {
    return res.send({ retCode: 503, msg: err })
  }
}

// 更新用户头像
const updateAvatar = async (req, res) => {
  try {
    const results = await update(
      'user',
      { user_pic: req.body.avatar },
      { id: req.body.id },
    )
    if (results.affectedRows !== 1) {
      return res.send({ retCode: 420, msg: '更新头像失败' })
    } else {
      return res.send({
        retCode: 200,
        msg: '成功更新用户头像',
      })
    }
  } catch (err) {
    return res.send({ retCode: 503, msg: err })
  }
}

module.exports = {
  getInfo,
  updateAvatar,
}

// api: /user 用户路由模块
const express = require('express')
const router = express.Router() // 创建路由对象
const { regUser, login, logout } = require('../router_handler/user_handler')
const { validateForm, regJoi, loginJoi } = require('../utils/validate') // 表单验证

// 注册
router.post('/reguser', validateForm(regJoi), regUser)

// 登录
router.post('/login', validateForm(loginJoi), login)

// 退出登录
router.post('/logout', logout)

module.exports = router

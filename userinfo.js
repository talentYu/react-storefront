// api: /userinfo 用户信息路由模块
const express = require('express')
const router = express.Router() // 创建路由对象
const { getInfo, updateAvatar } = require('../router_handler/userinfo_handler')
const { validateForm, avatarJoi } = require('../utils/validate') // 表单验证

// 获取用户信息
router.get('/getinfo', getInfo)

// 更新用户头像
router.post('/avatar', validateForm(avatarJoi), updateAvatar)

module.exports = router

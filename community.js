// api: /community 社区路由模块
const express = require('express')
const router = express.Router() // 创建路由对象
const {
  upload,
  deleteWork,
  qurList,
  like,
  qurMyList,
} = require('../router_handler/community_handler')
const { validateForm, uploadJoi } = require('../utils/validate') // 表单验证

// 上传画作
router.post('/upload', validateForm(uploadJoi), upload)

// 删除画作
router.get('/del', deleteWork)

// 查询所有画作
router.get('/qurList', qurList)

// 点赞画作
router.get('/like', like)

// 查询我的画作
router.get('/my', qurMyList)

module.exports = router

const router = require('express').Router()
const Controller = require("../controller/userController")
const path = require('path')
const fs = require('fs')
const md5 = require('md5')
const multer = require('multer')

const folder = "./public/user"
const limitFile = 5

const uploading = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, folder)
        },
        filename: function (req, file, callback) {
            callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
        }
    })
})

router.post("/create",Controller.createOne)
router.post("/login",Controller.login)
router.delete("/delete",Controller.delete_user) 
router.get("/all", Controller.getAll)
router.get("/:id", Controller.getOne)
router.put("/:id", Controller.updateOne)

module.exports = router

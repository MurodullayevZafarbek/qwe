const fs = require('fs')
const path = require('path')

const createFolder = () => {
    fs.mkdir(path.join(__dirname, "../public/advertisement"), (error, callback) => {
        if (error) console.log("Advertisement papka allaqachon mavjud")
        else console.log("Advertisement papka  yaratildi")
    })
    fs.mkdir(path.join(__dirname, "../public/b2b"), (error, callback) => {
        if (error) console.log("B2B papka allaqachon mavjud")
        else console.log("B2B papka  yaratildi")
    })
    fs.mkdir(path.join(__dirname, "../public/order"), (error, callback) => {
        if (error) console.log("order papka allaqachon mavjud")
        else console.log("order papka  yaratildi")
    })
    fs.mkdir(path.join(__dirname, "../public/product"), (error, callback) => {
        if (error) console.log("product papka allaqachon mavjud")
        else console.log("product papka  yaratildi")
    })
    fs.mkdir(path.join(__dirname, "../public/subcategory"), (error, callback) => {
        if (error) console.log("subcategory papka allaqachon mavjud")
        else console.log("subcategory papka  yaratildi")
    })
    fs.mkdir(path.join(__dirname, "../public/vacancy_position"), (error, callback) => {
        if (error) console.log("vacancy_position papka allaqachon mavjud")
        else console.log("vacancy_position papka  yaratildi")
    })
}

module.exports = createFolder
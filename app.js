// Requirement
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require("cors")
const expressEjsLayouts = require("express-ejs-layouts")
const i18n = require("i18n-express");
const fs = require('fs')
const cookieParser = require("cookie-parser");
const expressSession = require("express-session")
const connectMongodbSession = require("connect-mongodb-session")(expressSession)
const { port, key, time, session, database } = require('./config/index')
const databaseConnection = require('./database/index')
const FOLDER = require("./config/folder")


app.use(expressSession({
    secret: key,
    resave: false,
    saveUninitialized: false,
    store: new connectMongodbSession({
        uri: database,
        collection: session,
    }),
    cookie: {
        httpOnly: true,
        maxAge: time,
        sameSite: "strict",
    }
}))
// Set up
FOLDER()
databaseConnection()
app.use(express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: "*" }))
app.use(expressEjsLayouts)
app.use(cookieParser())
app.use(i18n({
    translationsPath: path.join(__dirname, 'i18n'),
    siteLangs: ["uz", "ru", "en"],
    textsVarName: 'translation'
}))

app.use('/api/advertisement', require('./router/advertisementRouter'))
app.use('/api/b2b', require('./router/b2bRouter'))
app.use('/api/basket', require('./router/basketRouter'))
app.use('/api/category', require('./router/categoryRouter'))
app.use('/api/country', require('./router/countryRouter'))
app.use('/api/order', require('./router/orderRouter'))
app.use('/api/product', require('./router/productRouter'))
app.use('/api/region', require('./router/regionRouter'))
app.use('/api/saved', require('./router/savedRouter'))
app.use('/api/subcategory', require('./router/subcategoryRouter'))
app.use('/api/vacancy_positioon', require('./router/vacancy_positionRouter'))
app.use('/api/vacancy', require('./router/vacancyRouter'))
app.use('/api/user', require('./router/userRouter'))


const server = app.listen(port, () => {
    console.log("Server is running  on", server.address().port)
})






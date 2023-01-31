module.exports = {
    port: 3000,
    key: "12345",
    time: 1000 * 60 * 60 * 24,
    session: "session",
    database: "mongodb://127.0.0.1:27017/test",
    option: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}
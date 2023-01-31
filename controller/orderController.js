const { Order } = require('../model/schema')
const Container = require('../config/class')

exports.createData = async (req, res, next) => {
    const my_class = new Container(Order, req, res, next)
    my_class.CREATE_DATA()
}
exports.getOne = async (req, res, next) => {
    const my_class = new Container(Order, req, res, next)
    my_class.GET_ONE()
}
exports.getAll = async (req, res, next) => {
    const my_class = new Container(Order, req, res, next)
    my_class.GET_ALL()
}
exports.updateOne = async (req, res, next) => {
    const my_class = new Container(Order, req, res, next)
    my_class.UPDATE_without_file("order")
}
exports.deleteOne = async (req, res, next) => {
    const my_class = new Container(Advertisement, req, res, next)
    my_class.DELETE_with_file("order");
}
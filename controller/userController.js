const { User } = require("../model/schema");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Container = require('../config/class')
exports.createOne = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const PASSWORD = await bcrypt.hash(req.body.password, salt);
  const result = new User({
    name: req.body.name,
    email: req.body.email,
    password: PASSWORD,
    surname: req.body.surname,
    birthday: req.body.birthday,
    phone: req.body.phone,
    uuid: uuidv4(),
  });
  await result
    .save()
    .then(() => {
      res.status(201).json({
        message: "Malumot yaratildi",
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Malumot yaratishda xatolik mavjud",
        data: error,
      });
    });
};
exports.login = async (req, res, next) => {
  const { TELEFON, PAROL } = req.body;
  if (!TELEFON || !PAROL) {
    res.json({
      message: "Iltimos malumotlarni to'ldiring",
      status: false,
    });
  } else {
    const PHONE = await User.findOne({ phone: TELEFON });
    if (PHONE == null || PHONE == undefined || !PHONE) {
      res.json({
        message: "Telefon nomer hato",
        status: false,
      });
    } else {
      const PASSWORD = PHONE.password;
      const Brat = await bcrypt.compare(PAROL, PASSWORD);
      if (Brat == false) {
        res.json({ message: "Parol hato" });
      } else {
        const jsonwebtoken = jwt.sign({
            id: PHONE._id,
            name: PHONE.name,
        }, "12345", { expiresIn: 1000 * 10 });
        res.json({
          status: true,
          token: jsonwebtoken,
        });
      }
    }
  }
};
exports.delete_user = async (req, res, next) => {
  const result = new Container(User, req, res, next);
  result.DELETE_without_file();
};
exports.getOne = async (req, res, next) => {
  const my_class = new Container(User, req, res, next)
  my_class.GET_ONE
}
exports.getAll = async (req, res, next) => {
  const my_class = new Container(User, req, res, next)
  my_class.GET_ALL()
}
exports.updateOne = async (req, res, next) => {
  const my_class = new Container(User, req, res, next)
  my_class.UPDATE_without_file()
}
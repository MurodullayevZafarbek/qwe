const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = mongoose.model(
    "user",
    mongoose.Schema({
        name: { type: String, required: true, min: 3, max: 40 },
        surname: { type: String, required: true, min: 3, max: 40 },
        birthday: { type: String, required: true },
        gender: { type: String, enum: ["male", "female"] },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true, min: 3, max: 40 },
        countryID: { type: mongoose.Schema.ObjectId, ref: "country", index: true },
        regionID: { type: mongoose.Schema.ObjectId, ref: "region", index: true },
        date: { type: Date, default: Date.now() },
    })
);

const Country = mongoose.model(
    "country",
    mongoose.Schema({
        name: { type: String, required: true, min: 3, max: 40 },
        date: { type: Date, default: Date.now() },
    })
);
const Region = mongoose.model(
    "region",
    mongoose.Schema({
        countryID: {
            type: mongoose.Schema.ObjectId,
            ref: "country",
            index: true,
        },
        name: { type: String, required: true, min: 3, max: 40 },
        date: { type: Date, default: Date.now() },
    })
);
const Category = mongoose.model(
    "category",
    mongoose.Schema({
        status: { type: String, required: true, enum: ["active", "no_active"] },
        countryID: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "country",
                index: true,
            },
        ],
        regionID: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "region",
                index: true,
            },
        ],
        name: {
            uz: { type: String, required: true, min: 3, max: 40 },
            ru: { type: String, required: true, min: 3, max: 40 },
            en: { type: String, required: true, min: 3, max: 40 },
        },
        image: [{ type: String, required: true }],
        date: { type: Date, default: Date.now() },
    })
);
const Subcategory = mongoose.model(
    "subcategory",
    mongoose.Schema({
        status: { type: String, required: true, enum: ["active", "no_active"] },
        categoryID: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "category",
                index: true,
            },
        ],
        name: {
            uz: { type: String, required: true, min: 3, max: 40 },
            ru: { type: String, required: true, min: 3, max: 40 },
            en: { type: String, required: true, min: 3, max: 40 },
        },
        image: [{ type: String, required: true }],
        date: { type: Date, default: Date.now() },
    })
);
const Saved = mongoose.model(
    "saved",
    mongoose.Schema({
        userID: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "user",
                index: true,
            },
        ],
        productID: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "product",
                index: true,
            },
        ],
        status: {
            type: String,
            enum: ["access", "cancel"],
            default: "access",
        },
        date: { type: Date, default: Date.now() },
    })
);
const Product = mongoose.model(
    "product",
    mongoose.Schema({
        subcategoryID: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "subcategory",
                index: true,
            },
        ],
        countryID: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "category",
                index: true,
            },
        ],
        regionID: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "region",
                index: true,
            },
        ],
        product: [
            {
                image: { type: String, required: true },
                color: { type: String, required: true },
            },
        ],
        articul: {
            uz: { type: String, required: true, min: 3, max: 40 },
            ru: { type: String, required: true, min: 3, max: 40 },
            en: { type: String, required: true, min: 3, max: 40 },
        },
        name: {
            uz: { type: String, required: true, min: 3, max: 40 },
            ru: { type: String, required: true, min: 3, max: 40 },
            en: { type: String, required: true, min: 3, max: 40 },
        },
        description: {
            uz: { type: String, required: true, min: 3, max: 40 },
            ru: { type: String, required: true, min: 3, max: 40 },
            en: { type: String, required: true, min: 3, max: 40 },
        },
        status: { type: String, required: true, enum: ["active", "no_active"] },
        amount_type: {
            type: String,
            required: true,
            enum: [
                "1", // dona
                "2", // kg
                "3", // litr
                "4", // metr
                "5", // metr kvadrat
                "6", // metr kub
                "7", // toplam (pachkalab sotish)
                "8", // rasmer ()
            ],
        },
        country: [{ type: String, required: true }],
        brand: [{ type: String, required: true }],
        composition: [{ type: String, required: true }],
        price: [{ type: String, required: true }],
        date: { type: Date, default: Date.now() },
    })
);
const Basket = mongoose.model(
    "basket",
    mongoose.Schema({
        userID: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            index: true,
        },
        productID: {
            type: mongoose.Schema.ObjectId,
            ref: "product",
            index: true,
        },
        piece: { type: Number, required: true },
        default_summa: { type: Number, required: true },
        total_summa: { type: Number, required: true },
        date: { type: Date, default: Date.now() },
    })
);
const Order = mongoose.model(
    "order",
    mongoose.Schema({
        userID: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            index: true,
        },
        productID: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "product",
                index: true,
            },
        ],
        piece: { type: String, required: true },
        default_summa: { type: String, required: true },
        total_summa: { type: String, required: true },
        delivery_summa: { type: String, required: true },
        address: { type: String, required: true },
        amount_type: {
            type: String,
            required: true,
            enum: [
                "1", // dona
                "2", // kg
                "3", // litr
                "4", // metr
                "5", // metr kvadrat
                "6", // metr kub
                "7", // toplam (pachkalab sotish)
                "8", // rasmer ()
            ],
        },
        payment: {
            type: String,
            required: true,
            enum: [
                "PayMe",
                "Click",
                "Master",
                "Visa",
                "Paynet",
                "Cash", // Naqd pul
            ],
        },
        date: { type: Date, default: Date.now() },
    })
);
const B2B = mongoose.model(
    "b2b",
    mongoose.Schema({
        organization_name: { type: String, required: true },
        inn: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        position: {
            type: String,
            enum: ["juridical", "phyisical"],
        },
        status: {
            type: String,
            enum: ["access", "cancel"],
            default: "cancel",
        },
        date: { type: Date, default: Date.now() },
    })
);
const Vacancy_position = mongoose.model(
    "vacancy_position",
    mongoose.Schema({
        name: {
            uz: { type: String, required: true, min: 3, max: 40 },
            ru: { type: String, required: true, min: 3, max: 40 },
            en: { type: String, required: true, min: 3, max: 40 },
        },
        description: {
            uz: { type: String, required: true, min: 3, max: 40 },
            ru: { type: String, required: true, min: 3, max: 40 },
            en: { type: String, required: true, min: 3, max: 40 },
        },
        status: { type: String, required: true, enum: ["active", "no_active"] },

        date: { type: Date, default: Date.now() },
    })
);
const Vacancy = mongoose.model(
    "vacancy",
    mongoose.Schema({
        vacancyID: {
            type: mongoose.Schema.ObjectId,
            ref: "vacancy_position",
            index: true,
        },
        userID: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            index: true,
        },
        status: { type: String, required: true, enum: ["access", "cancel"] },
        resume_file: [{ type: String, required: true }],
        date: { type: Date, default: Date.now() },
    })
);
const Advertisement = mongoose.model(
    "advertisement",
    mongoose.Schema({
        image: [{ type: String, required: true }],
        date: { type: Date, default: Date.now() },
    })
);

module.exports = {
    Category,
    Country,
    Vacancy,
    User,
    Region,
    Vacancy_position,
    Advertisement,
    B2B,
    Product,
    Subcategory,
    Saved,
    Basket,
    Order,
};

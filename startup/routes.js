const express = require("express");
const addresses = require("../routes/addresses");
const persons = require("../routes/persons");
const userRols = require("../routes/userRols");
const customers = require("../routes/customers");
const inventorys = require("../routes/inventorys");
const suppliers = require("../routes/suppliers");
const purchases = require("../routes/purchases");
const externalacc = require("../routes/externalAccs");

const purchasesItems = require("../routes/purchasesItems");
const orderstatus = require("../routes/orderStatuses");
const orderitems = require("../routes/orderItems");
const customerorders = require("../routes/customerOrders");
const brands = require("../routes/brands");
const typesProducts = require("../routes/typesProducts");
const products = require("../routes/products");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/addresses", addresses);
  app.use("/api/persons", persons);
  app.use("/api/rolusers", userRols);
  app.use("/api/externalacc", persons);
  app.use("/api/customers", customers);
  app.use("/api/orderstatus", orderstatus);
  app.use("/api/orderitems", orderitems);
  app.use("/api/customerorders", customerorders);
  app.use("/api/inventorys", inventorys);
  app.use("/api/suppliers", suppliers);
  app.use("/api/purchases", purchases);
  app.use("/api/purchasesItems", purchasesItems);
  app.use("/api/brands", brands);
  app.use("/api/typesProducts", typesProducts);
  app.use("/api/products", products);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};

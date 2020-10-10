const { Employee, validate } = require("../models/employee");
const { Person } = require("../models/person");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const employee = await Employee.findAll();
  res.send(employee);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const person = await Person.findOne({
    where: {
      person_id: req.body.person_id
    }
  });

  if (!person) return res.status(400).send("Invalid person");
  const user = await User.findOne({
    where: {
      user_id: req.body.user_id
    }
  });

  if (!user) return res.status(400).send("Invalid person");

  let employee = new Employee({
    person_id: req.body.person_id,
    dpi: req.body.dpi,
    employee_cellphone: req.body.employee_cellphone,
    employee_address: req.body.employee_address,
    status: req.body.status
  });
  employee = await employee.save();
  res.send(employee);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const person = await Person.findOne({
    where: {
      person_id: req.body.person_id
    }
  });
  if (!person) return res.status(400).send("Invalid person");

  const user = await User.findOne({
    where: {
      user_id: req.body.user_id
    }
  });

  if (!user) return res.status(400).send("Invalid person");

  const id = req.params.id;
  const employee = await Employee.findOne({
    where: {
      employee_id: id
    }
  });
  if (!employee)
    return res
      .status(404)
      .send("The employee with the given ID was not found.");

  employee.update({
    person_id: req.body.person_id,
    dpi: req.body.dpi,
    employee_cellphone: req.body.employee_cellphone,
    employee_address: req.body.employee_address,
    status: req.body.status
  });

  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await Employee.findOne({
    where: {
      employee_id: id
    }
  });
  if (!employee)
    return res
      .status(404)
      .send("The employee with the given ID was not found.");
  employee.destroy();
  res.send(employee);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await Employee.findOne({
    where: {
      employee_id: id
    }
  });
  if (!employee)
    return res
      .status(404)
      .send("The employee with the given ID was not found.");

  res.send(employee);
});

module.exports = router;

import { sequelize } from "../config/db.js";
import Customer from "../models/customer.model.js";
import bcrypt from "bcrypt";
import util from "util";

async function createCustomer(customer) {
  try {
    return Customer.create(customer);
  } catch (err) {
    throw err;
  }
}

async function getCustomer(customerId) {
  try {
    return Customer.findOne({ where: { customerId: customerId } });
  } catch (err) {
    throw err;
  }
}

async function getCustomers() {
  try {
    return Customer.findAll();
  } catch (err) {
    throw err;
  }
}

async function updateCustomer(customer) {
  try {
    const [count, updatedCustomer] = await Customer.update(
      {
        name: customer.name,
        email: customer.email,
        password: customer.password,
        phone: customer.phone,
        address: customer.address,
      },
      {
        where: { customerId: customer.customerId },
        returning: true,
      }
    );

    return updatedCustomer[0].toJSON();
  } catch (err) {
    throw err;
  }
}

async function deleteCustomer(customerId) {
  try {
    const deletedCustomer = await Customer.destroy({
      where: { customerId: customerId },
    });

    return true;
  } catch (err) {
    throw err;
  }
}

async function getCustomerByEmail(email) {
  try {
    const customer = await Customer.findOne({
      where: { email: email },
    });
    if (customer) {
      return customer.dataValues;
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
}
export default {
  createCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail,
};

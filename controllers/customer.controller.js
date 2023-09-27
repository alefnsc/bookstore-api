import CustomerService from "../services/customer.service.js";

const requiredFields = ["name", "email", "password", "phone", "address"];

async function createCustomer(req, res, next) {
  try {
    let customer = req.body;
    for (const field of requiredFields) {
      if (!customer[field]) {
        res.status(400).send("Required field is missing: " + field);
      }
    }
    res.send(await CustomerService.createCustomer(customer));
    logger.info(`POST /customer - ${JSON.stringify(customer)}`);
  } catch (err) {
    next(err);
  }
}

async function getCustomers(req, res, next) {
  try {
    const customers = await CustomerService.getCustomers();
    res.send(customers);
    logger.info(`GET /customer - ${JSON.stringify(customers)}`);
  } catch (err) {
    next(err);
  }
}

async function getCustomer(req, res, next) {
  try {
    const customerId = req.params.id;
    const customer = await CustomerService.getCustomer(customerId);
    res.send(customer);
    logger.info(`GET /customer - ${JSON.stringify(customer)}`);
  } catch (err) {
    next(err);
  }
}

async function updateCustomer(req, res, next) {
  try {
    let customer = req.body;
    for (const field of requiredFields) {
      if (!customer[field]) {
        throw new Error("Required field is missing: " + field);
      }
    }
    const updatedCustomer = await CustomerService.updateCustomer(customer);
    if (updatedCustomer) {
      res.send(updatedCustomer);
    } else if (updatedCustomer === false) {
      throw new Error("Customer not found. customerId: " + customer.customerId);
    }
    logger.info(`POST /customer - ${JSON.stringify(customer)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteCustomer(req, res, next) {
  try {
    const customerId = req.params.id;
    const deletedCustomer = await CustomerService.deleteCustomer(customerId);
    if (deletedCustomer === true) {
      res.send("Customer deleted successfully");
    } else if (deletedCustomer === false) {
      throw new Error("Customer not found");
    } else if (deletedCustomer === "hasSales") {
      throw new Error(
        "Customer has associated sales. Deletion is not allowed."
      );
    }

    logger.info(`DELETE /customer/:id - ${JSON.stringify(customerId)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};

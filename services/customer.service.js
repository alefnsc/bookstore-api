import CustomerRepository from "../repositories/customer.repository.js";
import Sales from "../models/sale.model.js";

async function createCustomer(customer) {
  return await CustomerRepository.createCustomer(customer);
}

async function getCustomers() {
  return await CustomerRepository.getCustomers();
}

async function getCustomer(customerId) {
  return await CustomerRepository.getCustomer(customerId);
}

async function updateCustomer(customer) {
  const existantCustomer = await CustomerRepository.getCustomer(
    customer.customerId
  );
  if (existantCustomer) {
    return await CustomerRepository.updateCustomer(customer);
  } else {
    return false;
  }
}

async function deleteCustomer(customerId) {
  const existantCustomer = await CustomerRepository.getCustomer(customerId);

  if (existantCustomer) {
    const saleCount = await Sales.count({
      where: { customerId: customerId },
    });

    if (saleCount > 0) {
      return "hasSales";
    } else {
      return await CustomerRepository.deleteCustomer(customerId);
    }
  } else {
    return false;
  }
}

export default {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};

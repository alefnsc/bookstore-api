import SaleRepository from "../repositories/sale.repository.js";

async function createSale(sale) {
  return await SaleRepository.createSale(sale);
}

async function getSales() {
  return await SaleRepository.getSales();
}

async function getBookSales(bookId) {
  return await SaleRepository.getBookSales(bookId);
}

async function getAuthorSales(authorId) {
  return await SaleRepository.getAuthorSales(authorId);
}

async function getCustomerSales(customerId) {
  return await SaleRepository.getCustomerSales(customerId);
}

async function getSale(saleId) {
  return await SaleRepository.getSale(saleId);
}

async function updateSale(sale) {
  const existantSale = await SaleRepository.getSale(sale.saleId);
  if (existantSale) {
    return await SaleRepository.updateSale(sale);
  } else {
    return false;
  }
}

async function deleteSale(saleId) {
  return await SaleRepository.deleteSale(saleId);
}

export default {
  createSale,
  getSales,
  getBookSales,
  getAuthorSales,
  getCustomerSales,
  getSale,
  updateSale,
  deleteSale,
};

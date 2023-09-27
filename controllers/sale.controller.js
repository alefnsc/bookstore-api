import SaleService from "../services/sale.service.js";
import auth from "basic-auth";
const requiredFields = ["value", "date", "customerId", "bookId"];

async function createSale(req, res, next) {
  try {
    let sale = req.body;
    for (const field of requiredFields) {
      if (!sale[field]) {
        res.status(400).send("Required field is missing: " + field);
      }
    }
    res.send(await SaleService.createSale(sale));
    logger.info(`POST /sale - ${JSON.stringify(sale)}`);
  } catch (err) {
    next(err);
  }
}

async function getSales(req, res, next) {
  try {
    let sales;
    const bookId = req.query.bookId;
    const authorId = req.query.authorId;
    const customerId = req.query.customerId;
    if (bookId) {
      sales = await SaleService.getBookSales(bookId);
    } else if (authorId) {
      sales = await SaleService.getAuthorSales(authorId);
    } else if (customerId) {
      sales = await SaleService.getCustomerSales(customerId);
    } else {
      sales = await SaleService.getSales();
    }
    res.send(sales);
    logger.info(`GET /sale - ${JSON.stringify(sales)}`);
  } catch (err) {
    next(err);
  }
}

async function getSale(req, res, next) {
  try {
    const saleId = req.params.id;
    const sale = await SaleService.getSale(saleId);
    res.send(sale);
    logger.info(`GET /sale - ${JSON.stringify(sale)}`);
  } catch (err) {
    next(err);
  }
}

async function updateSale(req, res, next) {
  try {
    let sale = req.body;
    for (const field of requiredFields) {
      if (!sale[field]) {
        throw new Error("Required field is missing: " + field);
      }
    }
    res.send(await SaleService.updateSale(sale));
    logger.info(`POST /sale - ${JSON.stringify(sale)}`);
  } catch (err) {
    next(err);
  }
}

async function deleteSale(req, res, next) {
  try {
    const saleId = req.params.id;
    res.send(await SaleService.deleteSale(saleId));
    logger.info(`DELETE /sale/:id - ${JSON.stringify(saleId)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createSale,
  getSales,
  getSale,
  updateSale,
  deleteSale,
};

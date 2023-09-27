import { sequelize } from "../config/db.js";
import Sales from "../models/sale.model.js";

async function createSale(sale) {
  try {
    return Sales.create(sale);
  } catch (err) {
    throw err;
  }
}

async function getSale(saleId) {
  try {
    return Sales.findOne({ where: { saleId: saleId } });
  } catch (err) {
    throw err;
  }
}

async function getSales() {
  try {
    return Sales.findAll();
  } catch (err) {
    throw err;
  }
}

async function getBookSales(bookId) {
  try {
    const sales = await Sales.findAll({
      include: [
        {
          model: Book,
          where: {
            bookId: bookId,
          },
        },
      ],
    });

    return sales;
  } catch (err) {
    throw err;
  }
}

async function getCustomerSales(customerId) {
  try {
    const sales = await Sales.findAll({
      where: {
        customerId: customerId,
      },
    });

    return sales;
  } catch (err) {
    throw err;
  }
}

async function getAuthorSales(authorId) {
  try {
    const sales = await Sales.findAll({
      include: [
        {
          model: Book,
          where: {
            authorId: authorId,
          },
          include: [
            {
              model: Author,
            },
          ],
        },
      ],
    });

    return sales;
  } catch (err) {
    throw err;
  }
}

async function updateSale(sale) {
  try {
    const updatedSale = await Sales.update(
      {
        value: sale.value,
        date: sale.date,
        customerId: sale.customerId,
        bookId: sale.bookId,
      },
      {
        where: { saleId: sale.saleId },
        returning: true,
      }
    );

    return updatedSale[1];
  } catch (err) {
    throw err;
  }
}

export default {
  createSale,
  getSale,
  getAuthorSales,
  getBookSales,
  getCustomerSales,
  getAuthorSales,
  getSales,
  updateSale,
};

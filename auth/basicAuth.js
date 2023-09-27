import auth from "basic-auth";
import customerRepository from "../repositories/customer.repository.js";

async function basicAuth(req, res, next) {
  const user = auth(req);
  if (
    user.name &&
    user.name === "admin" &&
    user.pass === "desafio-igti-nodejs"
  ) {
    next();
  } else {
    const customer = await customerRepository.getCustomerByEmail(user.name);
    if (
      customer &&
      customer.email.toLowerCase() === user.name.toLowerCase() &&
      customer.password === user.pass
    ) {
      next();
    } else {
      res.statusCode = 401;
      res.end("Unautenthicated");
    }
  }
}

function getRole(username) {
  if (username == "admin") {
    return "admin";
  } else {
    return "user";
  }
}

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;
  return (req, res, next) => {
    const user = auth(req);
    if (user && user.name) {
      const role = getRole(user.name);
      if (isAllowed(role)) {
        next();
      } else {
        res.status(401).send("Forbidden");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  };
}

export { authorize, basicAuth };

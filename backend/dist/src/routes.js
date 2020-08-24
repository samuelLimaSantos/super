"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProductController_1 = __importDefault(require("./controllers/ProductController"));
var ProductMiddleware_1 = __importDefault(require("./middlewares/ProductMiddleware"));
var UserController_1 = __importDefault(require("./controllers/UserController"));
var LoginMiddleware_1 = __importDefault(require("./middlewares/LoginMiddleware"));
var SalesmanMiddleware_1 = __importDefault(require("./middlewares/SalesmanMiddleware"));
var routes = express_1.Router();
var productController = new ProductController_1.default();
var productMiddleware = new ProductMiddleware_1.default();
var userController = new UserController_1.default();
// User Routes
routes.post('/users/register', userController.createUser);
routes.post('/users/login', userController.loginUser);
// Product Routes
routes.post('/products', LoginMiddleware_1.default, SalesmanMiddleware_1.default, productMiddleware.isFieldEmpty, productController.create);
routes.get('/products', LoginMiddleware_1.default, productController.index);
routes.get('/products/filter', LoginMiddleware_1.default, productController.filter);
routes.put('/products/:id', LoginMiddleware_1.default, productController.sell);
exports.default = routes;

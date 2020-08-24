"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connections_1 = __importDefault(require("../database/connections"));
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, value, amount, image, user_id, productId, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, title = _a.title, value = _a.value, amount = _a.amount, image = _a.image;
                        user_id = request.user_id;
                        return [4 /*yield*/, connections_1.default('products').insert({
                                title: title,
                                value: value,
                                amount: amount,
                                image: image,
                                user_id: user_id,
                            })];
                    case 1:
                        productId = _b.sent();
                        return [4 /*yield*/, connections_1.default('products')
                                .select('products.*')
                                .where('products.id', '=', productId)];
                    case 2:
                        product = _b.sent();
                        return [2 /*return*/, response.json(product)];
                }
            });
        });
    };
    ProductController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connections_1.default('products')
                            .select('products.*')
                            .join('users', 'products.user_id', '=', 'users.id')
                            .select(['products.*', 'users.name', 'users.email', 'users.category'])];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, response.json(products)];
                }
            });
        });
    };
    ProductController.prototype.sell = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, quantity, _a, amount, value, newAmount, product;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.params.id;
                        quantity = request.body.quantity;
                        return [4 /*yield*/, connections_1.default('products')
                                .select('products.*')
                                .where('products.id', '=', id)];
                    case 1:
                        _a = (_b.sent())[0], amount = _a.amount, value = _a.value;
                        if (quantity > amount) {
                            return [2 /*return*/, response.json({ error: 'This product does not have stock' })];
                        }
                        newAmount = amount - quantity;
                        return [4 /*yield*/, connections_1.default('products').where('products.id', '=', id).update({
                                id: id,
                                value: value,
                                amount: newAmount,
                            })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, connections_1.default('products')
                                .select('products.*')
                                .where('products.id', '=', id)
                                .join('users', 'products.user_id', '=', 'users.id')
                                .select(['products.*', 'users.name', 'users.email', 'users.category'])];
                    case 3:
                        product = _b.sent();
                        return [2 /*return*/, response.status(201).json(product)];
                }
            });
        });
    };
    ProductController.prototype.filter = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var filters, title, price, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filters = request.query;
                        title = filters.title;
                        price = filters.price;
                        console.log(title, price);
                        return [4 /*yield*/, connections_1.default('products')
                                .select('products.*')
                                .where('products.title', 'like', "%" + title + "%")
                                .andWhere('products.value', '<=', Number(price))
                                .join('users', 'products.user_id', '=', 'users.id')
                                .select(['products.*', 'users.name', 'users.email', 'users.category'])];
                    case 1:
                        product = _a.sent();
                        console.log(product);
                        return [2 /*return*/, response.json(product)];
                }
            });
        });
    };
    return ProductController;
}());
exports.default = ProductController;

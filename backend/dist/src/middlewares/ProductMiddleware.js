"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductMiddleware = /** @class */ (function () {
    function ProductMiddleware() {
    }
    ProductMiddleware.prototype.isFieldEmpty = function (request, response, next) {
        var _a = request.body, title = _a.title, value = _a.value, amount = _a.amount;
        if (!title || !value || !amount) {
            return response
                .status(400)
                .json({ error: 'Bad Request: one or more fields are empty' });
        }
        next();
    };
    return ProductMiddleware;
}());
exports.default = ProductMiddleware;

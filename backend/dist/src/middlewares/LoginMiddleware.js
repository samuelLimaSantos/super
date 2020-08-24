"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var LoginMiddleware = /** @class */ (function () {
    function LoginMiddleware() {
    }
    LoginMiddleware.prototype.loginSection = function (request, response, next) {
        var bearer = request.headers.authorization;
        if (!bearer) {
            return response.status(401).json({ error: 'Token is missing' });
        }
        var token = bearer.split(' ')[1];
        try {
            var decode = jsonwebtoken_1.default.verify(token, 'segredo');
            request.user = decode;
            next();
        }
        catch (error) {
            return response.status(401).json({ error: 'Error in authentication' });
        }
    };
    return LoginMiddleware;
}());
exports.default = new LoginMiddleware().loginSection;

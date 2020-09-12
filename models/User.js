"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var Wallet_1 = require("./Wallet");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" })
    ], User.prototype, "id");
    __decorate([
        typeorm_1.OneToMany(function () { return Wallet_1.Wallet; }, function (wallet) { return wallet.user; })
    ], User.prototype, "wallets");
    User = __decorate([
        typeorm_1.Index("user_pkey", ["id"], { unique: true }),
        typeorm_1.Entity("user", { schema: "public" })
    ], User);
    return User;
}());
exports.User = User;

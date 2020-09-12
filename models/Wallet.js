"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Wallet = void 0;
var typeorm_1 = require("typeorm");
var Card_1 = require("./Card");
var User_1 = require("./User");
var Wallet = /** @class */ (function () {
    function Wallet() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" })
    ], Wallet.prototype, "id");
    __decorate([
        typeorm_1.Column("character varying", { name: "name", nullable: true })
    ], Wallet.prototype, "name");
    __decorate([
        typeorm_1.Column("character varying", { name: "currency", nullable: true })
    ], Wallet.prototype, "currency");
    __decorate([
        typeorm_1.Column("boolean", { name: "is_master_wallet", nullable: true })
    ], Wallet.prototype, "isMasterWallet");
    __decorate([
        typeorm_1.OneToMany(function () { return Card_1.Card; }, function (card) { return card.wallet; })
    ], Wallet.prototype, "cards");
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.wallets; }, {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT"
        }),
        typeorm_1.JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    ], Wallet.prototype, "user");
    Wallet = __decorate([
        typeorm_1.Index("wallet_pkey", ["id"], { unique: true }),
        typeorm_1.Entity("wallet", { schema: "public" })
    ], Wallet);
    return Wallet;
}());
exports.Wallet = Wallet;

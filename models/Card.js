"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Card = void 0;
var typeorm_1 = require("typeorm");
var Wallet_1 = require("./Wallet");
var Card = /** @class */ (function () {
    function Card() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" })
    ], Card.prototype, "id");
    __decorate([
        typeorm_1.Column("character varying", { name: "name", nullable: true })
    ], Card.prototype, "name");
    __decorate([
        typeorm_1.Column("character varying", { name: "currency", nullable: true })
    ], Card.prototype, "currency");
    __decorate([
        typeorm_1.Column("bigint", { name: "current_balance", nullable: true })
    ], Card.prototype, "currentBalance");
    __decorate([
        typeorm_1.Column("character varying", { name: "digits", nullable: true })
    ], Card.prototype, "digits");
    __decorate([
        typeorm_1.Column("date", { name: "expiration_date", nullable: true })
    ], Card.prototype, "expirationDate");
    __decorate([
        typeorm_1.Column("character varying", { name: "ccv", nullable: true })
    ], Card.prototype, "ccv");
    __decorate([
        typeorm_1.Column("character varying", { name: "status", nullable: true })
    ], Card.prototype, "status");
    __decorate([
        typeorm_1.ManyToOne(function () { return Wallet_1.Wallet; }, function (wallet) { return wallet.cards; }, {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT"
        }),
        typeorm_1.JoinColumn([{ name: "wallet_id", referencedColumnName: "id" }])
    ], Card.prototype, "wallet");
    Card = __decorate([
        typeorm_1.Index("card_pkey", ["id"], { unique: true }),
        typeorm_1.Entity("card", { schema: "public" })
    ], Card);
    return Card;
}());
exports.Card = Card;

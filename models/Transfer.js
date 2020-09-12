"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Transfer = void 0;
var typeorm_1 = require("typeorm");
var Transfer = /** @class */ (function () {
    function Transfer() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: "integer", name: "id" })
    ], Transfer.prototype, "id");
    __decorate([
        typeorm_1.Column("timestamp without time zone", { name: "timestamp" })
    ], Transfer.prototype, "timestamp");
    __decorate([
        typeorm_1.Column("bigint", { name: "amount_transfered" })
    ], Transfer.prototype, "amountTransfered");
    __decorate([
        typeorm_1.Column("character varying", { name: "origin_currency" })
    ], Transfer.prototype, "originCurrency");
    __decorate([
        typeorm_1.Column("character varying", { name: "target_currency" })
    ], Transfer.prototype, "targetCurrency");
    __decorate([
        typeorm_1.Column("numeric", { name: "conversion_fee", nullable: true })
    ], Transfer.prototype, "conversionFee");
    __decorate([
        typeorm_1.Column("integer", { name: "origin_entity_identifier" })
    ], Transfer.prototype, "originEntityIdentifier");
    __decorate([
        typeorm_1.Column("character varying", { name: "origin_entity_type" })
    ], Transfer.prototype, "originEntityType");
    __decorate([
        typeorm_1.Column("integer", { name: "target_entity_identifier" })
    ], Transfer.prototype, "targetEntityIdentifier");
    Transfer = __decorate([
        typeorm_1.Index("transfer_pkey", ["id"], { unique: true }),
        typeorm_1.Entity("transfer", { schema: "public" })
    ], Transfer);
    return Transfer;
}());
exports.Transfer = Transfer;

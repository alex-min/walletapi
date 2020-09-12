import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("transfer_pkey", ["id"], { unique: true })
@Entity("transfer", { schema: "public" })
export class Transfer {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", { name: "timestamp" })
  timestamp: Date;

  @Column("bigint", { name: "amount_transfered" })
  amountTransfered: string;

  @Column("character varying", { name: "origin_currency" })
  originCurrency: string;

  @Column("character varying", { name: "target_currency" })
  targetCurrency: string;

  @Column("numeric", { name: "conversion_fee", nullable: true })
  conversionFee: string | null;

  @Column("integer", { name: "origin_entity_identifier" })
  originEntityIdentifier: number;

  @Column("character varying", { name: "origin_entity_type" })
  originEntityType: string;

  @Column("integer", { name: "target_entity_identifier" })
  targetEntityIdentifier: number;
}

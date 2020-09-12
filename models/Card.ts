import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Wallet } from "./Wallet";

@Index("card_pkey", ["id"], { unique: true })
@Entity("card", { schema: "public" })
export class Card {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

  @Column("character varying", { name: "currency", nullable: true })
  currency: string | null;

  @Column("bigint", { name: "current_balance", nullable: true })
  currentBalance: string | null;

  @Column("character varying", { name: "digits", nullable: true })
  digits: string | null;

  @Column("date", { name: "expiration_date", nullable: true })
  expirationDate: Date | null;

  @Column("character varying", { name: "ccv", nullable: true })
  ccv: string | null;

  @Column("character varying", { name: "status", nullable: true })
  status: string | null;

  @ManyToOne(() => Wallet, (wallet) => wallet.cards, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "wallet_id", referencedColumnName: "id" }])
  wallet: Wallet;
}

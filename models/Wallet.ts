import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Card } from "./Card";
import { User } from "./User";

@Index("wallet_pkey", ["id"], { unique: true })
@Entity("wallet", { schema: "public" })
export class Wallet {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

  @Column("character varying", { name: "currency", nullable: true })
  currency: string | null;

  @Column("boolean", { name: "is_master_wallet", nullable: true })
  isMasterWallet: boolean | null;

  @OneToMany(() => Card, (card) => card.wallet)
  cards: Card[];

  @ManyToOne(() => User, (user) => user.wallets, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}

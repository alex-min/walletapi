import { Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Wallet } from "./Wallet";

@Index("user_pkey", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Wallet[];
}

import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("migrations_pkey", ["id"], { unique: true })
@Entity("migrations", { schema: "public" })
export class Migrations {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 255 })
  name: string;

  @Column("timestamp without time zone", { name: "run_on" })
  runOn: Date;
}

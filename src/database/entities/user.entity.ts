import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  fullname: string;

  @Column()
  pppokerId: string;

  @Column()
  phoneNumber: string;

  @Column()
  usdTexId: string;
}

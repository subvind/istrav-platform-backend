import { JoinColumn, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Member } from '../../members/entities/member.entity'
import { User } from "../../users/entities/user.entity";
import { Admin } from "../../admins/entities/admin.entity";
import { Client } from "../../clients/entities/client.entity";
import { Master } from "../../masters/entities/master.entity";

@Entity()
@Unique(["email"])
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: false })
  subscribe: boolean

  @Column({ default: false })
  agreement: boolean

  // within the UI we are allowing the auth of
  // only 1 session per account

  // relation selected website auth
  @Column({ type: "uuid", nullable: true })
  userId: string;
  @ManyToOne(() => User, user => user.accounts)
  @JoinColumn({ name: "accountId" })
  user: User;

  // relation selected ACP auth
  @Column({ type: "uuid", nullable: true })
  adminId: string;
  @ManyToOne(() => Admin, admin => admin.accounts)
  @JoinColumn({ name: "adminId" })
  admin: Admin;

  // relation selected CA auth
  @Column({ type: "uuid", nullable: true })
  clientId: string;
  @ManyToOne(() => Client, client => client.accounts)
  @JoinColumn({ name: "clientId" })
  client: Client;

  // relation selected webmaster auth
  @Column({ type: "uuid", nullable: true })
  masterId: string;
  @ManyToOne(() => Master, master => master.accounts)
  @JoinColumn({ name: "masterId" })
  master: Master;

  // relation users
  @OneToMany(() => User, user => user.account)
  users: User[];

  // relation admins
  @OneToMany(() => Admin, admin => admin.account)
  admins: Admin[];

  // relation clients
  @OneToMany(() => Client, client => client.account)
  clients: Client[];

  // relation masters
  @OneToMany(() => Master, master => master.account)
  masters: Master[];

  // record keeping
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: 1 })
  @VersionColumn()
  version: number;
}
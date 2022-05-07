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

  // relation users
  @OneToMany(() => User, user => user.accountId)
  users: User[];

  // relation admins
  @OneToMany(() => Admin, admin => admin.accountId)
  admins: Admin[];

  // relation clients
  @OneToMany(() => Client, client => client.accountId)
  clients: Client[];

  // relation masters
  @OneToMany(() => Master, master => master.accountId)
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
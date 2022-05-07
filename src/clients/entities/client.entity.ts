import { JoinColumn, ManyToOne, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Account } from '../../accounts/entities/account.entity'
import { Tenant } from '../../tenants/entities/tenant.entity'

@Entity()
@Unique(["username"])
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Length(4, 20)
  username: string

  @Column()
  password: string

  // relation account
  @Column({ type: "uuid", nullable: true })
  accountId: string;
  
  @ManyToOne(() => Account, account => account.id)
  @JoinColumn({ name: "accountId" })
  account: Account;
  
  // relation tenant
  @Column({ type: "uuid", nullable: true })
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.id)
  @JoinColumn({ name: "tenantId" })
  tenant: Tenant;

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
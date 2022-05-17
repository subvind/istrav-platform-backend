import { JoinColumn, ManyToOne, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Tenant } from '../../tenants/entities/tenant.entity'
import { Bill } from "../../bills/entities/bill.entity";

import { PAYMENT_INTENT_STATUS } from '../enums/status.enum'

@Entity()
// @Unique([])
export class Charge extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: 'processing' })
  status: PAYMENT_INTENT_STATUS

  @Column()
  description: string

  @Column()
  amount: number

  // relation bill/invoice
  @Column({ type: "uuid", nullable: true })
  billId: string;

  @OneToOne(() => Bill, bill => bill.charge)
  @JoinColumn({ name: "billId" })
  bill: Bill;

  // // relation members
  // @OneToMany(() => Member, member => member.charge)
  // members: Member[];

  // relation tenant/customer
  @Column({ type: "uuid", nullable: false })
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.charges)
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
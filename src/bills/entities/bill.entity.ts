import { JoinColumn, ManyToOne, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Tenant } from '../../tenants/entities/tenant.entity'
import { Amount } from "../../amounts/entities/amount.entity";
import { Charge } from "../../charges/entities/charge.entity";
import { LicenseKey } from "../../licenseKeys/entities/licenseKey.entity";

import { INVOICE_STATUS } from '../enums/status.enum'

@Entity()
// @Unique([])
export class Bill extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: 'open' })
  status: INVOICE_STATUS

  @Column()
  description: string

  // Whether payment was successfully collected for this invoice. An invoice can be paid (most commonly) with a charge or with credit from the customer’s account balance
  @Column({ default: false })
  paid: boolean
  
  // Total after discounts and taxes.
  @Column()
  total: number

  // bill/invoice is a statement of amounts/prices owned by a tenant/customer
  // relation amounts
  @OneToMany(() => Amount, amount => amount.bill)
  amounts: Amount[];

  // ability to change status from open to paid
  // The PaymentIntent associated with this invoice. The PaymentIntent is generated when the invoice is finalized, and can then be used to pay the invoice. Note that voiding an invoice will cancel the PaymentIntent.
  // relation charge/paymentIntents
  @Column({ type: "uuid", nullable: true })
  chargeId: string;

  @OneToOne(() => Charge, charge => charge.bill)
  @JoinColumn({ name: "chargeId" })
  charge: Charge;

  // The subscription that this invoice was prepared for, if any
  // relation licenseKey/subscription
  @Column({ type: "uuid", nullable: true })
  licenseKeyId: string;

  @ManyToOne(() => LicenseKey, licenseKey => licenseKey.bills)
  @JoinColumn({ name: "licenseKeyId" })
  licenseKey: LicenseKey;

  // relation tenant/customer
  @Column({ type: "uuid", nullable: false })
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.bills)
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
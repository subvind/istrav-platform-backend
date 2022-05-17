import { JoinColumn, ManyToOne, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Tenant } from '../../tenants/entities/tenant.entity'
import { Website } from "../../websites/entities/website.entity";
import { Amount } from "../../amounts/entities/amount.entity";
import { Bill } from "../../bills/entities/bill.entity";

import { SUBSCRIPTION_STATUS } from '../enums/status.enum'

@Entity()
@Unique(["token"])
export class LicenseKey extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: 'unpaid' })
  status: SUBSCRIPTION_STATUS

  @Column()
  token: string

  @Column({ default: '' })
  description: string

  // relation activate
  @Column({ type: "uuid", nullable: false })
  websiteId: string;

  @ManyToOne(() => Website, website => website.licenseKeys)
  @JoinColumn({ name: "websiteId" })
  website: Website;

  // invoices that have been generated for this subscription
  @OneToMany(() => Bill, bill => bill.licenseKey)
  bills: Bill[];
  
  // subscription items with attached price
  // relation amounts
  @OneToMany(() => Amount, amount => amount.licenseKey)
  amounts: Amount[];

  // relation tenant/customer
  @Column({ type: "uuid", nullable: false })
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.licenseKeys)
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
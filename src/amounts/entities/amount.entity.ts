import { JoinColumn, ManyToOne, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Tenant } from '../../tenants/entities/tenant.entity'
import { Website } from "../../websites/entities/website.entity";
import { Bill } from "../../bills/entities/bill.entity";
import { LicenseKey } from "../../licenseKeys/entities/licenseKey.entity";

@Entity()
// @Unique([])
export class Amount extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // amount for what? 
  // to license a tenant's website.
  @Column()
  value: number // amount in USD / Pennies per mounth

  // relation product/website
  // many websites may belong to the same amount
  // relation websites
  @OneToMany(() => Website, website => website.amount)
  websites: Website[];

  // relation licenseKey/subscription
  @Column({ type: "uuid", nullable: true })
  licenseKeyId: string;

  @ManyToOne(() => LicenseKey, licenseKey => licenseKey.amounts)
  @JoinColumn({ name: "licenseKeyId" })
  licenseKey: LicenseKey;

  // relation bill/invoice
  @Column({ type: "uuid", nullable: true })
  billId: string;

  @ManyToOne(() => Bill, bill => bill.amounts)
  @JoinColumn({ name: "billId" })
  bill: Bill;

  // relation tenant
  @Column({ type: "uuid", nullable: false })
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.amounts)
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
import { JoinColumn, ManyToOne, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Tenant } from '../../tenants/entities/tenant.entity'
import { Admin } from "../../admins/entities/admin.entity";

@Entity()
@Unique(["domainName"])
export class Website extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  domainName: string

  @Column()
  displayName: string

  // relation founder
  @Column({ type: "uuid", nullable: false })
  ownerId: string;

  @ManyToOne(() => Admin, admin => admin.id)
  @JoinColumn({ name: "ownerId" })
  owner: Admin;

  // relations
  @Column({ type: "uuid", nullable: false })
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
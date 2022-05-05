import { JoinColumn, ManyToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Tenant } from '../../tenants/entities/tenant.entity'

@Entity()
@Unique(["subdomain"])
export class SocialGroup extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  subdomain: string

  @Column()
  displayName: string

  // relations
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
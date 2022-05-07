import { JoinColumn, ManyToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Tenant } from '../../tenants/entities/tenant.entity'
import { Website } from '../../websites/entities/website.entity'
import { Member } from "../..//members/entities/member.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
@Unique(["subdomain"])
export class SocialGroup extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  subdomain: string

  @Column()
  displayName: string

  // relation founder
  @Column({ type: "uuid", nullable: false })
  ownerId: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: "ownerId" })
  owner: User;

  // relation members
  @OneToMany(() => Member, member => member.socialGroupId)
  members: Member[];

  // relation website
  @Column({ type: "uuid", nullable: false })
  websiteId: string;

  @ManyToOne(() => Website, website => website.id)
  @JoinColumn({ name: "websiteId" })
  website: Website;

  // relation tenant
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
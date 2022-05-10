import { JoinColumn, ManyToOne, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Website } from '../../websites/entities/website.entity'
import { User } from '../../users/entities/user.entity'
import { Tenant } from '../../tenants/entities/tenant.entity'
import { SocialGroup } from "../../socialGroups/entities/socialGroup.entity";

@Entity()
@Unique(["userId"])
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // relation user
  @Column({ type: "uuid", nullable: false })
  userId: string;

  @ManyToOne(() => User, user => user.members)
  @JoinColumn({ name: "userId" })
  user: User;

  // relation social group
  @Column({ type: "uuid", nullable: false })
  socialGroupId: string;

  @ManyToOne(() => SocialGroup, socialGroup => socialGroup.members)
  @JoinColumn({ name: "socialGroupId" })
  socialGroup: SocialGroup;

  // relation website
  @Column({ type: "uuid", nullable: false })
  websiteId: string;

  @ManyToOne(() => Website, website => website.members)
  @JoinColumn({ name: "websiteId" })
  website: Website;

  // relation tenant
  @Column({ type: "uuid", nullable: false })
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.members)
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
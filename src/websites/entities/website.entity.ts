import { JoinColumn, ManyToOne, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Tenant } from '../../tenants/entities/tenant.entity'
import { Admin } from "../../admins/entities/admin.entity";
import { User } from "../../users/entities/user.entity";
import { Member } from "../../members/entities/member.entity";
import { SocialGroup } from "../../socialGroups/entities/socialGroup.entity";
import { LicenseKey } from "../..//licenseKeys/entities/licenseKey.entity";

@Entity()
@Unique(["domainName"])
export class Website extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  domainName: string

  @Column()
  displayName: string

  // relation social groups
  @OneToMany(() => LicenseKey, licenseKey => licenseKey.website)
  licenseKeys: LicenseKey[];

  // relation social groups
  @OneToMany(() => SocialGroup, socialGroup => socialGroup.website)
  socialGroups: SocialGroup[];

  // relation users
  @OneToMany(() => User, user => user.website)
  users: User[]

  // relation admins
  @OneToMany(() => Admin, admin => admin.website)
  admins: Admin[]

  // relation founder
  @Column({ type: "uuid", nullable: true })
  ownerId: string;

  @ManyToOne(() => Admin, admin => admin.ownedWebsites)
  @JoinColumn({ name: "ownerId" })
  owner: Admin;

  // relation members
  @OneToMany(() => Member, member => member.website)
  members: Member[];

  // relation tenant
  @Column({ type: "uuid", nullable: false })
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.websites)
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
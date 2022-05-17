import { JoinColumn, ManyToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique, OneToOne } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Website } from '../../websites/entities/website.entity'
import { Member } from '../../members/entities/member.entity'
import { SocialGroup } from '../../socialGroups/entities/socialGroup.entity'
import { Admin } from "../../admins/entities/admin.entity";
import { Client } from "../../clients/entities/client.entity";
import { User } from "../../users/entities/user.entity";
import { LicenseKey } from "../../licenseKeys/entities/licenseKey.entity";
import { Amount } from "../../amounts/entities/amount.entity";
import { Bill } from "../../bills/entities/bill.entity";
import { Charge } from "../../charges/entities/charge.entity";

@Entity()
@Unique(["referenceId"])
export class Tenant extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  referenceId: string

  // relation founder
  @Column({ type: "uuid", nullable: true })
  ownerId: string;

  @OneToOne(() => Client, client => client.tenant)
  @JoinColumn({ name: "ownerId" })
  owner: Client;

  // relations
  @OneToMany(() => Charge, charge => charge.tenant)
  charges: Charge[];

  @OneToMany(() => Bill, bill => bill.tenant)
  bills: Bill[];

  @OneToMany(() => Amount, amount => amount.tenant)
  amounts: Amount[];

  @OneToMany(() => Admin, admin => admin.tenant)
  admins: Admin[];

  @OneToMany(() => Client, client => client.tenant)
  clients: Client[];
  
  @OneToMany(() => Member, member => member.tenant)
  members: Member[];
  
  @OneToMany(() => SocialGroup, socialGroup => socialGroup.tenant)
  socialGroups: SocialGroup[];

  @OneToMany(() => User, user => user.tenant)
  users: User[];

  @OneToMany(() => Website, website => website.tenant)
  websites: Website[];

  @OneToMany(() => LicenseKey, licenseKey => licenseKey.tenant)
  licenseKeys: LicenseKey[];

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
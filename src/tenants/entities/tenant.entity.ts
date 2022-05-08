import { JoinColumn, ManyToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Website } from '../../websites/entities/website.entity'
import { Member } from '../../members/entities/member.entity'
import { SocialGroup } from '../../socialGroups/entities/socialGroup.entity'
import { Admin } from "../../admins/entities/admin.entity";
import { Client } from "../../clients/entities/client.entity";
import { User } from "../../users/entities/user.entity";

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

  @ManyToOne(() => Client, client => client.id)
  @JoinColumn({ name: "ownerId" })
  owner: Client;

  // relations
  @OneToMany(() => Admin, admin => admin.tenantId)
  admins: Admin[];

  @OneToMany(() => Client, client => client.tenantId)
  clients: Client[];
  
  @OneToMany(() => Member, member => member.tenantId)
  members: Member[];
  
  @OneToMany(() => SocialGroup, socialGroup => socialGroup.tenantId)
  socialGroups: SocialGroup[];

  @OneToMany(() => User, user => user.tenantId)
  users: User[];

  @OneToMany(() => Website, website => website.tenantId)
  websites: Website[];

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
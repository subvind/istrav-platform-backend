import { JoinColumn, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Website } from '../../websites/entities/website.entity'
import { Member } from '../../members/entities/member.entity'
import { SocialGroup } from '../../socialGroups/entities/socialGroup.entity'

@Entity()
@Unique(["referenceId"])
@Unique(["slugId"])
export class Tenant extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  referenceId: string

  @Column()
  slugId: string

  // relations
  @OneToMany(() => Website, website => website.tenantId)
  websites: Website[];

  @OneToMany(() => Member, member => member.tenantId)
  members: Member[];
  
  @OneToMany(() => SocialGroup, socialGroup => socialGroup.tenantId)
  socialGroups: SocialGroup[];

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
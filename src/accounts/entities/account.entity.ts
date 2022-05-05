import { JoinColumn, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

import { Member } from '../../members/entities/member.entity'
// import { TeamMember } from '../teamMembers/teamMember.entity'

@Entity()
@Unique(["email"])
@Unique(["username"])
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string

  @Column()
  @Length(4, 20)
  username: string

  @Column()
  password: string

  @Column({ default: false })
  subscribe: boolean

  @Column({ default: false })
  agreement: boolean

  // give full control
  @Column({ default: false })
  isRoot: boolean

  // relations
  @OneToMany(() => Member, member => member.account)
  members: Member[];

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
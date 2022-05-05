import { JoinColumn, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

// import { Member } from '../members/member.entity'
// import { TeamMember } from '../teamMembers/teamMember.entity'

@Entity()
@Unique(["topLevelDomainName"])
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  topLevelDomainName: string

  @Column()
  displayName: string

  // relations
  // @OneToMany(() => Member, member => member.owner)
  // ownerships: Member[];

  // @OneToMany(() => Member, member => member.billingMember)
  // memberings: Member[];

  // @ManyToMany(() => Member, member => member.collaborators)
  // collaborations: Member[];

  // @Column({ type: "uuid", nullable: true })
  // teamMemberId: string;

  // @OneToOne(() => TeamMember, teamMember => teamMember.userId)
  // @JoinColumn({ name: "teamMemberId" })
  // teamMember: TeamMember;

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
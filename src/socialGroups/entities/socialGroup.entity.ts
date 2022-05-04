import { JoinColumn, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

// import { SocialGroup } from '../socialGroups/socialGroup.entity'
// import { TeamMember } from '../teamMembers/teamMember.entity'

@Entity()
@Unique(["topLevelDomainName"])
export class SocialGroup extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  topLevelDomainName: string

  @Column()
  displayName: string

  // relations
  // @OneToMany(() => SocialGroup, socialGroup => socialGroup.owner)
  // ownerships: SocialGroup[];

  // @OneToMany(() => SocialGroup, socialGroup => socialGroup.billingSocialGroup)
  // socialGroupings: SocialGroup[];

  // @ManyToMany(() => SocialGroup, socialGroup => socialGroup.collaborators)
  // collaborations: SocialGroup[];

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
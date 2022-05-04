import { JoinColumn, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

// import { Website } from '../websites/website.entity'
// import { TeamMember } from '../teamMembers/teamMember.entity'

@Entity()
@Unique(["topLevelDomainName"])
export class Website extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  topLevelDomainName: string

  @Column()
  displayName: string

  // relations
  // @OneToMany(() => Website, website => website.owner)
  // ownerships: Website[];

  // @OneToMany(() => Website, website => website.billingWebsite)
  // websiteings: Website[];

  // @ManyToMany(() => Website, website => website.collaborators)
  // collaborations: Website[];

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
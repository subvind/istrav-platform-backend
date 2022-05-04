import { JoinColumn, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Length, IsNotEmpty } from "class-validator"

// import { Website } from '../websites/website.entity'
// import { TeamMember } from '../teamMembers/teamMember.entity'

@Entity()
@Unique(["email"])
@Unique(["username"])
export class Website extends BaseEntity {
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
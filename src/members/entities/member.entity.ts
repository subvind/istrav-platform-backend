import { JoinColumn, ManyToOne, OneToOne, OneToMany, ManyToMany, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

import { Account } from '../../accounts/entities/account.entity'

@Entity()
@Unique(["id"])
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // relations
  @Column({ type: "uuid", nullable: true })
  accountId: string;

  @ManyToOne(() => Account, account => account.id)
  @JoinColumn({ name: "accountId" })
  account: Account;

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
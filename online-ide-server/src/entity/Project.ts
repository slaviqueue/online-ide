import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import Machine from './Machine'
import User from './User'
import Receipt from './Receipt'

@Entity()
class Project {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public name!: string

  @Column()
  public language!: string

  @Column({ nullable: true })
  public containerPort!: number

  @Column({ nullable: true })
  public containerId!: string

  @ManyToOne(() => Machine, (machine) => machine.projects)
  public machine!: Machine

  @Column()
  public ownerId!: number

  @ManyToOne(() => User, (owner) => owner.projects)
  public owner!: User

  @Column({ default: new Date().toISOString(), nullable: true, type: 'timestamp' })
  public lastVisited!: Date

  @Column({ default: false })
  public isActive!: boolean

  @OneToMany(() => Receipt, (receipt) => receipt.project)
  public receipts!: Receipt[]
}

export default Project

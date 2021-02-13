import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Machine from './Machine'
import User from './User'

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

  @ManyToOne(() => Machine, 'projects')
  public machine!: Machine

  @Column()
  public ownerId!: number

  @ManyToOne(() => User, 'projects')
  public owner!: User

  @Column({ default: new Date().toISOString(), nullable: true, type: 'timestamp' })
  public lastVisited!: Date

  @Column({ default: false })
  public isActive!: boolean
}

export default Project

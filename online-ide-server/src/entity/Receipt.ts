import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Project from './Project'

@Entity()
class Receipt {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public emoji!: string

  @Column()
  public command!: string

  @ManyToOne(() => Project, (project) => project.receipts)
  public project!: Project

  @Column()
  public projectId!: number
}

export default Receipt

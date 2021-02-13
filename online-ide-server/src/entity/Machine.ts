import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm'
import Project from './Project'

@Entity()
class Machine {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public host!: string

  @OneToMany(() => Project, (project) => project.machine)
  public projects!: Project[]
}

export default Machine

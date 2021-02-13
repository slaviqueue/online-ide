import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import Project from './Project'

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public email!: string

  @Column()
  public avatarUrl!: string

  @Column()
  public username!: string

  @OneToMany(() => Project, (project) => project.owner)
  public projects!: Project[]
}

export default User

import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity()
class Machine {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public host!: string
}

export default Machine

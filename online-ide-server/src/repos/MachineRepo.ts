import { Repository, EntityRepository } from 'typeorm'
import Machine from '../entity/Machine'

@EntityRepository(Machine)
class MachineRepo extends Repository<Machine> {
  public async getRandom (): Promise<Machine | undefined> {
    return this.createQueryBuilder().orderBy('RANDOM()').limit(1).getOne()
  }
}

export default MachineRepo

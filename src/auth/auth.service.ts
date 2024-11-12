import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Repository } from 'typeorm';
import { UserDetails } from 'src/types/user';

export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(details: UserDetails) {
    const user = await this.userRepository.findOneBy({ email: details.email });

    if (user) {
      return user;
    }

    const newUser = this.userRepository.create(details);

    return this.userRepository.save(newUser);
  }

  async findUser(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}

import { ObjectID } from 'mongodb';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User, { UserModel } from '../../infra/mongoose/schemas/User';

class FakeUsersRepository implements IUsersRepository {
  private users: UserModel[] = [];

  public async findById(
    id: ObjectID | string,
  ): Promise<UserModel | null | undefined> {
    const findUser = this.users
      .find(user => user.id === id)
      ?.populate('companies');

    return findUser;
  }

  public async findByEmail(
    email: string,
  ): Promise<UserModel | null | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<UserModel> {
    const user = new User();

    Object.assign(user, { id: new ObjectID() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: UserModel): Promise<UserModel | null> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;

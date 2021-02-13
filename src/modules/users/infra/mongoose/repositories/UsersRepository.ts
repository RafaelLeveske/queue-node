import { ObjectID } from 'mongodb';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User, { UserModel } from '../schemas/User';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  public async findById(
    id: ObjectID | string,
  ): Promise<UserModel | null | undefined> {
    const user = await User.findById(id).populate('companies');

    return user;
  }

  public async findByEmail(
    email: string,
  ): Promise<UserModel | null | undefined> {
    const user = await User.findOne({ email });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<UserModel> {
    const user = await User.create(userData);

    return user;
  }

  public async save(user: UserModel): Promise<UserModel | null> {
    const saveUser = await User.findOneAndUpdate(
      {
        _id: user.id,
      },
      {
        $set: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      },
    );

    return saveUser;
  }
}

export default UsersRepository;

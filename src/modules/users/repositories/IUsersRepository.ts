import { ObjectID } from 'mongodb';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import { UserModel } from '../infra/mongoose/schemas/User';

export default interface IUsersRepository {
  findById(id: ObjectID | string): Promise<UserModel | null | undefined>;
  findByEmail(email: string): Promise<UserModel | null | undefined>;
  create(data: ICreateUserDTO): Promise<UserModel>;
  save(user: UserModel): Promise<UserModel | null>;
}

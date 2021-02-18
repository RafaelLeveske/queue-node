import { UserModel } from '@modules/users/infra/mongoose/schemas/User';

export interface IRegistrationMail {
  data: UserModel;
}

export interface IMailProvider {
  sendEmail({ data }: IRegistrationMail): Promise<void>;
}

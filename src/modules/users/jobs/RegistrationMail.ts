import Mail from '@shared/lib/Mail';
import { UserModel } from '../infra/mongoose/schemas/User';

interface IRegistrationMail {
  data: UserModel;
}

export default {
  key: 'RegistrationMail',

  async handle({ data }: IRegistrationMail): Promise<void> {
    const { name, email } = data;
    await Mail.sendMail({
      to: {
        address: email,
        name,
      },
      subject: '[Queue - Node] - Teste',
      html: `Òlá, ${name} bem vindo ao Queue Node`,
    });
    console.log('Message sent!');
  },
};

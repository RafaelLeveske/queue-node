import ICreateUserDTO from '../dtos/ICreateUserDTO';
import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMail',

  async handle(data: ICreateUserDTO): Promise<void> {
    await Mail.sendMail({
      to: {
        address: data.email,
        name: data.name,
      },
      subject: '[Queue - Node] - Teste',
      html: `Òlá, ${data.name} bem vindo ao Queue Node`,
    });
  },
};

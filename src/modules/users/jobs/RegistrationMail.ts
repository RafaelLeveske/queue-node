import Mail from '../lib/Mail';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IRegistrationMail {
  data: ICreateUserDTO;
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

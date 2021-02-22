import nodemailer, { Transporter } from 'nodemailer';
import mailConfig from '@config/mail';

import IMailProvider, { IRegistrationMail } from '../../models/IMailProvider';

export default class MailtrapProvider implements IMailProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(mailConfig.defaults);
  }

  async sendEmail({ data }: IRegistrationMail): Promise<void> {
    const { name, email } = data;

    await this.transporter.sendMail({
      to: {
        name,
        address: email,
      },
      subject: '[Queue - Node] - Teste',
      html: `Òlá, ${name} bem vindo ao Queue Node`,
    });
    console.log('Message sent!');
  }
}

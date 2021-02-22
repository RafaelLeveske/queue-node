import { QueueOptions } from 'bull';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface MailConfig {
  driver: 'ses' | 'mailtrap';

  queue: QueueOptions;

  config: {
    mailtrap: SMTPTransport.Options;
    ses: object;
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'mailtrap',

  queue: {
    defaultJobOptions: {
      removeOnComplete: true,
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    },
    limiter: {
      max: 150,
      duration: 1000,
    },
  },

  config: {
    mailtrap: {
      host: 'smtp.mailtrap.io',
      port: 2525,
      ssl: false,
      tls: true,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    },

    ses: {},
  },
} as MailConfig;

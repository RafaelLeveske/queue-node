interface IMailConfig {
  defaults: {
    host: string;
    port: number;
    auth: {
      user: string;
      pass: string;
    };
  };
}

export default {
  defaults: {
    host: process.env.MAILTRAP_HOST || 'smtp.mailtrap.io',
    port: process.env.MAILTRAP_PORT || 2525,
    auth: {
      user: process.env.MAILTRAP_USER || '88d140616fbffe',
      pass: process.env.MAILTRAP_PASS || 'faf4921172eb48',
    },
  },
} as IMailConfig;

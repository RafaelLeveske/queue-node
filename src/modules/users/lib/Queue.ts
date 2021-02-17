import { Queue } from 'bullmq';
import redisConfig from '@config/redis';
import RegistrationMail from '../jobs/RegistrationMail';

const mailQueue = new Queue(RegistrationMail.key, {
  connection: redisConfig.config.redis,
});

export default mailQueue;

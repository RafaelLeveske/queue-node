import Queue from 'bull';
import redisConfig from '@config/redis';
import RegistrationMail from '../jobs/RegistrationMail';

const mailQueue = new Queue(RegistrationMail.key, `redis://127.0.0.1:6379`);

export default mailQueue;

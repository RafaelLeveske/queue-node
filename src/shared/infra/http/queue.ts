import dotenv from 'dotenv';
import Queue from '@modules/users/lib/Queue';
import RegistrationMail from '@modules/users/jobs/RegistrationMail';

dotenv.config();

Queue.process(RegistrationMail.handle);
console.log('Queue is on');

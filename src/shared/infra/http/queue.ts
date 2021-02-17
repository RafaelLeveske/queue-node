import dotenv from 'dotenv';
import { Worker } from 'bullmq';
import RegistrationMail from '@modules/users/jobs/RegistrationMail';

dotenv.config();

const worker = new Worker(RegistrationMail.key);

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

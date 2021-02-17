import dotenv from 'dotenv';

dotenv.config();

import { Worker } from 'bullmq';
import RegistrationMail from '@modules/users/jobs/RegistrationMail';

const worker = new Worker(RegistrationMail.key);

worker.on('completed', job => {
  console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

import dotenv from 'dotenv';

dotenv.config();

import Queue from '@modules/users/lib/Queue';

Queue.process();

// worker.on('completed', job => {
//   console.log(`${job.id} has completed!`);
// });

// worker.on('failed', (job, err) => {
//   console.log(`${job.id} has failed with ${err.message}`);
// });

import { Job, Queue, Worker } from 'bullmq';
import redisConfig from '@config/redis';
import AppError from '@shared/errors/AppError';
import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    connection: redisConfig.config.redis,
  }),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name: string, data: any): Promise<Job> {
    const queue = this.queues.find(
      queueFromQueueList => queueFromQueueList.name === name,
    );

    if (!queue) {
      throw new AppError('Queue do not exist', 400);
    }

    return queue.bull.add(name, queue.handle(data));
  },
  process(): void {
    return this.queues.forEach(queue => {
      const worker = new Worker(queue.name);

      worker.on('completed', job => {
        console.log(`${job.id} has completed!`);
      });

      worker.on('failed', (job, err) => {
        console.log(`${job.id} has failed with ${err.message}`);
      });
    });
  },
};

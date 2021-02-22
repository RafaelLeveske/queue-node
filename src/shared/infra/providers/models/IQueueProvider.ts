interface Job {
  data: object;
}

export default interface IQueueProvider {
  addJob(job: object): Promise<void>;
  process(processFunction: (job: Job) => Promise<void>): void;
}

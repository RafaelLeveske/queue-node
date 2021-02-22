import { container } from 'tsyringe';

import MailtrapProvider from './implementations/mail/MailTrapProvider';
import IMailProvider from './models/IMailProvider';
import IQueueProvider from './models/IQueueProvider';
import BullProvider from './implementations/queue/BullProvider';

container.registerSingleton<IMailProvider>('MailProvider', MailtrapProvider);

container.registerSingleton<IQueueProvider>('QueueProvider', BullProvider);

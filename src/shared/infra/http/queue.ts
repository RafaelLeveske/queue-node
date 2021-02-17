import dotenv from 'dotenv';

dotenv.config();

import Queue from '@shared/lib/Queue';

Queue.process();

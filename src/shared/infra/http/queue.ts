import dotenv from 'dotenv';

dotenv.config();

import Queue from '@modules/users/lib/Queue';

Queue.process();

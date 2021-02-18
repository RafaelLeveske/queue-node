import { Request, Response } from 'express';
import { container } from 'tsyringe';
import _ from 'lodash';
import CreateUserService from '@modules/users/services/CreateUserService';
import Queue from '@shared/lib/Queue';
import { BullProvider } from '@shared/infra/providers/implementations/queue/BullProvider';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const bullProvider = new BullProvider();

    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // await Queue.add('RegistrationMail', { data: user });

    await bullProvider.addJob({ job: user });

    return response.json(_.omit(user.toJSON(), ['password']));
  }
}

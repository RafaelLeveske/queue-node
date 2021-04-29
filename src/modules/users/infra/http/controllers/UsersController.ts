import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import queue from '@modules/users/lib/Queue';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const server = queue;

    const channel = await server.start();

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    await server.publishInQueue('GoQueue', JSON.stringify(user), channel);

    await server.publishInExchange(
      'amq.direct',
      'rota',
      JSON.stringify(user),
      channel,
    );

    return response.json(user);
  }
}

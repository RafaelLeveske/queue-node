import { Request, Response } from 'express';
import { container } from 'tsyringe';
import _ from 'lodash';
import CreateUserService from '@modules/users/services/CreateUserService';
import Queue from '@modules/users/lib/Queue';
import RegistrationMail from '@modules/users/jobs/RegistrationMail';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    await Queue.add(
      'SendRegistrationMailJob',
      RegistrationMail.handle({ data: user }),
    );

    return response.json(_.omit(user.toJSON(), ['password']));
  }
}

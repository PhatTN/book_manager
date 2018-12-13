import { UserDbGateway } from "Gateways/userDbGateway";
import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import { NewUserRequest } from "Models/user/newUserRequest";
import { UserResponse } from "Models/user/userResponse";

export interface UserRepository {
  createNewUser(request: NewUserRequest): Promise<UserResponse>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@inject(TYPES.UserDbGateway) private readonly userDbGateway: UserDbGateway) {}

  public createNewUser(request: NewUserRequest): Promise<UserResponse> {
    return this.userDbGateway.createNewUser(request);
  }
}

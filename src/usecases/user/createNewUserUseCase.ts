import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import { NewUserRequest } from "Models/user/newUserRequest";
import { UserRepository } from "Repositories/userRepository";
import { NewUserViewRequest } from "Viewobjects/user/newUserViewRequest";
import { UserViewResponse } from "Viewobjects/user/userViewReponse";

export interface CreateNewUserUseCase {
  execute(request: NewUserViewRequest): Promise<UserViewResponse>;
}

@injectable()
export class CreateNewUserUseCaseImpl implements CreateNewUserUseCase {
  constructor(@inject(TYPES.UserRepository) private readonly userRepository: UserRepository) {}

  public async execute(request: NewUserViewRequest): Promise<UserViewResponse> {
    const modelRequest = new NewUserRequest(request.id, request.name);

    const modelUser = await this.userRepository.createNewUser(modelRequest);

    return UserViewResponse.from(modelUser);
  }
}

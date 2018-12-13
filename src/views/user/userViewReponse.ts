import { UserResponse } from "Models/user/userResponse";

export class UserViewResponse {
  public static from(user: UserResponse): UserViewResponse {
    return new UserViewResponse(user.user_id, user.name, user.created_at, user.updated_at);
  }

  constructor(
    readonly id: string,
    readonly name: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}

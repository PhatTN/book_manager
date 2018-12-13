import { IllegalParameterError } from "Errors/illegalParameterError";
import { UserDbGateway } from "Gateways/userDbGateway";
import { UserResponse } from "Models/user/userResponse";
import "reflect-metadata";
import { UserRepositoryImpl } from "Repositories/userRepository";
import { TestConstants } from "Tests/utils/testConstants";
import { TestDateTimeHelper, TestDateTimeHelperImpl } from "Tests/utils/testDateTimeHelper";
import { createMockGateway } from "Tests/utils/testMockHelper";
import { CreateNewUserUseCase, CreateNewUserUseCaseImpl } from "Usecases/user/createNewUserUseCase";
import { NewUserViewRequest } from "Viewobjects/user/newUserViewRequest";
import { UserViewResponse } from "Viewobjects/user/userViewReponse";

describe("createNewUserUseCase", () => {
  const dateTimeHelper: TestDateTimeHelper = new TestDateTimeHelperImpl();

  beforeAll(() => {
    dateTimeHelper.mockDate(MOCK_TIME);
  });

  afterAll(() => {
    dateTimeHelper.resetDate();
  });

  it("should create new user successful when passing valid data", async () => {
    const gateway = createGateway(USER_RESPONSE_OBJECT);
    const useCase = createUseCase(gateway);

    expect.hasAssertions();
    const response = await useCase.execute(NEW_USER_VIEW_REQUEST);

    expect(gateway.createNewUser).toHaveBeenCalledTimes(1);
    expect(response).toEqual(USER_VIEW_RESPONSE_OBJECT);
    expect(gateway.createNewUser).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: NEW_USER_VIEW_REQUEST.id,
        name: NEW_USER_VIEW_REQUEST.name,
        created_at: new Date(MOCK_TIME),
        updated_at: new Date(MOCK_TIME),
      }),
    );
  });

  it("should throw exception when an error occurs in gateway", async () => {
    const expectedError = new Error("mock error");
    const gateway = createGateway(undefined, expectedError);
    const useCase = createUseCase(gateway);

    try {
      expect.hasAssertions();
      const response = await useCase.execute(NEW_USER_VIEW_REQUEST);
    } catch (error) {
      expect(gateway.createNewUser).toHaveBeenCalledTimes(1);
      expect(error).toBe(expectedError);
    }
  });

  it("should throw exception when passing an invalid request object", async () => {
    const gateway = createGateway(USER_RESPONSE_OBJECT);
    const useCase = createUseCase(gateway);

    try {
      expect.hasAssertions();
      const response = await useCase.execute({} as any);
    } catch (error) {
      expect(gateway.createNewUser).not.toHaveBeenCalled();
      expect(error).toBeInstanceOf(IllegalParameterError);
    }
  });

  function createGateway(response?: UserResponse, error?: Error): UserDbGateway {
    return createMockGateway<UserDbGateway, UserResponse>("createNewUser", response, error);
  }

  function createUseCase(gateway: UserDbGateway): CreateNewUserUseCase {
    const repository = new UserRepositoryImpl(gateway);
    return new CreateNewUserUseCaseImpl(repository);
  }

  const MOCK_TIME = TestConstants.MOCK_CURRENT_TIME;

  const NEW_USER_VIEW_REQUEST: NewUserViewRequest = {
    id: TestConstants.USER_ID,
    name: TestConstants.COMMON_NAME,
  };

  const USER_RESPONSE_OBJECT = new UserResponse(
    TestConstants.USER_ID,
    TestConstants.COMMON_NAME,
    TestConstants.CREATED_AT,
    TestConstants.UPDATE_AT,
  );

  const USER_VIEW_RESPONSE_OBJECT = new UserViewResponse(
    TestConstants.USER_ID,
    TestConstants.COMMON_NAME,
    TestConstants.CREATED_AT,
    TestConstants.UPDATE_AT,
  );
});

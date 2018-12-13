/* tslint:disable:import-name */
/* tslint:disable:no-implicit-dependencies */
import http from "http";
import knex from "knex";
import request from "supertest";
import { TEST_TYPES } from "Tests/integrations/testTypes";
import { TestConstants } from "Tests/utils/testConstants";
import { TestDatabaseHelper } from "Tests/utils/testDatabaseHelper";
import { TestDateTimeHelper } from "Tests/utils/testDateTimeHelper";
import { createAndInjectDependencies, createAndStartHttpServer } from "Tests/utils/testMockHelper";
import { KnextProvider } from "Utils/knexProvider";

describe("userProtectedRouter", () => {
  let httpServer: http.Server;
  let knexClient: knex;
  let databaseHelper: TestDatabaseHelper;
  let dateTimeHelper: TestDateTimeHelper;

  beforeAll(async (done) => {
    jest.setTimeout(20000);

    const container = createAndInjectDependencies();
    httpServer = createAndStartHttpServer(container);

    knexClient = container.get<KnextProvider>(TEST_TYPES.KnexProvider).knex();
    databaseHelper = container.get<TestDatabaseHelper>(TEST_TYPES.TestDatabaseHelper);
    dateTimeHelper = container.get<TestDateTimeHelper>(TEST_TYPES.TestDateTimeHelper);

    dateTimeHelper.mockDate(MOCK_CURRENT_TIME);
    done();
  });

  afterAll((done) => {
    dateTimeHelper.resetDate();
    httpServer.close(() => {
      knexClient.destroy().then(() => {
        done();
      });
    });
  });

  beforeEach(async (done) => {
    await databaseHelper.init();
    done();
  });

  afterEach(async (done) => {
    await databaseHelper.reset();
    done();
  });

  describe("POST /users", () => {
    it("able to create new user with USER role", async (done) => {
      const response = await makeCreateUserRequest("", SAMPLE_NEW_USER_BODY);

      expect(response.status).toEqual(201);
      expect(response.body).toMatchSnapshot();

      done();
    });

    it("should return error response when missing 'name'", async (done) => {
      const badBody = { ...SAMPLE_NEW_USER_BODY, ...{ name: undefined } };

      const response = await makeCreateUserRequest("", badBody);

      expect(response.status).toEqual(400);
      expect(response.body).toMatchSnapshot();

      done();
    });
  });

  function makeCreateUserRequest(token: string, body: {} = {}): Promise<request.Response> {
    return request(httpServer)
      .post("/users")
      .set("Content-Type", "application/json")
      .set("Authorization", token)
      .send(body);
  }

  const SAMPLE_NEW_USER_BODY = {
    id: "IuTA7TugquR1quhzRBhYUO17LQh5",
    name: "new user",
  };

  const MOCK_CURRENT_TIME = TestConstants.MOCK_CURRENT_TIME;
});

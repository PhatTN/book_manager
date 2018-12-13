import { Server } from "Apps/server";
import http from "http";
import { Container } from "inversify";
import { TestContainer } from "Tests/integrations/testContainer";
import { DateTimeUtils } from "Utils/dateTimeUtils";
import { TypeUtils } from "Utils/typeUtils";

export function createMockDateTimeUtils(expectedResult: [string, string]): DateTimeUtils {
  const mockDateTimeUtils = jest.fn<DateTimeUtils>(() => ({
    buildDateFromAndTo: jest.fn().mockReturnValue(expectedResult),
  }));
  return new mockDateTimeUtils();
}

export function createTypeUtils(shouldTrue: boolean = true, error?: Error): TypeUtils {
  const mockTypeUtils = jest.fn<TypeUtils>(() => ({
    toBoolean: jest.fn(() => {
      if (error) {
        throw error;
      }
      return shouldTrue;
    }),
  }));
  return new mockTypeUtils();
}

export function createMockGateway<R, T>(
  mockMethodName: string,
  responseObject: T,
  error?: Error,
): R {
  const mockGateway = jest.fn<R>(() => ({
    [mockMethodName]: jest.fn(() => {
      if (error) {
        return Promise.reject(error);
      }
      return Promise.resolve(responseObject);
    }),
  }));
  return new mockGateway();
}

export function createAndInjectDependencies(): Container {
  const testContainer = new TestContainer();
  testContainer.inject();

  return testContainer;
}

export function createAndStartHttpServer(container: Container): http.Server {
  const appServer = new Server(container);
  return appServer.start();
}

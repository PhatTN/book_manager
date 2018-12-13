import "reflect-metadata";
import { TestConstants } from "Tests/utils/testConstants";
import { IdValidator, IdValidatorImpl } from "Usecases/validator/idValidator";

describe("IdValidator", () => {
  const idValidator: IdValidator = new IdValidatorImpl();

  it("should return TRUE when passing VALID Id", () => {
    expect(idValidator.isValid(VALID_ID)).toEqual(true);
  });

  it("should return FALSE when passing INVALID Id", () => {
    expect(idValidator.isValid(INVALID_ID)).toEqual(false);
  });

  const VALID_ID = TestConstants.ID;
  const INVALID_ID = "invalid id";
});

import joi from "joi";

const envVarsSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .allow(["developement", "production", "staging", "test"])
      .required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env: string = envVars.NODE_ENV as string;

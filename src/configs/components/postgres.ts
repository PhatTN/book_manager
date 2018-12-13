import { PostgresConfig } from "Configs/appConfig";
import joi from "joi";

const envVarsSchema = joi
  .object({
    PSQL_HOST: joi.string().required(),
    PSQL_PORT: joi.number().required(),
    PSQL_USER: joi.string().required(),
    PSQL_PASSWORD: joi.string().required(),
    PSQL_DATABASE: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const postgresConfig: PostgresConfig = {
  host: envVars.PSQL_HOST as string,
  port: Number(envVars.PSQL_PORT as string),
  user: envVars.PSQL_USER as string,
  password: envVars.PSQL_PASSWORD as string,
  database: envVars.PSQL_DATABASE as string,
};

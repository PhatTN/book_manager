import { ServerConfig } from "Configs/appConfig";
import joi from "joi";

const envVarsSchema = joi
  .object({
    SERVER_PORT: joi.number().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validate error: ${error.message}`);
}

export const serverConfig: ServerConfig = {
  port: Number(envVars.SERVER_PORT as string),
};

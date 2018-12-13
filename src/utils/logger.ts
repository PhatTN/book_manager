import { TYPES } from "Injection/types";
import { inject, injectable } from "inversify";
import { meta } from "joi";
import { createLogger, format, Logger as LoggerInstance, LoggerOptions, transports } from "winston";

export interface Logger {
  debug(message: string, metaData?: any): void;
  verbose(message: string, metaData?: any): void;
  info(message: string, metaData?: any): void;
  warn(message: string, metaData?: any): void;
  error(message: string, metaData?: any): void;
}

@injectable()
export class WinstonLogger implements Logger {
  private instance: LoggerInstance;

  constructor(@inject(TYPES.NodeEnv) env: string) {
    let options: LoggerOptions;

    switch (env) {
      case "production": {
        // TODO will reconfig option for production
        options = {
          level: "info",
          format: format.json(),
          transports: [
            new transports.File({ filename: "error.log", level: "error" }),
            new transports.File({ filename: "combined.log" }),
          ],
        };
        break;
      }
      case "test": {
        options = {
          level: "info",
          format: format.simple(),
          transports: [
            new transports.File({ filename: "test_error.log", level: "error" }),
            new transports.File({ filename: "test_combined.log" }),
          ],
        };
        break;
      }
      case "staging": {
        options = {
          level: "info",
          format: format.simple(),
          transports: [
            new transports.File({ filename: "staging_error.log", level: "error" }),
            new transports.File({ filename: "staging_combined.log" }),
          ],
        };
        break;
      }
      case "development":
      default: {
        options = {
          level: "debug",
          format: format.simple(),
          transports: [new transports.Console()],
        };
      }
    }

    this.instance = createLogger(options);
  }

  public debug(message: string, metaData?: any): void {
    this.instance.log("debug", message, this.buildMetaData(metaData));
  }

  public verbose(message: string, metaData?: any): void {
    this.instance.log("verbose", message, this.buildMetaData(metaData));
  }

  public info(message: string, metaData?: any): void {
    this.instance.log("info", message, this.buildMetaData(metaData));
  }

  public warn(message: string, metaData?: any): void {
    this.instance.log("warn", message, this.buildMetaData(metaData));
  }

  public error(message: string, metaData?: any): void {
    this.instance.log("error", message, this.buildMetaData(metaData));
  }

  private buildMetaData(metaData: any): object {
    if (meta === undefined) {
      return undefined;
    }

    return { metaData };
  }
}

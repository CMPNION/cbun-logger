import { ILoggerConfig } from "./common/interfaces/logger-config.interface";
import { Formatter } from "./modules/format/format";
export class Logger {

  private config: ILoggerConfig;

  constructor(config: ILoggerConfig) {
    this.config = config;
  }

  public async log(message: string): Promise<void> {
    const formatter = new Formatter();
    const formattedMessage = await formatter.formatAll(this.config, message);
    console.log(formattedMessage);
  }

}

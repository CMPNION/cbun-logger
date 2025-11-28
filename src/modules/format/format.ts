import chalk from "chalk";
import { DateClass } from "../date/date-class";
import { ILoggerConfig } from "../../common/interfaces/logger-config.interface";

export class Formatter {
    // Фиксированная ширина для уровня логирования
    private readonly LOG_LEVEL_WIDTH = 7;  // [INFO], [WARN], [ERROR], [DEBUG]

    /**
     * Дополняет строку пробелами до нужной ширины
     */
    private padEnd(str: string, width: number): string {
        // Убираем ANSI коды для подсчёта реальной длины
        const realLength = str.replace(/\x1b\[[0-9;]*m/g, '').length;
        const padding = Math.max(0, width - realLength);
        return str + ' '.repeat(padding);
    }

    private async formatLogLevel(level: string): Promise<string> {
        let colored: string;
        const text = level.toUpperCase().padEnd(5); // INFO, WARN, ERROR, DEBUG - макс 5 символов
        
        switch (level) {
            case "info":
                colored = chalk.green(`[${text}]`);
                break;
            case "warn":
                colored = chalk.yellow(`[${text}]`);
                break;
            case "error":
                colored = chalk.red(`[${text}]`);
                break;
            case "debug":
                colored = chalk.magenta(`[${text}]`);
                break;
            default:
                colored = `[${text}]`;
        }
        
        return colored;
    }

    private async getLogLevelColor(level: string): Promise<[number, number, number]> {
        switch (level) {
            case "info":
                return [0, 255, 0]; // Green
            case "warn":
                return [255, 255, 0]; // Yellow
            case "error":
                return [255, 0, 0]; // Red
            case "debug":
                return [128, 128, 128]; // Gray
            default:
                return [255, 255, 255]; // White
        }
    }

    private async formatTimestamp(TZ?: string): Promise<string> {
        const dateClass = new DateClass();
        const timestamp = await dateClass.getCurrentTimestamp(TZ);
        return chalk.blue(timestamp);
    }

    private async formatModuleName(moduleName: string, color: [number, number, number]): Promise<string> {
        return chalk.rgb(color[0], color[1], color[2])(`[${moduleName}]`);
    }

    private async formatMessage(message: string, color: [number, number, number]): Promise<string> {
        return chalk.rgb(color[0], color[1], color[2])(message);
    }

    async formatAll(config: ILoggerConfig, message: string): Promise<string> {
        const parts: string[] = [];

        // Log Level (фиксированная ширина)
        parts.push(await this.formatLogLevel(config.logLevel));

        // Разделитель
        parts.push('-');

        // Timestamp
        if (config.timestamp.enabled) {
            parts.push(await this.formatTimestamp(config.timestamp.timezone));
        }

        const logColor = config.logColor || (config.module ? config.module.color : undefined) || await this.getLogLevelColor(config.logLevel);

        parts.push(await this.formatMessage("LOG", logColor));

        // Module Name
        if (config.module && config.module.name) {
            parts.push(await this.formatModuleName(config.module.name, config.module.color));
        }

        // Message
        parts.push(await this.formatMessage(message, logColor));

        return parts.join(' ');
    }

}
import { ILoggerConfig } from "./common/interfaces/logger-config.interface";
import { Logger } from "./main";

async function main() {
    const loggerConfig: ILoggerConfig = {
        module: {
            name: "TestModule",
            color: [0, 255, 128]
        },
        timestamp: {
            enabled: true,
            timezone: "Europe/Moscow"
        },
        logLevel: "info",
        logColor: [255, 255, 255]
};

    const logger = new Logger(loggerConfig);
    
    // Тест форматирования с разными уровнями логирования
    await logger.log("Какое то ооооооочень длинное сообщение для проверки форматирования \n следующей строки");

    
}

main();
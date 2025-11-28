/**
 * Конфигурация логгера
 */
export interface ILoggerConfig {
    /**
     * Название модуля, которое будет отображаться в логах. 
     * По стандарту, модуль показываться не будет
     * @example { name: "AuthModule", color: [0, 255, 0]  }
     */
    module?: {
        name: string;
        color: [number, number, number];
    }

    /**
     * Включить отображение временных меток в логах. 
     * @default { enabled: true, timezone: YOUR_SERVER_TIMEZONE }
     */
    timestamp: {
        enabled: boolean;
        timezone?: string;
    };

    /**
     * Уровень логирования
     * - `debug` - Общий уровень логирования -  серый
     * - `info` - Информационные сообщения - зеленый
     * - `warn` - Предупреждения - желтый
     * - `error` - Ошибки - красный
     * @default "info"
     */
    logLevel: "info" | "warn" | "error" | "debug";

    /**
     * Цвет текста в консоли (RGB). По стандарту равен цвету модуля, если модуль не задан, то цвету уровня логирования.
     * @example [255, 0, 0] для красного
     */
    logColor?: [number, number, number];

    
}
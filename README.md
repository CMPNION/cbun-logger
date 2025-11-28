# cbun-logger

Simple constructable logger styled for NestJS with colorful output.

## Installation

```bash
npm install cbun-logger
```

## Usage

```typescript
import { Logger, ILoggerConfig } from 'cbun-logger';

const config: ILoggerConfig = {
  logLevel: 'info',
  timestamp: {
    enabled: true,
    timezone: 'Europe/Moscow' // optional
  },
  module: {
    name: 'MyModule',
    color: [0, 255, 128] // RGB
  },
  logColor: [255, 255, 255] // optional, RGB
};

const logger = new Logger(config);

await logger.log('Hello, World!');
```

## Output Example

```
[INFO ] - 2025-11-28 13:00:00 LOG [MyModule] Hello, World!
[WARN ] - 2025-11-28 13:00:01 LOG [MyModule] Warning message
[ERROR] - 2025-11-28 13:00:02 LOG [MyModule] Error message
[DEBUG] - 2025-11-28 13:00:03 LOG [MyModule] Debug message
```

## Configuration

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `logLevel` | `"info" \| "warn" \| "error" \| "debug"` | Yes | Log level |
| `timestamp.enabled` | `boolean` | Yes | Enable/disable timestamp |
| `timestamp.timezone` | `string` | No | Timezone (e.g., "Europe/Moscow") |
| `module.name` | `string` | No | Module name to display |
| `module.color` | `[number, number, number]` | No | RGB color for module name |
| `logColor` | `[number, number, number]` | No | RGB color for message text |

## Log Levels

- `info` - Green
- `warn` - Yellow  
- `error` - Red
- `debug` - Magenta

## License

MIT

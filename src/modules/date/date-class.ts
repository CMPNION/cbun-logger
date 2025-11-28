import  moment from 'moment-timezone';

export class DateClass {
    async getCurrentTimestamp(TZ?: string): Promise<string> {
        if (TZ) {
            return moment().tz(TZ).format("YYYY-MM-DD HH:mm:ss");
        }
        return moment().format("YYYY-MM-DD HH:mm:ss");
    }
}
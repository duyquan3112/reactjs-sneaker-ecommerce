import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppError } from "./app-error.util";
import { AppLogger } from "./app-logger.util";

dayjs.extend(customParseFormat);

export enum DATETIME_FORMAT {
  ISO_SHORT = "YYYY-MM-DD", // ISO short
  VI = "DD/MM/YYYY", // Vietnamese style
  US = "MM/DD/YYYY", // US style
  SLASH = "YYYY/MM/DD", // Slash format
  FULL_ISO = "YYYY-MM-DD'T'HH:mm:ss.SSSX" // Full ISO
}

export class DateTimeUtil {
  static getDateFromString = (
    dateString: string,
    format?: DATETIME_FORMAT
  ): Date | null => {
    if (!dateString) return null;
    const formats: Array<string> = Object.values(DATETIME_FORMAT);
    try {
      let date: Date;

      // check is timestamp
      if (!isNaN(+dateString)) {
        date = this.fromUnix(+dateString);
      } else {
        // iso date
        date = dayjs(dateString, format ?? formats, true).toDate();
      }

      const isValid = dayjs(date).isValid();

      if (!isValid) {
        AppLogger.warn(`Unrecognized datetime format: ${dateString}`);
        return null;
      }

      return date;
    } catch (error) {
      AppLogger.error(`Get datetime failed: ${dateString}`, error);
      return null;
    }
  };

  static fromUnix = (timeStamp: number, format?: DATETIME_FORMAT): Date => {
    return format
      ? dayjs(timeStamp, format, true).toDate()
      : dayjs.unix(timeStamp).toDate();
  };

  static toUnix(date: string | Date): number {
    return dayjs(date).unix();
  }
}

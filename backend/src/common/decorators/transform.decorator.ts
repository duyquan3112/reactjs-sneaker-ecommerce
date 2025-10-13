import { Transform } from "class-transformer";
import { DateTimeUtil } from "../../utils/datetime.util";

export const TransformToDate = () =>
  Transform(({ value }) => {
    if (!value) return null;
    const date = DateTimeUtil.getDateFromString(value.trim());
    return date;
  });

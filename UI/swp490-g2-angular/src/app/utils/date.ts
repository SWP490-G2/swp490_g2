export class DateUtils {
  static fromDB(input: any): Date {
    return new Date(input * 1000);
  }

  static toDB(input: Date): any {
    return new Date(
      Date.UTC(
        input.getFullYear(),
        input.getMonth(),
        input.getDate(),
        input.getHours(),
        input.getMinutes(),
        input.getMilliseconds()
      )
    );
  }
}

import { BusinessException } from "../ngswag/client";

export * from "./CustomValidators";

export function getBusinessExceptionErrorCode(error: BusinessException): number {
  if (error instanceof BusinessException)
    return JSON.parse(JSON.parse(error.response).message).errorCode;

  return -1;
}

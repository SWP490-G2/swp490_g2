import { Address, BusinessException } from "../ngswag/client";

export * from "./CustomValidators";
export * from "./date";

export function getBusinessExceptionErrorCode(
  error: BusinessException
): number {
  if (error instanceof BusinessException)
    return JSON.parse(JSON.parse(error.response).message).errorCode;

  return -1;
}

export function getFullAddress(address?: Address): string {
  if (!address?.id) return "";

  return `${address.specificAddress}, ${address.ward?.wardName}, ${address.ward?.district?.districtName}, ${address.ward?.district?.city?.cityName}`;
}

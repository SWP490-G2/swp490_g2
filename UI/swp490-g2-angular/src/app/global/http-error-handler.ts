import { HttpStatusCode } from "@angular/common/http";
import { Injectable, ErrorHandler, NgZone } from "@angular/core";
import { MessageService } from "primeng/api";
import { ApiException } from "../ngswag/client";

@Injectable({
    providedIn: "root"
})
export class HttpErrorHandler implements ErrorHandler
{
    constructor(
        private $message: MessageService,
        private $zone: NgZone,
    )
    { }

    handleError(error: any)
    {
        if (!error)
            return;

        let message: string;
        if (ApiException.isApiException(error))
        {
            switch (error.status)
            {
                case HttpStatusCode.InternalServerError:
                    message = "Server gặp lỗi không xác định (500)";
                    break;

                case HttpStatusCode.Unauthorized:
                    message = "Người dùng hiện tại không có quyền thực hiện truy cập này (401)";
                    break;

                case HttpStatusCode.Forbidden:
                    message = "Người dùng hiện tại không có quyền thực hiện truy cập này (403)";
                    break;
            }
        }

        this.$zone.run(() =>
            this.$message.add(
                {
                    severity: "error",
                    detail: message || error.message || "Undefined client error",
                }
            )
        );
    }
}

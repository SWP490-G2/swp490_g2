import { ErrorHandler, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChangeAvatarCoverApplyRoutingModule } from "./change-avatar-cover-apply-routing.module";
import { ChangeAvatarCoverApplyComponent } from "./change-avatar-cover-apply.component";
import { HttpClientModule } from "@angular/common/http";
import { MessageService, ConfirmationService } from "primeng/api";
import { FileUploadModule } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";
import { HttpErrorHandler } from "src/app/global/http-error-handler";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [ChangeAvatarCoverApplyComponent],
  imports: [
    CommonModule,
    ChangeAvatarCoverApplyRoutingModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule,
    ButtonModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      // processes all errors
      provide: ErrorHandler,
      useClass: HttpErrorHandler,
    },
  ],
})
export class ChangeAvatarCoverApplyModule {}

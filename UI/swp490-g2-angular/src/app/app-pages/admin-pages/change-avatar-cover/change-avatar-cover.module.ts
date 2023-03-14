import { ErrorHandler, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChangeAvatarCoverRoutingModule } from "./change-avatar-cover-routing.module";
import { ChangeAvatarCoverComponent } from "./change-avatar-cover.component";
import { HttpClientModule } from "@angular/common/http";
import { FileUploadModule } from "primeng/fileupload";
import { MessageService, ConfirmationService } from "primeng/api";
import { HttpErrorHandler } from "src/app/global/http-error-handler";
import { ToastModule } from "primeng/toast";

@NgModule({
  declarations: [ChangeAvatarCoverComponent],
  imports: [
    CommonModule,
    ChangeAvatarCoverRoutingModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule,
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
export class ChangeAvatarCoverModule {}

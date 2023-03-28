import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgForm, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { finalize } from "rxjs";
import { AuthenticationResponse } from "src/app/ngswag/client";

@Component({
  selector: "app-update-restaurant-info-apply",
  templateUrl: "./update-restaurant-info-apply.component.html",
})
export class UpdateRestaurantInfoApplyComponent
  implements OnInit, AfterViewInit
{
  @ViewChild("form", { static: false }) form!: NgForm;
  selectedDelivery: any = null;
  time1: Date;
  time2: Date;
  time3: Date;
  time4: Date;
  deliveries: any[] = [
    { name: "Yes", key: "Y" },
    { name: "No", key: "N" },
  ];

  uploadedFiles: any[] = [];
  $addressClient: any;
  cities: any;
  address: any;
  districts: any;
  wards: any;
  $client: any;
  _registerButtonDisabled: boolean;
  codeValidatorDialogVisible: boolean;
  selectedGender: any;
  genders: any;

  constructor(private messageService: MessageService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form.controls["phoneNumber"].addValidators([
        Validators.required,
        Validators.pattern("^(0[3|5|7|8|9])+([0-9]{8})$"),
      ]);
      this.form.controls["phoneNumber"].updateValueAndValidity();
    }, 0);
  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: "info",
      summary: "File Uploaded",
      detail: "",
    });
  }

  updateResInfo(): void {
    this.$client
      .updateResInfo(this.form.value)
      .pipe(
        finalize(() => {
          this._registerButtonDisabled = false;
        })
      )
      .subscribe({
        next: (authenticationResponse: AuthenticationResponse) => {
          if (authenticationResponse.errorMessage) {
            throw new Error(authenticationResponse.errorMessage);
          }
          this.codeValidatorDialogVisible = true;
        },
      });
  }

  ngOnInit() {}
}

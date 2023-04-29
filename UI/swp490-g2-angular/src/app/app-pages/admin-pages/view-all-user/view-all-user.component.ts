import { Component, OnInit } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { switchMap, of, finalize } from "rxjs";
import { AdminClient, SearchRequest, User, UserStatus } from "src/app/ngswag/client";

@Component({
  selector: "app-view-all-user",
  templateUrl: "./view-all-user.component.html",
})
export class ViewAllUserComponent implements OnInit {
  statuses: any[];
  loading = true;
  activityValues: number[] = [0, 100];
  ngOnInit(): void {}
  userList: User[] = [];
  request: SearchRequest;
  users?: User;

  constructor(
    private $adminClient: AdminClient,
    private $confirmation: ConfirmationService
  ) {
    this.refresh();
  }

  refresh() {
    this.$adminClient.getAllUsers(new SearchRequest()).subscribe((res) => {
      if (!res.content) return;
      this.userList = res.content;
    });
  }

  unban(user: User) {
    this.$confirmation.confirm({
      header: "Confirmation",
      message: "Are you sure that you want to unban this user?",
      accept: () => {
        this.$adminClient
          .unbanUser(user)
          .pipe(
            switchMap((errorMessage) => {
              if (errorMessage) throw new Error(errorMessage);

              return of(undefined);
            }),
            finalize(() => {
              this.refresh();
            })
          )
          .subscribe();
      },
    });
  }

  getTotalUsersByStatus(userStatus: UserStatus) {
    return this.userList.filter(u => u.userStatus === userStatus).length;
  }
}

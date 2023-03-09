import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestOpenListComponent } from './request-open-list.component';

const routes: Routes = [{ path: '', component: RequestOpenListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestOpenListRoutingModule { }

import { Component } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent {
  selectedReason: string[] = [];
  displayModal: boolean;
  displayMaximizable: boolean;
  showModalDialog() {
    this.displayModal = true;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
}

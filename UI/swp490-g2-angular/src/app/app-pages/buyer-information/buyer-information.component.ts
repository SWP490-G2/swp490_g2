import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-buyer-information',
  templateUrl: './buyer-information.component.html',
  styleUrls: ['./buyer-information.component.scss']
})

export class BuyerInformationComponent implements OnInit {
  @ViewChild('form', { static: false }) form!: NgForm;

  cities: City[];
  selectedCity: City;
  uploadedFiles: any[] = [];

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  ngOnInit() {
  }

  constructor(private messageService: MessageService,
    private $router: Router,
    private $route: ActivatedRoute,) {
    this.cities = [
      { name: 'Hà Nội', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  navToOpenRestaurantRequest() {
    this.$router.navigate(['open-restaurant-request'], { relativeTo: this.$route });
  }

}

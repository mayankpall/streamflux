import { Component, OnInit } from '@angular/core';
import { FlaskApiService } from '../flask-api.service';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.css']
})
export class DeviceDataComponent implements OnInit {
  deviceId!: number;
  data: any[] = [];  // Array to store the response data
  errorMessage: string | null = null;

  constructor(private flaskApiService: FlaskApiService) { }

  ngOnInit(): void { }

  getData(): void {
    this.flaskApiService.getData(this.deviceId).subscribe(
      response => {
        this.data = response;  // Assign response to data array
        this.errorMessage = null;  // Clear any previous errors
      },
      error => {
        console.error('Error fetching data', error);
        this.errorMessage = 'An error occurred while fetching data. Please try again.';
      }
    );
  }
}

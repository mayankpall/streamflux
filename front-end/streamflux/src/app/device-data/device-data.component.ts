import { Component, OnInit } from '@angular/core';
import { FlaskApiService } from '../flask-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.css']
})
export class DeviceDataComponent implements OnInit {
  deviceId!: string;
  data: any[] = [];  // Array to store the response data
  errorMessage: string | null = null;
  sub: any;

  constructor(private flaskApiService: FlaskApiService, private route: ActivatedRoute) { 
   
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.deviceId = params['id'];
      });
      console.log(this.deviceId);
    
      this.getData();

   
   }
   ngOnAfterInit():void{
   }

  getData(): void {
    console.log("here");
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

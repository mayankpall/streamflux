import { Component, OnInit } from '@angular/core';
import { FlaskApiService } from '../flask-api.service';
import { ActivatedRoute } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts'; // Import ScaleType

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.css']
})
export class DeviceDataComponent implements OnInit {
  deviceId!: string;
  data: any = []; // Data for the chart
  errorMessage: string | null = null;
  sub: any;
  
  // Define the chart view dimensions
  view: [number, number] = [1000, 500]; // Larger width for better visualization

  // Define the color scheme properly typed using the Color interface
  colorScheme: Color = {
    domain: ['#0000FF'], // Blue color for line
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal // Use the ScaleType enum
  };

  // Chart data
  chartData: any[] = [];
  
  // Flag to control temporary data mode
  showTempData: boolean = false;

  constructor(private flaskApiService: FlaskApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.deviceId = params['id'];
      this.getData();
    });
  }

  // Fetch real data from API
  getData(): void {
    if (this.showTempData) {
      this.generateTempData(); // Display temporary data if flag is set
    } else {
      this.flaskApiService.getData(this.deviceId).subscribe(
        (response: any) => {
          this.data = response;
          this.errorMessage = null;
          this.prepareChartData(); // Convert the data into chart format
        },
        error => {
          console.error('Error fetching data', error);
          this.errorMessage = 'An error occurred while fetching data. Please try again.';
        }
      );
    }
  }

  // Method to generate temporary data
  generateTempData(): void {
    const now = new Date();
    const numberOfDataPoints = 50; // Generate 50 random data points
    this.data = Array.from({ length: numberOfDataPoints }).map((_, index) => ({
      device_id: this.deviceId,
      water_level: (Math.random() * 2) + 4, // Random water level between 4 and 6
      timestamp: new Date(now.getTime() - index * 3600000).toISOString() // Subtract 1 hour per data point
    }));

    this.prepareChartData(); // Prepare the chart data based on the temporary data
  }

  // Prepare data for chart
  prepareChartData(): void {
    const series = this.data.map((item: any) => ({
      name: new Date(item.timestamp).toLocaleString(), // Includes both date and time
      value: item.water_level // Assuming you are charting water level
    }));

    this.chartData = [{
      name: `Device ${this.deviceId}`,
      series: series
    }];
  }

  // Toggle between real data and temporary data
  toggleTempData(): void {
    this.showTempData = !this.showTempData;
    this.getData(); // Refresh data display based on the current mode
  }
}

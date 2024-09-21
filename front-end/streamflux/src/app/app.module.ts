import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DeviceDataComponent } from './device-data/device-data.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';  // <-- Import ngx-charts

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: DeviceDataComponent }, // This is the route for pin details page
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeviceDataComponent  // Create this component separately for pin details
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgxChartsModule,  // <-- Include ngx-charts in imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

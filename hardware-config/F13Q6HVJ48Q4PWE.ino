
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <time.h>
// defines pins numbers
const int trigPin = 2;  //D4
const int echoPin = 0;  //D3
#define LED D0 
// defines variables
long duration;
int distance;
 const String ssid="Vaish ";
 const String password="rhyc0978";
 //const String ssid="Mayank's iPhone";
 //const String password="mayank123";
void setupwifi()
{
 
  WiFi.begin(ssid,password);
  Serial.println("\nConnecting...");

  while(WiFi.status()!=WL_CONNECTED){
    Serial.println(".");
    delay(100);
  }
  Serial.println("Connected to Wifi");
  Serial.println("ESP8266 IP: ");
  Serial.println(WiFi.localIP());

}

void callApi(int distance) {
  if(WiFi.status() == WL_CONNECTED) {
    Serial.println("Calling API");
    WiFiClient client;
    HTTPClient http;

/********************************REPLACE IP HERE:**********************************************/
    String serverPath = "http://192.168.102.132:5000/store";
    http.begin(client, serverPath);
     http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    char value[10];
    itoa(distance, value, 10);

    time_t mytime = time(NULL);
    char* time_str = ctime(&mytime);
    time_str[strlen(time_str) - 1] = '\0';  // Remove newline character

    char httpRequestData[500] = "";  // Initialize the request data as an empty string
    strcat(httpRequestData, "device_id=1&water_level=");
    strcat(httpRequestData, value);
    strcat(httpRequestData, "&timestamp=");
    strcat(httpRequestData, time_str);

    int httpResponseCode = http.POST(httpRequestData);

    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    http.end();  // Free the resources
  } else {
    Serial.println("WiFi disconnected");
    setupwifi();  // Attempt to reconnect to WiFi
  }
  }
void setup() {
  pinMode(LED, OUTPUT);  
Serial.begin(9600); // Starts the Serial communication
Serial.print("Setting up");
pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
pinMode(echoPin, INPUT); // Sets the echoPin as an Input
setupwifi();
Serial.print("Setup completed");
}

void loop() {
// Clears the trigPin
digitalWrite(LED, HIGH);
digitalWrite(trigPin, LOW);
delayMicroseconds(2);

// Sets the trigPin on HIGH state for 10 micro seconds
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);

// Reads the echoPin, returns the sound wave travel time in microseconds
duration = pulseIn(echoPin, HIGH);

// Calculating the distance
distance= duration*0.034/2;
// Prints the distance on the Serial Monitor
Serial.print("Distance: ");
Serial.println(distance);
callApi(distance);
digitalWrite(LED, LOW);
delay(2000);
}



# Streamflux - Device Data Visualization

A web application for visualizing real-time water level data using ngx-charts and Angular, with a Python backend.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14.x or later)
- [Python 3](https://www.python.org/downloads/) (v3.x or later)

### Setup Instructions

1. **Run the Backend (Python Server)**:
   
   First, navigate to the project root and start the Python server.

   ```bash
   python3 server.py
   ```

   The server should now be running at:

   ```
   http://localhost:5000
   ```

2. **Set Up the Frontend**:

   Open a new terminal, then navigate to the front-end directory and install the required dependencies:

   ```bash
   cd front-end/streamflux
   npm install
   ```

   After installing, you can run the development server:

   ```bash
   npm run dev
   ```

   The front-end should now be running at:

   ```
   http://localhost:4200
   ```

### Access the Application

Open your browser and navigate to `http://localhost:4200` to see the device data visualization.



# VeriPak QC Dashboard

A modern, industrial SaaS-style Quality Control dashboard for manufacturing facilities.

## Features

- **Real-time KPI Monitoring**: Track total products, quality rejects, reject rates, and top reject categories
- **Line Summary**: Detailed product-level data with operator information and reject metrics
- **Visual Analytics**: Gauge-style indicators and bar charts for quick insights
- **Dark Mode**: Full light/dark mode support with user preference persistence
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **CSV Data Support**: Built-in CSV parsing and data transformation capabilities

## Technologies

- Pure HTML5, CSS3, and JavaScript (no frameworks required)
- Modern CSS Grid and Flexbox layouts
- CSS Variables for theming
- LocalStorage for user preferences

## Color Palette

- Primary Blue: #31A9E0 (from AQS Logo)
- Secondary Gray: #A1A1A1 (from AQS Logo)
- Success Green: #28a745
- Danger Red: #dc3545

## Usage

Simply open `index.html` in a web browser. The dashboard includes sample data for demonstration purposes.

### Loading CSV Data

The dashboard supports CSV file upload with the following expected columns:
- Product
- UPC
- Operator
- Hours
- InspectionRejects / InspectionKPI
- WeightRejects / WeightKPI
- MDRejects / MDKPI
- TotalUnits

## Files

- `index.html` - Main dashboard structure
- `styles.css` - Complete styling with dark mode support
- `dashboard.js` - Dashboard functionality and CSV parsing
- `CODE/LOGO/AQS Logo 3.svg` - Company logo

## License

Copyright © 2024. All rights reserved.
 

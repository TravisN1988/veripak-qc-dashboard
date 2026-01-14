# VeriPak QC Dashboard - Developer Documentation

## Purpose
This document establishes a common naming convention and reference guide for the VeriPak QC Dashboard. Use these standardized terms when describing components, sections, or issues to ensure clear communication.

---

## Table of Contents
1. [Dashboard Sections](#dashboard-sections)
2. [Component Reference](#component-reference)
3. [HTML Element IDs & Classes](#html-element-ids--classes)
4. [CSS Class Naming Convention](#css-class-naming-convention)
5. [JavaScript Object Structure](#javascript-object-structure)
6. [Color Palette](#color-palette)
7. [File Structure](#file-structure)

---

## Dashboard Sections

### Section 0: Page Shell
- **Name**: Page Shell / Body Container
- **Description**: Full-width dashboard canvas with gradient background
- **HTML Element**: `<body class="light-mode">` or `<body class="dark-mode">`
- **CSS Classes**: `.light-mode`, `.dark-mode`

### Section 1: Top Header Bar
- **Name**: Top Header / Main Header
- **Components**:
  - **Logo Area**: Left side logo container
    - Element ID: None
    - CSS Class: `.logo-wrapper`
  - **Vertical Divider**: Separator between logo and title
    - CSS Class: `.header-divider`
  - **Dashboard Title**: "VeriPak QC Dashboard"
    - CSS Class: `.page-title`
  - **User Label**: "User: QC Manager"
    - CSS Class: `.user-label`
  - **Theme Toggle**: Light/Dark mode switch
    - Element ID: `#darkModeToggle`
    - CSS Classes: `.theme-toggle`, `.toggle-switch`, `.toggle-slider`

### Section 2: Filter Row
- **Name**: Filter Section / Control Bar
- **Components**:
  - **Line Selector**: Dropdown for production line selection
    - Element ID: `#lineSelect`
    - CSS Class: `.filter-select`
  - **Date Range Inputs**: Start and end date/time pickers
    - Start Input ID: `#dateStart`
    - End Input ID: `#dateEnd`
    - CSS Classes: `.date-range-inputs`, `.date-input`
  - **View UPC Button**: Primary action button
    - Element ID: `#viewUpcBtn`
    - CSS Class: `.btn-primary`

### Section 3: KPI Summary Strip
- **Name**: KPI Section / Metrics Card
- **Container**:
  - CSS Class: `.kpi-card`
- **KPI Blocks** (4 total):
  1. **Total Products Ran**
     - Element ID: `#totalProducts`
  2. **Total Quality Rejects**
     - Element ID: `#totalRejects`
  3. **Overall Reject Rate**
     - Element ID: `#rejectRate`
  4. **Top Reject Category**
     - Element ID: `#topCategory`
- **KPI Components**:
  - Label: CSS Class `.kpi-label`
  - Value: CSS Class `.kpi-value`
  - Divider: CSS Class `.kpi-divider`

### Section 4: Line Summary Header
- **Name**: Line Summary Header
- **Component**:
  - Section Title: "Line Summary"
    - CSS Class: `.section-title`

### Section 5: Line Summary Table
- **Name**: Line Summary Table / Product Table
- **Table ID**: `#summaryTableBody` (tbody element)
- **Table Structure**:
  - **Column 1: Product & UPC**
    - Header Class: `.col-product`
    - Cell Class: `.product-cell`
    - Sub-elements: `.product-name`, `.product-upc`
  - **Column 2: Operators**
    - Header Class: `.col-operators`
    - Cell Class: `.operators-cell`
    - Sub-elements: `.operator-line`, `.operator-hours`
  - **Column 3: Inspection Rejects**
    - Header Class: `.col-rejects`
    - Cell Class: `.reject-cell`
    - Sub-elements: `.reject-value`, `.reject-gauge`, `.kpi-badge`
  - **Column 4: Weight Rejects**
    - Header Class: `.col-rejects`
    - Cell Class: `.reject-cell`
  - **Column 5: MD Rejects**
    - Header Class: `.col-rejects`
    - Cell Class: `.reject-cell`
  - **Column 6: Actions**
    - Header Class: `.col-actions`
    - Cell Class: `.actions-cell`
    - Button Class: `.btn-view-csv`

### Section 6: Combined Reject Charts
- **Name**: Charts Section / Reject Visualization
- **Container**: CSS Class `.charts-section`
- **Chart Cards** (3 total):
  1. **Inspection Rejects Chart**
  2. **Weight Rejects Chart**
  3. **MD Rejects Chart**
- **Chart Components**:
  - Card: `.chart-card`
  - Title: `.chart-title`
  - Value: `.chart-value`
  - Badge: `.kpi-badge`
  - Bars: `.bar-chart`, `.bar`

---

## Component Reference

### Buttons
- **Primary Button**: `.btn-primary` (blue, used for main actions)
- **View CSV Button**: `.btn-view-csv` (blue, table action)
- **Secondary Button**: `.btn-secondary` (gray, used for clear/cancel)

### Form Controls
- **Dropdown/Select**: `.filter-select`
- **Text Input**: `.filter-input`
- **Date Input**: `.date-input`

### Status Indicators
- **Success (Green)**: `.kpi-success`, `.gauge-success`, `.kpi-badge-success`
- **Danger (Red)**: `.kpi-danger`, `.gauge-danger`, `.kpi-badge-danger`

### Gauge Components
- **Gauge Container**: `.reject-gauge`
- **Gauge Bar**: `.gauge-bar`
- **Gauge Fill**: `.gauge-fill`
- **Gauge Dot**: `.gauge-dot`

---

## HTML Element IDs & Classes

### Global IDs
```
#darkModeToggle          - Dark mode checkbox input
#lineSelect              - Production line dropdown
#dateStart               - Start date/time input
#dateEnd                 - End date/time input
#viewUpcBtn              - View UPC File button
#totalProducts           - Total products KPI value
#totalRejects            - Total rejects KPI value
#rejectRate              - Reject rate KPI value
#topCategory             - Top category KPI value
#summaryTableBody        - Table body for product rows
```

### Common Classes by Purpose

**Layout & Structure**:
```css
.top-header              - Main header bar
.filter-section          - Filter controls area
.kpi-section             - KPI metrics section
.line-summary-section    - Line summary area
.charts-section          - Charts grid
```

**Cards & Containers**:
```css
.kpi-card                - KPI summary card
.summary-table-card      - Table container card
.chart-card              - Individual chart card
```

**Table Elements**:
```css
.summary-table           - Main table element
.product-row             - Table row for products
.product-cell            - Product & UPC cell
.operators-cell          - Operators cell
.reject-cell             - Reject data cell
.actions-cell            - Actions button cell
```

**Typography**:
```css
.page-title              - Main dashboard title
.section-title           - Section headers
.kpi-label               - KPI metric labels
.kpi-value               - KPI metric values
.product-name            - Product name text
.product-upc             - UPC code text
.operator-line           - Individual operator row
```

---

## CSS Class Naming Convention

### Naming Pattern
- **Component**: `.component-name` (e.g., `.kpi-card`)
- **Element**: `.component-name-element` (e.g., `.kpi-label`)
- **Modifier**: `.component-name--modifier` (e.g., `.btn-primary`)
- **State**: `.component-name.state` (e.g., `.product-row:hover`)

### Status Modifiers
- `-success`: Green status (within KPI)
- `-danger`: Red status (over KPI)
- `-primary`: Primary blue color
- `-secondary`: Secondary gray color

### Size Modifiers
- `-sm`: Small variant
- `-md`: Medium variant (default)
- `-lg`: Large variant

---

## JavaScript Object Structure

### Main Dashboard Class
```javascript
class VeriPakDashboard {
    csvData: Array           // Product data array
    currentLine: String      // Selected production line
    dateRange: String        // Current date range string
}
```

### Product Data Object
```javascript
{
    product: String          // Product name
    upc: String              // UPC code
    operators: Array         // Array of operator objects
    inspectionRejects: {
        value: Number        // Reject count
        kpi: Number          // KPI threshold
    }
    weightRejects: Object    // Same structure as inspectionRejects
    mdRejects: Object        // Same structure as inspectionRejects
    totalUnits: Number       // Total units produced
}
```

### Operator Object
```javascript
{
    name: String             // Operator name
    hours: Number            // Hours worked
}
```

---

## Color Palette

### Brand Colors
```css
--primary-blue: #31A9E0        /* Primary brand blue (from logo) */
--primary-blue-dark: #2890c4   /* Darker blue for hover states */
--secondary-gray: #A1A1A1      /* Secondary gray (from logo) */
```

### Light Mode
```css
--bg-gradient-start: #f8f9fb   /* Background gradient start */
--bg-gradient-end: #e8ecf1     /* Background gradient end */
--surface-white: #ffffff        /* Card/surface color */
--text-primary: #2c3e50         /* Primary text color */
--text-secondary: #6c757d       /* Secondary text color */
--text-muted: #95a5a6           /* Muted text color */
--border-light: #e0e6ed         /* Light border color */
--border-medium: #d1d9e0        /* Medium border color */
```

### Dark Mode
```css
--bg-gradient-start: #1a1f2e   /* Dark background gradient start */
--bg-gradient-end: #0f131e     /* Dark background gradient end */
--surface-white: #242b3d        /* Dark surface color */
--text-primary: #e8ecf1         /* Light text for dark mode */
--text-secondary: #b8c1cc       /* Secondary light text */
--text-muted: #7a8491           /* Muted light text */
--border-light: #3a4456         /* Dark border light */
--border-medium: #4a5568        /* Dark border medium */
```

### Status Colors
```css
--success-green: #28a745        /* Success/within KPI */
--success-light: #d4edda        /* Success background */
--danger-red: #dc3545           /* Danger/over KPI */
--danger-light: #f8d7da         /* Danger background */
```

---

## File Structure

```
CLAUDE/
├── index.html              # Main dashboard HTML
├── styles.css              # Complete stylesheet
├── dashboard.js            # Dashboard JavaScript logic
├── app.js                  # Legacy CSV upload handler (unused in current version)
├── README.md               # Project documentation
├── claude.md               # This file - developer reference guide
├── .gitignore              # Git ignore rules
└── CODE/
    └── LOGO/
        └── AQS Logo 3.svg  # Company logo file
```

---

## Common Issue Reference

### When reporting issues, use this format:

**Example 1: Layout Issue**
```
Section: Line Summary Table (Section 5)
Component: Product & UPC column (Column 1)
Issue: Text alignment is off
Expected: Left-aligned
Actual: Center-aligned
```

**Example 2: Styling Issue**
```
Section: KPI Summary Strip (Section 3)
Component: Total Products Ran KPI
Element ID: #totalProducts
Issue: Font size too small on mobile
```

**Example 3: Functional Issue**
```
Section: Filter Row (Section 2)
Component: Date Range Inputs
Element IDs: #dateStart, #dateEnd
Issue: Date picker not updating dateRange variable
```

---

## Table Column Reference Guide

### Quick Column Map (Left to Right)
1. **Product & UPC** → Product names and UPC codes
2. **Operators** → Operator names with hours worked
3. **Inspection Rejects** → Reject count, gauge, KPI badge
4. **Weight Rejects** → Reject count, gauge, KPI badge
5. **MD Rejects** → Reject count, gauge, KPI badge
6. **Actions** → "View CSV" button

### Expected Data Alignment
- **Columns 1-2**: Left-aligned (text content)
- **Columns 3-6**: Center-aligned (numerical/action content)

---

## Version History

- **v1.0** (2024-01-14): Initial dashboard creation
- **v1.1** (2024-01-14): Added interactive date range picker
- **v1.2** (2024-01-14): Fixed table column alignment issues
- **v1.3** (2024-01-14): Created developer documentation (this file)

---

## Notes

- Always use CSS custom properties (CSS variables) for colors
- Maintain consistent spacing using rem units
- Keep mobile responsiveness in mind for all changes
- Test both light and dark modes for any visual changes
- Table uses `table-layout: fixed` - do not remove this property

---

*Last Updated: 2024-01-14*
*Maintainer: Travis Nebeker with Claude Sonnet 4.5*

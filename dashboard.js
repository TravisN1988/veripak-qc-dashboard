// VeriPak QC Dashboard - JavaScript Application
// Industrial Manufacturing Quality Control Dashboard

class VeriPakDashboard {
    constructor() {
        this.csvData = [];
        this.currentLine = 'syrup-5';
        this.dateRange = '04/01/2024 – 04/07/2024';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
    }

    setupEventListeners() {
        // Dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        darkModeToggle.addEventListener('change', (e) => {
            this.toggleDarkMode(e.target.checked);
        });

        // Filter controls
        const lineSelect = document.getElementById('lineSelect');
        lineSelect.addEventListener('change', (e) => {
            this.currentLine = e.target.value;
            this.updateDashboard();
        });

        // Date range inputs
        const dateStart = document.getElementById('dateStart');
        const dateEnd = document.getElementById('dateEnd');
        dateStart.addEventListener('change', (e) => {
            this.dateRange = this.getDateRangeString();
            this.updateDashboard();
        });
        dateEnd.addEventListener('change', (e) => {
            this.dateRange = this.getDateRangeString();
            this.updateDashboard();
        });

        // View UPC File button
        const viewUpcBtn = document.getElementById('viewUpcBtn');
        viewUpcBtn.addEventListener('click', () => {
            this.viewUpcFile();
        });

        // View CSV buttons in table
        const viewCsvButtons = document.querySelectorAll('.btn-view-csv');
        viewCsvButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.viewProductCsv(index);
            });
        });
    }

    toggleDarkMode(enabled) {
        if (enabled) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    loadSampleData() {
        // Check for saved dark mode preference
        const darkModePreference = localStorage.getItem('darkMode');
        if (darkModePreference === 'enabled') {
            document.getElementById('darkModeToggle').checked = true;
            this.toggleDarkMode(true);
        }

        // Sample data structure
        this.csvData = [
            {
                product: 'Coca-Cola Classic 20oz',
                upc: '049000042566',
                operators: [
                    { name: 'John Smith', hours: 24 },
                    { name: 'Maria Garcia', hours: 16 },
                    { name: 'David Chen', hours: 8 }
                ],
                inspectionRejects: { value: 32, kpi: 25 },
                weightRejects: { value: 18, kpi: 50 },
                mdRejects: { value: 12, kpi: 20 },
                totalUnits: 25650
            },
            {
                product: 'Sprite Zero 20oz',
                upc: '049000028894',
                operators: [
                    { name: 'Sarah Johnson', hours: 24 },
                    { name: 'Michael Brown', hours: 12 }
                ],
                inspectionRejects: { value: 26, kpi: 15 },
                weightRejects: { value: 28, kpi: 50 },
                mdRejects: { value: 12, kpi: 20 },
                totalUnits: 25650
            }
        ];

        this.updateDashboard();
    }

    updateDashboard() {
        this.calculateKPIs();
        this.updateCharts();
    }

    calculateKPIs() {
        let totalProducts = 0;
        let totalRejects = 0;
        let inspectionRejects = 0;
        let weightRejects = 0;
        let mdRejects = 0;

        this.csvData.forEach(product => {
            totalProducts += product.totalUnits;
            totalRejects += product.inspectionRejects.value +
                          product.weightRejects.value +
                          product.mdRejects.value;
            inspectionRejects += product.inspectionRejects.value;
            weightRejects += product.weightRejects.value;
            mdRejects += product.mdRejects.value;
        });

        const rejectRate = ((totalRejects / totalProducts) * 100).toFixed(2);

        // Determine top reject category
        const categories = [
            { name: 'Inspection Rejects', value: inspectionRejects },
            { name: 'Weight Rejects', value: weightRejects },
            { name: 'MD Rejects', value: mdRejects }
        ];
        const topCategory = categories.reduce((max, cat) =>
            cat.value > max.value ? cat : max
        );

        // Update KPI display
        document.getElementById('totalProducts').textContent =
            this.formatNumber(totalProducts);
        document.getElementById('totalRejects').textContent = totalRejects;
        document.getElementById('rejectRate').textContent = `${rejectRate}%`;
        document.getElementById('topCategory').textContent = topCategory.name;
    }

    updateCharts() {
        let totalInspection = 0;
        let totalWeight = 0;
        let totalMD = 0;

        this.csvData.forEach(product => {
            totalInspection += product.inspectionRejects.value;
            totalWeight += product.weightRejects.value;
            totalMD += product.mdRejects.value;
        });

        // Update chart values (already in HTML, but could be dynamic)
        // This is where you would update the chart bars if data changes
        console.log('Chart data updated:', {
            inspection: totalInspection,
            weight: totalWeight,
            md: totalMD
        });
    }

    formatNumber(num) {
        return num.toLocaleString('en-US');
    }

    getDateRangeString() {
        const startInput = document.getElementById('dateStart');
        const endInput = document.getElementById('dateEnd');

        if (startInput && endInput) {
            const start = new Date(startInput.value);
            const end = new Date(endInput.value);

            const formatDate = (date) => {
                return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            };

            return `${formatDate(start)} – ${formatDate(end)}`;
        }
        return this.dateRange;
    }

    viewUpcFile() {
        alert(`Viewing UPC File for ${this.currentLine}\nDate Range: ${this.dateRange}\n\nThis would open a detailed UPC file viewer.`);
    }

    viewProductCsv(productIndex) {
        const product = this.csvData[productIndex];
        if (product) {
            const message = `Viewing CSV for: ${product.product}\nUPC: ${product.upc}\n\nThis would display detailed CSV data for this product run.`;
            alert(message);
        }
    }

    // Method to load actual CSV data
    loadCSVFile(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;
            this.parseCSV(content);
            this.updateDashboard();
        };

        reader.readAsText(file);
    }

    parseCSV(content) {
        const lines = content.split('\n').filter(line => line.trim() !== '');

        if (lines.length === 0) {
            console.error('CSV file is empty');
            return;
        }

        // Parse headers
        const headers = this.parseCSVLine(lines[0]);

        // Parse data rows
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length === headers.length) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index];
                });
                data.push(row);
            }
        }

        // Transform CSV data to dashboard format
        this.transformCSVData(data);
    }

    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];

            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        result.push(current.trim());
        return result;
    }

    transformCSVData(csvRows) {
        // This method would transform raw CSV data into the dashboard format
        // Expected CSV columns might be:
        // Product, UPC, Operator, Hours, InspectionRejects, InspectionKPI,
        // WeightRejects, WeightKPI, MDRejects, MDKPI, TotalUnits

        // Group by product and aggregate data
        const productMap = new Map();

        csvRows.forEach(row => {
            const productKey = row.UPC || row.Product;

            if (!productMap.has(productKey)) {
                productMap.set(productKey, {
                    product: row.Product,
                    upc: row.UPC,
                    operators: [],
                    inspectionRejects: {
                        value: parseInt(row.InspectionRejects) || 0,
                        kpi: parseInt(row.InspectionKPI) || 0
                    },
                    weightRejects: {
                        value: parseInt(row.WeightRejects) || 0,
                        kpi: parseInt(row.WeightKPI) || 0
                    },
                    mdRejects: {
                        value: parseInt(row.MDRejects) || 0,
                        kpi: parseInt(row.MDKPI) || 0
                    },
                    totalUnits: parseInt(row.TotalUnits) || 0
                });
            }

            // Add operator if exists
            if (row.Operator) {
                const product = productMap.get(productKey);
                product.operators.push({
                    name: row.Operator,
                    hours: parseInt(row.Hours) || 0
                });
            }
        });

        this.csvData = Array.from(productMap.values());
    }

    // Method to dynamically update table rows
    updateTableRows() {
        const tbody = document.getElementById('summaryTableBody');
        tbody.innerHTML = '';

        this.csvData.forEach((product, index) => {
            const row = this.createProductRow(product, index);
            tbody.appendChild(row);
        });
    }

    createProductRow(product, index) {
        const tr = document.createElement('tr');
        tr.className = 'product-row';

        // Product & UPC Cell
        const productCell = document.createElement('td');
        productCell.className = 'product-cell';
        productCell.innerHTML = `
            <div class="product-name">${product.product}</div>
            <div class="product-upc">UPC: ${product.upc}</div>
        `;
        tr.appendChild(productCell);

        // Operators Cell
        const operatorsCell = document.createElement('td');
        operatorsCell.className = 'operators-cell';
        product.operators.forEach(op => {
            const opLine = document.createElement('div');
            opLine.className = 'operator-line';
            opLine.innerHTML = `${op.name} <span class="operator-hours">${op.hours} hrs</span>`;
            operatorsCell.appendChild(opLine);
        });
        tr.appendChild(operatorsCell);

        // Reject Cells
        tr.appendChild(this.createRejectCell(product.inspectionRejects));
        tr.appendChild(this.createRejectCell(product.weightRejects));
        tr.appendChild(this.createRejectCell(product.mdRejects));

        // Actions Cell
        const actionsCell = document.createElement('td');
        actionsCell.className = 'actions-cell';
        const btn = document.createElement('button');
        btn.className = 'btn-view-csv';
        btn.textContent = 'View CSV';
        btn.addEventListener('click', () => this.viewProductCsv(index));
        actionsCell.appendChild(btn);
        tr.appendChild(actionsCell);

        return tr;
    }

    createRejectCell(rejectData) {
        const td = document.createElement('td');
        td.className = 'reject-cell';

        const percentage = Math.min((rejectData.value / rejectData.kpi) * 100, 100);
        const isOverKPI = rejectData.value > rejectData.kpi;
        const statusClass = isOverKPI ? 'danger' : 'success';

        td.innerHTML = `
            <div class="reject-value">${rejectData.value}</div>
            <div class="reject-gauge">
                <div class="gauge-bar">
                    <div class="gauge-fill gauge-${statusClass}" style="width: ${percentage}%;">
                        <div class="gauge-dot"></div>
                    </div>
                </div>
            </div>
            <div class="kpi-badge kpi-badge-${statusClass}">KPI = ${rejectData.kpi}</div>
        `;

        return td;
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new VeriPakDashboard();
});

// Optional: Add CSV file upload capability
function setupCSVUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.style.display = 'none';

    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && window.dashboard) {
            window.dashboard.loadCSVFile(file);
        }
    });

    document.body.appendChild(input);

    // You could add a button to trigger this:
    // document.getElementById('uploadBtn').addEventListener('click', () => input.click());
}

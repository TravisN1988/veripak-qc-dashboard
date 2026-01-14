// VeriPak QC Dashboard - JavaScript Application

class CSVDashboard {
    constructor() {
        this.csvData = [];
        this.filteredData = [];
        this.headers = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // File upload
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('csvFileInput');

        uploadArea.addEventListener('click', () => fileInput.click());

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'text/csv') {
                this.handleFileUpload(file);
            }
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleFileUpload(file);
            }
        });

        // Search and filter
        const searchInput = document.getElementById('searchInput');
        const clearBtn = document.getElementById('clearBtn');
        const columnFilter = document.getElementById('columnFilter');
        const columnSearchInput = document.getElementById('columnSearchInput');

        searchInput.addEventListener('input', () => this.performSearch());
        clearBtn.addEventListener('click', () => this.clearFilters());
        columnFilter.addEventListener('change', () => this.performColumnFilter());
        columnSearchInput.addEventListener('input', () => this.performColumnFilter());

        // Export
        const exportBtn = document.getElementById('exportBtn');
        exportBtn.addEventListener('click', () => this.exportResults());
    }

    handleFileUpload(file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;
            this.parseCSV(content);

            // Show file name
            const fileNameDisplay = document.getElementById('fileName');
            fileNameDisplay.textContent = `Loaded: ${file.name}`;
            fileNameDisplay.classList.add('show');

            // Show query and table sections
            document.getElementById('querySection').style.display = 'block';
            document.getElementById('tableSection').style.display = 'block';
        };

        reader.readAsText(file);
    }

    parseCSV(content) {
        const lines = content.split('\n').filter(line => line.trim() !== '');

        if (lines.length === 0) {
            alert('CSV file is empty');
            return;
        }

        // Parse headers
        this.headers = this.parseCSVLine(lines[0]);

        // Parse data
        this.csvData = [];
        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length === this.headers.length) {
                const row = {};
                this.headers.forEach((header, index) => {
                    row[header] = values[index];
                });
                this.csvData.push(row);
            }
        }

        this.filteredData = [...this.csvData];
        this.populateColumnFilter();
        this.displayData();
        this.updateStats();
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

    populateColumnFilter() {
        const columnFilter = document.getElementById('columnFilter');
        columnFilter.innerHTML = '<option value="">Filter by column...</option>';

        this.headers.forEach(header => {
            const option = document.createElement('option');
            option.value = header;
            option.textContent = header;
            columnFilter.appendChild(option);
        });
    }

    performSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();

        if (!searchTerm) {
            this.filteredData = [...this.csvData];
        } else {
            this.filteredData = this.csvData.filter(row => {
                return Object.values(row).some(value =>
                    value.toString().toLowerCase().includes(searchTerm)
                );
            });
        }

        this.displayData();
        this.updateStats();
    }

    performColumnFilter() {
        const selectedColumn = document.getElementById('columnFilter').value;
        const filterValue = document.getElementById('columnSearchInput').value.toLowerCase();

        if (!selectedColumn || !filterValue) {
            this.filteredData = [...this.csvData];
        } else {
            this.filteredData = this.csvData.filter(row =>
                row[selectedColumn].toString().toLowerCase().includes(filterValue)
            );
        }

        this.displayData();
        this.updateStats();
    }

    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('columnFilter').value = '';
        document.getElementById('columnSearchInput').value = '';
        this.filteredData = [...this.csvData];
        this.displayData();
        this.updateStats();
    }

    displayData() {
        const tableHead = document.getElementById('tableHead');
        const tableBody = document.getElementById('tableBody');
        const rowCount = document.getElementById('rowCount');

        // Clear existing content
        tableHead.innerHTML = '';
        tableBody.innerHTML = '';

        if (this.headers.length === 0) return;

        // Create header row
        const headerRow = document.createElement('tr');
        this.headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        tableHead.appendChild(headerRow);

        // Create data rows
        this.filteredData.forEach(row => {
            const tr = document.createElement('tr');
            this.headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = row[header];
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });

        // Update row count
        rowCount.textContent = `Showing ${this.filteredData.length} of ${this.csvData.length} rows`;
    }

    updateStats() {
        const statsContainer = document.getElementById('statsContainer');
        statsContainer.innerHTML = '';

        const totalRows = this.csvData.length;
        const filteredRows = this.filteredData.length;
        const totalColumns = this.headers.length;

        const stats = [
            { label: 'Total Rows', value: totalRows },
            { label: 'Filtered Rows', value: filteredRows },
            { label: 'Columns', value: totalColumns }
        ];

        stats.forEach(stat => {
            const statItem = document.createElement('div');
            statItem.className = 'stat-item';
            statItem.innerHTML = `
                <div class="stat-label">${stat.label}</div>
                <div class="stat-value">${stat.value}</div>
            `;
            statsContainer.appendChild(statItem);
        });
    }

    exportResults() {
        if (this.filteredData.length === 0) {
            alert('No data to export');
            return;
        }

        // Create CSV content
        const csvContent = [
            this.headers.join(','),
            ...this.filteredData.map(row =>
                this.headers.map(header => {
                    const value = row[header].toString();
                    // Escape values containing commas or quotes
                    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value;
                }).join(',')
            )
        ].join('\n');

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `veripak_qc_export_${new Date().getTime()}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CSVDashboard();
});

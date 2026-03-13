// VeriPak QC Dashboard — JavaScript Application
// Full simulated dataset · no CSV upload required

// ═══════════════════════════════════════════════════════════════════════════
// SIMULATED DATABASE
// ═══════════════════════════════════════════════════════════════════════════

const OPERATORS = {
    'syrup-5': [
        'John Smith', 'Maria Garcia', 'David Chen', 'Ashley Williams',
        'Robert Martinez', 'Jennifer Lee', 'Thomas Anderson'
    ],
    'syrup-3': [
        'Sarah Johnson', 'Michael Brown', 'Lisa Davis', 'James Wilson',
        'Emily Taylor', 'Carlos Hernandez', 'Nancy White'
    ],
    'bottling-1': [
        // Water-only line
        'Kevin Moore', 'Patricia Jackson', 'Christopher Harris', 'Sandra Martin',
        'Daniel Thompson', 'Betty Garcia', 'Steven Robinson'
    ],
    'bottling-2': [
        // Juice / tea / sports drinks line
        'Mark Clark', 'Dorothy Lewis', 'Paul Walker', 'Helen Hall',
        'George Young', 'Ruth Allen', 'Brian King'
    ]
};

// runWeight  — relative frequency: higher = runs more often and for longer stretches
// unitsPerHour — production rate when running
// rejectsPerHour — average reject events per hour of run time
const PRODUCT_CATALOG = {
    'syrup-5': [
        {
            product: 'Coca-Cola Classic 20oz',
            upc: '049000042566',
            operatorSlots: [0, 1, 2],
            runWeight: 10,         // flagship SKU — dominant run time
            unitsPerHour: 450,
            kpi: { inspection: 25, weight: 50, md: 20 },
            rejectsPerHour: { inspection: 0.53, weight: 0.26, md: 0.19 }
        },
        {
            product: 'Sprite Zero 20oz',
            upc: '049000028894',
            operatorSlots: [3, 4],
            runWeight: 6,
            unitsPerHour: 400,
            kpi: { inspection: 15, weight: 50, md: 20 },
            rejectsPerHour: { inspection: 0.48, weight: 0.49, md: 0.21 }
        },
        {
            product: 'Dr Pepper 20oz',
            upc: '078000001831',
            operatorSlots: [5, 6, 0],
            runWeight: 4,
            unitsPerHour: 350,
            kpi: { inspection: 20, weight: 45, md: 15 },
            rejectsPerHour: { inspection: 0.31, weight: 0.53, md: 0.26 }
        },
        {
            product: 'Fanta Orange 20oz',
            upc: '049000006734',
            operatorSlots: [1, 4],
            runWeight: 2,          // infrequent, short runs
            unitsPerHour: 300,
            kpi: { inspection: 18, weight: 40, md: 15 },
            rejectsPerHour: { inspection: 0.24, weight: 0.40, md: 0.14 }
        }
    ],
    'syrup-3': [
        {
            product: 'Pepsi Cola 20oz',
            upc: '012000001079',
            operatorSlots: [0, 1, 2],
            runWeight: 10,
            unitsPerHour: 475,
            kpi: { inspection: 20, weight: 45, md: 18 },
            rejectsPerHour: { inspection: 0.35, weight: 0.69, md: 0.35 }
        },
        {
            product: 'Mountain Dew 20oz',
            upc: '012000004506',
            operatorSlots: [2, 3, 4],
            runWeight: 7,
            unitsPerHour: 390,
            kpi: { inspection: 22, weight: 55, md: 20 },
            rejectsPerHour: { inspection: 0.39, weight: 0.61, md: 0.24 }
        },
        {
            product: 'Gatorade Glacier Blue 28oz',
            upc: '052000113548',
            operatorSlots: [5, 6],
            runWeight: 4,
            unitsPerHour: 325,
            kpi: { inspection: 15, weight: 35, md: 12 },
            rejectsPerHour: { inspection: 0.19, weight: 0.39, md: 0.15 }
        },
        {
            product: '7UP Zero Sugar 20oz',
            upc: '012200037915',
            operatorSlots: [0, 3, 6],
            runWeight: 2,
            unitsPerHour: 340,
            kpi: { inspection: 12, weight: 30, md: 10 },
            rejectsPerHour: { inspection: 0.23, weight: 0.31, md: 0.11 }
        }
    ],
    'bottling-1': [
        // ── WATER-ONLY LINE ──────────────────────────────────────────────
        {
            product: 'Aquafina 16.9oz 24pk',
            upc: '012000000218',
            operatorSlots: [0, 1, 2, 3],
            runWeight: 10,
            unitsPerHour: 650,
            kpi: { inspection: 30, weight: 60, md: 25 },
            rejectsPerHour: { inspection: 0.44, weight: 0.31, md: 0.25 }
        },
        {
            product: 'Dasani Water 16.9oz 24pk',
            upc: '049000042864',
            operatorSlots: [4, 5, 6],
            runWeight: 8,
            unitsPerHour: 600,
            kpi: { inspection: 28, weight: 55, md: 22 },
            rejectsPerHour: { inspection: 0.36, weight: 0.41, md: 0.23 }
        },
        {
            product: 'Smartwater 33.8oz',
            upc: '786162000074',
            operatorSlots: [0, 2, 5],
            runWeight: 5,
            unitsPerHour: 440,
            kpi: { inspection: 20, weight: 40, md: 15 },
            rejectsPerHour: { inspection: 0.26, weight: 0.53, md: 0.16 }
        }
    ],
    'bottling-2': [
        // ── JUICE · TEA · SPORTS DRINKS LINE ────────────────────────────
        {
            product: 'Powerade Mountain Berry 32oz',
            upc: '049000042887',
            operatorSlots: [0, 1, 2],
            runWeight: 8,
            unitsPerHour: 360,
            kpi: { inspection: 18, weight: 35, md: 12 },
            rejectsPerHour: { inspection: 0.21, weight: 0.35, md: 0.18 }
        },
        {
            product: 'Simply Orange 52oz',
            upc: '025000052001',
            operatorSlots: [3, 4, 5],
            runWeight: 7,
            unitsPerHour: 280,
            kpi: { inspection: 15, weight: 30, md: 10 },
            rejectsPerHour: { inspection: 0.25, weight: 0.51, md: 0.20 }
        },
        {
            product: 'Minute Maid Lemonade 52oz',
            upc: '025000056009',
            operatorSlots: [6, 0, 3],
            runWeight: 5,
            unitsPerHour: 260,
            kpi: { inspection: 12, weight: 28, md: 10 },
            rejectsPerHour: { inspection: 0.23, weight: 0.44, md: 0.11 }
        },
        {
            product: 'Gold Peak Sweet Tea 59oz',
            upc: '049000006444',
            operatorSlots: [1, 4, 6],
            runWeight: 4,
            unitsPerHour: 240,
            kpi: { inspection: 10, weight: 25, md: 8 },
            rejectsPerHour: { inspection: 0.15, weight: 0.35, md: 0.10 }
        },
        {
            product: 'Peace Tea Georgia Peach 23oz',
            upc: '049000006550',
            operatorSlots: [2, 5],
            runWeight: 3,
            unitsPerHour: 340,
            kpi: { inspection: 20, weight: 40, md: 15 },
            rejectsPerHour: { inspection: 0.33, weight: 0.38, md: 0.19 }
        },
        {
            product: 'vitaminwater restore 20oz',
            upc: '786162004904',
            operatorSlots: [0, 3],
            runWeight: 2,
            unitsPerHour: 380,
            kpi: { inspection: 15, weight: 30, md: 10 },
            rejectsPerHour: { inspection: 0.18, weight: 0.26, md: 0.10 }
        }
    ]
};

// ═══════════════════════════════════════════════════════════════════════════
// DATA GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════════════════

function getDaysBetween(start, end) {
    const ms = end.getTime() - start.getTime();
    return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

// Deterministic pseudo-random: same seed → same value across page loads
function seededRand(seed) {
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
}

function generateLineData(lineKey, startDate, endDate) {
    const catalog = PRODUCT_CATALOG[lineKey];
    const ops     = OPERATORS[lineKey];
    if (!catalog || !ops) return [];

    const days        = getDaysBetween(startDate, endDate);
    const totalHours  = days * 14;   // ~14 productive line-hours per day (2 shifts)
    const totalWeight = catalog.reduce((sum, item) => sum + item.runWeight, 0);
    const dateSeed    = Math.floor(startDate.getTime() / 86400000);

    return catalog.map((item, idx) => {
        const s = dateSeed + idx * 37 + lineKey.charCodeAt(0);

        // Hours allocated proportional to runWeight, with seeded variance
        const baseHours      = (item.runWeight / totalWeight) * totalHours;
        const hourVariance   = 0.80 + seededRand(s + 50) * 0.40;   // ±20%
        const allocatedHours = Math.max(0.5, Math.round(baseHours * hourVariance * 10) / 10);

        // Units and rejects are a direct function of hours run
        const units   = Math.round(allocatedHours * item.unitsPerHour    * (0.93 + seededRand(s + 3)  * 0.14));
        const inspVal = Math.round(allocatedHours * item.rejectsPerHour.inspection * (0.75 + seededRand(s)      * 0.50));
        const wgtVal  = Math.round(allocatedHours * item.rejectsPerHour.weight     * (0.75 + seededRand(s + 1)  * 0.50));
        const mdVal   = Math.round(allocatedHours * item.rejectsPerHour.md         * (0.75 + seededRand(s + 2)  * 0.50));

        // Operator hours are fractions of the product's allocated run time
        const fracs  = [0.55, 0.30, 0.15, 0.10];
        const opData = item.operatorSlots.map((slot, i) => ({
            name:  ops[slot % ops.length],
            hours: Math.max(1, Math.round(allocatedHours * (fracs[i] !== undefined ? fracs[i] : 0.10)))
        }));

        return {
            product:  item.product,
            upc:      item.upc,
            operators: opData,
            inspectionRejects: { value: inspVal, kpi: item.kpi.inspection },
            weightRejects:     { value: wgtVal,  kpi: item.kpi.weight     },
            mdRejects:         { value: mdVal,   kpi: item.kpi.md         },
            totalUnits:   units,
            // stored for detail modal
            _hours:         allocatedHours,
            _days:          days,
            _dateSeed:      dateSeed,
            _upcSeed:       item.upc.split('').reduce((a, c) => a + c.charCodeAt(0), 0),
            _unitsPerHour:  item.unitsPerHour,
            _rejectsPerHour: item.rejectsPerHour,
            _kpi:           item.kpi
        };
    });
}

// Generates per-day breakdown for the product detail modal
function generateDailyDetail(product, startDate) {
    const rows         = [];
    const hoursPerDay  = product._hours / product._days;

    for (let d = 0; d < product._days; d++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + d);
        const s = product._dateSeed + d + product._upcSeed;

        // Daily hours vary — some days the product may not run at all for low-weight SKUs
        const dayHrVariance  = 0.20 + seededRand(s + 20) * 1.60;   // 0.2x–1.8x the daily average
        const dailyHours     = Math.max(0, Math.round(hoursPerDay * dayHrVariance * 10) / 10);

        rows.push({
            date:       date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
            hours:      dailyHours,
            units:      Math.round(dailyHours * product._unitsPerHour * (0.92 + seededRand(s + 15) * 0.16)),
            inspection: Math.round(dailyHours * product._rejectsPerHour.inspection * (0.60 + seededRand(s)      * 0.80)),
            weight:     Math.round(dailyHours * product._rejectsPerHour.weight     * (0.60 + seededRand(s + 5)  * 0.80)),
            md:         Math.round(dailyHours * product._rejectsPerHour.md         * (0.60 + seededRand(s + 10) * 0.80))
        });
    }
    return rows;
}

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD CLASS
// ═══════════════════════════════════════════════════════════════════════════

class VeriPakDashboard {
    constructor() {
        this.data        = [];
        this.currentLine = 'syrup-5';
        this._startDate  = null;
        this._endDate    = null;
        this.init();
    }

    init() {
        this.restoreTheme();
        this.setDefaultDates();
        this.setupEventListeners();
        this.refreshData();
    }

    restoreTheme() {
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.getElementById('darkModeToggle').checked = true;
            this.toggleDarkMode(true);
        }
    }

    setDefaultDates() {
        const end   = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 6);
        const fmt = (d) => d.toISOString().slice(0, 16);
        document.getElementById('dateStart').value = fmt(start);
        document.getElementById('dateEnd').value   = fmt(end);
    }

    setupEventListeners() {
        document.getElementById('darkModeToggle').addEventListener('change', (e) => {
            this.toggleDarkMode(e.target.checked);
        });

        document.getElementById('lineSelect').addEventListener('change', (e) => {
            this.currentLine = e.target.value;
            this.refreshData();
        });

        document.getElementById('dateStart').addEventListener('change', () => this.refreshData());
        document.getElementById('dateEnd').addEventListener('change',   () => this.refreshData());

        document.getElementById('viewUpcBtn').addEventListener('click', () => this.viewUpcFile());

        // Modal close
        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('modalOverlay')) this.closeModal();
        });
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    toggleDarkMode(enabled) {
        document.body.classList.toggle('dark-mode',  enabled);
        document.body.classList.toggle('light-mode', !enabled);
        localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
    }

    getDateRange() {
        const sv = document.getElementById('dateStart').value;
        const ev = document.getElementById('dateEnd').value;
        return {
            startDate: sv ? new Date(sv) : (() => { const d = new Date(); d.setDate(d.getDate() - 6); return d; })(),
            endDate:   ev ? new Date(ev) : new Date()
        };
    }

    refreshData() {
        const { startDate, endDate } = this.getDateRange();
        this._startDate = startDate;
        this._endDate   = endDate;
        this.data = generateLineData(this.currentLine, startDate, endDate);
        this.renderAll();
    }

    renderAll() {
        this.renderKPIs();
        this.renderOEE();
        this.renderTable();
        this.renderCharts();
    }

    // ── KPIs ──────────────────────────────────────────────────────────────

    renderKPIs() {
        let totalUnits = 0, totalInsp = 0, totalWgt = 0, totalMd = 0;
        this.data.forEach(p => {
            totalUnits += p.totalUnits;
            totalInsp  += p.inspectionRejects.value;
            totalWgt   += p.weightRejects.value;
            totalMd    += p.mdRejects.value;
        });

        const totalRejects = totalInsp + totalWgt + totalMd;
        const rejectRate   = totalUnits > 0 ? ((totalRejects / totalUnits) * 100).toFixed(2) : '0.00';
        const cats = [
            { name: 'Inspection Rejects', value: totalInsp },
            { name: 'Weight Rejects',     value: totalWgt  },
            { name: 'MD Rejects',         value: totalMd   }
        ];
        const topCat = cats.reduce((a, b) => b.value > a.value ? b : a);

        document.getElementById('totalProducts').textContent = this.fmt(totalUnits);
        document.getElementById('totalRejects').textContent  = this.fmt(totalRejects);
        document.getElementById('rejectRate').textContent    = `${rejectRate}%`;
        document.getElementById('topCategory').textContent   = topCat.name;

        const rateEl = document.getElementById('rejectRate');
        rateEl.classList.toggle('kpi-danger',  parseFloat(rejectRate) > 0.5);
        rateEl.classList.toggle('kpi-success', parseFloat(rejectRate) <= 0.5);

        document.getElementById('topCategory').className = 'kpi-value kpi-danger';
    }

    // ── OEE ───────────────────────────────────────────────────────────────

    renderOEE() {
        if (!this.data.length) return;

        const days               = this.data[0]._days;
        const totalAvailableHours = days * 14;                          // 14 productive hrs/day
        const totalRunHours      = this.data.reduce((s, p) => s + p._hours, 0);

        // Seeded per line + date so it's stable but varies realistically
        const lineSeed  = this.currentLine.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
        const dateSeed  = Math.floor(this._startDate.getTime() / 86400000);
        const seed      = lineSeed * 17 + dateSeed;

        // Availability: run hours vs available, discounted for changeovers & unplanned stops
        const changeoverFactor = 0.80 + seededRand(seed + 100) * 0.14;  // 80–94%
        const availability     = Math.min(0.99, (totalRunHours / totalAvailableHours) * changeoverFactor);

        // Performance: speed losses and minor stoppages (75–92%)
        const performance = 0.75 + seededRand(seed + 200) * 0.17;

        // Quality: derived from actual simulated data
        const totalUnits   = this.data.reduce((s, p) => s + p.totalUnits, 0);
        const totalRejects = this.data.reduce((s, p) =>
            s + p.inspectionRejects.value + p.weightRejects.value + p.mdRejects.value, 0);
        const quality = totalUnits > 0 ? (totalUnits - totalRejects) / totalUnits : 1;

        const oee = availability * performance * quality;

        // Color thresholds: green ≥65%, amber 45–64%, red <45%
        const oeeEl  = document.getElementById('oeeIndicator');
        const valEl  = document.getElementById('oeeValue');
        const barEl  = document.getElementById('oeeBar');
        const compEl = document.getElementById('oeeComponents');
        if (!oeeEl || !valEl || !barEl || !compEl) return;

        const pct   = (oee * 100).toFixed(1);
        const tier  = oee >= 0.65 ? 'oee-good' : oee >= 0.45 ? 'oee-fair' : 'oee-poor';
        oeeEl.className = `oee-indicator ${tier}`;
        valEl.textContent  = `${pct}%`;
        barEl.style.width  = `${pct}%`;
        compEl.textContent =
            `A ${(availability * 100).toFixed(0)}%  ·  P ${(performance * 100).toFixed(0)}%  ·  Q ${(quality * 100).toFixed(1)}%`;
    }

    // ── Table ─────────────────────────────────────────────────────────────

    renderTable() {
        const tbody = document.getElementById('summaryTableBody');
        tbody.innerHTML = '';

        this.data.forEach((product, idx) => {
            const tr = document.createElement('tr');
            tr.className = 'product-row';

            // Product & UPC
            const pCell = document.createElement('td');
            pCell.className = 'product-cell';
            pCell.innerHTML = `
                <div class="product-name">${product.product}</div>
                <div class="product-upc">UPC: ${product.upc}</div>
            `;
            tr.appendChild(pCell);

            // Operators
            const opCell = document.createElement('td');
            opCell.className = 'operators-cell';
            product.operators.forEach(op => {
                const d = document.createElement('div');
                d.className = 'operator-line';
                d.innerHTML = `${op.name} <span class="operator-hours">${op.hours} hrs</span>`;
                opCell.appendChild(d);
            });
            tr.appendChild(opCell);

            // Reject cells
            tr.appendChild(this.createRejectCell(product.inspectionRejects));
            tr.appendChild(this.createRejectCell(product.weightRejects));
            tr.appendChild(this.createRejectCell(product.mdRejects));

            // Actions
            const actCell = document.createElement('td');
            actCell.className = 'actions-cell';
            const btn = document.createElement('button');
            btn.className   = 'btn-view-csv';
            btn.textContent = 'View CSV';
            btn.addEventListener('click', () => this.openProductModal(idx));
            actCell.appendChild(btn);
            tr.appendChild(actCell);

            tbody.appendChild(tr);
        });
    }

    createRejectCell(rejectData) {
        const td   = document.createElement('td');
        td.className = 'reject-cell';
        const pct  = Math.min((rejectData.value / rejectData.kpi) * 100, 100);
        const over = rejectData.value > rejectData.kpi;
        const cls  = over ? 'danger' : 'success';

        td.innerHTML = `
            <div class="reject-value">${rejectData.value}</div>
            <div class="reject-gauge">
                <div class="gauge-bar">
                    <div class="gauge-fill gauge-${cls}" style="width: ${pct.toFixed(1)}%;">
                        <div class="gauge-dot"></div>
                    </div>
                </div>
            </div>
            <div class="kpi-badge kpi-badge-${cls}">KPI = ${rejectData.kpi}</div>
        `;
        return td;
    }

    // ── Charts ────────────────────────────────────────────────────────────

    renderCharts() {
        let totInsp = 0, totWgt = 0, totMd = 0;
        let kpiInsp = 0, kpiWgt = 0, kpiMd = 0;

        this.data.forEach(p => {
            totInsp += p.inspectionRejects.value;
            totWgt  += p.weightRejects.value;
            totMd   += p.mdRejects.value;
            kpiInsp += p.inspectionRejects.kpi;
            kpiWgt  += p.weightRejects.kpi;
            kpiMd   += p.mdRejects.kpi;
        });

        this.updateChartCard('chart-inspection', totInsp, kpiInsp, this.data.map(p => p.inspectionRejects.value));
        this.updateChartCard('chart-weight',     totWgt,  kpiWgt,  this.data.map(p => p.weightRejects.value));
        this.updateChartCard('chart-md',         totMd,   kpiMd,   this.data.map(p => p.mdRejects.value));
    }

    updateChartCard(id, total, kpiTotal, values) {
        const over = total > kpiTotal;
        const cls  = over ? 'danger' : 'success';

        const badgeEl = document.getElementById(`${id}-badge`);
        const valueEl = document.getElementById(`${id}-value`);
        const barsEl  = document.getElementById(`${id}-bars`);
        if (!badgeEl || !valueEl || !barsEl) return;

        badgeEl.className   = `kpi-badge kpi-badge-${cls}`;
        badgeEl.textContent = `KPI = ${kpiTotal}`;

        valueEl.className   = `chart-value chart-value-${cls}`;
        valueEl.textContent = total;

        const maxVal = Math.max(...values, 1);
        barsEl.innerHTML = '';
        const barChart = document.createElement('div');
        barChart.className = `bar-chart bar-${cls}`;
        values.forEach(v => {
            const bar = document.createElement('div');
            bar.className    = 'bar';
            bar.style.height = `${Math.max(4, Math.round((v / maxVal) * 100))}%`;
            bar.title        = v;
            barChart.appendChild(bar);
        });
        barsEl.appendChild(barChart);
    }

    // ── Modal: Product CSV Detail ──────────────────────────────────────────

    openProductModal(idx) {
        const product = this.data[idx];
        if (!product) return;

        const rows     = generateDailyDetail(product, this._startDate);
        const lineName = document.getElementById('lineSelect').selectedOptions[0].text;
        const startStr = this._startDate.toLocaleDateString('en-US');
        const endStr   = this._endDate.toLocaleDateString('en-US');

        const totalInsp  = rows.reduce((a, r) => a + r.inspection, 0);
        const totalWgt   = rows.reduce((a, r) => a + r.weight, 0);
        const totalMd    = rows.reduce((a, r) => a + r.md, 0);
        const totalHours = rows.reduce((a, r) => a + r.hours, 0);

        const inspKPI = product.inspectionRejects.kpi;
        const wgtKPI  = product.weightRejects.kpi;
        const mdKPI   = product.mdRejects.kpi;

        const tableRows = rows.map(r => `
            <tr>
                <td>${r.date}</td>
                <td>${r.hours > 0 ? r.hours + ' hrs' : '—'}</td>
                <td>${r.hours > 0 ? this.fmt(r.units) : '—'}</td>
                <td class="${r.inspection > inspKPI ? 'modal-danger' : ''}">${r.hours > 0 ? r.inspection : '—'}</td>
                <td class="${r.weight     > wgtKPI  ? 'modal-danger' : ''}">${r.hours > 0 ? r.weight     : '—'}</td>
                <td class="${r.md         > mdKPI   ? 'modal-danger' : ''}">${r.hours > 0 ? r.md         : '—'}</td>
            </tr>
        `).join('');

        document.getElementById('modalTitle').textContent = product.product;
        document.getElementById('modalBody').innerHTML = `
            <div class="modal-meta">
                <span><strong>UPC:</strong> ${product.upc}</span>
                <span><strong>Line:</strong> ${lineName}</span>
                <span><strong>Date Range:</strong> ${startStr} – ${endStr}</span>
                <span><strong>Total Run Time:</strong> ${product._hours} hrs</span>
                <span><strong>Total Units:</strong> ${this.fmt(product.totalUnits)}</span>
            </div>
            <div class="modal-kpi-row">
                <div class="modal-kpi-item ${product.inspectionRejects.value > inspKPI ? 'modal-kpi-danger' : 'modal-kpi-success'}">
                    <div class="modal-kpi-label">Inspection Rejects</div>
                    <div class="modal-kpi-value">${product.inspectionRejects.value}</div>
                    <div class="modal-kpi-sub">KPI: ${inspKPI}</div>
                </div>
                <div class="modal-kpi-item ${product.weightRejects.value > wgtKPI ? 'modal-kpi-danger' : 'modal-kpi-success'}">
                    <div class="modal-kpi-label">Weight Rejects</div>
                    <div class="modal-kpi-value">${product.weightRejects.value}</div>
                    <div class="modal-kpi-sub">KPI: ${wgtKPI}</div>
                </div>
                <div class="modal-kpi-item ${product.mdRejects.value > mdKPI ? 'modal-kpi-danger' : 'modal-kpi-success'}">
                    <div class="modal-kpi-label">MD Rejects</div>
                    <div class="modal-kpi-value">${product.mdRejects.value}</div>
                    <div class="modal-kpi-sub">KPI: ${mdKPI}</div>
                </div>
            </div>
            <h4 class="modal-table-title">Daily Breakdown</h4>
            <div class="modal-table-wrapper">
                <table class="modal-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Hours Ran</th>
                            <th>Units Ran</th>
                            <th>Inspection Rejects</th>
                            <th>Weight Rejects</th>
                            <th>MD Rejects</th>
                        </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td><strong>${totalHours} hrs</strong></td>
                            <td><strong>${this.fmt(product.totalUnits)}</strong></td>
                            <td><strong>${totalInsp}</strong></td>
                            <td><strong>${totalWgt}</strong></td>
                            <td><strong>${totalMd}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;

        document.getElementById('modalOverlay').classList.add('active');
    }

    // ── Modal: UPC File ────────────────────────────────────────────────────

    viewUpcFile() {
        const lineName = document.getElementById('lineSelect').selectedOptions[0].text;
        const startStr = this._startDate ? this._startDate.toLocaleDateString('en-US') : '';
        const endStr   = this._endDate   ? this._endDate.toLocaleDateString('en-US')   : '';

        const tableRows = this.data.map((p, i) => {
            const total = p.inspectionRejects.value + p.weightRejects.value + p.mdRejects.value;
            const rate  = ((total / p.totalUnits) * 100).toFixed(2);
            return `
                <tr>
                    <td>${i + 1}</td>
                    <td>${p.product}</td>
                    <td>${p.upc}</td>
                    <td>${p._hours} hrs</td>
                    <td>${this.fmt(p.totalUnits)}</td>
                    <td>${total}</td>
                    <td>${rate}%</td>
                </tr>
            `;
        }).join('');

        document.getElementById('modalTitle').textContent = `UPC File — ${lineName}`;
        document.getElementById('modalBody').innerHTML = `
            <div class="modal-meta">
                <span><strong>Line:</strong> ${lineName}</span>
                <span><strong>Date Range:</strong> ${startStr} – ${endStr}</span>
                <span><strong>Products Ran:</strong> ${this.data.length}</span>
            </div>
            <h4 class="modal-table-title">Products in This Run</h4>
            <div class="modal-table-wrapper">
                <table class="modal-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>UPC</th>
                            <th>Run Time</th>
                            <th>Units Ran</th>
                            <th>Total Rejects</th>
                            <th>Reject Rate</th>
                        </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                </table>
            </div>
        `;

        document.getElementById('modalOverlay').classList.add('active');
    }

    closeModal() {
        document.getElementById('modalOverlay').classList.remove('active');
    }

    fmt(n) {
        return Number(n).toLocaleString('en-US');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// BOOT
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new VeriPakDashboard();
});

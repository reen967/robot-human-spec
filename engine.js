let chart;

document.addEventListener('DOMContentLoaded', () => {
    populateSelects();
    initChart();
    document.getElementById('playBtn').onclick = playWord;
});

function populateSelects() {
    const wSel = document.getElementById('wordSelect');
    const rSel = document.getElementById('robotSelect');
    Object.keys(DICTIONARY).forEach(w => wSel.add(new Option(w, w)));
    Object.keys(ROBOTS).forEach(r => rSel.add(new Option(r, r)));
}

function initChart() {
    const ctx = document.getElementById('plotCanvas').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: { labels: [], datasets: [
            { label: 'Target Sensation (Word)', borderColor: '#facc15', data: [] },
            { label: 'Robot Effort (Physical)', borderColor: '#38bdf8', data: [], borderDash: [5, 5] }
        ]},
        options: { animation: false, scales: { y: { min: 0, max: 1 }}}
    });
}

function playWord() {
    const wordKey = document.getElementById('wordSelect').value;
    const robotKey = document.getElementById('robotSelect').value;
    const word = DICTIONARY[wordKey];
    const robot = ROBOTS[robotKey];
    
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];

    const comp = word.components[0];
    const antenna = HUMAN_ANTENNAS[comp.antenna];
    const steps = 20;

    for (let i = 0; i <= steps; i++) {
        let t = i / steps;
        let sensation = SLOPES[comp.slope](t);
        
        // THE TRANSFORMATION: E = S^(1/n)
        let effort = Math.pow(sensation, 1 / antenna.n);

        chart.data.labels.push((t * comp.duration).toFixed(0) + "ms");
        chart.data.datasets[0].data.push(sensation);
        chart.data.datasets[1].data.push(effort);
    }
    chart.update();
    
    // Log the "Word" translation
    const stream = document.getElementById('outputStream');
    const finalEffort = (Math.pow(SLOPES[comp.slope](1), 1/antenna.n) * 100).toFixed(0);
    stream.innerHTML = `Robot <strong>${robotKey}</strong> is speaking <strong>${wordKey}</strong>.<br> 
                        Final Physical Effort: ${finalEffort}% output.`;
}

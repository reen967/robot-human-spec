let charts = {};

document.addEventListener('DOMContentLoaded', () => {
    setupUI();
    document.getElementById('transitionBtn').onclick = runComparison;
});

function setupUI() {
    const sw = document.getElementById('startWord');
    const ew = document.getElementById('endWord');
    const r1 = document.getElementById('robot1Select');
    const r2 = document.getElementById('robot2Select');

    Object.keys(DICTIONARY).forEach(w => {
        sw.add(new Option(w, w));
        ew.add(new Option(w, w));
    });
    Object.keys(ROBOTS).forEach(r => {
        r1.add(new Option(r, r));
        r2.add(new Option(r, r));
    });
    
    charts.robot1 = initChart('canvas1');
    charts.robot2 = initChart('canvas2');
}

function initChart(id) {
    return new Chart(document.getElementById(id), {
        type: 'line',
        data: { labels: [], datasets: [
            { label: 'Perceived Sensation', borderColor: '#facc15', data: [] },
            { label: 'Physical Effort', borderColor: '#38bdf8', data: [], borderDash: [5, 5] }
        ]},
        options: { scales: { y: { min: 0, max: 1.2 } } }
    });
}

function runComparison() {
    const start = DICTIONARY[document.getElementById('startWord').value];
    const end = DICTIONARY[document.getElementById('endWord').value];
    
    processRobotTransition('robot1', document.getElementById('robot1Select').value, start, end);
    processRobotTransition('robot2', document.getElementById('robot2Select').value, start, end);
}

function processRobotTransition(chartId, robotKey, startWord, endWord) {
    const robot = ROBOTS[robotKey];
    const chart = charts[chartId];
    const log = document.getElementById(chartId === 'canvas1' ? 'log1' : 'log2');
    
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];

    const steps = 30;
    const slopeFunc = SLOPES[endWord.slope];

    // We analyze the primary antenna of the end word
    const primaryAntenna = Object.keys(endWord.targets)[0];
    const antennaSpec = HUMAN_ANTENNAS[primaryAntenna];
    const startSensation = startWord.targets[primaryAntenna] || 0;
    const endSensation = endWord.targets[primaryAntenna];

    for (let i = 0; i <= steps; i++) {
        let t = i / steps;
        // Calculate where we are in the transition curve
        let currentSensation = startSensation + (endSensation - startSensation) * slopeFunc(t);
        
        // Translate to physical effort
        let effort = Math.pow(currentSensation, 1 / antennaSpec.n);

        chart.data.labels.push(i);
        chart.data.datasets[0].data.push(currentSensation);
        chart.data.datasets[1].data.push(effort);
    }
    chart.update();

    const tool = Object.keys(robot.capabilities).find(k => robot.capabilities[k].antenna === primaryAntenna);
    log.innerHTML = tool ? `Using <strong>${tool}</strong> to bridge ${startSensation} → ${endSensation}` : "Capability missing for this transition.";
}

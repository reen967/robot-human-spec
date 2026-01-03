let charts = {};

window.onload = () => {
    // Populate Select Menus
    const sWord = document.getElementById('startWord');
    const eWord = document.getElementById('endWord');
    const r1 = document.getElementById('robot1Select');
    const r2 = document.getElementById('robot2Select');

    Object.keys(DICTIONARY).forEach(w => {
        sWord.add(new Option(w, w));
        eWord.add(new Option(w, w));
    });
    eWord.selectedIndex = 1; // Default to different words

    Object.keys(ROBOTS).forEach(r => {
        r1.add(new Option(r, r));
        r2.add(new Option(r, r));
    });
    r2.selectedIndex = 1; // Default to different robots

    // Initialize Charts
    charts.robot1 = initChart('canvas1');
    charts.robot2 = initChart('canvas2');

    document.getElementById('transitionBtn').onclick = runTranslation;
    runTranslation(); // Run once on load
};

function initChart(canvasId) {
    return new Chart(document.getElementById(canvasId), {
        type: 'line',
        data: {
            labels: Array.from({length: 21}, (_, i) => i * 5 + "%"),
            datasets: [
                { label: 'Perceived Sensation (The Word)', borderColor: '#facc15', data: [], tension: 0.4 },
                { label: 'Robot Effort (The Physical)', borderColor: '#38bdf8', borderDash: [5, 5], data: [], tension: 0.4 }
            ]
        },
        options: { responsive: true, scales: { y: { min: 0, max: 1 } } }
    });
}

function runTranslation() {
    const startKey = document.getElementById('startWord').value;
    const endKey = document.getElementById('endWord').value;
    
    updateRobot('robot1', document.getElementById('robot1Select').value, startKey, endKey);
    updateRobot('robot2', document.getElementById('robot2Select').value, startKey, endKey);
}

function updateRobot(chartKey, robotName, sKey, eKey) {
    const robot = ROBOTS[robotName];
    const start = DICTIONARY[sKey];
    const end = DICTIONARY[eKey];
    const chart = charts[chartKey];
    const log = document.getElementById(chartKey === 'robot1' ? 'log1' : 'log2');

    // Pick the first capability as the primary "antenna" for the demo
    const toolName = Object.keys(robot.capabilities)[0];
    const antennaName = robot.capabilities[toolName];
    const n = HUMAN_ANTENNAS[antennaName].n;

    const sVal = start[antennaName] || 0;
    const eVal = end[antennaName] || 0;

    let sensationData = [];
    let effortData = [];

    for (let i = 0; i <= 20; i++) {
        let t = i / 20;
        // Linear transition in sensation space
        let s = sVal + (eVal - sVal) * t;
        // Inverse Stevens' Power Law to find required Robot Effort
        let effort = Math.pow(s, 1 / n);

        sensationData.push(s);
        effortData.push(effort);
    }

    chart.data.datasets[0].data = sensationData;
    chart.data.datasets[1].data = effortData;
    chart.update();

    log.innerHTML = `TRANSLATION: To move <strong>${sKey} → ${eKey}</strong>, ${robotName} uses <strong>${toolName}</strong> adjusted to human ${antennaName} sensitivity (n=${n}).`;
}

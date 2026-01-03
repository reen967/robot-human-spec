let charts = {};

window.onload = () => {
    refreshUI();
    charts.robot1 = initChart('canvas1');
    charts.robot2 = initChart('canvas2');
    document.getElementById('transitionBtn').onclick = runTranslation;
};

function initChart(id) {
    return new Chart(document.getElementById(id), {
        type: 'line',
        data: {
            labels: Array.from({length: 11}, (_, i) => i * 10 + "%"),
            datasets: [
                { label: 'Sensation', borderColor: '#facc15', data: [], tension: 0.3 },
                { label: 'Robot Effort', borderColor: '#38bdf8', borderDash: [5, 5], data: [], tension: 0.3 }
            ]
        },
        options: { scales: { y: { min: 0, max: 1.2 } } }
    });
}

function refreshUI() {
    const sW = document.getElementById('startWord'), eW = document.getElementById('endWord');
    const r1 = document.getElementById('robot1Select'), r2 = document.getElementById('robot2Select');
    const wList = document.getElementById('wordList'), rList = document.getElementById('robotList');

    [sW, eW, r1, r2, wList, rList].forEach(el => el.innerHTML = '');

    Object.keys(DICTIONARY).forEach(w => {
        sW.add(new Option(w, w)); eW.add(new Option(w, w));
        wList.innerHTML += `<div class='item'>${w}</div>`;
    });
    Object.keys(ROBOTS).forEach(r => {
        r1.add(new Option(r, r)); r2.add(new Option(r, r));
        rList.innerHTML += `<div class='item'>${r}</div>`;
    });
}

function saveWord() {
    const name = document.getElementById('newWordName').value.toUpperCase();
    if(!name) return;
    DICTIONARY[name] = {
        Looming: parseFloat(document.getElementById('valLooming').value),
        Brightness: parseFloat(document.getElementById('valBrightness').value),
        Loudness: parseFloat(document.getElementById('valLoudness').value)
    };
    refreshUI();
}

function saveRobot() {
    const name = document.getElementById('newRobotName').value;
    const tool = document.getElementById('toolName').value;
    const ant = document.getElementById('toolAntenna').value;
    if(!name || !tool) return;
    ROBOTS[name] = { capabilities: { [tool]: ant } };
    refreshUI();
}

function runTranslation() {
    updateView('robot1', document.getElementById('robot1Select').value);
    updateView('robot2', document.getElementById('robot2Select').value);
}

function updateView(key, robotName) {
    const start = DICTIONARY[document.getElementById('startWord').value];
    const end = DICTIONARY[document.getElementById('endWord').value];
    const robot = ROBOTS[robotName];
    const tool = Object.keys(robot.capabilities)[0];
    const antenna = robot.capabilities[tool];
    const n = HUMAN_ANTENNAS[antenna].n;

    let sData = [], eData = [];
    const sVal = start[antenna] || 0, eVal = end[antenna] || 0;

    for(let i=0; i<=10; i++) {
        let t = i/10;
        let s = sVal + (eVal - sVal) * t;
        sData.push(s);
        eData.push(Math.pow(s, 1/n));
    }
    charts[key].data.datasets[0].data = sData;
    charts[key].data.datasets[1].data = eData;
    charts[key].update();
    document.getElementById('log' + key.slice(-1)).innerText = `Using ${tool} (n=${n})`;
}

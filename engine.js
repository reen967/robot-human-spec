// The Unified Human Spec Constants
const HUMAN_SPEC = {
    "Looming": { c: 0.04, n: 1.10, tau: 100, unit: "Expansion" },
    "Angular Velocity": { c: 0.05, n: 1.00, tau: 100, unit: "Degrees/s" },
    "Luminance": { c: 0.08, n: 0.33, tau: 50, unit: "Nits" },
    "Saturation": { c: 0.02, n: 1.70, tau: 100, unit: "% Vividness" },
    "Pitch": { c: 0.003, n: 1.00, tau: 10, unit: "Hz" },
    "Loudness": { c: 0.048, n: 0.67, tau: 50, unit: "dB" },
    "Force": { c: 0.07, n: 1.45, tau: 70, unit: "Newtons" }
};

const select = document.getElementById('antennaSelect');
const effortSlider = document.getElementById('effortRange');
const effortVal = document.getElementById('effortVal');

// Populate Dropdown
Object.keys(HUMAN_SPEC).forEach(key => {
    let opt = document.createElement('option');
    opt.value = key;
    opt.innerHTML = key;
    select.appendChild(opt);
});

function calculatePerception() {
    const type = select.value;
    const input = parseFloat(effortSlider.value);
    const spec = HUMAN_SPEC[type];

    // Stevens' Power Law: S = k * I^n
    // We normalize input to a 0.0 - 1.0 scale for calculation
    const intensity = input / 100;
    const sensation = Math.pow(intensity, spec.n);

    // Weber's Law: ΔI = I * c
    const jnd = input * spec.c;

    // Update UI
    effortVal.innerText = input;
    document.getElementById('sensationOut').innerText = (sensation * 100).toFixed(2) + "%";
    document.getElementById('weberOut').innerText = jnd.toFixed(2) + " units";
    document.getElementById('mhpOut').innerText = spec.tau;

    const status = document.getElementById('statusLabel');
    if (spec.n > 1) {
        status.innerText = "Sensation Expanding: Human is hyper-sensitive to changes here.";
        status.style.color = "#fb7185";
    } else if (spec.n < 1) {
        status.innerText = "Sensation Compressing: Robot must exert more effort to be noticed.";
        status.style.color = "#38bdf8";
    } else {
        status.innerText = "Linear Perception: Direct one-to-one interpretation.";
        status.style.color = "#10b981";
    }
}

effortSlider.oninput = calculatePerception;
select.onchange = calculatePerception;
calculatePerception();

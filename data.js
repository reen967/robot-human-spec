const HUMAN_ANTENNAS = {
    "Looming": { n: 1.10, desc: "Presence/Approach" },
    "Brightness": { n: 0.33, desc: "Light Intensity" },
    "Loudness": { n: 0.67, desc: "Sound Volume" },
    "Force": { n: 1.45, desc: "Pressure" }
};

const SLOPES = {
    "LINEAR": (t) => t,
    "CRESCENDO": (t) => Math.pow(t, 2),
    "DE-ESCALATE": (t) => 1 - Math.pow(1 - t, 2),
    "SWELL": (t) => Math.sin(t * Math.PI)
};

const DICTIONARY = {
    "Greeting": {
        description: "A gentle decelerating entry.",
        components: [{ antenna: "Looming", slope: "DE-ESCALATE", duration: 1000 }]
    },
    "Warning": {
        description: "A sudden accelerating surge.",
        components: [{ antenna: "Loudness", slope: "CRESCENDO", duration: 500 }]
    }
};

const ROBOTS = {
    "Tall-Bot": { capabilities: { "Spine": { antenna: "Looming", max: 100, unit: "cm" } } },
    "Box-Bot": { capabilities: { "Speaker": { antenna: "Loudness", max: 110, unit: "dB" } } }
};

const HUMAN_ANTENNAS = {
    "Looming": { n: 1.10, c: 0.04 },
    "Brightness": { n: 0.33, c: 0.08 },
    "Loudness": { n: 0.67, c: 0.048 }
};

const SLOPES = {
    "SMOOTH": (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, // Ease-in-out
    "SUDDEN": (t) => Math.pow(t, 3) // Accelerating
};

const DICTIONARY = {
    "IDLE": { targets: { "Brightness": 0.1, "Looming": 0.0 }, slope: "SMOOTH" },
    "ALERT": { targets: { "Brightness": 0.9, "Loudness": 0.5 }, slope: "SUDDEN" },
    "CALM": { targets: { "Brightness": 0.4, "Looming": 0.2 }, slope: "SMOOTH" }
};

const ROBOTS = {
    "Guardian": { 
        capabilities: { 
            "Chest_LED": { antenna: "Brightness", max: 1000 },
            "Speaker": { antenna: "Loudness", max: 120 }
        }
    },
    "Messenger": { 
        capabilities: { 
            "Neck_Extender": { antenna: "Looming", max: 30 },
            "Chirp_Module": { antenna: "Loudness", max: 80 }
        }
    }
};

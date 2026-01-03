// 1. THE HUMAN SPEC (The "Receiving Antenna" - includes Weber's C, Stevens' N, and a description)
const HUMAN_ANTENNAS = {
    "Looming": { n: 1.10, c: 0.04, desc: "Perception of approach/size (visual expansion)" },
    "Angular Velocity": { n: 1.00, c: 0.05, desc: "Perception of rotational speed (e.g., head turn)" },
    "Brightness": { n: 0.33, c: 0.08, desc: "Perception of light intensity (e.g., LED brightness)" },
    "Saturation": { n: 1.70, c: 0.02, desc: "Perception of color vividness/purity" },
    "Pitch": { n: 1.00, c: 0.003, desc: "Perception of sound frequency (e.g., tone)" },
    "Loudness": { n: 0.67, c: 0.048, desc: "Perception of sound volume" },
    "Force": { n: 1.45, c: 0.07, desc: "Perception of physical pressure/weight" },
    "Vibration": { n: 0.95, c: 0.15, desc: "Perception of tactile trembling" }
};

// 2. THE WORDS (The "Target Sensations" - defined as % of human max sensation)
// Key: Word Name
// Value: { targets: { AntennaName: TargetSensation_0_1, ... }, description: "..." }
const DICTIONARY = {
    "Attention": { 
        targets: { "Loudness": 0.3, "Brightness": 0.2 }, 
        description: "A gentle request for the user's focus." 
    },
    "Alert": { 
        targets: { "Loudness": 0.7, "Saturation": 0.8 }, 
        description: "High urgency, demanding immediate notice." 
    },
    "Curiosity": {
        targets: { "Angular Velocity": 0.4, "Brightness": 0.6 },
        description: "Signaling interest or inspection."
    },
    "Dominance": {
        targets: { "Looming": 0.9, "Loudness": 0.8 },
        description: "A powerful, commanding presence."
    }
};

// 3. THE ROBOTS (The "Toolkits")
// Key: Robot Name
// Value: { capabilities: { ToolName: { antenna: AntennaName, max_output: NumericMaxOutput }, ... } }
const ROBOTS = {
    "Tall-Bot": {
        capabilities: {
            "Telescopic Spine": { antenna: "Looming", max_output: 100 }, // Max extension, e.g., in cm
            "Speaker": { antenna: "Loudness", max_output: 80 } // Max dB
        }
    },
    "Small-Box": {
        capabilities: {
            "Speaker": { antenna: "Loudness", max_output: 110 }, // Max dB
            "LED Ring": { antenna: "Brightness", max_output: 500 } // Max Nits
        }
    },
    "Robo-Arm": {
        capabilities: {
            "Gripper Force": { antenna: "Force", max_output: 200 }, // Max Newtons
            "Arm Vibration": { antenna: "Vibration", max_output: 10 } // Max Hz or amplitude
        }
    }
};

// You could add a 'synesthesia' mapping here for compensation logic:
// e.g., if a robot can't do Looming, maybe it can compensate with Loudness at a certain ratio.
// For now, if a robot lacks a capability for a target antenna, it's marked as "MISSING".

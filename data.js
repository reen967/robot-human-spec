const HUMAN_ANTENNAS = {
    "Looming": { n: 1.10 },    // Near linear
    "Brightness": { n: 0.33 }, // High compression
    "Loudness": { n: 0.67 },   // Moderate compression
    "Force": { n: 1.45 }       // Expansion (feels stronger faster)
};

const DICTIONARY = {
    "IDLE": { Brightness: 0.05, Looming: 0.0, Loudness: 0.0, desc: "Powered on, silent." },
    "GREET": { Brightness: 0.4, Looming: 0.3, Loudness: 0.2, desc: "A soft approach." },
    "ALERT": { Brightness: 0.9, Looming: 0.7, Loudness: 0.8, desc: "Urgent status change." },
    "YIELD": { Brightness: 0.1, Looming: 0.0, Loudness: 0.1, desc: "Moving away/closing." }
};

const ROBOTS = {
    "Guardian_Unit": { 
        capabilities: { "Main_LED": "Brightness", "Voice_Box": "Loudness" } 
    },
    "Crawler_Bot": { 
        capabilities: { "Neck_Servo": "Looming", "Piezzo_Buzzer": "Loudness" } 
    },
    "Industrial_Arm": {
        capabilities: { "Gripper": "Force", "Status_Light": "Brightness" }
    }
};

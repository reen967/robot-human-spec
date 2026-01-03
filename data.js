// Physical constants for human sensors
const HUMAN_ANTENNAS = {
    "Looming": { n: 1.10 },
    "Brightness": { n: 0.33 },
    "Loudness": { n: 0.67 }
};

// Initial Vocabulary
let DICTIONARY = {
    "IDLE": { Brightness: 0.1, Looming: 0.0, Loudness: 0.0 },
    "GREET": { Brightness: 0.5, Looming: 0.3, Loudness: 0.2 },
    "ALERT": { Brightness: 0.9, Looming: 0.7, Loudness: 0.8 }
};

// Initial Robot Fleet
let ROBOTS = {
    "Guardian": { capabilities: { "Chest_LED": "Brightness" } },
    "Drone": { capabilities: { "Motor_Speed": "Looming" } }
};

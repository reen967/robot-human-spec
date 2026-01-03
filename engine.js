// 1. THE HUMAN SPEC (The "Receiving Antenna")
const HUMAN_ANTENNAS = {
    "Looming": { n: 1.10, c: 0.04, desc: "Perception of approach/size" },
    "Loudness": { n: 0.67, c: 0.048, desc: "Perception of volume" },
    "Brightness": { n: 0.33, c: 0.08, desc: "Perception of light intensity" }
};

// 2. THE WORDS (The "Target Sensations" - defined as % of human scale)
const DICTIONARY = {
    "Attention": { 
        targets: { "Looming": 0.4, "Loudness": 0.2 }, 
        description: "A gentle nudge for the user to look up." 
    },
    "Alert": { 
        targets: { "Looming": 0.8, "Loudness": 0.7 }, 
        description: "High intensity, high urgency." 
    }
};

// 3. THE ROBOTS (The "Toolkits")
const ROBOTS = {
    "Tall-Bot": {
        capabilities: {
            "Telescopic Spine": { antenna: "Looming", max_output: 100 },
            "Speaker": { antenna: "Loudness", max_output: 80 }
        }
    },
    "Small-Box": {
        capabilities: {
            "Speaker": { antenna: "Loudness", max_output: 110 },
            "LED Ring": { antenna: "Brightness", max_output: 500 }
        }
    }
};

// 4. THE TRANSLATION FUNCTION
function translateWord(wordName, robotName) {
    const word = DICTIONARY[wordName];
    const robot = ROBOTS[robotName];
    let translation = [];

    for (let antenna in word.targets) {
        const targetSensation = word.targets[antenna];
        const spec = HUMAN_ANTENNAS[antenna];
        
        // Find if robot has a tool for this antenna
        const toolName = Object.keys(robot.capabilities).find(t => robot.capabilities[t].antenna === antenna);

        if (toolName) {
            // Apply Stevens' Power Law Inverse to find required physical effort
            // E = S^(1/n)
            const requiredEffort = Math.pow(targetSensation, 1 / spec.n);
            translation.push({
                tool: toolName,
                antenna: antenna,
                effort_percent: (requiredEffort * 100).toFixed(1)
            });
        } else {
            // COMPENSATION LOGIC: If robot lacks the tool, search for a secondary "Affect"
            translation.push({
                tool: "None",
                antenna: antenna,
                status: "MISSING - Needs Compensation"
            });
        }
    }
    return translation;
}

effortSlider.oninput = calculatePerception;
select.onchange = calculatePerception;
calculatePerception();

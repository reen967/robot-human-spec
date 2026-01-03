// Function to translate a word's target sensations into robot-specific efforts
function translateWord(wordName, robotName) {
    const word = DICTIONARY[wordName];
    const robot = ROBOTS[robotName];
    let translation = [];

    if (!word || !robot) {
        console.error("Word or Robot not found.");
        return [];
    }

    for (const antenna in word.targets) {
        const targetSensation = word.targets[antenna]; // 0-1 scale
        const spec = HUMAN_ANTENNAS[antenna];
        
        // Find if robot has a tool for this specific antenna
        const toolEntry = Object.entries(robot.capabilities).find(([toolName, cap]) => cap.antenna === antenna);

        if (toolEntry) {
            const [toolName, capability] = toolEntry;
            
            // Apply Stevens' Power Law Inverse: E = S^(1/n)
            // Sensation (S) is on a 0-1 scale. We want to find the required physical effort (E).
            const requiredEffortNormalized = Math.pow(targetSensation, 1 / spec.n);
            
            // Scale required effort to robot's max_output
            const requiredEffortRaw = requiredEffortNormalized * capability.max_output;

            translation.push({
                tool: toolName,
                antenna: antenna,
                effort_percent: (requiredEffortNormalized * 100).toFixed(1), // % of normalized max effort
                raw_output: requiredEffortRaw.toFixed(2), // Actual physical output needed
                max_output: capability.max_output // Robot's max output for reference
            });
        } else {
            // COMPENSATION LOGIC: This is where you'd implement cross-modal compensation
            // For now, it's simply marked as missing.
            translation.push({
                tool: "N/A",
                antenna: antenna,
                status: "MISSING - Robot lacks this capability."
            });
        }
    }
    return translation;
}

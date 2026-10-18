const hl7Input = document.getElementById("hl7-input");
const loadSampleButton = document.getElementById("load-sample-button");
const parseButton = document.getElementById("parse-button");

loadSampleButton.addEventListener("click", async () => {
    try {
        const response = await fetch("samples/sample-oru.hl7");
        const sampleMessage = await response.text();

        hl7Input.value = sampleMessage;
    } catch (error) {
        console.error("Unable to load sample HL7 message:", error);
    }
});

const parsedOutput = document.getElementById("parsed-output");

parseButton.addEventListener("click", () => {
    const message = hl7Input.value.trim();

    if (!message) {
        parsedOutput.textContent = "Please enter an HL7 message first.";
        return;
    }

    const segments = message.split(/\r\n|\r|\n/);
    const results = [];

    for (const segment of segments) {
        if (!segment.trim()) {
            continue;
        }

        const fields = segment.split("|");
        const segmentType = fields[0];

        let description = "";

        switch (segmentType) {
            case "MSH":
                description = "Message Header";
                break;
            case "PID":
                description = "Patient Identification";
                break;
            case "OBR":
                description = "Observation Request";
                break;
            case "OBX":
                description = "Observation Result";
                break;
            default:
                description = "Other Segment";
        }

        results.push(`${segmentType} - ${description}`);
    }

    parsedOutput.textContent = results.join("\n");
});
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
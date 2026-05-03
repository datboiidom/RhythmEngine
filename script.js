console.log("RhythmEngine Script Started");

// ======== AUDIO PLAY FUNCTION ========
function playSound(instrumentName) {
    console.log(instrumentName + " played!");

    // Map instrument names to audio IDs
    const audioMap = {
        "Kick": "kickSound",
        "Snare": "snareSound",
        "Hi-Hat": "hihatSound",
        "Crash": "crashSound",
        "Low E": "bassLowE",
        "A": "bassA",
        "D": "bassLowD",
        "G": "bassG",
        "C": "pianoC",
        "D Note": "pianoD",
        "E": "pianoE",
        "F": "pianoF",
        "E Chord": "guitarE",
        "A Chord": "guitarA",
        "D Chord": "guitarD",
        "G Chord": "guitarG",
        "C Note": "trumpetC",
        "D Note Trumpet": "trumpetD",
        "E Note": "trumpetE",
        "F Note": "trumpetF"
    };

    // Play audio if it exists
    const audioId = audioMap[instrumentName];
    if (audioId) {
        const audioElem = document.getElementById(audioId);
        if (audioElem) audioElem.play();
    } else {
        console.log("No audio found for " + instrumentName);
    }
}

// ======== INSTRUMENT BUTTONS ========
function setupInstrumentButtons() {
    const instrumentButtons = document.querySelectorAll('.instrument-btn');
    instrumentButtons.forEach(button => {
        button.addEventListener('click', () => {
            playSound(button.innerText);
        });
    });
}
setupInstrumentButtons();

// ======== CONTROL BUTTONS ========
let isPlaying = false;
let isRecording = false;

function playBeat() { isPlaying = true; console.log("Beat playing!"); }
function pauseBeat() { isPlaying = false; console.log("Beat paused!"); }
function toggleRecord() {
    isRecording = !isRecording;
    console.log(isRecording ? "Recording started!" : "Recording stopped!");
}
function saveBeat() { console.log("Beat saved!"); alert("Your beat has been saved!"); }

function setupControlButtons() {
    document.querySelector('.play-btn').addEventListener('click', playBeat);
    document.querySelector('.pause-btn').addEventListener('click', pauseBeat);
    document.querySelector('.record-btn').addEventListener('click', toggleRecord);
    document.querySelector('.save-btn').addEventListener('click', saveBeat);
}
setupControlButtons();

// ======== BPM SLIDER ========
const bpmSlider = document.querySelector('.bpm-wheel');
const bpmDisplay = document.querySelector('.bpm-display');
bpmSlider.addEventListener('input', () => {
    bpmDisplay.textContent = bpmSlider.value;
    console.log("BPM set to: " + bpmSlider.value);
});

// ======== BEAT LIBRARY TOGGLE ========
const togglePanelBtn = document.querySelector('.toggle-panel');
const beatsPanel = document.querySelector('.beats-panel');
let panelOpen = true;

togglePanelBtn.addEventListener('click', () => {
    if(panelOpen) {
        beatsPanel.style.width = '0';
        togglePanelBtn.textContent = '→';
        panelOpen = false;
    } else {
        beatsPanel.style.width = '250px';
        togglePanelBtn.textContent = '←';
        panelOpen = true;
    }
});

// ======== DEMO BUTTONS ========
const loadButtons = document.querySelectorAll('.load-btn');
loadButtons.forEach(btn => btn.addEventListener('click', () => alert("Demo")));

const buyButtons = document.querySelectorAll('.buy-btn');
buyButtons.forEach(btn => btn.addEventListener('click', () => alert("In Demo")));
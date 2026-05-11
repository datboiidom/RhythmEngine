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

// ======== DEMO BUTTONS ========
const loadButtons = document.querySelectorAll('.load-btn');
loadButtons.forEach(btn => btn.addEventListener('click', () => alert("Demo")));

const buyButtons = document.querySelectorAll('.buy-btn');
buyButtons.forEach(btn => btn.addEventListener('click', () => alert("In Demo")));


// SEQUENCER SETUP
const sequenceSteps = 8; // number of steps
const drumInstruments = ["Kick", "Snare", "Hi-Hat", "Crash"];

// Example: each row has 8 steps (false = off, true = active)
let sequencerGrid = [
    [true, false, false, false, true, false, false, false], // Kick
    [false, false, true, false, false, false, true, false], // Snare
    [false, true, false, true, false, true, false, true], // Hi-Hat
    [false, false, false, true, false, false, false, true] // Crash
];

let currentStep = 0;
let sequencerInterval = null;


// START / STOP SEQUENCER
function startSequencer() {
    if(sequencerInterval) clearInterval(sequencerInterval); // reset if already running

    const bpm = parseInt(bpmSlider.value) || 60; // default 60 if 0
    const interval = (60 / bpm) * 1000; // time per beat in ms

    sequencerInterval = setInterval(() => {
        // play active instruments on current step
        for(let i=0; i<drumInstruments.length; i++){
            if(sequencerGrid[i][currentStep]){
                playSound(drumInstruments[i]);
            }
        }

        // move to next step
        currentStep = (currentStep + 1) % sequenceSteps;

        // update visual step indicator
        const steps = document.querySelectorAll('.pattern-grid .step');
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });

    }, interval);
}

function stopSequencer() {
    if(sequencerInterval) clearInterval(sequencerInterval);
}


// CONNECT PLAY / PAUSE TO SEQUENCER
document.querySelector('.play-btn').addEventListener('click', () => {
    startSequencer();
    isPlaying = true;
});
document.querySelector('.pause-btn').addEventListener('click', () => {
    stopSequencer();
    isPlaying = false;
});


// UPDATE INTERVAL WHEN BPM CHANGES
bpmSlider.addEventListener('input', () => {
    bpmDisplay.textContent = bpmSlider.value;
    if(isPlaying) startSequencer(); // restart sequencer with new BPM
});

const reopenPanelBtn = document.getElementById('reopen-panel-btn');

reopenPanelBtn.addEventListener('click', () => {
    if (!panelOpen) { // only open if currently closed
        beatsPanel.style.width = '250px';
        togglePanelBtn.textContent = '←';
        panelOpen = true;
    }
});


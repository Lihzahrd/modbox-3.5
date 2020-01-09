/*!
Copyright (C) 2019 John Nesky

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var beepbox;
(function (beepbox) {
    class Config {
    }
    Config.scales = toNameMap([
        { name: "easy :)", flags: [true, false, true, false, true, false, false, true, false, true, false, false] },
        { name: "easy :(", flags: [true, false, false, true, false, true, false, true, false, false, true, false] },
        { name: "island :)", flags: [true, false, false, false, true, true, false, true, false, false, false, true] },
        { name: "island :(", flags: [true, true, false, true, false, false, false, true, true, false, false, false] },
        { name: "blues :)", flags: [true, false, true, true, true, false, false, true, false, true, false, false] },
        { name: "blues :(", flags: [true, false, false, true, false, true, true, true, false, false, true, false] },
        { name: "normal :)", flags: [true, false, true, false, true, true, false, true, false, true, false, true] },
        { name: "normal :(", flags: [true, false, true, true, false, true, false, true, true, false, true, false] },
        { name: "dbl harmonic :)", flags: [true, true, false, false, true, true, false, true, true, false, false, true] },
        { name: "dbl harmonic :(", flags: [true, false, true, true, false, false, true, true, true, false, false, true] },
        { name: "enigma", flags: [true, false, true, false, true, false, true, false, true, false, true, false] },
        { name: "expert", flags: [true, true, true, true, true, true, true, true, true, true, true, true] },
	{ name: "monotonic", flags: [true, false, false, false, false, false, false, false, false, false, false, false] },
	{ name: "no dabbing", flags: [true, true, false, true, true, true, true, true, true, false, true, false] },
    ]);
    Config.keys = toNameMap([
        { name: "C", isWhiteKey: true, basePitch: 12 },
        { name: "C#", isWhiteKey: false, basePitch: 13 },
        { name: "D", isWhiteKey: true, basePitch: 14 },
        { name: "D#", isWhiteKey: false, basePitch: 15 },
        { name: "E", isWhiteKey: true, basePitch: 16 },
        { name: "F", isWhiteKey: true, basePitch: 17 },
        { name: "F#", isWhiteKey: false, basePitch: 18 },
        { name: "G", isWhiteKey: true, basePitch: 19 },
        { name: "G#", isWhiteKey: false, basePitch: 20 },
        { name: "A", isWhiteKey: true, basePitch: 21 },
        { name: "A#", isWhiteKey: false, basePitch: 22 },
        { name: "B", isWhiteKey: true, basePitch: 23 },
    ]);
    Config.blackKeyNameParents = [-1, 1, -1, 1, -1, 1, -1, -1, 1, -1, 1, -1];
    Config.tempoMin = 30;
    Config.tempoMax = 300;
    Config.reverbRange = 200;
    Config.detuneRange = 10;
    Config.beatsPerBarMin = 3;
    Config.beatsPerBarMax = 16;
    Config.barCountMin = 1;
    Config.barCountMax = 128;
    Config.patternsPerChannelMin = 1;
    Config.patternsPerChannelMax = 64;
    Config.instrumentsPerChannelMin = 1;
    Config.instrumentsPerChannelMax = 10;
    Config.partsPerBeat = 24;
    Config.ticksPerPart = 2;
    Config.rhythms = toNameMap([
        { name: "÷3 (triplets)", stepsPerBeat: 3, ticksPerArpeggio: 4, arpeggioPatterns: [[0], [0, 0, 1, 1], [0, 1, 2, 1], [0, 1, 2, 3]], roundUpThresholds: [5, 12, 18] },
        { name: "÷4 (standard)", stepsPerBeat: 4, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 0, 1, 1], [0, 1, 2, 1], [0, 1, 2, 3]], roundUpThresholds: [3, 9, 17, 21] },
        { name: "÷6", stepsPerBeat: 6, ticksPerArpeggio: 4, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]], roundUpThresholds: null },
        { name: "÷8", stepsPerBeat: 8, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]], roundUpThresholds: null },
	{ name: "÷16 (arpfest)", stepsPerBeat: 16, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]], roundUpThresholds: null },
	{ name: "÷12", stepsPerBeat: 12, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]], roundUpThresholds: null },
	{ name: "÷9", stepsPerBeat: 9, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]], roundUpThresholds: null },
	{ name: "÷5", stepsPerBeat: 5, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]], roundUpThresholds: null },
	{ name: "÷50", stepsPerBeat: 50, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]], roundUpThresholds: null },
	{ name: "÷24", stepsPerBeat: 24, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]], roundUpThresholds: null },
        { name: "freehand", stepsPerBeat: 999, ticksPerArpeggio: 3, arpeggioPatterns: [[0], [0, 1], [0, 1, 2, 1], [0, 1, 2, 3]], roundUpThresholds: null },
    ]);
    Config.instrumentTypeNames = ["chip", "FM", "noise", "spectrum", "drumset", "harmonics", "PWM"];
    Config.instrumentTypeHasSpecialInterval = [true, true, false, false, false, true, false];
    Config.instrumentTypeHasChorus = [true, true, true, false, false, true, true];
    Config.chipWaves = toNameMap([
        { name: "rounded", volume: 0.94, samples: centerWave([0.0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.95, 0.9, 0.85, 0.8, 0.7, 0.6, 0.5, 0.4, 0.2, 0.0, -0.2, -0.4, -0.5, -0.6, -0.7, -0.8, -0.85, -0.9, -0.95, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -0.95, -0.9, -0.85, -0.8, -0.7, -0.6, -0.5, -0.4, -0.2]) },
        { name: "triangle", volume: 1.0, samples: centerWave([1.0 / 15.0, 3.0 / 15.0, 5.0 / 15.0, 7.0 / 15.0, 9.0 / 15.0, 11.0 / 15.0, 13.0 / 15.0, 15.0 / 15.0, 15.0 / 15.0, 13.0 / 15.0, 11.0 / 15.0, 9.0 / 15.0, 7.0 / 15.0, 5.0 / 15.0, 3.0 / 15.0, 1.0 / 15.0, -1.0 / 15.0, -3.0 / 15.0, -5.0 / 15.0, -7.0 / 15.0, -9.0 / 15.0, -11.0 / 15.0, -13.0 / 15.0, -15.0 / 15.0, -15.0 / 15.0, -13.0 / 15.0, -11.0 / 15.0, -9.0 / 15.0, -7.0 / 15.0, -5.0 / 15.0, -3.0 / 15.0, -1.0 / 15.0]) },
        { name: "square", volume: 0.5, samples: centerWave([1.0, -1.0]) },
        { name: "1/4 pulse", volume: 0.5, samples: centerWave([1.0, -1.0, -1.0, -1.0]) },
        { name: "1/8 pulse", volume: 0.5, samples: centerWave([1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "sawtooth", volume: 0.65, samples: centerWave([1.0 / 31.0, 3.0 / 31.0, 5.0 / 31.0, 7.0 / 31.0, 9.0 / 31.0, 11.0 / 31.0, 13.0 / 31.0, 15.0 / 31.0, 17.0 / 31.0, 19.0 / 31.0, 21.0 / 31.0, 23.0 / 31.0, 25.0 / 31.0, 27.0 / 31.0, 29.0 / 31.0, 31.0 / 31.0, -31.0 / 31.0, -29.0 / 31.0, -27.0 / 31.0, -25.0 / 31.0, -23.0 / 31.0, -21.0 / 31.0, -19.0 / 31.0, -17.0 / 31.0, -15.0 / 31.0, -13.0 / 31.0, -11.0 / 31.0, -9.0 / 31.0, -7.0 / 31.0, -5.0 / 31.0, -3.0 / 31.0, -1.0 / 31.0]) },
        { name: "double saw", volume: 0.5, samples: centerWave([0.0, -0.2, -0.4, -0.6, -0.8, -1.0, 1.0, -0.8, -0.6, -0.4, -0.2, 1.0, 0.8, 0.6, 0.4, 0.2]) },
        { name: "double pulse", volume: 0.4, samples: centerWave([1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, -1.0, -1.0]) },
        { name: "spiky", volume: 0.4, samples: centerWave([1.0, -1.0, 1.0, -1.0, 1.0, 0.0]) },
	{ name: "atari bass", volume: 0.4, samples: centerWave([-1.0, -1.0, 1.0, -1.0, 1.0, 0.2, 0.5, 0.2]) },
    ]);
    Config.chipNoises = toNameMap([
        { name: "retro", volume: 0.25, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "white", volume: 1.0, basePitch: 69, pitchFilterMult: 8.0, isSoft: true, samples: null },
        { name: "clang", volume: 0.4, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "buzz", volume: 0.3, basePitch: 69, pitchFilterMult: 1024.0, isSoft: false, samples: null },
        { name: "hollow", volume: 1.5, basePitch: 96, pitchFilterMult: 1.0, isSoft: true, samples: null },
    ]);
    Config.filterCutoffMaxHz = 8000;
    Config.filterCutoffMinHz = 1;
    Config.filterMax = 0.95;
    Config.filterMaxResonance = 0.95;
    Config.filterCutoffRange = 11;
    Config.filterResonanceRange = 8;
    Config.transitions = toNameMap([
        { name: "seamless", isSeamless: true, attackSeconds: 0.0, releases: false, releaseTicks: 1, slides: false, slideTicks: 3 },
        { name: "hard", isSeamless: false, attackSeconds: 0.0, releases: false, releaseTicks: 3, slides: false, slideTicks: 3 },
        { name: "soft", isSeamless: false, attackSeconds: 0.025, releases: false, releaseTicks: 3, slides: false, slideTicks: 3 },
        { name: "slide", isSeamless: true, attackSeconds: 0.025, releases: false, releaseTicks: 3, slides: true, slideTicks: 3 },
        { name: "cross fade", isSeamless: false, attackSeconds: 0.04, releases: true, releaseTicks: 6, slides: false, slideTicks: 3 },
        { name: "hard fade", isSeamless: false, attackSeconds: 0.0, releases: true, releaseTicks: 48, slides: false, slideTicks: 3 },
        { name: "medium fade", isSeamless: false, attackSeconds: 0.0125, releases: true, releaseTicks: 72, slides: false, slideTicks: 3 },
        { name: "soft fade", isSeamless: false, attackSeconds: 0.06, releases: true, releaseTicks: 96, slides: false, slideTicks: 6 },
    ]);
    Config.vibratos = toNameMap([
        { name: "none", amplitude: 0.0, periodsSeconds: [0.14], delayParts: 0 },
        { name: "light", amplitude: 0.15, periodsSeconds: [0.14], delayParts: 0 },
        { name: "delayed", amplitude: 0.3, periodsSeconds: [0.14], delayParts: 18 },
        { name: "heavy", amplitude: 0.45, periodsSeconds: [0.14], delayParts: 0 },
        { name: "shaky", amplitude: 0.1, periodsSeconds: [0.11, 1.618 * 0.11, 3 * 0.11], delayParts: 0 },
    ]);
    Config.intervals = toNameMap([
        { name: "union", spread: 0.0, offset: 0.0, volume: 0.7, sign: 1.0 },
        { name: "shimmer", spread: 0.016, offset: 0.0, volume: 0.8, sign: 1.0 },
        { name: "hum", spread: 0.045, offset: 0.0, volume: 1.0, sign: 1.0 },
        { name: "honky tonk", spread: 0.09, offset: 0.0, volume: 1.0, sign: 1.0 },
        { name: "dissonant", spread: 0.25, offset: 0.0, volume: 0.9, sign: 1.0 },
        { name: "fifth", spread: 3.5, offset: 3.5, volume: 0.9, sign: 1.0 },
        { name: "octave", spread: 6.0, offset: 6.0, volume: 0.8, sign: 1.0 },
        { name: "bowed", spread: 0.02, offset: 0.0, volume: 1.0, sign: -1.0 },
    ]);
    Config.effectsNames = ["none", "reverb", "chorus", "chorus & reverb"];
    Config.volumeRange = 8;
    Config.volumeLogScale = -0.5;
    Config.panCenter = 4;
    Config.panMax = Config.panCenter * 2;
    Config.chords = toNameMap([
        { name: "harmony", harmonizes: true, customInterval: false, arpeggiates: false, isCustomInterval: false, strumParts: 0 },
        { name: "strum", harmonizes: true, customInterval: false, arpeggiates: false, isCustomInterval: false, strumParts: 1 },
        { name: "arpeggio", harmonizes: false, customInterval: false, arpeggiates: true, isCustomInterval: false, strumParts: 0 },
        { name: "custom interval", harmonizes: true, customInterval: true, arpeggiates: true, isCustomInterval: true, strumParts: 0 },
    ]);
    Config.operatorCount = 4;
    Config.algorithms = toNameMap([
        { name: "1←(2 3 4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3, 4], [], [], []] },
        { name: "1←(2 3←4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3], [], [4], []] },
        { name: "1←2←(3 4)", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2], [3, 4], [], []] },
        { name: "1←(2 3)←4", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2, 3], [4], [4], []] },
        { name: "1←2←3←4", carrierCount: 1, associatedCarrier: [1, 1, 1, 1], modulatedBy: [[2], [3], [4], []] },
        { name: "1←3 2←4", carrierCount: 2, associatedCarrier: [1, 2, 1, 2], modulatedBy: [[3], [4], [], []] },
        { name: "1 2←(3 4)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[], [3, 4], [], []] },
        { name: "1 2←3←4", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[], [3], [4], []] },
        { name: "(1 2)←3←4", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[3], [3], [4], []] },
        { name: "(1 2)←(3 4)", carrierCount: 2, associatedCarrier: [1, 2, 2, 2], modulatedBy: [[3, 4], [3, 4], [], []] },
        { name: "1 2 3←4", carrierCount: 3, associatedCarrier: [1, 2, 3, 3], modulatedBy: [[], [], [4], []] },
        { name: "(1 2 3)←4", carrierCount: 3, associatedCarrier: [1, 2, 3, 3], modulatedBy: [[4], [4], [4], []] },
        { name: "1 2 3 4", carrierCount: 4, associatedCarrier: [1, 2, 3, 4], modulatedBy: [[], [], [], []] },
    ]);
    Config.operatorCarrierInterval = [0.0, 0.04, -0.073, 0.091];
    Config.operatorAmplitudeMax = 15;
    Config.operatorFrequencies = toNameMap([
        { name: "1×", mult: 1.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "~1×", mult: 1.0, hzOffset: 1.5, amplitudeSign: -1.0 },
        { name: "2×", mult: 2.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "~2×", mult: 2.0, hzOffset: -1.3, amplitudeSign: -1.0 },
        { name: "3×", mult: 3.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "4×", mult: 4.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "5×", mult: 5.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "6×", mult: 6.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "7×", mult: 7.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "8×", mult: 8.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "9×", mult: 9.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "11×", mult: 11.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "13×", mult: 13.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "16×", mult: 16.0, hzOffset: 0.0, amplitudeSign: 1.0 },
        { name: "20×", mult: 20.0, hzOffset: 0.0, amplitudeSign: 1.0 },
    ]);
    Config.envelopes = toNameMap([
        { name: "custom", type: 0, speed: 0.0 },
        { name: "steady", type: 1, speed: 0.0 },
        { name: "punch", type: 2, speed: 0.0 },
        { name: "flare 1", type: 3, speed: 32.0 },
        { name: "flare 2", type: 3, speed: 8.0 },
        { name: "flare 3", type: 3, speed: 2.0 },
        { name: "twang 1", type: 4, speed: 32.0 },
        { name: "twang 2", type: 4, speed: 8.0 },
        { name: "twang 3", type: 4, speed: 2.0 },
        { name: "swell 1", type: 5, speed: 32.0 },
        { name: "swell 2", type: 5, speed: 8.0 },
        { name: "swell 3", type: 5, speed: 2.0 },
        { name: "tremolo1", type: 6, speed: 4.0 },
        { name: "tremolo2", type: 6, speed: 2.0 },
        { name: "tremolo3", type: 6, speed: 1.0 },
        { name: "tremolo4", type: 7, speed: 4.0 },
        { name: "tremolo5", type: 7, speed: 2.0 },
        { name: "tremolo6", type: 7, speed: 1.0 },
        { name: "decay 1", type: 8, speed: 10.0 },
        { name: "decay 2", type: 8, speed: 7.0 },
        { name: "decay 3", type: 8, speed: 4.0 },
    ]);
    Config.feedbacks = toNameMap([
        { name: "1⟲", indices: [[1], [], [], []] },
        { name: "2⟲", indices: [[], [2], [], []] },
        { name: "3⟲", indices: [[], [], [3], []] },
        { name: "4⟲", indices: [[], [], [], [4]] },
        { name: "1⟲ 2⟲", indices: [[1], [2], [], []] },
        { name: "3⟲ 4⟲", indices: [[], [], [3], [4]] },
        { name: "1⟲ 2⟲ 3⟲", indices: [[1], [2], [3], []] },
        { name: "2⟲ 3⟲ 4⟲", indices: [[], [2], [3], [4]] },
        { name: "1⟲ 2⟲ 3⟲ 4⟲", indices: [[1], [2], [3], [4]] },
        { name: "1→2", indices: [[], [1], [], []] },
        { name: "1→3", indices: [[], [], [1], []] },
        { name: "1→4", indices: [[], [], [], [1]] },
        { name: "2→3", indices: [[], [], [2], []] },
        { name: "2→4", indices: [[], [], [], [2]] },
        { name: "3→4", indices: [[], [], [], [3]] },
        { name: "1→3 2→4", indices: [[], [], [1], [2]] },
        { name: "1→4 2→3", indices: [[], [], [2], [1]] },
        { name: "1→2→3→4", indices: [[], [1], [2], [3]] },
    ]);
    Config.chipNoiseLength = 1 << 15;
    Config.spectrumBasePitch = 24;
    Config.spectrumControlPoints = 30;
    Config.spectrumControlPointsPerOctave = 7;
    Config.spectrumControlPointBits = 3;
    Config.spectrumMax = (1 << Config.spectrumControlPointBits) - 1;
    Config.harmonicsControlPoints = 28;
    Config.harmonicsRendered = 64;
    Config.harmonicsControlPointBits = 3;
    Config.harmonicsMax = (1 << Config.harmonicsControlPointBits) - 1;
    Config.harmonicsWavelength = 1 << 11;
    Config.pulseWidthRange = 8;
    Config.pitchChannelCountMin = 1;
    Config.pitchChannelCountMax = 12;
    Config.noiseChannelCountMin = 0;
    Config.noiseChannelCountMax = 4;
    Config.noiseInterval = 6;
    Config.drumCount = 12;
    Config.pitchOctaves = 7;
    Config.windowOctaves = 3;
    Config.scrollableOctaves = Config.pitchOctaves - Config.windowOctaves;
    Config.windowPitchCount = Config.windowOctaves * 12 + 1;
    Config.maxPitch = Config.pitchOctaves * 12;
    Config.maximumTonesPerChannel = 8;
    Config.sineWaveLength = 1 << 8;
    Config.sineWaveMask = Config.sineWaveLength - 1;
    Config.sineWave = generateSineWave();
    beepbox.Config = Config;
    function centerWave(wave) {
        let sum = 0.0;
        for (let i = 0; i < wave.length; i++) {
            sum += wave[i];
        }
        const average = sum / wave.length;
        let cumulative = 0;
        let wavePrev = 0;
        for (let i = 0; i < wave.length; i++) {
            cumulative += wavePrev;
            wavePrev = wave[i] - average;
            wave[i] = cumulative;
        }
        wave.push(0);
        return new Float64Array(wave);
    }
    function getDrumWave(index) {
        let wave = Config.chipNoises[index].samples;
        if (wave == null) {
            wave = new Float32Array(Config.chipNoiseLength + 1);
            Config.chipNoises[index].samples = wave;
            if (index == 0) {
                let drumBuffer = 1;
                for (let i = 0; i < Config.chipNoiseLength; i++) {
                    wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                    let newBuffer = drumBuffer >> 1;
                    if (((drumBuffer + newBuffer) & 1) == 1) {
                        newBuffer += 1 << 14;
                    }
                    drumBuffer = newBuffer;
                }
            }
            else if (index == 1) {
                for (let i = 0; i < Config.chipNoiseLength; i++) {
                    wave[i] = Math.random() * 2.0 - 1.0;
                }
            }
            else if (index == 2) {
                let drumBuffer = 1;
                for (let i = 0; i < Config.chipNoiseLength; i++) {
                    wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                    let newBuffer = drumBuffer >> 1;
                    if (((drumBuffer + newBuffer) & 1) == 1) {
                        newBuffer += 2 << 14;
                    }
                    drumBuffer = newBuffer;
                }
            }
            else if (index == 3) {
                let drumBuffer = 1;
                for (let i = 0; i < Config.chipNoiseLength; i++) {
                    wave[i] = (drumBuffer & 1) * 2.0 - 1.0;
                    let newBuffer = drumBuffer >> 1;
                    if (((drumBuffer + newBuffer) & 1) == 1) {
                        newBuffer += 10 << 2;
                    }
                    drumBuffer = newBuffer;
                }
            }
            else if (index == 4) {
                drawNoiseSpectrum(wave, 10, 11, 1, 1, 0);
                drawNoiseSpectrum(wave, 11, 14, .6578, .6578, 0);
                beepbox.inverseRealFourierTransform(wave, Config.chipNoiseLength);
                beepbox.scaleElementsByFactor(wave, 1.0 / Math.sqrt(Config.chipNoiseLength));
            }
            else {
                throw new Error("Unrecognized drum index: " + index);
            }
            wave[Config.chipNoiseLength] = wave[0];
        }
        return wave;
    }
    beepbox.getDrumWave = getDrumWave;
    function drawNoiseSpectrum(wave, lowOctave, highOctave, lowPower, highPower, overallSlope) {
        const referenceOctave = 11;
        const referenceIndex = 1 << referenceOctave;
        const lowIndex = Math.pow(2, lowOctave) | 0;
        const highIndex = Math.min(Config.chipNoiseLength >> 1, Math.pow(2, highOctave) | 0);
        const retroWave = getDrumWave(0);
        let combinedAmplitude = 0.0;
        for (let i = lowIndex; i < highIndex; i++) {
            let lerped = lowPower + (highPower - lowPower) * (Math.log(i) / Math.LN2 - lowOctave) / (highOctave - lowOctave);
            let amplitude = Math.pow(2, (lerped - 1) * Config.spectrumMax + 1) * lerped;
            amplitude *= Math.pow(i / referenceIndex, overallSlope);
            combinedAmplitude += amplitude;
            amplitude *= retroWave[i];
            const radians = 0.61803398875 * i * i * Math.PI * 2.0;
            wave[i] = Math.cos(radians) * amplitude;
            wave[Config.chipNoiseLength - i] = Math.sin(radians) * amplitude;
        }
        return combinedAmplitude;
    }
    beepbox.drawNoiseSpectrum = drawNoiseSpectrum;
    function generateSineWave() {
        const wave = new Float64Array(Config.sineWaveLength + 1);
        for (let i = 0; i < Config.sineWaveLength + 1; i++) {
            wave[i] = Math.sin(i * Math.PI * 2.0 / Config.sineWaveLength);
        }
        return wave;
    }
    function toNameMap(array) {
        const dictionary = {};
        for (let i = 0; i < array.length; i++) {
            const value = array[i];
            value.index = i;
            dictionary[value.name] = value;
        }
        const result = array;
        result.dictionary = dictionary;
        return result;
    }
    beepbox.toNameMap = toNameMap;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class ColorConfig {
        static getChannelColor(song, channel) {
            return channel < song.pitchChannelCount
                ? ColorConfig.pitchColors[channel % ColorConfig.pitchColors.length]
                : ColorConfig.noiseColors[(channel - song.pitchChannelCount) % ColorConfig.noiseColors.length];
        }
    }
    ColorConfig.pitchColors = beepbox.toNameMap([
        { name: "", channelDim: "#0099a1", channelBright: "#25f3ff", noteDim: "#0099a1", noteBright: "#25f3ff" },
        { name: "", channelDim: "#439143", channelBright: "#44ff44", noteDim: "#439143", noteBright: "#44ff44" },
        { name: "", channelDim: "#a1a100", channelBright: "#ffff25", noteDim: "#a1a100", noteBright: "#ffff25" },
        { name: "", channelDim: "#c75000", channelBright: "#ff9752", noteDim: "#c75000", noteBright: "#ff9752" },
        { name: "", channelDim: "#d020d0", channelBright: "#ff90ff", noteDim: "#d020d0", noteBright: "#ff90ff" },
        { name: "", channelDim: "#552377", channelBright: "#9f31ea", noteDim: "#552377", noteBright: "#9f31ea" },
	{ name: "", channelDim: "#221b89", channelBright: "#2b6aff", noteDim: "#221b89", noteBright: "#2b6aff" },
	{ name: "", channelDim: "#00995f", channelBright: "#00ff9f", noteDim: "#00995f", noteBright: "#00ff9f" },
	{ name: "", channelDim: "#d6b03e", channelBright: "#ffbf00", noteDim: "#d6b03e", noteBright: "#ffbf00" },
	{ name: "", channelDim: "#b25915", channelBright: "#d85d00", noteDim: "#b25915", noteBright: "#d85d00" },
	{ name: "", channelDim: "#891a60", channelBright: "#ff00a1", noteDim: "#891a60", noteBright: "#ff00a1" },
	{ name: "", channelDim: "#965cbc", channelBright: "#c26afc", noteDim: "#965cbc", noteBright: "#c26afc" },
    ]);
    ColorConfig.noiseColors = beepbox.toNameMap([
        { name: "", channelDim: "#991010", channelBright: "#ff1616", noteDim: "#991010", noteBright: "#ff1616" },
        { name: "", channelDim: "#aaaaaa", channelBright: "#ffffff", noteDim: "#aaaaaa", noteBright: "#ffffff" },
        { name: "", channelDim: "#5869BD", channelBright: "#768dfc", noteDim: "#5869BD", noteBright: "#768dfc" },
	{ name: "", channelDim: "#7c9b42", channelBright: "#a5ff00", noteDim: "#7c9b42", noteBright: "#a5ff00" },
    ]);
    beepbox.ColorConfig = ColorConfig;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    beepbox.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|android|ipad|playbook|silk/i.test(navigator.userAgent);
    class EditorConfig {
        static valueToPreset(presetValue) {
            const categoryIndex = presetValue >> 6;
            const presetIndex = presetValue & 0x3F;
            return EditorConfig.presetCategories[categoryIndex].presets[presetIndex];
        }
        static midiProgramToPresetValue(program) {
            for (let categoryIndex = 0; categoryIndex < EditorConfig.presetCategories.length; categoryIndex++) {
                const category = EditorConfig.presetCategories[categoryIndex];
                for (let presetIndex = 0; presetIndex < category.presets.length; presetIndex++) {
                    const preset = category.presets[presetIndex];
                    if (preset.generalMidi && preset.midiProgram == program)
                        return (categoryIndex << 6) + presetIndex;
                }
            }
            return null;
        }
        static nameToPresetValue(presetName) {
            for (let categoryIndex = 0; categoryIndex < EditorConfig.presetCategories.length; categoryIndex++) {
                const category = EditorConfig.presetCategories[categoryIndex];
                for (let presetIndex = 0; presetIndex < category.presets.length; presetIndex++) {
                    const preset = category.presets[presetIndex];
                    if (preset.name == presetName)
                        return (categoryIndex << 6) + presetIndex;
                }
            }
            return null;
        }
    }
    EditorConfig.versionDisplayName = "BeepBox 3.0.5";
    EditorConfig.presetCategories = beepbox.toNameMap([
        { name: "Custom Instruments", presets: beepbox.toNameMap([
                { name: "chip wave", customType: 0 },
                { name: "FM (expert)", customType: 1 },
                { name: "basic noise", customType: 2 },
                { name: "spectrum", customType: 3 },
                { name: "drumset", customType: 4 },
                { name: "harmonics", customType: 5 },
                { name: "pulse width", customType: 6 },
            ]) },
        { name: "Retro Presets", presets: beepbox.toNameMap([
                { name: "square wave", midiProgram: 80, settings: { "type": "chip", "transition": "seamless", "effects": "none", "chord": "arpeggio", "filterCutoffHz": 4000, "filterResonance": 0, "filterEnvelope": "steady", "wave": "square", "interval": "union", "vibrato": "none" } },
                { name: "triangle wave", midiProgram: 71, settings: { "type": "chip", "transition": "seamless", "effects": "none", "chord": "arpeggio", "filterCutoffHz": 4000, "filterResonance": 0, "filterEnvelope": "steady", "wave": "triangle", "interval": "union", "vibrato": "none" } },
                { name: "square lead", midiProgram: 80, generalMidi: true, settings: { "type": "chip", "transition": "hard", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "wave": "square", "interval": "hum", "vibrato": "none" } },
                { name: "sawtooth lead 1", midiProgram: 81, generalMidi: true, settings: { "type": "chip", "transition": "hard", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "wave": "sawtooth", "interval": "shimmer", "vibrato": "none" } },
                { name: "sawtooth lead 2", midiProgram: 81, settings: { "type": "chip", "effects": "reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 29, "filterEnvelope": "steady", "wave": "sawtooth", "interval": "hum", "vibrato": "light" } },
                { name: "chip noise", midiProgram: 116, isNoise: true, settings: { "type": "noise", "transition": "hard", "effects": "none", "chord": "arpeggio", "filterCutoffHz": 4000, "filterResonance": 0, "filterEnvelope": "steady", "wave": "retro" } },
                { name: "FM twang", midiProgram: 32, settings: { "type": "FM", "transition": "hard", "effects": "none", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 15, "envelope": "twang 2" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "FM bass", midiProgram: 36, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "custom interval", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "2Ã—", "amplitude": 11, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 7, "envelope": "twang 2" }, { "frequency": "1Ã—", "amplitude": 9, "envelope": "twang 3" }, { "frequency": "20Ã—", "amplitude": 3, "envelope": "twang 2" }] } },
                { name: "FM flute", midiProgram: 73, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "twang 2" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "FM organ", midiProgram: 16, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "custom interval", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 11, "envelope": "steady" }, { "frequency": "2Ã—", "amplitude": 11, "envelope": "steady" }] } },
            ]) },
        { name: "Keyboard Presets", presets: beepbox.toNameMap([
                { name: "grand piano", midiProgram: 0, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "twang 3", "interval": "shimmer", "vibrato": "none", "harmonics": [100, 100, 86, 86, 86, 71, 71, 71, 0, 57, 57, 57, 57, 57, 57, 57, 57, 0, 57, 57, 57, 57, 57, 57, 57, 57, 14, 43] } },
                { name: "bright piano", midiProgram: 1, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "twang 3", "interval": "shimmer", "vibrato": "none", "harmonics": [100, 100, 86, 86, 71, 71, 0, 71, 71, 71, 71, 71, 71, 0, 57, 57, 57, 57, 57, 57, 0, 43, 43, 43, 43, 43, 43, 43] } },
                { name: "electric grand", midiProgram: 2, generalMidi: true, settings: { "type": "chip", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 3", "wave": "1/8 pulse", "interval": "shimmer", "vibrato": "none" } },
                { name: "honky-tonk piano", midiProgram: 3, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 29, "filterEnvelope": "twang 2", "interval": "honky tonk", "vibrato": "none", "harmonics": [100, 100, 86, 71, 86, 71, 43, 71, 43, 43, 57, 57, 57, 29, 57, 43, 43, 43, 43, 43, 29, 43, 43, 43, 29, 29, 29, 29] } },
                { name: "electric piano 1", midiProgram: 4, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "interval": "union", "vibrato": "none", "harmonics": [86, 100, 100, 71, 71, 57, 57, 43, 43, 43, 29, 29, 29, 14, 14, 14, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0] } },
                { name: "electric piano 2", midiProgram: 5, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 9, "envelope": "steady" }, { "frequency": "16Ã—", "amplitude": 6, "envelope": "twang 3" }] } },
                { name: "harpsichord", midiProgram: 6, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "4âŸ²", "feedbackAmplitude": 9, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 8, "envelope": "steady" }, { "frequency": "3Ã—", "amplitude": 6, "envelope": "steady" }, { "frequency": "5Ã—", "amplitude": 7, "envelope": "steady" }] } },
                { name: "clavinet", midiProgram: 7, generalMidi: true, settings: { "type": "FM", "transition": "hard", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 0, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "3âŸ²", "feedbackAmplitude": 6, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "3Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "~1Ã—", "amplitude": 6, "envelope": "steady" }, { "frequency": "8Ã—", "amplitude": 4, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "dulcimer", midiProgram: 15, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 2", "interval": "shimmer", "vibrato": "none", "harmonics": [100, 100, 100, 86, 100, 86, 57, 100, 100, 86, 100, 86, 100, 86, 100, 71, 57, 71, 71, 100, 86, 71, 86, 86, 100, 86, 86, 86] } },
            ]) },
        { name: "Idiophone Presets", presets: beepbox.toNameMap([
                { name: "celesta", midiProgram: 8, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "(1â€‚2)â†(3â€‚4)", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~1Ã—", "amplitude": 11, "envelope": "custom" }, { "frequency": "8Ã—", "amplitude": 6, "envelope": "custom" }, { "frequency": "20Ã—", "amplitude": 3, "envelope": "twang 1" }, { "frequency": "3Ã—", "amplitude": 1, "envelope": "twang 2" }] } },
                { name: "glockenspiel", midiProgram: 9, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "(1â€‚2â€‚3)â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²â€ƒ3âŸ²", "feedbackAmplitude": 2, "feedbackEnvelope": "decay 1", "operators": [{ "frequency": "1Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "5Ã—", "amplitude": 11, "envelope": "custom" }, { "frequency": "8Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "20Ã—", "amplitude": 2, "envelope": "twang 1" }] } },
                { name: "music box 1", midiProgram: 10, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 2", "interval": "union", "vibrato": "none", "harmonics": [100, 0, 0, 100, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 71, 0] } },
                { name: "music box 2", midiProgram: 10, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 1", "interval": "union", "vibrato": "none", "harmonics": [100, 57, 57, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 14, 14, 14, 14, 14, 14, 43, 14, 14, 14, 14, 14, 14, 14, 14] } },
                { name: "vibraphone", midiProgram: 11, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1â†’2â†’3â†’4", "feedbackAmplitude": 3, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "~1Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "9Ã—", "amplitude": 3, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 9, "envelope": "custom" }] } },
                { name: "marimba", midiProgram: 12, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "decay 1", "vibrato": "none", "algorithm": "1â€ƒ2â†(3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 6, "envelope": "custom" }, { "frequency": "13Ã—", "amplitude": 6, "envelope": "twang 1" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "kalimba", midiProgram: 108, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "decay 1", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 11, "envelope": "custom" }, { "frequency": "5Ã—", "amplitude": 3, "envelope": "twang 2" }, { "frequency": "20Ã—", "amplitude": 3, "envelope": "twang 1" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "xylophone", midiProgram: 13, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "(1â€‚2â€‚3)â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²â€ƒ3âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "6Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "11Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "20Ã—", "amplitude": 6, "envelope": "twang 1" }] } },
                { name: "tubular bell", midiProgram: 14, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 3", "interval": "hum", "vibrato": "none", "harmonics": [43, 71, 0, 100, 0, 100, 0, 86, 0, 0, 86, 0, 14, 71, 14, 14, 57, 14, 14, 43, 14, 14, 43, 14, 14, 43, 14, 14] } },
                { name: "bell synth", midiProgram: 14, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~2Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "7Ã—", "amplitude": 6, "envelope": "twang 3" }, { "frequency": "20Ã—", "amplitude": 1, "envelope": "twang 1" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "rain drop", midiProgram: 96, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "(1â€‚2)â†(3â€‚4)", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "6Ã—", "amplitude": 4, "envelope": "custom" }, { "frequency": "20Ã—", "amplitude": 3, "envelope": "twang 1" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "tremolo1" }] } },
                { name: "crystal", midiProgram: 98, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "delayed", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1âŸ² 2âŸ² 3âŸ² 4âŸ²", "feedbackAmplitude": 4, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "6Ã—", "amplitude": 4, "envelope": "custom" }, { "frequency": "13Ã—", "amplitude": 4, "envelope": "custom" }] } },
                { name: "tinkle bell", midiProgram: 112, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1â†’2â†’3â†’4", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "~2Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "5Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "7Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "16Ã—", "amplitude": 7, "envelope": "custom" }] } },
                { name: "agogo", midiProgram: 113, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "decay 1", "vibrato": "none", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1â†’4", "feedbackAmplitude": 15, "feedbackEnvelope": "decay 1", "operators": [{ "frequency": "2Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "5Ã—", "amplitude": 6, "envelope": "custom" }, { "frequency": "8Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "13Ã—", "amplitude": 11, "envelope": "custom" }] } },
            ]) },
        { name: "Guitar Presets", presets: beepbox.toNameMap([
                { name: "nylon guitar", midiProgram: 24, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1â†2â†3â†4", "feedbackType": "3âŸ²", "feedbackAmplitude": 6, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "steady" }, { "frequency": "5Ã—", "amplitude": 2, "envelope": "steady" }, { "frequency": "7Ã—", "amplitude": 4, "envelope": "steady" }] } },
                { name: "steel guitar", midiProgram: 25, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 2", "interval": "union", "vibrato": "none", "harmonics": [100, 100, 86, 71, 71, 71, 86, 86, 71, 57, 43, 43, 43, 57, 57, 57, 57, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43] } },
                { name: "jazz guitar", midiProgram: 26, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 2", "interval": "union", "vibrato": "none", "harmonics": [100, 100, 86, 71, 57, 71, 71, 43, 57, 71, 57, 43, 29, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0] } },
                { name: "clean guitar", midiProgram: 27, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "interval": "union", "vibrato": "none", "harmonics": [86, 100, 100, 100, 86, 57, 86, 100, 100, 100, 71, 57, 43, 71, 86, 71, 57, 57, 71, 71, 71, 71, 57, 57, 57, 57, 57, 43] } },
                { name: "muted guitar", midiProgram: 28, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 7, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "1Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 4, "envelope": "twang 3" }, { "frequency": "4Ã—", "amplitude": 4, "envelope": "twang 2" }, { "frequency": "16Ã—", "amplitude": 4, "envelope": "twang 1" }] } },
            ]) },
        { name: "Picked Bass Presets", presets: beepbox.toNameMap([
                { name: "acoustic bass", midiProgram: 32, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 1", "interval": "union", "vibrato": "none", "harmonics": [100, 86, 71, 71, 71, 71, 57, 57, 57, 57, 43, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14] } },
                { name: "fingered bass", midiProgram: 33, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 1", "interval": "union", "vibrato": "none", "harmonics": [100, 86, 71, 57, 71, 43, 57, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 0] } },
                { name: "picked bass", midiProgram: 34, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "3âŸ²", "feedbackAmplitude": 4, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 5, "envelope": "steady" }, { "frequency": "11Ã—", "amplitude": 1, "envelope": "twang 3" }, { "frequency": "1Ã—", "amplitude": 9, "envelope": "steady" }] } },
                { name: "fretless bass", midiProgram: 35, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 1000, "filterResonance": 14, "filterEnvelope": "flare 2", "interval": "union", "vibrato": "none", "harmonics": [100, 100, 86, 71, 71, 57, 57, 71, 71, 71, 57, 57, 57, 57, 57, 57, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 29, 14] } },
                { name: "slap bass 1", midiProgram: 36, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 0, "filterEnvelope": "twang 1", "interval": "union", "vibrato": "none", "harmonics": [100, 100, 100, 100, 86, 71, 57, 29, 29, 43, 43, 57, 71, 57, 29, 29, 43, 57, 57, 57, 43, 43, 43, 57, 71, 71, 71, 71] } },
                { name: "slap bass 2", midiProgram: 37, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1â†2â†3â†4", "feedbackType": "3âŸ²", "feedbackAmplitude": 4, "feedbackEnvelope": "steady", "operators": [{ "frequency": "3Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 7, "envelope": "steady" }, { "frequency": "13Ã—", "amplitude": 3, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 11, "envelope": "steady" }] } },
                { name: "bass synth 1", midiProgram: 38, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 43, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "3âŸ²â€ƒ4âŸ²", "feedbackAmplitude": 9, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 14, "envelope": "twang 1" }, { "frequency": "~1Ã—", "amplitude": 13, "envelope": "twang 2" }] } },
                { name: "bass synth 2", midiProgram: 39, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 1000, "filterResonance": 57, "filterEnvelope": "punch", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1â†’2", "feedbackAmplitude": 4, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "1Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 9, "envelope": "steady" }, { "frequency": "3Ã—", "amplitude": 0, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "bass & lead", midiProgram: 87, generalMidi: true, settings: { "type": "chip", "transition": "hard", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 86, "filterEnvelope": "twang 2", "wave": "sawtooth", "interval": "shimmer", "vibrato": "none" } },
            ]) },
        { name: "Picked String Presets", presets: beepbox.toNameMap([
                { name: "pizzicato strings", midiProgram: 45, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 1000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "(1â€‚2â€‚3)â†4", "feedbackType": "1âŸ² 2âŸ² 3âŸ² 4âŸ²", "feedbackAmplitude": 7, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 11, "envelope": "custom" }, { "frequency": "6Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "~1Ã—", "amplitude": 10, "envelope": "steady" }] } },
                { name: "harp", midiProgram: 46, generalMidi: true, settings: { "type": "FM", "transition": "hard fade", "effects": "reverb", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "3âŸ²", "feedbackAmplitude": 6, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 6, "envelope": "custom" }, { "frequency": "~2Ã—", "amplitude": 3, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "steady" }] } },
                { name: "sitar", midiProgram: 104, generalMidi: true, settings: { "type": "FM", "transition": "hard fade", "effects": "reverb", "chord": "strum", "filterCutoffHz": 8000, "filterResonance": 57, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 14, "envelope": "twang 3" }, { "frequency": "9Ã—", "amplitude": 3, "envelope": "twang 3" }, { "frequency": "16Ã—", "amplitude": 9, "envelope": "swell 3" }] } },
                { name: "banjo", midiProgram: 105, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "2âŸ²", "feedbackAmplitude": 4, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "steady" }, { "frequency": "11Ã—", "amplitude": 3, "envelope": "twang 3" }, { "frequency": "1Ã—", "amplitude": 11, "envelope": "steady" }] } },
                { name: "ukulele", midiProgram: 105, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "3âŸ²", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "2Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "steady" }, { "frequency": "9Ã—", "amplitude": 4, "envelope": "twang 2" }, { "frequency": "1Ã—", "amplitude": 11, "envelope": "steady" }] } },
                { name: "shamisen", midiProgram: 106, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 14, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "3âŸ²", "feedbackAmplitude": 9, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 12, "envelope": "steady" }, { "frequency": "16Ã—", "amplitude": 4, "envelope": "twang 3" }, { "frequency": "1Ã—", "amplitude": 7, "envelope": "steady" }] } },
                { name: "koto", midiProgram: 107, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 2", "vibrato": "none", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 2", "operators": [{ "frequency": "~1Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "6Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 8, "envelope": "twang 3" }, { "frequency": "~2Ã—", "amplitude": 8, "envelope": "twang 3" }] } },
            ]) },
        { name: "Distortion Presets", presets: beepbox.toNameMap([
                { name: "overdrive guitar", midiProgram: 29, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1â†’2", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~1Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 12, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 7, "envelope": "twang 3" }, { "frequency": "1Ã—", "amplitude": 4, "envelope": "swell 3" }] } },
                { name: "distortion guitar", midiProgram: 30, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 57, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1â†’2", "feedbackAmplitude": 4, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~1Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 11, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 9, "envelope": "swell 1" }, { "frequency": "~2Ã—", "amplitude": 5, "envelope": "swell 3" }] } },
                { name: "charango synth", midiProgram: 84, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 0, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1â†’2â†’3â†’4", "feedbackAmplitude": 8, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "3Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "~1Ã—", "amplitude": 5, "envelope": "steady" }, { "frequency": "4Ã—", "amplitude": 6, "envelope": "steady" }, { "frequency": "3Ã—", "amplitude": 7, "envelope": "steady" }] } },
                { name: "guitar harmonics", midiProgram: 31, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3)â†4", "feedbackType": "1âŸ²", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "16Ã—", "amplitude": 5, "envelope": "swell 1" }, { "frequency": "1Ã—", "amplitude": 2, "envelope": "punch" }, { "frequency": "~1Ã—", "amplitude": 12, "envelope": "twang 1" }] } },
                { name: "distorted synth 1", midiProgram: 30, settings: { "type": "PWM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "steady", "pulseWidth": 17.6875, "pulseEnvelope": "punch", "vibrato": "none" } },
                { name: "distorted synth 2", midiProgram: 30, settings: { "type": "FM", "effects": "reverb", "transition": "seamless", "chord": "strum", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 7, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 13, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 11, "envelope": "swell 1" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "flare 1" }] } },
                { name: "distorted synth 3", midiProgram: 30, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1â†’2", "feedbackAmplitude": 3, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~1Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 11, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 12, "envelope": "swell 1" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "distorted synth 4", midiProgram: 30, settings: { "type": "PWM", "effects": "reverb", "transition": "hard", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 57, "filterEnvelope": "steady", "pulseWidth": 50, "pulseEnvelope": "swell 1", "vibrato": "delayed" } },
            ]) },
        { name: "Bellows Presets", presets: beepbox.toNameMap([
                { name: "drawbar organ 1", midiProgram: 16, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [86, 86, 0, 86, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "drawbar organ 2", midiProgram: 16, midiSubharmonicOctaves: 1, settings: { "type": "harmonics", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [86, 29, 71, 86, 71, 14, 0, 100, 0, 0, 0, 86, 0, 0, 0, 71, 0, 0, 0, 57, 0, 0, 0, 29, 0, 0, 0, 0] } },
                { name: "percussive organ", midiProgram: 17, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "transition": "hard", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "punch", "vibrato": "light", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1â†’3â€ƒ2â†’4", "feedbackAmplitude": 7, "feedbackEnvelope": "decay 1", "operators": [{ "frequency": "1Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 8, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 8, "envelope": "custom" }] } },
                { name: "rock organ", midiProgram: 18, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "punch", "vibrato": "delayed", "algorithm": "(1â€‚2â€‚3)â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²â€ƒ3âŸ²", "feedbackAmplitude": 2, "feedbackEnvelope": "flare 1", "operators": [{ "frequency": "1Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "6Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 5, "envelope": "steady" }] } },
                { name: "pipe organ", midiProgram: 19, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "transition": "cross fade", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1âŸ² 2âŸ² 3âŸ² 4âŸ²", "feedbackAmplitude": 5, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 8, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "8Ã—", "amplitude": 8, "envelope": "custom" }] } },
                { name: "reed organ", midiProgram: 20, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [71, 86, 100, 86, 71, 100, 57, 71, 71, 71, 43, 43, 43, 71, 43, 71, 57, 57, 57, 57, 57, 57, 57, 29, 43, 29, 29, 14] } },
                { name: "accordion", midiProgram: 21, generalMidi: true, settings: { "type": "chip", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 0, "filterEnvelope": "swell 1", "wave": "double saw", "interval": "honky tonk", "vibrato": "none" } },
                { name: "bandoneon", midiProgram: 23, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 1", "interval": "hum", "vibrato": "none", "harmonics": [86, 86, 86, 57, 71, 86, 57, 71, 71, 71, 57, 43, 57, 43, 71, 43, 71, 57, 57, 43, 43, 43, 57, 43, 43, 29, 29, 29] } },
                { name: "bagpipe", midiProgram: 109, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 43, "filterEnvelope": "punch", "interval": "hum", "vibrato": "none", "harmonics": [71, 86, 86, 100, 100, 86, 57, 100, 86, 71, 71, 71, 57, 57, 57, 71, 57, 71, 57, 71, 43, 57, 57, 43, 43, 43, 43, 43] } },
            ]) },
        { name: "String Presets", presets: beepbox.toNameMap([
                { name: "violin", midiProgram: 40, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "(1â€‚2)â†(3â€‚4)", "feedbackType": "4âŸ²", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "4Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 7, "envelope": "steady" }, { "frequency": "7Ã—", "amplitude": 5, "envelope": "swell 1" }] } },
                { name: "viola", midiProgram: 41, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "(1â€‚2â€‚3)â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²â€ƒ3âŸ²", "feedbackAmplitude": 8, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "2Ã—", "amplitude": 11, "envelope": "custom" }, { "frequency": "7Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "13Ã—", "amplitude": 4, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 5, "envelope": "steady" }] } },
                { name: "cello", midiProgram: 42, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "(1â€‚2â€‚3)â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²â€ƒ3âŸ²", "feedbackAmplitude": 6, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1Ã—", "amplitude": 11, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "8Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "steady" }] } },
                { name: "contrabass", midiProgram: 43, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "(1â€‚2)â†3â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "16Ã—", "amplitude": 5, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "steady" }, { "frequency": "6Ã—", "amplitude": 3, "envelope": "swell 1" }] } },
                { name: "fiddle", midiProgram: 110, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "(1â€‚2)â†(3â€‚4)", "feedbackType": "3âŸ²â€ƒ4âŸ²", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "2Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "8Ã—", "amplitude": 8, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 8, "envelope": "steady" }, { "frequency": "16Ã—", "amplitude": 3, "envelope": "steady" }] } },
                { name: "tremolo strings", midiProgram: 44, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 0, "filterEnvelope": "tremolo4", "vibrato": "none", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1â†’2â†’3â†’4", "feedbackAmplitude": 12, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 8, "envelope": "custom" }, { "frequency": "~2Ã—", "amplitude": 8, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 8, "envelope": "custom" }, { "frequency": "7Ã—", "amplitude": 8, "envelope": "custom" }] } },
                { name: "strings", midiProgram: 48, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "(1â€‚2)â†(3â€‚4)", "feedbackType": "4âŸ²", "feedbackAmplitude": 5, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "4Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 7, "envelope": "steady" }, { "frequency": "7Ã—", "amplitude": 3, "envelope": "swell 1" }] } },
                { name: "slow strings", midiProgram: 49, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 0, "filterEnvelope": "swell 2", "vibrato": "none", "algorithm": "(1â€‚2)â†(3â€‚4)", "feedbackType": "4âŸ²", "feedbackAmplitude": 6, "feedbackEnvelope": "flare 3", "operators": [{ "frequency": "4Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 7, "envelope": "steady" }, { "frequency": "7Ã—", "amplitude": 4, "envelope": "swell 1" }] } },
                { name: "strings synth 1", midiProgram: 50, generalMidi: true, settings: { "type": "chip", "volume": 60, "transition": "soft fade", "effects": "chorus & reverb", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 43, "filterEnvelope": "steady", "wave": "sawtooth", "interval": "hum", "vibrato": "delayed" } },
                { name: "strings synth 2", midiProgram: 51, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1âŸ² 2âŸ² 3âŸ² 4âŸ²", "feedbackAmplitude": 12, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "3Ã—", "amplitude": 6, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 8, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 9, "envelope": "custom" }] } },
                { name: "orchestra hit", midiProgram: 55, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "decay 1", "vibrato": "delayed", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1âŸ² 2âŸ² 3âŸ² 4âŸ²", "feedbackAmplitude": 14, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 14, "envelope": "custom" }] } },
            ]) },
        { name: "Vocal Presets", presets: beepbox.toNameMap([
                { name: "choir soprano", midiProgram: 94, generalMidi: true, settings: { "type": "harmonics", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 57, "filterEnvelope": "steady", "interval": "union", "vibrato": "shaky", "harmonics": [86, 100, 86, 43, 14, 14, 57, 71, 57, 14, 14, 14, 14, 14, 43, 57, 43, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0] } },
                { name: "choir tenor", midiProgram: 52, generalMidi: true, settings: { "type": "harmonics", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 86, "filterEnvelope": "steady", "interval": "union", "vibrato": "shaky", "harmonics": [86, 100, 100, 86, 71, 57, 29, 14, 14, 14, 29, 43, 43, 43, 29, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "choir bass", midiProgram: 52, settings: { "type": "harmonics", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 86, "filterEnvelope": "steady", "interval": "union", "vibrato": "shaky", "harmonics": [71, 86, 86, 100, 86, 100, 57, 43, 14, 14, 14, 14, 29, 29, 43, 43, 43, 43, 43, 29, 29, 29, 29, 14, 14, 14, 0, 0] } },
                { name: "solo soprano", midiProgram: 85, settings: { "type": "harmonics", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 71, "filterEnvelope": "steady", "interval": "union", "vibrato": "shaky", "harmonics": [86, 100, 86, 43, 14, 14, 57, 71, 57, 14, 14, 14, 14, 14, 43, 57, 43, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0] } },
                { name: "solo tenor", midiProgram: 85, settings: { "type": "harmonics", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 86, "filterEnvelope": "steady", "interval": "union", "vibrato": "shaky", "harmonics": [86, 100, 100, 86, 71, 57, 29, 14, 14, 14, 29, 43, 43, 43, 29, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "solo bass", midiProgram: 85, settings: { "type": "harmonics", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 86, "filterEnvelope": "steady", "interval": "union", "vibrato": "shaky", "harmonics": [71, 86, 86, 100, 86, 100, 57, 43, 14, 14, 14, 14, 29, 29, 43, 43, 43, 43, 43, 29, 29, 29, 29, 14, 14, 14, 0, 0] } },
                { name: "voice ooh", midiProgram: 53, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 57, "filterEnvelope": "steady", "interval": "union", "vibrato": "shaky", "harmonics": [100, 57, 43, 43, 14, 14, 0, 0, 0, 14, 29, 29, 14, 0, 14, 29, 29, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "voice synth", midiProgram: 54, generalMidi: true, settings: { "type": "chip", "transition": "medium fade", "effects": "chorus & reverb", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 57, "filterEnvelope": "steady", "wave": "rounded", "interval": "union", "vibrato": "light" } },
                { name: "vox synth lead", midiProgram: 85, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "light", "algorithm": "(1â€‚2â€‚3)â†4", "feedbackType": "1â†’2â†’3â†’4", "feedbackAmplitude": 2, "feedbackEnvelope": "punch", "operators": [{ "frequency": "2Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "9Ã—", "amplitude": 5, "envelope": "custom" }, { "frequency": "20Ã—", "amplitude": 1, "envelope": "custom" }, { "frequency": "~1Ã—", "amplitude": 4, "envelope": "steady" }] } },
                { name: "tiny robot", midiProgram: 85, settings: { "type": "FM", "transition": "slide", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 2, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "2Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 7, "envelope": "punch" }, { "frequency": "~1Ã—", "amplitude": 7, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "yowie", midiProgram: 85, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 86, "filterEnvelope": "tremolo5", "vibrato": "none", "algorithm": "1â†2â†(3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 12, "feedbackEnvelope": "tremolo3", "operators": [{ "frequency": "2Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "16Ã—", "amplitude": 5, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 5, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "mouse", midiProgram: 85, settings: { "type": "FM", "effects": "reverb", "transition": "slide", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "light", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 5, "feedbackEnvelope": "flare 2", "operators": [{ "frequency": "2Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "5Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "gumdrop", midiProgram: 85, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "(1â€‚2â€‚3)â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²â€ƒ3âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "2Ã—", "amplitude": 15, "envelope": "punch" }, { "frequency": "4Ã—", "amplitude": 15, "envelope": "punch" }, { "frequency": "7Ã—", "amplitude": 15, "envelope": "punch" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "twang 1" }] } },
                { name: "echo drop", midiProgram: 102, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "punch", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~2Ã—", "amplitude": 11, "envelope": "custom" }, { "frequency": "~1Ã—", "amplitude": 5, "envelope": "steady" }, { "frequency": "11Ã—", "amplitude": 2, "envelope": "steady" }, { "frequency": "16Ã—", "amplitude": 5, "envelope": "swell 3" }] } },
                { name: "dark choir", midiProgram: 85, settings: { "type": "spectrum", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 1", "spectrum": [43, 14, 14, 14, 14, 14, 14, 100, 14, 14, 14, 57, 14, 14, 100, 14, 43, 14, 43, 14, 14, 43, 14, 29, 14, 29, 14, 14, 29, 0] } },
            ]) },
        { name: "Brass Presets", presets: beepbox.toNameMap([
                { name: "trumpet", midiProgram: 56, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 9, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 8, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 5, "envelope": "flare 2" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "trombone", midiProgram: 57, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "2âŸ²", "feedbackAmplitude": 7, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 8, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "tuba", midiProgram: 58, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "2âŸ²", "feedbackAmplitude": 8, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "muted trumpet", midiProgram: 59, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "swell 1", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 5, "feedbackEnvelope": "flare 2", "operators": [{ "frequency": "1Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 5, "envelope": "steady" }, { "frequency": "9Ã—", "amplitude": 5, "envelope": "steady" }, { "frequency": "13Ã—", "amplitude": 9, "envelope": "swell 1" }] } },
                { name: "french horn", midiProgram: 60, generalMidi: true, settings: { "type": "FM", "transition": "soft", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 3, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "swell 1" }, { "frequency": "~1Ã—", "amplitude": 8, "envelope": "flare 2" }] } },
                { name: "brass section", midiProgram: 61, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "punch", "vibrato": "none", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 6, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "swell 1" }, { "frequency": "~1Ã—", "amplitude": 10, "envelope": "swell 1" }] } },
                { name: "brass synth 1", midiProgram: 62, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 11, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 12, "envelope": "flare 1" }, { "frequency": "~1Ã—", "amplitude": 8, "envelope": "flare 2" }] } },
                { name: "brass synth 2", midiProgram: 63, generalMidi: true, settings: { "type": "FM", "transition": "soft", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 43, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 9, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "flare 1" }, { "frequency": "~1Ã—", "amplitude": 7, "envelope": "flare 1" }] } },
                { name: "pulse brass", midiProgram: 62, settings: { "type": "PWM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 1", "pulseWidth": 50, "pulseEnvelope": "flare 3", "vibrato": "none" } },
            ]) },
        { name: "Reed Presets", presets: beepbox.toNameMap([
                { name: "soprano sax", midiProgram: 64, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†2â†3â†4", "feedbackType": "4âŸ²", "feedbackAmplitude": 5, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "1Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 4, "envelope": "swell 1" }, { "frequency": "1Ã—", "amplitude": 7, "envelope": "steady" }, { "frequency": "5Ã—", "amplitude": 4, "envelope": "punch" }] } },
                { name: "alto sax", midiProgram: 65, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 4, "feedbackEnvelope": "punch", "operators": [{ "frequency": "1Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "steady" }, { "frequency": "4Ã—", "amplitude": 6, "envelope": "swell 1" }, { "frequency": "1Ã—", "amplitude": 12, "envelope": "steady" }] } },
                { name: "tenor sax", midiProgram: 66, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†2â†3â†4", "feedbackType": "1âŸ²", "feedbackAmplitude": 6, "feedbackEnvelope": "swell 1", "operators": [{ "frequency": "2Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 7, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 3, "envelope": "steady" }, { "frequency": "8Ã—", "amplitude": 3, "envelope": "steady" }] } },
                { name: "baritone sax", midiProgram: 67, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 2, "feedbackEnvelope": "swell 2", "operators": [{ "frequency": "1Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "8Ã—", "amplitude": 4, "envelope": "steady" }, { "frequency": "4Ã—", "amplitude": 5, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 4, "envelope": "punch" }] } },
                { name: "sax synth", midiProgram: 64, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "light", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 4, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 15, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "shehnai", midiProgram: 111, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "light", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 3, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 8, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "oboe", midiProgram: 68, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "swell 1", "vibrato": "none", "algorithm": "1â€ƒ2â†(3â€‚4)", "feedbackType": "2âŸ²", "feedbackAmplitude": 2, "feedbackEnvelope": "tremolo5", "operators": [{ "frequency": "1Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "steady" }, { "frequency": "6Ã—", "amplitude": 2, "envelope": "steady" }] } },
                { name: "english horn", midiProgram: 69, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â€ƒ2â†(3â€‚4)", "feedbackType": "2âŸ²", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "4Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 8, "envelope": "punch" }, { "frequency": "8Ã—", "amplitude": 4, "envelope": "steady" }] } },
                { name: "bassoon", midiProgram: 70, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 707, "filterResonance": 57, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "2Ã—", "amplitude": 11, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "steady" }, { "frequency": "6Ã—", "amplitude": 6, "envelope": "swell 1" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "clarinet", midiProgram: 71, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [100, 43, 86, 57, 86, 71, 86, 71, 71, 71, 71, 71, 71, 43, 71, 71, 57, 57, 57, 57, 57, 57, 43, 43, 43, 29, 14, 0] } },
                { name: "harmonica", midiProgram: 22, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 29, "filterEnvelope": "swell 1", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 9, "feedbackEnvelope": "tremolo5", "operators": [{ "frequency": "2Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 15, "envelope": "steady" }, { "frequency": "~2Ã—", "amplitude": 2, "envelope": "twang 3" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
            ]) },
        { name: "Flute Presets", presets: beepbox.toNameMap([
                { name: "flute", midiProgram: 73, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "4âŸ²", "feedbackAmplitude": 7, "feedbackEnvelope": "decay 2", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 4, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 3, "envelope": "steady" }, { "frequency": "~1Ã—", "amplitude": 1, "envelope": "punch" }] } },
                { name: "recorder", midiProgram: 74, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "swell 2", "interval": "union", "vibrato": "none", "harmonics": [100, 43, 57, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0] } },
                { name: "whistle", midiProgram: 78, generalMidi: true, settings: { "type": "harmonics", "effects": "chorus & reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 43, "filterEnvelope": "steady", "interval": "union", "vibrato": "delayed", "harmonics": [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "ocarina", midiProgram: 79, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "steady", "interval": "union", "vibrato": "none", "harmonics": [100, 14, 57, 14, 29, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "piccolo", midiProgram: 72, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 43, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "4âŸ²", "feedbackAmplitude": 15, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "~2Ã—", "amplitude": 3, "envelope": "punch" }, { "frequency": "~1Ã—", "amplitude": 5, "envelope": "punch" }] } },
                { name: "shakuhachi", midiProgram: 77, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "steady", "vibrato": "delayed", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "3â†’4", "feedbackAmplitude": 15, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 3, "envelope": "punch" }, { "frequency": "~1Ã—", "amplitude": 4, "envelope": "twang 1" }, { "frequency": "20Ã—", "amplitude": 15, "envelope": "steady" }] } },
                { name: "pan flute", midiProgram: 75, generalMidi: true, settings: { "type": "spectrum", "effects": "reverb", "transition": "soft", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 43, "filterEnvelope": "steady", "spectrum": [100, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 71, 0, 0, 14, 0, 57, 0, 29, 14, 29, 14, 14, 29, 14, 29, 14, 14, 29, 14] } },
                { name: "blown bottle", midiProgram: 76, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 57, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1âŸ² 2âŸ² 3âŸ² 4âŸ²", "feedbackAmplitude": 7, "feedbackEnvelope": "twang 1", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 4, "envelope": "custom" }, { "frequency": "6Ã—", "amplitude": 2, "envelope": "custom" }, { "frequency": "11Ã—", "amplitude": 2, "envelope": "custom" }] } },
                { name: "calliope", midiProgram: 82, generalMidi: true, settings: { "type": "spectrum", "transition": "cross fade", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "steady", "spectrum": [100, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 71, 0, 0, 57, 0, 43, 0, 29, 14, 14, 29, 14, 14, 14, 14, 14, 14, 14, 14] } },
                { name: "chiffer", midiProgram: 83, generalMidi: true, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "punch", "spectrum": [86, 0, 0, 0, 0, 0, 0, 71, 0, 0, 0, 71, 0, 0, 57, 0, 57, 0, 43, 14, 14, 43, 14, 29, 14, 29, 29, 29, 29, 14] } },
                { name: "breath noise", midiProgram: 121, generalMidi: true, settings: { "type": "spectrum", "effects": "reverb", "transition": "cross fade", "chord": "strum", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 1", "spectrum": [71, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 71, 0, 0, 29, 0, 100, 29, 14, 29, 100, 29, 100, 14, 14, 71, 0, 29, 0, 0] } },
            ]) },
        { name: "Pad Presets", presets: beepbox.toNameMap([
                { name: "new age pad", midiProgram: 88, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 43, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 3, "feedbackEnvelope": "swell 3", "operators": [{ "frequency": "2Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "~1Ã—", "amplitude": 4, "envelope": "swell 2" }, { "frequency": "6Ã—", "amplitude": 3, "envelope": "twang 3" }, { "frequency": "13Ã—", "amplitude": 3, "envelope": "steady" }] } },
                { name: "warm pad", midiProgram: 89, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "swell 3", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 7, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 6, "envelope": "swell 1" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "polysynth pad", midiProgram: 90, generalMidi: true, settings: { "type": "chip", "transition": "hard fade", "effects": "chorus & reverb", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "twang 3", "wave": "sawtooth", "interval": "hum", "vibrato": "delayed" } },
                { name: "space voice pad", midiProgram: 91, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 71, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "(1â€‚2â€‚3)â†4", "feedbackType": "1âŸ² 2âŸ² 3âŸ² 4âŸ²", "feedbackAmplitude": 5, "feedbackEnvelope": "swell 2", "operators": [{ "frequency": "1Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 8, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "11Ã—", "amplitude": 1, "envelope": "punch" }] } },
                { name: "bowed glass pad", midiProgram: 92, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "3Ã—", "amplitude": 7, "envelope": "twang 3" }, { "frequency": "7Ã—", "amplitude": 4, "envelope": "flare 3" }] } },
                { name: "metallic pad", midiProgram: 93, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "1â†3â€ƒ2â†4", "feedbackType": "1âŸ²â€ƒ2âŸ²", "feedbackAmplitude": 13, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "~1Ã—", "amplitude": 9, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 7, "envelope": "swell 2" }, { "frequency": "11Ã—", "amplitude": 7, "envelope": "steady" }] } },
                { name: "sweep pad", midiProgram: 95, generalMidi: true, settings: { "type": "chip", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 86, "filterEnvelope": "flare 3", "wave": "sawtooth", "interval": "hum", "vibrato": "none" } },
                { name: "atmosphere", midiProgram: 99, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "3âŸ²â€ƒ4âŸ²", "feedbackAmplitude": 3, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "swell 3" }, { "frequency": "3Ã—", "amplitude": 7, "envelope": "twang 2" }, { "frequency": "1Ã—", "amplitude": 7, "envelope": "twang 3" }] } },
                { name: "brightness", midiProgram: 100, generalMidi: true, settings: { "type": "harmonics", "effects": "chorus & reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 3", "interval": "octave", "vibrato": "none", "harmonics": [100, 86, 86, 86, 43, 57, 43, 71, 43, 43, 43, 57, 43, 43, 57, 71, 57, 43, 29, 43, 57, 57, 43, 29, 29, 29, 29, 14] } },
                { name: "goblins", midiProgram: 101, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 1414, "filterResonance": 14, "filterEnvelope": "swell 2", "vibrato": "none", "algorithm": "1â†2â†3â†4", "feedbackType": "1âŸ²", "feedbackAmplitude": 10, "feedbackEnvelope": "flare 3", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 5, "envelope": "swell 3" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "tremolo1" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "sci-fi", midiProgram: 103, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "medium fade", "chord": "harmony", "filterCutoffHz": 5657, "filterResonance": 14, "filterEnvelope": "twang 3", "vibrato": "none", "algorithm": "(1â€‚2)â†3â†4", "feedbackType": "1âŸ² 2âŸ² 3âŸ² 4âŸ²", "feedbackAmplitude": 8, "feedbackEnvelope": "twang 3", "operators": [{ "frequency": "~1Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 10, "envelope": "custom" }, { "frequency": "5Ã—", "amplitude": 5, "envelope": "twang 3" }, { "frequency": "11Ã—", "amplitude": 8, "envelope": "tremolo5" }] } },
                { name: "flutter pad", midiProgram: 90, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 86, "filterEnvelope": "twang 3", "vibrato": "delayed", "algorithm": "(1â€‚2)â†(3â€‚4)", "feedbackType": "1âŸ²â€ƒ2âŸ²â€ƒ3âŸ²", "feedbackAmplitude": 9, "feedbackEnvelope": "steady", "operators": [{ "frequency": "1Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "5Ã—", "amplitude": 7, "envelope": "custom" }, { "frequency": "7Ã—", "amplitude": 5, "envelope": "tremolo1" }, { "frequency": "~1Ã—", "amplitude": 6, "envelope": "punch" }] } },
                { name: "feedback pad", midiProgram: 89, settings: { "type": "FM", "effects": "reverb", "transition": "soft fade", "chord": "custom interval", "filterCutoffHz": 8000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â€ƒ2â€ƒ3â€ƒ4", "feedbackType": "1âŸ² 2âŸ² 3âŸ² 4âŸ²", "feedbackAmplitude": 7, "feedbackEnvelope": "swell 2", "operators": [{ "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "~1Ã—", "amplitude": 15, "envelope": "custom" }] } },
            ]) },
        { name: "Drum Presets", presets: beepbox.toNameMap([
                { name: "standard drumset", midiProgram: 116, isNoise: true, settings: { "type": "drumset", "effects": "reverb", "drums": [{ "filterEnvelope": "twang 1", "spectrum": [57, 71, 71, 86, 86, 86, 71, 71, 71, 71, 57, 57, 57, 57, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29] }, { "filterEnvelope": "twang 1", "spectrum": [0, 0, 0, 100, 71, 71, 57, 86, 57, 57, 57, 71, 43, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43] }, { "filterEnvelope": "twang 1", "spectrum": [0, 0, 0, 0, 100, 57, 43, 43, 29, 57, 43, 29, 71, 43, 43, 43, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 43, 43, 43] }, { "filterEnvelope": "twang 1", "spectrum": [0, 0, 0, 0, 0, 71, 57, 43, 43, 43, 57, 57, 43, 29, 57, 43, 43, 43, 29, 43, 57, 43, 43, 43, 43, 43, 43, 29, 43, 43] }, { "filterEnvelope": "decay 2", "spectrum": [0, 14, 29, 43, 86, 71, 29, 43, 43, 43, 43, 29, 71, 29, 71, 29, 43, 43, 43, 43, 57, 43, 43, 57, 43, 43, 43, 57, 57, 57] }, { "filterEnvelope": "decay 1", "spectrum": [0, 0, 14, 14, 14, 14, 29, 29, 29, 43, 43, 43, 57, 57, 57, 71, 71, 71, 71, 71, 71, 71, 71, 57, 57, 57, 57, 43, 43, 43] }, { "filterEnvelope": "twang 3", "spectrum": [43, 43, 43, 71, 29, 29, 43, 43, 43, 29, 43, 43, 43, 29, 29, 43, 43, 29, 29, 29, 57, 14, 57, 43, 43, 57, 43, 43, 57, 57] }, { "filterEnvelope": "decay 3", "spectrum": [29, 43, 43, 43, 43, 29, 29, 43, 29, 29, 43, 29, 14, 29, 43, 29, 43, 29, 57, 29, 43, 57, 43, 71, 43, 71, 57, 57, 71, 71] }, { "filterEnvelope": "twang 3", "spectrum": [43, 29, 29, 43, 29, 29, 29, 57, 29, 29, 29, 57, 43, 43, 29, 29, 57, 43, 43, 43, 71, 43, 43, 71, 57, 71, 71, 71, 71, 71] }, { "filterEnvelope": "decay 3", "spectrum": [57, 57, 57, 43, 57, 57, 43, 43, 57, 43, 43, 43, 71, 57, 43, 57, 86, 71, 57, 86, 71, 57, 86, 100, 71, 86, 86, 86, 86, 86] }, { "filterEnvelope": "flare 1", "spectrum": [0, 0, 14, 14, 14, 14, 29, 29, 29, 43, 43, 43, 57, 57, 71, 71, 86, 86, 100, 100, 100, 100, 100, 100, 100, 100, 86, 57, 29, 0] }, { "filterEnvelope": "decay 2", "spectrum": [14, 14, 14, 14, 29, 14, 14, 29, 14, 43, 14, 43, 57, 86, 57, 57, 100, 57, 43, 43, 57, 100, 57, 43, 29, 14, 0, 0, 0, 0] }] } },
                { name: "steel pan", midiProgram: 114, generalMidi: true, settings: { "type": "FM", "effects": "chorus & reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "decay 2", "vibrato": "none", "algorithm": "1â†(2â€‚3â†4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "~1Ã—", "amplitude": 14, "envelope": "custom" }, { "frequency": "7Ã—", "amplitude": 3, "envelope": "flare 1" }, { "frequency": "3Ã—", "amplitude": 5, "envelope": "flare 2" }, { "frequency": "4Ã—", "amplitude": 4, "envelope": "swell 2" }] } },
                { name: "steel pan synth", midiProgram: 114, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "twang 1", "vibrato": "none", "algorithm": "1â€ƒ2â€ƒ3â†4", "feedbackType": "1âŸ²", "feedbackAmplitude": 5, "feedbackEnvelope": "flare 1", "operators": [{ "frequency": "~1Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "2Ã—", "amplitude": 15, "envelope": "custom" }, { "frequency": "4Ã—", "amplitude": 14, "envelope": "flare 1" }, { "frequency": "~1Ã—", "amplitude": 3, "envelope": "flare 2" }] } },
                { name: "timpani", midiProgram: 47, generalMidi: true, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "twang 2", "spectrum": [100, 0, 0, 0, 86, 0, 0, 71, 0, 14, 43, 14, 43, 43, 0, 29, 43, 29, 29, 29, 43, 29, 43, 29, 43, 43, 43, 43, 43, 43] } },
                { name: "dark strike", midiProgram: 47, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 29, "filterEnvelope": "twang 2", "spectrum": [0, 0, 0, 0, 14, 14, 14, 29, 29, 43, 43, 86, 43, 43, 43, 29, 86, 29, 29, 29, 86, 29, 14, 14, 14, 14, 0, 0, 0, 0] } },
                { name: "woodblock", midiProgram: 115, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -2.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 14, "filterEnvelope": "twang 1", "spectrum": [0, 14, 29, 43, 43, 57, 86, 86, 71, 57, 57, 43, 43, 57, 86, 86, 43, 43, 71, 57, 57, 57, 57, 57, 86, 86, 71, 71, 71, 71] } },
                { name: "taiko drum", midiProgram: 116, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -0.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 29, "filterEnvelope": "twang 1", "spectrum": [71, 100, 100, 43, 43, 71, 71, 43, 43, 43, 43, 43, 43, 57, 29, 57, 43, 57, 43, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43] } },
                { name: "melodic drum", midiProgram: 117, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -1.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 43, "filterEnvelope": "twang 1", "spectrum": [100, 71, 71, 57, 57, 43, 43, 71, 43, 43, 43, 57, 43, 43, 57, 43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29] } },
                { name: "drum synth", midiProgram: 118, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -2, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 43, "filterEnvelope": "decay 1", "spectrum": [100, 86, 71, 57, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29] } },
                { name: "tom-tom", midiProgram: 116, isNoise: true, midiSubharmonicOctaves: -1, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "twang 1", "spectrum": [100, 29, 14, 0, 0, 86, 14, 43, 29, 86, 29, 14, 29, 57, 43, 43, 43, 43, 57, 43, 43, 43, 29, 57, 43, 43, 43, 43, 43, 43] } },
                { name: "metal pipe", midiProgram: 117, isNoise: true, midiSubharmonicOctaves: -1.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 8000, "filterResonance": 14, "filterEnvelope": "twang 2", "spectrum": [29, 43, 86, 43, 43, 43, 43, 43, 100, 29, 14, 14, 100, 14, 14, 0, 0, 0, 0, 0, 14, 29, 29, 14, 0, 0, 14, 29, 0, 0] } },
            ]) },
        { name: "Novelty Presets", presets: beepbox.toNameMap([
                { name: "guitar fret noise", midiProgram: 120, generalMidi: true, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard", "chord": "harmony", "filterCutoffHz": 8000, "filterResonance": 86, "filterEnvelope": "flare 1", "spectrum": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 29, 14, 0, 0, 43, 0, 43, 0, 71, 43, 0, 57, 0] } },
                { name: "fifth saw lead", midiProgram: 86, generalMidi: true, midiSubharmonicOctaves: 1, settings: { "type": "chip", "effects": "chorus & reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 57, "filterEnvelope": "twang 3", "wave": "sawtooth", "interval": "fifth", "vibrato": "none" } },
                { name: "fifth swell", midiProgram: 86, midiSubharmonicOctaves: 1, settings: { "type": "chip", "effects": "chorus & reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 57, "filterEnvelope": "swell 3", "wave": "sawtooth", "interval": "fifth", "vibrato": "none" } },
                { name: "soundtrack", midiProgram: 97, generalMidi: true, settings: { "type": "chip", "effects": "chorus & reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "flare 3", "wave": "sawtooth", "interval": "fifth", "vibrato": "none" } },
                { name: "reverse cymbal", midiProgram: 119, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -3, settings: { "type": "spectrum", "effects": "none", "transition": "soft", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "swell 3", "spectrum": [29, 57, 57, 29, 57, 57, 29, 29, 43, 29, 29, 43, 29, 29, 57, 57, 14, 57, 14, 57, 71, 71, 57, 86, 57, 100, 86, 86, 86, 86] } },
                { name: "seashore", midiProgram: 122, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -3, settings: { "type": "spectrum", "transition": "soft fade", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "swell 3", "spectrum": [14, 14, 29, 29, 43, 43, 43, 57, 57, 57, 57, 57, 57, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 57] } },
                { name: "bird tweet", midiProgram: 123, generalMidi: true, settings: { "type": "harmonics", "effects": "reverb", "transition": "soft", "chord": "strum", "filterCutoffHz": 2828, "filterResonance": 0, "filterEnvelope": "decay 1", "interval": "hum", "vibrato": "heavy", "harmonics": [0, 0, 14, 100, 14, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
                { name: "telephone ring", midiProgram: 124, generalMidi: true, settings: { "type": "FM", "effects": "reverb", "transition": "hard", "chord": "arpeggio", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "tremolo4", "vibrato": "none", "algorithm": "1â†(2â€‚3â€‚4)", "feedbackType": "1âŸ²", "feedbackAmplitude": 2, "feedbackEnvelope": "steady", "operators": [{ "frequency": "2Ã—", "amplitude": 12, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 4, "envelope": "tremolo1" }, { "frequency": "20Ã—", "amplitude": 1, "envelope": "steady" }, { "frequency": "1Ã—", "amplitude": 0, "envelope": "steady" }] } },
                { name: "helicopter", midiProgram: 125, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -0.5, settings: { "type": "spectrum", "effects": "reverb", "transition": "seamless", "chord": "arpeggio", "filterCutoffHz": 1414, "filterResonance": 14, "filterEnvelope": "tremolo4", "spectrum": [14, 43, 43, 57, 57, 57, 71, 71, 71, 71, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 71, 71, 71, 71, 71, 71, 71, 57, 57] } },
                { name: "applause", midiProgram: 126, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -3, settings: { "type": "spectrum", "effects": "reverb", "transition": "soft fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "swell 3", "spectrum": [14, 14, 29, 29, 29, 43, 43, 57, 71, 71, 86, 86, 86, 71, 71, 57, 57, 57, 71, 86, 86, 86, 86, 86, 71, 71, 57, 57, 57, 57] } },
                { name: "gunshot", midiProgram: 127, generalMidi: true, isNoise: true, midiSubharmonicOctaves: -2, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "strum", "filterCutoffHz": 1414, "filterResonance": 29, "filterEnvelope": "twang 1", "spectrum": [14, 29, 43, 43, 57, 57, 57, 71, 71, 71, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 71, 71, 71, 71, 57, 57, 57, 57, 43] } },
                { name: "scoot", midiProgram: 92, settings: { "type": "chip", "transition": "hard", "effects": "reverb", "chord": "harmony", "filterCutoffHz": 707, "filterResonance": 86, "filterEnvelope": "flare 1", "wave": "sawtooth", "interval": "shimmer", "vibrato": "none" } },
                { name: "buzz saw", midiProgram: 30, settings: { "type": "FM", "effects": "reverb", "transition": "soft", "chord": "custom interval", "filterCutoffHz": 2000, "filterResonance": 0, "filterEnvelope": "steady", "vibrato": "none", "algorithm": "1â†2â†3â†4", "feedbackType": "1âŸ²", "feedbackAmplitude": 0, "feedbackEnvelope": "steady", "operators": [{ "frequency": "5Ã—", "amplitude": 13, "envelope": "custom" }, { "frequency": "1Ã—", "amplitude": 10, "envelope": "steady" }, { "frequency": "~1Ã—", "amplitude": 6, "envelope": "steady" }, { "frequency": "11Ã—", "amplitude": 12, "envelope": "steady" }] } },
                { name: "mosquito", midiProgram: 93, settings: { "type": "PWM", "effects": "reverb", "transition": "cross fade", "chord": "harmony", "filterCutoffHz": 2828, "filterResonance": 57, "filterEnvelope": "steady", "pulseWidth": 4.40625, "pulseEnvelope": "tremolo6", "vibrato": "shaky" } },
                { name: "breathing", midiProgram: 126, isNoise: true, midiSubharmonicOctaves: -1, settings: { "type": "spectrum", "effects": "reverb", "transition": "hard fade", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 14, "filterEnvelope": "swell 2", "spectrum": [14, 14, 14, 29, 29, 29, 29, 29, 43, 29, 29, 43, 43, 43, 29, 29, 71, 43, 86, 86, 57, 100, 86, 86, 86, 86, 71, 86, 71, 57] } },
                { name: "klaxon synth", midiProgram: 125, isNoise: true, midiSubharmonicOctaves: -1, settings: { "type": "noise", "effects": "reverb", "transition": "slide", "chord": "harmony", "filterCutoffHz": 2000, "filterResonance": 86, "filterEnvelope": "steady", "wave": "buzz" } },
                { name: "theremin", midiProgram: 40, settings: { "type": "harmonics", "effects": "reverb", "transition": "slide", "chord": "harmony", "filterCutoffHz": 4000, "filterResonance": 14, "filterEnvelope": "steady", "interval": "union", "vibrato": "heavy", "harmonics": [100, 71, 57, 43, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] } },
            ]) },
    ]);
    beepbox.EditorConfig = EditorConfig;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    function scaleElementsByFactor(array, factor) {
        for (let i = 0; i < array.length; i++) {
            array[i] *= factor;
        }
    }
    beepbox.scaleElementsByFactor = scaleElementsByFactor;
    function isPowerOf2(n) {
        return !!n && !(n & (n - 1));
    }
    function countBits(n) {
        if (!isPowerOf2(n))
            throw new Error("FFT array length must be a power of 2.");
        return Math.round(Math.log(n) / Math.log(2));
    }
    function reverseIndexBits(array, fullArrayLength) {
        const bitCount = countBits(fullArrayLength);
        if (bitCount > 16)
            throw new Error("FFT array length must not be greater than 2^16.");
        const finalShift = 16 - bitCount;
        for (let i = 0; i < fullArrayLength; i++) {
            let j;
            j = ((i & 0xaaaa) >> 1) | ((i & 0x5555) << 1);
            j = ((j & 0xcccc) >> 2) | ((j & 0x3333) << 2);
            j = ((j & 0xf0f0) >> 4) | ((j & 0x0f0f) << 4);
            j = ((j >> 8) | ((j & 0xff) << 8)) >> finalShift;
            if (j > i) {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    function inverseRealFourierTransform(array, fullArrayLength) {
        const totalPasses = countBits(fullArrayLength);
        if (fullArrayLength < 4)
            throw new Error("FFT array length must be at least 4.");
        for (let pass = totalPasses - 1; pass >= 2; pass--) {
            const subStride = 1 << pass;
            const midSubStride = subStride >> 1;
            const stride = subStride << 1;
            const radiansIncrement = Math.PI * 2.0 / stride;
            const cosIncrement = Math.cos(radiansIncrement);
            const sinIncrement = Math.sin(radiansIncrement);
            const oscillatorMultiplier = 2.0 * cosIncrement;
            for (let startIndex = 0; startIndex < fullArrayLength; startIndex += stride) {
                const startIndexA = startIndex;
                const midIndexA = startIndexA + midSubStride;
                const startIndexB = startIndexA + subStride;
                const midIndexB = startIndexB + midSubStride;
                const stopIndex = startIndexB + subStride;
                const realStartA = array[startIndexA];
                const imagStartB = array[startIndexB];
                array[startIndexA] = realStartA + imagStartB;
                array[midIndexA] *= 2;
                array[startIndexB] = realStartA - imagStartB;
                array[midIndexB] *= 2;
                let c = cosIncrement;
                let s = -sinIncrement;
                let cPrev = 1.0;
                let sPrev = 0.0;
                for (let index = 1; index < midSubStride; index++) {
                    const indexA0 = startIndexA + index;
                    const indexA1 = startIndexB - index;
                    const indexB0 = startIndexB + index;
                    const indexB1 = stopIndex - index;
                    const real0 = array[indexA0];
                    const real1 = array[indexA1];
                    const imag0 = array[indexB0];
                    const imag1 = array[indexB1];
                    const tempA = real0 - real1;
                    const tempB = imag0 + imag1;
                    array[indexA0] = real0 + real1;
                    array[indexA1] = imag1 - imag0;
                    array[indexB0] = tempA * c - tempB * s;
                    array[indexB1] = tempB * c + tempA * s;
                    const cTemp = oscillatorMultiplier * c - cPrev;
                    const sTemp = oscillatorMultiplier * s - sPrev;
                    cPrev = c;
                    sPrev = s;
                    c = cTemp;
                    s = sTemp;
                }
            }
        }
        for (let index = 0; index < fullArrayLength; index += 4) {
            const index1 = index + 1;
            const index2 = index + 2;
            const index3 = index + 3;
            const real0 = array[index];
            const real1 = array[index1] * 2;
            const imag2 = array[index2];
            const imag3 = array[index3] * 2;
            const tempA = real0 + imag2;
            const tempB = real0 - imag2;
            array[index] = tempA + real1;
            array[index1] = tempA - real1;
            array[index2] = tempB + imag3;
            array[index3] = tempB - imag3;
        }
        reverseIndexBits(array, fullArrayLength);
    }
    beepbox.inverseRealFourierTransform = inverseRealFourierTransform;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class Deque {
        constructor() {
            this._capacity = 1;
            this._buffer = [undefined];
            this._mask = 0;
            this._offset = 0;
            this._count = 0;
        }
        pushFront(element) {
            if (this._count >= this._capacity)
                this._expandCapacity();
            this._offset = (this._offset - 1) & this._mask;
            this._buffer[this._offset] = element;
            this._count++;
        }
        pushBack(element) {
            if (this._count >= this._capacity)
                this._expandCapacity();
            this._buffer[(this._offset + this._count) & this._mask] = element;
            this._count++;
        }
        popFront() {
            if (this._count <= 0)
                throw new Error("No elements left to pop.");
            const element = this._buffer[this._offset];
            this._buffer[this._offset] = undefined;
            this._offset = (this._offset + 1) & this._mask;
            this._count--;
            return element;
        }
        popBack() {
            if (this._count <= 0)
                throw new Error("No elements left to pop.");
            this._count--;
            const index = (this._offset + this._count) & this._mask;
            const element = this._buffer[index];
            this._buffer[index] = undefined;
            return element;
        }
        peakFront() {
            if (this._count <= 0)
                throw new Error("No elements left to pop.");
            return this._buffer[this._offset];
        }
        peakBack() {
            if (this._count <= 0)
                throw new Error("No elements left to pop.");
            return this._buffer[(this._offset + this._count - 1) & this._mask];
        }
        count() {
            return this._count;
        }
        set(index, element) {
            if (index < 0 || index >= this._count)
                throw new Error("Invalid index");
            this._buffer[(this._offset + index) & this._mask] = element;
        }
        get(index) {
            if (index < 0 || index >= this._count)
                throw new Error("Invalid index");
            return this._buffer[(this._offset + index) & this._mask];
        }
        remove(index) {
            if (index < 0 || index >= this._count)
                throw new Error("Invalid index");
            if (index <= (this._count >> 1)) {
                while (index > 0) {
                    this.set(index, this.get(index - 1));
                    index--;
                }
                this.popFront();
            }
            else {
                index++;
                while (index < this._count) {
                    this.set(index - 1, this.get(index));
                    index++;
                }
                this.popBack();
            }
        }
        _expandCapacity() {
            if (this._capacity >= 0x40000000)
                throw new Error("Capacity too big.");
            this._capacity = this._capacity << 1;
            const oldBuffer = this._buffer;
            const newBuffer = new Array(this._capacity);
            const size = this._count | 0;
            const offset = this._offset | 0;
            for (let i = 0; i < size; i++) {
                newBuffer[i] = oldBuffer[(offset + i) & this._mask];
            }
            for (let i = size; i < this._capacity; i++) {
                newBuffer[i] = undefined;
            }
            this._offset = 0;
            this._buffer = newBuffer;
            this._mask = this._capacity - 1;
        }
    }
    beepbox.Deque = Deque;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const base64IntToCharCode = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 95];
    const base64CharCodeToInt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 0, 0, 0, 0, 63, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 0, 0, 0, 0, 0];
    class BitFieldReader {
        constructor(source, startIndex, stopIndex) {
            this._bits = [];
            this._readIndex = 0;
            for (let i = startIndex; i < stopIndex; i++) {
                const value = base64CharCodeToInt[source.charCodeAt(i)];
                this._bits.push((value >> 5) & 0x1);
                this._bits.push((value >> 4) & 0x1);
                this._bits.push((value >> 3) & 0x1);
                this._bits.push((value >> 2) & 0x1);
                this._bits.push((value >> 1) & 0x1);
                this._bits.push(value & 0x1);
            }
        }
        read(bitCount) {
            let result = 0;
            while (bitCount > 0) {
                result = result << 1;
                result += this._bits[this._readIndex++];
                bitCount--;
            }
            return result;
        }
        readLongTail(minValue, minBits) {
            let result = minValue;
            let numBits = minBits;
            while (this._bits[this._readIndex++]) {
                result += 1 << numBits;
                numBits++;
            }
            while (numBits > 0) {
                numBits--;
                if (this._bits[this._readIndex++]) {
                    result += 1 << numBits;
                }
            }
            return result;
        }
        readPartDuration() {
            return this.readLongTail(1, 3);
        }
        readLegacyPartDuration() {
            return this.readLongTail(1, 2);
        }
        readPinCount() {
            return this.readLongTail(1, 0);
        }
        readPitchInterval() {
            if (this.read(1)) {
                return -this.readLongTail(1, 3);
            }
            else {
                return this.readLongTail(1, 3);
            }
        }
    }
    class BitFieldWriter {
        constructor() {
            this._bits = [];
        }
        write(bitCount, value) {
            bitCount--;
            while (bitCount >= 0) {
                this._bits.push((value >>> bitCount) & 1);
                bitCount--;
            }
        }
        writeLongTail(minValue, minBits, value) {
            if (value < minValue)
                throw new Error("value out of bounds");
            value -= minValue;
            let numBits = minBits;
            while (value >= (1 << numBits)) {
                this._bits.push(1);
                value -= 1 << numBits;
                numBits++;
            }
            this._bits.push(0);
            while (numBits > 0) {
                numBits--;
                this._bits.push((value >>> numBits) & 1);
            }
        }
        writePartDuration(value) {
            this.writeLongTail(1, 3, value);
        }
        writePinCount(value) {
            this.writeLongTail(1, 0, value);
        }
        writePitchInterval(value) {
            if (value < 0) {
                this.write(1, 1);
                this.writeLongTail(1, 3, -value);
            }
            else {
                this.write(1, 0);
                this.writeLongTail(1, 3, value);
            }
        }
        concat(other) {
            this._bits = this._bits.concat(other._bits);
        }
        encodeBase64(buffer) {
            for (let i = 0; i < this._bits.length; i += 6) {
                const value = (this._bits[i] << 5) | (this._bits[i + 1] << 4) | (this._bits[i + 2] << 3) | (this._bits[i + 3] << 2) | (this._bits[i + 4] << 1) | this._bits[i + 5];
                buffer.push(base64IntToCharCode[value]);
            }
            return buffer;
        }
        lengthBase64() {
            return Math.ceil(this._bits.length / 6);
        }
    }
    function makeNotePin(interval, time, volume) {
        return { interval: interval, time: time, volume: volume };
    }
    beepbox.makeNotePin = makeNotePin;
    function clamp(min, max, val) {
        max = max - 1;
        if (val <= max) {
            if (val >= min)
                return val;
            else
                return min;
        }
        else {
            return max;
        }
    }
    class Note {
        constructor(pitch, start, end, volume, fadeout = false) {
            this.pitches = [pitch];
            this.pins = [makeNotePin(0, 0, volume), makeNotePin(0, end - start, fadeout ? 0 : volume)];
            this.start = start;
            this.end = end;
        }
        pickMainInterval() {
            let longestFlatIntervalDuration = 0;
            let mainInterval = 0;
            for (let pinIndex = 1; pinIndex < this.pins.length; pinIndex++) {
                const pinA = this.pins[pinIndex - 1];
                const pinB = this.pins[pinIndex];
                if (pinA.interval == pinB.interval) {
                    const duration = pinB.time - pinA.time;
                    if (longestFlatIntervalDuration < duration) {
                        longestFlatIntervalDuration = duration;
                        mainInterval = pinA.interval;
                    }
                }
            }
            if (longestFlatIntervalDuration == 0) {
                let loudestVolume = 0;
                for (let pinIndex = 0; pinIndex < this.pins.length; pinIndex++) {
                    const pin = this.pins[pinIndex];
                    if (loudestVolume < pin.volume) {
                        loudestVolume = pin.volume;
                        mainInterval = pin.interval;
                    }
                }
            }
            return mainInterval;
        }
    }
    beepbox.Note = Note;
    class Pattern {
        constructor() {
            this.notes = [];
            this.instrument = 0;
        }
        cloneNotes() {
            const result = [];
            for (const oldNote of this.notes) {
                const newNote = new Note(-1, oldNote.start, oldNote.end, 3);
                newNote.pitches = oldNote.pitches.concat();
                newNote.pins = [];
                for (const oldPin of oldNote.pins) {
                    newNote.pins.push(makeNotePin(oldPin.interval, oldPin.time, oldPin.volume));
                }
                result.push(newNote);
            }
            return result;
        }
        reset() {
            this.notes.length = 0;
            this.instrument = 0;
        }
    }
    beepbox.Pattern = Pattern;
    class Operator {
        constructor(index) {
            this.frequency = 0;
            this.amplitude = 0;
            this.envelope = 0;
            this.reset(index);
        }
        reset(index) {
            this.frequency = 0;
            this.amplitude = (index <= 1) ? beepbox.Config.operatorAmplitudeMax : 0;
            this.envelope = (index == 0) ? 0 : 1;
        }
    }
    beepbox.Operator = Operator;
    class SpectrumWave {
        constructor(isNoiseChannel) {
            this.spectrum = [];
            this._wave = null;
            this._waveIsReady = false;
            this.reset(isNoiseChannel);
        }
        reset(isNoiseChannel) {
            for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                if (isNoiseChannel) {
                    this.spectrum[i] = Math.round(beepbox.Config.spectrumMax * (1 / Math.sqrt(1 + i / 3)));
                }
                else {
                    const isHarmonic = i == 0 || i == 7 || i == 11 || i == 14 || i == 16 || i == 18 || i == 21 || i == 23 || i >= 25;
                    this.spectrum[i] = isHarmonic ? Math.max(0, Math.round(beepbox.Config.spectrumMax * (1 - i / 30))) : 0;
                }
            }
            this._waveIsReady = false;
        }
        markCustomWaveDirty() {
            this._waveIsReady = false;
        }
        getCustomWave(lowestOctave) {
            if (!this._waveIsReady || this._wave == null) {
                let waveLength = beepbox.Config.chipNoiseLength;
                if (this._wave == null || this._wave.length != waveLength + 1) {
                    this._wave = new Float32Array(waveLength + 1);
                }
                const wave = this._wave;
                for (let i = 0; i < waveLength; i++) {
                    wave[i] = 0;
                }
                const highestOctave = 14;
                const falloffRatio = 0.25;
                const pitchTweak = [0, 1 / 7, Math.log(5 / 4) / Math.LN2, 3 / 7, Math.log(3 / 2) / Math.LN2, 5 / 7, 6 / 7];
                function controlPointToOctave(point) {
                    return lowestOctave + Math.floor(point / beepbox.Config.spectrumControlPointsPerOctave) + pitchTweak[(point + beepbox.Config.spectrumControlPointsPerOctave) % beepbox.Config.spectrumControlPointsPerOctave];
                }
                let combinedAmplitude = 1;
                for (let i = 0; i < beepbox.Config.spectrumControlPoints + 1; i++) {
                    const value1 = (i <= 0) ? 0 : this.spectrum[i - 1];
                    const value2 = (i >= beepbox.Config.spectrumControlPoints) ? this.spectrum[beepbox.Config.spectrumControlPoints - 1] : this.spectrum[i];
                    const octave1 = controlPointToOctave(i - 1);
                    let octave2 = controlPointToOctave(i);
                    if (i >= beepbox.Config.spectrumControlPoints)
                        octave2 = highestOctave + (octave2 - highestOctave) * falloffRatio;
                    if (value1 == 0 && value2 == 0)
                        continue;
                    combinedAmplitude += 0.02 * beepbox.drawNoiseSpectrum(wave, octave1, octave2, value1 / beepbox.Config.spectrumMax, value2 / beepbox.Config.spectrumMax, -0.5);
                }
                if (this.spectrum[beepbox.Config.spectrumControlPoints - 1] > 0) {
                    combinedAmplitude += 0.02 * beepbox.drawNoiseSpectrum(wave, highestOctave + (controlPointToOctave(beepbox.Config.spectrumControlPoints) - highestOctave) * falloffRatio, highestOctave, this.spectrum[beepbox.Config.spectrumControlPoints - 1] / beepbox.Config.spectrumMax, 0, -0.5);
                }
                beepbox.inverseRealFourierTransform(wave, waveLength);
                beepbox.scaleElementsByFactor(wave, 5.0 / (Math.sqrt(waveLength) * Math.pow(combinedAmplitude, 0.75)));
                wave[waveLength] = wave[0];
                this._waveIsReady = true;
            }
            return this._wave;
        }
    }
    beepbox.SpectrumWave = SpectrumWave;
    class HarmonicsWave {
        constructor() {
            this.harmonics = [];
            this._wave = null;
            this._waveIsReady = false;
            this.reset();
        }
        reset() {
            for (let i = 0; i < beepbox.Config.harmonicsControlPoints; i++) {
                this.harmonics[i] = 0;
            }
            this.harmonics[0] = beepbox.Config.harmonicsMax;
            this.harmonics[3] = beepbox.Config.harmonicsMax;
            this.harmonics[6] = beepbox.Config.harmonicsMax;
            this._waveIsReady = false;
        }
        markCustomWaveDirty() {
            this._waveIsReady = false;
        }
        getCustomWave() {
            if (!this._waveIsReady || this._wave == null) {
                let waveLength = beepbox.Config.harmonicsWavelength;
                const retroWave = beepbox.getDrumWave(0);
                if (this._wave == null || this._wave.length != waveLength + 1) {
                    this._wave = new Float32Array(waveLength + 1);
                }
                const wave = this._wave;
                for (let i = 0; i < waveLength; i++) {
                    wave[i] = 0;
                }
                const overallSlope = -0.25;
                let combinedControlPointAmplitude = 1;
                for (let harmonicIndex = 0; harmonicIndex < beepbox.Config.harmonicsRendered; harmonicIndex++) {
                    const harmonicFreq = harmonicIndex + 1;
                    let controlValue = harmonicIndex < beepbox.Config.harmonicsControlPoints ? this.harmonics[harmonicIndex] : this.harmonics[beepbox.Config.harmonicsControlPoints - 1];
                    if (harmonicIndex >= beepbox.Config.harmonicsControlPoints) {
                        controlValue *= 1 - (harmonicIndex - beepbox.Config.harmonicsControlPoints) / (beepbox.Config.harmonicsRendered - beepbox.Config.harmonicsControlPoints);
                    }
                    const normalizedValue = controlValue / beepbox.Config.harmonicsMax;
                    let amplitude = Math.pow(2, controlValue - beepbox.Config.harmonicsMax + 1) * Math.sqrt(normalizedValue);
                    if (harmonicIndex < beepbox.Config.harmonicsControlPoints) {
                        combinedControlPointAmplitude += amplitude;
                    }
                    amplitude *= Math.pow(harmonicFreq, overallSlope);
                    amplitude *= retroWave[harmonicIndex + 589];
                    wave[waveLength - harmonicFreq] = amplitude;
                }
                beepbox.inverseRealFourierTransform(wave, waveLength);
                const mult = 1 / Math.pow(combinedControlPointAmplitude, 0.7);
                let cumulative = 0;
                let wavePrev = 0;
                for (let i = 0; i < wave.length; i++) {
                    cumulative += wavePrev;
                    wavePrev = wave[i] * mult;
                    wave[i] = cumulative;
                }
                wave[waveLength] = wave[0];
                this._waveIsReady = true;
            }
            return this._wave;
        }
    }
    beepbox.HarmonicsWave = HarmonicsWave;
    class Instrument {
        constructor(isNoiseChannel) {
            this.type = 0;
            this.preset = 0;
            this.chipWave = 2;
            this.chipNoise = 1;
            this.filterCutoff = 6;
            this.filterResonance = 0;
            this.filterEnvelope = 1;
            this.transition = 1;
            this.vibrato = 0;
            this.interval = 0;
            this.effects = 0;
            this.chord = 1;
            this.volume = 0;
            this.pan = beepbox.Config.panCenter;
            this.pulseWidth = beepbox.Config.pulseWidthRange - 1;
            this.pulseEnvelope = 1;
            this.algorithm = 0;
            this.feedbackType = 0;
            this.feedbackAmplitude = 0;
            this.feedbackEnvelope = 1;
            this.operators = [];
            this.harmonicsWave = new HarmonicsWave();
            this.drumsetEnvelopes = [];
            this.drumsetSpectrumWaves = [];
            this.spectrumWave = new SpectrumWave(isNoiseChannel);
            for (let i = 0; i < beepbox.Config.operatorCount; i++) {
                this.operators[i] = new Operator(i);
            }
            for (let i = 0; i < beepbox.Config.drumCount; i++) {
                this.drumsetEnvelopes[i] = beepbox.Config.envelopes.dictionary["twang 2"].index;
                this.drumsetSpectrumWaves[i] = new SpectrumWave(true);
            }
        }
        setTypeAndReset(type, isNoiseChannel) {
            this.type = type;
            this.preset = type;
            this.volume = 0;
            this.pan = beepbox.Config.panCenter;
            switch (type) {
                case 0:
                    this.chipWave = 2;
                    this.filterCutoff = 6;
                    this.filterResonance = 0;
                    this.filterEnvelope = beepbox.Config.envelopes.dictionary["steady"].index;
                    this.transition = 1;
                    this.vibrato = 0;
                    this.interval = 0;
                    this.effects = 1;
                    this.chord = 2;
                    break;
                case 1:
                    this.transition = 1;
                    this.vibrato = 0;
                    this.effects = 1;
                    this.chord = 3;
                    this.filterCutoff = 10;
                    this.filterResonance = 0;
                    this.filterEnvelope = 1;
                    this.algorithm = 0;
                    this.feedbackType = 0;
                    this.feedbackAmplitude = 0;
                    this.feedbackEnvelope = beepbox.Config.envelopes.dictionary["steady"].index;
                    for (let i = 0; i < this.operators.length; i++) {
                        this.operators[i].reset(i);
                    }
                    break;
                case 2:
                    this.chipNoise = 1;
                    this.transition = 1;
                    this.effects = 0;
                    this.chord = 2;
                    this.filterCutoff = 10;
                    this.filterResonance = 0;
                    this.filterEnvelope = beepbox.Config.envelopes.dictionary["steady"].index;
                    break;
                case 3:
                    this.transition = 1;
                    this.effects = 1;
                    this.chord = 0;
                    this.filterCutoff = 10;
                    this.filterResonance = 0;
                    this.filterEnvelope = beepbox.Config.envelopes.dictionary["steady"].index;
                    this.spectrumWave.reset(isNoiseChannel);
                    break;
                case 4:
                    this.effects = 0;
                    for (let i = 0; i < beepbox.Config.drumCount; i++) {
                        this.drumsetEnvelopes[i] = beepbox.Config.envelopes.dictionary["twang 2"].index;
                        this.drumsetSpectrumWaves[i].reset(isNoiseChannel);
                    }
                    break;
                case 5:
                    this.filterCutoff = 10;
                    this.filterResonance = 0;
                    this.filterEnvelope = beepbox.Config.envelopes.dictionary["steady"].index;
                    this.transition = 1;
                    this.vibrato = 0;
                    this.interval = 0;
                    this.effects = 1;
                    this.chord = 0;
                    this.harmonicsWave.reset();
                    break;
                case 6:
                    this.filterCutoff = 10;
                    this.filterResonance = 0;
                    this.filterEnvelope = beepbox.Config.envelopes.dictionary["steady"].index;
                    this.transition = 1;
                    this.vibrato = 0;
                    this.interval = 0;
                    this.effects = 1;
                    this.chord = 2;
                    this.pulseWidth = beepbox.Config.pulseWidthRange - 1;
                    this.pulseEnvelope = beepbox.Config.envelopes.dictionary["twang 2"].index;
                    break;
                default:
                    throw new Error("Unrecognized instrument type: " + type);
            }
        }
        toJsonObject() {
            const instrumentObject = {
                "type": beepbox.Config.instrumentTypeNames[this.type],
                "volume": (5 - this.volume) * 20,
                "pan": (this.pan - beepbox.Config.panCenter) * 100 / beepbox.Config.panCenter,
                "effects": beepbox.Config.effectsNames[this.effects],
            };
            if (this.preset != this.type) {
                instrumentObject["preset"] = this.preset;
            }
            if (this.type != 4) {
                instrumentObject["transition"] = beepbox.Config.transitions[this.transition].name;
                instrumentObject["chord"] = this.getChord().name;
                instrumentObject["filterCutoffHz"] = Math.round(beepbox.Config.filterCutoffMaxHz * Math.pow(2.0, this.getFilterCutoffOctaves()));
                instrumentObject["filterResonance"] = Math.round(100 * this.filterResonance / (beepbox.Config.filterResonanceRange - 1));
                instrumentObject["filterEnvelope"] = this.getFilterEnvelope().name;
            }
            if (this.type == 2) {
                instrumentObject["wave"] = beepbox.Config.chipNoises[this.chipNoise].name;
            }
            else if (this.type == 3) {
                instrumentObject["spectrum"] = [];
                for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                    instrumentObject["spectrum"][i] = Math.round(100 * this.spectrumWave.spectrum[i] / beepbox.Config.spectrumMax);
                }
            }
            else if (this.type == 4) {
                instrumentObject["drums"] = [];
                for (let j = 0; j < beepbox.Config.drumCount; j++) {
                    const spectrum = [];
                    for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                        spectrum[i] = Math.round(100 * this.drumsetSpectrumWaves[j].spectrum[i] / beepbox.Config.spectrumMax);
                    }
                    instrumentObject["drums"][j] = {
                        "filterEnvelope": this.getDrumsetEnvelope(j).name,
                        "spectrum": spectrum,
                    };
                }
            }
            else if (this.type == 0) {
                instrumentObject["wave"] = beepbox.Config.chipWaves[this.chipWave].name;
                instrumentObject["interval"] = beepbox.Config.intervals[this.interval].name;
                instrumentObject["vibrato"] = beepbox.Config.vibratos[this.vibrato].name;
            }
            else if (this.type == 6) {
                instrumentObject["pulseWidth"] = Math.round(Math.pow(0.5, (beepbox.Config.pulseWidthRange - this.pulseWidth - 1) * 0.5) * 50 * 32) / 32;
                instrumentObject["pulseEnvelope"] = beepbox.Config.envelopes[this.pulseEnvelope].name;
                instrumentObject["vibrato"] = beepbox.Config.vibratos[this.vibrato].name;
            }
            else if (this.type == 5) {
                instrumentObject["interval"] = beepbox.Config.intervals[this.interval].name;
                instrumentObject["vibrato"] = beepbox.Config.vibratos[this.vibrato].name;
                instrumentObject["harmonics"] = [];
                for (let i = 0; i < beepbox.Config.harmonicsControlPoints; i++) {
                    instrumentObject["harmonics"][i] = Math.round(100 * this.harmonicsWave.harmonics[i] / beepbox.Config.harmonicsMax);
                }
            }
            else if (this.type == 1) {
                const operatorArray = [];
                for (const operator of this.operators) {
                    operatorArray.push({
                        "frequency": beepbox.Config.operatorFrequencies[operator.frequency].name,
                        "amplitude": operator.amplitude,
                        "envelope": beepbox.Config.envelopes[operator.envelope].name,
                    });
                }
                instrumentObject["vibrato"] = beepbox.Config.vibratos[this.vibrato].name;
                instrumentObject["algorithm"] = beepbox.Config.algorithms[this.algorithm].name;
                instrumentObject["feedbackType"] = beepbox.Config.feedbacks[this.feedbackType].name;
                instrumentObject["feedbackAmplitude"] = this.feedbackAmplitude;
                instrumentObject["feedbackEnvelope"] = beepbox.Config.envelopes[this.feedbackEnvelope].name;
                instrumentObject["operators"] = operatorArray;
            }
            else {
                throw new Error("Unrecognized instrument type");
            }
            return instrumentObject;
        }
        fromJsonObject(instrumentObject, isNoiseChannel) {
            if (instrumentObject == undefined)
                instrumentObject = {};
            let type = beepbox.Config.instrumentTypeNames.indexOf(instrumentObject["type"]);
            if (type == -1)
                type = isNoiseChannel ? 2 : 0;
            this.setTypeAndReset(type, isNoiseChannel);
            if (instrumentObject["preset"] != undefined) {
                this.preset = instrumentObject["preset"] >>> 0;
            }
            if (instrumentObject["volume"] != undefined) {
                this.volume = clamp(0, beepbox.Config.volumeRange, Math.round(5 - (instrumentObject["volume"] | 0) / 20));
            }
            else {
                this.volume = 0;
            }
            if (instrumentObject["pan"] != undefined) {
                this.pan = clamp(0, beepbox.Config.panMax + 1, Math.round(beepbox.Config.panCenter + (instrumentObject["pan"] | 0) * beepbox.Config.panCenter / 100));
            }
            else {
                this.pan = beepbox.Config.panCenter;
            }
            const oldTransitionNames = { "binary": 0, "sudden": 1, "smooth": 2 };
            const transitionObject = instrumentObject["transition"] || instrumentObject["envelope"];
            this.transition = oldTransitionNames[transitionObject] != undefined ? oldTransitionNames[transitionObject] : beepbox.Config.transitions.findIndex(transition => transition.name == transitionObject);
            if (this.transition == -1)
                this.transition = 1;
            this.effects = beepbox.Config.effectsNames.indexOf(instrumentObject["effects"]);
            if (this.effects == -1)
                this.effects = (this.type == 2) ? 0 : 1;
            if (instrumentObject["filterCutoffHz"] != undefined) {
                this.filterCutoff = clamp(0, beepbox.Config.filterCutoffRange, Math.round((beepbox.Config.filterCutoffRange - 1) + 2.0 * Math.log((instrumentObject["filterCutoffHz"] | 0) / beepbox.Config.filterCutoffMaxHz) / Math.LN2));
            }
            else {
                this.filterCutoff = (this.type == 0) ? 6 : 10;
            }
            if (instrumentObject["filterResonance"] != undefined) {
                this.filterResonance = clamp(0, beepbox.Config.filterResonanceRange, Math.round((beepbox.Config.filterResonanceRange - 1) * (instrumentObject["filterResonance"] | 0) / 100));
            }
            else {
                this.filterResonance = 0;
            }
            this.filterEnvelope = beepbox.Config.envelopes.findIndex(envelope => envelope.name == instrumentObject["filterEnvelope"]);
            if (this.filterEnvelope == -1)
                this.filterEnvelope = beepbox.Config.envelopes.dictionary["steady"].index;
            if (instrumentObject["filter"] != undefined) {
                const legacyToCutoff = [10, 6, 3, 0, 8, 5, 2];
                const legacyToEnvelope = [1, 1, 1, 1, 18, 19, 20];
                const filterNames = ["none", "bright", "medium", "soft", "decay bright", "decay medium", "decay soft"];
                const oldFilterNames = { "sustain sharp": 1, "sustain medium": 2, "sustain soft": 3, "decay sharp": 4 };
                let legacyFilter = oldFilterNames[instrumentObject["filter"]] != undefined ? oldFilterNames[instrumentObject["filter"]] : filterNames.indexOf(instrumentObject["filter"]);
                if (legacyFilter == -1)
                    legacyFilter = 0;
                this.filterCutoff = legacyToCutoff[legacyFilter];
                this.filterEnvelope = legacyToEnvelope[legacyFilter];
                this.filterResonance = 0;
            }
            const legacyEffectNames = ["none", "vibrato light", "vibrato delayed", "vibrato heavy"];
            if (this.type == 2) {
                this.chipNoise = beepbox.Config.chipNoises.findIndex(wave => wave.name == instrumentObject["wave"]);
                if (this.chipNoise == -1)
                    this.chipNoise = 1;
                this.chord = beepbox.Config.chords.findIndex(chord => chord.name == instrumentObject["chord"]);
                if (this.chord == -1)
                    this.chord = 2;
            }
            else if (this.type == 3) {
                if (instrumentObject["spectrum"] != undefined) {
                    for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                        this.spectrumWave.spectrum[i] = Math.max(0, Math.min(beepbox.Config.spectrumMax, Math.round(beepbox.Config.spectrumMax * (+instrumentObject["spectrum"][i]) / 100)));
                    }
                }
                this.chord = beepbox.Config.chords.findIndex(chord => chord.name == instrumentObject["chord"]);
                if (this.chord == -1)
                    this.chord = 0;
            }
            else if (this.type == 4) {
                if (instrumentObject["drums"] != undefined) {
                    for (let j = 0; j < beepbox.Config.drumCount; j++) {
                        const drum = instrumentObject["drums"][j];
                        if (drum == undefined)
                            continue;
                        if (drum["filterEnvelope"] != undefined) {
                            this.drumsetEnvelopes[j] = beepbox.Config.envelopes.findIndex(envelope => envelope.name == drum["filterEnvelope"]);
                            if (this.drumsetEnvelopes[j] == -1)
                                this.drumsetEnvelopes[j] = beepbox.Config.envelopes.dictionary["twang 2"].index;
                        }
                        if (drum["spectrum"] != undefined) {
                            for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                                this.drumsetSpectrumWaves[j].spectrum[i] = Math.max(0, Math.min(beepbox.Config.spectrumMax, Math.round(beepbox.Config.spectrumMax * (+drum["spectrum"][i]) / 100)));
                            }
                        }
                    }
                }
            }
            else if (this.type == 5) {
                if (instrumentObject["harmonics"] != undefined) {
                    for (let i = 0; i < beepbox.Config.harmonicsControlPoints; i++) {
                        this.harmonicsWave.harmonics[i] = Math.max(0, Math.min(beepbox.Config.harmonicsMax, Math.round(beepbox.Config.harmonicsMax * (+instrumentObject["harmonics"][i]) / 100)));
                    }
                }
                if (instrumentObject["interval"] != undefined) {
                    this.interval = beepbox.Config.intervals.findIndex(interval => interval.name == instrumentObject["interval"]);
                    if (this.interval == -1)
                        this.interval = 0;
                }
                if (instrumentObject["vibrato"] != undefined) {
                    this.vibrato = beepbox.Config.vibratos.findIndex(vibrato => vibrato.name == instrumentObject["vibrato"]);
                    if (this.vibrato == -1)
                        this.vibrato = 0;
                }
                this.chord = beepbox.Config.chords.findIndex(chord => chord.name == instrumentObject["chord"]);
                if (this.chord == -1)
                    this.chord = 0;
            }
            else if (this.type == 6) {
                if (instrumentObject["pulseWidth"] != undefined) {
                    this.pulseWidth = clamp(0, beepbox.Config.pulseWidthRange, Math.round((Math.log((+instrumentObject["pulseWidth"]) / 50) / Math.LN2) / 0.5 - 1 + 8));
                }
                else {
                    this.pulseWidth = beepbox.Config.pulseWidthRange - 1;
                }
                if (instrumentObject["pulseEnvelope"] != undefined) {
                    this.pulseEnvelope = beepbox.Config.envelopes.findIndex(envelope => envelope.name == instrumentObject["pulseEnvelope"]);
                    if (this.pulseEnvelope == -1)
                        this.pulseEnvelope = beepbox.Config.envelopes.dictionary["steady"].index;
                }
                if (instrumentObject["vibrato"] != undefined) {
                    this.vibrato = beepbox.Config.vibratos.findIndex(vibrato => vibrato.name == instrumentObject["vibrato"]);
                    if (this.vibrato == -1)
                        this.vibrato = 0;
                }
                this.chord = beepbox.Config.chords.findIndex(chord => chord.name == instrumentObject["chord"]);
                if (this.chord == -1)
                    this.chord = 0;
            }
            else if (this.type == 0) {
                const legacyWaveNames = { "triangle": 1, "square": 2, "pulse wide": 3, "pulse narrow": 4, "sawtooth": 5, "double saw": 6, "double pulse": 7, "spiky": 8, "plateau": 0 };
                this.chipWave = legacyWaveNames[instrumentObject["wave"]] != undefined ? legacyWaveNames[instrumentObject["wave"]] : beepbox.Config.chipWaves.findIndex(wave => wave.name == instrumentObject["wave"]);
                if (this.chipWave == -1)
                    this.chipWave = 1;
                if (instrumentObject["interval"] != undefined) {
                    this.interval = beepbox.Config.intervals.findIndex(interval => interval.name == instrumentObject["interval"]);
                    if (this.interval == -1)
                        this.interval = 0;
                }
                else if (instrumentObject["chorus"] != undefined) {
                    const legacyChorusNames = { "fifths": 5, "octaves": 6 };
                    this.interval = legacyChorusNames[instrumentObject["chorus"]] != undefined ? legacyChorusNames[instrumentObject["chorus"]] : beepbox.Config.intervals.findIndex(interval => interval.name == instrumentObject["chorus"]);
                    if (this.interval == -1)
                        this.interval = 0;
                }
                if (instrumentObject["vibrato"] != undefined) {
                    this.vibrato = beepbox.Config.vibratos.findIndex(vibrato => vibrato.name == instrumentObject["vibrato"]);
                    if (this.vibrato == -1)
                        this.vibrato = 0;
                }
                else if (instrumentObject["effect"] != undefined) {
                    this.vibrato = legacyEffectNames.indexOf(instrumentObject["effect"]);
                    if (this.vibrato == -1)
                        this.vibrato = 0;
                }
                this.chord = beepbox.Config.chords.findIndex(chord => chord.name == instrumentObject["chord"]);
                if (this.chord == -1)
                    this.chord = 2;
                if (instrumentObject["chorus"] == "custom harmony") {
                    this.interval = 2;
                    this.chord = 3;
                }
            }
            else if (this.type == 1) {
                if (instrumentObject["vibrato"] != undefined) {
                    this.vibrato = beepbox.Config.vibratos.findIndex(vibrato => vibrato.name == instrumentObject["vibrato"]);
                    if (this.vibrato == -1)
                        this.vibrato = 0;
                }
                else if (instrumentObject["effect"] != undefined) {
                    this.vibrato = legacyEffectNames.indexOf(instrumentObject["effect"]);
                    if (this.vibrato == -1)
                        this.vibrato = 0;
                }
                this.chord = beepbox.Config.chords.findIndex(chord => chord.name == instrumentObject["chord"]);
                if (this.chord == -1)
                    this.chord = 3;
                this.algorithm = beepbox.Config.algorithms.findIndex(algorithm => algorithm.name == instrumentObject["algorithm"]);
                if (this.algorithm == -1)
                    this.algorithm = 0;
                this.feedbackType = beepbox.Config.feedbacks.findIndex(feedback => feedback.name == instrumentObject["feedbackType"]);
                if (this.feedbackType == -1)
                    this.feedbackType = 0;
                if (instrumentObject["feedbackAmplitude"] != undefined) {
                    this.feedbackAmplitude = clamp(0, beepbox.Config.operatorAmplitudeMax + 1, instrumentObject["feedbackAmplitude"] | 0);
                }
                else {
                    this.feedbackAmplitude = 0;
                }
                const legacyEnvelopeNames = { "pluck 1": 6, "pluck 2": 7, "pluck 3": 8 };
                this.feedbackEnvelope = legacyEnvelopeNames[instrumentObject["feedbackEnvelope"]] != undefined ? legacyEnvelopeNames[instrumentObject["feedbackEnvelope"]] : beepbox.Config.envelopes.findIndex(envelope => envelope.name == instrumentObject["feedbackEnvelope"]);
                if (this.feedbackEnvelope == -1)
                    this.feedbackEnvelope = 0;
                for (let j = 0; j < beepbox.Config.operatorCount; j++) {
                    const operator = this.operators[j];
                    let operatorObject = undefined;
                    if (instrumentObject["operators"])
                        operatorObject = instrumentObject["operators"][j];
                    if (operatorObject == undefined)
                        operatorObject = {};
                    operator.frequency = beepbox.Config.operatorFrequencies.findIndex(freq => freq.name == operatorObject["frequency"]);
                    if (operator.frequency == -1)
                        operator.frequency = 0;
                    if (operatorObject["amplitude"] != undefined) {
                        operator.amplitude = clamp(0, beepbox.Config.operatorAmplitudeMax + 1, operatorObject["amplitude"] | 0);
                    }
                    else {
                        operator.amplitude = 0;
                    }
                    operator.envelope = legacyEnvelopeNames[operatorObject["envelope"]] != undefined ? legacyEnvelopeNames[operatorObject["envelope"]] : beepbox.Config.envelopes.findIndex(envelope => envelope.name == operatorObject["envelope"]);
                    if (operator.envelope == -1)
                        operator.envelope = 0;
                }
            }
            else {
                throw new Error("Unrecognized instrument type.");
            }
        }
        static frequencyFromPitch(pitch) {
            return 440.0 * Math.pow(2.0, (pitch - 69.0) / 12.0);
        }
        static drumsetIndexReferenceDelta(index) {
            return Instrument.frequencyFromPitch(beepbox.Config.spectrumBasePitch + index * 6) / 44100;
        }
        static _drumsetIndexToSpectrumOctave(index) {
            return 15 + Math.log(Instrument.drumsetIndexReferenceDelta(index)) / Math.LN2;
        }
        warmUp() {
            if (this.type == 2) {
                beepbox.getDrumWave(this.chipNoise);
            }
            else if (this.type == 5) {
                this.harmonicsWave.getCustomWave();
            }
            else if (this.type == 3) {
                this.spectrumWave.getCustomWave(8);
            }
            else if (this.type == 4) {
                for (let i = 0; i < beepbox.Config.drumCount; i++) {
                    this.drumsetSpectrumWaves[i].getCustomWave(Instrument._drumsetIndexToSpectrumOctave(i));
                }
            }
        }
        getDrumWave() {
            if (this.type == 2) {
                return beepbox.getDrumWave(this.chipNoise);
            }
            else if (this.type == 3) {
                return this.spectrumWave.getCustomWave(8);
            }
            else {
                throw new Error("Unhandled instrument type in getDrumWave");
            }
        }
        getDrumsetWave(pitch) {
            if (this.type == 4) {
                return this.drumsetSpectrumWaves[pitch].getCustomWave(Instrument._drumsetIndexToSpectrumOctave(pitch));
            }
            else {
                throw new Error("Unhandled instrument type in getDrumWave");
            }
        }
        getTransition() {
            return this.type == 4 ? beepbox.Config.transitions.dictionary["hard fade"] : beepbox.Config.transitions[this.transition];
        }
        getChord() {
            return this.type == 4 ? beepbox.Config.chords.dictionary["harmony"] : beepbox.Config.chords[this.chord];
        }
        getFilterCutoffOctaves() {
            return this.type == 4 ? 0 : (this.filterCutoff - (beepbox.Config.filterCutoffRange - 1)) * 0.5;
        }
        getFilterIsFirstOrder() {
            return this.type == 4 ? false : this.filterResonance == 0;
        }
        getFilterResonance() {
            return this.type == 4 ? 1 : this.filterResonance;
        }
        getFilterEnvelope() {
            if (this.type == 4)
                throw new Error("Can't getFilterEnvelope() for drumset.");
            return beepbox.Config.envelopes[this.filterEnvelope];
        }
        getDrumsetEnvelope(pitch) {
            if (this.type != 4)
                throw new Error("Can't getDrumsetEnvelope() for non-drumset.");
            return beepbox.Config.envelopes[this.drumsetEnvelopes[pitch]];
        }
    }
    beepbox.Instrument = Instrument;
    class Channel {
        constructor() {
            this.octave = 0;
            this.instruments = [];
            this.patterns = [];
            this.bars = [];
        }
    }
    beepbox.Channel = Channel;
    class Song {
        constructor(string) {
            this.channels = [];
            if (string != undefined) {
                this.fromBase64String(string);
            }
            else {
                this.initToDefault(true);
            }
        }
        getChannelCount() {
            return this.pitchChannelCount + this.noiseChannelCount;
        }
        getChannelIsNoise(channel) {
            return (channel >= this.pitchChannelCount);
        }
        initToDefault(andResetChannels = true) {
            this.scale = 0;
            this.key = 0;
            this.loopStart = 0;
            this.loopLength = 4;
            this.tempo = 150;
            this.reverb = 0;
            this.beatsPerBar = 8;
            this.barCount = 16;
            this.patternsPerChannel = 8;
            this.rhythm = 1;
            this.instrumentsPerChannel = 1;
            if (andResetChannels) {
                this.pitchChannelCount = 3;
                this.noiseChannelCount = 1;
                for (let channelIndex = 0; channelIndex < this.getChannelCount(); channelIndex++) {
                    if (this.channels.length <= channelIndex) {
                        this.channels[channelIndex] = new Channel();
                    }
                    const channel = this.channels[channelIndex];
                    channel.octave = 3 - channelIndex;
                    for (let pattern = 0; pattern < this.patternsPerChannel; pattern++) {
                        if (channel.patterns.length <= pattern) {
                            channel.patterns[pattern] = new Pattern();
                        }
                        else {
                            channel.patterns[pattern].reset();
                        }
                    }
                    channel.patterns.length = this.patternsPerChannel;
                    const isNoiseChannel = channelIndex >= this.pitchChannelCount;
                    for (let instrument = 0; instrument < this.instrumentsPerChannel; instrument++) {
                        if (channel.instruments.length <= instrument) {
                            channel.instruments[instrument] = new Instrument(isNoiseChannel);
                        }
                        channel.instruments[instrument].setTypeAndReset(isNoiseChannel ? 2 : 0, isNoiseChannel);
                    }
                    channel.instruments.length = this.instrumentsPerChannel;
                    for (let bar = 0; bar < this.barCount; bar++) {
                        channel.bars[bar] = bar < 4 ? 1 : 0;
                    }
                    channel.bars.length = this.barCount;
                }
                this.channels.length = this.getChannelCount();
            }
        }
        toBase64String() {
            let bits;
            let buffer = [];
            buffer.push(base64IntToCharCode[Song._latestVersion]);
            buffer.push(110, base64IntToCharCode[this.pitchChannelCount], base64IntToCharCode[this.noiseChannelCount]);
            buffer.push(115, base64IntToCharCode[this.scale]);
            buffer.push(107, base64IntToCharCode[this.key]);
            buffer.push(108, base64IntToCharCode[this.loopStart >> 6], base64IntToCharCode[this.loopStart & 0x3f]);
            buffer.push(101, base64IntToCharCode[(this.loopLength - 1) >> 6], base64IntToCharCode[(this.loopLength - 1) & 0x3f]);
            buffer.push(116, base64IntToCharCode[this.tempo >> 6], base64IntToCharCode[this.tempo & 63]);
            buffer.push(109, base64IntToCharCode[this.reverb]);
            buffer.push(97, base64IntToCharCode[this.beatsPerBar - 1]);
            buffer.push(103, base64IntToCharCode[(this.barCount - 1) >> 6], base64IntToCharCode[(this.barCount - 1) & 0x3f]);
            buffer.push(106, base64IntToCharCode[(this.patternsPerChannel - 1) >> 6], base64IntToCharCode[(this.patternsPerChannel - 1) & 0x3f]);
            buffer.push(105, base64IntToCharCode[this.instrumentsPerChannel - 1]);
            buffer.push(114, base64IntToCharCode[this.rhythm]);
            buffer.push(111);
            for (let channel = 0; channel < this.getChannelCount(); channel++) {
                buffer.push(base64IntToCharCode[this.channels[channel].octave]);
            }
            for (let channel = 0; channel < this.getChannelCount(); channel++) {
                for (let i = 0; i < this.instrumentsPerChannel; i++) {
                    const instrument = this.channels[channel].instruments[i];
                    buffer.push(84, base64IntToCharCode[instrument.type]);
                    buffer.push(118, base64IntToCharCode[instrument.volume]);
                    buffer.push(76, base64IntToCharCode[instrument.pan]);
                    buffer.push(117, base64IntToCharCode[instrument.preset >> 6], base64IntToCharCode[instrument.preset & 63]);
                    buffer.push(113, base64IntToCharCode[instrument.effects]);
                    if (instrument.type != 4) {
                        buffer.push(100, base64IntToCharCode[instrument.transition]);
                        buffer.push(102, base64IntToCharCode[instrument.filterCutoff]);
                        buffer.push(121, base64IntToCharCode[instrument.filterResonance]);
                        buffer.push(122, base64IntToCharCode[instrument.filterEnvelope]);
                        buffer.push(67, base64IntToCharCode[instrument.chord]);
                    }
                    if (instrument.type == 0) {
                        buffer.push(119, base64IntToCharCode[instrument.chipWave]);
                        buffer.push(99, base64IntToCharCode[instrument.vibrato]);
                        buffer.push(104, base64IntToCharCode[instrument.interval]);
                    }
                    else if (instrument.type == 1) {
                        buffer.push(99, base64IntToCharCode[instrument.vibrato]);
                        buffer.push(65, base64IntToCharCode[instrument.algorithm]);
                        buffer.push(70, base64IntToCharCode[instrument.feedbackType]);
                        buffer.push(66, base64IntToCharCode[instrument.feedbackAmplitude]);
                        buffer.push(86, base64IntToCharCode[instrument.feedbackEnvelope]);
                        buffer.push(81);
                        for (let o = 0; o < beepbox.Config.operatorCount; o++) {
                            buffer.push(base64IntToCharCode[instrument.operators[o].frequency]);
                        }
                        buffer.push(80);
                        for (let o = 0; o < beepbox.Config.operatorCount; o++) {
                            buffer.push(base64IntToCharCode[instrument.operators[o].amplitude]);
                        }
                        buffer.push(69);
                        for (let o = 0; o < beepbox.Config.operatorCount; o++) {
                            buffer.push(base64IntToCharCode[instrument.operators[o].envelope]);
                        }
                    }
                    else if (instrument.type == 2) {
                        buffer.push(119, base64IntToCharCode[instrument.chipNoise]);
                    }
                    else if (instrument.type == 3) {
                        buffer.push(83);
                        const spectrumBits = new BitFieldWriter();
                        for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                            spectrumBits.write(beepbox.Config.spectrumControlPointBits, instrument.spectrumWave.spectrum[i]);
                        }
                        spectrumBits.encodeBase64(buffer);
                    }
                    else if (instrument.type == 4) {
                        buffer.push(122);
                        for (let j = 0; j < beepbox.Config.drumCount; j++) {
                            buffer.push(base64IntToCharCode[instrument.drumsetEnvelopes[j]]);
                        }
                        buffer.push(83);
                        const spectrumBits = new BitFieldWriter();
                        for (let j = 0; j < beepbox.Config.drumCount; j++) {
                            for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                                spectrumBits.write(beepbox.Config.spectrumControlPointBits, instrument.drumsetSpectrumWaves[j].spectrum[i]);
                            }
                        }
                        spectrumBits.encodeBase64(buffer);
                    }
                    else if (instrument.type == 5) {
                        buffer.push(99, base64IntToCharCode[instrument.vibrato]);
                        buffer.push(104, base64IntToCharCode[instrument.interval]);
                        buffer.push(72);
                        const harmonicsBits = new BitFieldWriter();
                        for (let i = 0; i < beepbox.Config.harmonicsControlPoints; i++) {
                            harmonicsBits.write(beepbox.Config.harmonicsControlPointBits, instrument.harmonicsWave.harmonics[i]);
                        }
                        harmonicsBits.encodeBase64(buffer);
                    }
                    else if (instrument.type == 6) {
                        buffer.push(99, base64IntToCharCode[instrument.vibrato]);
                        buffer.push(87, base64IntToCharCode[instrument.pulseWidth], base64IntToCharCode[instrument.pulseEnvelope]);
                    }
                    else {
                        throw new Error("Unknown instrument type.");
                    }
                }
            }
            buffer.push(98);
            bits = new BitFieldWriter();
            let neededBits = 0;
            while ((1 << neededBits) < this.patternsPerChannel + 1)
                neededBits++;
            for (let channel = 0; channel < this.getChannelCount(); channel++)
                for (let i = 0; i < this.barCount; i++) {
                    bits.write(neededBits, this.channels[channel].bars[i]);
                }
            bits.encodeBase64(buffer);
            buffer.push(112);
            bits = new BitFieldWriter();
            let neededInstrumentBits = 0;
            while ((1 << neededInstrumentBits) < this.instrumentsPerChannel)
                neededInstrumentBits++;
            for (let channel = 0; channel < this.getChannelCount(); channel++) {
                const isNoiseChannel = this.getChannelIsNoise(channel);
                const octaveOffset = isNoiseChannel ? 0 : this.channels[channel].octave * 12;
                let lastPitch = (isNoiseChannel ? 4 : 12) + octaveOffset;
                const recentPitches = isNoiseChannel ? [4, 6, 7, 2, 3, 8, 0, 10] : [12, 19, 24, 31, 36, 7, 0];
                const recentShapes = [];
                for (let i = 0; i < recentPitches.length; i++) {
                    recentPitches[i] += octaveOffset;
                }
                for (const pattern of this.channels[channel].patterns) {
                    bits.write(neededInstrumentBits, pattern.instrument);
                    if (pattern.notes.length > 0) {
                        bits.write(1, 1);
                        let curPart = 0;
                        for (const note of pattern.notes) {
                            if (note.start > curPart) {
                                bits.write(2, 0);
                                bits.writePartDuration(note.start - curPart);
                            }
                            const shapeBits = new BitFieldWriter();
                            for (let i = 1; i < note.pitches.length; i++)
                                shapeBits.write(1, 1);
                            if (note.pitches.length < 4)
                                shapeBits.write(1, 0);
                            shapeBits.writePinCount(note.pins.length - 1);
                            shapeBits.write(2, note.pins[0].volume);
                            let shapePart = 0;
                            let startPitch = note.pitches[0];
                            let currentPitch = startPitch;
                            const pitchBends = [];
                            for (let i = 1; i < note.pins.length; i++) {
                                const pin = note.pins[i];
                                const nextPitch = startPitch + pin.interval;
                                if (currentPitch != nextPitch) {
                                    shapeBits.write(1, 1);
                                    pitchBends.push(nextPitch);
                                    currentPitch = nextPitch;
                                }
                                else {
                                    shapeBits.write(1, 0);
                                }
                                shapeBits.writePartDuration(pin.time - shapePart);
                                shapePart = pin.time;
                                shapeBits.write(2, pin.volume);
                            }
                            const shapeString = String.fromCharCode.apply(null, shapeBits.encodeBase64([]));
                            const shapeIndex = recentShapes.indexOf(shapeString);
                            if (shapeIndex == -1) {
                                bits.write(2, 1);
                                bits.concat(shapeBits);
                            }
                            else {
                                bits.write(1, 1);
                                bits.writeLongTail(0, 0, shapeIndex);
                                recentShapes.splice(shapeIndex, 1);
                            }
                            recentShapes.unshift(shapeString);
                            if (recentShapes.length > 10)
                                recentShapes.pop();
                            const allPitches = note.pitches.concat(pitchBends);
                            for (let i = 0; i < allPitches.length; i++) {
                                const pitch = allPitches[i];
                                const pitchIndex = recentPitches.indexOf(pitch);
                                if (pitchIndex == -1) {
                                    let interval = 0;
                                    let pitchIter = lastPitch;
                                    if (pitchIter < pitch) {
                                        while (pitchIter != pitch) {
                                            pitchIter++;
                                            if (recentPitches.indexOf(pitchIter) == -1)
                                                interval++;
                                        }
                                    }
                                    else {
                                        while (pitchIter != pitch) {
                                            pitchIter--;
                                            if (recentPitches.indexOf(pitchIter) == -1)
                                                interval--;
                                        }
                                    }
                                    bits.write(1, 0);
                                    bits.writePitchInterval(interval);
                                }
                                else {
                                    bits.write(1, 1);
                                    bits.write(3, pitchIndex);
                                    recentPitches.splice(pitchIndex, 1);
                                }
                                recentPitches.unshift(pitch);
                                if (recentPitches.length > 8)
                                    recentPitches.pop();
                                if (i == note.pitches.length - 1) {
                                    lastPitch = note.pitches[0];
                                }
                                else {
                                    lastPitch = pitch;
                                }
                            }
                            curPart = note.end;
                        }
                        if (curPart < this.beatsPerBar * beepbox.Config.partsPerBeat) {
                            bits.write(2, 0);
                            bits.writePartDuration(this.beatsPerBar * beepbox.Config.partsPerBeat - curPart);
                        }
                    }
                    else {
                        bits.write(1, 0);
                    }
                }
            }
            let stringLength = bits.lengthBase64();
            let digits = [];
            while (stringLength > 0) {
                digits.unshift(base64IntToCharCode[stringLength & 0x3f]);
                stringLength = stringLength >> 6;
            }
            buffer.push(base64IntToCharCode[digits.length]);
            Array.prototype.push.apply(buffer, digits);
            bits.encodeBase64(buffer);
            const maxApplyArgs = 64000;
            if (buffer.length < maxApplyArgs) {
                return String.fromCharCode.apply(null, buffer);
            }
            else {
                let result = "";
                for (let i = 0; i < buffer.length; i += maxApplyArgs) {
                    result += String.fromCharCode.apply(null, buffer.slice(i, i + maxApplyArgs));
                }
                return result;
            }
        }
        fromBase64String(compressed) {
            if (compressed == null || compressed == "") {
                this.initToDefault(true);
                return;
            }
            let charIndex = 0;
            while (compressed.charCodeAt(charIndex) <= 32)
                charIndex++;
            if (compressed.charCodeAt(charIndex) == 35)
                charIndex++;
            if (compressed.charCodeAt(charIndex) == 123) {
                this.fromJsonObject(JSON.parse(charIndex == 0 ? compressed : compressed.substring(charIndex)));
                return;
            }
            const version = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
            if (version == -1 || version > Song._latestVersion || version < Song._oldestVersion)
                return;
            const beforeThree = version < 3;
            const beforeFour = version < 4;
            const beforeFive = version < 5;
            const beforeSix = version < 6;
            const beforeSeven = version < 7;
            const beforeEight = version < 8;
            this.initToDefault(beforeSix);
            if (beforeThree) {
                for (const channel of this.channels)
                    channel.instruments[0].transition = 0;
                this.channels[3].instruments[0].chipNoise = 0;
            }
            let instrumentChannelIterator = 0;
            let instrumentIndexIterator = -1;
            while (charIndex < compressed.length) {
                const command = compressed.charCodeAt(charIndex++);
                let channel;
                if (command == 110) {
                    this.pitchChannelCount = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                    this.noiseChannelCount = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                    this.pitchChannelCount = clamp(beepbox.Config.pitchChannelCountMin, beepbox.Config.pitchChannelCountMax + 1, this.pitchChannelCount);
                    this.noiseChannelCount = clamp(beepbox.Config.noiseChannelCountMin, beepbox.Config.noiseChannelCountMax + 1, this.noiseChannelCount);
                    for (let channelIndex = this.channels.length; channelIndex < this.getChannelCount(); channelIndex++) {
                        this.channels[channelIndex] = new Channel();
                    }
                    this.channels.length = this.getChannelCount();
                }
                else if (command == 115) {
                    this.scale = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                    if (beforeThree && this.scale == 10)
                        this.scale = 11;
                }
                else if (command == 107) {
                    if (beforeSeven) {
                        this.key = clamp(0, beepbox.Config.keys.length, 11 - base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                    else {
                        this.key = clamp(0, beepbox.Config.keys.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                }
                else if (command == 108) {
                    if (beforeFive) {
                        this.loopStart = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                    }
                    else {
                        this.loopStart = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                    }
                }
                else if (command == 101) {
                    if (beforeFive) {
                        this.loopLength = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                    }
                    else {
                        this.loopLength = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1;
                    }
                }
                else if (command == 116) {
                    if (beforeFour) {
                        this.tempo = [95, 120, 151, 190][base64CharCodeToInt[compressed.charCodeAt(charIndex++)]];
                    }
                    else if (beforeSeven) {
                        this.tempo = [88, 95, 103, 111, 120, 130, 140, 151, 163, 176, 190, 206, 222, 240, 259][base64CharCodeToInt[compressed.charCodeAt(charIndex++)]];
                    }
                    else {
                        this.tempo = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) | (base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                    this.tempo = clamp(beepbox.Config.tempoMin, beepbox.Config.tempoMax + 1, this.tempo);
                }
                else if (command == 109) {
                    this.reverb = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                    this.reverb = clamp(0, beepbox.Config.reverbRange, this.reverb);
                }
                else if (command == 97) {
                    if (beforeThree) {
                        this.beatsPerBar = [6, 7, 8, 9, 10][base64CharCodeToInt[compressed.charCodeAt(charIndex++)]];
                    }
                    else {
                        this.beatsPerBar = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1;
                    }
                    this.beatsPerBar = Math.max(beepbox.Config.beatsPerBarMin, Math.min(beepbox.Config.beatsPerBarMax, this.beatsPerBar));
                }
                else if (command == 103) {
                    this.barCount = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1;
                    this.barCount = Math.max(beepbox.Config.barCountMin, Math.min(beepbox.Config.barCountMax, this.barCount));
                    for (let channel = 0; channel < this.getChannelCount(); channel++) {
                        for (let bar = this.channels[channel].bars.length; bar < this.barCount; bar++) {
                            this.channels[channel].bars[bar] = 1;
                        }
                        this.channels[channel].bars.length = this.barCount;
                    }
                }
                else if (command == 106) {
                    if (beforeEight) {
                        this.patternsPerChannel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1;
                    }
                    else {
                        this.patternsPerChannel = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) + base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1;
                    }
                    this.patternsPerChannel = Math.max(1, Math.min(beepbox.Config.barCountMax, this.patternsPerChannel));
                    for (let channel = 0; channel < this.getChannelCount(); channel++) {
                        for (let pattern = this.channels[channel].patterns.length; pattern < this.patternsPerChannel; pattern++) {
                            this.channels[channel].patterns[pattern] = new Pattern();
                        }
                        this.channels[channel].patterns.length = this.patternsPerChannel;
                    }
                }
                else if (command == 105) {
                    this.instrumentsPerChannel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1;
                    this.instrumentsPerChannel = Math.max(beepbox.Config.instrumentsPerChannelMin, Math.min(beepbox.Config.instrumentsPerChannelMax, this.instrumentsPerChannel));
                    for (let channel = 0; channel < this.getChannelCount(); channel++) {
                        const isNoiseChannel = channel >= this.pitchChannelCount;
                        for (let instrumentIndex = this.channels[channel].instruments.length; instrumentIndex < this.instrumentsPerChannel; instrumentIndex++) {
                            this.channels[channel].instruments[instrumentIndex] = new Instrument(isNoiseChannel);
                        }
                        this.channels[channel].instruments.length = this.instrumentsPerChannel;
                        if (beforeSix) {
                            for (let instrumentIndex = 0; instrumentIndex < this.instrumentsPerChannel; instrumentIndex++) {
                                this.channels[channel].instruments[instrumentIndex].setTypeAndReset(isNoiseChannel ? 2 : 0, isNoiseChannel);
                            }
                        }
                    }
                }
                else if (command == 114) {
                    this.rhythm = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                }
                else if (command == 111) {
                    if (beforeThree) {
                        channel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        this.channels[channel].octave = clamp(0, beepbox.Config.scrollableOctaves + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                    else {
                        for (channel = 0; channel < this.getChannelCount(); channel++) {
                            this.channels[channel].octave = clamp(0, beepbox.Config.scrollableOctaves + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        }
                    }
                }
                else if (command == 84) {
                    instrumentIndexIterator++;
                    if (instrumentIndexIterator >= this.instrumentsPerChannel) {
                        instrumentChannelIterator++;
                        instrumentIndexIterator = 0;
                    }
                    const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                    const instrumentType = clamp(0, 7, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    instrument.setTypeAndReset(instrumentType, instrumentChannelIterator >= this.pitchChannelCount);
                }
                else if (command == 117) {
                    const presetValue = (base64CharCodeToInt[compressed.charCodeAt(charIndex++)] << 6) | (base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].preset = presetValue;
                }
                else if (command == 119) {
                    if (beforeThree) {
                        const legacyWaves = [1, 2, 3, 4, 5, 6, 7, 8, 0];
                        channel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        this.channels[channel].instruments[0].chipWave = clamp(0, beepbox.Config.chipWaves.length, legacyWaves[base64CharCodeToInt[compressed.charCodeAt(charIndex++)]] | 0);
                    }
                    else if (beforeSix) {
                        const legacyWaves = [1, 2, 3, 4, 5, 6, 7, 8, 0];
                        for (channel = 0; channel < this.getChannelCount(); channel++) {
                            for (let i = 0; i < this.instrumentsPerChannel; i++) {
                                if (channel >= this.pitchChannelCount) {
                                    this.channels[channel].instruments[i].chipNoise = clamp(0, beepbox.Config.chipNoises.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                }
                                else {
                                    this.channels[channel].instruments[i].chipWave = clamp(0, beepbox.Config.chipWaves.length, legacyWaves[base64CharCodeToInt[compressed.charCodeAt(charIndex++)]] | 0);
                                }
                            }
                        }
                    }
                    else if (beforeSeven) {
                        const legacyWaves = [1, 2, 3, 4, 5, 6, 7, 8, 0];
                        if (instrumentChannelIterator >= this.pitchChannelCount) {
                            this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].chipNoise = clamp(0, beepbox.Config.chipNoises.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        }
                        else {
                            this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].chipWave = clamp(0, beepbox.Config.chipWaves.length, legacyWaves[base64CharCodeToInt[compressed.charCodeAt(charIndex++)]] | 0);
                        }
                    }
                    else {
                        if (instrumentChannelIterator >= this.pitchChannelCount) {
                            this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].chipNoise = clamp(0, beepbox.Config.chipNoises.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        }
                        else {
                            this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].chipWave = clamp(0, beepbox.Config.chipWaves.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        }
                    }
                }
                else if (command == 102) {
                    if (beforeSeven) {
                        const legacyToCutoff = [10, 6, 3, 0, 8, 5, 2];
                        const legacyToEnvelope = [1, 1, 1, 1, 18, 19, 20];
                        const filterNames = ["none", "bright", "medium", "soft", "decay bright", "decay medium", "decay soft"];
                        if (beforeThree) {
                            channel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            const instrument = this.channels[channel].instruments[0];
                            const legacyFilter = [1, 3, 4, 5][clamp(0, filterNames.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)])];
                            instrument.filterCutoff = legacyToCutoff[legacyFilter];
                            instrument.filterEnvelope = legacyToEnvelope[legacyFilter];
                            instrument.filterResonance = 0;
                        }
                        else if (beforeSix) {
                            for (channel = 0; channel < this.getChannelCount(); channel++) {
                                for (let i = 0; i < this.instrumentsPerChannel; i++) {
                                    const instrument = this.channels[channel].instruments[i];
                                    if (channel < this.pitchChannelCount) {
                                        const legacyFilter = clamp(0, filterNames.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)] + 1);
                                        instrument.filterCutoff = legacyToCutoff[legacyFilter];
                                        instrument.filterEnvelope = legacyToEnvelope[legacyFilter];
                                        instrument.filterResonance = 0;
                                    }
                                    else {
                                        instrument.filterCutoff = 10;
                                        instrument.filterEnvelope = 1;
                                        instrument.filterResonance = 0;
                                    }
                                }
                            }
                        }
                        else {
                            const legacyFilter = clamp(0, filterNames.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                            instrument.filterCutoff = legacyToCutoff[legacyFilter];
                            instrument.filterEnvelope = legacyToEnvelope[legacyFilter];
                            instrument.filterResonance = 0;
                        }
                    }
                    else {
                        const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                        instrument.filterCutoff = clamp(0, beepbox.Config.filterCutoffRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                }
                else if (command == 121) {
                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].filterResonance = clamp(0, beepbox.Config.filterResonanceRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                }
                else if (command == 122) {
                    const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                    if (instrument.type == 4) {
                        for (let i = 0; i < beepbox.Config.drumCount; i++) {
                            instrument.drumsetEnvelopes[i] = clamp(0, beepbox.Config.envelopes.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        }
                    }
                    else {
                        instrument.filterEnvelope = clamp(0, beepbox.Config.envelopes.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                }
                else if (command == 87) {
                    const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                    instrument.pulseWidth = clamp(0, beepbox.Config.pulseWidthRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    instrument.pulseEnvelope = clamp(0, beepbox.Config.envelopes.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                }
                else if (command == 100) {
                    if (beforeThree) {
                        channel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        this.channels[channel].instruments[0].transition = clamp(0, beepbox.Config.transitions.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                    else if (beforeSix) {
                        for (channel = 0; channel < this.getChannelCount(); channel++) {
                            for (let i = 0; i < this.instrumentsPerChannel; i++) {
                                this.channels[channel].instruments[i].transition = clamp(0, beepbox.Config.transitions.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                            }
                        }
                    }
                    else {
                        this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].transition = clamp(0, beepbox.Config.transitions.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                }
                else if (command == 99) {
                    if (beforeThree) {
                        const legacyEffects = [0, 3, 2, 0];
                        const legacyEnvelopes = [1, 1, 1, 13];
                        channel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        const effect = clamp(0, legacyEffects.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        const instrument = this.channels[channel].instruments[0];
                        instrument.vibrato = legacyEffects[effect];
                        instrument.filterEnvelope = (instrument.filterEnvelope == 1)
                            ? legacyEnvelopes[effect]
                            : instrument.filterEnvelope;
                    }
                    else if (beforeSix) {
                        const legacyEffects = [0, 1, 2, 3, 0, 0];
                        const legacyEnvelopes = [1, 1, 1, 1, 16, 13];
                        for (channel = 0; channel < this.getChannelCount(); channel++) {
                            for (let i = 0; i < this.instrumentsPerChannel; i++) {
                                const effect = clamp(0, legacyEffects.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                const instrument = this.channels[channel].instruments[i];
                                instrument.vibrato = legacyEffects[effect];
                                instrument.filterEnvelope = (instrument.filterEnvelope == 1)
                                    ? legacyEnvelopes[effect]
                                    : instrument.filterEnvelope;
                            }
                        }
                    }
                    else if (beforeSeven) {
                        const legacyEffects = [0, 1, 2, 3, 0, 0];
                        const legacyEnvelopes = [1, 1, 1, 1, 16, 13];
                        const effect = clamp(0, legacyEffects.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                        instrument.vibrato = legacyEffects[effect];
                        instrument.filterEnvelope = (instrument.filterEnvelope == 1)
                            ? legacyEnvelopes[effect]
                            : instrument.filterEnvelope;
                    }
                    else {
                        const vibrato = clamp(0, beepbox.Config.vibratos.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].vibrato = vibrato;
                    }
                }
                else if (command == 104) {
                    if (beforeThree) {
                        channel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        this.channels[channel].instruments[0].interval = clamp(0, beepbox.Config.intervals.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                    else if (beforeSix) {
                        for (channel = 0; channel < this.getChannelCount(); channel++) {
                            for (let i = 0; i < this.instrumentsPerChannel; i++) {
                                const originalValue = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                                let interval = clamp(0, beepbox.Config.intervals.length, originalValue);
                                if (originalValue == 8) {
                                    interval = 2;
                                    this.channels[channel].instruments[i].chord = 3;
                                }
                                this.channels[channel].instruments[i].interval = interval;
                            }
                        }
                    }
                    else if (beforeSeven) {
                        const originalValue = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        let interval = clamp(0, beepbox.Config.intervals.length, originalValue);
                        if (originalValue == 8) {
                            interval = 2;
                            this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].chord = 3;
                        }
                        this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].interval = interval;
                    }
                    else {
                        this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].interval = clamp(0, beepbox.Config.intervals.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                }
                else if (command == 67) {
                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].chord = clamp(0, beepbox.Config.chords.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                }
                else if (command == 113) {
                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].effects = clamp(0, beepbox.Config.effectsNames.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                }
                else if (command == 118) {
                    if (beforeThree) {
                        channel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        const instrument = this.channels[channel].instruments[0];
                        instrument.volume = clamp(0, beepbox.Config.volumeRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        if (instrument.volume == 5)
                            instrument.volume = beepbox.Config.volumeRange - 1;
                    }
                    else if (beforeSix) {
                        for (channel = 0; channel < this.getChannelCount(); channel++) {
                            for (let i = 0; i < this.instrumentsPerChannel; i++) {
                                const instrument = this.channels[channel].instruments[i];
                                instrument.volume = clamp(0, beepbox.Config.volumeRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                                if (instrument.volume == 5)
                                    instrument.volume = beepbox.Config.volumeRange - 1;
                            }
                        }
                    }
                    else if (beforeSeven) {
                        const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                        instrument.volume = clamp(0, beepbox.Config.volumeRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                        if (instrument.volume == 5)
                            instrument.volume = beepbox.Config.volumeRange - 1;
                    }
                    else {
                        const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                        instrument.volume = clamp(0, beepbox.Config.volumeRange, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                }
                else if (command == 76) {
                    const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                    instrument.pan = clamp(0, beepbox.Config.panMax + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                }
                else if (command == 65) {
                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].algorithm = clamp(0, beepbox.Config.algorithms.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                }
                else if (command == 70) {
                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].feedbackType = clamp(0, beepbox.Config.feedbacks.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                }
                else if (command == 66) {
                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].feedbackAmplitude = clamp(0, beepbox.Config.operatorAmplitudeMax + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                }
                else if (command == 86) {
                    this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].feedbackEnvelope = clamp(0, beepbox.Config.envelopes.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                }
                else if (command == 81) {
                    for (let o = 0; o < beepbox.Config.operatorCount; o++) {
                        this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].operators[o].frequency = clamp(0, beepbox.Config.operatorFrequencies.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                }
                else if (command == 80) {
                    for (let o = 0; o < beepbox.Config.operatorCount; o++) {
                        this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].operators[o].amplitude = clamp(0, beepbox.Config.operatorAmplitudeMax + 1, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                }
                else if (command == 69) {
                    for (let o = 0; o < beepbox.Config.operatorCount; o++) {
                        this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator].operators[o].envelope = clamp(0, beepbox.Config.envelopes.length, base64CharCodeToInt[compressed.charCodeAt(charIndex++)]);
                    }
                }
                else if (command == 83) {
                    const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                    if (instrument.type == 3) {
                        const byteCount = Math.ceil(beepbox.Config.spectrumControlPoints * beepbox.Config.spectrumControlPointBits / 6);
                        const bits = new BitFieldReader(compressed, charIndex, charIndex + byteCount);
                        for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                            instrument.spectrumWave.spectrum[i] = bits.read(beepbox.Config.spectrumControlPointBits);
                        }
                        instrument.spectrumWave.markCustomWaveDirty();
                        charIndex += byteCount;
                    }
                    else if (instrument.type == 4) {
                        const byteCount = Math.ceil(beepbox.Config.drumCount * beepbox.Config.spectrumControlPoints * beepbox.Config.spectrumControlPointBits / 6);
                        const bits = new BitFieldReader(compressed, charIndex, charIndex + byteCount);
                        for (let j = 0; j < beepbox.Config.drumCount; j++) {
                            for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                                instrument.drumsetSpectrumWaves[j].spectrum[i] = bits.read(beepbox.Config.spectrumControlPointBits);
                            }
                            instrument.drumsetSpectrumWaves[j].markCustomWaveDirty();
                        }
                        charIndex += byteCount;
                    }
                    else {
                        throw new Error("Unhandled instrument type for spectrum song tag code.");
                    }
                }
                else if (command == 72) {
                    const instrument = this.channels[instrumentChannelIterator].instruments[instrumentIndexIterator];
                    const byteCount = Math.ceil(beepbox.Config.harmonicsControlPoints * beepbox.Config.harmonicsControlPointBits / 6);
                    const bits = new BitFieldReader(compressed, charIndex, charIndex + byteCount);
                    for (let i = 0; i < beepbox.Config.harmonicsControlPoints; i++) {
                        instrument.harmonicsWave.harmonics[i] = bits.read(beepbox.Config.harmonicsControlPointBits);
                    }
                    instrument.harmonicsWave.markCustomWaveDirty();
                    charIndex += byteCount;
                }
                else if (command == 98) {
                    let subStringLength;
                    if (beforeThree) {
                        channel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        const barCount = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        subStringLength = Math.ceil(barCount * 0.5);
                        const bits = new BitFieldReader(compressed, charIndex, charIndex + subStringLength);
                        for (let i = 0; i < barCount; i++) {
                            this.channels[channel].bars[i] = bits.read(3) + 1;
                        }
                    }
                    else if (beforeFive) {
                        let neededBits = 0;
                        while ((1 << neededBits) < this.patternsPerChannel)
                            neededBits++;
                        subStringLength = Math.ceil(this.getChannelCount() * this.barCount * neededBits / 6);
                        const bits = new BitFieldReader(compressed, charIndex, charIndex + subStringLength);
                        for (channel = 0; channel < this.getChannelCount(); channel++) {
                            for (let i = 0; i < this.barCount; i++) {
                                this.channels[channel].bars[i] = bits.read(neededBits) + 1;
                            }
                        }
                    }
                    else {
                        let neededBits = 0;
                        while ((1 << neededBits) < this.patternsPerChannel + 1)
                            neededBits++;
                        subStringLength = Math.ceil(this.getChannelCount() * this.barCount * neededBits / 6);
                        const bits = new BitFieldReader(compressed, charIndex, charIndex + subStringLength);
                        for (channel = 0; channel < this.getChannelCount(); channel++) {
                            for (let i = 0; i < this.barCount; i++) {
                                this.channels[channel].bars[i] = bits.read(neededBits);
                            }
                        }
                    }
                    charIndex += subStringLength;
                }
                else if (command == 112) {
                    let bitStringLength = 0;
                    if (beforeThree) {
                        channel = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        charIndex++;
                        bitStringLength = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        bitStringLength = bitStringLength << 6;
                        bitStringLength += base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                    }
                    else {
                        channel = 0;
                        let bitStringLengthLength = base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                        while (bitStringLengthLength > 0) {
                            bitStringLength = bitStringLength << 6;
                            bitStringLength += base64CharCodeToInt[compressed.charCodeAt(charIndex++)];
                            bitStringLengthLength--;
                        }
                    }
                    const bits = new BitFieldReader(compressed, charIndex, charIndex + bitStringLength);
                    charIndex += bitStringLength;
                    let neededInstrumentBits = 0;
                    while ((1 << neededInstrumentBits) < this.instrumentsPerChannel)
                        neededInstrumentBits++;
                    while (true) {
                        const isNoiseChannel = this.getChannelIsNoise(channel);
                        const octaveOffset = isNoiseChannel ? 0 : this.channels[channel].octave * 12;
                        let note = null;
                        let pin = null;
                        let lastPitch = (isNoiseChannel ? 4 : 12) + octaveOffset;
                        const recentPitches = isNoiseChannel ? [4, 6, 7, 2, 3, 8, 0, 10] : [12, 19, 24, 31, 36, 7, 0];
                        const recentShapes = [];
                        for (let i = 0; i < recentPitches.length; i++) {
                            recentPitches[i] += octaveOffset;
                        }
                        for (let i = 0; i < this.patternsPerChannel; i++) {
                            const newPattern = this.channels[channel].patterns[i];
                            newPattern.reset();
                            newPattern.instrument = bits.read(neededInstrumentBits);
                            if (!beforeThree && bits.read(1) == 0)
                                continue;
                            let curPart = 0;
                            const newNotes = newPattern.notes;
                            while (curPart < this.beatsPerBar * beepbox.Config.partsPerBeat) {
                                const useOldShape = bits.read(1) == 1;
                                let newNote = false;
                                let shapeIndex = 0;
                                if (useOldShape) {
                                    shapeIndex = bits.readLongTail(0, 0);
                                }
                                else {
                                    newNote = bits.read(1) == 1;
                                }
                                if (!useOldShape && !newNote) {
                                    const restLength = beforeSeven
                                        ? bits.readLegacyPartDuration() * beepbox.Config.partsPerBeat / beepbox.Config.rhythms[this.rhythm].stepsPerBeat
                                        : bits.readPartDuration();
                                    curPart += restLength;
                                }
                                else {
                                    let shape;
                                    let pinObj;
                                    let pitch;
                                    if (useOldShape) {
                                        shape = recentShapes[shapeIndex];
                                        recentShapes.splice(shapeIndex, 1);
                                    }
                                    else {
                                        shape = {};
                                        shape.pitchCount = 1;
                                        while (shape.pitchCount < 4 && bits.read(1) == 1)
                                            shape.pitchCount++;
                                        shape.pinCount = bits.readPinCount();
                                        shape.initialVolume = bits.read(2);
                                        shape.pins = [];
                                        shape.length = 0;
                                        shape.bendCount = 0;
                                        for (let j = 0; j < shape.pinCount; j++) {
                                            pinObj = {};
                                            pinObj.pitchBend = bits.read(1) == 1;
                                            if (pinObj.pitchBend)
                                                shape.bendCount++;
                                            shape.length += beforeSeven
                                                ? bits.readLegacyPartDuration() * beepbox.Config.partsPerBeat / beepbox.Config.rhythms[this.rhythm].stepsPerBeat
                                                : bits.readPartDuration();
                                            pinObj.time = shape.length;
                                            pinObj.volume = bits.read(2);
                                            shape.pins.push(pinObj);
                                        }
                                    }
                                    recentShapes.unshift(shape);
                                    if (recentShapes.length > 10)
                                        recentShapes.pop();
                                    note = new Note(0, curPart, curPart + shape.length, shape.initialVolume);
                                    note.pitches = [];
                                    note.pins.length = 1;
                                    const pitchBends = [];
                                    for (let j = 0; j < shape.pitchCount + shape.bendCount; j++) {
                                        const useOldPitch = bits.read(1) == 1;
                                        if (!useOldPitch) {
                                            const interval = bits.readPitchInterval();
                                            pitch = lastPitch;
                                            let intervalIter = interval;
                                            while (intervalIter > 0) {
                                                pitch++;
                                                while (recentPitches.indexOf(pitch) != -1)
                                                    pitch++;
                                                intervalIter--;
                                            }
                                            while (intervalIter < 0) {
                                                pitch--;
                                                while (recentPitches.indexOf(pitch) != -1)
                                                    pitch--;
                                                intervalIter++;
                                            }
                                        }
                                        else {
                                            const pitchIndex = bits.read(3);
                                            pitch = recentPitches[pitchIndex];
                                            recentPitches.splice(pitchIndex, 1);
                                        }
                                        recentPitches.unshift(pitch);
                                        if (recentPitches.length > 8)
                                            recentPitches.pop();
                                        if (j < shape.pitchCount) {
                                            note.pitches.push(pitch);
                                        }
                                        else {
                                            pitchBends.push(pitch);
                                        }
                                        if (j == shape.pitchCount - 1) {
                                            lastPitch = note.pitches[0];
                                        }
                                        else {
                                            lastPitch = pitch;
                                        }
                                    }
                                    pitchBends.unshift(note.pitches[0]);
                                    for (const pinObj of shape.pins) {
                                        if (pinObj.pitchBend)
                                            pitchBends.shift();
                                        pin = makeNotePin(pitchBends[0] - note.pitches[0], pinObj.time, pinObj.volume);
                                        note.pins.push(pin);
                                    }
                                    curPart = note.end;
                                    newNotes.push(note);
                                }
                            }
                        }
                        if (beforeThree) {
                            break;
                        }
                        else {
                            channel++;
                            if (channel >= this.getChannelCount())
                                break;
                        }
                    }
                }
            }
        }
        toJsonObject(enableIntro = true, loopCount = 1, enableOutro = true) {
            const channelArray = [];
            for (let channel = 0; channel < this.getChannelCount(); channel++) {
                const instrumentArray = [];
                const isNoiseChannel = this.getChannelIsNoise(channel);
                for (let i = 0; i < this.instrumentsPerChannel; i++) {
                    instrumentArray.push(this.channels[channel].instruments[i].toJsonObject());
                }
                const patternArray = [];
                for (const pattern of this.channels[channel].patterns) {
                    const noteArray = [];
                    for (const note of pattern.notes) {
                        const pointArray = [];
                        for (const pin of note.pins) {
                            pointArray.push({
                                "tick": (pin.time + note.start) * beepbox.Config.rhythms[this.rhythm].stepsPerBeat / beepbox.Config.partsPerBeat,
                                "pitchBend": pin.interval,
                                "volume": Math.round(pin.volume * 100 / 3),
                            });
                        }
                        noteArray.push({
                            "pitches": note.pitches,
                            "points": pointArray,
                        });
                    }
                    patternArray.push({
                        "instrument": pattern.instrument + 1,
                        "notes": noteArray,
                    });
                }
                const sequenceArray = [];
                if (enableIntro)
                    for (let i = 0; i < this.loopStart; i++) {
                        sequenceArray.push(this.channels[channel].bars[i]);
                    }
                for (let l = 0; l < loopCount; l++)
                    for (let i = this.loopStart; i < this.loopStart + this.loopLength; i++) {
                        sequenceArray.push(this.channels[channel].bars[i]);
                    }
                if (enableOutro)
                    for (let i = this.loopStart + this.loopLength; i < this.barCount; i++) {
                        sequenceArray.push(this.channels[channel].bars[i]);
                    }
                channelArray.push({
                    "type": isNoiseChannel ? "drum" : "pitch",
                    "octaveScrollBar": this.channels[channel].octave,
                    "instruments": instrumentArray,
                    "patterns": patternArray,
                    "sequence": sequenceArray,
                });
            }
            return {
                "format": Song._format,
                "version": Song._latestVersion,
                "scale": beepbox.Config.scales[this.scale].name,
                "key": beepbox.Config.keys[this.key].name,
                "introBars": this.loopStart,
                "loopBars": this.loopLength,
                "beatsPerBar": this.beatsPerBar,
                "ticksPerBeat": beepbox.Config.rhythms[this.rhythm].stepsPerBeat,
                "beatsPerMinute": this.tempo,
                "reverb": this.reverb,
                "channels": channelArray,
            };
        }
        fromJsonObject(jsonObject) {
            this.initToDefault(true);
            if (!jsonObject)
                return;
            this.scale = 11;
            if (jsonObject["scale"] != undefined) {
                const oldScaleNames = { "romani :)": 8, "romani :(": 9 };
                const scale = oldScaleNames[jsonObject["scale"]] != undefined ? oldScaleNames[jsonObject["scale"]] : beepbox.Config.scales.findIndex(scale => scale.name == jsonObject["scale"]);
                if (scale != -1)
                    this.scale = scale;
            }
            if (jsonObject["key"] != undefined) {
                if (typeof (jsonObject["key"]) == "number") {
                    this.key = ((jsonObject["key"] + 1200) >>> 0) % beepbox.Config.keys.length;
                }
                else if (typeof (jsonObject["key"]) == "string") {
                    const key = jsonObject["key"];
                    const letter = key.charAt(0).toUpperCase();
                    const symbol = key.charAt(1).toLowerCase();
                    const letterMap = { "C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11 };
                    const accidentalMap = { "#": 1, "â™¯": 1, "b": -1, "â™­": -1 };
                    let index = letterMap[letter];
                    const offset = accidentalMap[symbol];
                    if (index != undefined) {
                        if (offset != undefined)
                            index += offset;
                        if (index < 0)
                            index += 12;
                        index = index % 12;
                        this.key = index;
                    }
                }
            }
            if (jsonObject["beatsPerMinute"] != undefined) {
                this.tempo = clamp(beepbox.Config.tempoMin, beepbox.Config.tempoMax + 1, jsonObject["beatsPerMinute"] | 0);
            }
            if (jsonObject["reverb"] != undefined) {
                this.reverb = clamp(0, beepbox.Config.reverbRange, jsonObject["reverb"] | 0);
            }
            if (jsonObject["beatsPerBar"] != undefined) {
                this.beatsPerBar = Math.max(beepbox.Config.beatsPerBarMin, Math.min(beepbox.Config.beatsPerBarMax, jsonObject["beatsPerBar"] | 0));
            }
            let importedPartsPerBeat = 4;
            if (jsonObject["ticksPerBeat"] != undefined) {
                importedPartsPerBeat = (jsonObject["ticksPerBeat"] | 0) || 4;
                this.rhythm = beepbox.Config.rhythms.findIndex(rhythm => rhythm.stepsPerBeat == importedPartsPerBeat);
                if (this.rhythm == -1) {
                    this.rhythm = 1;
                }
            }
            let maxInstruments = 1;
            let maxPatterns = 1;
            let maxBars = 1;
            if (jsonObject["channels"]) {
                for (const channelObject of jsonObject["channels"]) {
                    if (channelObject["instruments"])
                        maxInstruments = Math.max(maxInstruments, channelObject["instruments"].length | 0);
                    if (channelObject["patterns"])
                        maxPatterns = Math.max(maxPatterns, channelObject["patterns"].length | 0);
                    if (channelObject["sequence"])
                        maxBars = Math.max(maxBars, channelObject["sequence"].length | 0);
                }
            }
            this.instrumentsPerChannel = maxInstruments;
            this.patternsPerChannel = maxPatterns;
            this.barCount = maxBars;
            if (jsonObject["introBars"] != undefined) {
                this.loopStart = clamp(0, this.barCount, jsonObject["introBars"] | 0);
            }
            if (jsonObject["loopBars"] != undefined) {
                this.loopLength = clamp(1, this.barCount - this.loopStart + 1, jsonObject["loopBars"] | 0);
            }
            const newPitchChannels = [];
            const newNoiseChannels = [];
            if (jsonObject["channels"]) {
                for (let channelIndex = 0; channelIndex < jsonObject["channels"].length; channelIndex++) {
                    let channelObject = jsonObject["channels"][channelIndex];
                    const channel = new Channel();
                    let isNoiseChannel = false;
                    if (channelObject["type"] != undefined) {
                        isNoiseChannel = (channelObject["type"] == "drum");
                    }
                    else {
                        isNoiseChannel = (channelIndex >= 3);
                    }
                    if (isNoiseChannel) {
                        newNoiseChannels.push(channel);
                    }
                    else {
                        newPitchChannels.push(channel);
                    }
                    if (channelObject["octaveScrollBar"] != undefined) {
                        channel.octave = clamp(0, beepbox.Config.scrollableOctaves + 1, channelObject["octaveScrollBar"] | 0);
                    }
                    for (let i = channel.instruments.length; i < this.instrumentsPerChannel; i++) {
                        channel.instruments[i] = new Instrument(isNoiseChannel);
                    }
                    channel.instruments.length = this.instrumentsPerChannel;
                    for (let i = channel.patterns.length; i < this.patternsPerChannel; i++) {
                        channel.patterns[i] = new Pattern();
                    }
                    channel.patterns.length = this.patternsPerChannel;
                    for (let i = 0; i < this.barCount; i++) {
                        channel.bars[i] = 1;
                    }
                    channel.bars.length = this.barCount;
                    for (let i = 0; i < this.instrumentsPerChannel; i++) {
                        const instrument = channel.instruments[i];
                        instrument.fromJsonObject(channelObject["instruments"][i], isNoiseChannel);
                    }
                    for (let i = 0; i < this.patternsPerChannel; i++) {
                        const pattern = channel.patterns[i];
                        let patternObject = undefined;
                        if (channelObject["patterns"])
                            patternObject = channelObject["patterns"][i];
                        if (patternObject == undefined)
                            continue;
                        pattern.instrument = clamp(0, this.instrumentsPerChannel, (patternObject["instrument"] | 0) - 1);
                        if (patternObject["notes"] && patternObject["notes"].length > 0) {
                            const maxNoteCount = Math.min(this.beatsPerBar * beepbox.Config.partsPerBeat, patternObject["notes"].length >>> 0);
                            let tickClock = 0;
                            for (let j = 0; j < patternObject["notes"].length; j++) {
                                if (j >= maxNoteCount)
                                    break;
                                const noteObject = patternObject["notes"][j];
                                if (!noteObject || !noteObject["pitches"] || !(noteObject["pitches"].length >= 1) || !noteObject["points"] || !(noteObject["points"].length >= 2)) {
                                    continue;
                                }
                                const note = new Note(0, 0, 0, 0);
                                note.pitches = [];
                                note.pins = [];
                                for (let k = 0; k < noteObject["pitches"].length; k++) {
                                    const pitch = noteObject["pitches"][k] | 0;
                                    if (note.pitches.indexOf(pitch) != -1)
                                        continue;
                                    note.pitches.push(pitch);
                                    if (note.pitches.length >= 4)
                                        break;
                                }
                                if (note.pitches.length < 1)
                                    continue;
                                let noteClock = tickClock;
                                let startInterval = 0;
                                for (let k = 0; k < noteObject["points"].length; k++) {
                                    const pointObject = noteObject["points"][k];
                                    if (pointObject == undefined || pointObject["tick"] == undefined)
                                        continue;
                                    const interval = (pointObject["pitchBend"] == undefined) ? 0 : (pointObject["pitchBend"] | 0);
                                    const time = Math.round((+pointObject["tick"]) * beepbox.Config.partsPerBeat / importedPartsPerBeat);
                                    const volume = (pointObject["volume"] == undefined) ? 3 : Math.max(0, Math.min(3, Math.round((pointObject["volume"] | 0) * 3 / 100)));
                                    if (time > this.beatsPerBar * beepbox.Config.partsPerBeat)
                                        continue;
                                    if (note.pins.length == 0) {
                                        if (time < noteClock)
                                            continue;
                                        note.start = time;
                                        startInterval = interval;
                                    }
                                    else {
                                        if (time <= noteClock)
                                            continue;
                                    }
                                    noteClock = time;
                                    note.pins.push(makeNotePin(interval - startInterval, time - note.start, volume));
                                }
                                if (note.pins.length < 2)
                                    continue;
                                note.end = note.pins[note.pins.length - 1].time + note.start;
                                const maxPitch = isNoiseChannel ? beepbox.Config.drumCount - 1 : beepbox.Config.maxPitch;
                                let lowestPitch = maxPitch;
                                let highestPitch = 0;
                                for (let k = 0; k < note.pitches.length; k++) {
                                    note.pitches[k] += startInterval;
                                    if (note.pitches[k] < 0 || note.pitches[k] > maxPitch) {
                                        note.pitches.splice(k, 1);
                                        k--;
                                    }
                                    if (note.pitches[k] < lowestPitch)
                                        lowestPitch = note.pitches[k];
                                    if (note.pitches[k] > highestPitch)
                                        highestPitch = note.pitches[k];
                                }
                                if (note.pitches.length < 1)
                                    continue;
                                for (let k = 0; k < note.pins.length; k++) {
                                    const pin = note.pins[k];
                                    if (pin.interval + lowestPitch < 0)
                                        pin.interval = -lowestPitch;
                                    if (pin.interval + highestPitch > maxPitch)
                                        pin.interval = maxPitch - highestPitch;
                                    if (k >= 2) {
                                        if (pin.interval == note.pins[k - 1].interval &&
                                            pin.interval == note.pins[k - 2].interval &&
                                            pin.volume == note.pins[k - 1].volume &&
                                            pin.volume == note.pins[k - 2].volume) {
                                            note.pins.splice(k - 1, 1);
                                            k--;
                                        }
                                    }
                                }
                                pattern.notes.push(note);
                                tickClock = note.end;
                            }
                        }
                    }
                    for (let i = 0; i < this.barCount; i++) {
                        channel.bars[i] = channelObject["sequence"] ? Math.min(this.patternsPerChannel, channelObject["sequence"][i] >>> 0) : 0;
                    }
                }
            }
            if (newPitchChannels.length > beepbox.Config.pitchChannelCountMax)
                newPitchChannels.length = beepbox.Config.pitchChannelCountMax;
            if (newNoiseChannels.length > beepbox.Config.noiseChannelCountMax)
                newNoiseChannels.length = beepbox.Config.noiseChannelCountMax;
            this.pitchChannelCount = newPitchChannels.length;
            this.noiseChannelCount = newNoiseChannels.length;
            this.channels.length = 0;
            Array.prototype.push.apply(this.channels, newPitchChannels);
            Array.prototype.push.apply(this.channels, newNoiseChannels);
        }
        getPattern(channel, bar) {
            const patternIndex = this.channels[channel].bars[bar];
            if (patternIndex == 0)
                return null;
            return this.channels[channel].patterns[patternIndex - 1];
        }
        getPatternInstrument(channel, bar) {
            const pattern = this.getPattern(channel, bar);
            return pattern == null ? 0 : pattern.instrument;
        }
        getBeatsPerMinute() {
            return this.tempo;
        }
    }
    Song._format = "BeepBox";
    Song._oldestVersion = 2;
    Song._latestVersion = 8;
    beepbox.Song = Song;
    class Tone {
        constructor() {
            this.pitches = [0, 0, 0, 0];
            this.pitchCount = 0;
            this.chordSize = 0;
            this.drumsetPitch = 0;
            this.note = null;
            this.prevNote = null;
            this.nextNote = null;
            this.prevNotePitchIndex = 0;
            this.nextNotePitchIndex = 0;
            this.active = false;
            this.noteStart = 0;
            this.noteEnd = 0;
            this.noteLengthTicks = 0;
            this.ticksSinceReleased = 0;
            this.liveInputSamplesHeld = 0;
            this.lastInterval = 0;
            this.lastVolume = 0;
            this.stereoVolume1 = 0.0;
            this.stereoVolume2 = 0.0;
            this.stereoOffset = 0.0;
            this.stereoDelay = 0.0;
            this.sample = 0.0;
            this.phases = [];
            this.phaseDeltas = [];
            this.volumeStarts = [];
            this.volumeDeltas = [];
            this.volumeStart = 0.0;
            this.volumeDelta = 0.0;
            this.phaseDeltaScale = 0.0;
            this.pulseWidth = 0.0;
            this.pulseWidthDelta = 0.0;
            this.filter = 0.0;
            this.filterScale = 0.0;
            this.filterSample0 = 0.0;
            this.filterSample1 = 0.0;
            this.vibratoScale = 0.0;
            this.intervalMult = 0.0;
            this.intervalVolumeMult = 1.0;
            this.feedbackOutputs = [];
            this.feedbackMult = 0.0;
            this.feedbackDelta = 0.0;
            this.reset();
        }
        reset() {
            for (let i = 0; i < beepbox.Config.operatorCount; i++) {
                this.phases[i] = 0.0;
                this.feedbackOutputs[i] = 0.0;
            }
            this.sample = 0.0;
            this.filterSample0 = 0.0;
            this.filterSample1 = 0.0;
            this.liveInputSamplesHeld = 0.0;
        }
    }
    class Synth {
        constructor(song = null) {
            this.samplesPerSecond = 44100;
            this.song = null;
            this.liveInputPressed = false;
            this.liveInputPitches = [0];
            this.liveInputChannel = 0;
            this.loopRepeatCount = -1;
            this.volume = 1.0;
            this.playheadInternal = 0.0;
            this.bar = 0;
            this.beat = 0;
            this.part = 0;
            this.tick = 0;
            this.tickSampleCountdown = 0;
            this.paused = true;
            this.tonePool = new beepbox.Deque();
            this.activeTones = [];
            this.releasedTones = [];
            this.liveInputTones = new beepbox.Deque();
            this.limit = 0.0;
            this.stereoBufferIndex = 0;
            this.samplesForNone = null;
            this.samplesForReverb = null;
            this.samplesForChorus = null;
            this.samplesForChorusReverb = null;
            this.chorusDelayLine = new Float32Array(2048);
            this.chorusDelayPos = 0;
            this.chorusPhase = 0;
            this.reverbDelayLine = new Float32Array(16384);
            this.reverbDelayPos = 0;
            this.reverbFeedback0 = 0.0;
            this.reverbFeedback1 = 0.0;
            this.reverbFeedback2 = 0.0;
            this.reverbFeedback3 = 0.0;
            this.audioCtx = null;
            this.scriptNode = null;
            this.audioProcessCallback = (audioProcessingEvent) => {
                const outputBuffer = audioProcessingEvent.outputBuffer;
                const outputDataL = outputBuffer.getChannelData(0);
                const outputDataR = outputBuffer.getChannelData(1);
                if (this.paused) {
                    for (let i = 0; i < outputBuffer.length; i++) {
                        outputDataL[i] = 0.0;
                        outputDataR[i] = 0.0;
                    }
                }
                else {
                    this.synthesize(outputDataL, outputDataR, outputBuffer.length);
                }
            };
            if (song != null)
                this.setSong(song);
        }
        static warmUpSynthesizer(song) {
            if (song != null) {
                for (let j = 0; j < song.getChannelCount(); j++) {
                    for (let i = 0; i < song.instrumentsPerChannel; i++) {
                        Synth.getInstrumentSynthFunction(song.channels[j].instruments[i]);
                        song.channels[j].instruments[i].warmUp();
                    }
                }
            }
        }
        static operatorAmplitudeCurve(amplitude) {
            return (Math.pow(16.0, amplitude / 15.0) - 1.0) / 15.0;
        }
        get playing() {
            return !this.paused;
        }
        get playhead() {
            return this.playheadInternal;
        }
        set playhead(value) {
            if (this.song != null) {
                this.playheadInternal = Math.max(0, Math.min(this.song.barCount, value));
                let remainder = this.playheadInternal;
                this.bar = Math.floor(remainder);
                remainder = this.song.beatsPerBar * (remainder - this.bar);
                this.beat = Math.floor(remainder);
                remainder = beepbox.Config.partsPerBeat * (remainder - this.beat);
                this.part = Math.floor(remainder);
                remainder = beepbox.Config.ticksPerPart * (remainder - this.part);
                this.tick = Math.floor(remainder);
                const samplesPerTick = this.getSamplesPerTick();
                remainder = samplesPerTick * (remainder - this.tick);
                this.tickSampleCountdown = Math.floor(samplesPerTick - remainder);
            }
        }
        getSamplesPerBar() {
            if (this.song == null)
                throw new Error();
            return this.getSamplesPerTick() * beepbox.Config.ticksPerPart * beepbox.Config.partsPerBeat * this.song.beatsPerBar;
        }
        getTotalBars(enableIntro, enableOutro) {
            if (this.song == null)
                throw new Error();
            let bars = this.song.loopLength * (this.loopRepeatCount + 1);
            if (enableIntro)
                bars += this.song.loopStart;
            if (enableOutro)
                bars += this.song.barCount - (this.song.loopStart + this.song.loopLength);
            return bars;
        }
        setSong(song) {
            if (typeof (song) == "string") {
                this.song = new Song(song);
            }
            else if (song instanceof Song) {
                this.song = song;
            }
        }
        play() {
            if (!this.paused)
                return;
            this.paused = false;
            Synth.warmUpSynthesizer(this.song);
            const contextClass = (window.AudioContext || window.webkitAudioContext);
            this.audioCtx = this.audioCtx || new contextClass();
            this.scriptNode = this.audioCtx.createScriptProcessor ? this.audioCtx.createScriptProcessor(2048, 0, 2) : this.audioCtx.createJavaScriptNode(2048, 0, 2);
            this.scriptNode.onaudioprocess = this.audioProcessCallback;
            this.scriptNode.channelCountMode = 'explicit';
            this.scriptNode.channelInterpretation = 'speakers';
            this.scriptNode.connect(this.audioCtx.destination);
            this.samplesPerSecond = this.audioCtx.sampleRate;
        }
        pause() {
            if (this.paused)
                return;
            this.paused = true;
            this.scriptNode.disconnect(this.audioCtx.destination);
            if (this.audioCtx.close) {
                this.audioCtx.close();
            }
            this.audioCtx = null;
            this.scriptNode = null;
        }
        resetBuffers() {
            for (let i = 0; i < this.reverbDelayLine.length; i++)
                this.reverbDelayLine[i] = 0.0;
            for (let i = 0; i < this.chorusDelayLine.length; i++)
                this.chorusDelayLine[i] = 0.0;
            if (this.samplesForNone != null)
                for (let i = 0; i < this.samplesForNone.length; i++)
                    this.samplesForNone[i] = 0.0;
            if (this.samplesForReverb != null)
                for (let i = 0; i < this.samplesForReverb.length; i++)
                    this.samplesForReverb[i] = 0.0;
            if (this.samplesForChorus != null)
                for (let i = 0; i < this.samplesForChorus.length; i++)
                    this.samplesForChorus[i] = 0.0;
            if (this.samplesForChorusReverb != null)
                for (let i = 0; i < this.samplesForChorusReverb.length; i++)
                    this.samplesForChorusReverb[i] = 0.0;
        }
        snapToStart() {
            this.bar = 0;
            this.snapToBar();
        }
        snapToBar(bar) {
            if (bar !== undefined)
                this.bar = bar;
            this.playheadInternal = this.bar;
            this.beat = 0;
            this.part = 0;
            this.tick = 0;
            this.tickSampleCountdown = 0;
            this.reverbDelayPos = 0;
            this.reverbFeedback0 = 0.0;
            this.reverbFeedback1 = 0.0;
            this.reverbFeedback2 = 0.0;
            this.reverbFeedback3 = 0.0;
            this.freeAllTones();
            this.resetBuffers();
        }
        jumpIntoLoop() {
            if (!this.song)
                return;
            if (this.bar < this.song.loopStart || this.bar >= this.song.loopStart + this.song.loopLength) {
                const oldBar = this.bar;
                this.bar = this.song.loopStart;
                this.playheadInternal += this.bar - oldBar;
            }
        }
        nextBar() {
            if (!this.song)
                return;
            const oldBar = this.bar;
            this.bar++;
            if (this.bar >= this.song.barCount) {
                this.bar = 0;
            }
            this.playheadInternal += this.bar - oldBar;
        }
        prevBar() {
            if (!this.song)
                return;
            const oldBar = this.bar;
            this.bar--;
            if (this.bar < 0 || this.bar >= this.song.barCount) {
                this.bar = this.song.barCount - 1;
            }
            this.playheadInternal += this.bar - oldBar;
        }
        synthesize(outputDataL, outputDataR, outputBufferLength) {
            if (this.song == null) {
                for (let i = 0; i < outputBufferLength; i++) {
                    outputDataL[i] = 0.0;
                    outputDataR[i] = 0.0;
                }
                return;
            }
            const channelCount = this.song.getChannelCount();
            for (let i = this.activeTones.length; i < channelCount; i++) {
                this.activeTones[i] = new beepbox.Deque();
                this.releasedTones[i] = new beepbox.Deque();
            }
            this.activeTones.length = channelCount;
            this.releasedTones.length = channelCount;
            const samplesPerTick = this.getSamplesPerTick();
            let bufferIndex = 0;
            let ended = false;
            if (this.tickSampleCountdown == 0 || this.tickSampleCountdown > samplesPerTick) {
                this.tickSampleCountdown = samplesPerTick;
            }
            if (this.beat >= this.song.beatsPerBar) {
                this.bar++;
                this.beat = 0;
                this.part = 0;
                this.tick = 0;
                this.tickSampleCountdown = samplesPerTick;
                if (this.loopRepeatCount != 0 && this.bar == this.song.loopStart + this.song.loopLength) {
                    this.bar = this.song.loopStart;
                    if (this.loopRepeatCount > 0)
                        this.loopRepeatCount--;
                }
            }
            if (this.bar >= this.song.barCount) {
                this.bar = 0;
                if (this.loopRepeatCount != -1) {
                    ended = true;
                    this.pause();
                }
            }
            const stereoBufferLength = outputBufferLength * 4;
            if (this.samplesForNone == null || this.samplesForNone.length != stereoBufferLength ||
                this.samplesForReverb == null || this.samplesForReverb.length != stereoBufferLength ||
                this.samplesForChorus == null || this.samplesForChorus.length != stereoBufferLength ||
                this.samplesForChorusReverb == null || this.samplesForChorusReverb.length != stereoBufferLength) {
                this.samplesForNone = new Float32Array(stereoBufferLength);
                this.samplesForReverb = new Float32Array(stereoBufferLength);
                this.samplesForChorus = new Float32Array(stereoBufferLength);
                this.samplesForChorusReverb = new Float32Array(stereoBufferLength);
                this.stereoBufferIndex = 0;
            }
            let stereoBufferIndex = this.stereoBufferIndex;
            const samplesForNone = this.samplesForNone;
            const samplesForReverb = this.samplesForReverb;
            const samplesForChorus = this.samplesForChorus;
            const samplesForChorusReverb = this.samplesForChorusReverb;
            const volume = +this.volume;
            const chorusDelayLine = this.chorusDelayLine;
            const reverbDelayLine = this.reverbDelayLine;
            const chorusDuration = 2.0;
            const chorusAngle = Math.PI * 2.0 / (chorusDuration * this.samplesPerSecond);
            const chorusRange = 150 * this.samplesPerSecond / 44100;
            const chorusOffset0 = 0x800 - 1.51 * chorusRange;
            const chorusOffset1 = 0x800 - 2.10 * chorusRange;
            const chorusOffset2 = 0x800 - 3.35 * chorusRange;
            const chorusOffset3 = 0x800 - 1.47 * chorusRange;
            const chorusOffset4 = 0x800 - 2.15 * chorusRange;
            const chorusOffset5 = 0x800 - 3.25 * chorusRange;
            let chorusPhase = this.chorusPhase % (Math.PI * 2.0);
            let chorusDelayPos = this.chorusDelayPos & 0x7FF;
            let reverbDelayPos = this.reverbDelayPos & 0x3FFF;
            let reverbFeedback0 = +this.reverbFeedback0;
            let reverbFeedback1 = +this.reverbFeedback1;
            let reverbFeedback2 = +this.reverbFeedback2;
            let reverbFeedback3 = +this.reverbFeedback3;
            const reverb = Math.pow(this.song.reverb / beepbox.Config.reverbRange, 0.667) * 0.425;
            const limitDecay = 1.0 - Math.pow(0.5, 4.0 / this.samplesPerSecond);
            const limitRise = 1.0 - Math.pow(0.5, 4000.0 / this.samplesPerSecond);
            let limit = +this.limit;
            while (bufferIndex < outputBufferLength && !ended) {
                const samplesLeftInBuffer = outputBufferLength - bufferIndex;
                const runLength = (this.tickSampleCountdown <= samplesLeftInBuffer)
                    ? this.tickSampleCountdown
                    : samplesLeftInBuffer;
                for (let channel = 0; channel < this.song.getChannelCount(); channel++) {
                    if (channel == this.liveInputChannel) {
                        this.determineLiveInputTones(this.song);
                        for (let i = 0; i < this.liveInputTones.count(); i++) {
                            const tone = this.liveInputTones.get(i);
                            this.playTone(this.song, stereoBufferIndex, stereoBufferLength, channel, samplesPerTick, runLength, tone, false, false);
                        }
                    }
                    this.determineCurrentActiveTones(this.song, channel);
                    for (let i = 0; i < this.activeTones[channel].count(); i++) {
                        const tone = this.activeTones[channel].get(i);
                        this.playTone(this.song, stereoBufferIndex, stereoBufferLength, channel, samplesPerTick, runLength, tone, false, false);
                    }
                    for (let i = 0; i < this.releasedTones[channel].count(); i++) {
                        const tone = this.releasedTones[channel].get(i);
                        if (tone.ticksSinceReleased >= tone.instrument.getTransition().releaseTicks) {
                            this.freeReleasedTone(channel, i);
                            i--;
                            continue;
                        }
                        const shouldFadeOutFast = (i + this.activeTones[channel].count() >= beepbox.Config.maximumTonesPerChannel);
                        this.playTone(this.song, stereoBufferIndex, stereoBufferLength, channel, samplesPerTick, runLength, tone, true, shouldFadeOutFast);
                    }
                }
                let chorusTap0Index = chorusDelayPos + chorusOffset0 - chorusRange * Math.sin(chorusPhase + 0);
                let chorusTap1Index = chorusDelayPos + chorusOffset1 - chorusRange * Math.sin(chorusPhase + 2.1);
                let chorusTap2Index = chorusDelayPos + chorusOffset2 - chorusRange * Math.sin(chorusPhase + 4.2);
                let chorusTap3Index = chorusDelayPos + 0x400 + chorusOffset3 - chorusRange * Math.sin(chorusPhase + 3.2);
                let chorusTap4Index = chorusDelayPos + 0x400 + chorusOffset4 - chorusRange * Math.sin(chorusPhase + 5.3);
                let chorusTap5Index = chorusDelayPos + 0x400 + chorusOffset5 - chorusRange * Math.sin(chorusPhase + 1.0);
                chorusPhase += chorusAngle * runLength;
                const chorusTap0End = chorusDelayPos + runLength + chorusOffset0 - chorusRange * Math.sin(chorusPhase + 0);
                const chorusTap1End = chorusDelayPos + runLength + chorusOffset1 - chorusRange * Math.sin(chorusPhase + 2.1);
                const chorusTap2End = chorusDelayPos + runLength + chorusOffset2 - chorusRange * Math.sin(chorusPhase + 4.2);
                const chorusTap3End = chorusDelayPos + runLength + 0x400 + chorusOffset3 - chorusRange * Math.sin(chorusPhase + 3.2);
                const chorusTap4End = chorusDelayPos + runLength + 0x400 + chorusOffset4 - chorusRange * Math.sin(chorusPhase + 5.3);
                const chorusTap5End = chorusDelayPos + runLength + 0x400 + chorusOffset5 - chorusRange * Math.sin(chorusPhase + 1.0);
                const chorusTap0Delta = (chorusTap0End - chorusTap0Index) / runLength;
                const chorusTap1Delta = (chorusTap1End - chorusTap1Index) / runLength;
                const chorusTap2Delta = (chorusTap2End - chorusTap2Index) / runLength;
                const chorusTap3Delta = (chorusTap3End - chorusTap3Index) / runLength;
                const chorusTap4Delta = (chorusTap4End - chorusTap4Index) / runLength;
                const chorusTap5Delta = (chorusTap5End - chorusTap5Index) / runLength;
                const runEnd = bufferIndex + runLength;
                for (let i = bufferIndex; i < runEnd; i++) {
                    const bufferIndexL = stereoBufferIndex;
                    const bufferIndexR = stereoBufferIndex + 1;
                    const sampleForNoneL = samplesForNone[bufferIndexL];
                    samplesForNone[bufferIndexL] = 0.0;
                    const sampleForNoneR = samplesForNone[bufferIndexR];
                    samplesForNone[bufferIndexR] = 0.0;
                    const sampleForReverbL = samplesForReverb[bufferIndexL];
                    samplesForReverb[bufferIndexL] = 0.0;
                    const sampleForReverbR = samplesForReverb[bufferIndexR];
                    samplesForReverb[bufferIndexR] = 0.0;
                    const sampleForChorusL = samplesForChorus[bufferIndexL];
                    samplesForChorus[bufferIndexL] = 0.0;
                    const sampleForChorusR = samplesForChorus[bufferIndexR];
                    samplesForChorus[bufferIndexR] = 0.0;
                    const sampleForChorusReverbL = samplesForChorusReverb[bufferIndexL];
                    samplesForChorusReverb[bufferIndexL] = 0.0;
                    const sampleForChorusReverbR = samplesForChorusReverb[bufferIndexR];
                    samplesForChorusReverb[bufferIndexR] = 0.0;
                    stereoBufferIndex += 2;
                    const combinedChorusL = sampleForChorusL + sampleForChorusReverbL;
                    const combinedChorusR = sampleForChorusR + sampleForChorusReverbR;
                    const chorusTap0Ratio = chorusTap0Index % 1;
                    const chorusTap1Ratio = chorusTap1Index % 1;
                    const chorusTap2Ratio = chorusTap2Index % 1;
                    const chorusTap3Ratio = chorusTap3Index % 1;
                    const chorusTap4Ratio = chorusTap4Index % 1;
                    const chorusTap5Ratio = chorusTap5Index % 1;
                    const chorusTap0A = chorusDelayLine[(chorusTap0Index) & 0x7FF];
                    const chorusTap0B = chorusDelayLine[(chorusTap0Index + 1) & 0x7FF];
                    const chorusTap1A = chorusDelayLine[(chorusTap1Index) & 0x7FF];
                    const chorusTap1B = chorusDelayLine[(chorusTap1Index + 1) & 0x7FF];
                    const chorusTap2A = chorusDelayLine[(chorusTap2Index) & 0x7FF];
                    const chorusTap2B = chorusDelayLine[(chorusTap2Index + 1) & 0x7FF];
                    const chorusTap3A = chorusDelayLine[(chorusTap3Index) & 0x7FF];
                    const chorusTap3B = chorusDelayLine[(chorusTap3Index + 1) & 0x7FF];
                    const chorusTap4A = chorusDelayLine[(chorusTap4Index) & 0x7FF];
                    const chorusTap4B = chorusDelayLine[(chorusTap4Index + 1) & 0x7FF];
                    const chorusTap5A = chorusDelayLine[(chorusTap5Index) & 0x7FF];
                    const chorusTap5B = chorusDelayLine[(chorusTap5Index + 1) & 0x7FF];
                    const chorusTap0 = chorusTap0A + (chorusTap0B - chorusTap0A) * chorusTap0Ratio;
                    const chorusTap1 = chorusTap1A + (chorusTap1B - chorusTap1A) * chorusTap1Ratio;
                    const chorusTap2 = chorusTap2A + (chorusTap2B - chorusTap2A) * chorusTap2Ratio;
                    const chorusTap3 = chorusTap3A + (chorusTap3B - chorusTap3A) * chorusTap3Ratio;
                    const chorusTap4 = chorusTap4A + (chorusTap4B - chorusTap4A) * chorusTap4Ratio;
                    const chorusTap5 = chorusTap5A + (chorusTap5B - chorusTap5A) * chorusTap5Ratio;
                    const chorusSampleL = 0.5 * (combinedChorusL - chorusTap0 + chorusTap1 - chorusTap2);
                    const chorusSampleR = 0.5 * (combinedChorusR - chorusTap3 + chorusTap4 - chorusTap5);
                    chorusDelayLine[chorusDelayPos] = combinedChorusL;
                    chorusDelayLine[(chorusDelayPos + 0x400) & 0x7FF] = combinedChorusR;
                    chorusDelayPos = (chorusDelayPos + 1) & 0x7FF;
                    chorusTap0Index += chorusTap0Delta;
                    chorusTap1Index += chorusTap1Delta;
                    chorusTap2Index += chorusTap2Delta;
                    chorusTap3Index += chorusTap3Delta;
                    chorusTap4Index += chorusTap4Delta;
                    chorusTap5Index += chorusTap5Delta;
                    const reverbDelayPos1 = (reverbDelayPos + 3041) & 0x3FFF;
                    const reverbDelayPos2 = (reverbDelayPos + 6426) & 0x3FFF;
                    const reverbDelayPos3 = (reverbDelayPos + 10907) & 0x3FFF;
                    const reverbSample0 = (reverbDelayLine[reverbDelayPos]);
                    const reverbSample1 = reverbDelayLine[reverbDelayPos1];
                    const reverbSample2 = reverbDelayLine[reverbDelayPos2];
                    const reverbSample3 = reverbDelayLine[reverbDelayPos3];
                    const reverbTemp0 = -(reverbSample0 + sampleForChorusReverbL + sampleForReverbL) + reverbSample1;
                    const reverbTemp1 = -(reverbSample0 + sampleForChorusReverbR + sampleForReverbR) - reverbSample1;
                    const reverbTemp2 = -reverbSample2 + reverbSample3;
                    const reverbTemp3 = -reverbSample2 - reverbSample3;
                    reverbFeedback0 += ((reverbTemp0 + reverbTemp2) * reverb - reverbFeedback0) * 0.5;
                    reverbFeedback1 += ((reverbTemp1 + reverbTemp3) * reverb - reverbFeedback1) * 0.5;
                    reverbFeedback2 += ((reverbTemp0 - reverbTemp2) * reverb - reverbFeedback2) * 0.5;
                    reverbFeedback3 += ((reverbTemp1 - reverbTemp3) * reverb - reverbFeedback3) * 0.5;
                    reverbDelayLine[reverbDelayPos1] = reverbFeedback0;
                    reverbDelayLine[reverbDelayPos2] = reverbFeedback1;
                    reverbDelayLine[reverbDelayPos3] = reverbFeedback2;
                    reverbDelayLine[reverbDelayPos] = reverbFeedback3;
                    reverbDelayPos = (reverbDelayPos + 1) & 0x3FFF;
                    const sampleL = sampleForNoneL + chorusSampleL + sampleForReverbL + reverbSample1 + reverbSample2 + reverbSample3;
                    const sampleR = sampleForNoneR + chorusSampleR + sampleForReverbR + reverbSample0 + reverbSample2 - reverbSample3;
                    const absL = sampleL < 0.0 ? -sampleL : sampleL;
                    const absR = sampleR < 0.0 ? -sampleR : sampleR;
                    const abs = absL > absR ? absL : absR;
                    limit += (abs - limit) * (limit < abs ? limitRise : limitDecay);
                    const limitedVolume = volume / (limit >= 1 ? limit * 1.05 : limit * 0.8 + 0.25);
                    outputDataL[i] = sampleL * limitedVolume;
                    outputDataR[i] = sampleR * limitedVolume;
                }
                bufferIndex += runLength;
                this.tickSampleCountdown -= runLength;
                if (this.tickSampleCountdown <= 0) {
                    for (let channel = 0; channel < this.song.getChannelCount(); channel++) {
                        for (let i = 0; i < this.releasedTones[channel].count(); i++) {
                            const tone = this.releasedTones[channel].get(i);
                            tone.ticksSinceReleased++;
                            const shouldFadeOutFast = (i + this.activeTones[channel].count() >= beepbox.Config.maximumTonesPerChannel);
                            if (shouldFadeOutFast) {
                                this.freeReleasedTone(channel, i);
                                i--;
                            }
                        }
                    }
                    this.tick++;
                    this.tickSampleCountdown = samplesPerTick;
                    if (this.tick == beepbox.Config.ticksPerPart) {
                        this.tick = 0;
                        this.part++;
                        for (let channel = 0; channel < this.song.getChannelCount(); channel++) {
                            for (let i = 0; i < this.activeTones[channel].count(); i++) {
                                const tone = this.activeTones[channel].get(i);
                                const transition = tone.instrument.getTransition();
                                if (!transition.isSeamless && tone.note != null && tone.note.end == this.part + this.beat * beepbox.Config.partsPerBeat) {
                                    if (transition.releases) {
                                        this.releaseTone(channel, tone);
                                    }
                                    else {
                                        this.freeTone(tone);
                                    }
                                    this.activeTones[channel].remove(i);
                                    i--;
                                }
                            }
                        }
                        if (this.part == beepbox.Config.partsPerBeat) {
                            this.part = 0;
                            this.beat++;
                            if (this.beat == this.song.beatsPerBar) {
                                this.beat = 0;
                                this.bar++;
                                if (this.loopRepeatCount != 0 && this.bar == this.song.loopStart + this.song.loopLength) {
                                    this.bar = this.song.loopStart;
                                    if (this.loopRepeatCount > 0)
                                        this.loopRepeatCount--;
                                }
                                if (this.bar >= this.song.barCount) {
                                    this.bar = 0;
                                    if (this.loopRepeatCount != -1) {
                                        ended = true;
                                        this.resetBuffers();
                                        this.pause();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            const epsilon = (1.0e-24);
            if (-epsilon < reverbFeedback0 && reverbFeedback0 < epsilon)
                reverbFeedback0 = 0.0;
            if (-epsilon < reverbFeedback1 && reverbFeedback1 < epsilon)
                reverbFeedback1 = 0.0;
            if (-epsilon < reverbFeedback2 && reverbFeedback2 < epsilon)
                reverbFeedback2 = 0.0;
            if (-epsilon < reverbFeedback3 && reverbFeedback3 < epsilon)
                reverbFeedback3 = 0.0;
            if (-epsilon < limit && limit < epsilon)
                limit = 0.0;
            this.stereoBufferIndex = (this.stereoBufferIndex + outputBufferLength * 2) % stereoBufferLength;
            this.chorusPhase = chorusPhase;
            this.chorusDelayPos = chorusDelayPos;
            this.reverbDelayPos = reverbDelayPos;
            this.reverbFeedback0 = reverbFeedback0;
            this.reverbFeedback1 = reverbFeedback1;
            this.reverbFeedback2 = reverbFeedback2;
            this.reverbFeedback3 = reverbFeedback3;
            this.limit = limit;
            this.playheadInternal = (((this.tick + 1.0 - this.tickSampleCountdown / samplesPerTick) / 2.0 + this.part) / beepbox.Config.partsPerBeat + this.beat) / this.song.beatsPerBar + this.bar;
        }
        freeTone(tone) {
            this.tonePool.pushBack(tone);
        }
        newTone() {
            if (this.tonePool.count() > 0) {
                const tone = this.tonePool.popBack();
                tone.reset();
                tone.active = false;
                return tone;
            }
            return new Tone();
        }
        releaseTone(channel, tone) {
            this.releasedTones[channel].pushFront(tone);
        }
        freeReleasedTone(channel, toneIndex) {
            this.freeTone(this.releasedTones[channel].get(toneIndex));
            this.releasedTones[channel].remove(toneIndex);
        }
        freeAllTones() {
            while (this.liveInputTones.count() > 0) {
                this.freeTone(this.liveInputTones.popBack());
            }
            for (let i = 0; i < this.activeTones.length; i++) {
                while (this.activeTones[i].count() > 0) {
                    this.freeTone(this.activeTones[i].popBack());
                }
            }
            for (let i = 0; i < this.releasedTones.length; i++) {
                while (this.releasedTones[i].count() > 0) {
                    this.freeTone(this.releasedTones[i].popBack());
                }
            }
        }
        determineLiveInputTones(song) {
            if (this.liveInputPressed) {
                const instrument = song.channels[this.liveInputChannel].instruments[song.getPatternInstrument(this.liveInputChannel, this.bar)];
                let tone;
                if (this.liveInputTones.count() == 0) {
                    tone = this.newTone();
                    this.liveInputTones.pushBack(tone);
                }
                else if (!instrument.getTransition().isSeamless && this.liveInputTones.peakFront().pitches[0] != this.liveInputPitches[0]) {
                    this.releaseTone(this.liveInputChannel, this.liveInputTones.popFront());
                    tone = this.newTone();
                    this.liveInputTones.pushBack(tone);
                }
                else {
                    tone = this.liveInputTones.get(0);
                }
                for (let i = 0; i < this.liveInputPitches.length; i++) {
                    tone.pitches[i] = this.liveInputPitches[i];
                }
                tone.pitchCount = this.liveInputPitches.length;
                tone.chordSize = 1;
                tone.instrument = instrument;
                tone.note = tone.prevNote = tone.nextNote = null;
            }
            else {
                while (this.liveInputTones.count() > 0) {
                    this.releaseTone(this.liveInputChannel, this.liveInputTones.popBack());
                }
            }
        }
        determineCurrentActiveTones(song, channel) {
            const instrument = song.channels[channel].instruments[song.getPatternInstrument(channel, this.bar)];
            const pattern = song.getPattern(channel, this.bar);
            const time = this.part + this.beat * beepbox.Config.partsPerBeat;
            let note = null;
            let prevNote = null;
            let nextNote = null;
            if (pattern != null) {
                for (let i = 0; i < pattern.notes.length; i++) {
                    if (pattern.notes[i].end <= time) {
                        prevNote = pattern.notes[i];
                    }
                    else if (pattern.notes[i].start <= time && pattern.notes[i].end > time) {
                        note = pattern.notes[i];
                    }
                    else if (pattern.notes[i].start > time) {
                        nextNote = pattern.notes[i];
                        break;
                    }
                }
            }
            const toneList = this.activeTones[channel];
            if (note != null) {
                if (prevNote != null && prevNote.end != note.start)
                    prevNote = null;
                if (nextNote != null && nextNote.start != note.end)
                    nextNote = null;
                this.syncTones(channel, toneList, instrument, note.pitches, note, prevNote, nextNote, time);
            }
            else {
                while (toneList.count() > 0) {
                    if (toneList.peakBack().instrument.getTransition().releases) {
                        this.releaseTone(channel, toneList.popBack());
                    }
                    else {
                        this.freeTone(toneList.popBack());
                    }
                }
            }
        }
        syncTones(channel, toneList, instrument, pitches, note, prevNote, nextNote, currentPart) {
            let toneCount = 0;
            if (instrument.getChord().arpeggiates) {
                let tone;
                if (toneList.count() == 0) {
                    tone = this.newTone();
                    toneList.pushBack(tone);
                }
                else {
                    tone = toneList.get(0);
                }
                toneCount = 1;
                for (let i = 0; i < pitches.length; i++) {
                    tone.pitches[i] = pitches[i];
                }
                tone.pitchCount = pitches.length;
                tone.chordSize = 1;
                tone.instrument = instrument;
                tone.note = note;
                tone.noteStart = note.start;
                tone.noteEnd = note.end;
                tone.prevNote = prevNote;
                tone.nextNote = nextNote;
                tone.prevNotePitchIndex = 0;
                tone.nextNotePitchIndex = 0;
            }
            else {
                const transition = instrument.getTransition();
                for (let i = 0; i < pitches.length; i++) {
                    const strumOffsetParts = i * instrument.getChord().strumParts;
                    let prevNoteForThisTone = (prevNote && prevNote.pitches.length > i) ? prevNote : null;
                    let noteForThisTone = note;
                    let nextNoteForThisTone = (nextNote && nextNote.pitches.length > i) ? nextNote : null;
                    let noteStart = noteForThisTone.start + strumOffsetParts;
                    if (noteStart > currentPart) {
                        if (toneList.count() > i && transition.isSeamless && prevNoteForThisTone != null) {
                            nextNoteForThisTone = noteForThisTone;
                            noteForThisTone = prevNoteForThisTone;
                            prevNoteForThisTone = null;
                            noteStart = noteForThisTone.start + strumOffsetParts;
                        }
                        else {
                            break;
                        }
                    }
                    let noteEnd = noteForThisTone.end;
                    if (transition.isSeamless && nextNoteForThisTone != null) {
                        noteEnd = Math.min(beepbox.Config.partsPerBeat * this.song.beatsPerBar, noteEnd + strumOffsetParts);
                    }
                    let tone;
                    if (toneList.count() > i) {
                        tone = toneList.get(i);
                    }
                    else {
                        tone = this.newTone();
                        toneList.pushBack(tone);
                    }
                    toneCount++;
                    tone.pitches[0] = noteForThisTone.pitches[i];
                    tone.pitchCount = 1;
                    tone.chordSize = noteForThisTone.pitches.length;
                    tone.instrument = instrument;
                    tone.note = noteForThisTone;
                    tone.noteStart = noteStart;
                    tone.noteEnd = noteEnd;
                    tone.prevNote = prevNoteForThisTone;
                    tone.nextNote = nextNoteForThisTone;
                    tone.prevNotePitchIndex = i;
                    tone.nextNotePitchIndex = i;
                }
            }
            while (toneList.count() > toneCount) {
                if (toneList.peakBack().instrument.getTransition().releases) {
                    this.releaseTone(channel, toneList.popBack());
                }
                else {
                    this.freeTone(toneList.popBack());
                }
            }
        }
        playTone(song, stereoBufferIndex, stereoBufferLength, channel, samplesPerTick, runLength, tone, released, shouldFadeOutFast) {
            Synth.computeTone(this, song, channel, samplesPerTick, runLength, tone, released, shouldFadeOutFast);
            let synthBuffer;
            switch (tone.instrument.effects) {
                case 0:
                    synthBuffer = this.samplesForNone;
                    break;
                case 1:
                    synthBuffer = this.samplesForReverb;
                    break;
                case 2:
                    synthBuffer = this.samplesForChorus;
                    break;
                case 3:
                    synthBuffer = this.samplesForChorusReverb;
                    break;
                default: throw new Error();
            }
            const synthesizer = Synth.getInstrumentSynthFunction(tone.instrument);
            synthesizer(this, synthBuffer, stereoBufferIndex, stereoBufferLength, runLength * 2, tone, tone.instrument);
        }
        static computeEnvelope(envelope, time, beats, customVolume) {
            switch (envelope.type) {
                case 0: return customVolume;
                case 1: return 1.0;
                case 4:
                    return 1.0 / (1.0 + time * envelope.speed);
                case 5:
                    return 1.0 - 1.0 / (1.0 + time * envelope.speed);
                case 6:
                    return 0.5 - Math.cos(beats * 2.0 * Math.PI * envelope.speed) * 0.5;
                case 7:
                    return 0.75 - Math.cos(beats * 2.0 * Math.PI * envelope.speed) * 0.25;
                case 2:
                    return Math.max(1.0, 2.0 - time * 10.0);
                case 3:
                    const speed = envelope.speed;
                    const attack = 0.25 / Math.sqrt(speed);
                    return time < attack ? time / attack : 1.0 / (1.0 + (time - attack) * speed);
                case 8:
                    return Math.pow(2, -envelope.speed * time);
                default: throw new Error("Unrecognized operator envelope type.");
            }
        }
        static computeChordVolume(chordSize) {
            return 1.0 / ((chordSize - 1) * 0.25 + 1.0);
        }
        static computeTone(synth, song, channel, samplesPerTick, runLength, tone, released, shouldFadeOutFast) {
            const instrument = tone.instrument;
            const transition = instrument.getTransition();
            const chord = instrument.getChord();
            const chordVolume = chord.arpeggiates ? 1 : Synth.computeChordVolume(tone.chordSize);
            const isNoiseChannel = song.getChannelIsNoise(channel);
            const intervalScale = isNoiseChannel ? beepbox.Config.noiseInterval : 1;
            const secondsPerPart = beepbox.Config.ticksPerPart * samplesPerTick / synth.samplesPerSecond;
            const beatsPerPart = 1.0 / beepbox.Config.partsPerBeat;
            const toneWasActive = tone.active;
            const tickSampleCountdown = synth.tickSampleCountdown;
            const startRatio = 1.0 - (tickSampleCountdown) / samplesPerTick;
            const endRatio = 1.0 - (tickSampleCountdown - runLength) / samplesPerTick;
            const ticksIntoBar = (synth.beat * beepbox.Config.partsPerBeat + synth.part) * beepbox.Config.ticksPerPart + synth.tick;
            const partTimeTickStart = (ticksIntoBar) / beepbox.Config.ticksPerPart;
            const partTimeTickEnd = (ticksIntoBar + 1) / beepbox.Config.ticksPerPart;
            const partTimeStart = partTimeTickStart + (partTimeTickEnd - partTimeTickStart) * startRatio;
            const partTimeEnd = partTimeTickStart + (partTimeTickEnd - partTimeTickStart) * endRatio;
            tone.phaseDeltaScale = 0.0;
            tone.filter = 1.0;
            tone.filterScale = 1.0;
            tone.vibratoScale = 0.0;
            tone.intervalMult = 1.0;
            tone.intervalVolumeMult = 1.0;
            tone.active = false;
            const pan = (instrument.pan - beepbox.Config.panCenter) / beepbox.Config.panCenter;
            const maxDelay = 0.00065 * synth.samplesPerSecond;
            const delay = Math.round(-pan * maxDelay) * 2;
            const volumeL = Math.cos((1 + pan) * Math.PI * 0.25) * 1.414;
            const volumeR = Math.cos((1 - pan) * Math.PI * 0.25) * 1.414;
            const delayL = Math.max(0.0, -delay);
            const delayR = Math.max(0.0, delay);
            if (delay >= 0) {
                tone.stereoVolume1 = volumeL;
                tone.stereoVolume2 = volumeR;
                tone.stereoOffset = 0;
                tone.stereoDelay = delayR + 1;
            }
            else {
                tone.stereoVolume1 = volumeR;
                tone.stereoVolume2 = volumeL;
                tone.stereoOffset = 1;
                tone.stereoDelay = delayL - 1;
            }
            let resetPhases = true;
            let partsSinceStart = 0.0;
            let intervalStart = 0.0;
            let intervalEnd = 0.0;
            let transitionVolumeStart = 1.0;
            let transitionVolumeEnd = 1.0;
            let chordVolumeStart = chordVolume;
            let chordVolumeEnd = chordVolume;
            let customVolumeStart = 0.0;
            let customVolumeEnd = 0.0;
            let decayTimeStart = 0.0;
            let decayTimeEnd = 0.0;
            let volumeReferencePitch;
            let basePitch;
            let baseVolume;
            let pitchDamping;
            if (instrument.type == 3) {
                if (isNoiseChannel) {
                    basePitch = beepbox.Config.spectrumBasePitch;
                    baseVolume = 0.6;
                }
                else {
                    basePitch = beepbox.Config.keys[song.key].basePitch;
                    baseVolume = 0.3;
                }
                volumeReferencePitch = beepbox.Config.spectrumBasePitch;
                pitchDamping = 28;
            }
            else if (instrument.type == 4) {
                basePitch = beepbox.Config.spectrumBasePitch;
                baseVolume = 0.45;
                volumeReferencePitch = basePitch;
                pitchDamping = 48;
            }
            else if (instrument.type == 2) {
                basePitch = beepbox.Config.chipNoises[instrument.chipNoise].basePitch;
                baseVolume = 0.19;
                volumeReferencePitch = basePitch;
                pitchDamping = beepbox.Config.chipNoises[instrument.chipNoise].isSoft ? 24.0 : 60.0;
            }
            else if (instrument.type == 1) {
                basePitch = beepbox.Config.keys[song.key].basePitch;
                baseVolume = 0.03;
                volumeReferencePitch = 16;
                pitchDamping = 48;
            }
            else if (instrument.type == 0) {
                basePitch = beepbox.Config.keys[song.key].basePitch;
                baseVolume = 0.03375;
                volumeReferencePitch = 16;
                pitchDamping = 48;
            }
            else if (instrument.type == 5) {
                basePitch = beepbox.Config.keys[song.key].basePitch;
                baseVolume = 0.025;
                volumeReferencePitch = 16;
                pitchDamping = 48;
            }
            else if (instrument.type == 6) {
                basePitch = beepbox.Config.keys[song.key].basePitch;
                baseVolume = 0.04725;
                volumeReferencePitch = 16;
                pitchDamping = 48;
            }
            else {
                throw new Error("Unknown instrument type in computeTone.");
            }
            for (let i = 0; i < beepbox.Config.operatorCount; i++) {
                tone.phaseDeltas[i] = 0.0;
                tone.volumeStarts[i] = 0.0;
                tone.volumeDeltas[i] = 0.0;
            }
            if (released) {
                const ticksSoFar = tone.noteLengthTicks + tone.ticksSinceReleased;
                const startTicksSinceReleased = tone.ticksSinceReleased + startRatio;
                const endTicksSinceReleased = tone.ticksSinceReleased + endRatio;
                const startTick = tone.noteLengthTicks + startTicksSinceReleased;
                const endTick = tone.noteLengthTicks + endTicksSinceReleased;
                const toneTransition = tone.instrument.getTransition();
                resetPhases = false;
                partsSinceStart = Math.floor(ticksSoFar / beepbox.Config.ticksPerPart);
                intervalStart = intervalEnd = tone.lastInterval;
                customVolumeStart = customVolumeEnd = Synth.expressionToVolumeMult(tone.lastVolume);
                transitionVolumeStart = Synth.expressionToVolumeMult((1.0 - startTicksSinceReleased / toneTransition.releaseTicks) * 3.0);
                transitionVolumeEnd = Synth.expressionToVolumeMult((1.0 - endTicksSinceReleased / toneTransition.releaseTicks) * 3.0);
                decayTimeStart = startTick / beepbox.Config.ticksPerPart;
                decayTimeEnd = endTick / beepbox.Config.ticksPerPart;
                if (shouldFadeOutFast) {
                    transitionVolumeStart *= 1.0 - startRatio;
                    transitionVolumeEnd *= 1.0 - endRatio;
                }
            }
            else if (tone.note == null) {
                transitionVolumeStart = transitionVolumeEnd = 1;
                customVolumeStart = customVolumeEnd = 1;
                tone.lastInterval = 0;
                tone.lastVolume = 3;
                tone.ticksSinceReleased = 0;
                resetPhases = false;
                const heldTicksStart = tone.liveInputSamplesHeld / samplesPerTick;
                tone.liveInputSamplesHeld += runLength;
                const heldTicksEnd = tone.liveInputSamplesHeld / samplesPerTick;
                tone.noteLengthTicks = heldTicksEnd;
                const heldPartsStart = heldTicksStart / beepbox.Config.ticksPerPart;
                const heldPartsEnd = heldTicksEnd / beepbox.Config.ticksPerPart;
                partsSinceStart = Math.floor(heldPartsStart);
                decayTimeStart = heldPartsStart;
                decayTimeEnd = heldPartsEnd;
            }
            else {
                const note = tone.note;
                const prevNote = tone.prevNote;
                const nextNote = tone.nextNote;
                const time = synth.part + synth.beat * beepbox.Config.partsPerBeat;
                const partsPerBar = beepbox.Config.partsPerBeat * song.beatsPerBar;
                const noteStart = tone.noteStart;
                const noteEnd = tone.noteEnd;
                partsSinceStart = time - noteStart;
                let endPinIndex;
                for (endPinIndex = 1; endPinIndex < note.pins.length - 1; endPinIndex++) {
                    if (note.pins[endPinIndex].time + note.start > time)
                        break;
                }
                const startPin = note.pins[endPinIndex - 1];
                const endPin = note.pins[endPinIndex];
                const noteStartTick = noteStart * beepbox.Config.ticksPerPart;
                const noteEndTick = noteEnd * beepbox.Config.ticksPerPart;
                const noteLengthTicks = noteEndTick - noteStartTick;
                const pinStart = (note.start + startPin.time) * beepbox.Config.ticksPerPart;
                const pinEnd = (note.start + endPin.time) * beepbox.Config.ticksPerPart;
                tone.lastInterval = note.pins[note.pins.length - 1].interval;
                tone.lastVolume = note.pins[note.pins.length - 1].volume;
                tone.ticksSinceReleased = 0;
                tone.noteLengthTicks = noteLengthTicks;
                const tickTimeStart = time * beepbox.Config.ticksPerPart + synth.tick;
                const tickTimeEnd = time * beepbox.Config.ticksPerPart + synth.tick + 1;
                const noteTicksPassedTickStart = tickTimeStart - noteStartTick;
                const noteTicksPassedTickEnd = tickTimeEnd - noteStartTick;
                const pinRatioStart = Math.min(1.0, (tickTimeStart - pinStart) / (pinEnd - pinStart));
                const pinRatioEnd = Math.min(1.0, (tickTimeEnd - pinStart) / (pinEnd - pinStart));
                let customVolumeTickStart = startPin.volume + (endPin.volume - startPin.volume) * pinRatioStart;
                let customVolumeTickEnd = startPin.volume + (endPin.volume - startPin.volume) * pinRatioEnd;
                let transitionVolumeTickStart = 1.0;
                let transitionVolumeTickEnd = 1.0;
                let chordVolumeTickStart = chordVolume;
                let chordVolumeTickEnd = chordVolume;
                let intervalTickStart = startPin.interval + (endPin.interval - startPin.interval) * pinRatioStart;
                let intervalTickEnd = startPin.interval + (endPin.interval - startPin.interval) * pinRatioEnd;
                let decayTimeTickStart = partTimeTickStart - noteStart;
                let decayTimeTickEnd = partTimeTickEnd - noteStart;
                resetPhases = (tickTimeStart + startRatio - noteStartTick == 0.0) || !toneWasActive;
                const maximumSlideTicks = noteLengthTicks * 0.5;
                if (transition.isSeamless && !transition.slides && note.start == 0) {
                    resetPhases = !toneWasActive;
                }
                else if (transition.isSeamless && prevNote != null) {
                    resetPhases = !toneWasActive;
                    if (transition.slides) {
                        const slideTicks = Math.min(maximumSlideTicks, transition.slideTicks);
                        const slideRatioStartTick = Math.max(0.0, 1.0 - noteTicksPassedTickStart / slideTicks);
                        const slideRatioEndTick = Math.max(0.0, 1.0 - noteTicksPassedTickEnd / slideTicks);
                        const intervalDiff = ((prevNote.pitches[tone.prevNotePitchIndex] + prevNote.pins[prevNote.pins.length - 1].interval) - tone.pitches[0]) * 0.5;
                        const volumeDiff = (prevNote.pins[prevNote.pins.length - 1].volume - note.pins[0].volume) * 0.5;
                        const decayTimeDiff = (prevNote.end - prevNote.start) * 0.5;
                        intervalTickStart += slideRatioStartTick * intervalDiff;
                        intervalTickEnd += slideRatioEndTick * intervalDiff;
                        customVolumeTickStart += slideRatioStartTick * volumeDiff;
                        customVolumeTickEnd += slideRatioEndTick * volumeDiff;
                        decayTimeTickStart += slideRatioStartTick * decayTimeDiff;
                        decayTimeTickEnd += slideRatioEndTick * decayTimeDiff;
                        if (!chord.arpeggiates) {
                            const chordSizeDiff = (prevNote.pitches.length - tone.chordSize) * 0.5;
                            chordVolumeTickStart = Synth.computeChordVolume(tone.chordSize + slideRatioStartTick * chordSizeDiff);
                            chordVolumeTickEnd = Synth.computeChordVolume(tone.chordSize + slideRatioEndTick * chordSizeDiff);
                        }
                    }
                }
                if (transition.isSeamless && !transition.slides && note.end == partsPerBar) {
                }
                else if (transition.isSeamless && nextNote != null) {
                    if (transition.slides) {
                        const slideTicks = Math.min(maximumSlideTicks, transition.slideTicks);
                        const slideRatioStartTick = Math.max(0.0, 1.0 - (noteLengthTicks - noteTicksPassedTickStart) / slideTicks);
                        const slideRatioEndTick = Math.max(0.0, 1.0 - (noteLengthTicks - noteTicksPassedTickEnd) / slideTicks);
                        const intervalDiff = (nextNote.pitches[tone.nextNotePitchIndex] - (tone.pitches[0] + note.pins[note.pins.length - 1].interval)) * 0.5;
                        const volumeDiff = (nextNote.pins[0].volume - note.pins[note.pins.length - 1].volume) * 0.5;
                        const decayTimeDiff = -(noteEnd - noteStart) * 0.5;
                        intervalTickStart += slideRatioStartTick * intervalDiff;
                        intervalTickEnd += slideRatioEndTick * intervalDiff;
                        customVolumeTickStart += slideRatioStartTick * volumeDiff;
                        customVolumeTickEnd += slideRatioEndTick * volumeDiff;
                        decayTimeTickStart += slideRatioStartTick * decayTimeDiff;
                        decayTimeTickEnd += slideRatioEndTick * decayTimeDiff;
                        if (!chord.arpeggiates) {
                            const chordSizeDiff = (nextNote.pitches.length - tone.chordSize) * 0.5;
                            chordVolumeTickStart = Synth.computeChordVolume(tone.chordSize + slideRatioStartTick * chordSizeDiff);
                            chordVolumeTickEnd = Synth.computeChordVolume(tone.chordSize + slideRatioEndTick * chordSizeDiff);
                        }
                    }
                }
                else if (!transition.releases) {
                    const releaseTicks = transition.releaseTicks;
                    if (releaseTicks > 0.0) {
                        transitionVolumeTickStart *= Math.min(1.0, (noteLengthTicks - noteTicksPassedTickStart) / releaseTicks);
                        transitionVolumeTickEnd *= Math.min(1.0, (noteLengthTicks - noteTicksPassedTickEnd) / releaseTicks);
                    }
                }
                intervalStart = intervalTickStart + (intervalTickEnd - intervalTickStart) * startRatio;
                intervalEnd = intervalTickStart + (intervalTickEnd - intervalTickStart) * endRatio;
                customVolumeStart = Synth.expressionToVolumeMult(customVolumeTickStart + (customVolumeTickEnd - customVolumeTickStart) * startRatio);
                customVolumeEnd = Synth.expressionToVolumeMult(customVolumeTickStart + (customVolumeTickEnd - customVolumeTickStart) * endRatio);
                transitionVolumeStart = transitionVolumeTickStart + (transitionVolumeTickEnd - transitionVolumeTickStart) * startRatio;
                transitionVolumeEnd = transitionVolumeTickStart + (transitionVolumeTickEnd - transitionVolumeTickStart) * endRatio;
                chordVolumeStart = chordVolumeTickStart + (chordVolumeTickEnd - chordVolumeTickStart) * startRatio;
                chordVolumeEnd = chordVolumeTickStart + (chordVolumeTickEnd - chordVolumeTickStart) * endRatio;
                decayTimeStart = decayTimeTickStart + (decayTimeTickEnd - decayTimeTickStart) * startRatio;
                decayTimeEnd = decayTimeTickStart + (decayTimeTickEnd - decayTimeTickStart) * endRatio;
            }
            const sampleTime = 1.0 / synth.samplesPerSecond;
            tone.active = true;
            if (instrument.type == 0 || instrument.type == 1 || instrument.type == 5 || instrument.type == 6) {
                const lfoEffectStart = Synth.getLFOAmplitude(instrument, secondsPerPart * partTimeStart);
                const lfoEffectEnd = Synth.getLFOAmplitude(instrument, secondsPerPart * partTimeEnd);
                const vibratoScale = (partsSinceStart < beepbox.Config.vibratos[instrument.vibrato].delayParts) ? 0.0 : beepbox.Config.vibratos[instrument.vibrato].amplitude;
                const vibratoStart = vibratoScale * lfoEffectStart;
                const vibratoEnd = vibratoScale * lfoEffectEnd;
                intervalStart += vibratoStart;
                intervalEnd += vibratoEnd;
            }
            if (!transition.isSeamless || (!(!transition.slides && tone.note != null && tone.note.start == 0) && !(tone.prevNote != null))) {
                const attackSeconds = transition.attackSeconds;
                if (attackSeconds > 0.0) {
                    transitionVolumeStart *= Math.min(1.0, secondsPerPart * decayTimeStart / attackSeconds);
                    transitionVolumeEnd *= Math.min(1.0, secondsPerPart * decayTimeEnd / attackSeconds);
                }
            }
            const instrumentVolumeMult = Synth.instrumentVolumeToVolumeMult(instrument.volume);
            if (instrument.type == 4) {
                tone.drumsetPitch = tone.pitches[0];
                if (tone.note != null)
                    tone.drumsetPitch += tone.note.pickMainInterval();
                tone.drumsetPitch = Math.max(0, Math.min(beepbox.Config.drumCount - 1, tone.drumsetPitch));
            }
            const cutoffOctaves = instrument.getFilterCutoffOctaves();
            const filterEnvelope = (instrument.type == 4) ? instrument.getDrumsetEnvelope(tone.drumsetPitch) : instrument.getFilterEnvelope();
            const filterCutoffHz = beepbox.Config.filterCutoffMaxHz * Math.pow(2.0, cutoffOctaves);
            const filterBase = 2.0 * Math.sin(Math.PI * filterCutoffHz / synth.samplesPerSecond);
            const filterMin = 2.0 * Math.sin(Math.PI * beepbox.Config.filterCutoffMinHz / synth.samplesPerSecond);
            tone.filter = filterBase * Synth.computeEnvelope(filterEnvelope, secondsPerPart * decayTimeStart, beatsPerPart * partTimeStart, customVolumeStart);
            let endFilter = filterBase * Synth.computeEnvelope(filterEnvelope, secondsPerPart * decayTimeEnd, beatsPerPart * partTimeEnd, customVolumeEnd);
            tone.filter = Math.min(beepbox.Config.filterMax, Math.max(filterMin, tone.filter));
            endFilter = Math.min(beepbox.Config.filterMax, Math.max(filterMin, endFilter));
            tone.filterScale = Math.pow(endFilter / tone.filter, 1.0 / runLength);
            let filterVolume = Math.pow(0.5, cutoffOctaves * 0.35);
            if (instrument.filterResonance > 0) {
                filterVolume = Math.pow(filterVolume, 1.7) * Math.pow(0.5, 0.125 * (instrument.filterResonance - 1));
            }
            if (filterEnvelope.type == 8) {
                filterVolume *= (1.25 + .025 * filterEnvelope.speed);
            }
            else if (filterEnvelope.type == 4) {
                filterVolume *= (1 + .02 * filterEnvelope.speed);
            }
            if (resetPhases) {
                tone.reset();
            }
            if (instrument.type == 1) {
                let sineVolumeBoost = 1.0;
                let totalCarrierVolume = 0.0;
                let arpeggioInterval = 0;
                if (tone.pitchCount > 1 && !chord.harmonizes) {
                    const arpeggio = Math.floor((synth.tick + synth.part * beepbox.Config.ticksPerPart) / beepbox.Config.rhythms[song.rhythm].ticksPerArpeggio);
                    const arpeggioPattern = beepbox.Config.rhythms[song.rhythm].arpeggioPatterns[tone.pitchCount - 1];
                    arpeggioInterval = tone.pitches[arpeggioPattern[arpeggio % arpeggioPattern.length]] - tone.pitches[0];
                }
                const carrierCount = beepbox.Config.algorithms[instrument.algorithm].carrierCount;
                for (let i = 0; i < beepbox.Config.operatorCount; i++) {
                    const associatedCarrierIndex = beepbox.Config.algorithms[instrument.algorithm].associatedCarrier[i] - 1;
                    const pitch = tone.pitches[!chord.harmonizes ? 0 : ((i < tone.pitchCount) ? i : ((associatedCarrierIndex < tone.pitchCount) ? associatedCarrierIndex : 0))];
                    const freqMult = beepbox.Config.operatorFrequencies[instrument.operators[i].frequency].mult;
                    const interval = beepbox.Config.operatorCarrierInterval[associatedCarrierIndex] + arpeggioInterval;
                    const startPitch = basePitch + (pitch + intervalStart) * intervalScale + interval;
                    const startFreq = freqMult * (Instrument.frequencyFromPitch(startPitch)) + beepbox.Config.operatorFrequencies[instrument.operators[i].frequency].hzOffset;
                    tone.phaseDeltas[i] = startFreq * sampleTime * beepbox.Config.sineWaveLength;
                    const amplitudeCurve = Synth.operatorAmplitudeCurve(instrument.operators[i].amplitude);
                    const amplitudeMult = amplitudeCurve * beepbox.Config.operatorFrequencies[instrument.operators[i].frequency].amplitudeSign;
                    let volumeStart = amplitudeMult;
                    let volumeEnd = amplitudeMult;
                    if (i < carrierCount) {
                        const endPitch = basePitch + (pitch + intervalEnd) * intervalScale + interval;
                        const pitchVolumeStart = Math.pow(2.0, -(startPitch - volumeReferencePitch) / pitchDamping);
                        const pitchVolumeEnd = Math.pow(2.0, -(endPitch - volumeReferencePitch) / pitchDamping);
                        volumeStart *= pitchVolumeStart;
                        volumeEnd *= pitchVolumeEnd;
                        totalCarrierVolume += amplitudeCurve;
                    }
                    else {
                        volumeStart *= beepbox.Config.sineWaveLength * 1.5;
                        volumeEnd *= beepbox.Config.sineWaveLength * 1.5;
                        sineVolumeBoost *= 1.0 - Math.min(1.0, instrument.operators[i].amplitude / 15);
                    }
                    const operatorEnvelope = beepbox.Config.envelopes[instrument.operators[i].envelope];
                    volumeStart *= Synth.computeEnvelope(operatorEnvelope, secondsPerPart * decayTimeStart, beatsPerPart * partTimeStart, customVolumeStart);
                    volumeEnd *= Synth.computeEnvelope(operatorEnvelope, secondsPerPart * decayTimeEnd, beatsPerPart * partTimeEnd, customVolumeEnd);
                    tone.volumeStarts[i] = volumeStart;
                    tone.volumeDeltas[i] = (volumeEnd - volumeStart) / runLength;
                }
                const feedbackAmplitude = beepbox.Config.sineWaveLength * 0.3 * instrument.feedbackAmplitude / 15.0;
                const feedbackEnvelope = beepbox.Config.envelopes[instrument.feedbackEnvelope];
                let feedbackStart = feedbackAmplitude * Synth.computeEnvelope(feedbackEnvelope, secondsPerPart * decayTimeStart, beatsPerPart * partTimeStart, customVolumeStart);
                let feedbackEnd = feedbackAmplitude * Synth.computeEnvelope(feedbackEnvelope, secondsPerPart * decayTimeEnd, beatsPerPart * partTimeEnd, customVolumeEnd);
                tone.feedbackMult = feedbackStart;
                tone.feedbackDelta = (feedbackEnd - tone.feedbackMult) / runLength;
                const volumeMult = baseVolume * instrumentVolumeMult;
                tone.volumeStart = filterVolume * volumeMult * transitionVolumeStart * chordVolumeStart;
                const volumeEnd = filterVolume * volumeMult * transitionVolumeEnd * chordVolumeEnd;
                tone.volumeDelta = (volumeEnd - tone.volumeStart) / runLength;
                sineVolumeBoost *= (Math.pow(2.0, (2.0 - 1.4 * instrument.feedbackAmplitude / 15.0)) - 1.0) / 3.0;
                sineVolumeBoost *= 1.0 - Math.min(1.0, Math.max(0.0, totalCarrierVolume - 1) / 2.0);
                tone.volumeStart *= 1.0 + sineVolumeBoost * 3.0;
                tone.volumeDelta *= 1.0 + sineVolumeBoost * 3.0;
            }
            else {
                let pitch = tone.pitches[0];
                if (tone.pitchCount > 1) {
                    const arpeggio = Math.floor((synth.tick + synth.part * beepbox.Config.ticksPerPart) / beepbox.Config.rhythms[song.rhythm].ticksPerArpeggio);
                    if (chord.harmonizes) {
                        const arpeggioPattern = beepbox.Config.rhythms[song.rhythm].arpeggioPatterns[tone.pitchCount - 2];
                        const intervalOffset = tone.pitches[1 + arpeggioPattern[arpeggio % arpeggioPattern.length]] - tone.pitches[0];
                        tone.intervalMult = Math.pow(2.0, intervalOffset / 12.0);
                        tone.intervalVolumeMult = Math.pow(2.0, -intervalOffset / pitchDamping);
                    }
                    else {
                        const arpeggioPattern = beepbox.Config.rhythms[song.rhythm].arpeggioPatterns[tone.pitchCount - 1];
                        pitch = tone.pitches[arpeggioPattern[arpeggio % arpeggioPattern.length]];
                    }
                }
                const startPitch = basePitch + (pitch + intervalStart) * intervalScale;
                const endPitch = basePitch + (pitch + intervalEnd) * intervalScale;
                const startFreq = Instrument.frequencyFromPitch(startPitch);
                const pitchVolumeStart = Math.pow(2.0, -(startPitch - volumeReferencePitch) / pitchDamping);
                const pitchVolumeEnd = Math.pow(2.0, -(endPitch - volumeReferencePitch) / pitchDamping);
                let settingsVolumeMult = baseVolume * filterVolume;
                if (instrument.type == 2) {
                    settingsVolumeMult *= beepbox.Config.chipNoises[instrument.chipNoise].volume;
                }
                if (instrument.type == 0) {
                    settingsVolumeMult *= beepbox.Config.chipWaves[instrument.chipWave].volume;
                }
                if (instrument.type == 0 || instrument.type == 5) {
                    settingsVolumeMult *= beepbox.Config.intervals[instrument.interval].volume;
                }
                if (instrument.type == 6) {
                    const pulseEnvelope = beepbox.Config.envelopes[instrument.pulseEnvelope];
                    const basePulseWidth = Math.pow(0.5, (beepbox.Config.pulseWidthRange - instrument.pulseWidth - 1) * 0.5) * 0.5;
                    const pulseWidthStart = basePulseWidth * Synth.computeEnvelope(pulseEnvelope, secondsPerPart * decayTimeStart, beatsPerPart * partTimeStart, customVolumeStart);
                    const pulseWidthEnd = basePulseWidth * Synth.computeEnvelope(pulseEnvelope, secondsPerPart * decayTimeEnd, beatsPerPart * partTimeEnd, customVolumeEnd);
                    tone.pulseWidth = pulseWidthStart;
                    tone.pulseWidthDelta = (pulseWidthEnd - pulseWidthStart) / runLength;
                }
                tone.phaseDeltas[0] = startFreq * sampleTime;
                tone.volumeStart = transitionVolumeStart * chordVolumeStart * pitchVolumeStart * settingsVolumeMult * instrumentVolumeMult;
                let volumeEnd = transitionVolumeEnd * chordVolumeEnd * pitchVolumeEnd * settingsVolumeMult * instrumentVolumeMult;
                if (filterEnvelope.type != 0 && (instrument.type != 6 || beepbox.Config.envelopes[instrument.pulseEnvelope].type != 0)) {
                    tone.volumeStart *= customVolumeStart;
                    volumeEnd *= customVolumeEnd;
                }
                tone.volumeDelta = (volumeEnd - tone.volumeStart) / runLength;
            }
            tone.phaseDeltaScale = Math.pow(2.0, ((intervalEnd - intervalStart) * intervalScale / 12.0) / runLength);
        }
        static getLFOAmplitude(instrument, secondsIntoBar) {
            let effect = 0.0;
            for (const vibratoPeriodSeconds of beepbox.Config.vibratos[instrument.vibrato].periodsSeconds) {
                effect += Math.sin(Math.PI * 2.0 * secondsIntoBar / vibratoPeriodSeconds);
            }
            return effect;
        }
        static getInstrumentSynthFunction(instrument) {
            if (instrument.type == 1) {
                const fingerprint = instrument.algorithm + "_" + instrument.feedbackType;
                if (Synth.fmSynthFunctionCache[fingerprint] == undefined) {
                    const synthSource = [];
                    for (const line of Synth.fmSourceTemplate) {
                        if (line.indexOf("// CARRIER OUTPUTS") != -1) {
                            const outputs = [];
                            for (let j = 0; j < beepbox.Config.algorithms[instrument.algorithm].carrierCount; j++) {
                                outputs.push("operator" + j + "Scaled");
                            }
                            synthSource.push(line.replace("/*operator#Scaled*/", outputs.join(" + ")));
                        }
                        else if (line.indexOf("// INSERT OPERATOR COMPUTATION HERE") != -1) {
                            for (let j = beepbox.Config.operatorCount - 1; j >= 0; j--) {
                                for (const operatorLine of Synth.operatorSourceTemplate) {
                                    if (operatorLine.indexOf("/* + operator@Scaled*/") != -1) {
                                        let modulators = "";
                                        for (const modulatorNumber of beepbox.Config.algorithms[instrument.algorithm].modulatedBy[j]) {
                                            modulators += " + operator" + (modulatorNumber - 1) + "Scaled";
                                        }
                                        const feedbackIndices = beepbox.Config.feedbacks[instrument.feedbackType].indices[j];
                                        if (feedbackIndices.length > 0) {
                                            modulators += " + feedbackMult * (";
                                            const feedbacks = [];
                                            for (const modulatorNumber of feedbackIndices) {
                                                feedbacks.push("operator" + (modulatorNumber - 1) + "Output");
                                            }
                                            modulators += feedbacks.join(" + ") + ")";
                                        }
                                        synthSource.push(operatorLine.replace(/\#/g, j + "").replace("/* + operator@Scaled*/", modulators));
                                    }
                                    else {
                                        synthSource.push(operatorLine.replace(/\#/g, j + ""));
                                    }
                                }
                            }
                        }
                        else if (line.indexOf("#") != -1) {
                            for (let j = 0; j < beepbox.Config.operatorCount; j++) {
                                synthSource.push(line.replace(/\#/g, j + ""));
                            }
                        }
                        else {
                            synthSource.push(line);
                        }
                    }
                    Synth.fmSynthFunctionCache[fingerprint] = new Function("synth", "data", "stereoBufferIndex", "stereoBufferLength", "runLength", "tone", "instrument", synthSource.join("\n"));
                }
                return Synth.fmSynthFunctionCache[fingerprint];
            }
            else if (instrument.type == 0) {
                return Synth.chipSynth;
            }
            else if (instrument.type == 5) {
                return Synth.harmonicsSynth;
            }
            else if (instrument.type == 6) {
                return Synth.pulseWidthSynth;
            }
            else if (instrument.type == 2) {
                return Synth.noiseSynth;
            }
            else if (instrument.type == 3) {
                return Synth.spectrumSynth;
            }
            else if (instrument.type == 4) {
                return Synth.drumsetSynth;
            }
            else {
                throw new Error("Unrecognized instrument type: " + instrument.type);
            }
        }
        static chipSynth(synth, data, stereoBufferIndex, stereoBufferLength, runLength, tone, instrument) {
            const wave = beepbox.Config.chipWaves[instrument.chipWave].samples;
            const waveLength = +wave.length - 1;
            const intervalA = +Math.pow(2.0, (beepbox.Config.intervals[instrument.interval].offset + beepbox.Config.intervals[instrument.interval].spread) / 12.0);
            const intervalB = Math.pow(2.0, (beepbox.Config.intervals[instrument.interval].offset - beepbox.Config.intervals[instrument.interval].spread) / 12.0) * tone.intervalMult;
            const intervalSign = tone.intervalVolumeMult * beepbox.Config.intervals[instrument.interval].sign;
            if (instrument.interval == 0 && !instrument.getChord().customInterval)
                tone.phases[1] = tone.phases[0];
            const deltaRatio = intervalB / intervalA;
            let phaseDeltaA = tone.phaseDeltas[0] * intervalA * waveLength;
            let phaseDeltaB = phaseDeltaA * deltaRatio;
            const phaseDeltaScale = +tone.phaseDeltaScale;
            let volume = +tone.volumeStart;
            const volumeDelta = +tone.volumeDelta;
            let phaseA = (tone.phases[0] % 1) * waveLength;
            let phaseB = (tone.phases[1] % 1) * waveLength;
            let filter1 = +tone.filter;
            let filter2 = instrument.getFilterIsFirstOrder() ? 1.0 : filter1;
            const filterScale1 = +tone.filterScale;
            const filterScale2 = instrument.getFilterIsFirstOrder() ? 1.0 : filterScale1;
            const filterResonance = beepbox.Config.filterMaxResonance * Math.pow(Math.max(0, instrument.getFilterResonance() - 1) / (beepbox.Config.filterResonanceRange - 2), 0.5);
            let filterSample0 = +tone.filterSample0;
            let filterSample1 = +tone.filterSample1;
            const phaseAInt = phaseA | 0;
            const phaseBInt = phaseB | 0;
            const indexA = phaseAInt % waveLength;
            const indexB = phaseBInt % waveLength;
            const phaseRatioA = phaseA - phaseAInt;
            const phaseRatioB = phaseB - phaseBInt;
            let prevWaveIntegralA = wave[indexA];
            let prevWaveIntegralB = wave[indexB];
            prevWaveIntegralA += (wave[indexA + 1] - prevWaveIntegralA) * phaseRatioA;
            prevWaveIntegralB += (wave[indexB + 1] - prevWaveIntegralB) * phaseRatioB;
            const stopIndex = stereoBufferIndex + runLength;
            stereoBufferIndex += tone.stereoOffset;
            const stereoVolume1 = tone.stereoVolume1;
            const stereoVolume2 = tone.stereoVolume2;
            const stereoDelay = tone.stereoDelay;
            while (stereoBufferIndex < stopIndex) {
                phaseA += phaseDeltaA;
                phaseB += phaseDeltaB;
                const phaseAInt = phaseA | 0;
                const phaseBInt = phaseB | 0;
                const indexA = phaseAInt % waveLength;
                const indexB = phaseBInt % waveLength;
                let nextWaveIntegralA = wave[indexA];
                let nextWaveIntegralB = wave[indexB];
                const phaseRatioA = phaseA - phaseAInt;
                const phaseRatioB = phaseB - phaseBInt;
                nextWaveIntegralA += (wave[indexA + 1] - nextWaveIntegralA) * phaseRatioA;
                nextWaveIntegralB += (wave[indexB + 1] - nextWaveIntegralB) * phaseRatioB;
                let waveA = (nextWaveIntegralA - prevWaveIntegralA) / phaseDeltaA;
                let waveB = (nextWaveIntegralB - prevWaveIntegralB) / phaseDeltaB;
                prevWaveIntegralA = nextWaveIntegralA;
                prevWaveIntegralB = nextWaveIntegralB;
                const combinedWave = (waveA + waveB * intervalSign);
                const feedback = filterResonance + filterResonance / (1.0 - filter1);
                filterSample0 += filter1 * (combinedWave - filterSample0 + feedback * (filterSample0 - filterSample1));
                filterSample1 += filter2 * (filterSample0 - filterSample1);
                filter1 *= filterScale1;
                filter2 *= filterScale2;
                phaseDeltaA *= phaseDeltaScale;
                phaseDeltaB *= phaseDeltaScale;
                const output = filterSample1 * volume;
                volume += volumeDelta;
                data[stereoBufferIndex] += output * stereoVolume1;
                data[(stereoBufferIndex + stereoDelay) % stereoBufferLength] += output * stereoVolume2;
                stereoBufferIndex += 2;
            }
            tone.phases[0] = phaseA / waveLength;
            tone.phases[1] = phaseB / waveLength;
            const epsilon = (1.0e-24);
            if (-epsilon < filterSample0 && filterSample0 < epsilon)
                filterSample0 = 0.0;
            if (-epsilon < filterSample1 && filterSample1 < epsilon)
                filterSample1 = 0.0;
            tone.filterSample0 = filterSample0;
            tone.filterSample1 = filterSample1;
        }
        static harmonicsSynth(synth, data, stereoBufferIndex, stereoBufferLength, runLength, tone, instrument) {
            const wave = instrument.harmonicsWave.getCustomWave();
            const waveLength = +wave.length - 1;
            const intervalA = +Math.pow(2.0, (beepbox.Config.intervals[instrument.interval].offset + beepbox.Config.intervals[instrument.interval].spread) / 12.0);
            const intervalB = Math.pow(2.0, (beepbox.Config.intervals[instrument.interval].offset - beepbox.Config.intervals[instrument.interval].spread) / 12.0) * tone.intervalMult;
            const intervalSign = tone.intervalVolumeMult * beepbox.Config.intervals[instrument.interval].sign;
            if (instrument.interval == 0 && !instrument.getChord().customInterval)
                tone.phases[1] = tone.phases[0];
            const deltaRatio = intervalB / intervalA;
            let phaseDeltaA = tone.phaseDeltas[0] * intervalA * waveLength;
            let phaseDeltaB = phaseDeltaA * deltaRatio;
            const phaseDeltaScale = +tone.phaseDeltaScale;
            let volume = +tone.volumeStart;
            const volumeDelta = +tone.volumeDelta;
            let phaseA = (tone.phases[0] % 1) * waveLength;
            let phaseB = (tone.phases[1] % 1) * waveLength;
            let filter1 = +tone.filter;
            let filter2 = instrument.getFilterIsFirstOrder() ? 1.0 : filter1;
            const filterScale1 = +tone.filterScale;
            const filterScale2 = instrument.getFilterIsFirstOrder() ? 1.0 : filterScale1;
            const filterResonance = beepbox.Config.filterMaxResonance * Math.pow(Math.max(0, instrument.getFilterResonance() - 1) / (beepbox.Config.filterResonanceRange - 2), 0.5);
            let filterSample0 = +tone.filterSample0;
            let filterSample1 = +tone.filterSample1;
            const phaseAInt = phaseA | 0;
            const phaseBInt = phaseB | 0;
            const indexA = phaseAInt % waveLength;
            const indexB = phaseBInt % waveLength;
            const phaseRatioA = phaseA - phaseAInt;
            const phaseRatioB = phaseB - phaseBInt;
            let prevWaveIntegralA = wave[indexA];
            let prevWaveIntegralB = wave[indexB];
            prevWaveIntegralA += (wave[indexA + 1] - prevWaveIntegralA) * phaseRatioA;
            prevWaveIntegralB += (wave[indexB + 1] - prevWaveIntegralB) * phaseRatioB;
            const stopIndex = stereoBufferIndex + runLength;
            stereoBufferIndex += tone.stereoOffset;
            const stereoVolume1 = tone.stereoVolume1;
            const stereoVolume2 = tone.stereoVolume2;
            const stereoDelay = tone.stereoDelay;
            while (stereoBufferIndex < stopIndex) {
                phaseA += phaseDeltaA;
                phaseB += phaseDeltaB;
                const phaseAInt = phaseA | 0;
                const phaseBInt = phaseB | 0;
                const indexA = phaseAInt % waveLength;
                const indexB = phaseBInt % waveLength;
                let nextWaveIntegralA = wave[indexA];
                let nextWaveIntegralB = wave[indexB];
                const phaseRatioA = phaseA - phaseAInt;
                const phaseRatioB = phaseB - phaseBInt;
                nextWaveIntegralA += (wave[indexA + 1] - nextWaveIntegralA) * phaseRatioA;
                nextWaveIntegralB += (wave[indexB + 1] - nextWaveIntegralB) * phaseRatioB;
                let waveA = (nextWaveIntegralA - prevWaveIntegralA) / phaseDeltaA;
                let waveB = (nextWaveIntegralB - prevWaveIntegralB) / phaseDeltaB;
                prevWaveIntegralA = nextWaveIntegralA;
                prevWaveIntegralB = nextWaveIntegralB;
                const combinedWave = (waveA + waveB * intervalSign);
                const feedback = filterResonance + filterResonance / (1.0 - filter1);
                filterSample0 += filter1 * (combinedWave - filterSample0 + feedback * (filterSample0 - filterSample1));
                filterSample1 += filter2 * (filterSample0 - filterSample1);
                filter1 *= filterScale1;
                filter2 *= filterScale2;
                phaseDeltaA *= phaseDeltaScale;
                phaseDeltaB *= phaseDeltaScale;
                const output = filterSample1 * volume;
                volume += volumeDelta;
                data[stereoBufferIndex] += output * stereoVolume1;
                data[(stereoBufferIndex + stereoDelay) % stereoBufferLength] += output * stereoVolume2;
                stereoBufferIndex += 2;
            }
            tone.phases[0] = phaseA / waveLength;
            tone.phases[1] = phaseB / waveLength;
            const epsilon = (1.0e-24);
            if (-epsilon < filterSample0 && filterSample0 < epsilon)
                filterSample0 = 0.0;
            if (-epsilon < filterSample1 && filterSample1 < epsilon)
                filterSample1 = 0.0;
            tone.filterSample0 = filterSample0;
            tone.filterSample1 = filterSample1;
        }
        static pulseWidthSynth(synth, data, stereoBufferIndex, stereoBufferLength, runLength, tone, instrument) {
            let phaseDelta = tone.phaseDeltas[0];
            const phaseDeltaScale = +tone.phaseDeltaScale;
            let volume = +tone.volumeStart;
            const volumeDelta = +tone.volumeDelta;
            let phase = (tone.phases[0] % 1);
            let pulseWidth = tone.pulseWidth;
            const pulseWidthDelta = tone.pulseWidthDelta;
            let filter1 = +tone.filter;
            let filter2 = instrument.getFilterIsFirstOrder() ? 1.0 : filter1;
            const filterScale1 = +tone.filterScale;
            const filterScale2 = instrument.getFilterIsFirstOrder() ? 1.0 : filterScale1;
            const filterResonance = beepbox.Config.filterMaxResonance * Math.pow(Math.max(0, instrument.getFilterResonance() - 1) / (beepbox.Config.filterResonanceRange - 2), 0.5);
            let filterSample0 = +tone.filterSample0;
            let filterSample1 = +tone.filterSample1;
            const stopIndex = stereoBufferIndex + runLength;
            stereoBufferIndex += tone.stereoOffset;
            const stereoVolume1 = tone.stereoVolume1;
            const stereoVolume2 = tone.stereoVolume2;
            const stereoDelay = tone.stereoDelay;
            while (stereoBufferIndex < stopIndex) {
                const sawPhaseA = phase % 1;
                const sawPhaseB = (phase + pulseWidth) % 1;
                let pulseWave = sawPhaseB - sawPhaseA;
                if (sawPhaseA < phaseDelta) {
                    var t = sawPhaseA / phaseDelta;
                    pulseWave += (t + t - t * t - 1) * 0.5;
                }
                else if (sawPhaseA > 1.0 - phaseDelta) {
                    var t = (sawPhaseA - 1.0) / phaseDelta;
                    pulseWave += (t + t + t * t + 1) * 0.5;
                }
                if (sawPhaseB < phaseDelta) {
                    var t = sawPhaseB / phaseDelta;
                    pulseWave -= (t + t - t * t - 1) * 0.5;
                }
                else if (sawPhaseB > 1.0 - phaseDelta) {
                    var t = (sawPhaseB - 1.0) / phaseDelta;
                    pulseWave -= (t + t + t * t + 1) * 0.5;
                }
                const feedback = filterResonance + filterResonance / (1.0 - filter1);
                filterSample0 += filter1 * (pulseWave - filterSample0 + feedback * (filterSample0 - filterSample1));
                filterSample1 += filter2 * (filterSample0 - filterSample1);
                filter1 *= filterScale1;
                filter2 *= filterScale2;
                phase += phaseDelta;
                phaseDelta *= phaseDeltaScale;
                pulseWidth += pulseWidthDelta;
                const output = filterSample1 * volume;
                volume += volumeDelta;
                data[stereoBufferIndex] += output * stereoVolume1;
                data[(stereoBufferIndex + stereoDelay) % stereoBufferLength] += output * stereoVolume2;
                stereoBufferIndex += 2;
            }
            tone.phases[0] = phase;
            const epsilon = (1.0e-24);
            if (-epsilon < filterSample0 && filterSample0 < epsilon)
                filterSample0 = 0.0;
            if (-epsilon < filterSample1 && filterSample1 < epsilon)
                filterSample1 = 0.0;
            tone.filterSample0 = filterSample0;
            tone.filterSample1 = filterSample1;
        }
        static noiseSynth(synth, data, stereoBufferIndex, stereoBufferLength, runLength, tone, instrument) {
            let wave = instrument.getDrumWave();
            let phaseDelta = +tone.phaseDeltas[0];
            const phaseDeltaScale = +tone.phaseDeltaScale;
            let volume = +tone.volumeStart;
            const volumeDelta = +tone.volumeDelta;
            let phase = (tone.phases[0] % 1) * beepbox.Config.chipNoiseLength;
            if (tone.phases[0] == 0) {
                phase = Math.random() * beepbox.Config.chipNoiseLength;
            }
            let sample = +tone.sample;
            let filter1 = +tone.filter;
            let filter2 = instrument.getFilterIsFirstOrder() ? 1.0 : filter1;
            const filterScale1 = +tone.filterScale;
            const filterScale2 = instrument.getFilterIsFirstOrder() ? 1.0 : filterScale1;
            const filterResonance = beepbox.Config.filterMaxResonance * Math.pow(Math.max(0, instrument.getFilterResonance() - 1) / (beepbox.Config.filterResonanceRange - 2), 0.5);
            let filterSample0 = +tone.filterSample0;
            let filterSample1 = +tone.filterSample1;
            const pitchRelativefilter = Math.min(1.0, tone.phaseDeltas[0] * beepbox.Config.chipNoises[instrument.chipNoise].pitchFilterMult);
            const stopIndex = stereoBufferIndex + runLength;
            stereoBufferIndex += tone.stereoOffset;
            const stereoVolume1 = tone.stereoVolume1;
            const stereoVolume2 = tone.stereoVolume2;
            const stereoDelay = tone.stereoDelay;
            while (stereoBufferIndex < stopIndex) {
                const waveSample = wave[phase & 0x7fff];
                sample += (waveSample - sample) * pitchRelativefilter;
                const feedback = filterResonance + filterResonance / (1.0 - filter1);
                filterSample0 += filter1 * (sample - filterSample0 + feedback * (filterSample0 - filterSample1));
                filterSample1 += filter2 * (filterSample0 - filterSample1);
                phase += phaseDelta;
                filter1 *= filterScale1;
                filter2 *= filterScale2;
                phaseDelta *= phaseDeltaScale;
                const output = filterSample1 * volume;
                volume += volumeDelta;
                data[stereoBufferIndex] += output * stereoVolume1;
                data[(stereoBufferIndex + stereoDelay) % stereoBufferLength] += output * stereoVolume2;
                stereoBufferIndex += 2;
            }
            tone.phases[0] = phase / beepbox.Config.chipNoiseLength;
            tone.sample = sample;
            const epsilon = (1.0e-24);
            if (-epsilon < filterSample0 && filterSample0 < epsilon)
                filterSample0 = 0.0;
            if (-epsilon < filterSample1 && filterSample1 < epsilon)
                filterSample1 = 0.0;
            tone.filterSample0 = filterSample0;
            tone.filterSample1 = filterSample1;
        }
        static spectrumSynth(synth, data, stereoBufferIndex, stereoBufferLength, runLength, tone, instrument) {
            let wave = instrument.getDrumWave();
            let phaseDelta = tone.phaseDeltas[0] * (1 << 7);
            const phaseDeltaScale = +tone.phaseDeltaScale;
            let volume = +tone.volumeStart;
            const volumeDelta = +tone.volumeDelta;
            let sample = +tone.sample;
            let filter1 = +tone.filter;
            let filter2 = instrument.getFilterIsFirstOrder() ? 1.0 : filter1;
            const filterScale1 = +tone.filterScale;
            const filterScale2 = instrument.getFilterIsFirstOrder() ? 1.0 : filterScale1;
            const filterResonance = beepbox.Config.filterMaxResonance * Math.pow(Math.max(0, instrument.getFilterResonance() - 1) / (beepbox.Config.filterResonanceRange - 2), 0.5);
            let filterSample0 = +tone.filterSample0;
            let filterSample1 = +tone.filterSample1;
            let phase = (tone.phases[0] % 1) * beepbox.Config.chipNoiseLength;
            if (tone.phases[0] == 0)
                phase = Synth.findRandomZeroCrossing(wave) + phaseDelta;
            const pitchRelativefilter = Math.min(1.0, phaseDelta);
            const stopIndex = stereoBufferIndex + runLength;
            stereoBufferIndex += tone.stereoOffset;
            const stereoVolume1 = tone.stereoVolume1;
            const stereoVolume2 = tone.stereoVolume2;
            const stereoDelay = tone.stereoDelay;
            while (stereoBufferIndex < stopIndex) {
                const phaseInt = phase | 0;
                const index = phaseInt & 0x7fff;
                let waveSample = wave[index];
                const phaseRatio = phase - phaseInt;
                waveSample += (wave[index + 1] - waveSample) * phaseRatio;
                sample += (waveSample - sample) * pitchRelativefilter;
                const feedback = filterResonance + filterResonance / (1.0 - filter1);
                filterSample0 += filter1 * (sample - filterSample0 + feedback * (filterSample0 - filterSample1));
                filterSample1 += filter2 * (filterSample0 - filterSample1);
                phase += phaseDelta;
                filter1 *= filterScale1;
                filter2 *= filterScale2;
                phaseDelta *= phaseDeltaScale;
                const output = filterSample1 * volume;
                volume += volumeDelta;
                data[stereoBufferIndex] += output * stereoVolume1;
                data[(stereoBufferIndex + stereoDelay) % stereoBufferLength] += output * stereoVolume2;
                stereoBufferIndex += 2;
            }
            tone.phases[0] = phase / beepbox.Config.chipNoiseLength;
            tone.sample = sample;
            const epsilon = (1.0e-24);
            if (-epsilon < filterSample0 && filterSample0 < epsilon)
                filterSample0 = 0.0;
            if (-epsilon < filterSample1 && filterSample1 < epsilon)
                filterSample1 = 0.0;
            tone.filterSample0 = filterSample0;
            tone.filterSample1 = filterSample1;
        }
        static drumsetSynth(synth, data, stereoBufferIndex, stereoBufferLength, runLength, tone, instrument) {
            let wave = instrument.getDrumsetWave(tone.drumsetPitch);
            let phaseDelta = tone.phaseDeltas[0] / Instrument.drumsetIndexReferenceDelta(tone.drumsetPitch);
            ;
            const phaseDeltaScale = +tone.phaseDeltaScale;
            let volume = +tone.volumeStart;
            const volumeDelta = +tone.volumeDelta;
            let sample = +tone.sample;
            let filter1 = +tone.filter;
            let filter2 = instrument.getFilterIsFirstOrder() ? 1.0 : filter1;
            const filterScale1 = +tone.filterScale;
            const filterScale2 = instrument.getFilterIsFirstOrder() ? 1.0 : filterScale1;
            const filterResonance = beepbox.Config.filterMaxResonance * Math.pow(Math.max(0, instrument.getFilterResonance() - 1) / (beepbox.Config.filterResonanceRange - 2), 0.5);
            let filterSample0 = +tone.filterSample0;
            let filterSample1 = +tone.filterSample1;
            let phase = (tone.phases[0] % 1) * beepbox.Config.chipNoiseLength;
            if (tone.phases[0] == 0)
                phase = Synth.findRandomZeroCrossing(wave) + phaseDelta;
            const stopIndex = stereoBufferIndex + runLength;
            stereoBufferIndex += tone.stereoOffset;
            const stereoVolume1 = tone.stereoVolume1;
            const stereoVolume2 = tone.stereoVolume2;
            const stereoDelay = tone.stereoDelay;
            while (stereoBufferIndex < stopIndex) {
                const phaseInt = phase | 0;
                const index = phaseInt & 0x7fff;
                sample = wave[index];
                const phaseRatio = phase - phaseInt;
                sample += (wave[index + 1] - sample) * phaseRatio;
                const feedback = filterResonance + filterResonance / (1.0 - filter1);
                filterSample0 += filter1 * (sample - filterSample0 + feedback * (filterSample0 - filterSample1));
                filterSample1 += filter2 * (filterSample0 - filterSample1);
                phase += phaseDelta;
                filter1 *= filterScale1;
                filter2 *= filterScale2;
                phaseDelta *= phaseDeltaScale;
                const output = filterSample1 * volume;
                volume += volumeDelta;
                data[stereoBufferIndex] += output * stereoVolume1;
                data[(stereoBufferIndex + stereoDelay) % stereoBufferLength] += output * stereoVolume2;
                stereoBufferIndex += 2;
            }
            tone.phases[0] = phase / beepbox.Config.chipNoiseLength;
            tone.sample = sample;
            const epsilon = (1.0e-24);
            if (-epsilon < filterSample0 && filterSample0 < epsilon)
                filterSample0 = 0.0;
            if (-epsilon < filterSample1 && filterSample1 < epsilon)
                filterSample1 = 0.0;
            tone.filterSample0 = filterSample0;
            tone.filterSample1 = filterSample1;
        }
        static findRandomZeroCrossing(wave) {
            let phase = Math.random() * beepbox.Config.chipNoiseLength;
            let indexPrev = phase & 0x7fff;
            let wavePrev = wave[indexPrev];
            const stride = 16;
            for (let attemptsRemaining = 128; attemptsRemaining > 0; attemptsRemaining--) {
                const indexNext = (indexPrev + stride) & 0x7fff;
                const waveNext = wave[indexNext];
                if (wavePrev * waveNext <= 0.0) {
                    for (let i = 0; i < 16; i++) {
                        const innerIndexNext = (indexPrev + 1) & 0x7fff;
                        const innerWaveNext = wave[innerIndexNext];
                        if (wavePrev * innerWaveNext <= 0.0) {
                            const slope = innerWaveNext - wavePrev;
                            phase = indexPrev;
                            if (Math.abs(slope) > 0.00000001) {
                                phase += -wavePrev / slope;
                            }
                            phase = Math.max(0, phase) % beepbox.Config.chipNoiseLength;
                            break;
                        }
                        else {
                            indexPrev = innerIndexNext;
                            wavePrev = innerWaveNext;
                        }
                    }
                    break;
                }
                else {
                    indexPrev = indexNext;
                    wavePrev = waveNext;
                }
            }
            return phase;
        }
        static instrumentVolumeToVolumeMult(instrumentVolume) {
            return (instrumentVolume == beepbox.Config.volumeRange - 1) ? 0.0 : Math.pow(2, beepbox.Config.volumeLogScale * instrumentVolume);
        }
        static volumeMultToInstrumentVolume(volumeMult) {
            return (volumeMult <= 0.0) ? beepbox.Config.volumeRange - 1 : Math.min(beepbox.Config.volumeRange - 2, (Math.log(volumeMult) / Math.LN2) / beepbox.Config.volumeLogScale);
        }
        static expressionToVolumeMult(expression) {
            return Math.pow(Math.max(0.0, expression) / 3.0, 1.5);
        }
        static volumeMultToExpression(volumeMult) {
            return Math.pow(Math.max(0.0, volumeMult), 1 / 1.5) * 3.0;
        }
        getSamplesPerTick() {
            if (this.song == null)
                return 0;
            const beatsPerMinute = this.song.getBeatsPerMinute();
            const beatsPerSecond = beatsPerMinute / 60.0;
            const partsPerSecond = beatsPerSecond * beepbox.Config.partsPerBeat;
            const tickPerSecond = partsPerSecond * beepbox.Config.ticksPerPart;
            return Math.floor(this.samplesPerSecond / tickPerSecond);
        }
    }
    Synth.fmSynthFunctionCache = {};
    Synth.fmSourceTemplate = (`
			const sineWave = beepbox.Config.sineWave;
			
			let phaseDeltaScale = +tone.phaseDeltaScale;
			// I'm adding 1000 to the phase to ensure that it's never negative even when modulated by other waves because negative numbers don't work with the modulus operator very well.
			let operator#Phase       = +((tone.phases[#] % 1) + 1000) * beepbox.Config.sineWaveLength;
			let operator#PhaseDelta  = +tone.phaseDeltas[#];
			let operator#OutputMult  = +tone.volumeStarts[#];
			const operator#OutputDelta = +tone.volumeDeltas[#];
			let operator#Output      = +tone.feedbackOutputs[#];
			let feedbackMult         = +tone.feedbackMult;
			const feedbackDelta        = +tone.feedbackDelta;
			let volume = +tone.volumeStart;
			const volumeDelta = +tone.volumeDelta;
			
			let filter1 = +tone.filter;
			let filter2 = instrument.getFilterIsFirstOrder() ? 1.0 : filter1;
			const filterScale1 = +tone.filterScale;
			const filterScale2 = instrument.getFilterIsFirstOrder() ? 1.0 : filterScale1;
			const filterResonance = beepbox.Config.filterMaxResonance * Math.pow(Math.max(0, instrument.getFilterResonance() - 1) / (beepbox.Config.filterResonanceRange - 2), 0.5);
			let filterSample0 = +tone.filterSample0;
			let filterSample1 = +tone.filterSample1;
			
			const stopIndex = stereoBufferIndex + runLength;
			stereoBufferIndex += tone.stereoOffset;
			const stereoVolume1 = tone.stereoVolume1;
			const stereoVolume2 = tone.stereoVolume2;
			const stereoDelay = tone.stereoDelay;
			while (stereoBufferIndex < stopIndex) {
				// INSERT OPERATOR COMPUTATION HERE
				const fmOutput = (/*operator#Scaled*/); // CARRIER OUTPUTS
				
				const feedback = filterResonance + filterResonance / (1.0 - filter1);
				filterSample0 += filter1 * (fmOutput - filterSample0 + feedback * (filterSample0 - filterSample1));
				filterSample1 += filter2 * (filterSample0 - filterSample1);
				
				feedbackMult += feedbackDelta;
				operator#OutputMult += operator#OutputDelta;
				operator#Phase += operator#PhaseDelta;
				operator#PhaseDelta *= phaseDeltaScale;
				filter1 *= filterScale1;
				filter2 *= filterScale2;
				
				const output = filterSample1 * volume;
				volume += volumeDelta;
				
				data[stereoBufferIndex] += output * stereoVolume1;
				data[(stereoBufferIndex + stereoDelay) % stereoBufferLength] += output * stereoVolume2;
				stereoBufferIndex += 2;
			}
			
			tone.phases[#] = operator#Phase / ` + beepbox.Config.sineWaveLength + `;
			tone.feedbackOutputs[#] = operator#Output;
			
			const epsilon = (1.0e-24);
			if (-epsilon < filterSample0 && filterSample0 < epsilon) filterSample0 = 0.0;
			if (-epsilon < filterSample1 && filterSample1 < epsilon) filterSample1 = 0.0;
			tone.filterSample0 = filterSample0;
			tone.filterSample1 = filterSample1;
		`).split("\n");
    Synth.operatorSourceTemplate = (`
				const operator#PhaseMix = operator#Phase/* + operator@Scaled*/;
				const operator#PhaseInt = operator#PhaseMix|0;
				const operator#Index    = operator#PhaseInt & ` + beepbox.Config.sineWaveMask + `;
				const operator#Sample   = sineWave[operator#Index];
				operator#Output       = operator#Sample + (sineWave[operator#Index + 1] - operator#Sample) * (operator#PhaseMix - operator#PhaseInt);
				const operator#Scaled   = operator#OutputMult * operator#Output;
		`).split("\n");
    beepbox.Synth = Synth;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class ChangeNotifier {
        constructor() {
            this._watchers = [];
            this._dirty = false;
        }
        watch(watcher) {
            if (this._watchers.indexOf(watcher) == -1) {
                this._watchers.push(watcher);
            }
        }
        unwatch(watcher) {
            const index = this._watchers.indexOf(watcher);
            if (index != -1) {
                this._watchers.splice(index, 1);
            }
        }
        changed() {
            this._dirty = true;
        }
        notifyWatchers() {
            if (!this._dirty)
                return;
            this._dirty = false;
            for (const watcher of this._watchers.concat()) {
                watcher();
            }
        }
    }
    beepbox.ChangeNotifier = ChangeNotifier;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class SongDocument {
        constructor(string) {
            this.notifier = new beepbox.ChangeNotifier();
            this.channel = 0;
            this.bar = 0;
            this.volume = 75;
            this.trackVisibleBars = 16;
            this.barScrollPos = 0;
            this.prompt = null;
            this._recentChange = null;
            this._sequenceNumber = 0;
            this._stateChangeType = "replace";
            this._barFromCurrentState = 0;
            this._channelFromCurrentState = 0;
            this._waitingToUpdateState = false;
            this._whenHistoryStateChanged = () => {
                let state = window.history.state;
                if (state && state.sequenceNumber == this._sequenceNumber)
                    return;
                if (state == null) {
                    this._sequenceNumber++;
                    state = { canUndo: true, sequenceNumber: this._sequenceNumber, bar: this.bar, channel: this.channel, prompt: this.prompt };
                    new beepbox.ChangeSong(this, location.hash);
                    window.history.replaceState(state, "", "#" + this.song.toBase64String());
                }
                else {
                    if (state.sequenceNumber == this._sequenceNumber - 1) {
                        this.bar = this._barFromCurrentState;
                        this.channel = this._channelFromCurrentState;
                    }
                    else if (state.sequenceNumber != this._sequenceNumber) {
                        this.bar = state.bar;
                        this.channel = state.channel;
                    }
                    this._sequenceNumber = state.sequenceNumber;
                    this.prompt = state.prompt;
                    new beepbox.ChangeSong(this, location.hash);
                }
                this._barFromCurrentState = state.bar;
                this._channelFromCurrentState = state.channel;
                this.forgetLastChange();
                this.notifier.notifyWatchers();
            };
            this._cleanDocument = () => {
                this.notifier.notifyWatchers();
            };
            this._updateHistoryState = () => {
                this._waitingToUpdateState = false;
                const hash = "#" + this.song.toBase64String();
                if (this._stateChangeType == "push") {
                    this._sequenceNumber++;
                }
                else if (this._stateChangeType == "jump") {
                    this._sequenceNumber += 2;
                }
                let state = { canUndo: true, sequenceNumber: this._sequenceNumber, bar: this.bar, channel: this.channel, prompt: this.prompt };
                if (this._stateChangeType == "push" || this._stateChangeType == "jump") {
                    window.history.pushState(state, "", hash);
                }
                else {
                    window.history.replaceState(state, "", hash);
                }
                this._barFromCurrentState = state.bar;
                this._channelFromCurrentState = state.channel;
                this._stateChangeType = "replace";
            };
            this.song = new beepbox.Song(string);
            if (string == "" || string == undefined)
                beepbox.setDefaultInstruments(this.song);
            this.synth = new beepbox.Synth(this.song);
            this.autoPlay = localStorage.getItem("autoPlay") == "true";
            this.autoFollow = localStorage.getItem("autoFollow") == "true";
            this.showFifth = localStorage.getItem("showFifth") == "true";
            this.showLetters = localStorage.getItem("showLetters") == "true";
            this.showChannels = localStorage.getItem("showChannels") == "true";
            this.showScrollBar = localStorage.getItem("showScrollBar") == "true";
            this.alwaysShowSettings = localStorage.getItem("alwaysShowSettings") == "true";
            if (localStorage.getItem("volume") != null)
                this.volume = Number(localStorage.getItem("volume"));
            this.synth.volume = this._calcVolume();
            let state = window.history.state;
            if (state == null) {
                state = { canUndo: false, sequenceNumber: 0, bar: 0, channel: 0, prompt: null };
                window.history.replaceState(state, "", "#" + this.song.toBase64String());
            }
            window.addEventListener("hashchange", this._whenHistoryStateChanged);
            window.addEventListener("popstate", this._whenHistoryStateChanged);
            this.bar = state.bar;
            this.channel = state.channel;
            this._barFromCurrentState = state.bar;
            this._channelFromCurrentState = state.channel;
            this.barScrollPos = Math.max(0, this.bar - (this.trackVisibleBars - 6));
            this.prompt = state.prompt;
            for (const eventName of ["input", "change", "click", "keyup", "keydown", "mousedown", "mousemove", "mouseup", "touchstart", "touchmove", "touchend", "touchcancel"]) {
                window.addEventListener(eventName, this._cleanDocument);
            }
        }
        record(change, stateChangeType = "push") {
            if (change.isNoop()) {
                this._recentChange = null;
                if (stateChangeType == "replace") {
                    window.history.back();
                }
            }
            else {
                change.commit();
                this._recentChange = change;
                if (stateChangeType == "push" && this._stateChangeType == "replace") {
                    this._stateChangeType = stateChangeType;
                }
                else if (stateChangeType == "jump") {
                    this._stateChangeType = stateChangeType;
                }
                if (!this._waitingToUpdateState) {
                    window.requestAnimationFrame(this._updateHistoryState);
                    this._waitingToUpdateState = true;
                }
            }
        }
        openPrompt(prompt) {
            this.prompt = prompt;
            const hash = "#" + this.song.toBase64String();
            this._sequenceNumber++;
            const state = { canUndo: true, sequenceNumber: this._sequenceNumber, bar: this.bar, channel: this.channel, prompt: this.prompt };
            window.history.pushState(state, "", hash);
        }
        undo() {
            const state = window.history.state;
            if (state.canUndo)
                window.history.back();
        }
        redo() {
            window.history.forward();
        }
        setProspectiveChange(change) {
            this._recentChange = change;
        }
        forgetLastChange() {
            this._recentChange = null;
        }
        lastChangeWas(change) {
            return change != null && change == this._recentChange;
        }
        goBackToStart() {
            this.channel = 0;
            this.bar = 0;
            this.barScrollPos = 0;
            this.notifier.changed();
            this.synth.snapToStart();
            this.notifier.changed();
        }
        savePreferences() {
            localStorage.setItem("autoPlay", this.autoPlay ? "true" : "false");
            localStorage.setItem("autoFollow", this.autoFollow ? "true" : "false");
            localStorage.setItem("showFifth", this.showFifth ? "true" : "false");
            localStorage.setItem("showLetters", this.showLetters ? "true" : "false");
            localStorage.setItem("showChannels", this.showChannels ? "true" : "false");
            localStorage.setItem("showScrollBar", this.showScrollBar ? "true" : "false");
            localStorage.setItem("alwaysShowSettings", this.alwaysShowSettings ? "true" : "false");
            localStorage.setItem("volume", String(this.volume));
        }
        setVolume(val) {
            this.volume = val;
            this.savePreferences();
            this.synth.volume = this._calcVolume();
        }
        _calcVolume() {
            return Math.min(1.0, Math.pow(this.volume / 50.0, 0.5)) * Math.pow(2.0, (this.volume - 75.0) / 25.0);
        }
        getCurrentPattern() {
            return this.song.getPattern(this.channel, this.bar);
        }
        getCurrentInstrument() {
            const pattern = this.getCurrentPattern();
            return pattern == null ? 0 : pattern.instrument;
        }
    }
    beepbox.SongDocument = SongDocument;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const classAttributeNames = { "class": true, "classList": true, "className": true };
    function applyElementArgs(elem, args) {
        for (const arg of args) {
            if (Array.isArray(arg)) {
                applyElementArgs(elem, arg);
            }
            else if (arg instanceof Node) {
                elem.appendChild(arg);
            }
            else if (arg && arg.constructor === Object) {
                for (const key of Object.keys(arg)) {
                    const value = arg[key];
                    if (classAttributeNames[key]) {
                        if (key === "classList") {
                            const names = Array.isArray(value) ? value : value.split(" ");
                            for (const name of names)
                                elem.classList.add(name);
                        }
                        else {
                            elem.setAttribute("class", Array.isArray(value) ? value.join(" ") : value);
                        }
                    }
                    else if (key === "style") {
                        if (value && value.constructor === Object) {
                            for (const styleKey of Object.keys(value)) {
                                if (styleKey.startsWith("--")) {
                                    elem.style.setProperty(styleKey, value[styleKey]);
                                }
                                else if (elem.style.hasOwnProperty(styleKey)) {
                                    elem.style[styleKey] = value[styleKey];
                                }
                                else {
                                    console.log("Unrecognized style property name: " + styleKey);
                                }
                            }
                        }
                        else {
                            elem.setAttribute(key, value);
                        }
                    }
                    else if (typeof (value) === "function") {
                        elem[key] = value;
                    }
                    else if (typeof (value) === "boolean") {
                        if (value)
                            elem.setAttribute(key, "");
                        else
                            elem.removeAttribute(key);
                    }
                    else {
                        elem.setAttribute(key, value);
                    }
                }
            }
            else {
                elem.appendChild(document.createTextNode(arg));
            }
        }
        return elem;
    }
    const svgNS = "http://www.w3.org/2000/svg";
    beepbox.HTML = function () { };
    beepbox.HTML.element = function (name, ...args) {
        return applyElementArgs(document.createElement(name), args);
    };
    beepbox.SVG = function () { };
    beepbox.SVG.element = function (name, ...args) {
        return applyElementArgs(document.createElementNS(svgNS, name), args);
    };
    for (const name of "a abbr address area article aside audio b base bdi bdo blockquote br button canvas caption cite code col colgroup datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hr i iframe img input ins kbd label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr".split(" ")) {
        beepbox.HTML[name] = function (...args) {
            return applyElementArgs(document.createElement(name), args);
        };
    }
    for (const name of "a altGlyph altGlyphDef altGlyphItem animate animateMotion animateTransform circle clipPath color-profile cursor defs desc discard ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font font-face font-face-format font-face-name font-face-src font-face-uri foreignObject g glyph glyphRef hkern image line linearGradient marker mask metadata missing-glyph mpath path pattern polygon polyline radialGradient rect script set stop style svg switch symbol text textPath title tref tspan use view vkern".split(" ")) {
        beepbox.SVG[name] = function (...args) {
            return applyElementArgs(document.createElementNS(svgNS, name), args);
        };
    }
    function prettyNumber(value) {
        return value.toFixed(2).replace(/\.?0*$/, "");
    }
    beepbox.prettyNumber = prettyNumber;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const styleSheet = document.createElement('style');
    styleSheet.type = "text/css";
    styleSheet.appendChild(document.createTextNode(`

.beepboxEditor {
	display: flex;
	position: relative;
	touch-action: manipulation;
	cursor: default;
	font-size: small;
	overflow: hidden;
}

.beepboxEditor .noSelection {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.beepboxEditor div {
	margin: 0;
	padding: 0;
}

.beepboxEditor .tip {
	cursor: help;
}

.beepboxEditor .tip:hover {
	color: #98f;
	text-decoration: underline;
}
.beepboxEditor .tip:active {
	color: white;
}

.beepboxEditor .promptContainer {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.beepboxEditor .prompt {
	margin: auto;
	text-align: center;
	background: #000;
	border-radius: 15px;
	border: 4px solid #444;
	color: #fff;
	padding: 20px;
	display: flex;
	flex-direction: column;
	position: relative;
}

.beepboxEditor .prompt > *:not(:first-child):not(.cancelButton) {
	margin-top: 1.5em;
}

.beepboxEditor .prompt h2 {
	font-size: 2em;
	margin: 0 16px;
	font-weight: normal;
}

.beepboxEditor .prompt p {
	text-align: left;
	margin: 1em 0;
}

/* Use psuedo-elements to add cross-browser up & down arrows to select elements: */
.beepboxEditor .selectContainer {
	position: relative;
}
.beepboxEditor .selectContainer:not(.menu)::before {
	content: "";
	position: absolute;
	right: 0.3em;
	top: 0.4em;
	border-bottom: 0.4em solid currentColor;
	border-left: 0.3em solid transparent;
	border-right: 0.3em solid transparent;
	pointer-events: none;
}
.beepboxEditor .selectContainer:not(.menu)::after {
	content: "";
	position: absolute;
	right: 0.3em;
	bottom: 0.4em;
	border-top: 0.4em solid currentColor;
	border-left: 0.3em solid transparent;
	border-right: 0.3em solid transparent;
	pointer-events: none;
}
.beepboxEditor .selectContainer.menu::after {
	content: "";
	position: absolute;
	right: 0.7em;
	margin: auto;
	top: 0;
	bottom: 0;
	height: 0;
	border-top: 0.4em solid currentColor;
	border-left: 0.3em solid transparent;
	border-right: 0.3em solid transparent;
	pointer-events: none;
}
.beepboxEditor select {
	margin: 0;
	padding: 0 0.3em;
	display: block;
	height: 2em;
	border: none;
	border-radius: 0.4em;
	background: #444444;
	color: inherit;
	font-size: inherit;
	cursor: pointer;
	font-family: inherit;

	-webkit-appearance:none;
	-moz-appearance: none;
	appearance: none;
}
.beepboxEditor .menu select {
	padding: 0 2em;
}
.beepboxEditor select:focus {
	background: #777777;
	outline: none;
}
.beepboxEditor .menu select {
	text-align: center;
	text-align-last: center;
}
.beepboxEditor .editor-settings select {
	width: 100%;
}

/* This makes it look better in firefox on my computer... What about others?
@-moz-document url-prefix() {
	.beepboxEditor select { padding: 0 2px; }
}
*/
.beepboxEditor button {
	margin: 0;
	position: relative;
	height: 2em;
	border: none;
	border-radius: 0.4em;
	background: #444;
	color: inherit;
	font-size: inherit;
	font-family: inherit;
	cursor: pointer;
}
.beepboxEditor button:focus {
	background: #777;
	outline: none;
}

.beepboxEditor button.cancelButton {
	float: right;
	width: 2em;
	position: absolute;
	top: 8px;
	right: 8px;
}

.beepboxEditor button.playButton, .beepboxEditor button.pauseButton, .beepboxEditor button.okayButton, .beepboxEditor button.exportButton {
	padding-left: 2em;
}
.beepboxEditor button.playButton::before {
	content: "";
	position: absolute;
	left: 0.7em;
	top: 50%;
	margin-top: -0.65em;
	border-left: 1em solid currentColor;
	border-top: 0.65em solid transparent;
	border-bottom: 0.65em solid transparent;
	pointer-events: none;
}
.beepboxEditor button.pauseButton::before {
	content: "";
	position: absolute;
	left: 0.7em;
	top: 50%;
	margin-top: -0.65em;
	width: 0.3em;
	height: 1.3em;
	background: currentColor;
	pointer-events: none;
}
.beepboxEditor button.pauseButton::after {
	content: "";
	position: absolute;
	left: 1.4em;
	top: 50%;
	margin-top: -0.65em;
	width: 0.3em;
	height: 1.3em;
	background: currentColor;
	pointer-events: none;
}

.beepboxEditor button.prevBarButton::before {
	content: "";
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -0.5em;
	margin-top: -0.5em;
	width: 0.2em;
	height: 1em;
	background: currentColor;
	pointer-events: none;
}
.beepboxEditor button.prevBarButton::after {
	content: "";
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -0.3em;
	margin-top: -0.5em;
	border-right: 0.8em solid currentColor;
	border-top: 0.5em solid transparent;
	border-bottom: 0.5em solid transparent;
	pointer-events: none;
}

.beepboxEditor button.nextBarButton::before {
	content: "";
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -0.5em;
	margin-top: -0.5em;
	border-left: 0.8em solid currentColor;
	border-top: 0.5em solid transparent;
	border-bottom: 0.5em solid transparent;
	pointer-events: none;
}
.beepboxEditor button.nextBarButton::after {
	content: "";
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: 0.3em;
	margin-top: -0.5em;
	width: 0.2em;
	height: 1em;
	background: currentColor;
	pointer-events: none;
}

.beepboxEditor button.cancelButton::before {
	content: "";
	position: absolute;
	width: 2em;
	height: 2em;
	left: 0;
	top: 0;
	pointer-events: none;
	background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><path fill="white" d="M -8 -6 L -6 -8 L 0 -2  L 6 -8 L 8 -6 L 2 0 L 8 6 L 6 8 L 0 2 L -6 8 L -8 6 L -2 0 z"></path></svg>');
	background-repeat: no-repeat;
}

.beepboxEditor button.okayButton::before {
	content: "";
	position: absolute;
	width: 2em;
	height: 2em;
	left: 0;
	top: 0;
	pointer-events: none;
	background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><path fill="white" d="M -9 -2 L -8 -3 L -3 2 L 9 -8 L 10 -7 L -3 8 z"></path></svg>');
	background-repeat: no-repeat;
}

.beepboxEditor button.exportButton::before {
	content: "";
	position: absolute;
	width: 2em;
	height: 2em;
	left: 0;
	top: 0;
	pointer-events: none;
	background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="-13 -13 26 26"><path fill="white" d="M -8 3 L -8 8 L 8 8 L 8 3 L 6 3 L 6 6 L -6 6 L -6 3 z M 0 2 L -4 -2 L -1 -2 L -1 -8 L 1 -8 L 1 -2 L 4 -2 z"></path></svg>');
	background-repeat: no-repeat;
}

.beepboxEditor canvas {
	overflow: hidden;
	position: absolute;
	display: block;
}

.beepboxEditor .trackContainer {
	overflow-x: hidden;
}

.beepboxEditor .selectRow {
	margin: 2px 0;
	height: 2em;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}

.beepboxEditor .selectRow > span:first-child {
	color: #999;
}

.beepboxEditor .operatorRow {
	margin: 2px 0;
	height: 2em;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.beepboxEditor .operatorRow > * {
	flex-grow: 1;
	flex-shrink: 1;
}

.beepboxEditor .editor-widget-column {
	display: flex;
	flex-direction: column;
}

.beepboxEditor .editor-widgets {
	display: flex;
	flex-direction: column;
}

.beepboxEditor .editor-controls {
	display: flex;
	flex-direction: column;
}

.beepboxEditor .editor-menus {
	display: flex;
	flex-direction: column;
}
.beepboxEditor .editor-menus > * {
	flex-grow: 1;
	margin: 2px 0;
}
.beepboxEditor .editor-menus > button {
	padding: 0 2em;
	white-space: nowrap;
}

.beepboxEditor .editor-settings {
	display: flex;
	flex-direction: column;
}

.beepboxEditor .editor-song-settings {
	display: flex;
	flex-direction: column;
}

.beepboxEditor .editor-instrument-settings {
	display: flex;
	flex-direction: column;
}

.beepboxEditor .editor-right-side-top > *, .beepboxEditor .editor-right-side-bottom > * {
	flex-shrink: 0;
}

.beepboxEditor input[type=text], .beepboxEditor input[type=number] {
	font-size: inherit;
	background: transparent;
	border: 1px solid #777;
	color: white;
}

.beepboxEditor input[type=text]::selection, .beepboxEditor input[type=number]::selection {
	/*background: #7744ff; ugh browsers override the alpha. */
	background-color: rgba(119,68,255,0.99);
	color: white;
}

.beepboxEditor input[type=checkbox] {
  transform: scale(1.5);
}

.beepboxEditor input[type=range] {
	-webkit-appearance: none;
	color: inherit;
	width: 100%;
	height: 2em;
	font-size: inherit;
	margin: 0;
	cursor: pointer;
	background-color: black;
	touch-action: pan-y;
}
.beepboxEditor input[type=range]:focus {
	outline: none;
}
.beepboxEditor input[type=range]::-webkit-slider-runnable-track {
	width: 100%;
	height: 0.5em;
	cursor: pointer;
	background: #444;
}
.beepboxEditor input[type=range]::-webkit-slider-thumb {
	height: 2em;
	width: 0.5em;
	border-radius: 0.25em;
	background: currentColor;
	cursor: pointer;
	-webkit-appearance: none;
	margin-top: -0.75em;
}
.beepboxEditor input[type=range]:focus::-webkit-slider-runnable-track {
	background: #777;
}
.beepboxEditor input[type=range]::-moz-range-track {
	width: 100%;
	height: 0.5em;
	cursor: pointer;
	background: #444;
}
.beepboxEditor input[type=range]:focus::-moz-range-track {
	background: #777;
}
.beepboxEditor input[type=range]::-moz-range-thumb {
	height: 2em;
	width: 0.5em;
	border-radius: 0.25em;
	border: none;
	background: currentColor;
	cursor: pointer;
}
.beepboxEditor input[type=range]::-ms-track {
	width: 100%;
	height: 0.5em;
	cursor: pointer;
	background: #444;
	border-color: transparent;
}
.beepboxEditor input[type=range]:focus::-ms-track {
	background: #777;
}
.beepboxEditor input[type=range]::-ms-thumb {
	height: 2em;
	width: 0.5em;
	border-radius: 0.25em;
	background: currentColor;
	cursor: pointer;
}
.beepboxEditor .hintButton {
	border: 1px solid currentColor;
	border-radius: 50%;
	text-decoration: none;
	width: 1em;
	height: 1em;
	text-align: center;
	margin-left: auto;
	margin-right: .4em;
	cursor: pointer;
}

/* wide screen */
@media (min-width: 701px) {
	#beepboxEditorContainer {
		display: table;
	}
	.beepboxEditor {
		flex-direction: row;
	}
	.beepboxEditor:focus-within {
		outline: 3px solid #555;
	}
	.beepboxEditor .trackContainer {
		width: 512px;
	}
	.beepboxEditor .playback-controls {
		display: flex;
		flex-direction: column;
	}
	.beepboxEditor .playback-bar-controls {
		display: flex;
		flex-direction: row;
		margin: 2px 0;
	}
	.beepboxEditor .playback-volume-controls {
		display: flex;
		flex-direction: row;
		margin: 2px 0;
		align-items: center;
	}
	.beepboxEditor .pauseButton, .beepboxEditor .playButton {
		flex-grow: 1;
	}
	.beepboxEditor .nextBarButton, .beepboxEditor .prevBarButton {
		flex-grow: 1;
		margin-left: 10px;
	}
	.beepboxEditor .editor-widget-column {
		margin-left: 6px;
		width: 14em;
		flex-direction: column;
	}
	.beepboxEditor .editor-widgets {
		flex-grow: 1;
	}
	.beepboxEditor .selectRow > :nth-child(2) {
		width: 8.6em;
	}
}

/* narrow screen */
@media (max-width: 700px) {
	.beepboxEditor {
		flex-direction: column;
	}
	.beepboxEditor:focus-within {
		outline: none;
	}
	.beepboxEditor .editorBox {
		max-height: 75vh;
	}
	.beepboxEditor .trackContainer {
		overflow-x: auto;
	}
	.beepboxEditor .barScrollBar {
		display: none;
	}
	.beepboxEditor .playback-controls {
		display: flex;
		flex-direction: row;
		margin: 2px 0;
	}
	.beepboxEditor .playback-bar-controls {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
	}
	.beepboxEditor .playback-volume-controls {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-grow: 1;
		margin: 0 2px;
	}
	.beepboxEditor .editor-widget-column {
		flex-direction: column-reverse;
	}
	.beepboxEditor .editor-settings {
		flex-direction: row;
	}
	.beepboxEditor .pauseButton, .beepboxEditor .playButton,
	.beepboxEditor .nextBarButton, .beepboxEditor .prevBarButton {
		flex-grow: 1;
		margin: 0 2px;
	}
	.beepboxEditor .editor-song-settings, .beepboxEditor .editor-instrument-settings {
		flex-grow: 1;
		flex-basis: 0;
		margin: 0 4px;
	}
	.beepboxEditor .selectRow > :nth-child(2) {
		width: 60%;
	}
	.fullWidthOnly {
		display: none;
	}
}

`));
    document.head.appendChild(styleSheet);
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const { button, div, p, h2 } = beepbox.HTML;
    class TipPrompt {
        constructor(_doc, type) {
            this._doc = _doc;
            this._closeButton = button({ className: "cancelButton" });
            this._close = () => {
                this._doc.undo();
            };
            this.cleanUp = () => {
                this._closeButton.removeEventListener("click", this._close);
            };
            let message;
            switch (type) {
                case "scale":
                    {
                        message = div(h2("Scale"), p("This setting limits the available pitches for adding notes. You may think that there's no point in limiting your choices, but the set of pitches you use has a strong influence on the mood and feel of your song, and these scales serve as guides to help you choose appropriate pitches. Don't worry, you can change the scale at any time, so you're not locked into it. Try making little melodies using all the available notes of a scale to get a sense for how it sounds."), p("Most of the scales have a major version, marked with a smiley face, and a minor version, marked with a sad face. Major scales tend to sound more playful or optimistic if you emphasize \"tonic\" notes (the brown rows in the pattern editor) at various points in your melody, whereas minor scales sound more serious or sad if you emphasize \"tonic\" notes."));
                    }
                    break;
                case "key":
                    {
                        message = div(h2("Song Key"), p("This setting can shift the frequency of every note in your entire song up or down to align the tonic notes (the brown rows) with the selected \"key\" pitch."));
                    }
                    break;
                case "tempo":
                    {
                        message = div(h2("Song Tempo"), p("This setting controls the speed of your song, measured in beats-per-minute."));
                    }
                    break;
                case "reverb":
                    {
                        message = div(h2("Reverb"), p("Reverb is a kind of echo effect. You can use this slider to control the amount of reverb for instruments that enable it. A little bit helps instruments sound more natural. Adding a lot of reverb can add sense of depth or mystery."));
                    }
                    break;
                case "rhythm":
                    {
                        message = div(h2("Rhythm"), p("This setting determines how beats are divided. The pattern editor helps you align notes to fractions of a beat based on this setting."));
                    }
                    break;
                case "instrumentIndex":
                    {
                        message = div(h2("Instrument Number"), p("BeepBox can have multiple instruments per channel, but it can only play one instrument at a time in each channel. This setting determines which of the instruments should be used to play the currently selected pattern. Different patterns in the channel can use different instruments."));
                    }
                    break;
                case "instrumentVolume":
                    {
                        message = div(h2("Instrument Volume"), p("This setting controls the volume of the selected instrument without affecting the volume of the other instruments. This allows you to balance the loudness of each instrument relative to each other."));
                    }
                    break;
                case "pan":
                    {
                        message = div(h2("Instrument Panning"), p("If you're listening through headphones or some other stereo sound system, this controls the position of the instrument and where the sound is coming from, ranging from left to right."), p("As a rule of thumb, composers typically put lead melodies, drums, and basses in the center, and spread any other instruments to either side. If too many instruments seem like they're coming from the same place, it can feel crowded and harder to distinguish individual sounds, especially if they cover a similar pitch range."));
                    }
                    break;
                case "instrumentType":
                    {
                        message = div(h2("Instrument Type"), p("BeepBox comes with many instrument presets. You can also create your own custom instruments, or even generate random ones!"));
                    }
                    break;
                case "filterCutoff":
                    {
                        message = div(h2("Low-Pass Filter Cutoff Frequency"), p("The lowest setting feels \"muffled\" or \"dark\", and the highest setting feels \"harsh\" or \"bright\"."), p("Most sounds include a range of frequencies from low to high. BeepBox instruments have a filter that allows the lowest frequencies to pass through at full volume, but can reduce the volume of the higher frequencies that are above a cutoff frequency. This setting controls the cutoff frequency and thus the range of higher frequencies that are reduced."), p("This cutoff setting also determines which frequency resonates when the resonance peak setting is used."));
                    }
                    break;
                case "filterResonance":
                    {
                        message = div(h2("Low-Pass Filter Resonance Peak"), p("Increasing this setting emphasizes a narrow range of frequencies, based on the position of the filter cutoff setting. This can be used to imitate the resonant bodies of acoustic instruments and other interesting effects."), p("The filter preserves the volume of frequencies that are below the cutoff frequency, and reduces the volume of frequencies that are above the cutoff. If this setting is used, the filter also increases the volume of frequencies that are near the cutoff."));
                    }
                    break;
                case "filterEnvelope":
                    {
                        message = div(h2("Low-Pass Filter Envelope"), p("This setting can dynamically change the filter cutoff frequency over time. Try the different options to see how they sound!"), p("The \"custom\" option uses the note volume as drawn in the pattern editor as the cutoff envelope."));
                    }
                    break;
                case "transition":
                    {
                        message = div(h2("Transition"), p("This setting controls how quickly notes begin and end."), p("Hard transitions start suddenly and sound like instruments that are played by hitting or plucking, whereas soft transitions start gradually and sound like instruments that are played by blowing air. Some transitions stop suddenly, but some fade out slowly after the end of the note."), p("The \"seamless\" and \"slide\" transitions connect the end of a note with the start of the next note."));
                    }
                    break;
                case "chipWave":
                    {
                        message = div(h2("Chip Wave"), p("BeepBox comes with some sound waves based on classic electronic sound chips, as well as several unique waves."));
                    }
                    break;
                case "chipNoise":
                    {
                        message = div(h2("Noise"), p("BeepBox comes with several basic noise sounds. These do not have any distinct musical pitch, and can be used like drums to create beats and emphasize your song's rhythm."));
                    }
                    break;
                case "pulseEnvelope":
                    {
                        message = div(h2("Pulse Wave Envelope"), p("This setting can dynamically change the pulse width over time. Try the different options to see how they sound!"), p("The \"custom\" option uses the note volume as drawn in the pattern editor as the pulse width envelope."));
                    }
                    break;
                case "pulseWidth":
                    {
                        message = div(h2("Pulse Wave Width"), p("This setting controls the shape and sound of a pulse wave. At the minimum width, it sounds light and buzzy. At the maximum width, it is shaped like a classic square wave."));
                    }
                    break;
                case "interval":
                    {
                        message = div(h2("Instrument Interval"), p("Some BeepBox instrument types can play two waves at slightly different frequencies. The difference between the frequencies is called an \"interval\", and this setting controls how large it is."), p("When two similar waves play at slightly different frequencies, they move in and out of phase with each other over time as different parts of the waves line up. This creates a dynamic, shifting sound. Pianos are a common example of this kind of sound, because each piano key strikes multiple strings that are tuned to slightly different frequencies."), p("If the interval is large, then the waves can sound out-of-tune and \"dissonant\". If the interval is even larger, then the two frequencies can even be distinct pitches."));
                    }
                    break;
                case "chords":
                    {
                        message = div(h2("Chords"), p("When multiple notes occur at the same time, this is called a chord. Chords can be created in BeepBox's pattern editor by adding notes above or below another note."), p("This setting determines how chords are played. The standard option is \"harmony\" which plays all of the notes out loud simultaneously. The \"strum\" option is similar, but plays the notes starting at slightly different times. The \"arpeggio\" option is used in \"chiptune\" style music and plays a single tone that rapidly alternates between all of the pitches in the chord."), p("Some BeepBox instruments have an option called \"custom interval\" which uses the chord notes to control the interval between the waves of a single tone. This can create strange sound effects when combined with FM modulators."));
                    }
                    break;
                case "vibrato":
                    {
                        message = div(h2("Vibrato"), p("This setting causes the frequency of a note to wobble slightly. Singers and violinists often use vibrato."));
                    }
                    break;
                case "algorithm":
                    {
                        message = div(h2("FM Algorithm"), p('FM Synthesis is a mysterious but powerful technique for crafting sounds, popularized by Yamaha keyboards and the Sega Genesis/Mega Drive. It may seem confusing, but try playing around with the options until you get a feel for it, or check out some of the preset examples!'), p('This FM synthesizer uses up to four waves, numbered 1, 2, 3, and 4. Each wave may have its own frequency, volume, and volume envelope to control its effect over time.'), p('There are two kinds of waves: "carrier" waves play a tone out loud, but "modulator" waves distort other waves instead. Wave 1 is always a carrier and plays a tone, but other waves may distort it. The "Algorithm" setting determines which waves are modulators, and which other waves those modulators distort. For example, "1â†2" means that wave 2 is modulating wave 1, and wave 1 is played out loud.'));
                    }
                    break;
                case "feedbackType":
                    {
                        message = div(h2("Feedback"), p('Modulators distort in one direction (like 1â†2), but you can also use the feedback setting to make any wave distort in the opposite direction (1â†’2), or even itself (1âŸ²).'));
                    }
                    break;
                case "operatorFrequency":
                    {
                        message = div(h2("Operator Frequency"), p('This setting controls the frequency of an individual FM wave. The fundamental frequency (1Ã—) is determined by the pitch of the note, and the frequency (2Ã—) is an octave (12 semitones) above it. The frequencies with a "~" are slightly detuned and shift in and out of phase over time compared to the other frequencies.'), p('Try different combinations of a "carrier" wave and a "modulator" wave with different frequencies to get a feel for how they sound together.'));
                    }
                    break;
                case "operatorVolume":
                    {
                        message = div(h2("Operator Volume"), p("This setting controls the volume of \"carrier\" waves, or the amount of distortion that \"modulator\" waves apply to other waves."));
                    }
                    break;
                case "operatorEnvelope":
                    {
                        message = div(h2("Operator Envelope"), p("This setting can dynamically change the FM wave volume over time. Try the different options to see how they sound!"), p("The \"custom\" option uses the note volume as drawn in the pattern editor as the FM wave envelope."));
                    }
                    break;
                case "spectrum":
                    {
                        message = div(h2("Spectrum"), p("This setting allows you to draw your own noise spectrum! This is good for making drum sounds when combined with a hard transition and a falling filter cutoff envelope."), p("If you only use certain frequencies and a soft transition, it's also possible to make howling wind sounds or even musical blown bottle sounds."), p("The left side of the spectrum editor controls the noise energy at lower frequencies, and the right side controls higher frequencies."));
                    }
                    break;
                case "harmonics":
                    {
                        message = div(h2("Harmonics"), p("This setting allows you to design your own sound wave! Most musical waves are actually a combination of sine waves at certain frequencies, and this lets you control the volume of each sine wave individually."), p("The left side of the harmonics editor controls the sine wave volumes at lower frequencies, and the right side controls higher frequencies."));
                    }
                    break;
                case "effects":
                    {
                        message = div(h2("Effects"), p("BeepBox has two special effects you can add to instruments. You can turn on either effect, or both at once."), p("Reverb is a kind of echo effect. You can use the \"reverb\" slider in the \"Song Settings\" section above to control the amount of reverb for instruments that enable it. A little bit helps instruments sound more natural. Adding a lot of reverb can add sense of depth or mystery."), p("The chorus effect combines multiple copies of the instrument's sound and adds a bit of vibrato to simulate an ensemble of instruments or voices."));
                    }
                    break;
                case "drumsetEnvelope":
                    {
                        message = div(h2("Drumset Envelope"), p("This setting can dynamically change the filter cutoff frequency over time. Each row in the pattern editor gets its own envelope."), p("The \"custom\" option uses the note volume as drawn in the pattern editor as the drumset cutoff envelope."));
                    }
                    break;
                case "drumsetSpectrum":
                    {
                        message = div(h2("Drumset Spectrum"), p("This setting allows you to draw your own noise spectrum! This is good for making drumsets. Each row in the pattern editor gets its own spectrum."), p("The left side of the spectrum editor controls the noise energy at lower frequencies, and the right side controls higher frequencies."));
                    }
                    break;
                default: throw new Error("Unhandled TipPrompt type: " + type);
            }
            this.container = div({ className: "prompt", style: "width: 250px;" }, message, this._closeButton);
            setTimeout(() => this._closeButton.focus());
            this._closeButton.addEventListener("click", this._close);
        }
    }
    beepbox.TipPrompt = TipPrompt;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class Change {
        constructor() {
            this._noop = true;
        }
        _didSomething() {
            this._noop = false;
        }
        isNoop() {
            return this._noop;
        }
        commit() { }
    }
    beepbox.Change = Change;
    class UndoableChange extends Change {
        constructor(reversed) {
            super();
            this._reversed = reversed;
            this._doneForwards = !reversed;
        }
        undo() {
            if (this._reversed) {
                this._doForwards();
                this._doneForwards = true;
            }
            else {
                this._doBackwards();
                this._doneForwards = false;
            }
        }
        redo() {
            if (this._reversed) {
                this._doBackwards();
                this._doneForwards = false;
            }
            else {
                this._doForwards();
                this._doneForwards = true;
            }
        }
        _isDoneForwards() {
            return this._doneForwards;
        }
        _doForwards() {
            throw new Error("Change.doForwards(): Override me.");
        }
        _doBackwards() {
            throw new Error("Change.doBackwards(): Override me.");
        }
    }
    beepbox.UndoableChange = UndoableChange;
    class ChangeGroup extends Change {
        constructor() {
            super();
        }
        append(change) {
            if (change.isNoop())
                return;
            this._didSomething();
        }
    }
    beepbox.ChangeGroup = ChangeGroup;
    class ChangeSequence extends UndoableChange {
        constructor(changes) {
            super(false);
            if (changes == undefined) {
                this._changes = [];
            }
            else {
                this._changes = changes.concat();
            }
        }
        append(change) {
            if (change.isNoop())
                return;
            this._changes[this._changes.length] = change;
            this._didSomething();
        }
        _doForwards() {
            for (let i = 0; i < this._changes.length; i++) {
                this._changes[i].redo();
            }
        }
        _doBackwards() {
            for (let i = this._changes.length - 1; i >= 0; i--) {
                this._changes[i].undo();
            }
        }
    }
    beepbox.ChangeSequence = ChangeSequence;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    function unionOfUsedNotes(pattern, flags) {
        for (const note of pattern.notes) {
            for (const pitch of note.pitches) {
                for (const pin of note.pins) {
                    const key = (pitch + pin.interval) % 12;
                    if (!flags[key]) {
                        flags[key] = true;
                    }
                }
            }
        }
    }
    beepbox.unionOfUsedNotes = unionOfUsedNotes;
    function generateScaleMap(oldScaleFlags, newScaleValue) {
        const newScaleFlags = beepbox.Config.scales[newScaleValue].flags;
        const oldScale = [];
        const newScale = [];
        for (let i = 0; i < 12; i++) {
            if (oldScaleFlags[i])
                oldScale.push(i);
            if (newScaleFlags[i])
                newScale.push(i);
        }
        const largerToSmaller = oldScale.length > newScale.length;
        const smallerScale = largerToSmaller ? newScale : oldScale;
        const largerScale = largerToSmaller ? oldScale : newScale;
        const roles = ["root", "second", "second", "third", "third", "fourth", "tritone", "fifth", "sixth", "sixth", "seventh", "seventh", "root"];
        let bestScore = Number.MAX_SAFE_INTEGER;
        let bestIndexMap = [];
        const stack = [[0]];
        while (stack.length > 0) {
            const indexMap = stack.pop();
            if (indexMap.length == smallerScale.length) {
                let score = 0;
                for (let i = 0; i < indexMap.length; i++) {
                    score += Math.abs(smallerScale[i] - largerScale[indexMap[i]]);
                    if (roles[smallerScale[i]] != roles[largerScale[indexMap[i]]]) {
                        score += 0.75;
                    }
                }
                if (bestScore > score) {
                    bestScore = score;
                    bestIndexMap = indexMap;
                }
            }
            else {
                const lowIndex = indexMap[indexMap.length - 1] + 1;
                const highIndex = largerScale.length - smallerScale.length + indexMap.length;
                for (let i = lowIndex; i <= highIndex; i++) {
                    stack.push(indexMap.concat(i));
                }
            }
        }
        const sparsePitchMap = [];
        for (let i = 0; i < bestIndexMap.length; i++) {
            const smallerScalePitch = smallerScale[i];
            const largerScalePitch = largerScale[bestIndexMap[i]];
            sparsePitchMap[i] = largerToSmaller
                ? [largerScalePitch, smallerScalePitch]
                : [smallerScalePitch, largerScalePitch];
        }
        sparsePitchMap.push([12, 12]);
        newScale.push(12);
        let sparseIndex = 0;
        const fullPitchMap = [];
        for (let i = 0; i < 12; i++) {
            const oldLow = sparsePitchMap[sparseIndex][0];
            const newLow = sparsePitchMap[sparseIndex][1];
            const oldHigh = sparsePitchMap[sparseIndex + 1][0];
            const newHigh = sparsePitchMap[sparseIndex + 1][1];
            if (i == oldHigh - 1)
                sparseIndex++;
            const transformedPitch = (i - oldLow) * (newHigh - newLow) / (oldHigh - oldLow) + newLow;
            let nearestPitch = 0;
            let nearestPitchDistance = Number.MAX_SAFE_INTEGER;
            for (const newPitch of newScale) {
                let distance = Math.abs(newPitch - transformedPitch);
                if (roles[newPitch] != roles[i]) {
                    distance += 0.1;
                }
                if (nearestPitchDistance > distance) {
                    nearestPitchDistance = distance;
                    nearestPitch = newPitch;
                }
            }
            fullPitchMap[i] = nearestPitch;
        }
        return fullPitchMap;
    }
    beepbox.generateScaleMap = generateScaleMap;
    function projectNoteIntoBar(oldNote, timeOffset, noteStartPart, noteEndPart, newNotes) {
        const newNote = new beepbox.Note(-1, noteStartPart, noteEndPart, 3, false);
        newNotes.push(newNote);
        newNote.pins.length = 0;
        newNote.pitches.length = 0;
        const newNoteLength = noteEndPart - noteStartPart;
        for (const pitch of oldNote.pitches) {
            newNote.pitches.push(pitch);
        }
        for (let pinIndex = 0; pinIndex < oldNote.pins.length; pinIndex++) {
            const pin = oldNote.pins[pinIndex];
            const newPinTime = pin.time + timeOffset;
            if (newPinTime < 0) {
                if (pinIndex + 1 >= oldNote.pins.length)
                    throw new Error("Error converting pins in note overflow.");
                const nextPin = oldNote.pins[pinIndex + 1];
                const nextPinTime = nextPin.time + timeOffset;
                if (nextPinTime > 0) {
                    const ratio = (-newPinTime) / (nextPinTime - newPinTime);
                    newNote.pins.push(beepbox.makeNotePin(Math.round(pin.interval + ratio * (nextPin.interval - pin.interval)), 0, Math.round(pin.volume + ratio * (nextPin.volume - pin.volume))));
                }
            }
            else if (newPinTime <= newNoteLength) {
                newNote.pins.push(beepbox.makeNotePin(pin.interval, newPinTime, pin.volume));
            }
            else {
                if (pinIndex < 1)
                    throw new Error("Error converting pins in note overflow.");
                const prevPin = oldNote.pins[pinIndex - 1];
                const prevPinTime = prevPin.time + timeOffset;
                if (prevPinTime < newNoteLength) {
                    const ratio = (newNoteLength - prevPinTime) / (newPinTime - prevPinTime);
                    newNote.pins.push(beepbox.makeNotePin(Math.round(prevPin.interval + ratio * (pin.interval - prevPin.interval)), newNoteLength, Math.round(prevPin.volume + ratio * (pin.volume - prevPin.volume))));
                }
            }
        }
    }
    class ChangeMoveAndOverflowNotes extends beepbox.ChangeGroup {
        constructor(doc, newBeatsPerBar, partsToMove) {
            super();
            const pitchChannels = [];
            const noiseChannels = [];
            for (let channelIndex = 0; channelIndex < doc.song.getChannelCount(); channelIndex++) {
                const oldChannel = doc.song.channels[channelIndex];
                const newChannel = new beepbox.Channel();
                if (channelIndex < doc.song.pitchChannelCount) {
                    pitchChannels.push(newChannel);
                }
                else {
                    noiseChannels.push(newChannel);
                }
                newChannel.octave = oldChannel.octave;
                for (const instrument of oldChannel.instruments) {
                    newChannel.instruments.push(instrument);
                }
                const oldPartsPerBar = beepbox.Config.partsPerBeat * doc.song.beatsPerBar;
                const newPartsPerBar = beepbox.Config.partsPerBeat * newBeatsPerBar;
                let currentBar = -1;
                let pattern = null;
                for (let oldBar = 0; oldBar < doc.song.barCount; oldBar++) {
                    const oldPattern = doc.song.getPattern(channelIndex, oldBar);
                    if (oldPattern != null) {
                        const oldBarStart = oldBar * oldPartsPerBar;
                        for (const oldNote of oldPattern.notes) {
                            const absoluteNoteStart = oldNote.start + oldBarStart + partsToMove;
                            const absoluteNoteEnd = oldNote.end + oldBarStart + partsToMove;
                            const startBar = Math.floor(absoluteNoteStart / newPartsPerBar);
                            const endBar = Math.ceil(absoluteNoteEnd / newPartsPerBar);
                            for (let bar = startBar; bar < endBar; bar++) {
                                const barStartPart = bar * newPartsPerBar;
                                const noteStartPart = Math.max(0, absoluteNoteStart - barStartPart);
                                const noteEndPart = Math.min(newPartsPerBar, absoluteNoteEnd - barStartPart);
                                if (noteStartPart < noteEndPart) {
                                    if (currentBar != bar || pattern == null) {
                                        currentBar++;
                                        while (currentBar < bar) {
                                            newChannel.bars[currentBar] = 0;
                                            currentBar++;
                                        }
                                        pattern = new beepbox.Pattern();
                                        newChannel.patterns.push(pattern);
                                        newChannel.bars[currentBar] = newChannel.patterns.length;
                                        pattern.instrument = oldPattern.instrument;
                                    }
                                    projectNoteIntoBar(oldNote, absoluteNoteStart - barStartPart - noteStartPart, noteStartPart, noteEndPart, pattern.notes);
                                }
                            }
                        }
                    }
                }
            }
            removeDuplicatePatterns(pitchChannels);
            removeDuplicatePatterns(noiseChannels);
            this.append(new ChangeReplacePatterns(doc, pitchChannels, noiseChannels));
        }
    }
    beepbox.ChangeMoveAndOverflowNotes = ChangeMoveAndOverflowNotes;
    class ChangePins extends beepbox.UndoableChange {
        constructor(_doc, _note) {
            super(false);
            this._doc = _doc;
            this._note = _note;
            this._oldStart = this._note.start;
            this._oldEnd = this._note.end;
            this._newStart = this._note.start;
            this._newEnd = this._note.end;
            this._oldPins = this._note.pins;
            this._newPins = [];
            this._oldPitches = this._note.pitches;
            this._newPitches = [];
        }
        _finishSetup() {
            for (let i = 0; i < this._newPins.length - 1;) {
                if (this._newPins[i].time >= this._newPins[i + 1].time) {
                    this._newPins.splice(i, 1);
                }
                else {
                    i++;
                }
            }
            for (let i = 1; i < this._newPins.length - 1;) {
                if (this._newPins[i - 1].interval == this._newPins[i].interval &&
                    this._newPins[i].interval == this._newPins[i + 1].interval &&
                    this._newPins[i - 1].volume == this._newPins[i].volume &&
                    this._newPins[i].volume == this._newPins[i + 1].volume) {
                    this._newPins.splice(i, 1);
                }
                else {
                    i++;
                }
            }
            const firstInterval = this._newPins[0].interval;
            const firstTime = this._newPins[0].time;
            for (let i = 0; i < this._oldPitches.length; i++) {
                this._newPitches[i] = this._oldPitches[i] + firstInterval;
            }
            for (let i = 0; i < this._newPins.length; i++) {
                this._newPins[i].interval -= firstInterval;
                this._newPins[i].time -= firstTime;
            }
            this._newStart = this._oldStart + firstTime;
            this._newEnd = this._newStart + this._newPins[this._newPins.length - 1].time;
            this._doForwards();
            this._didSomething();
        }
        _doForwards() {
            this._note.pins = this._newPins;
            this._note.pitches = this._newPitches;
            this._note.start = this._newStart;
            this._note.end = this._newEnd;
            this._doc.notifier.changed();
        }
        _doBackwards() {
            this._note.pins = this._oldPins;
            this._note.pitches = this._oldPitches;
            this._note.start = this._oldStart;
            this._note.end = this._oldEnd;
            this._doc.notifier.changed();
        }
    }
    beepbox.ChangePins = ChangePins;
    class ChangeCustomizeInstrument extends beepbox.Change {
        constructor(doc) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            if (instrument.preset != instrument.type) {
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeCustomizeInstrument = ChangeCustomizeInstrument;
    class ChangePreset extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.preset;
            if (oldValue != newValue) {
                const preset = beepbox.EditorConfig.valueToPreset(newValue);
                if (preset != null) {
                    if (preset.customType != undefined) {
                        instrument.type = preset.customType;
                        if (!beepbox.Config.instrumentTypeHasSpecialInterval[instrument.type] && beepbox.Config.chords[instrument.chord].isCustomInterval) {
                            instrument.chord = 0;
                        }
                        if (!beepbox.Config.instrumentTypeHasChorus[instrument.type] && beepbox.Config.effectsNames[instrument.effects].indexOf("chorus") != -1) {
                            instrument.effects -= 2;
                        }
                    }
                    else if (preset.settings != undefined) {
                        const tempVolume = instrument.volume;
                        const tempPan = instrument.pan;
                        instrument.fromJsonObject(preset.settings, doc.song.getChannelIsNoise(doc.channel));
                        instrument.volume = tempVolume;
                        instrument.pan = tempPan;
                    }
                }
                instrument.preset = newValue;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangePreset = ChangePreset;
    class ChangeRandomGeneratedInstrument extends beepbox.Change {
        constructor(doc) {
            super();
            function selectWeightedRandom(entries) {
                let total = 0;
                for (const entry of entries) {
                    total += entry.weight;
                }
                let random = Math.random() * total;
                for (const entry of entries) {
                    random -= entry.weight;
                    if (random <= 0.0)
                        return entry.item;
                }
                return entries[(Math.random() * entries.length) | 0].item;
            }
            function selectCurvedDistribution(min, max, peak, width) {
                const entries = [];
                for (let i = min; i <= max; i++) {
                    entries.push({ item: i, weight: 1.0 / (Math.pow((i - peak) / width, 2.0) + 1.0) });
                }
                return selectWeightedRandom(entries);
            }
            const isNoise = doc.song.getChannelIsNoise(doc.channel);
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            if (isNoise) {
                const type = selectWeightedRandom([
                    { item: 2, weight: 1 },
                    { item: 3, weight: 3 },
                ]);
                instrument.preset = instrument.type = type;
                instrument.filterCutoff = selectCurvedDistribution(4, beepbox.Config.filterCutoffRange - 1, beepbox.Config.filterCutoffRange - 2, 2);
                instrument.filterResonance = selectCurvedDistribution(0, beepbox.Config.filterResonanceRange - 1, 1, 2);
                instrument.filterEnvelope = beepbox.Config.envelopes.dictionary[selectWeightedRandom([
                    { item: "steady", weight: 2 },
                    { item: "punch", weight: 4 },
                    { item: "flare 1", weight: 2 },
                    { item: "flare 2", weight: 2 },
                    { item: "flare 3", weight: 2 },
                    { item: "twang 1", weight: 8 },
                    { item: "twang 2", weight: 8 },
                    { item: "twang 3", weight: 8 },
                    { item: "swell 1", weight: 2 },
                    { item: "swell 2", weight: 2 },
                    { item: "swell 3", weight: 1 },
                    { item: "tremolo1", weight: 1 },
                    { item: "tremolo2", weight: 1 },
                    { item: "tremolo3", weight: 1 },
                    { item: "tremolo4", weight: 1 },
                    { item: "tremolo5", weight: 1 },
                    { item: "tremolo6", weight: 1 },
                    { item: "decay 1", weight: 4 },
                    { item: "decay 2", weight: 4 },
                    { item: "decay 3", weight: 4 },
                ])].index;
                instrument.transition = beepbox.Config.transitions.dictionary[selectWeightedRandom([
                    { item: "seamless", weight: 1 },
                    { item: "hard", weight: 4 },
                    { item: "soft", weight: 2 },
                    { item: "slide", weight: 1 },
                    { item: "cross fade", weight: 2 },
                    { item: "hard fade", weight: 8 },
                    { item: "medium fade", weight: 2 },
                    { item: "soft fade", weight: 1 },
                ])].index;
                instrument.effects = beepbox.Config.effectsNames.indexOf(selectWeightedRandom([
                    { item: "none", weight: 1 },
                    { item: "reverb", weight: 3 },
                ]));
                instrument.chord = beepbox.Config.chords.dictionary[selectWeightedRandom([
                    { item: "harmony", weight: 4 },
                    { item: "strum", weight: 2 },
                    { item: "arpeggio", weight: 1 },
                ])].index;
                function normalize(harmonics) {
                    let max = 0;
                    for (const value of harmonics) {
                        if (value > max)
                            max = value;
                    }
                    for (let i = 0; i < harmonics.length; i++) {
                        harmonics[i] = beepbox.Config.harmonicsMax * harmonics[i] / max;
                    }
                }
                switch (type) {
                    case 2:
                        {
                            instrument.chipNoise = (Math.random() * beepbox.Config.chipNoises.length) | 0;
                        }
                        break;
                    case 3:
                        {
                            const spectrumGenerators = [
                                () => {
                                    const spectrum = [];
                                    for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                                        spectrum[i] = (Math.random() < 0.5) ? Math.random() : 0.0;
                                    }
                                    return spectrum;
                                },
                                () => {
                                    let current = 1.0;
                                    const spectrum = [current];
                                    for (let i = 1; i < beepbox.Config.spectrumControlPoints; i++) {
                                        current *= Math.pow(2, Math.random() - 0.52);
                                        spectrum[i] = current;
                                    }
                                    return spectrum;
                                },
                                () => {
                                    let current = 1.0;
                                    const spectrum = [current];
                                    for (let i = 1; i < beepbox.Config.spectrumControlPoints; i++) {
                                        current *= Math.pow(2, Math.random() - 0.52);
                                        spectrum[i] = current * Math.random();
                                    }
                                    return spectrum;
                                },
                            ];
                            const generator = spectrumGenerators[(Math.random() * spectrumGenerators.length) | 0];
                            const spectrum = generator();
                            normalize(spectrum);
                            for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                                instrument.spectrumWave.spectrum[i] = Math.round(spectrum[i]);
                            }
                            instrument.spectrumWave.markCustomWaveDirty();
                        }
                        break;
                    default: throw new Error("Unhandled noise instrument type in random generator.");
                }
            }
            else {
                const type = selectWeightedRandom([
                    { item: 0, weight: 4 },
                    { item: 6, weight: 4 },
                    { item: 5, weight: 6 },
                    { item: 3, weight: 1 },
                    { item: 1, weight: 4 },
                ]);
                instrument.preset = instrument.type = type;
                instrument.filterCutoff = selectCurvedDistribution(2, beepbox.Config.filterCutoffRange - 1, 7, 1.5);
                instrument.filterResonance = selectCurvedDistribution(0, beepbox.Config.filterResonanceRange - 1, 1, 2);
                instrument.filterEnvelope = beepbox.Config.envelopes.dictionary[selectWeightedRandom([
                    { item: "steady", weight: 10 },
                    { item: "punch", weight: 6 },
                    { item: "flare 1", weight: 2 },
                    { item: "flare 2", weight: 4 },
                    { item: "flare 3", weight: 2 },
                    { item: "twang 1", weight: 2 },
                    { item: "twang 2", weight: 4 },
                    { item: "twang 3", weight: 4 },
                    { item: "swell 1", weight: 4 },
                    { item: "swell 2", weight: 2 },
                    { item: "swell 3", weight: 1 },
                    { item: "tremolo1", weight: 1 },
                    { item: "tremolo2", weight: 1 },
                    { item: "tremolo3", weight: 1 },
                    { item: "tremolo4", weight: 1 },
                    { item: "tremolo5", weight: 1 },
                    { item: "tremolo6", weight: 1 },
                    { item: "decay 1", weight: 1 },
                    { item: "decay 2", weight: 2 },
                    { item: "decay 3", weight: 2 },
                ])].index;
                instrument.transition = beepbox.Config.transitions.dictionary[selectWeightedRandom([
                    { item: "seamless", weight: 1 },
                    { item: "hard", weight: 4 },
                    { item: "soft", weight: 4 },
                    { item: "slide", weight: 2 },
                    { item: "cross fade", weight: 4 },
                    { item: "hard fade", weight: 4 },
                    { item: "medium fade", weight: 2 },
                    { item: "soft fade", weight: 2 },
                ])].index;
                instrument.effects = beepbox.Config.effectsNames.indexOf(selectWeightedRandom([
                    { item: "none", weight: 1 },
                    { item: "reverb", weight: 10 },
                    { item: "chorus", weight: beepbox.Config.instrumentTypeHasChorus[type] ? 2 : 0 },
                    { item: "chorus & reverb", weight: beepbox.Config.instrumentTypeHasChorus[type] ? 2 : 0 },
                ]));
                instrument.chord = beepbox.Config.chords.dictionary[selectWeightedRandom([
                    { item: "harmony", weight: 7 },
                    { item: "strum", weight: 2 },
                    { item: "arpeggio", weight: 1 },
                ])].index;
                if (type != 3) {
                    instrument.vibrato = beepbox.Config.vibratos.dictionary[selectWeightedRandom([
                        { item: "none", weight: 6 },
                        { item: "light", weight: 2 },
                        { item: "delayed", weight: 2 },
                        { item: "heavy", weight: 1 },
                        { item: "shaky", weight: 2 },
                    ])].index;
                }
                if (type == 0 || type == 5) {
                    instrument.interval = beepbox.Config.intervals.dictionary[selectWeightedRandom([
                        { item: "union", weight: 10 },
                        { item: "shimmer", weight: 5 },
                        { item: "hum", weight: 4 },
                        { item: "honky tonk", weight: 3 },
                        { item: "dissonant", weight: 1 },
                        { item: "fifth", weight: 1 },
                        { item: "octave", weight: 2 },
                        { item: "bowed", weight: 2 },
                    ])].index;
                }
                function normalize(harmonics) {
                    let max = 0;
                    for (const value of harmonics) {
                        if (value > max)
                            max = value;
                    }
                    for (let i = 0; i < harmonics.length; i++) {
                        harmonics[i] = beepbox.Config.harmonicsMax * harmonics[i] / max;
                    }
                }
                switch (type) {
                    case 0:
                        {
                            instrument.chipWave = (Math.random() * beepbox.Config.chipWaves.length) | 0;
                        }
                        break;
                    case 6:
                        {
                            instrument.pulseEnvelope = beepbox.Config.envelopes.dictionary[selectWeightedRandom([
                                { item: "steady", weight: 10 },
                                { item: "punch", weight: 6 },
                                { item: "flare 1", weight: 2 },
                                { item: "flare 2", weight: 4 },
                                { item: "flare 3", weight: 2 },
                                { item: "twang 1", weight: 4 },
                                { item: "twang 2", weight: 4 },
                                { item: "twang 3", weight: 4 },
                                { item: "swell 1", weight: 4 },
                                { item: "swell 2", weight: 4 },
                                { item: "swell 3", weight: 4 },
                                { item: "tremolo1", weight: 1 },
                                { item: "tremolo2", weight: 1 },
                                { item: "tremolo3", weight: 1 },
                                { item: "tremolo4", weight: 2 },
                                { item: "tremolo5", weight: 2 },
                                { item: "tremolo6", weight: 2 },
                                { item: "decay 1", weight: 2 },
                                { item: "decay 2", weight: 2 },
                                { item: "decay 3", weight: 2 },
                            ])].index;
                            instrument.pulseWidth = selectCurvedDistribution(0, beepbox.Config.pulseWidthRange - 1, beepbox.Config.pulseWidthRange - 1, 2);
                        }
                        break;
                    case 5:
                        {
                            const harmonicGenerators = [
                                () => {
                                    const harmonics = [];
                                    for (let i = 0; i < beepbox.Config.harmonicsControlPoints; i++) {
                                        harmonics[i] = (Math.random() < 0.4) ? Math.random() : 0.0;
                                    }
                                    harmonics[(Math.random() * 8) | 0] = Math.pow(Math.random(), 0.25);
                                    return harmonics;
                                },
                                () => {
                                    let current = 1.0;
                                    const harmonics = [current];
                                    for (let i = 1; i < beepbox.Config.harmonicsControlPoints; i++) {
                                        current *= Math.pow(2, Math.random() - 0.55);
                                        harmonics[i] = current;
                                    }
                                    return harmonics;
                                },
                                () => {
                                    let current = 1.0;
                                    const harmonics = [current];
                                    for (let i = 1; i < beepbox.Config.harmonicsControlPoints; i++) {
                                        current *= Math.pow(2, Math.random() - 0.55);
                                        harmonics[i] = current * Math.random();
                                    }
                                    return harmonics;
                                },
                            ];
                            const generator = harmonicGenerators[(Math.random() * harmonicGenerators.length) | 0];
                            const harmonics = generator();
                            normalize(harmonics);
                            for (let i = 0; i < beepbox.Config.harmonicsControlPoints; i++) {
                                instrument.harmonicsWave.harmonics[i] = Math.round(harmonics[i]);
                            }
                            instrument.harmonicsWave.markCustomWaveDirty();
                        }
                        break;
                    case 3:
                        {
                            const spectrum = [];
                            for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                                const isHarmonic = i == 0 || i == 7 || i == 11 || i == 14 || i == 16 || i == 18 || i == 21;
                                if (isHarmonic) {
                                    spectrum[i] = Math.pow(Math.random(), 0.25);
                                }
                                else {
                                    spectrum[i] = Math.pow(Math.random(), 3) * 0.5;
                                }
                            }
                            normalize(spectrum);
                            for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                                instrument.spectrumWave.spectrum[i] = Math.round(spectrum[i]);
                            }
                            instrument.spectrumWave.markCustomWaveDirty();
                        }
                        break;
                    case 1:
                        {
                            instrument.algorithm = (Math.random() * beepbox.Config.algorithms.length) | 0;
                            instrument.feedbackType = (Math.random() * beepbox.Config.feedbacks.length) | 0;
                            const algorithm = beepbox.Config.algorithms[instrument.algorithm];
                            for (let i = 0; i < algorithm.carrierCount; i++) {
                                instrument.operators[i].frequency = selectCurvedDistribution(0, beepbox.Config.operatorFrequencies.length - 1, 0, 3);
                                instrument.operators[i].amplitude = selectCurvedDistribution(0, beepbox.Config.operatorAmplitudeMax, beepbox.Config.operatorAmplitudeMax - 1, 2);
                                instrument.operators[i].envelope = beepbox.Config.envelopes.dictionary["custom"].index;
                            }
                            for (let i = algorithm.carrierCount; i < beepbox.Config.operatorCount; i++) {
                                instrument.operators[i].frequency = selectCurvedDistribution(3, beepbox.Config.operatorFrequencies.length - 1, 0, 3);
                                instrument.operators[i].amplitude = (Math.pow(Math.random(), 2) * beepbox.Config.operatorAmplitudeMax) | 0;
                                instrument.operators[i].envelope = beepbox.Config.envelopes.dictionary[selectWeightedRandom([
                                    { item: "steady", weight: 6 },
                                    { item: "punch", weight: 2 },
                                    { item: "flare 1", weight: 2 },
                                    { item: "flare 2", weight: 2 },
                                    { item: "flare 3", weight: 2 },
                                    { item: "twang 1", weight: 2 },
                                    { item: "twang 2", weight: 2 },
                                    { item: "twang 3", weight: 2 },
                                    { item: "swell 1", weight: 2 },
                                    { item: "swell 2", weight: 2 },
                                    { item: "swell 3", weight: 2 },
                                    { item: "tremolo1", weight: 1 },
                                    { item: "tremolo2", weight: 1 },
                                    { item: "tremolo3", weight: 1 },
                                    { item: "tremolo4", weight: 1 },
                                    { item: "tremolo5", weight: 1 },
                                    { item: "tremolo6", weight: 1 },
                                    { item: "decay 1", weight: 1 },
                                    { item: "decay 2", weight: 1 },
                                    { item: "decay 3", weight: 1 },
                                ])].index;
                            }
                            instrument.feedbackAmplitude = (Math.pow(Math.random(), 3) * beepbox.Config.operatorAmplitudeMax) | 0;
                            instrument.feedbackEnvelope = beepbox.Config.envelopes.dictionary[selectWeightedRandom([
                                { item: "steady", weight: 4 },
                                { item: "punch", weight: 2 },
                                { item: "flare 1", weight: 2 },
                                { item: "flare 2", weight: 2 },
                                { item: "flare 3", weight: 2 },
                                { item: "twang 1", weight: 2 },
                                { item: "twang 2", weight: 2 },
                                { item: "twang 3", weight: 2 },
                                { item: "swell 1", weight: 2 },
                                { item: "swell 2", weight: 2 },
                                { item: "swell 3", weight: 2 },
                                { item: "tremolo1", weight: 1 },
                                { item: "tremolo2", weight: 1 },
                                { item: "tremolo3", weight: 1 },
                                { item: "tremolo4", weight: 1 },
                                { item: "tremolo5", weight: 1 },
                                { item: "tremolo6", weight: 1 },
                                { item: "decay 1", weight: 1 },
                                { item: "decay 2", weight: 1 },
                                { item: "decay 3", weight: 1 },
                            ])].index;
                        }
                        break;
                    default: throw new Error("Unhandled pitched instrument type in random generator.");
                }
            }
            doc.notifier.changed();
            this._didSomething();
        }
    }
    beepbox.ChangeRandomGeneratedInstrument = ChangeRandomGeneratedInstrument;
    class ChangeTransition extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.transition;
            if (oldValue != newValue) {
                this._didSomething();
                instrument.transition = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
            }
        }
    }
    beepbox.ChangeTransition = ChangeTransition;
    class ChangeEffects extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.effects;
            if (oldValue != newValue) {
                this._didSomething();
                instrument.effects = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
            }
        }
    }
    beepbox.ChangeEffects = ChangeEffects;
    class ChangePatternNumbers extends beepbox.Change {
        constructor(doc, value, startBar, startChannel, width, height) {
            super();
            if (value > doc.song.patternsPerChannel)
                throw new Error("invalid pattern");
            for (let bar = startBar; bar < startBar + width; bar++) {
                for (let channel = startChannel; channel < startChannel + height; channel++) {
                    if (doc.song.channels[channel].bars[bar] != value) {
                        doc.song.channels[channel].bars[bar] = value;
                        this._didSomething();
                    }
                }
            }
            doc.notifier.changed();
        }
    }
    beepbox.ChangePatternNumbers = ChangePatternNumbers;
    class ChangeBarCount extends beepbox.Change {
        constructor(doc, newValue, atBeginning) {
            super();
            if (doc.song.barCount != newValue) {
                for (const channel of doc.song.channels) {
                    if (atBeginning) {
                        while (channel.bars.length < newValue) {
                            channel.bars.unshift(0);
                        }
                        if (doc.song.barCount > newValue) {
                            channel.bars.splice(0, doc.song.barCount - newValue);
                        }
                    }
                    else {
                        while (channel.bars.length < newValue) {
                            channel.bars.push(0);
                        }
                        channel.bars.length = newValue;
                    }
                }
                if (atBeginning) {
                    const diff = newValue - doc.song.barCount;
                    doc.bar = Math.max(0, doc.bar + diff);
                    if (diff < 0 || doc.barScrollPos > 0) {
                        doc.barScrollPos = Math.max(0, doc.barScrollPos + diff);
                    }
                    doc.song.loopStart = Math.max(0, doc.song.loopStart + diff);
                }
                doc.bar = Math.min(doc.bar, newValue - 1);
                doc.barScrollPos = Math.max(0, Math.min(newValue - doc.trackVisibleBars, doc.barScrollPos));
                doc.song.loopLength = Math.min(newValue, doc.song.loopLength);
                doc.song.loopStart = Math.min(newValue - doc.song.loopLength, doc.song.loopStart);
                doc.song.barCount = newValue;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeBarCount = ChangeBarCount;
    class ChangeInsertBars extends beepbox.Change {
        constructor(doc, start, count) {
            super();
            const newLength = Math.min(beepbox.Config.barCountMax, doc.song.barCount + count);
            count = newLength - doc.song.barCount;
            if (count == 0)
                return;
            for (const channel of doc.song.channels) {
                while (channel.bars.length < newLength) {
                    channel.bars.splice(start, 0, 0);
                }
            }
            doc.song.barCount = newLength;
            doc.bar = start;
            doc.barScrollPos = Math.min(newLength - doc.trackVisibleBars, doc.barScrollPos + count);
            if (doc.song.loopStart >= start) {
                doc.song.loopStart += count;
            }
            else if (doc.song.loopStart + doc.song.loopLength >= start) {
                doc.song.loopLength += count;
            }
            doc.notifier.changed();
            this._didSomething();
        }
    }
    beepbox.ChangeInsertBars = ChangeInsertBars;
    class ChangeDeleteBars extends beepbox.Change {
        constructor(doc, start, count) {
            super();
            for (const channel of doc.song.channels) {
                channel.bars.splice(start, count);
                if (channel.bars.length == 0)
                    channel.bars.push(0);
            }
            doc.song.barCount = Math.max(1, doc.song.barCount - count);
            doc.bar = Math.max(0, start - count);
            doc.barScrollPos = Math.max(0, doc.barScrollPos - count);
            if (doc.song.loopStart >= start) {
                doc.song.loopStart = Math.max(0, doc.song.loopStart - count);
            }
            else if (doc.song.loopStart + doc.song.loopLength > start) {
                doc.song.loopLength -= count;
            }
            doc.song.loopLength = Math.max(1, Math.min(doc.song.barCount - doc.song.loopStart, doc.song.loopLength));
            doc.notifier.changed();
            this._didSomething();
        }
    }
    beepbox.ChangeDeleteBars = ChangeDeleteBars;
    class ChangeChannelCount extends beepbox.Change {
        constructor(doc, newPitchChannelCount, newNoiseChannelCount) {
            super();
            if (doc.song.pitchChannelCount != newPitchChannelCount || doc.song.noiseChannelCount != newNoiseChannelCount) {
                const newChannels = [];
                function changeGroup(newCount, oldCount, newStart, oldStart, octave, isNoise) {
                    for (let i = 0; i < newCount; i++) {
                        const channel = i + newStart;
                        const oldChannel = i + oldStart;
                        if (i < oldCount) {
                            newChannels[channel] = doc.song.channels[oldChannel];
                        }
                        else {
                            newChannels[channel] = new beepbox.Channel();
                            newChannels[channel].octave = octave;
                            for (let j = 0; j < doc.song.instrumentsPerChannel; j++) {
                                const instrument = new beepbox.Instrument(isNoise);
                                const presetValue = pickRandomPresetValue(isNoise);
                                const preset = beepbox.EditorConfig.valueToPreset(presetValue);
                                instrument.fromJsonObject(preset.settings, isNoise);
                                instrument.preset = presetValue;
                                instrument.volume = 1;
                                newChannels[channel].instruments[j] = instrument;
                            }
                            for (let j = 0; j < doc.song.patternsPerChannel; j++) {
                                newChannels[channel].patterns[j] = new beepbox.Pattern();
                            }
                            for (let j = 0; j < doc.song.barCount; j++) {
                                newChannels[channel].bars[j] = 1;
                            }
                        }
                    }
                }
                changeGroup(newPitchChannelCount, doc.song.pitchChannelCount, 0, 0, 2, false);
                changeGroup(newNoiseChannelCount, doc.song.noiseChannelCount, newPitchChannelCount, doc.song.pitchChannelCount, 0, true);
                doc.song.pitchChannelCount = newPitchChannelCount;
                doc.song.noiseChannelCount = newNoiseChannelCount;
                for (let channel = 0; channel < doc.song.getChannelCount(); channel++) {
                    doc.song.channels[channel] = newChannels[channel];
                }
                doc.song.channels.length = doc.song.getChannelCount();
                doc.channel = Math.min(doc.channel, newPitchChannelCount + newNoiseChannelCount - 1);
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeChannelCount = ChangeChannelCount;
    class ChangeChannelBar extends beepbox.Change {
        constructor(doc, newChannel, newBar, silently = false) {
            super();
            const oldChannel = doc.channel;
            const oldBar = doc.bar;
            doc.channel = newChannel;
            doc.bar = newBar;
            if (!silently) {
                doc.barScrollPos = Math.min(doc.bar, Math.max(doc.bar - (doc.trackVisibleBars - 1), doc.barScrollPos));
            }
            doc.notifier.changed();
            if (oldChannel != newChannel || oldBar != newBar) {
                this._didSomething();
            }
        }
    }
    beepbox.ChangeChannelBar = ChangeChannelBar;
    class ChangeInterval extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.interval;
            if (oldValue != newValue) {
                this._didSomething();
                instrument.interval = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
            }
        }
    }
    beepbox.ChangeInterval = ChangeInterval;
    class ChangeChord extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.chord;
            if (oldValue != newValue) {
                this._didSomething();
                instrument.chord = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
            }
        }
    }
    beepbox.ChangeChord = ChangeChord;
    class ChangeVibrato extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.vibrato;
            if (oldValue != newValue) {
                instrument.vibrato = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeVibrato = ChangeVibrato;
    class ChangeSpectrum extends beepbox.Change {
        constructor(doc, instrument, spectrumWave) {
            super();
            spectrumWave.markCustomWaveDirty();
            instrument.preset = instrument.type;
            doc.notifier.changed();
            this._didSomething();
        }
    }
    beepbox.ChangeSpectrum = ChangeSpectrum;
    class ChangeHarmonics extends beepbox.Change {
        constructor(doc, instrument, harmonicsWave) {
            super();
            harmonicsWave.markCustomWaveDirty();
            instrument.preset = instrument.type;
            doc.notifier.changed();
            this._didSomething();
        }
    }
    beepbox.ChangeHarmonics = ChangeHarmonics;
    class ChangeDrumsetEnvelope extends beepbox.Change {
        constructor(doc, drumIndex, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.drumsetEnvelopes[drumIndex];
            if (oldValue != newValue) {
                instrument.drumsetEnvelopes[drumIndex] = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeDrumsetEnvelope = ChangeDrumsetEnvelope;
    class ChangeInstrumentSlider extends beepbox.Change {
        constructor(_doc) {
            super();
            this._doc = _doc;
            this._instrument = this._doc.song.channels[this._doc.channel].instruments[this._doc.getCurrentInstrument()];
        }
        commit() {
            if (!this.isNoop()) {
                this._instrument.preset = this._instrument.type;
                this._doc.notifier.changed();
            }
        }
    }
    class ChangePulseWidth extends ChangeInstrumentSlider {
        constructor(doc, oldValue, newValue) {
            super(doc);
            this._instrument.pulseWidth = newValue;
            doc.notifier.changed();
            if (oldValue != newValue)
                this._didSomething();
        }
    }
    beepbox.ChangePulseWidth = ChangePulseWidth;
    class ChangePulseEnvelope extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.pulseEnvelope;
            if (oldValue != newValue) {
                instrument.pulseEnvelope = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangePulseEnvelope = ChangePulseEnvelope;
    class ChangeFilterCutoff extends ChangeInstrumentSlider {
        constructor(doc, oldValue, newValue) {
            super(doc);
            this._instrument.filterCutoff = newValue;
            doc.notifier.changed();
            if (oldValue != newValue)
                this._didSomething();
        }
    }
    beepbox.ChangeFilterCutoff = ChangeFilterCutoff;
    class ChangeFilterResonance extends ChangeInstrumentSlider {
        constructor(doc, oldValue, newValue) {
            super(doc);
            this._instrument.filterResonance = newValue;
            doc.notifier.changed();
            if (oldValue != newValue)
                this._didSomething();
        }
    }
    beepbox.ChangeFilterResonance = ChangeFilterResonance;
    class ChangeFilterEnvelope extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.filterEnvelope;
            if (oldValue != newValue) {
                instrument.filterEnvelope = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeFilterEnvelope = ChangeFilterEnvelope;
    class ChangeAlgorithm extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.algorithm;
            if (oldValue != newValue) {
                instrument.algorithm = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeAlgorithm = ChangeAlgorithm;
    class ChangeFeedbackType extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.feedbackType;
            if (oldValue != newValue) {
                instrument.feedbackType = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeFeedbackType = ChangeFeedbackType;
    class ChangeFeedbackEnvelope extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.feedbackEnvelope;
            if (oldValue != newValue) {
                instrument.feedbackEnvelope = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeFeedbackEnvelope = ChangeFeedbackEnvelope;
    class ChangeOperatorEnvelope extends beepbox.Change {
        constructor(doc, operatorIndex, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.operators[operatorIndex].envelope;
            if (oldValue != newValue) {
                instrument.operators[operatorIndex].envelope = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeOperatorEnvelope = ChangeOperatorEnvelope;
    class ChangeOperatorFrequency extends beepbox.Change {
        constructor(doc, operatorIndex, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            const oldValue = instrument.operators[operatorIndex].frequency;
            if (oldValue != newValue) {
                instrument.operators[operatorIndex].frequency = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeOperatorFrequency = ChangeOperatorFrequency;
    class ChangeOperatorAmplitude extends ChangeInstrumentSlider {
        constructor(doc, operatorIndex, oldValue, newValue) {
            super(doc);
            this._instrument.operators[operatorIndex].amplitude = newValue;
            doc.notifier.changed();
            if (oldValue != newValue)
                this._didSomething();
        }
    }
    beepbox.ChangeOperatorAmplitude = ChangeOperatorAmplitude;
    class ChangeFeedbackAmplitude extends ChangeInstrumentSlider {
        constructor(doc, oldValue, newValue) {
            super(doc);
            this._instrument.feedbackAmplitude = newValue;
            doc.notifier.changed();
            if (oldValue != newValue)
                this._didSomething();
        }
    }
    beepbox.ChangeFeedbackAmplitude = ChangeFeedbackAmplitude;
    class ChangeInstrumentsPerChannel extends beepbox.Change {
        constructor(doc, newInstrumentsPerChannel) {
            super();
            if (doc.song.instrumentsPerChannel != newInstrumentsPerChannel) {
                for (let channel = 0; channel < doc.song.getChannelCount(); channel++) {
                    const sampleInstrument = doc.song.channels[channel].instruments[doc.song.instrumentsPerChannel - 1];
                    const sampleInstrumentJson = sampleInstrument.toJsonObject();
                    for (let j = doc.song.instrumentsPerChannel; j < newInstrumentsPerChannel; j++) {
                        const newInstrument = new beepbox.Instrument(doc.song.getChannelIsNoise(channel));
                        if (sampleInstrument.type == 4) {
                            newInstrument.setTypeAndReset(3, true);
                        }
                        else {
                            newInstrument.fromJsonObject(sampleInstrumentJson, doc.song.getChannelIsNoise(channel));
                        }
                        doc.song.channels[channel].instruments[j] = newInstrument;
                    }
                    doc.song.channels[channel].instruments.length = newInstrumentsPerChannel;
                    for (let j = 0; j < doc.song.patternsPerChannel; j++) {
                        if (doc.song.channels[channel].patterns[j].instrument >= newInstrumentsPerChannel) {
                            doc.song.channels[channel].patterns[j].instrument = 0;
                        }
                    }
                }
                doc.song.instrumentsPerChannel = newInstrumentsPerChannel;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeInstrumentsPerChannel = ChangeInstrumentsPerChannel;
    class ChangeKey extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            if (doc.song.key != newValue) {
                doc.song.key = newValue;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeKey = ChangeKey;
    class ChangeLoop extends beepbox.Change {
        constructor(_doc, oldStart, oldLength, newStart, newLength) {
            super();
            this._doc = _doc;
            this.oldStart = oldStart;
            this.oldLength = oldLength;
            this.newStart = newStart;
            this.newLength = newLength;
            this._doc.song.loopStart = this.newStart;
            this._doc.song.loopLength = this.newLength;
            this._doc.notifier.changed();
            if (this.oldStart != this.newStart || this.oldLength != this.newLength) {
                this._didSomething();
            }
        }
    }
    beepbox.ChangeLoop = ChangeLoop;
    class ChangePitchAdded extends beepbox.UndoableChange {
        constructor(doc, note, pitch, index, deletion = false) {
            super(deletion);
            this._doc = doc;
            this._note = note;
            this._pitch = pitch;
            this._index = index;
            this._didSomething();
            this.redo();
        }
        _doForwards() {
            this._note.pitches.splice(this._index, 0, this._pitch);
            this._doc.notifier.changed();
        }
        _doBackwards() {
            this._note.pitches.splice(this._index, 1);
            this._doc.notifier.changed();
        }
    }
    beepbox.ChangePitchAdded = ChangePitchAdded;
    class ChangeOctave extends beepbox.Change {
        constructor(doc, oldValue, newValue) {
            super();
            this.oldValue = oldValue;
            doc.song.channels[doc.channel].octave = newValue;
            doc.notifier.changed();
            if (oldValue != newValue)
                this._didSomething();
        }
    }
    beepbox.ChangeOctave = ChangeOctave;
    class ChangeRhythm extends beepbox.ChangeGroup {
        constructor(doc, newValue) {
            super();
            if (doc.song.rhythm != newValue) {
                doc.song.rhythm = newValue;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeRhythm = ChangeRhythm;
    class ChangePaste extends beepbox.ChangeGroup {
        constructor(doc, pattern, notes, oldBeatsPerBar) {
            super();
            pattern.notes.length = 0;
            for (const noteObject of notes) {
                const note = new beepbox.Note(noteObject["pitches"][0], noteObject["start"], noteObject["end"], noteObject["pins"][0]["volume"], false);
                note.pitches.length = 0;
                for (const pitch of noteObject["pitches"]) {
                    note.pitches.push(pitch);
                }
                note.pins.length = 0;
                for (const pin of noteObject["pins"]) {
                    note.pins.push(beepbox.makeNotePin(pin.interval, pin.time, pin.volume));
                }
                pattern.notes.push(note);
            }
            if (doc.song.beatsPerBar < oldBeatsPerBar) {
                this.append(new ChangeNoteTruncate(doc, pattern, doc.song.beatsPerBar * beepbox.Config.partsPerBeat, oldBeatsPerBar * beepbox.Config.partsPerBeat));
            }
            doc.notifier.changed();
            this._didSomething();
        }
    }
    beepbox.ChangePaste = ChangePaste;
    class ChangePasteInstrument extends beepbox.ChangeGroup {
        constructor(doc, instrument, instrumentCopy) {
            super();
            instrument.fromJsonObject(instrumentCopy, instrumentCopy["isDrum"]);
            doc.notifier.changed();
            this._didSomething();
        }
    }
    beepbox.ChangePasteInstrument = ChangePasteInstrument;
    class ChangePatternInstrument extends beepbox.Change {
        constructor(doc, newValue, pattern) {
            super();
            if (pattern.instrument != newValue) {
                pattern.instrument = newValue;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangePatternInstrument = ChangePatternInstrument;
    class ChangePatternsPerChannel extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            if (doc.song.patternsPerChannel != newValue) {
                for (let i = 0; i < doc.song.getChannelCount(); i++) {
                    const channelBars = doc.song.channels[i].bars;
                    const channelPatterns = doc.song.channels[i].patterns;
                    for (let j = 0; j < channelBars.length; j++) {
                        if (channelBars[j] > newValue)
                            channelBars[j] = 0;
                    }
                    for (let j = channelPatterns.length; j < newValue; j++) {
                        channelPatterns[j] = new beepbox.Pattern();
                    }
                    channelPatterns.length = newValue;
                }
                doc.song.patternsPerChannel = newValue;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangePatternsPerChannel = ChangePatternsPerChannel;
    class ChangeEnsurePatternExists extends beepbox.UndoableChange {
        constructor(doc, channel, bar) {
            super(false);
            this._patternOldNotes = null;
            const song = doc.song;
            if (song.channels[channel].bars[bar] != 0)
                return;
            this._doc = doc;
            this._bar = bar;
            this._channel = channel;
            this._oldPatternCount = song.patternsPerChannel;
            this._newPatternCount = song.patternsPerChannel;
            let firstEmptyUnusedIndex = null;
            let firstUnusedIndex = null;
            for (let patternIndex = 1; patternIndex <= song.patternsPerChannel; patternIndex++) {
                let used = false;
                for (let barIndex = 0; barIndex < song.barCount; barIndex++) {
                    if (song.channels[channel].bars[barIndex] == patternIndex) {
                        used = true;
                        break;
                    }
                }
                if (used)
                    continue;
                if (firstUnusedIndex == null) {
                    firstUnusedIndex = patternIndex;
                }
                const pattern = song.channels[channel].patterns[patternIndex - 1];
                if (pattern.notes.length == 0) {
                    firstEmptyUnusedIndex = patternIndex;
                    break;
                }
            }
            if (firstEmptyUnusedIndex != null) {
                this._patternIndex = firstEmptyUnusedIndex;
            }
            else if (song.patternsPerChannel < song.barCount) {
                this._newPatternCount = song.patternsPerChannel + 1;
                this._patternIndex = song.patternsPerChannel + 1;
            }
            else if (firstUnusedIndex != null) {
                this._patternIndex = firstUnusedIndex;
                this._patternOldNotes = song.channels[channel].patterns[firstUnusedIndex - 1].notes;
            }
            else {
                throw new Error();
            }
            this._didSomething();
            this._doForwards();
        }
        _doForwards() {
            const song = this._doc.song;
            for (let j = song.patternsPerChannel; j < this._newPatternCount; j++) {
                for (let i = 0; i < song.getChannelCount(); i++) {
                    song.channels[i].patterns[j] = new beepbox.Pattern();
                }
            }
            song.patternsPerChannel = this._newPatternCount;
            const pattern = song.channels[this._channel].patterns[this._patternIndex - 1];
            pattern.notes = [];
            song.channels[this._channel].bars[this._bar] = this._patternIndex;
            this._doc.notifier.changed();
        }
        _doBackwards() {
            const song = this._doc.song;
            const pattern = song.channels[this._channel].patterns[this._patternIndex - 1];
            if (this._patternOldNotes != null)
                pattern.notes = this._patternOldNotes;
            song.channels[this._channel].bars[this._bar] = 0;
            for (let i = 0; i < song.getChannelCount(); i++) {
                song.channels[i].patterns.length = this._oldPatternCount;
            }
            song.patternsPerChannel = this._oldPatternCount;
            this._doc.notifier.changed();
        }
    }
    beepbox.ChangeEnsurePatternExists = ChangeEnsurePatternExists;
    class ChangePinTime extends ChangePins {
        constructor(doc, note, pinIndex, shiftedTime) {
            super(doc, note);
            shiftedTime -= this._oldStart;
            const originalTime = this._oldPins[pinIndex].time;
            const skipStart = Math.min(originalTime, shiftedTime);
            const skipEnd = Math.max(originalTime, shiftedTime);
            let setPin = false;
            for (let i = 0; i < this._oldPins.length; i++) {
                const oldPin = note.pins[i];
                const time = oldPin.time;
                if (time < skipStart) {
                    this._newPins.push(beepbox.makeNotePin(oldPin.interval, time, oldPin.volume));
                }
                else if (time > skipEnd) {
                    if (!setPin) {
                        this._newPins.push(beepbox.makeNotePin(this._oldPins[pinIndex].interval, shiftedTime, this._oldPins[pinIndex].volume));
                        setPin = true;
                    }
                    this._newPins.push(beepbox.makeNotePin(oldPin.interval, time, oldPin.volume));
                }
            }
            if (!setPin) {
                this._newPins.push(beepbox.makeNotePin(this._oldPins[pinIndex].interval, shiftedTime, this._oldPins[pinIndex].volume));
            }
            this._finishSetup();
        }
    }
    beepbox.ChangePinTime = ChangePinTime;
    class ChangePitchBend extends ChangePins {
        constructor(doc, note, bendStart, bendEnd, bendTo, pitchIndex) {
            super(doc, note);
            bendStart -= this._oldStart;
            bendEnd -= this._oldStart;
            bendTo -= note.pitches[pitchIndex];
            let setStart = false;
            let setEnd = false;
            let prevInterval = 0;
            let prevVolume = 3;
            let persist = true;
            let i;
            let direction;
            let stop;
            let push;
            if (bendEnd > bendStart) {
                i = 0;
                direction = 1;
                stop = note.pins.length;
                push = (item) => { this._newPins.push(item); };
            }
            else {
                i = note.pins.length - 1;
                direction = -1;
                stop = -1;
                push = (item) => { this._newPins.unshift(item); };
            }
            for (; i != stop; i += direction) {
                const oldPin = note.pins[i];
                const time = oldPin.time;
                for (;;) {
                    if (!setStart) {
                        if (time * direction <= bendStart * direction) {
                            prevInterval = oldPin.interval;
                            prevVolume = oldPin.volume;
                        }
                        if (time * direction < bendStart * direction) {
                            push(beepbox.makeNotePin(oldPin.interval, time, oldPin.volume));
                            break;
                        }
                        else {
                            push(beepbox.makeNotePin(prevInterval, bendStart, prevVolume));
                            setStart = true;
                        }
                    }
                    else if (!setEnd) {
                        if (time * direction <= bendEnd * direction) {
                            prevInterval = oldPin.interval;
                            prevVolume = oldPin.volume;
                        }
                        if (time * direction < bendEnd * direction) {
                            break;
                        }
                        else {
                            push(beepbox.makeNotePin(bendTo, bendEnd, prevVolume));
                            setEnd = true;
                        }
                    }
                    else {
                        if (time * direction == bendEnd * direction) {
                            break;
                        }
                        else {
                            if (oldPin.interval != prevInterval)
                                persist = false;
                            push(beepbox.makeNotePin(persist ? bendTo : oldPin.interval, time, oldPin.volume));
                            break;
                        }
                    }
                }
            }
            if (!setEnd) {
                push(beepbox.makeNotePin(bendTo, bendEnd, prevVolume));
            }
            this._finishSetup();
        }
    }
    beepbox.ChangePitchBend = ChangePitchBend;
    class ChangePatternRhythm extends beepbox.ChangeSequence {
        constructor(doc, pattern) {
            super();
            const minDivision = beepbox.Config.partsPerBeat / beepbox.Config.rhythms[doc.song.rhythm].stepsPerBeat;
            const changeRhythm = function (oldTime) {
                let thresholds = beepbox.Config.rhythms[doc.song.rhythm].roundUpThresholds;
                if (thresholds != null) {
                    const beatStart = Math.floor(oldTime / beepbox.Config.partsPerBeat) * beepbox.Config.partsPerBeat;
                    const remainder = oldTime - beatStart;
                    let newTime = beatStart;
                    for (const threshold of thresholds) {
                        if (remainder >= threshold) {
                            newTime += minDivision;
                        }
                        else {
                            break;
                        }
                    }
                    return newTime;
                }
                else {
                    return Math.round(oldTime / minDivision) * minDivision;
                }
            };
            let i = 0;
            while (i < pattern.notes.length) {
                const note = pattern.notes[i];
                if (changeRhythm(note.start) >= changeRhythm(note.end)) {
                    this.append(new ChangeNoteAdded(doc, pattern, note, i, true));
                }
                else {
                    this.append(new ChangeRhythmNote(doc, note, changeRhythm));
                    i++;
                }
            }
        }
    }
    beepbox.ChangePatternRhythm = ChangePatternRhythm;
    class ChangeRhythmNote extends ChangePins {
        constructor(doc, note, changeRhythm) {
            super(doc, note);
            for (const oldPin of this._oldPins) {
                this._newPins.push(beepbox.makeNotePin(oldPin.interval, changeRhythm(oldPin.time + this._oldStart) - this._oldStart, oldPin.volume));
            }
            this._finishSetup();
        }
    }
    class ChangeMoveNotesSideways extends beepbox.ChangeGroup {
        constructor(doc, beatsToMove, strategy) {
            super();
            let partsToMove = Math.round((beatsToMove % doc.song.beatsPerBar) * beepbox.Config.partsPerBeat);
            if (partsToMove < 0)
                partsToMove += doc.song.beatsPerBar * beepbox.Config.partsPerBeat;
            if (partsToMove == 0.0)
                return;
            switch (strategy) {
                case "wrapAround":
                    {
                        const partsPerBar = beepbox.Config.partsPerBeat * doc.song.beatsPerBar;
                        for (const channel of doc.song.channels) {
                            for (const pattern of channel.patterns) {
                                const newNotes = [];
                                for (let bar = 1; bar >= 0; bar--) {
                                    const barStartPart = bar * partsPerBar;
                                    for (const oldNote of pattern.notes) {
                                        const absoluteNoteStart = oldNote.start + partsToMove;
                                        const absoluteNoteEnd = oldNote.end + partsToMove;
                                        const noteStartPart = Math.max(0, absoluteNoteStart - barStartPart);
                                        const noteEndPart = Math.min(partsPerBar, absoluteNoteEnd - barStartPart);
                                        if (noteStartPart < noteEndPart) {
                                            projectNoteIntoBar(oldNote, absoluteNoteStart - barStartPart - noteStartPart, noteStartPart, noteEndPart, newNotes);
                                        }
                                    }
                                }
                                pattern.notes = newNotes;
                            }
                        }
                    }
                    break;
                case "overflow":
                    {
                        let originalBarCount = doc.song.barCount;
                        let originalLoopStart = doc.song.loopStart;
                        let originalLoopLength = doc.song.loopLength;
                        this.append(new ChangeMoveAndOverflowNotes(doc, doc.song.beatsPerBar, partsToMove));
                        if (beatsToMove < 0) {
                            let firstBarIsEmpty = true;
                            for (const channel of doc.song.channels) {
                                if (channel.bars[0] != 0)
                                    firstBarIsEmpty = false;
                            }
                            if (firstBarIsEmpty) {
                                for (const channel of doc.song.channels) {
                                    channel.bars.shift();
                                }
                                doc.song.barCount--;
                            }
                            else {
                                originalBarCount++;
                                originalLoopStart++;
                                doc.bar++;
                            }
                        }
                        while (doc.song.barCount < originalBarCount) {
                            for (const channel of doc.song.channels) {
                                channel.bars.push(0);
                            }
                            doc.song.barCount++;
                        }
                        doc.song.loopStart = originalLoopStart;
                        doc.song.loopLength = originalLoopLength;
                    }
                    break;
                default: throw new Error("Unrecognized beats-per-bar conversion strategy.");
            }
            doc.notifier.changed();
            this._didSomething();
        }
    }
    beepbox.ChangeMoveNotesSideways = ChangeMoveNotesSideways;
    class ChangeBeatsPerBar extends beepbox.ChangeGroup {
        constructor(doc, newValue, strategy) {
            super();
            if (doc.song.beatsPerBar != newValue) {
                switch (strategy) {
                    case "splice":
                        {
                            if (doc.song.beatsPerBar > newValue) {
                                const sequence = new beepbox.ChangeSequence();
                                for (let i = 0; i < doc.song.getChannelCount(); i++) {
                                    for (let j = 0; j < doc.song.channels[i].patterns.length; j++) {
                                        sequence.append(new ChangeNoteTruncate(doc, doc.song.channels[i].patterns[j], newValue * beepbox.Config.partsPerBeat, doc.song.beatsPerBar * beepbox.Config.partsPerBeat));
                                    }
                                }
                            }
                        }
                        break;
                    case "stretch":
                        {
                            const changeRhythm = function (oldTime) {
                                return Math.round(oldTime * newValue / doc.song.beatsPerBar);
                            };
                            for (let channelIndex = 0; channelIndex < doc.song.getChannelCount(); channelIndex++) {
                                for (let patternIndex = 0; patternIndex < doc.song.channels[channelIndex].patterns.length; patternIndex++) {
                                    const pattern = doc.song.channels[channelIndex].patterns[patternIndex];
                                    let noteIndex = 0;
                                    while (noteIndex < pattern.notes.length) {
                                        const note = pattern.notes[noteIndex];
                                        if (changeRhythm(note.start) >= changeRhythm(note.end)) {
                                            this.append(new ChangeNoteAdded(doc, pattern, note, noteIndex, true));
                                        }
                                        else {
                                            this.append(new ChangeRhythmNote(doc, note, changeRhythm));
                                            noteIndex++;
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case "overflow":
                        {
                            this.append(new ChangeMoveAndOverflowNotes(doc, newValue, 0));
                            doc.song.loopStart = 0;
                            doc.song.loopLength = doc.song.barCount;
                        }
                        break;
                    default: throw new Error("Unrecognized beats-per-bar conversion strategy.");
                }
                doc.song.beatsPerBar = newValue;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeBeatsPerBar = ChangeBeatsPerBar;
    class ChangeScale extends beepbox.ChangeGroup {
        constructor(doc, newValue) {
            super();
            if (doc.song.scale != newValue) {
                doc.song.scale = newValue;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeScale = ChangeScale;
    class ChangeDetectKey extends beepbox.ChangeGroup {
        constructor(doc) {
            super();
            const song = doc.song;
            const basePitch = beepbox.Config.keys[song.key].basePitch;
            const keyWeights = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let channelIndex = 0; channelIndex < song.pitchChannelCount; channelIndex++) {
                for (let barIndex = 0; barIndex < song.barCount; barIndex++) {
                    const pattern = song.getPattern(channelIndex, barIndex);
                    if (pattern != null) {
                        for (const note of pattern.notes) {
                            const prevPin = note.pins[0];
                            for (let pinIndex = 1; pinIndex < note.pins.length; pinIndex++) {
                                const nextPin = note.pins[pinIndex];
                                if (prevPin.interval == nextPin.interval) {
                                    let weight = nextPin.time - prevPin.time;
                                    weight += Math.max(0, Math.min(beepbox.Config.partsPerBeat, nextPin.time + note.start) - (prevPin.time + note.start));
                                    weight *= nextPin.volume + prevPin.volume;
                                    for (const pitch of note.pitches) {
                                        const key = (basePitch + prevPin.interval + pitch) % 12;
                                        keyWeights[key] += weight;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            let bestKey = 0;
            let bestKeyWeight = 0;
            for (let key = 0; key < 12; key++) {
                const keyWeight = keyWeights[key] + 0.6 * keyWeights[(key + 7) % 12] + 0.2 * keyWeights[(key + 4) % 12] + 0.2 * keyWeights[(key + 3) % 12];
                if (bestKeyWeight < keyWeight) {
                    bestKeyWeight = keyWeight;
                    bestKey = key;
                }
            }
            if (bestKey != song.key) {
                const diff = song.key - bestKey;
                const absoluteDiff = Math.abs(diff);
                for (let channelIndex = 0; channelIndex < song.pitchChannelCount; channelIndex++) {
                    for (const pattern of song.channels[channelIndex].patterns) {
                        for (let i = 0; i < absoluteDiff; i++) {
                            this.append(new ChangeTranspose(doc, channelIndex, pattern, diff > 0, true));
                        }
                    }
                }
                song.key = bestKey;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeDetectKey = ChangeDetectKey;
    function pickRandomPresetValue(isNoise) {
        const eligiblePresetValues = [];
        for (let categoryIndex = 0; categoryIndex < beepbox.EditorConfig.presetCategories.length; categoryIndex++) {
            const category = beepbox.EditorConfig.presetCategories[categoryIndex];
            if (category.name == "Novelty Presets")
                continue;
            for (let presetIndex = 0; presetIndex < category.presets.length; presetIndex++) {
                const preset = category.presets[presetIndex];
                if (preset.settings != undefined && (preset.isNoise == true) == isNoise) {
                    eligiblePresetValues.push((categoryIndex << 6) + presetIndex);
                }
            }
        }
        return eligiblePresetValues[(Math.random() * eligiblePresetValues.length) | 0];
    }
    beepbox.pickRandomPresetValue = pickRandomPresetValue;
    function setDefaultInstruments(song) {
        for (let channelIndex = 0; channelIndex < song.channels.length; channelIndex++) {
            for (const instrument of song.channels[channelIndex].instruments) {
                const isNoise = song.getChannelIsNoise(channelIndex);
                const presetValue = (channelIndex == song.pitchChannelCount) ? beepbox.EditorConfig.nameToPresetValue(Math.random() > 0.5 ? "chip noise" : "standard drumset") : pickRandomPresetValue(isNoise);
                const preset = beepbox.EditorConfig.valueToPreset(presetValue);
                instrument.fromJsonObject(preset.settings, isNoise);
                instrument.preset = presetValue;
                instrument.volume = 1;
            }
        }
    }
    beepbox.setDefaultInstruments = setDefaultInstruments;
    class ChangeSong extends beepbox.ChangeGroup {
        constructor(doc, newHash) {
            super();
            doc.song.fromBase64String(newHash);
            this.append(new ChangeValidateDoc(doc));
            if (newHash == "")
                setDefaultInstruments(doc.song);
            doc.notifier.changed();
            this._didSomething();
        }
    }
    beepbox.ChangeSong = ChangeSong;
    class ChangeValidateDoc extends beepbox.Change {
        constructor(doc) {
            super();
            const channel = Math.min(doc.channel, doc.song.getChannelCount() - 1);
            const bar = Math.max(0, Math.min(doc.song.barCount - 1, doc.bar));
            const barScrollPos = Math.min(doc.bar, Math.max(doc.bar - (doc.trackVisibleBars - 1), Math.max(0, Math.min(doc.song.barCount - doc.trackVisibleBars, doc.barScrollPos))));
            if (doc.channel != channel || doc.bar != bar || doc.barScrollPos != barScrollPos) {
                doc.channel = channel;
                doc.bar = bar;
                doc.barScrollPos = barScrollPos;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeValidateDoc = ChangeValidateDoc;
    class ChangeReplacePatterns extends beepbox.ChangeGroup {
        constructor(doc, pitchChannels, noiseChannels) {
            super();
            const song = doc.song;
            function removeExtraSparseChannels(channels, maxLength) {
                while (channels.length > maxLength) {
                    let sparsestIndex = channels.length - 1;
                    let mostZeroes = 0;
                    for (let channelIndex = 0; channelIndex < channels.length - 1; channelIndex++) {
                        let zeroes = 0;
                        for (const bar of channels[channelIndex].bars) {
                            if (bar == 0)
                                zeroes++;
                        }
                        if (zeroes >= mostZeroes) {
                            sparsestIndex = channelIndex;
                            mostZeroes = zeroes;
                        }
                    }
                    channels.splice(sparsestIndex, 1);
                }
            }
            removeExtraSparseChannels(pitchChannels, beepbox.Config.pitchChannelCountMax);
            removeExtraSparseChannels(noiseChannels, beepbox.Config.noiseChannelCountMax);
            while (pitchChannels.length < beepbox.Config.pitchChannelCountMin)
                pitchChannels.push(new beepbox.Channel());
            while (noiseChannels.length < beepbox.Config.noiseChannelCountMin)
                noiseChannels.push(new beepbox.Channel());
            song.barCount = 1;
            song.instrumentsPerChannel = 1;
            song.patternsPerChannel = 8;
            const combinedChannels = pitchChannels.concat(noiseChannels);
            for (let channelIndex = 0; channelIndex < combinedChannels.length; channelIndex++) {
                const channel = combinedChannels[channelIndex];
                song.barCount = Math.max(song.barCount, channel.bars.length);
                song.patternsPerChannel = Math.max(song.patternsPerChannel, channel.patterns.length);
                song.instrumentsPerChannel = Math.max(song.instrumentsPerChannel, channel.instruments.length);
                song.channels[channelIndex] = channel;
            }
            song.channels.length = combinedChannels.length;
            song.pitchChannelCount = pitchChannels.length;
            song.noiseChannelCount = noiseChannels.length;
            song.barCount = Math.min(beepbox.Config.barCountMax, song.barCount);
            song.patternsPerChannel = Math.min(beepbox.Config.barCountMax, song.patternsPerChannel);
            song.instrumentsPerChannel = Math.min(beepbox.Config.instrumentsPerChannelMax, song.instrumentsPerChannel);
            for (let channelIndex = 0; channelIndex < song.channels.length; channelIndex++) {
                const channel = song.channels[channelIndex];
                for (let barIndex = 0; barIndex < channel.bars.length; barIndex++) {
                    if (channel.bars[barIndex] > song.patternsPerChannel || channel.bars[barIndex] < 0) {
                        channel.bars[barIndex] = 0;
                    }
                }
                for (const pattern of channel.patterns) {
                    if (pattern.instrument >= song.instrumentsPerChannel || pattern.instrument < 0) {
                        pattern.instrument = 0;
                    }
                }
                while (channel.bars.length < song.barCount) {
                    channel.bars.push(0);
                }
                while (channel.patterns.length < song.patternsPerChannel) {
                    channel.patterns.push(new beepbox.Pattern());
                }
                while (channel.instruments.length < song.instrumentsPerChannel) {
                    const instrument = new beepbox.Instrument(doc.song.getChannelIsNoise(channelIndex));
                    if (song.getChannelIsNoise(channelIndex)) {
                        instrument.setTypeAndReset(2, true);
                    }
                    else {
                        instrument.setTypeAndReset(0, false);
                    }
                    channel.instruments.push(instrument);
                }
                channel.bars.length = song.barCount;
                channel.patterns.length = song.patternsPerChannel;
                channel.instruments.length = song.instrumentsPerChannel;
            }
            song.loopStart = Math.max(0, Math.min(song.barCount - 1, song.loopStart));
            song.loopLength = Math.min(song.barCount - song.loopStart, song.loopLength);
            this.append(new ChangeValidateDoc(doc));
            doc.notifier.changed();
            this._didSomething();
        }
    }
    beepbox.ChangeReplacePatterns = ChangeReplacePatterns;
    function comparePatternNotes(a, b) {
        if (a.length != b.length)
            return false;
        for (let noteIndex = 0; noteIndex < a.length; noteIndex++) {
            const oldNote = a[noteIndex];
            const newNote = b[noteIndex];
            if (newNote.start != oldNote.start || newNote.end != oldNote.end || newNote.pitches.length != oldNote.pitches.length || newNote.pins.length != oldNote.pins.length) {
                return false;
            }
            for (let pitchIndex = 0; pitchIndex < oldNote.pitches.length; pitchIndex++) {
                if (newNote.pitches[pitchIndex] != oldNote.pitches[pitchIndex]) {
                    return false;
                }
            }
            for (let pinIndex = 0; pinIndex < oldNote.pins.length; pinIndex++) {
                if (newNote.pins[pinIndex].interval != oldNote.pins[pinIndex].interval || newNote.pins[pinIndex].time != oldNote.pins[pinIndex].time || newNote.pins[pinIndex].volume != oldNote.pins[pinIndex].volume) {
                    return false;
                }
            }
        }
        return true;
    }
    beepbox.comparePatternNotes = comparePatternNotes;
    function removeDuplicatePatterns(channels) {
        for (const channel of channels) {
            const newPatterns = [];
            for (let bar = 0; bar < channel.bars.length; bar++) {
                if (channel.bars[bar] == 0)
                    continue;
                const oldPattern = channel.patterns[channel.bars[bar] - 1];
                let foundMatchingPattern = false;
                for (let newPatternIndex = 0; newPatternIndex < newPatterns.length; newPatternIndex++) {
                    const newPattern = newPatterns[newPatternIndex];
                    if (newPattern.instrument != oldPattern.instrument || newPattern.notes.length != oldPattern.notes.length) {
                        continue;
                    }
                    if (comparePatternNotes(oldPattern.notes, newPattern.notes)) {
                        foundMatchingPattern = true;
                        channel.bars[bar] = newPatternIndex + 1;
                        break;
                    }
                }
                if (!foundMatchingPattern) {
                    newPatterns.push(oldPattern);
                    channel.bars[bar] = newPatterns.length;
                }
            }
            for (let patternIndex = 0; patternIndex < newPatterns.length; patternIndex++) {
                channel.patterns[patternIndex] = newPatterns[patternIndex];
            }
            channel.patterns.length = newPatterns.length;
        }
    }
    beepbox.removeDuplicatePatterns = removeDuplicatePatterns;
    class ChangeTempo extends beepbox.Change {
        constructor(doc, oldValue, newValue) {
            super();
            doc.song.tempo = Math.max(beepbox.Config.tempoMin, Math.min(beepbox.Config.tempoMax, newValue));
            doc.notifier.changed();
            if (oldValue != newValue)
                this._didSomething();
        }
    }
    beepbox.ChangeTempo = ChangeTempo;
    class ChangeReverb extends beepbox.Change {
        constructor(doc, oldValue, newValue) {
            super();
            doc.song.reverb = newValue;
            doc.notifier.changed();
            if (oldValue != newValue)
                this._didSomething();
        }
    }
    beepbox.ChangeReverb = ChangeReverb;
    class ChangeNoteAdded extends beepbox.UndoableChange {
        constructor(doc, pattern, note, index, deletion = false) {
            super(deletion);
            this._doc = doc;
            this._pattern = pattern;
            this._note = note;
            this._index = index;
            this._didSomething();
            this.redo();
        }
        _doForwards() {
            this._pattern.notes.splice(this._index, 0, this._note);
            this._doc.notifier.changed();
        }
        _doBackwards() {
            this._pattern.notes.splice(this._index, 1);
            this._doc.notifier.changed();
        }
    }
    beepbox.ChangeNoteAdded = ChangeNoteAdded;
    class ChangeNoteLength extends ChangePins {
        constructor(doc, note, truncStart, truncEnd) {
            super(doc, note);
            truncStart -= this._oldStart;
            truncEnd -= this._oldStart;
            let setStart = false;
            let prevVolume = this._oldPins[0].volume;
            let prevInterval = this._oldPins[0].interval;
            let pushLastPin = true;
            let i;
            for (i = 0; i < this._oldPins.length; i++) {
                const oldPin = this._oldPins[i];
                if (oldPin.time < truncStart) {
                    prevVolume = oldPin.volume;
                    prevInterval = oldPin.interval;
                }
                else if (oldPin.time <= truncEnd) {
                    if (oldPin.time > truncStart && !setStart) {
                        this._newPins.push(beepbox.makeNotePin(prevInterval, truncStart, prevVolume));
                    }
                    this._newPins.push(beepbox.makeNotePin(oldPin.interval, oldPin.time, oldPin.volume));
                    setStart = true;
                    if (oldPin.time == truncEnd) {
                        pushLastPin = false;
                        break;
                    }
                }
                else {
                    break;
                }
            }
            if (pushLastPin)
                this._newPins.push(beepbox.makeNotePin(this._oldPins[i].interval, truncEnd, this._oldPins[i].volume));
            this._finishSetup();
        }
    }
    beepbox.ChangeNoteLength = ChangeNoteLength;
    class ChangeNoteTruncate extends beepbox.ChangeSequence {
        constructor(doc, pattern, start, end, skipNote) {
            super();
            let i = 0;
            while (i < pattern.notes.length) {
                const note = pattern.notes[i];
                if (note == skipNote && skipNote != undefined) {
                    i++;
                }
                else if (note.end <= start) {
                    i++;
                }
                else if (note.start >= end) {
                    break;
                }
                else if (note.start < start) {
                    this.append(new ChangeNoteLength(doc, note, note.start, start));
                    i++;
                }
                else if (note.end > end) {
                    this.append(new ChangeNoteLength(doc, note, end, note.end));
                    i++;
                }
                else {
                    this.append(new ChangeNoteAdded(doc, pattern, note, i, true));
                }
            }
        }
    }
    beepbox.ChangeNoteTruncate = ChangeNoteTruncate;
    class ChangeTransposeNote extends beepbox.UndoableChange {
        constructor(doc, channel, note, upward, ignoreScale = false, octave = false) {
            super(false);
            this._doc = doc;
            this._note = note;
            this._oldPins = note.pins;
            this._newPins = [];
            this._oldPitches = note.pitches;
            this._newPitches = [];
            const isNoise = doc.song.getChannelIsNoise(channel);
            if (isNoise != doc.song.getChannelIsNoise(doc.channel))
                return;
            const maxPitch = (isNoise ? beepbox.Config.drumCount - 1 : beepbox.Config.maxPitch);
            for (let i = 0; i < this._oldPitches.length; i++) {
                let pitch = this._oldPitches[i];
                if (octave && !isNoise) {
                    if (upward) {
                        pitch = Math.min(maxPitch, pitch + 12);
                    }
                    else {
                        pitch = Math.max(0, pitch - 12);
                    }
                }
                else {
                    if (upward) {
                        for (let j = pitch + 1; j <= maxPitch; j++) {
                            if (isNoise || ignoreScale || beepbox.Config.scales[doc.song.scale].flags[j % 12]) {
                                pitch = j;
                                break;
                            }
                        }
                    }
                    else {
                        for (let j = pitch - 1; j >= 0; j--) {
                            if (isNoise || ignoreScale || beepbox.Config.scales[doc.song.scale].flags[j % 12]) {
                                pitch = j;
                                break;
                            }
                        }
                    }
                }
                let foundMatch = false;
                for (let j = 0; j < this._newPitches.length; j++) {
                    if (this._newPitches[j] == pitch) {
                        foundMatch = true;
                        break;
                    }
                }
                if (!foundMatch)
                    this._newPitches.push(pitch);
            }
            let min = 0;
            let max = maxPitch;
            for (let i = 1; i < this._newPitches.length; i++) {
                const diff = this._newPitches[0] - this._newPitches[i];
                if (min < diff)
                    min = diff;
                if (max > diff + maxPitch)
                    max = diff + maxPitch;
            }
            for (const oldPin of this._oldPins) {
                let interval = oldPin.interval + this._oldPitches[0];
                if (interval < min)
                    interval = min;
                if (interval > max)
                    interval = max;
                if (octave && !isNoise) {
                    if (upward) {
                        interval = Math.min(max, interval + 12);
                    }
                    else {
                        interval = Math.max(min, interval - 12);
                    }
                }
                else {
                    if (upward) {
                        for (let i = interval + 1; i <= max; i++) {
                            if (isNoise || ignoreScale || beepbox.Config.scales[doc.song.scale].flags[i % 12]) {
                                interval = i;
                                break;
                            }
                        }
                    }
                    else {
                        for (let i = interval - 1; i >= min; i--) {
                            if (isNoise || ignoreScale || beepbox.Config.scales[doc.song.scale].flags[i % 12]) {
                                interval = i;
                                break;
                            }
                        }
                    }
                }
                interval -= this._newPitches[0];
                this._newPins.push(beepbox.makeNotePin(interval, oldPin.time, oldPin.volume));
            }
            if (this._newPins[0].interval != 0)
                throw new Error("wrong pin start interval");
            for (let i = 1; i < this._newPins.length - 1;) {
                if (this._newPins[i - 1].interval == this._newPins[i].interval &&
                    this._newPins[i].interval == this._newPins[i + 1].interval &&
                    this._newPins[i - 1].volume == this._newPins[i].volume &&
                    this._newPins[i].volume == this._newPins[i + 1].volume) {
                    this._newPins.splice(i, 1);
                }
                else {
                    i++;
                }
            }
            this._doForwards();
            this._didSomething();
        }
        _doForwards() {
            this._note.pins = this._newPins;
            this._note.pitches = this._newPitches;
            this._doc.notifier.changed();
        }
        _doBackwards() {
            this._note.pins = this._oldPins;
            this._note.pitches = this._oldPitches;
            this._doc.notifier.changed();
        }
    }
    class ChangeTranspose extends beepbox.ChangeSequence {
        constructor(doc, channel, pattern, upward, ignoreScale = false, octave = false) {
            super();
            for (let i = 0; i < pattern.notes.length; i++) {
                this.append(new ChangeTransposeNote(doc, channel, pattern.notes[i], upward, ignoreScale, octave));
            }
        }
    }
    beepbox.ChangeTranspose = ChangeTranspose;
    class ChangePatternScale extends beepbox.Change {
        constructor(doc, pattern, scaleMap) {
            super();
            const maxPitch = beepbox.Config.maxPitch;
            for (const note of pattern.notes) {
                const newPitches = [];
                const newPins = [];
                for (let i = 0; i < note.pitches.length; i++) {
                    const pitch = note.pitches[i];
                    const transformedPitch = scaleMap[pitch % 12] + (pitch - (pitch % 12));
                    if (newPitches.indexOf(transformedPitch) == -1) {
                        newPitches.push(transformedPitch);
                    }
                }
                let min = 0;
                let max = maxPitch;
                for (let i = 1; i < newPitches.length; i++) {
                    const diff = newPitches[0] - newPitches[i];
                    if (min < diff)
                        min = diff;
                    if (max > diff + maxPitch)
                        max = diff + maxPitch;
                }
                for (const oldPin of note.pins) {
                    let interval = oldPin.interval + note.pitches[0];
                    if (interval < min)
                        interval = min;
                    if (interval > max)
                        interval = max;
                    const transformedInterval = scaleMap[interval % 12] + (interval - (interval % 12));
                    newPins.push(beepbox.makeNotePin(transformedInterval - newPitches[0], oldPin.time, oldPin.volume));
                }
                if (newPins[0].interval != 0)
                    throw new Error("wrong pin start interval");
                for (let i = 1; i < newPins.length - 1;) {
                    if (newPins[i - 1].interval == newPins[i].interval &&
                        newPins[i].interval == newPins[i + 1].interval &&
                        newPins[i - 1].volume == newPins[i].volume &&
                        newPins[i].volume == newPins[i + 1].volume) {
                        newPins.splice(i, 1);
                    }
                    else {
                        i++;
                    }
                }
                note.pitches = newPitches;
                note.pins = newPins;
            }
            this._didSomething();
            doc.notifier.changed();
        }
    }
    beepbox.ChangePatternScale = ChangePatternScale;
    class ChangeVolume extends beepbox.Change {
        constructor(doc, oldValue, newValue) {
            super();
            doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()].volume = newValue;
            doc.notifier.changed();
            if (oldValue != newValue)
                this._didSomething();
        }
    }
    beepbox.ChangeVolume = ChangeVolume;
    class ChangePan extends beepbox.Change {
        constructor(doc, oldValue, newValue) {
            super();
            doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()].pan = newValue;
            doc.notifier.changed();
            if (oldValue != newValue)
                this._didSomething();
        }
    }
    beepbox.ChangePan = ChangePan;
    class ChangeVolumeBend extends beepbox.UndoableChange {
        constructor(doc, note, bendPart, bendVolume, bendInterval) {
            super(false);
            this._doc = doc;
            this._note = note;
            this._oldPins = note.pins;
            this._newPins = [];
            let inserted = false;
            for (const pin of note.pins) {
                if (pin.time < bendPart) {
                    this._newPins.push(pin);
                }
                else if (pin.time == bendPart) {
                    this._newPins.push(beepbox.makeNotePin(bendInterval, bendPart, bendVolume));
                    inserted = true;
                }
                else {
                    if (!inserted) {
                        this._newPins.push(beepbox.makeNotePin(bendInterval, bendPart, bendVolume));
                        inserted = true;
                    }
                    this._newPins.push(pin);
                }
            }
            for (let i = 1; i < this._newPins.length - 1;) {
                if (this._newPins[i - 1].interval == this._newPins[i].interval &&
                    this._newPins[i].interval == this._newPins[i + 1].interval &&
                    this._newPins[i - 1].volume == this._newPins[i].volume &&
                    this._newPins[i].volume == this._newPins[i + 1].volume) {
                    this._newPins.splice(i, 1);
                }
                else {
                    i++;
                }
            }
            this._doForwards();
            this._didSomething();
        }
        _doForwards() {
            this._note.pins = this._newPins;
            this._doc.notifier.changed();
        }
        _doBackwards() {
            this._note.pins = this._oldPins;
            this._doc.notifier.changed();
        }
    }
    beepbox.ChangeVolumeBend = ChangeVolumeBend;
    class ChangeChipWave extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            if (instrument.chipWave != newValue) {
                instrument.chipWave = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeChipWave = ChangeChipWave;
    class ChangeNoiseWave extends beepbox.Change {
        constructor(doc, newValue) {
            super();
            const instrument = doc.song.channels[doc.channel].instruments[doc.getCurrentInstrument()];
            if (instrument.chipNoise != newValue) {
                instrument.chipNoise = newValue;
                instrument.preset = instrument.type;
                doc.notifier.changed();
                this._didSomething();
            }
        }
    }
    beepbox.ChangeNoiseWave = ChangeNoiseWave;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    function makeEmptyReplacementElement(node) {
        const clone = node.cloneNode(false);
        node.parentNode.replaceChild(clone, node);
        return clone;
    }
    class PatternCursor {
        constructor() {
            this.valid = false;
            this.prevNote = null;
            this.curNote = null;
            this.nextNote = null;
            this.pitch = 0;
            this.pitchIndex = -1;
            this.curIndex = 0;
            this.start = 0;
            this.end = 0;
            this.part = 0;
            this.notePart = 0;
            this.nearPinIndex = 0;
            this.pins = [];
        }
    }
    class PatternEditor {
        constructor(_doc) {
            this._doc = _doc;
            this._svgNoteBackground = beepbox.SVG.pattern({ id: "patternEditorNoteBackground", x: "0", y: "0", width: "64", height: "156", patternUnits: "userSpaceOnUse" });
            this._svgDrumBackground = beepbox.SVG.pattern({ id: "patternEditorDrumBackground", x: "0", y: "0", width: "64", height: "40", patternUnits: "userSpaceOnUse" });
            this._svgBackground = beepbox.SVG.rect({ x: "0", y: "0", width: "512", height: "481", "pointer-events": "none", fill: "url(#patternEditorNoteBackground)" });
            this._svgNoteContainer = beepbox.SVG.svg();
            this._svgPlayhead = beepbox.SVG.rect({ id: "", x: "0", y: "0", width: "4", height: "481", fill: "white", "pointer-events": "none" });
            this._svgPreview = beepbox.SVG.path({ fill: "none", stroke: "white", "stroke-width": "2", "pointer-events": "none" });
            this._svg = beepbox.SVG.svg({ style: "background-color: #000000; touch-action: none; position: absolute;", width: "100%", height: "100%", viewBox: "0 0 512 481", preserveAspectRatio: "none" }, beepbox.SVG.defs(this._svgNoteBackground, this._svgDrumBackground), this._svgBackground, this._svgNoteContainer, this._svgPreview, this._svgPlayhead);
            this.container = beepbox.HTML.div({ style: "height: 100%; overflow:hidden; position: relative; flex-grow: 1;" }, this._svg);
            this._defaultPitchHeight = 13;
            this._defaultDrumHeight = 40;
            this._backgroundPitchRows = [];
            this._backgroundDrumRow = beepbox.SVG.rect();
            this._editorHeight = 481;
            this._mouseX = 0;
            this._mouseY = 0;
            this._mouseDown = false;
            this._mouseOver = false;
            this._mouseDragging = false;
            this._mouseHorizontal = false;
            this._usingTouch = false;
            this._copiedPinChannels = [];
            this._mouseXStart = 0;
            this._mouseYStart = 0;
            this._dragTime = 0;
            this._dragPitch = 0;
            this._dragVolume = 0;
            this._dragVisible = false;
            this._dragChange = null;
            this._cursor = new PatternCursor();
            this._pattern = null;
            this._playheadX = 0.0;
            this._octaveOffset = 0;
            this._renderedWidth = -1;
            this._renderedBeatWidth = -1;
            this._renderedFifths = false;
            this._renderedDrums = false;
            this._renderedRhythm = -1;
            this._renderedPitchChannelCount = -1;
            this._renderedNoiseChannelCount = -1;
            this._followPlayheadBar = -1;
            this.resetCopiedPins = () => {
                const maxDivision = this._getMaxDivision();
                this._copiedPinChannels.length = this._doc.song.getChannelCount();
                for (let i = 0; i < this._doc.song.pitchChannelCount; i++) {
                    this._copiedPinChannels[i] = [beepbox.makeNotePin(0, 0, 3), beepbox.makeNotePin(0, maxDivision, 3)];
                }
                for (let i = this._doc.song.pitchChannelCount; i < this._doc.song.getChannelCount(); i++) {
                    this._copiedPinChannels[i] = [beepbox.makeNotePin(0, 0, 3), beepbox.makeNotePin(0, maxDivision, 0)];
                }
            };
            this._animatePlayhead = (timestamp) => {
                const playheadBar = Math.floor(this._doc.synth.playhead);
                if (this._doc.synth.playing && ((this._pattern != null && this._doc.song.getPattern(this._doc.channel, Math.floor(this._doc.synth.playhead)) == this._pattern) || Math.floor(this._doc.synth.playhead) == this._doc.bar)) {
                    this._svgPlayhead.setAttribute("visibility", "visible");
                    const modPlayhead = this._doc.synth.playhead - playheadBar;
                    if (Math.abs(modPlayhead - this._playheadX) > 0.1) {
                        this._playheadX = modPlayhead;
                    }
                    else {
                        this._playheadX += (modPlayhead - this._playheadX) * 0.2;
                    }
                    this._svgPlayhead.setAttribute("x", "" + beepbox.prettyNumber(this._playheadX * this._editorWidth - 2));
                }
                else {
                    this._svgPlayhead.setAttribute("visibility", "hidden");
                }
                if (this._doc.synth.playing && this._doc.autoFollow && this._followPlayheadBar != playheadBar) {
                    new beepbox.ChangeChannelBar(this._doc, this._doc.channel, playheadBar);
                    this._doc.notifier.notifyWatchers();
                }
                this._followPlayheadBar = playheadBar;
                window.requestAnimationFrame(this._animatePlayhead);
            };
            this._whenMouseOver = (event) => {
                if (this._mouseOver)
                    return;
                this._mouseOver = true;
                this._usingTouch = false;
            };
            this._whenMouseOut = (event) => {
                if (!this._mouseOver)
                    return;
                this._mouseOver = false;
            };
            this._whenMousePressed = (event) => {
                event.preventDefault();
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = ((event.clientX || event.pageX) - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = ((event.clientY || event.pageY) - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._usingTouch = false;
                this._whenCursorPressed();
            };
            this._whenTouchPressed = (event) => {
                event.preventDefault();
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = (event.touches[0].clientX - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = (event.touches[0].clientY - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._usingTouch = true;
                this._whenCursorPressed();
            };
            this._whenMouseMoved = (event) => {
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = ((event.clientX || event.pageX) - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = ((event.clientY || event.pageY) - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._usingTouch = false;
                this._whenCursorMoved();
            };
            this._whenTouchMoved = (event) => {
                if (!this._mouseDown)
                    return;
                event.preventDefault();
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = (event.touches[0].clientX - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = (event.touches[0].clientY - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._whenCursorMoved();
            };
            this._whenCursorReleased = (event) => {
                if (!this._cursor.valid)
                    return;
                const continuousState = this._doc.lastChangeWas(this._dragChange);
                if (this._mouseDragging && continuousState) {
                    if (this._dragChange != null) {
                        this._doc.record(this._dragChange);
                        this._dragChange = null;
                    }
                }
                else if (this._mouseDown && continuousState) {
                    if (this._cursor.curNote == null) {
                        const note = new beepbox.Note(this._cursor.pitch, this._cursor.start, this._cursor.end, 3, this._doc.song.getChannelIsNoise(this._doc.channel));
                        note.pins = [];
                        for (const oldPin of this._cursor.pins) {
                            note.pins.push(beepbox.makeNotePin(0, oldPin.time, oldPin.volume));
                        }
                        const sequence = new beepbox.ChangeSequence();
                        sequence.append(new beepbox.ChangeEnsurePatternExists(this._doc, this._doc.channel, this._doc.bar));
                        const pattern = this._doc.getCurrentPattern();
                        if (pattern == null)
                            throw new Error();
                        sequence.append(new beepbox.ChangeNoteAdded(this._doc, pattern, note, this._cursor.curIndex));
                        this._doc.record(sequence);
                    }
                    else {
                        if (this._pattern == null)
                            throw new Error();
                        if (this._cursor.pitchIndex == -1) {
                            const sequence = new beepbox.ChangeSequence();
                            if (this._cursor.curNote.pitches.length == 4) {
                                sequence.append(new beepbox.ChangePitchAdded(this._doc, this._cursor.curNote, this._cursor.curNote.pitches[0], 0, true));
                            }
                            sequence.append(new beepbox.ChangePitchAdded(this._doc, this._cursor.curNote, this._cursor.pitch, this._cursor.curNote.pitches.length));
                            this._doc.record(sequence);
                            this._copyPins(this._cursor.curNote);
                        }
                        else {
                            if (this._cursor.curNote.pitches.length == 1) {
                                this._doc.record(new beepbox.ChangeNoteAdded(this._doc, this._pattern, this._cursor.curNote, this._cursor.curIndex, true));
                            }
                            else {
                                this._doc.record(new beepbox.ChangePitchAdded(this._doc, this._cursor.curNote, this._cursor.pitch, this._cursor.curNote.pitches.indexOf(this._cursor.pitch), true));
                            }
                        }
                    }
                }
                this._mouseDown = false;
                this._mouseDragging = false;
                this._updateCursorStatus();
                this._updatePreview();
            };
            this._documentChanged = () => {
                const nextPattern = this._doc.getCurrentPattern();
                if (this._pattern != nextPattern) {
                    this._whenCursorReleased(null);
                    this._dragChange = null;
                }
                this._pattern = nextPattern;
                this._editorWidth = this._doc.showLetters ? (this._doc.showScrollBar ? 460 : 480) : (this._doc.showScrollBar ? 492 : 512);
                this._partWidth = this._editorWidth / (this._doc.song.beatsPerBar * beepbox.Config.partsPerBeat);
                this._pitchHeight = this._doc.song.getChannelIsNoise(this._doc.channel) ? this._defaultDrumHeight : this._defaultPitchHeight;
                this._pitchCount = this._doc.song.getChannelIsNoise(this._doc.channel) ? beepbox.Config.drumCount : beepbox.Config.windowPitchCount;
                this._octaveOffset = this._doc.song.channels[this._doc.channel].octave * 12;
                if (this._renderedRhythm != this._doc.song.rhythm ||
                    this._renderedPitchChannelCount != this._doc.song.pitchChannelCount ||
                    this._renderedNoiseChannelCount != this._doc.song.noiseChannelCount) {
                    this._renderedRhythm = this._doc.song.rhythm;
                    this._renderedPitchChannelCount = this._doc.song.pitchChannelCount;
                    this._renderedNoiseChannelCount = this._doc.song.noiseChannelCount;
                    this.resetCopiedPins();
                }
                this._copiedPins = this._copiedPinChannels[this._doc.channel];
                if (this._renderedWidth != this._editorWidth) {
                    this._renderedWidth = this._editorWidth;
                    this._svg.setAttribute("viewBox", "0 0 " + this._editorWidth + " 481");
                    this._svgBackground.setAttribute("width", "" + this._editorWidth);
                }
                const beatWidth = this._editorWidth / this._doc.song.beatsPerBar;
                if (this._renderedBeatWidth != beatWidth) {
                    this._renderedBeatWidth = beatWidth;
                    this._svgNoteBackground.setAttribute("width", "" + beatWidth);
                    this._svgDrumBackground.setAttribute("width", "" + beatWidth);
                    this._backgroundDrumRow.setAttribute("width", "" + (beatWidth - 2));
                    for (let j = 0; j < 12; j++) {
                        this._backgroundPitchRows[j].setAttribute("width", "" + (beatWidth - 2));
                    }
                }
                if (!this._mouseDown)
                    this._updateCursorStatus();
                this._svgNoteContainer = makeEmptyReplacementElement(this._svgNoteContainer);
                this._updatePreview();
                if (this._renderedFifths != this._doc.showFifth) {
                    this._renderedFifths = this._doc.showFifth;
                    this._backgroundPitchRows[7].setAttribute("fill", this._doc.showFifth ? "#446688" : "#444444");
                }
                for (let j = 0; j < 12; j++) {
                    this._backgroundPitchRows[j].style.visibility = beepbox.Config.scales[this._doc.song.scale].flags[j] ? "visible" : "hidden";
                }
                if (this._doc.song.getChannelIsNoise(this._doc.channel)) {
                    if (!this._renderedDrums) {
                        this._renderedDrums = true;
                        this._svgBackground.setAttribute("fill", "url(#patternEditorDrumBackground)");
                        this._svgBackground.setAttribute("height", "" + (this._defaultDrumHeight * beepbox.Config.drumCount));
                    }
                }
                else {
                    if (this._renderedDrums) {
                        this._renderedDrums = false;
                        this._svgBackground.setAttribute("fill", "url(#patternEditorNoteBackground)");
                        this._svgBackground.setAttribute("height", "" + this._editorHeight);
                    }
                }
                if (this._doc.showChannels) {
                    for (let channel = this._doc.song.getChannelCount() - 1; channel >= 0; channel--) {
                        if (channel == this._doc.channel)
                            continue;
                        if (this._doc.song.getChannelIsNoise(channel) != this._doc.song.getChannelIsNoise(this._doc.channel))
                            continue;
                        const pattern2 = this._doc.song.getPattern(channel, this._doc.bar);
                        if (pattern2 == null)
                            continue;
                        for (const note of pattern2.notes) {
                            for (const pitch of note.pitches) {
                                const notePath = beepbox.SVG.path();
                                notePath.setAttribute("fill", beepbox.ColorConfig.getChannelColor(this._doc.song, channel).noteDim);
                                notePath.setAttribute("pointer-events", "none");
                                this._drawNote(notePath, pitch, note.start, note.pins, this._pitchHeight * 0.19, false, this._doc.song.channels[channel].octave * 12);
                                this._svgNoteContainer.appendChild(notePath);
                            }
                        }
                    }
                }
                if (this._pattern != null) {
                    for (const note of this._pattern.notes) {
                        for (let i = 0; i < note.pitches.length; i++) {
                            const pitch = note.pitches[i];
                            let notePath = beepbox.SVG.path();
                            notePath.setAttribute("fill", beepbox.ColorConfig.getChannelColor(this._doc.song, this._doc.channel).noteDim);
                            notePath.setAttribute("pointer-events", "none");
                            this._drawNote(notePath, pitch, note.start, note.pins, this._pitchHeight / 2 + 1, false, this._octaveOffset);
                            this._svgNoteContainer.appendChild(notePath);
                            notePath = beepbox.SVG.path();
                            notePath.setAttribute("fill", beepbox.ColorConfig.getChannelColor(this._doc.song, this._doc.channel).noteBright);
                            notePath.setAttribute("pointer-events", "none");
                            this._drawNote(notePath, pitch, note.start, note.pins, this._pitchHeight / 2 + 1, true, this._octaveOffset);
                            this._svgNoteContainer.appendChild(notePath);
                            if (note.pitches.length > 1) {
                                const instrument = this._doc.song.channels[this._doc.channel].instruments[this._doc.getCurrentInstrument()];
                                const chord = instrument.getChord();
                                if (!chord.harmonizes || chord.arpeggiates || chord.strumParts > 0) {
                                    let oscillatorLabel = beepbox.SVG.text();
                                    oscillatorLabel.setAttribute("x", "" + beepbox.prettyNumber(this._partWidth * note.start + 2));
                                    oscillatorLabel.setAttribute("y", "" + beepbox.prettyNumber(this._pitchToPixelHeight(pitch - this._octaveOffset)));
                                    oscillatorLabel.setAttribute("width", "30");
                                    oscillatorLabel.setAttribute("fill", "black");
                                    oscillatorLabel.setAttribute("text-anchor", "start");
                                    oscillatorLabel.setAttribute("dominant-baseline", "central");
                                    oscillatorLabel.setAttribute("pointer-events", "none");
                                    oscillatorLabel.textContent = "" + (i + 1);
                                    this._svgNoteContainer.appendChild(oscillatorLabel);
                                }
                            }
                        }
                    }
                }
            };
            for (let i = 0; i < 12; i++) {
                const y = (12 - i) % 12;
                const rectangle = beepbox.SVG.rect();
                rectangle.setAttribute("x", "1");
                rectangle.setAttribute("y", "" + (y * this._defaultPitchHeight + 1));
                rectangle.setAttribute("height", "" + (this._defaultPitchHeight - 2));
                rectangle.setAttribute("fill", (i == 0) ? "#886644" : "#444444");
                this._svgNoteBackground.appendChild(rectangle);
                this._backgroundPitchRows[i] = rectangle;
            }
            this._backgroundDrumRow.setAttribute("x", "1");
            this._backgroundDrumRow.setAttribute("y", "1");
            this._backgroundDrumRow.setAttribute("height", "" + (this._defaultDrumHeight - 2));
            this._backgroundDrumRow.setAttribute("fill", "#444444");
            this._svgDrumBackground.appendChild(this._backgroundDrumRow);
            this._doc.notifier.watch(this._documentChanged);
            this._documentChanged();
            this._updateCursorStatus();
            this._updatePreview();
            window.requestAnimationFrame(this._animatePlayhead);
            this._svg.addEventListener("mousedown", this._whenMousePressed);
            document.addEventListener("mousemove", this._whenMouseMoved);
            document.addEventListener("mouseup", this._whenCursorReleased);
            this._svg.addEventListener("mouseover", this._whenMouseOver);
            this._svg.addEventListener("mouseout", this._whenMouseOut);
            this._svg.addEventListener("touchstart", this._whenTouchPressed);
            this._svg.addEventListener("touchmove", this._whenTouchMoved);
            this._svg.addEventListener("touchend", this._whenCursorReleased);
            this._svg.addEventListener("touchcancel", this._whenCursorReleased);
            this.resetCopiedPins();
        }
        _getMaxDivision() {
            const rhythmStepsPerBeat = beepbox.Config.rhythms[this._doc.song.rhythm].stepsPerBeat;
            if (rhythmStepsPerBeat % 4 == 0) {
                return beepbox.Config.partsPerBeat / 2;
            }
            else if (rhythmStepsPerBeat % 3 == 0) {
                return beepbox.Config.partsPerBeat / 3;
            }
            else if (rhythmStepsPerBeat % 2 == 0) {
                return beepbox.Config.partsPerBeat / 2;
            }
            return beepbox.Config.partsPerBeat;
        }
        _getMinDivision() {
            return beepbox.Config.partsPerBeat / beepbox.Config.rhythms[this._doc.song.rhythm].stepsPerBeat;
        }
        _snapToMinDivision(input) {
            const minDivision = this._getMinDivision();
            return Math.floor(input / minDivision) * minDivision;
        }
        _updateCursorStatus() {
            this._cursor = new PatternCursor();
            if (this._mouseX < 0 || this._mouseX > this._editorWidth || this._mouseY < 0 || this._mouseY > this._editorHeight)
                return;
            const minDivision = this._getMinDivision();
            const exactPart = this._mouseX / this._partWidth;
            this._cursor.part =
                Math.floor(Math.max(0, Math.min(this._doc.song.beatsPerBar * beepbox.Config.partsPerBeat - minDivision, exactPart))
                    / minDivision) * minDivision;
            if (this._pattern != null) {
                for (const note of this._pattern.notes) {
                    if (note.end <= exactPart) {
                        this._cursor.prevNote = note;
                        this._cursor.curIndex++;
                    }
                    else if (note.start <= exactPart && note.end > exactPart) {
                        this._cursor.curNote = note;
                    }
                    else if (note.start > exactPart) {
                        this._cursor.nextNote = note;
                        break;
                    }
                }
            }
            let mousePitch = this._findMousePitch(this._mouseY);
            if (this._cursor.curNote != null) {
                this._cursor.start = this._cursor.curNote.start;
                this._cursor.end = this._cursor.curNote.end;
                this._cursor.pins = this._cursor.curNote.pins;
                let interval = 0;
                let error = 0;
                let prevPin;
                let nextPin = this._cursor.curNote.pins[0];
                for (let j = 1; j < this._cursor.curNote.pins.length; j++) {
                    prevPin = nextPin;
                    nextPin = this._cursor.curNote.pins[j];
                    const leftSide = this._partWidth * (this._cursor.curNote.start + prevPin.time);
                    const rightSide = this._partWidth * (this._cursor.curNote.start + nextPin.time);
                    if (this._mouseX > rightSide)
                        continue;
                    if (this._mouseX < leftSide)
                        throw new Error();
                    const intervalRatio = (this._mouseX - leftSide) / (rightSide - leftSide);
                    const arc = Math.sqrt(1.0 / Math.sqrt(4.0) - Math.pow(intervalRatio - 0.5, 2.0)) - 0.5;
                    const bendHeight = Math.abs(nextPin.interval - prevPin.interval);
                    interval = prevPin.interval * (1.0 - intervalRatio) + nextPin.interval * intervalRatio;
                    error = arc * bendHeight + 0.95;
                    break;
                }
                let minInterval = Number.MAX_VALUE;
                let maxInterval = -Number.MAX_VALUE;
                let bestDistance = Number.MAX_VALUE;
                for (const pin of this._cursor.curNote.pins) {
                    if (minInterval > pin.interval)
                        minInterval = pin.interval;
                    if (maxInterval < pin.interval)
                        maxInterval = pin.interval;
                    const pinDistance = Math.abs(this._cursor.curNote.start + pin.time - this._mouseX / this._partWidth);
                    if (bestDistance > pinDistance) {
                        bestDistance = pinDistance;
                        this._cursor.nearPinIndex = this._cursor.curNote.pins.indexOf(pin);
                    }
                }
                mousePitch -= interval;
                this._cursor.pitch = this._snapToPitch(mousePitch, -minInterval, (this._doc.song.getChannelIsNoise(this._doc.channel) ? beepbox.Config.drumCount - 1 : beepbox.Config.maxPitch) - maxInterval);
                if (!this._doc.song.getChannelIsNoise(this._doc.channel)) {
                    let nearest = error;
                    for (let i = 0; i < this._cursor.curNote.pitches.length; i++) {
                        const distance = Math.abs(this._cursor.curNote.pitches[i] - mousePitch + 0.5);
                        if (distance > nearest)
                            continue;
                        nearest = distance;
                        this._cursor.pitch = this._cursor.curNote.pitches[i];
                    }
                }
                for (let i = 0; i < this._cursor.curNote.pitches.length; i++) {
                    if (this._cursor.curNote.pitches[i] == this._cursor.pitch) {
                        this._cursor.pitchIndex = i;
                        break;
                    }
                }
            }
            else {
                this._cursor.pitch = this._snapToPitch(mousePitch, 0, beepbox.Config.maxPitch);
                const defaultLength = this._copiedPins[this._copiedPins.length - 1].time;
                const fullBeats = Math.floor(this._cursor.part / beepbox.Config.partsPerBeat);
                const maxDivision = this._getMaxDivision();
                const modMouse = this._cursor.part % beepbox.Config.partsPerBeat;
                if (defaultLength == 1) {
                    this._cursor.start = this._cursor.part;
                }
                else if (defaultLength > beepbox.Config.partsPerBeat) {
                    this._cursor.start = fullBeats * beepbox.Config.partsPerBeat;
                }
                else if (defaultLength == beepbox.Config.partsPerBeat) {
                    this._cursor.start = fullBeats * beepbox.Config.partsPerBeat;
                    if (maxDivision < beepbox.Config.partsPerBeat && modMouse > maxDivision) {
                        this._cursor.start += Math.floor(modMouse / maxDivision) * maxDivision;
                    }
                }
                else {
                    this._cursor.start = fullBeats * beepbox.Config.partsPerBeat;
                    let division = beepbox.Config.partsPerBeat % defaultLength == 0 ? defaultLength : Math.min(defaultLength, maxDivision);
                    while (division < maxDivision && beepbox.Config.partsPerBeat % division != 0) {
                        division++;
                    }
                    this._cursor.start += Math.floor(modMouse / division) * division;
                }
                this._cursor.end = this._cursor.start + defaultLength;
                let forceStart = 0;
                let forceEnd = this._doc.song.beatsPerBar * beepbox.Config.partsPerBeat;
                if (this._cursor.prevNote != null) {
                    forceStart = this._cursor.prevNote.end;
                }
                if (this._cursor.nextNote != null) {
                    forceEnd = this._cursor.nextNote.start;
                }
                if (this._cursor.start < forceStart) {
                    this._cursor.start = forceStart;
                    this._cursor.end = this._cursor.start + defaultLength;
                    if (this._cursor.end > forceEnd) {
                        this._cursor.end = forceEnd;
                    }
                }
                else if (this._cursor.end > forceEnd) {
                    this._cursor.end = forceEnd;
                    this._cursor.start = this._cursor.end - defaultLength;
                    if (this._cursor.start < forceStart) {
                        this._cursor.start = forceStart;
                    }
                }
                if (this._cursor.end - this._cursor.start == defaultLength) {
                    this._cursor.pins = this._copiedPins;
                }
                else {
                    this._cursor.pins = [];
                    for (const oldPin of this._copiedPins) {
                        if (oldPin.time <= this._cursor.end - this._cursor.start) {
                            this._cursor.pins.push(beepbox.makeNotePin(0, oldPin.time, oldPin.volume));
                            if (oldPin.time == this._cursor.end - this._cursor.start)
                                break;
                        }
                        else {
                            this._cursor.pins.push(beepbox.makeNotePin(0, this._cursor.end - this._cursor.start, oldPin.volume));
                            break;
                        }
                    }
                }
            }
            this._cursor.valid = true;
        }
        _findMousePitch(pixelY) {
            return Math.max(0, Math.min(this._pitchCount - 1, this._pitchCount - (pixelY / this._pitchHeight))) + this._octaveOffset;
        }
        _snapToPitch(guess, min, max) {
            if (guess < min)
                guess = min;
            if (guess > max)
                guess = max;
            const scale = beepbox.Config.scales[this._doc.song.scale].flags;
            if (scale[Math.floor(guess) % 12] || this._doc.song.getChannelIsNoise(this._doc.channel)) {
                return Math.floor(guess);
            }
            else {
                let topPitch = Math.floor(guess) + 1;
                let bottomPitch = Math.floor(guess) - 1;
                while (!scale[topPitch % 12]) {
                    topPitch++;
                }
                while (!scale[(bottomPitch) % 12]) {
                    bottomPitch--;
                }
                if (topPitch > max) {
                    if (bottomPitch < min) {
                        return min;
                    }
                    else {
                        return bottomPitch;
                    }
                }
                else if (bottomPitch < min) {
                    return topPitch;
                }
                let topRange = topPitch;
                let bottomRange = bottomPitch + 1;
                if (topPitch % 12 == 0 || topPitch % 12 == 7) {
                    topRange -= 0.5;
                }
                if (bottomPitch % 12 == 0 || bottomPitch % 12 == 7) {
                    bottomRange += 0.5;
                }
                return guess - bottomRange > topRange - guess ? topPitch : bottomPitch;
            }
        }
        _copyPins(note) {
            this._copiedPins = [];
            for (const oldPin of note.pins) {
                this._copiedPins.push(beepbox.makeNotePin(0, oldPin.time, oldPin.volume));
            }
            for (let i = 1; i < this._copiedPins.length - 1;) {
                if (this._copiedPins[i - 1].volume == this._copiedPins[i].volume &&
                    this._copiedPins[i].volume == this._copiedPins[i + 1].volume) {
                    this._copiedPins.splice(i, 1);
                }
                else {
                    i++;
                }
            }
            this._copiedPinChannels[this._doc.channel] = this._copiedPins;
        }
        _whenCursorPressed() {
            this._mouseDown = true;
            this._mouseXStart = this._mouseX;
            this._mouseYStart = this._mouseY;
            this._updateCursorStatus();
            this._updatePreview();
            this._dragChange = new beepbox.ChangeSequence();
            this._doc.setProspectiveChange(this._dragChange);
        }
        _whenCursorMoved() {
            let start;
            let end;
            const continuousState = this._doc.lastChangeWas(this._dragChange);
            if (this._mouseDown && this._cursor.valid && continuousState) {
                const minDivision = this._getMinDivision();
                if (!this._mouseDragging) {
                    const dx = this._mouseX - this._mouseXStart;
                    const dy = this._mouseY - this._mouseYStart;
                    if (Math.sqrt(dx * dx + dy * dy) > 5) {
                        this._mouseDragging = true;
                        this._mouseHorizontal = Math.abs(dx) >= Math.abs(dy);
                    }
                }
                if (this._mouseDragging) {
                    if (this._dragChange != null) {
                        this._dragChange.undo();
                    }
                    const currentPart = this._snapToMinDivision(this._mouseX / this._partWidth);
                    const sequence = new beepbox.ChangeSequence();
                    this._dragChange = sequence;
                    this._doc.setProspectiveChange(this._dragChange);
                    if (this._cursor.curNote == null) {
                        let backwards;
                        let directLength;
                        if (currentPart < this._cursor.start) {
                            backwards = true;
                            directLength = this._cursor.start - currentPart;
                        }
                        else {
                            backwards = false;
                            directLength = currentPart - this._cursor.start + minDivision;
                        }
                        let defaultLength = minDivision;
                        for (let i = minDivision; i <= this._doc.song.beatsPerBar * beepbox.Config.partsPerBeat; i += minDivision) {
                            if (minDivision == 1) {
                                if (i < 5) {
                                }
                                else if (i <= beepbox.Config.partsPerBeat / 2.0) {
                                    if (i % 3 != 0 && i % 4 != 0) {
                                        continue;
                                    }
                                }
                                else if (i <= beepbox.Config.partsPerBeat * 1.5) {
                                    if (i % 6 != 0 && i % 8 != 0) {
                                        continue;
                                    }
                                }
                                else if (i % beepbox.Config.partsPerBeat != 0) {
                                    continue;
                                }
                            }
                            else {
                                if (i >= 5 * minDivision &&
                                    i % beepbox.Config.partsPerBeat != 0 &&
                                    i != beepbox.Config.partsPerBeat * 3.0 / 4.0 &&
                                    i != beepbox.Config.partsPerBeat * 3.0 / 2.0 &&
                                    i != beepbox.Config.partsPerBeat * 4.0 / 3.0) {
                                    continue;
                                }
                            }
                            const blessedLength = i;
                            if (blessedLength == directLength) {
                                defaultLength = blessedLength;
                                break;
                            }
                            if (blessedLength < directLength) {
                                defaultLength = blessedLength;
                            }
                            if (blessedLength > directLength) {
                                if (defaultLength < directLength - minDivision) {
                                    defaultLength = blessedLength;
                                }
                                break;
                            }
                        }
                        if (backwards) {
                            end = this._cursor.start;
                            start = end - defaultLength;
                        }
                        else {
                            start = this._cursor.start;
                            end = start + defaultLength;
                        }
                        if (start < 0)
                            start = 0;
                        if (end > this._doc.song.beatsPerBar * beepbox.Config.partsPerBeat)
                            end = this._doc.song.beatsPerBar * beepbox.Config.partsPerBeat;
                        if (start < end) {
                            sequence.append(new beepbox.ChangeEnsurePatternExists(this._doc, this._doc.channel, this._doc.bar));
                            const pattern = this._doc.getCurrentPattern();
                            if (pattern == null)
                                throw new Error();
                            sequence.append(new beepbox.ChangeNoteTruncate(this._doc, pattern, start, end));
                            let i;
                            for (i = 0; i < pattern.notes.length; i++) {
                                if (pattern.notes[i].start >= end)
                                    break;
                            }
                            const theNote = new beepbox.Note(this._cursor.pitch, start, end, 3, this._doc.song.getChannelIsNoise(this._doc.channel));
                            sequence.append(new beepbox.ChangeNoteAdded(this._doc, pattern, theNote, i));
                            this._copyPins(theNote);
                            this._dragTime = backwards ? start : end;
                            this._dragPitch = this._cursor.pitch;
                            this._dragVolume = theNote.pins[backwards ? 0 : 1].volume;
                            this._dragVisible = true;
                        }
                        this._pattern = this._doc.getCurrentPattern();
                    }
                    else if (this._mouseHorizontal) {
                        const shift = (this._mouseX - this._mouseXStart) / this._partWidth;
                        const shiftedPin = this._cursor.curNote.pins[this._cursor.nearPinIndex];
                        let shiftedTime = Math.round((this._cursor.curNote.start + shiftedPin.time + shift) / minDivision) * minDivision;
                        if (shiftedTime < 0)
                            shiftedTime = 0;
                        if (shiftedTime > this._doc.song.beatsPerBar * beepbox.Config.partsPerBeat)
                            shiftedTime = this._doc.song.beatsPerBar * beepbox.Config.partsPerBeat;
                        if (this._pattern == null)
                            throw new Error();
                        if (shiftedTime <= this._cursor.curNote.start && this._cursor.nearPinIndex == this._cursor.curNote.pins.length - 1 ||
                            shiftedTime >= this._cursor.curNote.end && this._cursor.nearPinIndex == 0) {
                            sequence.append(new beepbox.ChangeNoteAdded(this._doc, this._pattern, this._cursor.curNote, this._cursor.curIndex, true));
                            this._dragVisible = false;
                        }
                        else {
                            start = Math.min(this._cursor.curNote.start, shiftedTime);
                            end = Math.max(this._cursor.curNote.end, shiftedTime);
                            this._dragTime = shiftedTime;
                            this._dragPitch = this._cursor.curNote.pitches[this._cursor.pitchIndex == -1 ? 0 : this._cursor.pitchIndex] + this._cursor.curNote.pins[this._cursor.nearPinIndex].interval;
                            this._dragVolume = this._cursor.curNote.pins[this._cursor.nearPinIndex].volume;
                            this._dragVisible = true;
                            sequence.append(new beepbox.ChangeNoteTruncate(this._doc, this._pattern, start, end, this._cursor.curNote));
                            sequence.append(new beepbox.ChangePinTime(this._doc, this._cursor.curNote, this._cursor.nearPinIndex, shiftedTime));
                            this._copyPins(this._cursor.curNote);
                        }
                    }
                    else if (this._cursor.pitchIndex == -1) {
                        const bendPart = Math.max(this._cursor.curNote.start, Math.min(this._cursor.curNote.end, Math.round(this._mouseX / (this._partWidth * minDivision)) * minDivision)) - this._cursor.curNote.start;
                        let prevPin;
                        let nextPin = this._cursor.curNote.pins[0];
                        let bendVolume = 0;
                        let bendInterval = 0;
                        for (let i = 1; i < this._cursor.curNote.pins.length; i++) {
                            prevPin = nextPin;
                            nextPin = this._cursor.curNote.pins[i];
                            if (bendPart > nextPin.time)
                                continue;
                            if (bendPart < prevPin.time)
                                throw new Error();
                            const volumeRatio = (bendPart - prevPin.time) / (nextPin.time - prevPin.time);
                            bendVolume = Math.round(prevPin.volume * (1.0 - volumeRatio) + nextPin.volume * volumeRatio + ((this._mouseYStart - this._mouseY) / 25.0));
                            if (bendVolume < 0)
                                bendVolume = 0;
                            if (bendVolume > 3)
                                bendVolume = 3;
                            bendInterval = this._snapToPitch(prevPin.interval * (1.0 - volumeRatio) + nextPin.interval * volumeRatio + this._cursor.curNote.pitches[0], 0, beepbox.Config.maxPitch) - this._cursor.curNote.pitches[0];
                            break;
                        }
                        this._dragTime = this._cursor.curNote.start + bendPart;
                        this._dragPitch = this._cursor.curNote.pitches[this._cursor.pitchIndex == -1 ? 0 : this._cursor.pitchIndex] + bendInterval;
                        this._dragVolume = bendVolume;
                        this._dragVisible = true;
                        sequence.append(new beepbox.ChangeVolumeBend(this._doc, this._cursor.curNote, bendPart, bendVolume, bendInterval));
                        this._copyPins(this._cursor.curNote);
                    }
                    else {
                        this._dragVolume = this._cursor.curNote.pins[this._cursor.nearPinIndex].volume;
                        if (this._pattern == null)
                            throw new Error();
                        let bendStart;
                        let bendEnd;
                        if (this._mouseX >= this._mouseXStart) {
                            bendStart = Math.max(this._cursor.curNote.start, this._cursor.part);
                            bendEnd = currentPart + minDivision;
                        }
                        else {
                            bendStart = Math.min(this._cursor.curNote.end, this._cursor.part + minDivision);
                            bendEnd = currentPart;
                        }
                        if (bendEnd < 0)
                            bendEnd = 0;
                        if (bendEnd > this._doc.song.beatsPerBar * beepbox.Config.partsPerBeat)
                            bendEnd = this._doc.song.beatsPerBar * beepbox.Config.partsPerBeat;
                        if (bendEnd > this._cursor.curNote.end) {
                            sequence.append(new beepbox.ChangeNoteTruncate(this._doc, this._pattern, this._cursor.curNote.start, bendEnd, this._cursor.curNote));
                        }
                        if (bendEnd < this._cursor.curNote.start) {
                            sequence.append(new beepbox.ChangeNoteTruncate(this._doc, this._pattern, bendEnd, this._cursor.curNote.end, this._cursor.curNote));
                        }
                        let minPitch = Number.MAX_VALUE;
                        let maxPitch = -Number.MAX_VALUE;
                        for (const pitch of this._cursor.curNote.pitches) {
                            if (minPitch > pitch)
                                minPitch = pitch;
                            if (maxPitch < pitch)
                                maxPitch = pitch;
                        }
                        minPitch -= this._cursor.curNote.pitches[this._cursor.pitchIndex];
                        maxPitch -= this._cursor.curNote.pitches[this._cursor.pitchIndex];
                        const bendTo = this._snapToPitch(this._findMousePitch(this._mouseY), -minPitch, (this._doc.song.getChannelIsNoise(this._doc.channel) ? beepbox.Config.drumCount - 1 : beepbox.Config.maxPitch) - maxPitch);
                        sequence.append(new beepbox.ChangePitchBend(this._doc, this._cursor.curNote, bendStart, bendEnd, bendTo, this._cursor.pitchIndex));
                        this._copyPins(this._cursor.curNote);
                        this._dragTime = bendEnd;
                        this._dragPitch = bendTo;
                        this._dragVisible = true;
                    }
                }
            }
            else {
                this._updateCursorStatus();
                this._updatePreview();
            }
        }
        _updatePreview() {
            if (this._usingTouch) {
                if (!this._mouseDown || !this._cursor.valid || !this._mouseDragging || !this._dragVisible) {
                    this._svgPreview.setAttribute("visibility", "hidden");
                }
                else {
                    this._svgPreview.setAttribute("visibility", "visible");
                    const x = this._partWidth * this._dragTime;
                    const y = this._pitchToPixelHeight(this._dragPitch - this._octaveOffset);
                    const radius = this._pitchHeight / 2;
                    const width = 80;
                    const height = 60;
                    let pathString = "";
                    pathString += "M " + beepbox.prettyNumber(x) + " " + beepbox.prettyNumber(y - radius * (this._dragVolume / 3.0)) + " ";
                    pathString += "L " + beepbox.prettyNumber(x) + " " + beepbox.prettyNumber(y - radius * (this._dragVolume / 3.0) - height) + " ";
                    pathString += "M " + beepbox.prettyNumber(x) + " " + beepbox.prettyNumber(y + radius * (this._dragVolume / 3.0)) + " ";
                    pathString += "L " + beepbox.prettyNumber(x) + " " + beepbox.prettyNumber(y + radius * (this._dragVolume / 3.0) + height) + " ";
                    pathString += "M " + beepbox.prettyNumber(x) + " " + beepbox.prettyNumber(y - radius * (this._dragVolume / 3.0)) + " ";
                    pathString += "L " + beepbox.prettyNumber(x + width) + " " + beepbox.prettyNumber(y - radius * (this._dragVolume / 3.0)) + " ";
                    pathString += "M " + beepbox.prettyNumber(x) + " " + beepbox.prettyNumber(y + radius * (this._dragVolume / 3.0)) + " ";
                    pathString += "L " + beepbox.prettyNumber(x + width) + " " + beepbox.prettyNumber(y + radius * (this._dragVolume / 3.0)) + " ";
                    pathString += "M " + beepbox.prettyNumber(x) + " " + beepbox.prettyNumber(y - radius * (this._dragVolume / 3.0)) + " ";
                    pathString += "L " + beepbox.prettyNumber(x - width) + " " + beepbox.prettyNumber(y - radius * (this._dragVolume / 3.0)) + " ";
                    pathString += "M " + beepbox.prettyNumber(x) + " " + beepbox.prettyNumber(y + radius * (this._dragVolume / 3.0)) + " ";
                    pathString += "L " + beepbox.prettyNumber(x - width) + " " + beepbox.prettyNumber(y + radius * (this._dragVolume / 3.0)) + " ";
                    this._svgPreview.setAttribute("d", pathString);
                }
            }
            else {
                if (!this._mouseOver || this._mouseDown || !this._cursor.valid) {
                    this._svgPreview.setAttribute("visibility", "hidden");
                }
                else {
                    this._svgPreview.setAttribute("visibility", "visible");
                    this._drawNote(this._svgPreview, this._cursor.pitch, this._cursor.start, this._cursor.pins, this._pitchHeight / 2 + 1, true, this._octaveOffset);
                }
            }
        }
        _drawNote(svgElement, pitch, start, pins, radius, showVolume, offset) {
            const totalWidth = this._partWidth * (pins[pins.length - 1].time + pins[0].time);
            const endOffset = 0.5 * Math.min(2, totalWidth - 1);
            let nextPin = pins[0];
            let pathString = "M " + beepbox.prettyNumber(this._partWidth * (start + nextPin.time) + endOffset) + " " + beepbox.prettyNumber(this._pitchToPixelHeight(pitch - offset) + radius * (showVolume ? nextPin.volume / 3.0 : 1.0)) + " ";
            for (let i = 1; i < pins.length; i++) {
                let prevPin = nextPin;
                nextPin = pins[i];
                let prevSide = this._partWidth * (start + prevPin.time) + (i == 1 ? endOffset : 0);
                let nextSide = this._partWidth * (start + nextPin.time) - (i == pins.length - 1 ? endOffset : 0);
                let prevHeight = this._pitchToPixelHeight(pitch + prevPin.interval - offset);
                let nextHeight = this._pitchToPixelHeight(pitch + nextPin.interval - offset);
                let prevVolume = showVolume ? prevPin.volume / 3.0 : 1.0;
                let nextVolume = showVolume ? nextPin.volume / 3.0 : 1.0;
                pathString += "L " + beepbox.prettyNumber(prevSide) + " " + beepbox.prettyNumber(prevHeight - radius * prevVolume) + " ";
                if (prevPin.interval > nextPin.interval)
                    pathString += "L " + beepbox.prettyNumber(prevSide + 1) + " " + beepbox.prettyNumber(prevHeight - radius * prevVolume) + " ";
                if (prevPin.interval < nextPin.interval)
                    pathString += "L " + beepbox.prettyNumber(nextSide - 1) + " " + beepbox.prettyNumber(nextHeight - radius * nextVolume) + " ";
                pathString += "L " + beepbox.prettyNumber(nextSide) + " " + beepbox.prettyNumber(nextHeight - radius * nextVolume) + " ";
            }
            for (let i = pins.length - 2; i >= 0; i--) {
                let prevPin = nextPin;
                nextPin = pins[i];
                let prevSide = this._partWidth * (start + prevPin.time) - (i == pins.length - 2 ? endOffset : 0);
                let nextSide = this._partWidth * (start + nextPin.time) + (i == 0 ? endOffset : 0);
                let prevHeight = this._pitchToPixelHeight(pitch + prevPin.interval - offset);
                let nextHeight = this._pitchToPixelHeight(pitch + nextPin.interval - offset);
                let prevVolume = showVolume ? prevPin.volume / 3.0 : 1.0;
                let nextVolume = showVolume ? nextPin.volume / 3.0 : 1.0;
                pathString += "L " + beepbox.prettyNumber(prevSide) + " " + beepbox.prettyNumber(prevHeight + radius * prevVolume) + " ";
                if (prevPin.interval < nextPin.interval)
                    pathString += "L " + beepbox.prettyNumber(prevSide - 1) + " " + beepbox.prettyNumber(prevHeight + radius * prevVolume) + " ";
                if (prevPin.interval > nextPin.interval)
                    pathString += "L " + beepbox.prettyNumber(nextSide + 1) + " " + beepbox.prettyNumber(nextHeight + radius * nextVolume) + " ";
                pathString += "L " + beepbox.prettyNumber(nextSide) + " " + beepbox.prettyNumber(nextHeight + radius * nextVolume) + " ";
            }
            pathString += "z";
            svgElement.setAttribute("d", pathString);
        }
        _pitchToPixelHeight(pitch) {
            return this._pitchHeight * (this._pitchCount - (pitch) - 0.5);
        }
    }
    beepbox.PatternEditor = PatternEditor;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class Box {
        constructor(channel, x, y, color) {
            this._text = document.createTextNode("1");
            this._label = beepbox.SVG.text({ x: 16, y: 23, "font-family": "sans-serif", "font-size": 20, "text-anchor": "middle", "font-weight": "bold", fill: "red" }, this._text);
            this._rect = beepbox.SVG.rect({ width: 30, height: 30, x: 1, y: 1 });
            this.container = beepbox.SVG.svg(this._rect, this._label);
            this._renderedIndex = 1;
            this._renderedDim = true;
            this._renderedSelected = false;
            this._renderedColor = "";
            this.container.setAttribute("x", "" + (x * 32));
            this.container.setAttribute("y", "" + (y * 32));
            this._rect.setAttribute("fill", "#444444");
            this._label.setAttribute("fill", color);
        }
        setSquashed(squashed, y) {
            if (squashed) {
                this.container.setAttribute("y", "" + (y * 27));
                this._rect.setAttribute("height", "" + 25);
                this._label.setAttribute("y", "" + 21);
            }
            else {
                this.container.setAttribute("y", "" + (y * 32));
                this._rect.setAttribute("height", "" + 30);
                this._label.setAttribute("y", "" + 23);
            }
        }
        setIndex(index, dim, selected, y, color) {
            if (this._renderedIndex != index) {
                if (!this._renderedSelected && ((index == 0) != (this._renderedIndex == 0))) {
                    this._rect.setAttribute("fill", (index == 0) ? "none" : "#444444");
                }
                this._renderedIndex = index;
                this._text.data = "" + index;
            }
            if (this._renderedDim != dim || this._renderedColor != color) {
                this._renderedDim = dim;
                if (selected) {
                    this._label.setAttribute("fill", "#000000");
                }
                else {
                    this._label.setAttribute("fill", color);
                }
            }
            if (this._renderedSelected != selected || this._renderedColor != color) {
                this._renderedSelected = selected;
                if (selected) {
                    this._rect.setAttribute("fill", color);
                    this._label.setAttribute("fill", "#000000");
                }
                else {
                    this._rect.setAttribute("fill", (this._renderedIndex == 0) ? "#000000" : "#444444");
                    this._label.setAttribute("fill", color);
                }
            }
            this._renderedColor = color;
        }
    }
    class TrackEditor {
        constructor(_doc) {
            this._doc = _doc;
            this._barWidth = 32;
            this._boxContainer = beepbox.SVG.g();
            this._playhead = beepbox.SVG.rect({ fill: "white", x: 0, y: 0, width: 4, height: 128 });
            this._boxHighlight = beepbox.SVG.rect({ fill: "none", stroke: "white", "stroke-width": 2, "pointer-events": "none", x: 1, y: 1, width: 30, height: 30 });
            this._upHighlight = beepbox.SVG.path({ fill: "black", stroke: "black", "stroke-width": 1, "pointer-events": "none" });
            this._downHighlight = beepbox.SVG.path({ fill: "black", stroke: "black", "stroke-width": 1, "pointer-events": "none" });
            this._selectionRect = beepbox.SVG.rect({ fill: "rgba(255,255,255,0.2)", stroke: "white", "stroke-width": 2, "stroke-dasharray": "5, 3", "pointer-events": "none", visibility: "hidden", x: 1, y: 1, width: 62, height: 62 });
            this._svg = beepbox.SVG.svg({ style: "background-color: #000000; position: absolute;", height: 128 }, this._boxContainer, this._selectionRect, this._boxHighlight, this._upHighlight, this._downHighlight, this._playhead);
            this._select = beepbox.HTML.select({ className: "trackSelectBox", style: "width: 32px; height: 32px; background: none; border: none; appearance: none; color: transparent; position: absolute; touch-action: none;" });
            this.container = beepbox.HTML.div({ class: "noSelection", style: "height: 128px; position: relative; overflow:hidden;" }, this._svg, this._select);
            this._grid = [];
            this._mouseX = 0;
            this._mouseY = 0;
            this._mouseStartBar = 0;
            this._mouseStartChannel = 0;
            this._mouseBar = 0;
            this._mouseChannel = 0;
            this._mouseOver = false;
            this._mousePressed = false;
            this._mouseDragging = false;
            this._digits = "";
            this._editorHeight = 128;
            this._channelHeight = 32;
            this._boxSelectionBar = 0;
            this._boxSelectionChannel = 0;
            this._boxSelectionWidth = 1;
            this._boxSelectionHeight = 1;
            this._renderedChannelCount = 0;
            this._renderedBarCount = 0;
            this._renderedPatternCount = 0;
            this._renderedPlayhead = -1;
            this._renderedSquashed = false;
            this._touchMode = beepbox.isMobile;
            this._changeTranspose = null;
            this._whenSelectChanged = () => {
                this._setPattern(this._select.selectedIndex);
            };
            this._animatePlayhead = (timestamp) => {
                const playhead = (this._barWidth * this._doc.synth.playhead - 2);
                if (this._renderedPlayhead != playhead) {
                    this._renderedPlayhead = playhead;
                    this._playhead.setAttribute("x", "" + playhead);
                }
                window.requestAnimationFrame(this._animatePlayhead);
            };
            this._whenSelectPressed = (event) => {
                this._mousePressed = true;
                this._mouseDragging = true;
                this._updateSelectPos(event);
                this._mouseStartBar = this._mouseBar;
                this._mouseStartChannel = this._mouseChannel;
            };
            this._whenSelectMoved = (event) => {
                this._updateSelectPos(event);
                if (this._mouseStartBar != this._mouseBar || this._mouseStartChannel != this._mouseChannel) {
                    event.preventDefault();
                }
                if (this._mousePressed)
                    this._dragBoxSelection();
                this._updatePreview();
            };
            this._whenSelectReleased = (event) => {
                this._mousePressed = false;
                this._mouseDragging = false;
                this._updatePreview();
            };
            this._whenMouseOver = (event) => {
                if (this._mouseOver)
                    return;
                this._mouseOver = true;
            };
            this._whenMouseOut = (event) => {
                if (!this._mouseOver)
                    return;
                this._mouseOver = false;
            };
            this._whenMousePressed = (event) => {
                event.preventDefault();
                this._mousePressed = true;
                this._mouseDragging = false;
                this._updateMousePos(event);
                this._mouseStartBar = this._mouseBar;
                this._mouseStartChannel = this._mouseChannel;
                if (this._doc.channel != this._mouseChannel || this._doc.bar != this._mouseBar) {
                    this._setChannelBar(this._mouseChannel, this._mouseBar);
                    this._mouseDragging = true;
                }
                this._resetBoxSelection();
            };
            this._whenMouseMoved = (event) => {
                this._updateMousePos(event);
                if (this._mousePressed) {
                    if (this._mouseStartBar != this._mouseBar || this._mouseStartChannel != this._mouseChannel) {
                        this._mouseDragging = true;
                    }
                    this._dragBoxSelection();
                }
                this._updatePreview();
            };
            this._whenMouseReleased = (event) => {
                if (this._mousePressed && !this._mouseDragging) {
                    if (this._doc.channel == this._mouseChannel && this._doc.bar == this._mouseBar) {
                        const up = (this._mouseY % this._channelHeight) < this._channelHeight / 2;
                        const patternCount = this._doc.song.patternsPerChannel;
                        this._setPattern((this._doc.song.channels[this._mouseChannel].bars[this._mouseBar] + (up ? 1 : patternCount)) % (patternCount + 1));
                    }
                }
                this._mousePressed = false;
                this._mouseDragging = false;
                this._updatePreview();
            };
            window.requestAnimationFrame(this._animatePlayhead);
            this._svg.addEventListener("mousedown", this._whenMousePressed);
            document.addEventListener("mousemove", this._whenMouseMoved);
            document.addEventListener("mouseup", this._whenMouseReleased);
            this._svg.addEventListener("mouseover", this._whenMouseOver);
            this._svg.addEventListener("mouseout", this._whenMouseOut);
            this._select.addEventListener("change", this._whenSelectChanged);
            this._select.addEventListener("touchstart", this._whenSelectPressed);
            this._select.addEventListener("touchmove", this._whenSelectMoved);
            this._select.addEventListener("touchend", this._whenSelectReleased);
            this._select.addEventListener("touchcancel", this._whenSelectReleased);
            let determinedCursorType = false;
            document.addEventListener("mousedown", () => {
                if (!determinedCursorType) {
                    this._touchMode = false;
                    this._updatePreview();
                }
                determinedCursorType = true;
            }, true);
            document.addEventListener("touchstart", () => {
                if (!determinedCursorType) {
                    this._touchMode = true;
                    this._updatePreview();
                }
                determinedCursorType = true;
            }, true);
        }
        _selectionUpdated() {
            this._doc.notifier.changed();
            this._digits = "";
            this._doc.forgetLastChange();
        }
        _setChannelBar(channel, bar) {
            new beepbox.ChangeChannelBar(this._doc, channel, bar);
            this._selectionUpdated();
        }
        _setPattern(pattern) {
            this._doc.record(new beepbox.ChangePatternNumbers(this._doc, pattern, this._boxSelectionBar, this._boxSelectionChannel, this._boxSelectionWidth, this._boxSelectionHeight));
        }
        onKeyPressed(event) {
            switch (event.keyCode) {
                case 38:
                    this._setChannelBar((this._doc.channel - 1 + this._doc.song.getChannelCount()) % this._doc.song.getChannelCount(), this._doc.bar);
                    this._resetBoxSelection();
                    event.preventDefault();
                    break;
                case 40:
                    this._setChannelBar((this._doc.channel + 1) % this._doc.song.getChannelCount(), this._doc.bar);
                    this._resetBoxSelection();
                    event.preventDefault();
                    break;
                case 37:
                    this._setChannelBar(this._doc.channel, (this._doc.bar + this._doc.song.barCount - 1) % this._doc.song.barCount);
                    this._resetBoxSelection();
                    event.preventDefault();
                    break;
                case 39:
                    this._setChannelBar(this._doc.channel, (this._doc.bar + 1) % this._doc.song.barCount);
                    this._resetBoxSelection();
                    event.preventDefault();
                    break;
                case 48:
                    this._nextDigit("0");
                    event.preventDefault();
                    break;
                case 49:
                    this._nextDigit("1");
                    event.preventDefault();
                    break;
                case 50:
                    this._nextDigit("2");
                    event.preventDefault();
                    break;
                case 51:
                    this._nextDigit("3");
                    event.preventDefault();
                    break;
                case 52:
                    this._nextDigit("4");
                    event.preventDefault();
                    break;
                case 53:
                    this._nextDigit("5");
                    event.preventDefault();
                    break;
                case 54:
                    this._nextDigit("6");
                    event.preventDefault();
                    break;
                case 55:
                    this._nextDigit("7");
                    event.preventDefault();
                    break;
                case 56:
                    this._nextDigit("8");
                    event.preventDefault();
                    break;
                case 57:
                    this._nextDigit("9");
                    event.preventDefault();
                    break;
                default:
                    this._digits = "";
                    break;
            }
        }
        insertBars() {
            this._doc.record(new beepbox.ChangeInsertBars(this._doc, this._boxSelectionBar + this._boxSelectionWidth, this._boxSelectionWidth), "jump");
            this._boxSelectionBar += this._boxSelectionWidth;
        }
        deleteBars() {
            this._doc.record(new beepbox.ChangeDeleteBars(this._doc, this._boxSelectionBar, this._boxSelectionWidth), "jump");
            this._boxSelectionBar = Math.max(0, this._boxSelectionBar - this._boxSelectionWidth);
        }
        *_eachSelectedChannel() {
            for (let channel = this._boxSelectionChannel; channel < this._boxSelectionChannel + this._boxSelectionHeight; channel++) {
                yield channel;
            }
        }
        *_eachSelectedBar() {
            for (let bar = this._boxSelectionBar; bar < this._boxSelectionBar + this._boxSelectionWidth; bar++) {
                yield bar;
            }
        }
        *_eachUnselectedBar() {
            for (let bar = 0; bar < this._doc.song.barCount; bar++) {
                if (bar < this._boxSelectionBar || bar >= this._boxSelectionBar + this._boxSelectionWidth) {
                    yield bar;
                }
            }
        }
        *_eachSelectedPattern(channel) {
            const handledPatterns = {};
            for (const bar of this._eachSelectedBar()) {
                const currentPatternIndex = this._doc.song.channels[channel].bars[bar];
                if (currentPatternIndex == 0)
                    continue;
                if (handledPatterns[String(currentPatternIndex)])
                    continue;
                handledPatterns[String(currentPatternIndex)] = true;
                const pattern = this._doc.song.getPattern(channel, bar);
                if (pattern == null)
                    throw new Error();
                yield pattern;
            }
        }
        _patternIndexIsUnused(channel, patternIndex) {
            for (let i = 0; i < this._doc.song.barCount; i++) {
                if (this._doc.song.channels[channel].bars[i] == patternIndex) {
                    return false;
                }
            }
            return true;
        }
        copy() {
            const channels = [];
            for (const channel of this._eachSelectedChannel()) {
                const patterns = {};
                const bars = [];
                for (const bar of this._eachSelectedBar()) {
                    const patternNumber = this._doc.song.channels[channel].bars[bar];
                    bars.push(patternNumber);
                    if (patterns[String(patternNumber)] == undefined) {
                        const pattern = this._doc.song.getPattern(channel, bar);
                        let instrument = 0;
                        let notes = [];
                        if (pattern != null) {
                            instrument = pattern.instrument;
                            notes = pattern.notes;
                        }
                        patterns[String(patternNumber)] = { "instrument": instrument, "notes": notes };
                    }
                }
                const channelCopy = {
                    "isNoise": this._doc.song.getChannelIsNoise(channel),
                    "patterns": patterns,
                    "bars": bars,
                };
                channels.push(channelCopy);
            }
            const selectionCopy = {
                "beatsPerBar": this._doc.song.beatsPerBar,
                "channels": channels,
            };
            window.localStorage.setItem("selectionCopy", JSON.stringify(selectionCopy));
        }
        pasteNotes() {
            const selectionCopy = JSON.parse(String(window.localStorage.getItem("selectionCopy")));
            if (selectionCopy == null)
                return;
            const channelCopies = selectionCopy["channels"] || [];
            const beatsPerBar = selectionCopy["beatsPerBar"] >>> 0;
            const group = new beepbox.ChangeGroup();
            const fillSelection = (this._boxSelectionWidth > 1 || this._boxSelectionHeight > 1);
            const pasteHeight = fillSelection ? this._boxSelectionHeight : Math.min(channelCopies.length, this._doc.song.getChannelCount() - this._boxSelectionChannel);
            for (let pasteChannel = 0; pasteChannel < pasteHeight; pasteChannel++) {
                const channelCopy = channelCopies[pasteChannel % channelCopies.length];
                const channel = this._boxSelectionChannel + pasteChannel;
                const isNoise = !!channelCopy["isNoise"];
                const patternCopies = channelCopy["patterns"] || {};
                const copiedBars = channelCopy["bars"] || [];
                if (copiedBars.length == 0)
                    continue;
                if (isNoise != this._doc.song.getChannelIsNoise(channel))
                    continue;
                const pasteWidth = fillSelection ? this._boxSelectionWidth : Math.min(copiedBars.length, this._doc.song.barCount - this._boxSelectionBar);
                if (!fillSelection && copiedBars.length == 1 && channelCopies.length == 1) {
                    const copiedPatternIndex = copiedBars[0] >>> 0;
                    const bar = this._boxSelectionBar;
                    const currentPatternIndex = this._doc.song.channels[channel].bars[bar];
                    if (copiedPatternIndex == 0 && currentPatternIndex == 0)
                        continue;
                    const patternCopy = patternCopies[String(copiedPatternIndex)];
                    const instrumentCopy = Math.min(patternCopy["instrument"] >>> 0, this._doc.song.instrumentsPerChannel - 1);
                    if (currentPatternIndex == 0) {
                        const existingPattern = this._doc.song.channels[channel].patterns[copiedPatternIndex - 1];
                        if (existingPattern != undefined &&
                            ((beepbox.comparePatternNotes(patternCopy["notes"], existingPattern.notes) && instrumentCopy == existingPattern.instrument) ||
                                this._patternIndexIsUnused(channel, copiedPatternIndex))) {
                            group.append(new beepbox.ChangePatternNumbers(this._doc, copiedPatternIndex, bar, channel, 1, 1));
                        }
                        else {
                            group.append(new beepbox.ChangeEnsurePatternExists(this._doc, channel, bar));
                        }
                    }
                    const pattern = this._doc.song.getPattern(channel, bar);
                    if (pattern == null)
                        throw new Error();
                    group.append(new beepbox.ChangePaste(this._doc, pattern, patternCopy["notes"], beatsPerBar));
                    group.append(new beepbox.ChangePatternInstrument(this._doc, instrumentCopy, pattern));
                }
                else {
                    for (let pasteBar = 0; pasteBar < pasteWidth; pasteBar++) {
                        const bar = this._boxSelectionBar + pasteBar;
                        const removedPattern = this._doc.song.channels[channel].bars[bar];
                        if (removedPattern != 0) {
                            group.append(new beepbox.ChangePatternNumbers(this._doc, 0, bar, channel, 1, 1));
                            if (this._patternIndexIsUnused(channel, removedPattern)) {
                                this._doc.song.channels[channel].patterns[removedPattern - 1].notes.length = 0;
                            }
                        }
                    }
                    const reusablePatterns = {};
                    for (let pasteBar = 0; pasteBar < pasteWidth; pasteBar++) {
                        const copiedPatternIndex = copiedBars[pasteBar % copiedBars.length] >>> 0;
                        if (copiedPatternIndex == 0)
                            continue;
                        const bar = this._boxSelectionBar + pasteBar;
                        if (reusablePatterns[String(copiedPatternIndex)] != undefined) {
                            group.append(new beepbox.ChangePatternNumbers(this._doc, reusablePatterns[String(copiedPatternIndex)], bar, channel, 1, 1));
                        }
                        else {
                            const patternCopy = patternCopies[String(copiedPatternIndex)];
                            const instrumentCopy = Math.min(patternCopy["instrument"] >>> 0, this._doc.song.instrumentsPerChannel - 1);
                            const existingPattern = this._doc.song.channels[channel].patterns[copiedPatternIndex - 1];
                            if (existingPattern != undefined &&
                                beepbox.comparePatternNotes(patternCopy["notes"], existingPattern.notes) &&
                                instrumentCopy == existingPattern.instrument) {
                                group.append(new beepbox.ChangePatternNumbers(this._doc, copiedPatternIndex, bar, channel, 1, 1));
                            }
                            else {
                                if (existingPattern != undefined && this._patternIndexIsUnused(channel, copiedPatternIndex)) {
                                    group.append(new beepbox.ChangePatternNumbers(this._doc, copiedPatternIndex, bar, channel, 1, 1));
                                }
                                else {
                                    group.append(new beepbox.ChangeEnsurePatternExists(this._doc, channel, bar));
                                }
                                const pattern = this._doc.song.getPattern(channel, bar);
                                if (pattern == null)
                                    throw new Error();
                                group.append(new beepbox.ChangePaste(this._doc, pattern, patternCopy["notes"], beatsPerBar));
                                group.append(new beepbox.ChangePatternInstrument(this._doc, instrumentCopy, pattern));
                            }
                            reusablePatterns[String(copiedPatternIndex)] = this._doc.song.channels[channel].bars[bar];
                        }
                    }
                }
            }
            this._doc.record(group);
        }
        pasteNumbers() {
            const selectionCopy = JSON.parse(String(window.localStorage.getItem("selectionCopy")));
            if (selectionCopy == null)
                return;
            const channelCopies = selectionCopy["channels"] || [];
            const group = new beepbox.ChangeGroup();
            const fillSelection = (this._boxSelectionWidth > 1 || this._boxSelectionHeight > 1);
            const pasteHeight = fillSelection ? this._boxSelectionHeight : Math.min(channelCopies.length, this._doc.song.getChannelCount() - this._boxSelectionChannel);
            for (let pasteChannel = 0; pasteChannel < pasteHeight; pasteChannel++) {
                const channelCopy = channelCopies[pasteChannel % channelCopies.length];
                const channel = this._boxSelectionChannel + pasteChannel;
                const copiedBars = channelCopy["bars"] || [];
                if (copiedBars.length == 0)
                    continue;
                const pasteWidth = fillSelection ? this._boxSelectionWidth : Math.min(copiedBars.length, this._doc.song.barCount - this._boxSelectionBar);
                for (let pasteBar = 0; pasteBar < pasteWidth; pasteBar++) {
                    const copiedPatternIndex = copiedBars[pasteBar % copiedBars.length] >>> 0;
                    const bar = this._boxSelectionBar + pasteBar;
                    if (copiedPatternIndex > this._doc.song.patternsPerChannel) {
                        group.append(new beepbox.ChangePatternsPerChannel(this._doc, copiedPatternIndex));
                    }
                    group.append(new beepbox.ChangePatternNumbers(this._doc, copiedPatternIndex, bar, channel, 1, 1));
                }
            }
            this._doc.record(group);
        }
        selectAll() {
            if (this._boxSelectionBar == 0 &&
                this._boxSelectionChannel == 0 &&
                this._boxSelectionWidth == this._doc.song.barCount &&
                this._boxSelectionHeight == this._doc.song.getChannelCount()) {
                this._resetBoxSelection();
            }
            else {
                this._boxSelectionBar = 0;
                this._boxSelectionChannel = 0;
                this._boxSelectionWidth = this._doc.song.barCount;
                this._boxSelectionHeight = this._doc.song.getChannelCount();
            }
            this._selectionUpdated();
        }
        selectChannel() {
            if (this._boxSelectionBar == 0 &&
                this._boxSelectionWidth == this._doc.song.barCount) {
                this._boxSelectionBar = this._doc.bar;
                this._boxSelectionWidth = 1;
            }
            else {
                this._boxSelectionBar = 0;
                this._boxSelectionWidth = this._doc.song.barCount;
            }
            this._selectionUpdated();
        }
        duplicatePatterns() {
            const group = new beepbox.ChangeGroup();
            for (const channel of this._eachSelectedChannel()) {
                const reusablePatterns = {};
                for (const bar of this._eachSelectedBar()) {
                    const currentPatternIndex = this._doc.song.channels[channel].bars[bar];
                    if (currentPatternIndex == 0)
                        continue;
                    if (reusablePatterns[String(currentPatternIndex)] == undefined) {
                        let isUsedElsewhere = false;
                        for (const bar2 of this._eachUnselectedBar()) {
                            if (this._doc.song.channels[channel].bars[bar2] == currentPatternIndex) {
                                isUsedElsewhere = true;
                                break;
                            }
                        }
                        if (isUsedElsewhere) {
                            const copiedPattern = this._doc.song.getPattern(channel, bar);
                            group.append(new beepbox.ChangePatternNumbers(this._doc, 0, bar, channel, 1, 1));
                            group.append(new beepbox.ChangeEnsurePatternExists(this._doc, channel, bar));
                            const newPattern = this._doc.song.getPattern(channel, bar);
                            if (newPattern == null)
                                throw new Error();
                            group.append(new beepbox.ChangePaste(this._doc, newPattern, copiedPattern.notes, this._doc.song.beatsPerBar));
                            group.append(new beepbox.ChangePatternInstrument(this._doc, copiedPattern.instrument, newPattern));
                            reusablePatterns[String(currentPatternIndex)] = this._doc.song.channels[channel].bars[bar];
                        }
                        else {
                            reusablePatterns[String(currentPatternIndex)] = currentPatternIndex;
                        }
                    }
                    group.append(new beepbox.ChangePatternNumbers(this._doc, reusablePatterns[String(currentPatternIndex)], bar, channel, 1, 1));
                }
            }
            this._doc.record(group);
        }
        forceRhythm() {
            const group = new beepbox.ChangeGroup();
            for (const channel of this._eachSelectedChannel()) {
                for (const pattern of this._eachSelectedPattern(channel)) {
                    group.append(new beepbox.ChangePatternRhythm(this._doc, pattern));
                }
            }
            this._doc.record(group);
        }
        forceScale() {
            const group = new beepbox.ChangeGroup();
            const scaleFlags = [true, false, false, false, false, false, false, false, false, false, false, false];
            for (const channel of this._eachSelectedChannel()) {
                if (this._doc.song.getChannelIsNoise(channel))
                    continue;
                for (const pattern of this._eachSelectedPattern(channel)) {
                    beepbox.unionOfUsedNotes(pattern, scaleFlags);
                }
            }
            const scaleMap = beepbox.generateScaleMap(scaleFlags, this._doc.song.scale);
            for (const channel of this._eachSelectedChannel()) {
                if (this._doc.song.getChannelIsNoise(channel))
                    continue;
                for (const pattern of this._eachSelectedPattern(channel)) {
                    group.append(new beepbox.ChangePatternScale(this._doc, pattern, scaleMap));
                }
            }
            this._doc.record(group);
        }
        transpose(upward, octave) {
            const canReplaceLastChange = this._doc.lastChangeWas(this._changeTranspose);
            const group = new beepbox.ChangeGroup();
            this._changeTranspose = group;
            for (const channel of this._eachSelectedChannel()) {
                for (const pattern of this._eachSelectedPattern(channel)) {
                    group.append(new beepbox.ChangeTranspose(this._doc, channel, pattern, upward, false, octave));
                }
            }
            this._doc.record(group, canReplaceLastChange ? "replace" : "push");
        }
        setInstrument(instrument) {
            const group = new beepbox.ChangeGroup();
            for (const channel of this._eachSelectedChannel()) {
                for (const pattern of this._eachSelectedPattern(channel)) {
                    group.append(new beepbox.ChangePatternInstrument(this._doc, instrument, pattern));
                }
            }
            this._doc.record(group);
        }
        _nextDigit(digit) {
            this._digits += digit;
            let parsed = parseInt(this._digits);
            if (parsed <= this._doc.song.patternsPerChannel) {
                this._setPattern(parsed);
                return;
            }
            this._digits = digit;
            parsed = parseInt(this._digits);
            if (parsed <= this._doc.song.patternsPerChannel) {
                this._setPattern(parsed);
                return;
            }
            this._digits = "";
        }
        _resetBoxSelection() {
            this._boxSelectionBar = this._doc.bar;
            this._boxSelectionChannel = this._doc.channel;
            this._boxSelectionWidth = 1;
            this._boxSelectionHeight = 1;
        }
        _dragBoxSelection() {
            this._boxSelectionBar = Math.min(this._mouseStartBar, this._mouseBar);
            this._boxSelectionChannel = Math.min(this._mouseStartChannel, this._mouseChannel);
            this._boxSelectionWidth = Math.abs(this._mouseStartBar - this._mouseBar) + 1;
            this._boxSelectionHeight = Math.abs(this._mouseStartChannel - this._mouseChannel) + 1;
            this._selectionUpdated();
        }
        _updateSelectPos(event) {
            const boundingRect = this._svg.getBoundingClientRect();
            this._mouseX = event.touches[0].clientX - boundingRect.left;
            this._mouseY = event.touches[0].clientY - boundingRect.top;
            if (isNaN(this._mouseX))
                this._mouseX = 0;
            if (isNaN(this._mouseY))
                this._mouseY = 0;
            this._mouseBar = Math.floor(Math.min(this._doc.song.barCount - 1, Math.max(0, this._mouseX / this._barWidth)));
            this._mouseChannel = Math.floor(Math.min(this._doc.song.getChannelCount() - 1, Math.max(0, this._mouseY / this._channelHeight)));
        }
        _updateMousePos(event) {
            const boundingRect = this._svg.getBoundingClientRect();
            this._mouseX = (event.clientX || event.pageX) - boundingRect.left;
            this._mouseY = (event.clientY || event.pageY) - boundingRect.top;
            this._mouseBar = Math.floor(Math.min(this._doc.song.barCount - 1, Math.max(0, this._mouseX / this._barWidth)));
            this._mouseChannel = Math.floor(Math.min(this._doc.song.getChannelCount() - 1, Math.max(0, this._mouseY / this._channelHeight)));
        }
        _updatePreview() {
            let channel = this._mouseChannel;
            let bar = this._mouseBar;
            if (this._touchMode) {
                bar = this._doc.bar;
                channel = this._doc.channel;
            }
            const selected = (bar == this._doc.bar && channel == this._doc.channel);
            if (this._mouseOver && !this._mousePressed && !selected) {
                this._boxHighlight.setAttribute("x", "" + (1 + this._barWidth * bar));
                this._boxHighlight.setAttribute("y", "" + (1 + (this._channelHeight * channel)));
                this._boxHighlight.setAttribute("height", "" + (this._channelHeight - 2));
                this._boxHighlight.style.visibility = "visible";
            }
            else {
                this._boxHighlight.style.visibility = "hidden";
            }
            if ((this._mouseOver || this._touchMode) && selected) {
                const up = (this._mouseY % this._channelHeight) < this._channelHeight / 2;
                const center = this._barWidth * (bar + 0.8);
                const middle = this._channelHeight * (channel + 0.5);
                const base = this._channelHeight * 0.1;
                const tip = this._channelHeight * 0.4;
                const width = this._channelHeight * 0.175;
                this._upHighlight.setAttribute("fill", up && !this._touchMode ? "#fff" : "#000");
                this._downHighlight.setAttribute("fill", !up && !this._touchMode ? "#fff" : "#000");
                this._upHighlight.setAttribute("d", `M ${center} ${middle - tip} L ${center + width} ${middle - base} L ${center - width} ${middle - base} z`);
                this._downHighlight.setAttribute("d", `M ${center} ${middle + tip} L ${center + width} ${middle + base} L ${center - width} ${middle + base} z`);
                this._upHighlight.style.visibility = "visible";
                this._downHighlight.style.visibility = "visible";
            }
            else {
                this._upHighlight.style.visibility = "hidden";
                this._downHighlight.style.visibility = "hidden";
            }
            this._select.style.left = (this._barWidth * this._doc.bar) + "px";
            this._select.style.top = (this._channelHeight * this._doc.channel) + "px";
            this._select.style.height = this._channelHeight + "px";
            const patternCount = this._doc.song.patternsPerChannel + 1;
            for (let i = this._renderedPatternCount; i < patternCount; i++) {
                this._select.appendChild(beepbox.HTML.option({ value: i }, i));
            }
            for (let i = patternCount; i < this._renderedPatternCount; i++) {
                this._select.removeChild(this._select.lastChild);
            }
            this._renderedPatternCount = patternCount;
            const selectedPattern = this._doc.song.channels[this._doc.channel].bars[this._doc.bar];
            if (this._select.selectedIndex != selectedPattern)
                this._select.selectedIndex = selectedPattern;
        }
        render() {
            const wideScreen = window.innerWidth > 700;
            const squashed = !wideScreen || this._doc.song.getChannelCount() > 4 || (this._doc.song.barCount > this._doc.trackVisibleBars && this._doc.song.getChannelCount() > 3);
            this._channelHeight = squashed ? 27 : 32;
            if (this._renderedChannelCount != this._doc.song.getChannelCount()) {
                for (let y = this._renderedChannelCount; y < this._doc.song.getChannelCount(); y++) {
                    this._grid[y] = [];
                    for (let x = 0; x < this._renderedBarCount; x++) {
                        const box = new Box(y, x, y, beepbox.ColorConfig.getChannelColor(this._doc.song, y).channelDim);
                        box.setSquashed(squashed, y);
                        this._boxContainer.appendChild(box.container);
                        this._grid[y][x] = box;
                    }
                }
                for (let y = this._doc.song.getChannelCount(); y < this._renderedChannelCount; y++) {
                    for (let x = 0; x < this._renderedBarCount; x++) {
                        this._boxContainer.removeChild(this._grid[y][x].container);
                    }
                }
                this._grid.length = this._doc.song.getChannelCount();
                this._mousePressed = false;
            }
            if (this._renderedBarCount != this._doc.song.barCount) {
                for (let y = 0; y < this._doc.song.getChannelCount(); y++) {
                    for (let x = this._renderedBarCount; x < this._doc.song.barCount; x++) {
                        const box = new Box(y, x, y, beepbox.ColorConfig.getChannelColor(this._doc.song, y).channelDim);
                        box.setSquashed(squashed, y);
                        this._boxContainer.appendChild(box.container);
                        this._grid[y][x] = box;
                    }
                    for (let x = this._doc.song.barCount; x < this._renderedBarCount; x++) {
                        this._boxContainer.removeChild(this._grid[y][x].container);
                    }
                    this._grid[y].length = this._doc.song.barCount;
                }
                this._renderedBarCount = this._doc.song.barCount;
                const editorWidth = 32 * this._doc.song.barCount;
                this.container.style.width = editorWidth + "px";
                this._svg.setAttribute("width", editorWidth + "");
                this._mousePressed = false;
            }
            if (this._renderedSquashed != squashed) {
                for (let y = 0; y < this._doc.song.getChannelCount(); y++) {
                    for (let x = 0; x < this._renderedBarCount; x++) {
                        this._grid[y][x].setSquashed(squashed, y);
                    }
                }
                this._mousePressed = false;
            }
            if (this._renderedSquashed != squashed || this._renderedChannelCount != this._doc.song.getChannelCount()) {
                this._renderedSquashed = squashed;
                this._renderedChannelCount = this._doc.song.getChannelCount();
                this._editorHeight = this._doc.song.getChannelCount() * this._channelHeight;
                this._svg.setAttribute("height", "" + this._editorHeight);
                this._playhead.setAttribute("height", "" + this._editorHeight);
                this.container.style.height = this._editorHeight + "px";
            }
            for (let j = 0; j < this._doc.song.getChannelCount(); j++) {
                for (let i = 0; i < this._renderedBarCount; i++) {
                    const pattern = this._doc.song.getPattern(j, i);
                    const selected = (i == this._doc.bar && j == this._doc.channel);
                    const dim = (pattern == null || pattern.notes.length == 0);
                    const box = this._grid[j][i];
                    if (i < this._doc.song.barCount) {
                        const colors = beepbox.ColorConfig.getChannelColor(this._doc.song, j);
                        box.setIndex(this._doc.song.channels[j].bars[i], dim, selected, j, dim && !selected ? colors.channelDim : colors.channelBright);
                        box.container.style.visibility = "visible";
                    }
                    else {
                        box.container.style.visibility = "hidden";
                    }
                }
            }
            this._select.style.display = this._touchMode ? "" : "none";
            if ((!this._doc.synth.playing && (this._doc.bar < this._boxSelectionBar || this._boxSelectionBar + this._boxSelectionWidth <= this._doc.bar)) ||
                this._doc.channel < this._boxSelectionChannel ||
                this._boxSelectionChannel + this._boxSelectionHeight <= this._doc.channel ||
                this._doc.song.barCount < this._boxSelectionBar + this._boxSelectionWidth ||
                this._doc.song.getChannelCount() < this._boxSelectionChannel + this._boxSelectionHeight ||
                (this._boxSelectionWidth == 1 && this._boxSelectionHeight == 1)) {
                this._resetBoxSelection();
            }
            if (this._boxSelectionWidth > 1 || this._boxSelectionHeight > 1) {
                this._selectionRect.setAttribute("x", String(this._barWidth * this._boxSelectionBar + 1));
                this._selectionRect.setAttribute("y", String(this._channelHeight * this._boxSelectionChannel + 1));
                this._selectionRect.setAttribute("width", String(this._barWidth * this._boxSelectionWidth - 2));
                this._selectionRect.setAttribute("height", String(this._channelHeight * this._boxSelectionHeight - 2));
                this._selectionRect.setAttribute("visibility", "visible");
            }
            else {
                this._selectionRect.setAttribute("visibility", "hidden");
            }
            this._updatePreview();
        }
    }
    beepbox.TrackEditor = TrackEditor;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class LoopEditor {
        constructor(_doc) {
            this._doc = _doc;
            this._barWidth = 32;
            this._editorHeight = 20;
            this._startMode = 0;
            this._endMode = 1;
            this._bothMode = 2;
            this._loop = beepbox.SVG.path({ fill: "none", stroke: "#7744ff", "stroke-width": 4 });
            this._highlight = beepbox.SVG.path({ fill: "white", "pointer-events": "none" });
            this._svg = beepbox.SVG.svg({ style: "background-color: #000000; touch-action: pan-y; position: absolute;", height: this._editorHeight }, this._loop, this._highlight);
            this.container = beepbox.HTML.div({ style: "height: 20px; position: relative; margin: 5px 0;" }, this._svg);
            this._change = null;
            this._cursor = { startBar: -1, mode: -1 };
            this._mouseX = 0;
            this._clientStartX = 0;
            this._clientStartY = 0;
            this._startedScrolling = false;
            this._draggingHorizontally = false;
            this._mouseDown = false;
            this._mouseOver = false;
            this._renderedLoopStart = -1;
            this._renderedLoopStop = -1;
            this._renderedBarCount = 0;
            this._whenMouseOver = (event) => {
                if (this._mouseOver)
                    return;
                this._mouseOver = true;
                this._updatePreview();
            };
            this._whenMouseOut = (event) => {
                if (!this._mouseOver)
                    return;
                this._mouseOver = false;
                this._updatePreview();
            };
            this._whenMousePressed = (event) => {
                event.preventDefault();
                this._mouseDown = true;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = (event.clientX || event.pageX) - boundingRect.left;
                this._updateCursorStatus();
                this._updatePreview();
                this._whenMouseMoved(event);
            };
            this._whenTouchPressed = (event) => {
                this._mouseDown = true;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = event.touches[0].clientX - boundingRect.left;
                this._updateCursorStatus();
                this._updatePreview();
                this._clientStartX = event.touches[0].clientX;
                this._clientStartY = event.touches[0].clientY;
                this._draggingHorizontally = false;
                this._startedScrolling = false;
            };
            this._whenMouseMoved = (event) => {
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = (event.clientX || event.pageX) - boundingRect.left;
                this._whenCursorMoved();
            };
            this._whenTouchMoved = (event) => {
                if (!this._mouseDown)
                    return;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = event.touches[0].clientX - boundingRect.left;
                if (!this._draggingHorizontally && !this._startedScrolling) {
                    if (Math.abs(event.touches[0].clientY - this._clientStartY) > 10) {
                        this._startedScrolling = true;
                    }
                    else if (Math.abs(event.touches[0].clientX - this._clientStartX) > 10) {
                        this._draggingHorizontally = true;
                    }
                }
                if (this._draggingHorizontally) {
                    this._whenCursorMoved();
                    event.preventDefault();
                }
            };
            this._whenTouchReleased = (event) => {
                event.preventDefault();
                if (!this._startedScrolling) {
                    this._whenCursorMoved();
                    this._mouseOver = false;
                    this._whenCursorReleased(event);
                    this._updatePreview();
                }
            };
            this._whenCursorReleased = (event) => {
                if (this._change != null)
                    this._doc.record(this._change);
                this._change = null;
                this._mouseDown = false;
                this._updateCursorStatus();
                this._render();
            };
            this._documentChanged = () => {
                this._render();
            };
            this._updateCursorStatus();
            this._render();
            this._doc.notifier.watch(this._documentChanged);
            this.container.addEventListener("mousedown", this._whenMousePressed);
            document.addEventListener("mousemove", this._whenMouseMoved);
            document.addEventListener("mouseup", this._whenCursorReleased);
            this.container.addEventListener("mouseover", this._whenMouseOver);
            this.container.addEventListener("mouseout", this._whenMouseOut);
            this.container.addEventListener("touchstart", this._whenTouchPressed);
            this.container.addEventListener("touchmove", this._whenTouchMoved);
            this.container.addEventListener("touchend", this._whenTouchReleased);
            this.container.addEventListener("touchcancel", this._whenTouchReleased);
        }
        _updateCursorStatus() {
            const bar = this._mouseX / this._barWidth;
            this._cursor.startBar = bar;
            if (bar > this._doc.song.loopStart - 0.25 && bar < this._doc.song.loopStart + this._doc.song.loopLength + 0.25) {
                if (bar - this._doc.song.loopStart < this._doc.song.loopLength * 0.5) {
                    this._cursor.mode = this._startMode;
                }
                else {
                    this._cursor.mode = this._endMode;
                }
            }
            else {
                this._cursor.mode = this._bothMode;
            }
        }
        _findEndPoints(middle) {
            let start = Math.round(middle - this._doc.song.loopLength / 2);
            let end = start + this._doc.song.loopLength;
            if (start < 0) {
                end -= start;
                start = 0;
            }
            if (end > this._doc.song.barCount) {
                start -= end - this._doc.song.barCount;
                end = this._doc.song.barCount;
            }
            return { start: start, length: end - start };
        }
        _whenCursorMoved() {
            if (this._mouseDown) {
                let oldStart = this._doc.song.loopStart;
                let oldEnd = this._doc.song.loopStart + this._doc.song.loopLength;
                if (this._change != null && this._doc.lastChangeWas(this._change)) {
                    oldStart = this._change.oldStart;
                    oldEnd = oldStart + this._change.oldLength;
                }
                const bar = this._mouseX / this._barWidth;
                let start;
                let end;
                let temp;
                if (this._cursor.mode == this._startMode) {
                    start = oldStart + Math.round(bar - this._cursor.startBar);
                    end = oldEnd;
                    if (start < 0)
                        start = 0;
                    if (start >= this._doc.song.barCount)
                        start = this._doc.song.barCount;
                    if (start == end) {
                        start = end - 1;
                    }
                    else if (start > end) {
                        temp = start;
                        start = end;
                        end = temp;
                    }
                    this._change = new beepbox.ChangeLoop(this._doc, oldStart, oldEnd - oldStart, start, end - start);
                }
                else if (this._cursor.mode == this._endMode) {
                    start = oldStart;
                    end = oldEnd + Math.round(bar - this._cursor.startBar);
                    if (end < 0)
                        end = 0;
                    if (end >= this._doc.song.barCount)
                        end = this._doc.song.barCount;
                    if (end == start) {
                        end = start + 1;
                    }
                    else if (end < start) {
                        temp = start;
                        start = end;
                        end = temp;
                    }
                    this._change = new beepbox.ChangeLoop(this._doc, oldStart, oldEnd - oldStart, start, end - start);
                }
                else if (this._cursor.mode == this._bothMode) {
                    const endPoints = this._findEndPoints(bar);
                    this._change = new beepbox.ChangeLoop(this._doc, oldStart, oldEnd - oldStart, endPoints.start, endPoints.length);
                }
                this._doc.synth.jumpIntoLoop();
                if (this._doc.autoFollow) {
                    new beepbox.ChangeChannelBar(this._doc, this._doc.channel, Math.floor(this._doc.synth.playhead), true);
                }
                this._doc.setProspectiveChange(this._change);
            }
            else {
                this._updateCursorStatus();
                this._updatePreview();
            }
        }
        _updatePreview() {
            const showHighlight = this._mouseOver && !this._mouseDown;
            this._highlight.style.visibility = showHighlight ? "visible" : "hidden";
            if (showHighlight) {
                const radius = this._editorHeight / 2;
                let highlightStart = (this._doc.song.loopStart) * this._barWidth;
                let highlightStop = (this._doc.song.loopStart + this._doc.song.loopLength) * this._barWidth;
                if (this._cursor.mode == this._startMode) {
                    highlightStop = (this._doc.song.loopStart) * this._barWidth + radius * 2;
                }
                else if (this._cursor.mode == this._endMode) {
                    highlightStart = (this._doc.song.loopStart + this._doc.song.loopLength) * this._barWidth - radius * 2;
                }
                else {
                    const endPoints = this._findEndPoints(this._cursor.startBar);
                    highlightStart = (endPoints.start) * this._barWidth;
                    highlightStop = (endPoints.start + endPoints.length) * this._barWidth;
                }
                this._highlight.setAttribute("d", `M ${highlightStart + radius} ${4} ` +
                    `L ${highlightStop - radius} ${4} ` +
                    `A ${radius - 4} ${radius - 4} ${0} ${0} ${1} ${highlightStop - radius} ${this._editorHeight - 4} ` +
                    `L ${highlightStart + radius} ${this._editorHeight - 4} ` +
                    `A ${radius - 4} ${radius - 4} ${0} ${0} ${1} ${highlightStart + radius} ${4} ` +
                    `z`);
            }
        }
        _render() {
            const radius = this._editorHeight / 2;
            const loopStart = (this._doc.song.loopStart) * this._barWidth;
            const loopStop = (this._doc.song.loopStart + this._doc.song.loopLength) * this._barWidth;
            if (this._renderedBarCount != this._doc.song.barCount) {
                this._renderedBarCount = this._doc.song.barCount;
                const editorWidth = 32 * this._doc.song.barCount;
                this.container.style.width = editorWidth + "px";
                this._svg.setAttribute("width", editorWidth + "");
            }
            if (this._renderedLoopStart != loopStart || this._renderedLoopStop != loopStop) {
                this._renderedLoopStart = loopStart;
                this._renderedLoopStop = loopStop;
                this._loop.setAttribute("d", `M ${loopStart + radius} ${2} ` +
                    `L ${loopStop - radius} ${2} ` +
                    `A ${radius - 2} ${radius - 2} ${0} ${0} ${1} ${loopStop - radius} ${this._editorHeight - 2} ` +
                    `L ${loopStart + radius} ${this._editorHeight - 2} ` +
                    `A ${radius - 2} ${radius - 2} ${0} ${0} ${1} ${loopStart + radius} ${2} ` +
                    `z`);
            }
            this._updatePreview();
        }
    }
    beepbox.LoopEditor = LoopEditor;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class SpectrumEditor {
        constructor(_doc, _spectrumIndex) {
            this._doc = _doc;
            this._spectrumIndex = _spectrumIndex;
            this._editorWidth = 112;
            this._editorHeight = 26;
            this._fill = beepbox.SVG.path({ fill: "#444444", "pointer-events": "none" });
            this._octaves = beepbox.SVG.svg({ "pointer-events": "none" });
            this._fifths = beepbox.SVG.svg({ "pointer-events": "none" });
            this._curve = beepbox.SVG.path({ fill: "none", stroke: "currentColor", "stroke-width": 2, "pointer-events": "none" });
            this._arrow = beepbox.SVG.path({ fill: "currentColor", "pointer-events": "none" });
            this._svg = beepbox.SVG.svg({ style: "background-color: #000000; touch-action: none; cursor: crosshair;", width: "100%", height: "100%", viewBox: "0 0 " + this._editorWidth + " " + this._editorHeight, preserveAspectRatio: "none" }, this._fill, this._octaves, this._fifths, this._curve, this._arrow);
            this.container = beepbox.HTML.div({ className: "spectrum", style: "height: 2em;" }, this._svg);
            this._mouseX = 0;
            this._mouseY = 0;
            this._freqPrev = 0;
            this._ampPrev = 0;
            this._mouseDown = false;
            this._change = null;
            this._renderedPath = "";
            this._renderedFifths = true;
            this._whenMousePressed = (event) => {
                event.preventDefault();
                this._mouseDown = true;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = ((event.clientX || event.pageX) - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = ((event.clientY || event.pageY) - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._freqPrev = this._xToFreq(this._mouseX);
                this._ampPrev = this._yToAmp(this._mouseY);
                this._whenCursorMoved();
            };
            this._whenTouchPressed = (event) => {
                event.preventDefault();
                this._mouseDown = true;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = (event.touches[0].clientX - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = (event.touches[0].clientY - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._freqPrev = this._xToFreq(this._mouseX);
                this._ampPrev = this._yToAmp(this._mouseY);
                this._whenCursorMoved();
            };
            this._whenMouseMoved = (event) => {
                if (this.container.offsetParent == null)
                    return;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = ((event.clientX || event.pageX) - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = ((event.clientY || event.pageY) - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._whenCursorMoved();
            };
            this._whenTouchMoved = (event) => {
                if (this.container.offsetParent == null)
                    return;
                if (!this._mouseDown)
                    return;
                event.preventDefault();
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = (event.touches[0].clientX - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = (event.touches[0].clientY - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._whenCursorMoved();
            };
            this._whenCursorReleased = (event) => {
                if (this._mouseDown) {
                    this._doc.record(this._change);
                    this._change = null;
                }
                this._mouseDown = false;
            };
            for (let i = 0; i < beepbox.Config.spectrumControlPoints; i += beepbox.Config.spectrumControlPointsPerOctave) {
                this._octaves.appendChild(beepbox.SVG.rect({ fill: "#886644", x: (i + 1) * this._editorWidth / (beepbox.Config.spectrumControlPoints + 2) - 1, y: 0, width: 2, height: this._editorHeight }));
            }
            for (let i = 4; i <= beepbox.Config.spectrumControlPoints; i += beepbox.Config.spectrumControlPointsPerOctave) {
                this._fifths.appendChild(beepbox.SVG.rect({ fill: "#446688", x: (i + 1) * this._editorWidth / (beepbox.Config.spectrumControlPoints + 2) - 1, y: 0, width: 2, height: this._editorHeight }));
            }
            this.container.addEventListener("mousedown", this._whenMousePressed);
            document.addEventListener("mousemove", this._whenMouseMoved);
            document.addEventListener("mouseup", this._whenCursorReleased);
            this.container.addEventListener("touchstart", this._whenTouchPressed);
            this.container.addEventListener("touchmove", this._whenTouchMoved);
            this.container.addEventListener("touchend", this._whenCursorReleased);
            this.container.addEventListener("touchcancel", this._whenCursorReleased);
        }
        _xToFreq(x) {
            return (beepbox.Config.spectrumControlPoints + 2) * x / this._editorWidth - 1;
        }
        _yToAmp(y) {
            return beepbox.Config.spectrumMax * (1 - (y - 1) / (this._editorHeight - 2));
        }
        _whenCursorMoved() {
            if (this._mouseDown) {
                const freq = this._xToFreq(this._mouseX);
                const amp = this._yToAmp(this._mouseY);
                const instrument = this._doc.song.channels[this._doc.channel].instruments[this._doc.getCurrentInstrument()];
                const spectrumWave = (this._spectrumIndex == null) ? instrument.spectrumWave : instrument.drumsetSpectrumWaves[this._spectrumIndex];
                if (freq != this._freqPrev) {
                    const slope = (amp - this._ampPrev) / (freq - this._freqPrev);
                    const offset = this._ampPrev - this._freqPrev * slope;
                    const lowerFreq = Math.ceil(Math.min(this._freqPrev, freq));
                    const upperFreq = Math.floor(Math.max(this._freqPrev, freq));
                    for (let i = lowerFreq; i <= upperFreq; i++) {
                        if (i < 0 || i >= beepbox.Config.spectrumControlPoints)
                            continue;
                        spectrumWave.spectrum[i] = Math.max(0, Math.min(beepbox.Config.spectrumMax, Math.round(i * slope + offset)));
                    }
                }
                spectrumWave.spectrum[Math.max(0, Math.min(beepbox.Config.spectrumControlPoints - 1, Math.round(freq)))] = Math.max(0, Math.min(beepbox.Config.spectrumMax, Math.round(amp)));
                this._freqPrev = freq;
                this._ampPrev = amp;
                this._change = new beepbox.ChangeSpectrum(this._doc, instrument, spectrumWave);
                this._doc.setProspectiveChange(this._change);
            }
        }
        render() {
            const instrument = this._doc.song.channels[this._doc.channel].instruments[this._doc.getCurrentInstrument()];
            const spectrumWave = (this._spectrumIndex == null) ? instrument.spectrumWave : instrument.drumsetSpectrumWaves[this._spectrumIndex];
            const controlPointToHeight = (point) => {
                return (1 - (point / beepbox.Config.spectrumMax)) * (this._editorHeight - 1) + 1;
            };
            let lastValue = 0;
            let path = "M 0 " + beepbox.prettyNumber(this._editorHeight) + " ";
            for (let i = 0; i < beepbox.Config.spectrumControlPoints; i++) {
                let nextValue = spectrumWave.spectrum[i];
                if (lastValue != 0 || nextValue != 0) {
                    path += "L ";
                }
                else {
                    path += "M ";
                }
                path += beepbox.prettyNumber((i + 1) * this._editorWidth / (beepbox.Config.spectrumControlPoints + 2)) + " " + beepbox.prettyNumber(controlPointToHeight(nextValue)) + " ";
                lastValue = nextValue;
            }
            const lastHeight = controlPointToHeight(lastValue);
            if (lastValue > 0) {
                path += "L " + (this._editorWidth - 1) + " " + beepbox.prettyNumber(lastHeight) + " ";
            }
            if (this._renderedPath != path) {
                this._renderedPath = path;
                this._curve.setAttribute("d", path);
                this._fill.setAttribute("d", path + "L " + this._editorWidth + " " + beepbox.prettyNumber(lastHeight) + " L " + this._editorWidth + " " + beepbox.prettyNumber(this._editorHeight) + " L 0 " + beepbox.prettyNumber(this._editorHeight) + " z ");
                this._arrow.setAttribute("d", "M " + this._editorWidth + " " + beepbox.prettyNumber(lastHeight) + " L " + (this._editorWidth - 4) + " " + beepbox.prettyNumber(lastHeight - 4) + " L " + (this._editorWidth - 4) + " " + beepbox.prettyNumber(lastHeight + 4) + " z");
                this._arrow.style.display = (lastValue > 0) ? "" : "none";
            }
            if (this._renderedFifths != this._doc.showFifth) {
                this._renderedFifths = this._doc.showFifth;
                this._fifths.style.display = this._doc.showFifth ? "" : "none";
            }
        }
    }
    beepbox.SpectrumEditor = SpectrumEditor;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class HarmonicsEditor {
        constructor(_doc) {
            this._doc = _doc;
            this._editorWidth = 112;
            this._editorHeight = 26;
            this._octaves = beepbox.SVG.svg({ "pointer-events": "none" });
            this._fifths = beepbox.SVG.svg({ "pointer-events": "none" });
            this._curve = beepbox.SVG.path({ fill: "none", stroke: "currentColor", "stroke-width": 2, "pointer-events": "none" });
            this._lastControlPoints = [];
            this._lastControlPointContainer = beepbox.SVG.svg({ "pointer-events": "none" });
            this._svg = beepbox.SVG.svg({ style: "background-color: #000000; touch-action: none; cursor: crosshair;", width: "100%", height: "100%", viewBox: "0 0 " + this._editorWidth + " " + this._editorHeight, preserveAspectRatio: "none" }, this._octaves, this._fifths, this._curve, this._lastControlPointContainer);
            this.container = beepbox.HTML.div({ className: "harmonics", style: "height: 2em;" }, this._svg);
            this._mouseX = 0;
            this._mouseY = 0;
            this._freqPrev = 0;
            this._ampPrev = 0;
            this._mouseDown = false;
            this._change = null;
            this._renderedPath = "";
            this._renderedFifths = true;
            this._whenMousePressed = (event) => {
                event.preventDefault();
                this._mouseDown = true;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = ((event.clientX || event.pageX) - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = ((event.clientY || event.pageY) - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._freqPrev = this._xToFreq(this._mouseX);
                this._ampPrev = this._yToAmp(this._mouseY);
                this._whenCursorMoved();
            };
            this._whenTouchPressed = (event) => {
                event.preventDefault();
                this._mouseDown = true;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = (event.touches[0].clientX - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = (event.touches[0].clientY - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._freqPrev = this._xToFreq(this._mouseX);
                this._ampPrev = this._yToAmp(this._mouseY);
                this._whenCursorMoved();
            };
            this._whenMouseMoved = (event) => {
                if (this.container.offsetParent == null)
                    return;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = ((event.clientX || event.pageX) - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = ((event.clientY || event.pageY) - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._whenCursorMoved();
            };
            this._whenTouchMoved = (event) => {
                if (this.container.offsetParent == null)
                    return;
                if (!this._mouseDown)
                    return;
                event.preventDefault();
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = (event.touches[0].clientX - boundingRect.left) * this._editorWidth / (boundingRect.right - boundingRect.left);
                this._mouseY = (event.touches[0].clientY - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseX))
                    this._mouseX = 0;
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._whenCursorMoved();
            };
            this._whenCursorReleased = (event) => {
                if (this._mouseDown) {
                    this._doc.record(this._change);
                    this._change = null;
                }
                this._mouseDown = false;
            };
            for (let i = 1; i <= beepbox.Config.harmonicsControlPoints; i = i * 2) {
                this._octaves.appendChild(beepbox.SVG.rect({ fill: "#886644", x: (i - 0.5) * (this._editorWidth - 8) / (beepbox.Config.harmonicsControlPoints - 1) - 1, y: 0, width: 2, height: this._editorHeight }));
            }
            for (let i = 3; i <= beepbox.Config.harmonicsControlPoints; i = i * 2) {
                this._fifths.appendChild(beepbox.SVG.rect({ fill: "#446688", x: (i - 0.5) * (this._editorWidth - 8) / (beepbox.Config.harmonicsControlPoints - 1) - 1, y: 0, width: 2, height: this._editorHeight }));
            }
            for (let i = 0; i < 4; i++) {
                const rect = beepbox.SVG.rect({ fill: "currentColor", x: (this._editorWidth - i * 2 - 1), y: 0, width: 1, height: this._editorHeight });
                this._lastControlPoints.push(rect);
                this._lastControlPointContainer.appendChild(rect);
            }
            this.container.addEventListener("mousedown", this._whenMousePressed);
            document.addEventListener("mousemove", this._whenMouseMoved);
            document.addEventListener("mouseup", this._whenCursorReleased);
            this.container.addEventListener("touchstart", this._whenTouchPressed);
            this.container.addEventListener("touchmove", this._whenTouchMoved);
            this.container.addEventListener("touchend", this._whenCursorReleased);
            this.container.addEventListener("touchcancel", this._whenCursorReleased);
        }
        _xToFreq(x) {
            return (beepbox.Config.harmonicsControlPoints - 1) * x / (this._editorWidth - 8) - 0.5;
        }
        _yToAmp(y) {
            return beepbox.Config.harmonicsMax * (1 - y / this._editorHeight);
        }
        _whenCursorMoved() {
            if (this._mouseDown) {
                const freq = this._xToFreq(this._mouseX);
                const amp = this._yToAmp(this._mouseY);
                const instrument = this._doc.song.channels[this._doc.channel].instruments[this._doc.getCurrentInstrument()];
                const harmonicsWave = instrument.harmonicsWave;
                if (freq != this._freqPrev) {
                    const slope = (amp - this._ampPrev) / (freq - this._freqPrev);
                    const offset = this._ampPrev - this._freqPrev * slope;
                    const lowerFreq = Math.ceil(Math.min(this._freqPrev, freq));
                    const upperFreq = Math.floor(Math.max(this._freqPrev, freq));
                    for (let i = lowerFreq; i <= upperFreq; i++) {
                        if (i < 0 || i >= beepbox.Config.harmonicsControlPoints)
                            continue;
                        harmonicsWave.harmonics[i] = Math.max(0, Math.min(beepbox.Config.harmonicsMax, Math.round(i * slope + offset)));
                    }
                }
                harmonicsWave.harmonics[Math.max(0, Math.min(beepbox.Config.harmonicsControlPoints - 1, Math.round(freq)))] = Math.max(0, Math.min(beepbox.Config.harmonicsMax, Math.round(amp)));
                this._freqPrev = freq;
                this._ampPrev = amp;
                this._change = new beepbox.ChangeHarmonics(this._doc, instrument, harmonicsWave);
                this._doc.setProspectiveChange(this._change);
            }
        }
        render() {
            const instrument = this._doc.song.channels[this._doc.channel].instruments[this._doc.getCurrentInstrument()];
            const harmonicsWave = instrument.harmonicsWave;
            const controlPointToHeight = (point) => {
                return (1 - (point / beepbox.Config.harmonicsMax)) * this._editorHeight;
            };
            let bottom = beepbox.prettyNumber(this._editorHeight);
            let path = "";
            for (let i = 0; i < beepbox.Config.harmonicsControlPoints - 1; i++) {
                if (harmonicsWave.harmonics[i] == 0)
                    continue;
                let xPos = beepbox.prettyNumber((i + 0.5) * (this._editorWidth - 8) / (beepbox.Config.harmonicsControlPoints - 1));
                path += "M " + xPos + " " + bottom + " ";
                path += "L " + xPos + " " + beepbox.prettyNumber(controlPointToHeight(harmonicsWave.harmonics[i])) + " ";
            }
            const lastHeight = controlPointToHeight(harmonicsWave.harmonics[beepbox.Config.harmonicsControlPoints - 1]);
            for (let i = 0; i < 4; i++) {
                const rect = this._lastControlPoints[i];
                rect.setAttribute("y", beepbox.prettyNumber(lastHeight));
                rect.setAttribute("height", beepbox.prettyNumber(this._editorHeight - lastHeight));
            }
            if (this._renderedPath != path) {
                this._renderedPath = path;
                this._curve.setAttribute("d", path);
            }
            if (this._renderedFifths != this._doc.showFifth) {
                this._renderedFifths = this._doc.showFifth;
                this._fifths.style.display = this._doc.showFifth ? "" : "none";
            }
        }
    }
    beepbox.HarmonicsEditor = HarmonicsEditor;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class BarScrollBar {
        constructor(_doc, _trackContainer) {
            this._doc = _doc;
            this._trackContainer = _trackContainer;
            this._editorWidth = 512;
            this._editorHeight = 20;
            this._notches = beepbox.SVG.svg({ "pointer-events": "none" });
            this._handle = beepbox.SVG.rect({ fill: "#444444", x: 0, y: 2, width: 10, height: this._editorHeight - 4 });
            this._handleHighlight = beepbox.SVG.rect({ fill: "none", stroke: "white", "stroke-width": 2, "pointer-events": "none", x: 0, y: 1, width: 10, height: this._editorHeight - 2 });
            this._leftHighlight = beepbox.SVG.path({ fill: "white", "pointer-events": "none" });
            this._rightHighlight = beepbox.SVG.path({ fill: "white", "pointer-events": "none" });
            this._svg = beepbox.SVG.svg({ style: "background-color: #000000; touch-action: pan-y; position: absolute;", width: this._editorWidth, height: this._editorHeight }, this._notches, this._handle, this._handleHighlight, this._leftHighlight, this._rightHighlight);
            this.container = beepbox.HTML.div({ className: "barScrollBar", style: "width: 512px; height: 20px; overflow: hidden; position: relative;" }, this._svg);
            this._mouseX = 0;
            this._mouseDown = false;
            this._mouseOver = false;
            this._dragging = false;
            this._renderedNotchCount = -1;
            this._renderedBarPos = -1;
            this._onScroll = (event) => {
                this._doc.barScrollPos = (this._trackContainer.scrollLeft / 32);
            };
            this._whenMouseOver = (event) => {
                if (this._mouseOver)
                    return;
                this._mouseOver = true;
                this._updatePreview();
            };
            this._whenMouseOut = (event) => {
                if (!this._mouseOver)
                    return;
                this._mouseOver = false;
                this._updatePreview();
            };
            this._whenMousePressed = (event) => {
                event.preventDefault();
                this._mouseDown = true;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = (event.clientX || event.pageX) - boundingRect.left;
                this._updatePreview();
                if (this._mouseX >= this._doc.barScrollPos * this._barWidth && this._mouseX <= (this._doc.barScrollPos + this._doc.trackVisibleBars) * this._barWidth) {
                    this._dragging = true;
                    this._dragStart = this._mouseX;
                }
            };
            this._whenTouchPressed = (event) => {
                event.preventDefault();
                this._mouseDown = true;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = event.touches[0].clientX - boundingRect.left;
                this._updatePreview();
                if (this._mouseX >= this._doc.barScrollPos * this._barWidth && this._mouseX <= (this._doc.barScrollPos + this._doc.trackVisibleBars) * this._barWidth) {
                    this._dragging = true;
                    this._dragStart = this._mouseX;
                }
            };
            this._whenMouseMoved = (event) => {
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = (event.clientX || event.pageX) - boundingRect.left;
                this._whenCursorMoved();
            };
            this._whenTouchMoved = (event) => {
                if (!this._mouseDown)
                    return;
                event.preventDefault();
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseX = event.touches[0].clientX - boundingRect.left;
                this._whenCursorMoved();
            };
            this._whenCursorReleased = (event) => {
                if (!this._dragging && this._mouseDown) {
                    if (this._mouseX < (this._doc.barScrollPos + 8) * this._barWidth) {
                        if (this._doc.barScrollPos > 0)
                            this._doc.barScrollPos--;
                        this._doc.notifier.changed();
                    }
                    else {
                        if (this._doc.barScrollPos < this._doc.song.barCount - this._doc.trackVisibleBars)
                            this._doc.barScrollPos++;
                        this._doc.notifier.changed();
                    }
                }
                this._mouseDown = false;
                this._dragging = false;
                this._updatePreview();
            };
            const center = this._editorHeight * 0.5;
            const base = 20;
            const tip = 9;
            const arrowHeight = 6;
            this._leftHighlight.setAttribute("d", `M ${tip} ${center} L ${base} ${center + arrowHeight} L ${base} ${center - arrowHeight} z`);
            this._rightHighlight.setAttribute("d", `M ${this._editorWidth - tip} ${center} L ${this._editorWidth - base} ${center + arrowHeight} L ${this._editorWidth - base} ${center - arrowHeight} z`);
            this.container.addEventListener("mousedown", this._whenMousePressed);
            document.addEventListener("mousemove", this._whenMouseMoved);
            document.addEventListener("mouseup", this._whenCursorReleased);
            this.container.addEventListener("mouseover", this._whenMouseOver);
            this.container.addEventListener("mouseout", this._whenMouseOut);
            this.container.addEventListener("touchstart", this._whenTouchPressed);
            this.container.addEventListener("touchmove", this._whenTouchMoved);
            this.container.addEventListener("touchend", this._whenCursorReleased);
            this.container.addEventListener("touchcancel", this._whenCursorReleased);
            this._trackContainer.addEventListener("scroll", this._onScroll, { capture: false, passive: true });
        }
        _whenCursorMoved() {
            if (this._dragging) {
                while (this._mouseX - this._dragStart < -this._barWidth * 0.5) {
                    if (this._doc.barScrollPos > 0) {
                        this._doc.barScrollPos--;
                        this._dragStart -= this._barWidth;
                        this._doc.notifier.changed();
                    }
                    else {
                        break;
                    }
                }
                while (this._mouseX - this._dragStart > this._barWidth * 0.5) {
                    if (this._doc.barScrollPos < this._doc.song.barCount - this._doc.trackVisibleBars) {
                        this._doc.barScrollPos++;
                        this._dragStart += this._barWidth;
                        this._doc.notifier.changed();
                    }
                    else {
                        break;
                    }
                }
            }
            if (this._mouseOver)
                this._updatePreview();
        }
        _updatePreview() {
            const showHighlight = this._mouseOver && !this._mouseDown;
            let showleftHighlight = false;
            let showRightHighlight = false;
            let showHandleHighlight = false;
            if (showHighlight) {
                if (this._mouseX < this._doc.barScrollPos * this._barWidth) {
                    showleftHighlight = true;
                }
                else if (this._mouseX > (this._doc.barScrollPos + this._doc.trackVisibleBars) * this._barWidth) {
                    showRightHighlight = true;
                }
                else {
                    showHandleHighlight = true;
                }
            }
            this._leftHighlight.style.visibility = showleftHighlight ? "visible" : "hidden";
            this._rightHighlight.style.visibility = showRightHighlight ? "visible" : "hidden";
            this._handleHighlight.style.visibility = showHandleHighlight ? "visible" : "hidden";
        }
        render() {
            this._barWidth = (this._editorWidth - 1) / Math.max(this._doc.trackVisibleBars, this._doc.song.barCount);
            const resized = this._renderedNotchCount != this._doc.song.barCount;
            if (resized) {
                this._renderedNotchCount = this._doc.song.barCount;
                while (this._notches.firstChild)
                    this._notches.removeChild(this._notches.firstChild);
                for (let i = 0; i <= this._doc.song.barCount; i++) {
                    const lineHeight = (i % 16 == 0) ? 0 : ((i % 4 == 0) ? this._editorHeight / 8 : this._editorHeight / 3);
                    this._notches.appendChild(beepbox.SVG.rect({ fill: "#444444", x: i * this._barWidth - 1, y: lineHeight, width: 2, height: this._editorHeight - lineHeight * 2 }));
                }
            }
            if (resized || this._renderedBarPos != this._doc.barScrollPos) {
                this._renderedBarPos = this._doc.barScrollPos;
                this._handle.setAttribute("x", "" + (this._barWidth * this._doc.barScrollPos));
                this._handle.setAttribute("width", "" + (this._barWidth * this._doc.trackVisibleBars));
                this._handleHighlight.setAttribute("x", "" + (this._barWidth * this._doc.barScrollPos));
                this._handleHighlight.setAttribute("width", "" + (this._barWidth * this._doc.trackVisibleBars));
            }
            this._updatePreview();
            this._trackContainer.scrollLeft = this._doc.barScrollPos * 32;
        }
    }
    beepbox.BarScrollBar = BarScrollBar;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class OctaveScrollBar {
        constructor(_doc) {
            this._doc = _doc;
            this._editorWidth = 20;
            this._editorHeight = 481;
            this._notchHeight = 4.0;
            this._octaveCount = beepbox.Config.pitchOctaves;
            this._octaveHeight = (this._editorHeight - this._notchHeight) / this._octaveCount;
            this._barHeight = (this._octaveHeight * beepbox.Config.windowOctaves + this._notchHeight);
            this._handle = beepbox.SVG.rect({ fill: "#444444", x: 2, y: 0, width: this._editorWidth - 4, height: this._barHeight });
            this._handleHighlight = beepbox.SVG.rect({ fill: "none", stroke: "white", "stroke-width": 2, "pointer-events": "none", x: 1, y: 0, width: this._editorWidth - 2, height: this._barHeight });
            this._upHighlight = beepbox.SVG.path({ fill: "white", "pointer-events": "none" });
            this._downHighlight = beepbox.SVG.path({ fill: "white", "pointer-events": "none" });
            this._svg = beepbox.SVG.svg({ style: "background-color: #000000; touch-action: pan-x; position: absolute;", width: this._editorWidth, height: "100%", viewBox: "0 0 20 481", preserveAspectRatio: "none" });
            this.container = beepbox.HTML.div({ id: "octaveScrollBarContainer", style: "width: 20px; height: 100%; overflow: hidden; position: relative; flex-shrink: 0;" }, this._svg);
            this._mouseY = 0;
            this._mouseDown = false;
            this._mouseOver = false;
            this._dragging = false;
            this._renderedBarBottom = -1;
            this._change = null;
            this._whenMouseOver = (event) => {
                if (this._mouseOver)
                    return;
                this._mouseOver = true;
                this._updatePreview();
            };
            this._whenMouseOut = (event) => {
                if (!this._mouseOver)
                    return;
                this._mouseOver = false;
                this._updatePreview();
            };
            this._whenMousePressed = (event) => {
                event.preventDefault();
                this._mouseDown = true;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseY = ((event.clientY || event.pageY) - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                if (this._doc.song.getChannelIsNoise(this._doc.channel))
                    return;
                this._updatePreview();
                if (this._mouseY >= this._barBottom - this._barHeight && this._mouseY <= this._barBottom) {
                    this._dragging = true;
                    this._change = null;
                    this._dragStart = this._mouseY;
                }
            };
            this._whenTouchPressed = (event) => {
                event.preventDefault();
                this._mouseDown = true;
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseY = (event.touches[0].clientY - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                if (this._doc.song.getChannelIsNoise(this._doc.channel))
                    return;
                this._updatePreview();
                if (this._mouseY >= this._barBottom - this._barHeight && this._mouseY <= this._barBottom) {
                    this._dragging = true;
                    this._change = null;
                    this._dragStart = this._mouseY;
                }
            };
            this._whenMouseMoved = (event) => {
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseY = ((event.clientY || event.pageY) - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._whenCursorMoved();
            };
            this._whenTouchMoved = (event) => {
                if (!this._mouseDown)
                    return;
                event.preventDefault();
                const boundingRect = this._svg.getBoundingClientRect();
                this._mouseY = (event.touches[0].clientY - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._whenCursorMoved();
            };
            this._whenCursorReleased = (event) => {
                if (!this._doc.song.getChannelIsNoise(this._doc.channel) && this._mouseDown) {
                    if (this._dragging) {
                        if (this._change != null)
                            this._doc.record(this._change);
                    }
                    else {
                        const canReplaceLastChange = this._doc.lastChangeWas(this._change);
                        const oldValue = canReplaceLastChange ? this._change.oldValue : this._doc.song.channels[this._doc.channel].octave;
                        const currentOctave = this._doc.song.channels[this._doc.channel].octave;
                        if (this._mouseY < this._barBottom - this._barHeight * 0.5) {
                            if (currentOctave < beepbox.Config.scrollableOctaves) {
                                this._change = new beepbox.ChangeOctave(this._doc, oldValue, currentOctave + 1);
                                this._doc.record(this._change, canReplaceLastChange ? "replace" : "push");
                            }
                        }
                        else {
                            if (currentOctave > 0) {
                                this._change = new beepbox.ChangeOctave(this._doc, oldValue, currentOctave - 1);
                                this._doc.record(this._change, canReplaceLastChange ? "replace" : "push");
                            }
                        }
                    }
                }
                this._mouseDown = false;
                this._dragging = false;
                this._updatePreview();
            };
            this._documentChanged = () => {
                this._barBottom = this._editorHeight - (this._octaveHeight * this._doc.song.channels[this._doc.channel].octave);
                this._render();
            };
            this._doc.notifier.watch(this._documentChanged);
            this._documentChanged();
            this._svg.appendChild(this._handle);
            for (let i = 0; i <= this._octaveCount; i++) {
                this._svg.appendChild(beepbox.SVG.rect({ fill: "#886644", x: 0, y: i * this._octaveHeight, width: this._editorWidth, height: this._notchHeight }));
            }
            this._svg.appendChild(this._handleHighlight);
            this._svg.appendChild(this._upHighlight);
            this._svg.appendChild(this._downHighlight);
            const center = this._editorWidth * 0.5;
            const base = 20;
            const tip = 9;
            const arrowWidth = 6;
            this._upHighlight.setAttribute("d", `M ${center} ${tip} L ${center + arrowWidth} ${base} L ${center - arrowWidth} ${base} z`);
            this._downHighlight.setAttribute("d", `M ${center} ${this._editorHeight - tip} L ${center + arrowWidth} ${this._editorHeight - base} L ${center - arrowWidth} ${this._editorHeight - base} z`);
            this.container.addEventListener("mousedown", this._whenMousePressed);
            document.addEventListener("mousemove", this._whenMouseMoved);
            document.addEventListener("mouseup", this._whenCursorReleased);
            this.container.addEventListener("mouseover", this._whenMouseOver);
            this.container.addEventListener("mouseout", this._whenMouseOut);
            this.container.addEventListener("touchstart", this._whenTouchPressed);
            this.container.addEventListener("touchmove", this._whenTouchMoved);
            this.container.addEventListener("touchend", this._whenCursorReleased);
            this.container.addEventListener("touchcancel", this._whenCursorReleased);
        }
        _whenCursorMoved() {
            if (this._doc.song.getChannelIsNoise(this._doc.channel))
                return;
            if (this._dragging) {
                const currentOctave = this._doc.song.channels[this._doc.channel].octave;
                const continuingProspectiveChange = this._doc.lastChangeWas(this._change);
                const oldValue = continuingProspectiveChange ? this._change.oldValue : currentOctave;
                let octave = currentOctave;
                while (this._mouseY - this._dragStart < -this._octaveHeight * 0.5) {
                    if (octave < beepbox.Config.scrollableOctaves) {
                        octave++;
                        this._dragStart -= this._octaveHeight;
                    }
                    else {
                        break;
                    }
                }
                while (this._mouseY - this._dragStart > this._octaveHeight * 0.5) {
                    if (octave > 0) {
                        octave--;
                        this._dragStart += this._octaveHeight;
                    }
                    else {
                        break;
                    }
                }
                this._change = new beepbox.ChangeOctave(this._doc, oldValue, octave);
                this._doc.setProspectiveChange(this._change);
            }
            if (this._mouseOver)
                this._updatePreview();
        }
        _updatePreview() {
            const showHighlight = this._mouseOver && !this._mouseDown;
            let showUpHighlight = false;
            let showDownHighlight = false;
            let showHandleHighlight = false;
            if (showHighlight) {
                if (this._mouseY < this._barBottom - this._barHeight) {
                    showUpHighlight = true;
                }
                else if (this._mouseY > this._barBottom) {
                    showDownHighlight = true;
                }
                else {
                    showHandleHighlight = true;
                }
            }
            this._upHighlight.style.visibility = showUpHighlight ? "inherit" : "hidden";
            this._downHighlight.style.visibility = showDownHighlight ? "inherit" : "hidden";
            this._handleHighlight.style.visibility = showHandleHighlight ? "inherit" : "hidden";
        }
        _render() {
            this._svg.style.visibility = (this._doc.song.getChannelIsNoise(this._doc.channel)) ? "hidden" : "visible";
            if (this._renderedBarBottom != this._barBottom) {
                this._renderedBarBottom = this._barBottom;
                this._handle.setAttribute("y", "" + (this._barBottom - this._barHeight));
                this._handleHighlight.setAttribute("y", "" + (this._barBottom - this._barHeight));
            }
            this._updatePreview();
        }
    }
    beepbox.OctaveScrollBar = OctaveScrollBar;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    let loadedCount = 0;
    let finishedLoadingImages = false;
    function onLoaded() {
        loadedCount--;
        if (loadedCount <= 0)
            finishedLoadingImages = true;
    }
    function loadImage(src) {
        finishedLoadingImages = false;
        loadedCount++;
        const img = document.createElement("img");
        img.onload = onLoaded;
        img.src = src;
        return img;
    }
    const BlackKey = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAIAAABHKvtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU3RTM2RTg0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU3RTM2RTk0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzYxN0U3RDQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMzYxN0U3RTQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PomGIaQAAABgSURBVHjaYpSWlmZhYWFmZgaSTExMQAYTGGAyIICRkRFIMhANWISFhdlggAUHANrBysoKNBfuCGKMvnjx4r59+xhp5wOg6UCSBM+SB0YtGLVgCFgAzDeMeOSGgAUAAQYAGgwJrOg8pdQAAAAASUVORK5CYII=");
    const BlackKeyDisabled = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAIAAABHKvtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU3RTM2RUM0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU3RTM2RUQ0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RTdFMzZFQTQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RTdFMzZFQjQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhURscAAAAB1SURBVHja7NPBCoAgDAZgnaMX8Oj7P2KKldXPhiR4CwwCv4PInPvxoA0hMLNzDisRYUPCCiMucVallJzzJnaBih5pp2mw936puKEZ2qQ3MeUQmLiKGGNKCZ1IQr2fDnb0C8gMNgNmwA8Cnt/0Tv91vw64BRgALUuP70jrlrwAAAAASUVORK5CYII=");
    const WhiteKey = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAIAAABHKvtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzM2MTdFNzc0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzM2MTdFNzg0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzYxN0U3NTQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMzYxN0U3NjQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgBmMXoAAACTSURBVHja7JQ7CgMhGIT3920M2Hko7+RJPYWViE0myi5sEXAhKQL7FcP8PmawkWKMjx2llNb60MNIKY0xnPPphRDbMsJ7/xw458wAodZa6PRQ5GIF0RjlYCU655xSEqWU3ntrrdb63RcgHcq2H3MX3AV/UEAhBL7DBkTEzmAFuzSY44UC/BDHtU+8z539esFLgAEAkZ4XCDjZXPEAAAAASUVORK5CYII=");
    const WhiteKeyDisabled = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAANCAIAAABHKvtLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzM2MTdFN0I0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzM2MTdFN0M0NzBEMTFFMTgyMjBBREEyQTVGRDY5MjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzYxN0U3OTQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMzYxN0U3QTQ3MEQxMUUxODIyMEFEQTJBNUZENjkyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlZjoH4AAADHSURBVHja7JTNDoMgEIRBGq21iTcfyvd/DeNvJBYBp7uFEE+99NDE70AMMDPLYZRt2z4CeZ4XRcFrRkgphRD7vnvvX8RGdF03DEPf99M0LcuitcamMcZa6wkRuNV1/SSqqroTcC/LEu5KKQ6AEhq21oRzDl5bAME8DUjd3wHjOELPyu9fgNnneV7XNQ6OyNPsTCZ+zBVwBfxBgGyaRgViuWIt+ZIPuAAaZwh00BKxaKeuSfwhUsfI55g+WOMT2DEl3jm94BBgAAtY6T6d3wTNAAAAAElFTkSuQmCC");
    const Drum = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAArCAIAAACW3x1gAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExOUJCOEEzOUJCMkI3MTdFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NzVEOTA1QzQ5MjMxMUUxOTM3RDhDNEI4QkIxQkFCNSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NzVEOTA1QjQ5MjMxMUUxOTM3RDhDNEI4QkIxQkFCNSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAxODAxMTc0MDcyMDY4MTE5QkI4QTM5QkIyQjcxN0U0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAxODAxMTc0MDcyMDY4MTE5QkI4QTM5QkIyQjcxN0U0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+dtFK5QAACbRJREFUeNrcV0lsG9cZnnmzcJdIcRHFRZtly5IVSVYSOcriNY7jqHHTBE2bJkCRNijQQ9re2kOBAj30kByKAm1PvQVF0RYIkLRpkiZuLMqyLVm7bGvlIpKiuHOGyww52+ubIbXYCYLk2P4ccobz3nzf+9f3D4b9rwv+5cOXL5x48crDT54b8Pr6jOZWQJoxKIi13WJ+Oziz+Z/r6x9N3AvMhb42gcWkf/P1Mz/40fkWz2iuAAsFrljkOK5crVYwTNTrcaMRNDURNhtl1Slrn9x55x+zf/5ooVIVvhLBq1ce+eXPLpt6RnZ22EIBmk1Oi8VuMFoMBgNF6RUMF2tcrVqscPlSKcGV4zaC85qNd25u/PHdm/+8tf5lBBRJ/Oan49/98cVEDmcYg9PZ09LSrjcYSRzHcAAxDGBQQfMgJiuyAiFUFMSUT23mtu9YxYxVgX/6YPa3796QZGUfk9i/Mhvo3//8W99443wwKtB0T1fXqM3m0en0iJUgSIIkKYoiKBL9A4QqAEcCSFJnbnI3uboqIpHP7D7T73WYDbfW4+IexwHB22+OX3zpsfAu5nI96vUM0gY9wqN0JEJG2AAATFs7hlABrhKgk3qJQwwCgrY4/ZiuaSceO+VvslkM11Yi9xG8+dLj33/tdDgLPB1POB09JE0RAOESFEEiVOWQaIZBPxCtX2MBUKVRMAXTWZyk2RaPRp440lIV5PngboPgZE/br16/kBJwR9dTTtdxQkejBzUOoHxO4P2CCAgcV+8iDSHUWWyA0ieDa4N++1J4N8VUVMVfvTCEm/S0vc/Z1g9IoKIjU6PHkCBvyrJ63hMJffZ+tQkyDnDVPThR18beM6zvHmky0i8/OYDAwTGvfXz0WKoCXL5BFVv1p0qgmULRMJTD0HVKWdqj1EZVS2meV+MNU1zHTmZE6tLJ7qOeFvLMQ504TRkt3SarC00j1aOBrhmksUxFu4PuNxytAqHAhZj2Bw2h6Kprgym40d5m9PXqmbXTA53gzIA/V+KaXZ3aTBSCuKrpniDMOo+yv/bGr3qCyv46VE8jDVCmIBT0t7mtK1fkn+rzgpPdrWy5arS2qloCXHMWdp8flYatZGVPm7rd7nc6psUV0BgQgsnhYbnacGcr8DltXE3UGZsxFNA4JAgcUzU/RHDoWsOFh2Pp8ES0OnX9anWAtNnK1wSf00paTIZG0UAhV19+4/uAHNCqc2Hj3n2CDCxDWRvU1FCLJuB43qijahyLiFG2wEZ5wr+gLOKac7USUX/+gVlQ1pahsdZKjEFHcxwPWIZpNus5JgUhPICqY+1B4XvAQItHrUjsDR6aiRRT9gAq2USzUccyLNhNpe0WI5uOYFrEoAPDDqHvoSJMcJ8Q+7f3J6rxIGP1hbKJsN1iQOAgtJNutZu5bKjEpmU1HNXQeABcKzsNIfeKqVbv8H0OLbCgamQIuXySS6y7rOZQIgO2M2WsxrealHRsSdEiW5Kkfez6uV47Dyg0+ANzgUbqIAfXDZBZn3eSoiJUorkyoMzW9bW1Tk+LkFtNJ1YQPApESZFAAxqAQ9jEYZK6aKPItJJaPdRPdmupGlnocDWvra4hcHCi7/jdxXtihe3yWFKx2+lsUJZESVKLxAH2F1A0wNEAsrooC5Ko5ggb38wsBbps+mqZXVxZHeg7Dvq7vYlo+c78vN9t7fSARPxmMrmuCKIgSfUqRnwxeEOQZQRBRnpDWcxur6QWPm3XcT67eX5uLrHD93V5SSOsWk2ttwMLNp9rePwiyZbC0Vs8X/R5T+gNFog41F2SOEjdevRrXhVFUS2sklTjSsmt21xw7ogZ8za3XEcyvdzS3KOXeeInlx9iC3IikqkKCZ2ROjr6kKXJVCjsRqMx9CRBGpHBkWXrW1g9nRG0pNpRRGav8Gw6thy995mhuHW81eSxmK4HpiYnrzNFU9+xXp/XQLz8aIel2RqeTZZrNVHYJYDi7u7s6OqkaaJQSEajYYbJ8xwvSgJaLDI3YuW5EsNkc7lIYmchEbtJC9tHHFS/z6GUuclrE4GJwG6BBpJ1bKy3WGXJ5WDs+WfOOX0t+UgmaqieOM1uXP2Xb/iUv+Nhv7+DYYRstlIoZLYj259rvMg2D+mwuq2ohjL81vTC8tQ0hyk7eRpyTd52W09P6/uBKXLmXuSlK7D3VM+tSAZugv7Lb3349otCOe3OxW3+oWb7gNXqwDAdhqHdX0I1BsNQ+8ZjWBXDOHQh88XY3EpoZml1ZjGdLP/ivX9cffcVtKcPDXdStHJ7bZtcjGS2Ntb7xwbDs2F2K4UX37rzMcOOQoN5RSpuNbnnjPYjlMkP6DaIm1AfpDZdQqlWSVVyMSYeTm5sJtZCHMOHd2q7O2T449+hXdPvd5wc7tpYX12OZslIEd6YWe4a7h+8PHT9D5/GVxhXEiTey2eC1aOnnINnUUuUx2vLtIGUqlKVq/FlgWf5ClstM1yF4Zk0F4zUIiGhkiLNgNxeLaDUfvzxXkAIgfmV7TJGcBJGSJUeFz36wllBlP/+6+suknQSlCGthGfyK7PpWKhcydckUYtRHBN5KZ/m4qHS+jK7OFNYmC6mNyRzlTIRSDlseT537uzApUvDk4HAX29s3C2olsUWk9K/r06jPBj94WmlJu68v4RuNpGEkzLCNJbbza98mL4qiowsj35vOLZVWL8VpnFcDwA6/AQt62FVwQSo7iVjj/WOP/fwzVs3PpicvVuAjcarJKhrawM5i8My+NoFqSxVtlKEApE1DQA4KKqd1nXrdb1Gw/jf/jL2/KPyO5+00bSVotCoorkexS9OkWPnB158eWxpbnYiEPgsrmyyh1rHGCOhztkF07SJOHrlrMnTVo3nFKaCdmgSRxs56kXU3a79lZ3NTz/JLORFXkG4yGwSVNFt7Y6nvzM2dubo7NTUxLVrEzH5Zgo+2PyGswJqarwUq0gV92ivf/wSbbFIGRayZVSP1WqM47pHbKH5TC3MCRW5TmBpt498e/TZN85RRHn6s4mF2flAVJ5Mavb6/K6K2pZvPuZ45ZK364jTfXzE2j5EQn95LsyvbJXWQ+VofDIci4vC00d9lMdlOuZ2DHndI242EgqjPJheiCdLE1vVqYSswC99wznVZ33hvOfKxQ5Ts6HJ3X0oD8xaHlQVoVCrJCq5OLMTSm5sJO4FObY6tVqcCnJrWfkrvaPpaXBxzP3sOd9zT3fYXSa9kab0lFhFVRPlAepAahUWJUEV5UE2XZ5azE6vl+YivCDDr/2WOdzfcmqkdWTINXDC4XXpzTqiWq7F42wwyKxuFO5sMneDxc0Ej/0/y38FGACBHjS0mkQ17AAAAABJRU5ErkJggg==");
    class Piano {
        constructor(_doc) {
            this._doc = _doc;
            this._canvas = beepbox.HTML.canvas({ width: "32", height: "481", style: "width: 100%; height: 100%;" });
            this._preview = beepbox.HTML.canvas({ width: "32", height: "40" });
            this.container = beepbox.HTML.div({ style: "width: 32px; height: 100%; overflow:hidden; position: relative; flex-shrink: 0; touch-action: none;" }, this._canvas, this._preview);
            this._graphics = this._canvas.getContext("2d");
            this._previewGraphics = this._preview.getContext("2d");
            this._editorWidth = 32;
            this._editorHeight = 481;
            this._mouseY = 0;
            this._mouseDown = false;
            this._mouseOver = false;
            this._renderedScale = -1;
            this._renderedDrums = false;
            this._renderedKey = -1;
            this._whenMouseOver = (event) => {
                if (this._mouseOver)
                    return;
                this._mouseOver = true;
                this._updatePreview();
            };
            this._whenMouseOut = (event) => {
                if (!this._mouseOver)
                    return;
                this._mouseOver = false;
                this._updatePreview();
            };
            this._whenMousePressed = (event) => {
                event.preventDefault();
                this._mouseDown = true;
                const boundingRect = this._canvas.getBoundingClientRect();
                this._mouseY = ((event.clientY || event.pageY) - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._doc.synth.liveInputPressed = true;
                this._updatePreview();
            };
            this._whenMouseMoved = (event) => {
                const boundingRect = this._canvas.getBoundingClientRect();
                this._mouseY = ((event.clientY || event.pageY) - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._updateCursorPitch();
                this._doc.synth.liveInputPitches[0] = this._cursorPitch + this._doc.song.channels[this._doc.channel].octave * 12;
                this._updatePreview();
            };
            this._whenMouseReleased = (event) => {
                this._mouseDown = false;
                this._doc.synth.liveInputPressed = false;
                this._updatePreview();
            };
            this._whenTouchPressed = (event) => {
                event.preventDefault();
                this._mouseDown = true;
                const boundingRect = this._canvas.getBoundingClientRect();
                this._mouseY = (event.touches[0].clientY - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._updateCursorPitch();
                this._doc.synth.liveInputPressed = true;
                this._doc.synth.liveInputPitches[0] = this._cursorPitch + this._doc.song.channels[this._doc.channel].octave * 12;
            };
            this._whenTouchMoved = (event) => {
                event.preventDefault();
                const boundingRect = this._canvas.getBoundingClientRect();
                this._mouseY = (event.touches[0].clientY - boundingRect.top) * this._editorHeight / (boundingRect.bottom - boundingRect.top);
                if (isNaN(this._mouseY))
                    this._mouseY = 0;
                this._updateCursorPitch();
                this._doc.synth.liveInputPitches[0] = this._cursorPitch + this._doc.song.channels[this._doc.channel].octave * 12;
            };
            this._whenTouchReleased = (event) => {
                event.preventDefault();
                this._doc.synth.liveInputPressed = false;
            };
            this._documentChanged = () => {
                const isDrum = this._doc.song.getChannelIsNoise(this._doc.channel);
                this._pitchHeight = isDrum ? 40 : 13;
                this._pitchCount = isDrum ? beepbox.Config.drumCount : beepbox.Config.windowPitchCount;
                this._updateCursorPitch();
                this._doc.synth.liveInputPitches[0] = this._cursorPitch + this._doc.song.channels[this._doc.channel].octave * 12;
                this._doc.synth.liveInputChannel = this._doc.channel;
                this._render();
            };
            this._render = () => {
                if (!finishedLoadingImages) {
                    window.requestAnimationFrame(this._render);
                    return;
                }
                if (!this._doc.showLetters)
                    return;
                const isDrum = this._doc.song.getChannelIsNoise(this._doc.channel);
                if (this._renderedScale == this._doc.song.scale && this._renderedKey == this._doc.song.key && this._renderedDrums == isDrum)
                    return;
                this._renderedScale = this._doc.song.scale;
                this._renderedKey = this._doc.song.key;
                this._renderedDrums = isDrum;
                this._graphics.clearRect(0, 0, this._editorWidth, this._editorHeight);
                let key;
                for (let j = 0; j < this._pitchCount; j++) {
                    const pitchNameIndex = (j + beepbox.Config.keys[this._doc.song.key].basePitch) % 12;
                    if (isDrum) {
                        key = Drum;
                        const scale = 1.0 - (j / this._pitchCount) * 0.35;
                        const offset = (1.0 - scale) * 0.5;
                        const x = key.width * offset;
                        const y = key.height * offset + this._pitchHeight * (this._pitchCount - j - 1);
                        const w = key.width * scale;
                        const h = key.height * scale;
                        this._graphics.drawImage(key, x, y, w, h);
                        const brightness = 1.0 + ((j - this._pitchCount / 2.0) / this._pitchCount) * 0.5;
                        const imageData = this._graphics.getImageData(x, y, w, h);
                        const data = imageData.data;
                        for (let i = 0; i < data.length; i += 4) {
                            data[i + 0] *= brightness;
                            data[i + 1] *= brightness;
                            data[i + 2] *= brightness;
                        }
                        this._graphics.putImageData(imageData, x, y);
                    }
                    else if (!beepbox.Config.scales[this._doc.song.scale].flags[j % 12]) {
                        key = beepbox.Config.keys[pitchNameIndex].isWhiteKey ? WhiteKeyDisabled : BlackKeyDisabled;
                        this._graphics.drawImage(key, 0, this._pitchHeight * (this._pitchCount - j - 1));
                    }
                    else {
                        let text;
                        if (beepbox.Config.keys[pitchNameIndex].isWhiteKey) {
                            text = beepbox.Config.keys[pitchNameIndex].name;
                        }
                        else {
                            const shiftDir = beepbox.Config.blackKeyNameParents[j % 12];
                            text = beepbox.Config.keys[(pitchNameIndex + 12 + shiftDir) % 12].name;
                            if (shiftDir == 1) {
                                text += "â™­";
                            }
                            else if (shiftDir == -1) {
                                text += "â™¯";
                            }
                        }
                        const textColor = beepbox.Config.keys[pitchNameIndex].isWhiteKey ? "#000000" : "#ffffff";
                        key = beepbox.Config.keys[pitchNameIndex].isWhiteKey ? WhiteKey : BlackKey;
                        this._graphics.drawImage(key, 0, this._pitchHeight * (this._pitchCount - j - 1));
                        this._graphics.font = "bold 11px sans-serif";
                        this._graphics.fillStyle = textColor;
                        this._graphics.fillText(text, 15, this._pitchHeight * (this._pitchCount - j) - 3);
                    }
                }
                this._updatePreview();
            };
            this._doc.notifier.watch(this._documentChanged);
            this._documentChanged();
            this.container.addEventListener("mousedown", this._whenMousePressed);
            document.addEventListener("mousemove", this._whenMouseMoved);
            document.addEventListener("mouseup", this._whenMouseReleased);
            this.container.addEventListener("mouseover", this._whenMouseOver);
            this.container.addEventListener("mouseout", this._whenMouseOut);
            this.container.addEventListener("touchstart", this._whenTouchPressed);
            this.container.addEventListener("touchmove", this._whenTouchMoved);
            this.container.addEventListener("touchend", this._whenTouchReleased);
            this.container.addEventListener("touchcancel", this._whenTouchReleased);
        }
        _updateCursorPitch() {
            const scale = beepbox.Config.scales[this._doc.song.scale].flags;
            const mousePitch = Math.max(0, Math.min(this._pitchCount - 1, this._pitchCount - (this._mouseY / this._pitchHeight)));
            if (scale[Math.floor(mousePitch) % 12] || this._doc.song.getChannelIsNoise(this._doc.channel)) {
                this._cursorPitch = Math.floor(mousePitch);
            }
            else {
                let topPitch = Math.floor(mousePitch) + 1;
                let bottomPitch = Math.floor(mousePitch) - 1;
                while (!scale[topPitch % 12]) {
                    topPitch++;
                }
                while (!scale[(bottomPitch) % 12]) {
                    bottomPitch--;
                }
                let topRange = topPitch;
                let bottomRange = bottomPitch + 1;
                if (topPitch % 12 == 0 || topPitch % 12 == 7) {
                    topRange -= 0.5;
                }
                if (bottomPitch % 12 == 0 || bottomPitch % 12 == 7) {
                    bottomRange += 0.5;
                }
                this._cursorPitch = mousePitch - bottomRange > topRange - mousePitch ? topPitch : bottomPitch;
            }
        }
        _updatePreview() {
            this._preview.style.visibility = (!this._mouseOver || this._mouseDown) ? "hidden" : "visible";
            if (!this._mouseOver || this._mouseDown)
                return;
            this._previewGraphics.clearRect(0, 0, 32, 40);
            this._preview.style.left = "0px";
            this._preview.style.top = this._pitchHeight * (this._pitchCount - this._cursorPitch - 1) + "px";
            this._previewGraphics.lineWidth = 2;
            this._previewGraphics.strokeStyle = "#ffffff";
            this._previewGraphics.strokeRect(1, 1, this._editorWidth - 2, this._pitchHeight - 2);
        }
    }
    beepbox.Piano = Piano;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const { button, div, span, h2, input, br, select, option } = beepbox.HTML;
    class BeatsPerBarPrompt {
        constructor(_doc) {
            this._doc = _doc;
            this._beatsStepper = input({ style: "width: 3em; margin-left: 1em;", type: "number", step: "1" });
            this._conversionStrategySelect = select({ style: "width: 100%;" }, option({ value: "splice" }, "Splice beats at end of bars."), option({ value: "stretch" }, "Stretch notes to fit in bars."), option({ value: "overflow" }, "Overflow notes across bars."));
            this._cancelButton = button({ className: "cancelButton" });
            this._okayButton = button({ className: "okayButton", style: "width:45%;" }, "Okay");
            this.container = div({ className: "prompt noSelection", style: "width: 250px;" }, h2("Beats Per Bar"), div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" }, div({ style: "text-align: right;" }, "Beats per bar:", br(), span({ style: "font-size: smaller; color: #888888;" }, "(Multiples of 3 or 4 are recommended)")), this._beatsStepper), div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" }, div({ className: "selectContainer", style: "width: 100%;" }, this._conversionStrategySelect)), div({ style: "display: flex; flex-direction: row-reverse; justify-content: space-between;" }, this._okayButton), this._cancelButton);
            this._close = () => {
                this._doc.undo();
            };
            this.cleanUp = () => {
                this._okayButton.removeEventListener("click", this._saveChanges);
                this._cancelButton.removeEventListener("click", this._close);
                this._beatsStepper.removeEventListener("keypress", BeatsPerBarPrompt._validateKey);
                this._beatsStepper.removeEventListener("blur", BeatsPerBarPrompt._validateNumber);
                this.container.removeEventListener("keydown", this._whenKeyPressed);
            };
            this._whenKeyPressed = (event) => {
                if (event.target.tagName != "BUTTON" && event.keyCode == 13) {
                    this._saveChanges();
                }
            };
            this._saveChanges = () => {
                window.localStorage.setItem("beatCountStrategy", this._conversionStrategySelect.value);
                this._doc.prompt = null;
                this._doc.record(new beepbox.ChangeBeatsPerBar(this._doc, BeatsPerBarPrompt._validate(this._beatsStepper), this._conversionStrategySelect.value), "replace");
            };
            this._beatsStepper.value = this._doc.song.beatsPerBar + "";
            this._beatsStepper.min = beepbox.Config.beatsPerBarMin + "";
            this._beatsStepper.max = beepbox.Config.beatsPerBarMax + "";
            const lastStrategy = window.localStorage.getItem("beatCountStrategy");
            if (lastStrategy != null) {
                this._conversionStrategySelect.value = lastStrategy;
            }
            this._beatsStepper.select();
            setTimeout(() => this._beatsStepper.focus());
            this._okayButton.addEventListener("click", this._saveChanges);
            this._cancelButton.addEventListener("click", this._close);
            this._beatsStepper.addEventListener("keypress", BeatsPerBarPrompt._validateKey);
            this._beatsStepper.addEventListener("blur", BeatsPerBarPrompt._validateNumber);
            this.container.addEventListener("keydown", this._whenKeyPressed);
        }
        static _validateKey(event) {
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
                return true;
            }
            return false;
        }
        static _validateNumber(event) {
            const input = event.target;
            input.value = Math.floor(Math.max(Number(input.min), Math.min(Number(input.max), Number(input.value)))) + "";
        }
        static _validate(input) {
            return Math.floor(Number(input.value));
        }
    }
    beepbox.BeatsPerBarPrompt = BeatsPerBarPrompt;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const { button, div, span, h2, input, br, select, option } = beepbox.HTML;
    class MoveNotesSidewaysPrompt {
        constructor(_doc) {
            this._doc = _doc;
            this._beatsStepper = input({ style: "width: 3em; margin-left: 1em;", type: "number", step: "0.01", value: "0" });
            this._conversionStrategySelect = select({ style: "width: 100%;" }, option({ value: "overflow" }, "Overflow notes across bars."), option({ value: "wrapAround" }, "Wrap notes around within bars."));
            this._cancelButton = button({ className: "cancelButton" });
            this._okayButton = button({ className: "okayButton", style: "width:45%;" }, "Okay");
            this.container = div({ className: "prompt noSelection", style: "width: 250px;" }, h2("Move Notes Sideways"), div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" }, div({ style: "text-align: right;" }, "Beats to move:", br(), span({ style: "font-size: smaller; color: #888888;" }, "(Negative is left, positive is right)")), this._beatsStepper), div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" }, div({ className: "selectContainer", style: "width: 100%;" }, this._conversionStrategySelect)), div({ style: "display: flex; flex-direction: row-reverse; justify-content: space-between;" }, this._okayButton), this._cancelButton);
            this._close = () => {
                this._doc.undo();
            };
            this.cleanUp = () => {
                this._okayButton.removeEventListener("click", this._saveChanges);
                this._cancelButton.removeEventListener("click", this._close);
                this._beatsStepper.removeEventListener("blur", MoveNotesSidewaysPrompt._validateNumber);
                this.container.removeEventListener("keydown", this._whenKeyPressed);
            };
            this._whenKeyPressed = (event) => {
                if (event.target.tagName != "BUTTON" && event.keyCode == 13) {
                    this._saveChanges();
                }
            };
            this._saveChanges = () => {
                window.localStorage.setItem("moveNotesSidewaysStrategy", this._conversionStrategySelect.value);
                this._doc.prompt = null;
                this._doc.record(new beepbox.ChangeMoveNotesSideways(this._doc, +this._beatsStepper.value, this._conversionStrategySelect.value), "replace");
            };
            this._beatsStepper.min = (-this._doc.song.beatsPerBar) + "";
            this._beatsStepper.max = this._doc.song.beatsPerBar + "";
            const lastStrategy = window.localStorage.getItem("moveNotesSidewaysStrategy");
            if (lastStrategy != null) {
                this._conversionStrategySelect.value = lastStrategy;
            }
            this._beatsStepper.select();
            setTimeout(() => this._beatsStepper.focus());
            this._okayButton.addEventListener("click", this._saveChanges);
            this._cancelButton.addEventListener("click", this._close);
            this._beatsStepper.addEventListener("blur", MoveNotesSidewaysPrompt._validateNumber);
            this.container.addEventListener("keydown", this._whenKeyPressed);
        }
        static _validateNumber(event) {
            const input = event.target;
            let value = +input.value;
            value = Math.round(value * beepbox.Config.partsPerBeat) / beepbox.Config.partsPerBeat;
            value = Math.round(value * 100) / 100;
            input.value = Math.max(+input.min, Math.min(+input.max, value)) + "";
        }
    }
    beepbox.MoveNotesSidewaysPrompt = MoveNotesSidewaysPrompt;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const { button, div, span, h2, input, br, select, option } = beepbox.HTML;
    class SongDurationPrompt {
        constructor(_doc) {
            this._doc = _doc;
            this._barsStepper = input({ style: "width: 3em; margin-left: 1em;", type: "number", step: "1" });
            this._positionSelect = select({ style: "width: 100%;" }, option({ value: "end" }, "Apply change at end of song."), option({ value: "beginning" }, "Apply change at beginning of song."));
            this._cancelButton = button({ className: "cancelButton" });
            this._okayButton = button({ className: "okayButton", style: "width:45%;" }, "Okay");
            this.container = div({ className: "prompt noSelection", style: "width: 250px;" }, h2("Song Length"), div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" }, div({ style: "display: inline-block; text-align: right;" }, "Bars per song:", br(), span({ style: "font-size: smaller; color: #888888;" }, "(Multiples of 4 are recommended)")), this._barsStepper), div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" }, div({ className: "selectContainer", style: "width: 100%;" }, this._positionSelect)), div({ style: "display: flex; flex-direction: row-reverse; justify-content: space-between;" }, this._okayButton), this._cancelButton);
            this._close = () => {
                this._doc.undo();
            };
            this.cleanUp = () => {
                this._okayButton.removeEventListener("click", this._saveChanges);
                this._cancelButton.removeEventListener("click", this._close);
                this._barsStepper.removeEventListener("keypress", SongDurationPrompt._validateKey);
                this._barsStepper.removeEventListener("blur", SongDurationPrompt._validateNumber);
                this.container.removeEventListener("keydown", this._whenKeyPressed);
            };
            this._whenKeyPressed = (event) => {
                if (event.target.tagName != "BUTTON" && event.keyCode == 13) {
                    this._saveChanges();
                }
            };
            this._saveChanges = () => {
                window.localStorage.setItem("barCountPosition", this._positionSelect.value);
                const group = new beepbox.ChangeGroup();
                group.append(new beepbox.ChangeBarCount(this._doc, SongDurationPrompt._validate(this._barsStepper), this._positionSelect.value == "beginning"));
                this._doc.prompt = null;
                this._doc.record(group, "replace");
            };
            this._barsStepper.value = this._doc.song.barCount + "";
            this._barsStepper.min = beepbox.Config.barCountMin + "";
            this._barsStepper.max = beepbox.Config.barCountMax + "";
            const lastPosition = window.localStorage.getItem("barCountPosition");
            if (lastPosition != null) {
                this._positionSelect.value = lastPosition;
            }
            this._barsStepper.select();
            setTimeout(() => this._barsStepper.focus());
            this._okayButton.addEventListener("click", this._saveChanges);
            this._cancelButton.addEventListener("click", this._close);
            this._barsStepper.addEventListener("keypress", SongDurationPrompt._validateKey);
            this._barsStepper.addEventListener("blur", SongDurationPrompt._validateNumber);
            this.container.addEventListener("keydown", this._whenKeyPressed);
        }
        static _validateKey(event) {
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
                return true;
            }
            return false;
        }
        static _validateNumber(event) {
            const input = event.target;
            input.value = Math.floor(Math.max(Number(input.min), Math.min(Number(input.max), Number(input.value)))) + "";
        }
        static _validate(input) {
            return Math.floor(Number(input.value));
        }
    }
    beepbox.SongDurationPrompt = SongDurationPrompt;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const { button, div, h2, input } = beepbox.HTML;
    class ChannelSettingsPrompt {
        constructor(_doc) {
            this._doc = _doc;
            this._patternsStepper = input({ style: "width: 3em; margin-left: 1em;", type: "number", step: "1" });
            this._instrumentsStepper = input({ style: "width: 3em; margin-left: 1em;", type: "number", step: "1" });
            this._pitchChannelStepper = input({ style: "width: 3em; margin-left: 1em;", type: "number", step: "1" });
            this._drumChannelStepper = input({ style: "width: 3em; margin-left: 1em;", type: "number", step: "1" });
            this._cancelButton = button({ className: "cancelButton" });
            this._okayButton = button({ className: "okayButton", style: "width:45%;" }, "Okay");
            this.container = div({ className: "prompt noSelection", style: "width: 250px;" }, h2("Channel Settings"), div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" }, "Pitch channels:", this._pitchChannelStepper), div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" }, "Drum channels:", this._drumChannelStepper), div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" }, "Patterns per channel:", this._patternsStepper), div({ style: "display: flex; flex-direction: row; align-items: center; height: 2em; justify-content: flex-end;" }, "Instruments per channel:", this._instrumentsStepper), div({ style: "display: flex; flex-direction: row-reverse; justify-content: space-between;" }, this._okayButton), this._cancelButton);
            this._close = () => {
                this._doc.undo();
            };
            this.cleanUp = () => {
                this._okayButton.removeEventListener("click", this._saveChanges);
                this._cancelButton.removeEventListener("click", this._close);
                this._patternsStepper.removeEventListener("keypress", ChannelSettingsPrompt._validateKey);
                this._instrumentsStepper.removeEventListener("keypress", ChannelSettingsPrompt._validateKey);
                this._pitchChannelStepper.removeEventListener("keypress", ChannelSettingsPrompt._validateKey);
                this._drumChannelStepper.removeEventListener("keypress", ChannelSettingsPrompt._validateKey);
                this._patternsStepper.removeEventListener("blur", ChannelSettingsPrompt._validateNumber);
                this._instrumentsStepper.removeEventListener("blur", ChannelSettingsPrompt._validateNumber);
                this._pitchChannelStepper.removeEventListener("blur", ChannelSettingsPrompt._validateNumber);
                this._drumChannelStepper.removeEventListener("blur", ChannelSettingsPrompt._validateNumber);
                this.container.removeEventListener("keydown", this._whenKeyPressed);
            };
            this._whenKeyPressed = (event) => {
                if (event.target.tagName != "BUTTON" && event.keyCode == 13) {
                    this._saveChanges();
                }
            };
            this._saveChanges = () => {
                const group = new beepbox.ChangeGroup();
                group.append(new beepbox.ChangePatternsPerChannel(this._doc, ChannelSettingsPrompt._validate(this._patternsStepper)));
                group.append(new beepbox.ChangeInstrumentsPerChannel(this._doc, ChannelSettingsPrompt._validate(this._instrumentsStepper)));
                group.append(new beepbox.ChangeChannelCount(this._doc, ChannelSettingsPrompt._validate(this._pitchChannelStepper), ChannelSettingsPrompt._validate(this._drumChannelStepper)));
                this._doc.prompt = null;
                this._doc.record(group, "replace");
            };
            this._patternsStepper.value = this._doc.song.patternsPerChannel + "";
            this._patternsStepper.min = "1";
            this._patternsStepper.max = beepbox.Config.barCountMax + "";
            this._instrumentsStepper.value = this._doc.song.instrumentsPerChannel + "";
            this._instrumentsStepper.min = beepbox.Config.instrumentsPerChannelMin + "";
            this._instrumentsStepper.max = beepbox.Config.instrumentsPerChannelMax + "";
            this._pitchChannelStepper.value = this._doc.song.pitchChannelCount + "";
            this._pitchChannelStepper.min = beepbox.Config.pitchChannelCountMin + "";
            this._pitchChannelStepper.max = beepbox.Config.pitchChannelCountMax + "";
            this._drumChannelStepper.value = this._doc.song.noiseChannelCount + "";
            this._drumChannelStepper.min = beepbox.Config.noiseChannelCountMin + "";
            this._drumChannelStepper.max = beepbox.Config.noiseChannelCountMax + "";
            this._pitchChannelStepper.select();
            setTimeout(() => this._pitchChannelStepper.focus());
            this._okayButton.addEventListener("click", this._saveChanges);
            this._cancelButton.addEventListener("click", this._close);
            this._patternsStepper.addEventListener("keypress", ChannelSettingsPrompt._validateKey);
            this._instrumentsStepper.addEventListener("keypress", ChannelSettingsPrompt._validateKey);
            this._pitchChannelStepper.addEventListener("keypress", ChannelSettingsPrompt._validateKey);
            this._drumChannelStepper.addEventListener("keypress", ChannelSettingsPrompt._validateKey);
            this._patternsStepper.addEventListener("blur", ChannelSettingsPrompt._validateNumber);
            this._instrumentsStepper.addEventListener("blur", ChannelSettingsPrompt._validateNumber);
            this._pitchChannelStepper.addEventListener("blur", ChannelSettingsPrompt._validateNumber);
            this._drumChannelStepper.addEventListener("blur", ChannelSettingsPrompt._validateNumber);
            this.container.addEventListener("keydown", this._whenKeyPressed);
        }
        static _validateKey(event) {
            const charCode = (event.which) ? event.which : event.keyCode;
            if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
                return true;
            }
            return false;
        }
        static _validateNumber(event) {
            const input = event.target;
            input.value = Math.floor(Math.max(Number(input.min), Math.min(Number(input.max), Number(input.value)))) + "";
        }
        static _validate(input) {
            return Math.floor(Number(input.value));
        }
    }
    beepbox.ChannelSettingsPrompt = ChannelSettingsPrompt;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    function transfer(source, length) {
        const dest = new ArrayBuffer(length);
        let nextOffset = 0;
        let leftBytes = Math.min(source.byteLength, dest.byteLength);
        const wordSizes = [8, 4, 2, 1];
        for (const wordSize of wordSizes) {
            if (leftBytes >= wordSize) {
                const done = transferWith(wordSize, source, dest, nextOffset, leftBytes);
                nextOffset = done.nextOffset;
                leftBytes = done.leftBytes;
            }
        }
        return dest;
        function transferWith(wordSize, source, dest, nextOffset, leftBytes) {
            let ViewClass = Uint8Array;
            switch (wordSize) {
                case 8:
                    ViewClass = Float64Array;
                    break;
                case 4:
                    ViewClass = Float32Array;
                    break;
                case 2:
                    ViewClass = Uint16Array;
                    break;
                case 1:
                    ViewClass = Uint8Array;
                    break;
                default:
                    ViewClass = Uint8Array;
                    break;
            }
            const view_source = new ViewClass(source, nextOffset, (leftBytes / wordSize) | 0);
            const view_dest = new ViewClass(dest, nextOffset, (leftBytes / wordSize) | 0);
            for (let i = 0; i < view_dest.length; i++) {
                view_dest[i] = view_source[i];
            }
            return {
                nextOffset: view_source.byteOffset + view_source.byteLength,
                leftBytes: leftBytes - view_dest.length * wordSize,
            };
        }
    }
    class ArrayBufferWriter {
        constructor(initialCapacity) {
            this._writeIndex = 0;
            this._fileSize = 0;
            this._arrayBuffer = new ArrayBuffer(initialCapacity);
            this._data = new DataView(this._arrayBuffer);
        }
        _addBytes(numBytes) {
            this._fileSize += numBytes;
            if (this._fileSize > this._arrayBuffer.byteLength) {
                this._arrayBuffer = transfer(this._arrayBuffer, Math.max(this._arrayBuffer.byteLength * 2, this._fileSize));
                this._data = new DataView(this._arrayBuffer);
            }
        }
        getWriteIndex() {
            return this._writeIndex;
        }
        rewriteUint32(index, value) {
            this._data.setUint32(index, value >>> 0, false);
        }
        writeUint32(value) {
            value = value >>> 0;
            this._addBytes(4);
            this._data.setUint32(this._writeIndex, value, false);
            this._writeIndex = this._fileSize;
        }
        writeUint24(value) {
            value = value >>> 0;
            this._addBytes(3);
            this._data.setUint8(this._writeIndex, (value >> 16) & 0xff);
            this._data.setUint8(this._writeIndex + 1, (value >> 8) & 0xff);
            this._data.setUint8(this._writeIndex + 2, (value) & 0xff);
            this._writeIndex = this._fileSize;
        }
        writeUint16(value) {
            value = value >>> 0;
            this._addBytes(2);
            this._data.setUint16(this._writeIndex, value, false);
            this._writeIndex = this._fileSize;
        }
        writeUint8(value) {
            value = value >>> 0;
            this._addBytes(1);
            this._data.setUint8(this._writeIndex, value);
            this._writeIndex = this._fileSize;
        }
        writeInt8(value) {
            value = value | 0;
            this._addBytes(1);
            this._data.setInt8(this._writeIndex, value);
            this._writeIndex = this._fileSize;
        }
        writeMidi7Bits(value) {
            value = value >>> 0;
            if (value >= 0x80)
                throw new Error("7 bit value contained 8th bit!");
            this._addBytes(1);
            this._data.setUint8(this._writeIndex, value);
            this._writeIndex = this._fileSize;
        }
        writeMidiVariableLength(value) {
            value = value >>> 0;
            if (value > 0x0fffffff)
                throw new Error("writeVariableLength value too big.");
            let startWriting = false;
            for (let i = 0; i < 4; i++) {
                const shift = 21 - i * 7;
                const bits = (value >>> shift) & 0x7f;
                if (bits != 0 || i == 3)
                    startWriting = true;
                if (startWriting)
                    this.writeUint8((i == 3 ? 0x00 : 0x80) | bits);
            }
        }
        writeMidiAscii(string) {
            this.writeMidiVariableLength(string.length);
            for (let i = 0; i < string.length; i++) {
                const charCode = string.charCodeAt(i);
                if (charCode > 0x7f)
                    throw new Error("Trying to write unicode character as ascii.");
                this.writeUint8(charCode);
            }
        }
        toCompactArrayBuffer() {
            return transfer(this._arrayBuffer, this._fileSize);
        }
    }
    beepbox.ArrayBufferWriter = ArrayBufferWriter;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    beepbox.defaultMidiExpression = 0x7F;
    beepbox.defaultMidiPitchBend = 0x2000;
    beepbox.analogousDrumMap = {
        35: { frequency: 0, duration: 2, volume: 3 },
        36: { frequency: 0, duration: 2, volume: 3 },
        37: { frequency: 5, duration: 1, volume: 3 },
        38: { frequency: 4, duration: 2, volume: 3 },
        39: { frequency: 5, duration: 2, volume: 3 },
        40: { frequency: 4, duration: 2, volume: 3 },
        41: { frequency: 1, duration: 2, volume: 3 },
        42: { frequency: 8, duration: 1, volume: 3 },
        43: { frequency: 1, duration: 2, volume: 3 },
        44: { frequency: 8, duration: 1, volume: 2 },
        45: { frequency: 2, duration: 2, volume: 3 },
        46: { frequency: 8, duration: 4, volume: 3 },
        47: { frequency: 2, duration: 2, volume: 3 },
        48: { frequency: 3, duration: 2, volume: 3 },
        49: { frequency: 7, duration: 4, volume: 3 },
        50: { frequency: 3, duration: 2, volume: 3 },
        51: { frequency: 6, duration: 4, volume: 2 },
        52: { frequency: 7, duration: 4, volume: 3 },
        53: { frequency: 6, duration: 2, volume: 3 },
        54: { frequency: 11, duration: 2, volume: 3 },
        55: { frequency: 9, duration: 4, volume: 3 },
        56: { frequency: 7, duration: 1, volume: 2 },
        57: { frequency: 7, duration: 4, volume: 3 },
        58: { frequency: 10, duration: 2, volume: 2 },
        59: { frequency: 6, duration: 4, volume: 3 },
        69: { frequency: 10, duration: 2, volume: 3 },
        70: { frequency: 10, duration: 2, volume: 3 },
        73: { frequency: 10, duration: 1, volume: 2 },
        74: { frequency: 10, duration: 2, volume: 2 },
    };
    function midiVolumeToVolumeMult(volume) {
        return Math.pow(volume / 127, 4.0) / 0.3844015376046128;
    }
    beepbox.midiVolumeToVolumeMult = midiVolumeToVolumeMult;
    function volumeMultToMidiVolume(volumeMult) {
        return Math.pow(volumeMult * 0.3844015376046128, 0.25) * 127;
    }
    beepbox.volumeMultToMidiVolume = volumeMultToMidiVolume;
    function midiExpressionToVolumeMult(expression) {
        return Math.pow(expression / 127, 4.0);
    }
    beepbox.midiExpressionToVolumeMult = midiExpressionToVolumeMult;
    function volumeMultToMidiExpression(volumeMult) {
        return Math.pow(volumeMult, 0.25) * 127;
    }
    beepbox.volumeMultToMidiExpression = volumeMultToMidiExpression;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const { button, div, h2, input, select, option } = beepbox.HTML;
    function lerp(low, high, t) {
        return low + t * (high - low);
    }
    function save(blob, name) {
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, name);
            return;
        }
        const anchor = document.createElement("a");
        if (anchor.download != undefined) {
            const url = URL.createObjectURL(blob);
            setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
            anchor.href = url;
            anchor.download = name;
            setTimeout(function () { anchor.dispatchEvent(new MouseEvent("click")); }, 0);
        }
        else {
            const url = URL.createObjectURL(blob);
            setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
            if (!window.open(url, "_blank"))
                window.location.href = url;
        }
    }
    class ExportPrompt {
        constructor(_doc) {
            this._doc = _doc;
            this._fileName = input({ type: "text", style: "width: 10em;", value: "BeepBox-Song", maxlength: 250, "autofocus": "autofocus" });
            this._enableIntro = input({ type: "checkbox" });
            this._loopDropDown = input({ style: "width: 2em;", type: "number", min: "1", max: "4", step: "1" });
            this._enableOutro = input({ type: "checkbox" });
            this._formatSelect = select({ style: "width: 100%;" }, option({ value: "wav" }, "Export to .wav file."), option({ value: "midi" }, "Export to .mid file."), option({ value: "json" }, "Export to .json file."));
            this._cancelButton = button({ className: "cancelButton" });
            this._exportButton = button({ className: "exportButton", style: "width:45%;" }, "Export");
            this.container = div({ className: "prompt noSelection", style: "width: 200px;" }, h2("Export Options"), div({ style: "display: flex; flex-direction: row; align-items: center; justify-content: space-between;" }, "File name:", this._fileName), div({ style: "display: table; width: 100%;" }, div({ style: "display: table-row;" }, div({ style: "display: table-cell;" }, "Intro:"), div({ style: "display: table-cell;" }, "Loop Count:"), div({ style: "display: table-cell;" }, "Outro:")), div({ style: "display: table-row;" }, div({ style: "display: table-cell; vertical-align: middle;" }, this._enableIntro), div({ style: "display: table-cell; vertical-align: middle;" }, this._loopDropDown), div({ style: "display: table-cell; vertical-align: middle;" }, this._enableOutro))), div({ className: "selectContainer", style: "width: 100%;" }, this._formatSelect), div({ style: "display: flex; flex-direction: row-reverse; justify-content: space-between;" }, this._exportButton), this._cancelButton);
            this._close = () => {
                this._doc.undo();
            };
            this.cleanUp = () => {
                this._fileName.removeEventListener("input", ExportPrompt._validateFileName);
                this._loopDropDown.removeEventListener("blur", ExportPrompt._validateNumber);
                this._exportButton.removeEventListener("click", this._export);
                this._cancelButton.removeEventListener("click", this._close);
                this.container.removeEventListener("keydown", this._whenKeyPressed);
            };
            this._whenKeyPressed = (event) => {
                if (event.target.tagName != "BUTTON" && event.keyCode == 13) {
                    this._export();
                }
            };
            this._export = () => {
                window.localStorage.setItem("exportFormat", this._formatSelect.value);
                switch (this._formatSelect.value) {
                    case "wav":
                        this._exportToWav();
                        break;
                    case "midi":
                        this._exportToMidi();
                        break;
                    case "json":
                        this._exportToJson();
                        break;
                    default:
                        throw new Error("Unhandled file export type.");
                }
            };
            this._loopDropDown.value = "1";
            if (this._doc.song.loopStart == 0) {
                this._enableIntro.checked = false;
                this._enableIntro.disabled = true;
            }
            else {
                this._enableIntro.checked = true;
                this._enableIntro.disabled = false;
            }
            if (this._doc.song.loopStart + this._doc.song.loopLength == this._doc.song.barCount) {
                this._enableOutro.checked = false;
                this._enableOutro.disabled = true;
            }
            else {
                this._enableOutro.checked = true;
                this._enableOutro.disabled = false;
            }
            const lastExportFormat = window.localStorage.getItem("exportFormat");
            if (lastExportFormat != null) {
                this._formatSelect.value = lastExportFormat;
            }
            this._fileName.select();
            setTimeout(() => this._fileName.focus());
            this._fileName.addEventListener("input", ExportPrompt._validateFileName);
            this._loopDropDown.addEventListener("blur", ExportPrompt._validateNumber);
            this._exportButton.addEventListener("click", this._export);
            this._cancelButton.addEventListener("click", this._close);
            this.container.addEventListener("keydown", this._whenKeyPressed);
        }
        static _validateFileName(event) {
            const input = event.target;
            const deleteChars = /[\+\*\$\?\|\{\}\\\/<>#%!`&'"=:@]/gi;
            if (deleteChars.test(input.value)) {
                let cursorPos = input.selectionStart;
                input.value = input.value.replace(deleteChars, "");
                cursorPos--;
                input.setSelectionRange(cursorPos, cursorPos);
            }
        }
        static _validateNumber(event) {
            const input = event.target;
            input.value = Math.floor(Math.max(Number(input.min), Math.min(Number(input.max), Number(input.value)))) + "";
        }
        _exportToWav() {
            const synth = new beepbox.Synth(this._doc.song);
            synth.loopRepeatCount = Number(this._loopDropDown.value) - 1;
            if (!this._enableIntro.checked) {
                for (let introIter = 0; introIter < this._doc.song.loopStart; introIter++) {
                    synth.nextBar();
                }
            }
            const sampleFrames = synth.getSamplesPerBar() * synth.getTotalBars(this._enableIntro.checked, this._enableOutro.checked);
            const recordedSamplesL = new Float32Array(sampleFrames);
            const recordedSamplesR = new Float32Array(sampleFrames);
            synth.synthesize(recordedSamplesL, recordedSamplesR, sampleFrames);
            const wavChannelCount = 2;
            const sampleRate = 44100;
            const bytesPerSample = 2;
            const bitsPerSample = 8 * bytesPerSample;
            const sampleCount = wavChannelCount * sampleFrames;
            const totalFileSize = 44 + sampleCount * bytesPerSample;
            let index = 0;
            const arrayBuffer = new ArrayBuffer(totalFileSize);
            const data = new DataView(arrayBuffer);
            data.setUint32(index, 0x52494646, false);
            index += 4;
            data.setUint32(index, 36 + sampleCount * bytesPerSample, true);
            index += 4;
            data.setUint32(index, 0x57415645, false);
            index += 4;
            data.setUint32(index, 0x666D7420, false);
            index += 4;
            data.setUint32(index, 0x00000010, true);
            index += 4;
            data.setUint16(index, 0x0001, true);
            index += 2;
            data.setUint16(index, wavChannelCount, true);
            index += 2;
            data.setUint32(index, sampleRate, true);
            index += 4;
            data.setUint32(index, sampleRate * bytesPerSample * wavChannelCount, true);
            index += 4;
            data.setUint16(index, bytesPerSample, true);
            index += 2;
            data.setUint16(index, bitsPerSample, true);
            index += 2;
            data.setUint32(index, 0x64617461, false);
            index += 4;
            data.setUint32(index, sampleCount * bytesPerSample, true);
            index += 4;
            if (bytesPerSample > 1) {
                for (let i = 0; i < sampleFrames; i++) {
                    let valL = Math.floor(Math.max(-1, Math.min(1, recordedSamplesL[i])) * ((1 << (bitsPerSample - 1)) - 1));
                    let valR = Math.floor(Math.max(-1, Math.min(1, recordedSamplesR[i])) * ((1 << (bitsPerSample - 1)) - 1));
                    if (bytesPerSample == 2) {
                        data.setInt16(index, valL, true);
                        index += 2;
                        data.setInt16(index, valR, true);
                        index += 2;
                    }
                    else if (bytesPerSample == 4) {
                        data.setInt32(index, valL, true);
                        index += 4;
                        data.setInt32(index, valR, true);
                        index += 4;
                    }
                    else {
                        throw new Error("unsupported sample size");
                    }
                }
            }
            else {
                for (let i = 0; i < sampleFrames; i++) {
                    let valL = Math.floor(Math.max(-1, Math.min(1, recordedSamplesL[i])) * 127 + 128);
                    let valR = Math.floor(Math.max(-1, Math.min(1, recordedSamplesR[i])) * 127 + 128);
                    data.setUint8(index, valL > 255 ? 255 : (valL < 0 ? 0 : valL));
                    index++;
                    data.setUint8(index, valR > 255 ? 255 : (valR < 0 ? 0 : valR));
                    index++;
                }
            }
            const blob = new Blob([arrayBuffer], { type: "audio/wav" });
            save(blob, this._fileName.value.trim() + ".wav");
            this._close();
        }
        _exportToMidi() {
            const song = this._doc.song;
            const midiTicksPerBeepBoxTick = 2;
            const midiTicksPerBeat = midiTicksPerBeepBoxTick * beepbox.Config.ticksPerPart * beepbox.Config.partsPerBeat;
            const midiTicksPerPart = midiTicksPerBeepBoxTick * beepbox.Config.ticksPerPart;
            const secondsPerMinute = 60;
            const microsecondsPerMinute = secondsPerMinute * 1000000;
            const beatsPerMinute = song.getBeatsPerMinute();
            const microsecondsPerBeat = Math.round(microsecondsPerMinute / beatsPerMinute);
            const midiTicksPerBar = midiTicksPerBeat * song.beatsPerBar;
            const pitchBendRange = 24;
            const defaultNoteVelocity = 90;
            const unrolledBars = [];
            if (this._enableIntro.checked) {
                for (let bar = 0; bar < song.loopStart; bar++) {
                    unrolledBars.push(bar);
                }
            }
            for (let loopIndex = 0; loopIndex < Number(this._loopDropDown.value); loopIndex++) {
                for (let bar = song.loopStart; bar < song.loopStart + song.loopLength; bar++) {
                    unrolledBars.push(bar);
                }
            }
            if (this._enableOutro.checked) {
                for (let bar = song.loopStart + song.loopLength; bar < song.barCount; bar++) {
                    unrolledBars.push(bar);
                }
            }
            const tracks = [{ isMeta: true, channel: -1, midiChannel: -1, isNoise: false, isDrumset: false }];
            let midiChannelCounter = 0;
            let foundADrumset = false;
            for (let channel = 0; channel < this._doc.song.getChannelCount(); channel++) {
                if (!foundADrumset && this._doc.song.channels[channel].instruments[0].type == 4) {
                    tracks.push({ isMeta: false, channel: channel, midiChannel: 9, isNoise: true, isDrumset: true });
                    foundADrumset = true;
                }
                else {
                    tracks.push({ isMeta: false, channel: channel, midiChannel: midiChannelCounter++, isNoise: this._doc.song.getChannelIsNoise(channel), isDrumset: false });
                    if (midiChannelCounter == 9)
                        midiChannelCounter++;
                }
            }
            const writer = new beepbox.ArrayBufferWriter(1024);
            writer.writeUint32(1297377380);
            writer.writeUint32(6);
            writer.writeUint16(1);
            writer.writeUint16(tracks.length);
            writer.writeUint16(midiTicksPerBeat);
            for (const track of tracks) {
                writer.writeUint32(1297379947);
                const { isMeta, channel, midiChannel, isNoise, isDrumset } = track;
                const trackStartIndex = writer.getWriteIndex();
                writer.writeUint32(0);
                let prevTime = 0;
                let barStartTime = 0;
                const writeEventTime = function (time) {
                    if (time < prevTime)
                        throw new Error("Midi event time cannot go backwards.");
                    writer.writeMidiVariableLength(time - prevTime);
                    prevTime = time;
                };
                const writeControlEvent = function (message, value) {
                    if (!(value >= 0 && value <= 0x7F))
                        throw new Error("Midi control event value out of range: " + value);
                    writer.writeUint8(176 | midiChannel);
                    writer.writeMidi7Bits(message);
                    writer.writeMidi7Bits(value | 0);
                };
                if (isMeta) {
                    writeEventTime(0);
                    writer.writeUint8(255);
                    writer.writeMidi7Bits(1);
                    writer.writeMidiAscii("Composed with beepbox.co");
                    writeEventTime(0);
                    writer.writeUint8(255);
                    writer.writeMidi7Bits(81);
                    writer.writeMidiVariableLength(3);
                    writer.writeUint24(microsecondsPerBeat);
                    writeEventTime(0);
                    writer.writeUint8(255);
                    writer.writeMidi7Bits(88);
                    writer.writeMidiVariableLength(4);
                    writer.writeUint8(song.beatsPerBar);
                    writer.writeUint8(2);
                    writer.writeUint8(24);
                    writer.writeUint8(8);
                    const isMinor = beepbox.Config.scales[song.scale].flags[3] && !beepbox.Config.scales[song.scale].flags[4];
                    const key = song.key;
                    let numSharps = key;
                    if ((key & 1) == 1)
                        numSharps += 6;
                    if (isMinor)
                        numSharps += 9;
                    while (numSharps > 6)
                        numSharps -= 12;
                    writeEventTime(0);
                    writer.writeUint8(255);
                    writer.writeMidi7Bits(89);
                    writer.writeMidiVariableLength(2);
                    writer.writeInt8(numSharps);
                    writer.writeUint8(isMinor ? 1 : 0);
                    if (this._enableIntro.checked)
                        barStartTime += midiTicksPerBar * song.loopStart;
                    writeEventTime(barStartTime);
                    writer.writeUint8(255);
                    writer.writeMidi7Bits(6);
                    writer.writeMidiAscii("Loop Start");
                    for (let loopIndex = 0; loopIndex < parseInt(this._loopDropDown.value); loopIndex++) {
                        barStartTime += midiTicksPerBar * song.loopLength;
                        writeEventTime(barStartTime);
                        writer.writeUint8(255);
                        writer.writeMidi7Bits(6);
                        writer.writeMidiAscii(loopIndex < Number(this._loopDropDown.value) - 1 ? "Loop Repeat" : "Loop End");
                    }
                    if (this._enableOutro.checked)
                        barStartTime += midiTicksPerBar * (song.barCount - song.loopStart - song.loopLength);
                    if (barStartTime != midiTicksPerBar * unrolledBars.length)
                        throw new Error("Miscalculated number of bars.");
                }
                else {
                    let channelName = beepbox.ColorConfig.getChannelColor(song, channel).name + " channel";
                    writeEventTime(0);
                    writer.writeUint8(255);
                    writer.writeMidi7Bits(3);
                    writer.writeMidiAscii(channelName);
                    writeEventTime(0);
                    writeControlEvent(101, 0);
                    writeEventTime(0);
                    writeControlEvent(100, 0);
                    writeEventTime(0);
                    writeControlEvent(6, pitchBendRange);
                    writeEventTime(0);
                    writeControlEvent(38, 0);
                    writeEventTime(0);
                    writeControlEvent(101, 127);
                    writeEventTime(0);
                    writeControlEvent(100, 127);
                    let prevInstrumentIndex = -1;
                    function writeInstrumentSettings(instrumentIndex) {
                        const instrument = song.channels[channel].instruments[instrumentIndex];
                        const preset = beepbox.EditorConfig.valueToPreset(instrument.preset);
                        if (prevInstrumentIndex != instrumentIndex) {
                            prevInstrumentIndex = instrumentIndex;
                            writeEventTime(barStartTime);
                            writer.writeUint8(255);
                            writer.writeMidi7Bits(4);
                            writer.writeMidiAscii("Instrument " + (instrumentIndex + 1));
                            if (!isDrumset) {
                                let instrumentProgram = 81;
                                if (preset != null && preset.midiProgram != undefined) {
                                    instrumentProgram = preset.midiProgram;
                                }
                                else if (instrument.type == 4) {
                                    instrumentProgram = 116;
                                }
                                else {
                                    const envelopeType = instrument.getFilterEnvelope().type;
                                    const instrumentDecays = envelopeType == 8 || envelopeType == 4;
                                    if (instrument.type == 2 || instrument.type == 3) {
                                        if (isNoise) {
                                            instrumentProgram = 116;
                                        }
                                        else {
                                            instrumentProgram = instrumentDecays ? 47 : 75;
                                        }
                                    }
                                    else if (instrument.type == 0) {
                                        const filterInstruments = instrumentDecays
                                            ? ExportPrompt.midiDecayInstruments
                                            : ExportPrompt.midiSustainInstruments;
                                        if (filterInstruments.length > instrument.chipWave) {
                                            instrumentProgram = filterInstruments[instrument.chipWave];
                                        }
                                    }
                                    else if (instrument.type == 6) {
                                        instrumentProgram = instrumentDecays ? 0x19 : 81;
                                    }
                                    else if (instrument.type == 1 || instrument.type == 5) {
                                        instrumentProgram = instrumentDecays ? 2 : 81;
                                    }
                                    else {
                                        throw new Error("Unrecognized instrument type.");
                                    }
                                }
                                writeEventTime(barStartTime);
                                writer.writeUint8(192 | midiChannel);
                                writer.writeMidi7Bits(instrumentProgram);
                            }
                            writeEventTime(barStartTime);
                            let instrumentVolume = beepbox.volumeMultToMidiVolume(beepbox.Synth.instrumentVolumeToVolumeMult(instrument.volume));
                            writeControlEvent(7, Math.min(0x7f, Math.round(instrumentVolume)));
                            writeEventTime(barStartTime);
                            let instrumentPan = (instrument.pan / beepbox.Config.panCenter - 1) * 0x3f + 0x40;
                            writeControlEvent(10, Math.min(0x7f, Math.round(instrumentPan)));
                        }
                    }
                    if (song.getPattern(channel, 0) == null) {
                        writeInstrumentSettings(0);
                    }
                    let prevPitchBend = beepbox.defaultMidiPitchBend;
                    let prevExpression = beepbox.defaultMidiExpression;
                    let shouldResetExpressionAndPitchBend = false;
                    const channelRoot = isNoise ? beepbox.Config.spectrumBasePitch : beepbox.Config.keys[song.key].basePitch;
                    const intervalScale = isNoise ? beepbox.Config.noiseInterval : 1;
                    for (const bar of unrolledBars) {
                        const pattern = song.getPattern(channel, bar);
                        if (pattern != null) {
                            const instrumentIndex = pattern.instrument;
                            const instrument = song.channels[channel].instruments[instrumentIndex];
                            const preset = beepbox.EditorConfig.valueToPreset(instrument.preset);
                            writeInstrumentSettings(instrumentIndex);
                            let chordHarmonizes = false;
                            let usesArpeggio = true;
                            let polyphony = 1;
                            chordHarmonizes = instrument.getChord().harmonizes;
                            usesArpeggio = instrument.getChord().arpeggiates;
                            if (usesArpeggio) {
                                if (chordHarmonizes) {
                                    if (instrument.type == 0) {
                                        polyphony = 2;
                                    }
                                    else if (instrument.type == 1) {
                                        polyphony = 4;
                                    }
                                    else {
                                        console.error("Unrecognized instrument type for harmonizing arpeggio: " + instrument.type);
                                    }
                                }
                            }
                            else {
                                polyphony = 4;
                            }
                            for (let noteIndex = 0; noteIndex < pattern.notes.length; noteIndex++) {
                                const note = pattern.notes[noteIndex];
                                const noteStartTime = barStartTime + note.start * midiTicksPerPart;
                                let pinTime = noteStartTime;
                                let pinVolume = note.pins[0].volume;
                                let pinInterval = note.pins[0].interval;
                                const prevPitches = [-1, -1, -1, -1];
                                const nextPitches = [-1, -1, -1, -1];
                                const toneCount = Math.min(polyphony, note.pitches.length);
                                const velocity = isDrumset ? Math.max(1, Math.round(defaultNoteVelocity * note.pins[0].volume / 3)) : defaultNoteVelocity;
                                let mainInterval = note.pickMainInterval();
                                let pitchOffset = mainInterval * intervalScale;
                                if (!isDrumset) {
                                    let maxPitchOffset = pitchBendRange;
                                    let minPitchOffset = -pitchBendRange;
                                    for (let pinIndex = 1; pinIndex < note.pins.length; pinIndex++) {
                                        const interval = note.pins[pinIndex].interval * intervalScale;
                                        maxPitchOffset = Math.min(maxPitchOffset, interval + pitchBendRange);
                                        minPitchOffset = Math.max(minPitchOffset, interval - pitchBendRange);
                                    }
                                    pitchOffset = Math.min(maxPitchOffset, Math.max(minPitchOffset, pitchOffset));
                                }
                                for (let pinIndex = 1; pinIndex < note.pins.length; pinIndex++) {
                                    const nextPinTime = noteStartTime + note.pins[pinIndex].time * midiTicksPerPart;
                                    const nextPinVolume = note.pins[pinIndex].volume;
                                    const nextPinInterval = note.pins[pinIndex].interval;
                                    const length = nextPinTime - pinTime;
                                    for (let midiTick = 0; midiTick < length; midiTick++) {
                                        const midiTickTime = pinTime + midiTick;
                                        const linearVolume = lerp(pinVolume, nextPinVolume, midiTick / length);
                                        const linearInterval = lerp(pinInterval, nextPinInterval, midiTick / length);
                                        const interval = linearInterval * intervalScale - pitchOffset;
                                        const pitchBend = Math.max(0, Math.min(0x3fff, Math.round(0x2000 * (1.0 + interval / pitchBendRange))));
                                        const expression = Math.min(0x7f, Math.round(beepbox.volumeMultToMidiExpression(beepbox.Synth.expressionToVolumeMult(linearVolume))));
                                        if (pitchBend != prevPitchBend) {
                                            writeEventTime(midiTickTime);
                                            writer.writeUint8(224 | midiChannel);
                                            writer.writeMidi7Bits(pitchBend & 0x7f);
                                            writer.writeMidi7Bits((pitchBend >> 7) & 0x7f);
                                            prevPitchBend = pitchBend;
                                        }
                                        if (expression != prevExpression && !isDrumset) {
                                            writeEventTime(midiTickTime);
                                            writeControlEvent(11, expression);
                                            prevExpression = expression;
                                        }
                                        const noteStarting = midiTickTime == noteStartTime;
                                        for (let toneIndex = 0; toneIndex < toneCount; toneIndex++) {
                                            let nextPitch = note.pitches[toneIndex];
                                            if (isDrumset) {
                                                nextPitch += pitchOffset;
                                                const drumsetMap = [
                                                    36,
                                                    41,
                                                    45,
                                                    48,
                                                    40,
                                                    39,
                                                    59,
                                                    49,
                                                    46,
                                                    55,
                                                    69,
                                                    54,
                                                ];
                                                if (nextPitch < 0 || nextPitch >= drumsetMap.length)
                                                    throw new Error("Could not find corresponding drumset pitch. " + nextPitch);
                                                nextPitch = drumsetMap[nextPitch];
                                            }
                                            else {
                                                if (usesArpeggio && note.pitches.length > toneIndex + 1 && toneIndex == toneCount - 1) {
                                                    const midiTicksSinceBeat = (midiTickTime - barStartTime) % midiTicksPerBeat;
                                                    const midiTicksPerArpeggio = beepbox.Config.rhythms[song.rhythm].ticksPerArpeggio * midiTicksPerPart / beepbox.Config.ticksPerPart;
                                                    const arpeggio = Math.floor(midiTicksSinceBeat / midiTicksPerArpeggio);
                                                    const arpeggioPattern = beepbox.Config.rhythms[song.rhythm].arpeggioPatterns[note.pitches.length - 1 - toneIndex];
                                                    nextPitch = note.pitches[toneIndex + arpeggioPattern[arpeggio % arpeggioPattern.length]];
                                                }
                                                nextPitch = channelRoot + nextPitch * intervalScale + pitchOffset;
                                                if (preset != null && preset.midiSubharmonicOctaves != undefined) {
                                                    nextPitch += 12 * preset.midiSubharmonicOctaves;
                                                }
                                                else if (isNoise) {
                                                    nextPitch += 12 * (+beepbox.EditorConfig.presetCategories.dictionary["Drum Presets"].presets.dictionary["taiko drum"].midiSubharmonicOctaves);
                                                }
                                                if (isNoise)
                                                    nextPitch *= 2;
                                            }
                                            nextPitch = Math.max(0, Math.min(127, nextPitch));
                                            nextPitches[toneIndex] = nextPitch;
                                            if (!noteStarting && prevPitches[toneIndex] != nextPitches[toneIndex]) {
                                                writeEventTime(midiTickTime);
                                                writer.writeUint8(128 | midiChannel);
                                                writer.writeMidi7Bits(prevPitches[toneIndex]);
                                                writer.writeMidi7Bits(velocity);
                                            }
                                        }
                                        for (let toneIndex = 0; toneIndex < toneCount; toneIndex++) {
                                            if (noteStarting || prevPitches[toneIndex] != nextPitches[toneIndex]) {
                                                writeEventTime(midiTickTime);
                                                writer.writeUint8(144 | midiChannel);
                                                writer.writeMidi7Bits(nextPitches[toneIndex]);
                                                writer.writeMidi7Bits(velocity);
                                                prevPitches[toneIndex] = nextPitches[toneIndex];
                                            }
                                        }
                                    }
                                    pinTime = nextPinTime;
                                    pinVolume = nextPinVolume;
                                    pinInterval = nextPinInterval;
                                }
                                const noteEndTime = barStartTime + note.end * midiTicksPerPart;
                                for (let toneIndex = 0; toneIndex < toneCount; toneIndex++) {
                                    writeEventTime(noteEndTime);
                                    writer.writeUint8(128 | midiChannel);
                                    writer.writeMidi7Bits(prevPitches[toneIndex]);
                                    writer.writeMidi7Bits(velocity);
                                }
                                shouldResetExpressionAndPitchBend = true;
                            }
                        }
                        else {
                            if (shouldResetExpressionAndPitchBend) {
                                shouldResetExpressionAndPitchBend = false;
                                if (prevExpression != beepbox.defaultMidiExpression) {
                                    prevExpression = beepbox.defaultMidiExpression;
                                    writeEventTime(barStartTime);
                                    writeControlEvent(11, prevExpression);
                                }
                                if (prevPitchBend != beepbox.defaultMidiPitchBend) {
                                    prevPitchBend = beepbox.defaultMidiPitchBend;
                                    writeEventTime(barStartTime);
                                    writer.writeUint8(224 | midiChannel);
                                    writer.writeMidi7Bits(prevPitchBend & 0x7f);
                                    writer.writeMidi7Bits((prevPitchBend >> 7) & 0x7f);
                                }
                            }
                        }
                        barStartTime += midiTicksPerBar;
                    }
                }
                writeEventTime(barStartTime);
                writer.writeUint8(255);
                writer.writeMidi7Bits(47);
                writer.writeMidiVariableLength(0x00);
                writer.rewriteUint32(trackStartIndex, writer.getWriteIndex() - trackStartIndex - 4);
            }
            const blob = new Blob([writer.toCompactArrayBuffer()], { type: "audio/midi" });
            save(blob, this._fileName.value.trim() + ".mid");
            this._close();
        }
        _exportToJson() {
            const jsonObject = this._doc.song.toJsonObject(this._enableIntro.checked, Number(this._loopDropDown.value), this._enableOutro.checked);
            const jsonString = JSON.stringify(jsonObject, null, '\t');
            const blob = new Blob([jsonString], { type: "application/json" });
            save(blob, this._fileName.value.trim() + ".json");
            this._close();
        }
    }
    ExportPrompt.midiSustainInstruments = [
        0x4A,
        0x47,
        0x50,
        0x46,
        0x46,
        0x44,
        0x44,
        0x51,
        0x51,
        0x51,
        0x51,
        0x51,
        0x51,
    ];
    ExportPrompt.midiDecayInstruments = [
        0x21,
        0x2E,
        0x2E,
        0x06,
        0x06,
        0x18,
        0x18,
        0x19,
        0x19,
        0x19,
        0x19,
        0x6A,
        0x6A,
    ];
    beepbox.ExportPrompt = ExportPrompt;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    class ArrayBufferReader {
        constructor(data) {
            this._readIndex = 0;
            this._data = data;
        }
        getReadIndex() {
            return this._readIndex;
        }
        readUint32() {
            if (this._readIndex + 4 > this._data.byteLength)
                throw new Error("Reading past the end of the buffer.");
            const result = this._data.getUint32(this._readIndex, false);
            this._readIndex += 4;
            return result;
        }
        readUint24() {
            return (this.readUint8() << 16) | (this.readUint8() << 8) | (this.readUint8());
        }
        readUint16() {
            if (this._readIndex + 2 > this._data.byteLength)
                throw new Error("Reading past the end of the buffer.");
            const result = this._data.getUint16(this._readIndex, false);
            this._readIndex += 2;
            return result;
        }
        readUint8() {
            if (this._readIndex + 1 > this._data.byteLength)
                throw new Error("Reading past the end of the buffer.");
            const result = this._data.getUint8(this._readIndex);
            this._readIndex++;
            return result;
        }
        readInt8() {
            if (this._readIndex + 1 > this._data.byteLength)
                throw new Error("Reading past the end of the buffer.");
            const result = this._data.getInt8(this._readIndex);
            this._readIndex++;
            return result;
        }
        peakUint8() {
            if (this._readIndex + 1 > this._data.byteLength)
                throw new Error("Reading past the end of the buffer.");
            return this._data.getUint8(this._readIndex);
        }
        readMidi7Bits() {
            const result = this.readUint8();
            if (result >= 0x80)
                console.log("7 bit value contained 8th bit! value " + result + ", index " + this._readIndex);
            return result & 0x7f;
        }
        readMidiVariableLength() {
            let result = 0;
            for (let i = 0; i < 4; i++) {
                const nextByte = this.readUint8();
                result += nextByte & 0x7f;
                if (nextByte & 0x80) {
                    result = result << 7;
                }
                else {
                    break;
                }
            }
            return result;
        }
        skipBytes(length) {
            this._readIndex += length;
        }
        hasMore() {
            return this._data.byteLength > this._readIndex;
        }
        getReaderForNextBytes(length) {
            if (this._readIndex + length > this._data.byteLength)
                throw new Error("Reading past the end of the buffer.");
            const result = new ArrayBufferReader(new DataView(this._data.buffer, this._data.byteOffset + this._readIndex, length));
            this.skipBytes(length);
            return result;
        }
    }
    beepbox.ArrayBufferReader = ArrayBufferReader;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const { button, p, div, h2, input } = beepbox.HTML;
    class ImportPrompt {
        constructor(_doc) {
            this._doc = _doc;
            this._fileInput = input({ type: "file", accept: ".json,application/json,.mid,.midi,audio/midi,audio/x-midi" });
            this._cancelButton = button({ className: "cancelButton" });
            this.container = div({ className: "prompt noSelection", style: "width: 300px;" }, h2("Import"), p({ style: "text-align: left; margin: 0.5em 0;" }, "BeepBox songs can be exported and re-imported as .json files. You could also use other means to make .json files for BeepBox as long as they follow the same structure."), p({ style: "text-align: left; margin: 0.5em 0;" }, "BeepBox can also (crudely) import .mid files. There are many tools available for creating .mid files. Shorter and simpler songs are more likely to work well."), this._fileInput, this._cancelButton);
            this._close = () => {
                this._doc.undo();
            };
            this.cleanUp = () => {
                this._fileInput.removeEventListener("change", this._whenFileSelected);
                this._cancelButton.removeEventListener("click", this._close);
            };
            this._whenFileSelected = () => {
                const file = this._fileInput.files[0];
                if (!file)
                    return;
                const extension = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
                if (extension == "json") {
                    const reader = new FileReader();
                    reader.addEventListener("load", (event) => {
                        this._doc.prompt = null;
                        this._doc.goBackToStart();
                        this._doc.record(new beepbox.ChangeSong(this._doc, reader.result), "replace");
                    });
                    reader.readAsText(file);
                }
                else if (extension == "midi" || extension == "mid") {
                    const reader = new FileReader();
                    reader.addEventListener("load", (event) => {
                        this._doc.prompt = null;
                        this._doc.goBackToStart();
                        this._parseMidiFile(reader.result);
                    });
                    reader.readAsArrayBuffer(file);
                }
                else {
                    console.error("Unrecognized file extension.");
                    this._close();
                }
            };
            this._fileInput.select();
            setTimeout(() => this._fileInput.focus());
            this._fileInput.addEventListener("change", this._whenFileSelected);
            this._cancelButton.addEventListener("click", this._close);
        }
        _parseMidiFile(buffer) {
            const reader = new beepbox.ArrayBufferReader(new DataView(buffer));
            let headerReader = null;
            const tracks = [];
            while (reader.hasMore()) {
                const chunkType = reader.readUint32();
                const chunkLength = reader.readUint32();
                if (chunkType == 1297377380) {
                    if (headerReader == null) {
                        headerReader = reader.getReaderForNextBytes(chunkLength);
                    }
                    else {
                        console.error("This MIDI file has more than one header chunk.");
                    }
                }
                else if (chunkType == 1297379947) {
                    const trackReader = reader.getReaderForNextBytes(chunkLength);
                    if (trackReader.hasMore()) {
                        tracks.push({
                            reader: trackReader,
                            nextEventMidiTick: trackReader.readMidiVariableLength(),
                            ended: false,
                            runningStatus: -1,
                        });
                    }
                }
                else {
                    reader.skipBytes(chunkLength);
                }
            }
            if (headerReader == null) {
                console.error("No header chunk found in this MIDI file.");
                this._close();
                return;
            }
            const fileFormat = headerReader.readUint16();
            headerReader.readUint16();
            const midiTicksPerBeat = headerReader.readUint16();
            let currentIndependentTrackIndex = 0;
            const currentTrackIndices = [];
            const independentTracks = (fileFormat == 2);
            if (independentTracks) {
                currentTrackIndices.push(currentIndependentTrackIndex);
            }
            else {
                for (let trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
                    currentTrackIndices.push(trackIndex);
                }
            }
            const channelRPNMSB = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff];
            const channelRPNLSB = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff];
            const pitchBendRangeMSB = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
            const pitchBendRangeLSB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const currentInstrumentProgram = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            const currentInstrumentVolumes = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
            const currentInstrumentPans = [64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64];
            const noteEvents = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
            const pitchBendEvents = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
            const expressionEvents = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
            let microsecondsPerBeat = 500000;
            let beatsPerBar = 8;
            let numSharps = 0;
            let isMinor = false;
            let currentMidiTick = 0;
            while (true) {
                let nextEventMidiTick = Number.MAX_VALUE;
                let anyTrackHasMore = false;
                for (const trackIndex of currentTrackIndices) {
                    const track = tracks[trackIndex];
                    while (!track.ended && track.nextEventMidiTick == currentMidiTick) {
                        const peakStatus = track.reader.peakUint8();
                        const eventStatus = (peakStatus & 0x80) ? track.reader.readUint8() : track.runningStatus;
                        const eventType = eventStatus & 0xF0;
                        const eventChannel = eventStatus & 0x0F;
                        if (eventType != 240) {
                            track.runningStatus = eventStatus;
                        }
                        let foundTrackEndEvent = false;
                        switch (eventType) {
                            case 128:
                                {
                                    const pitch = track.reader.readMidi7Bits();
                                    track.reader.readMidi7Bits();
                                    noteEvents[eventChannel].push({ midiTick: currentMidiTick, pitch: pitch, velocity: 0.0, program: -1, instrumentVolume: -1, instrumentPan: -1, on: false });
                                }
                                break;
                            case 144:
                                {
                                    const pitch = track.reader.readMidi7Bits();
                                    const velocity = track.reader.readMidi7Bits();
                                    if (velocity == 0) {
                                        noteEvents[eventChannel].push({ midiTick: currentMidiTick, pitch: pitch, velocity: 0.0, program: -1, instrumentVolume: -1, instrumentPan: -1, on: false });
                                    }
                                    else {
                                        const volume = Math.max(0, Math.min(beepbox.Config.volumeRange - 1, Math.round(beepbox.Synth.volumeMultToInstrumentVolume(beepbox.midiVolumeToVolumeMult(currentInstrumentVolumes[eventChannel])))));
                                        const pan = Math.max(0, Math.min(beepbox.Config.panMax, Math.round(((currentInstrumentPans[eventChannel] - 64) / 63 + 1) * beepbox.Config.panCenter)));
                                        noteEvents[eventChannel].push({
                                            midiTick: currentMidiTick,
                                            pitch: pitch,
                                            velocity: Math.max(0.0, Math.min(1.0, (velocity + 14) / 90.0)),
                                            program: currentInstrumentProgram[eventChannel],
                                            instrumentVolume: volume,
                                            instrumentPan: pan,
                                            on: true,
                                        });
                                    }
                                }
                                break;
                            case 160:
                                {
                                    track.reader.readMidi7Bits();
                                    track.reader.readMidi7Bits();
                                }
                                break;
                            case 176:
                                {
                                    const message = track.reader.readMidi7Bits();
                                    const value = track.reader.readMidi7Bits();
                                    switch (message) {
                                        case 6:
                                            {
                                                if (channelRPNMSB[eventChannel] == 0 && channelRPNLSB[eventChannel] == 0) {
                                                    pitchBendRangeMSB[eventChannel] = value;
                                                }
                                            }
                                            break;
                                        case 7:
                                            {
                                                currentInstrumentVolumes[eventChannel] = value;
                                            }
                                            break;
                                        case 10:
                                            {
                                                currentInstrumentPans[eventChannel] = value;
                                            }
                                            break;
                                        case 11:
                                            {
                                                expressionEvents[eventChannel].push({ midiTick: currentMidiTick, volume: beepbox.Synth.volumeMultToExpression(beepbox.midiExpressionToVolumeMult(value)) });
                                            }
                                            break;
                                        case 38:
                                            {
                                                if (channelRPNMSB[eventChannel] == 0 && channelRPNLSB[eventChannel] == 0) {
                                                    pitchBendRangeLSB[eventChannel] = value;
                                                }
                                            }
                                            break;
                                        case 100:
                                            {
                                                channelRPNLSB[eventChannel] = value;
                                            }
                                            break;
                                        case 101:
                                            {
                                                channelRPNMSB[eventChannel] = value;
                                            }
                                            break;
                                    }
                                }
                                break;
                            case 192:
                                {
                                    const program = track.reader.readMidi7Bits();
                                    currentInstrumentProgram[eventChannel] = program;
                                }
                                break;
                            case 208:
                                {
                                    track.reader.readMidi7Bits();
                                }
                                break;
                            case 224:
                                {
                                    const lsb = track.reader.readMidi7Bits();
                                    const msb = track.reader.readMidi7Bits();
                                    const pitchBend = (((msb << 7) | lsb) / 0x2000) - 1.0;
                                    const pitchBendRange = pitchBendRangeMSB[eventChannel] + pitchBendRangeLSB[eventChannel] * 0.01;
                                    const interval = pitchBend * pitchBendRange;
                                    pitchBendEvents[eventChannel].push({ midiTick: currentMidiTick, interval: interval });
                                }
                                break;
                            case 240:
                                {
                                    if (eventStatus == 255) {
                                        const message = track.reader.readMidi7Bits();
                                        const length = track.reader.readMidiVariableLength();
                                        if (message == 47) {
                                            foundTrackEndEvent = true;
                                            track.reader.skipBytes(length);
                                        }
                                        else if (message == 81) {
                                            microsecondsPerBeat = track.reader.readUint24();
                                            track.reader.skipBytes(length - 3);
                                        }
                                        else if (message == 88) {
                                            const numerator = track.reader.readUint8();
                                            let denominatorExponent = track.reader.readUint8();
                                            track.reader.readUint8();
                                            track.reader.readUint8();
                                            track.reader.skipBytes(length - 4);
                                            beatsPerBar = numerator * 4;
                                            while ((beatsPerBar & 1) == 0 && (denominatorExponent > 0 || beatsPerBar > beepbox.Config.beatsPerBarMax) && beatsPerBar >= beepbox.Config.beatsPerBarMin * 2) {
                                                beatsPerBar = beatsPerBar >> 1;
                                                denominatorExponent = denominatorExponent - 1;
                                            }
                                            beatsPerBar = Math.max(beepbox.Config.beatsPerBarMin, Math.min(beepbox.Config.beatsPerBarMax, beatsPerBar));
                                        }
                                        else if (message == 89) {
                                            numSharps = track.reader.readInt8();
                                            isMinor = track.reader.readUint8() == 1;
                                            track.reader.skipBytes(length - 2);
                                        }
                                        else {
                                            track.reader.skipBytes(length);
                                        }
                                    }
                                    else if (eventStatus == 0xF0 || eventStatus == 0xF7) {
                                        const length = track.reader.readMidiVariableLength();
                                        track.reader.skipBytes(length);
                                    }
                                    else {
                                        console.error("Unrecognized event status: " + eventStatus);
                                        this._close();
                                        return;
                                    }
                                }
                                break;
                            default: {
                                console.error("Unrecognized event type: " + eventType);
                                this._close();
                                return;
                            }
                        }
                        if (!foundTrackEndEvent && track.reader.hasMore()) {
                            track.nextEventMidiTick = currentMidiTick + track.reader.readMidiVariableLength();
                        }
                        else {
                            track.ended = true;
                            if (independentTracks) {
                                currentIndependentTrackIndex++;
                                if (currentIndependentTrackIndex < tracks.length) {
                                    currentTrackIndices[0] = currentIndependentTrackIndex;
                                    tracks[currentIndependentTrackIndex].nextEventMidiTick += currentMidiTick;
                                    nextEventMidiTick = Math.min(nextEventMidiTick, tracks[currentIndependentTrackIndex].nextEventMidiTick);
                                    anyTrackHasMore = true;
                                }
                            }
                        }
                    }
                    if (!track.ended) {
                        anyTrackHasMore = true;
                        nextEventMidiTick = Math.min(nextEventMidiTick, track.nextEventMidiTick);
                    }
                }
                if (anyTrackHasMore) {
                    currentMidiTick = nextEventMidiTick;
                }
                else {
                    break;
                }
            }
            const microsecondsPerMinute = 60 * 1000 * 1000;
            const beatsPerMinute = microsecondsPerMinute / microsecondsPerBeat;
            const midiTicksPerPart = midiTicksPerBeat / beepbox.Config.partsPerBeat;
            const partsPerBar = beepbox.Config.partsPerBeat * beatsPerBar;
            const songTotalBars = Math.ceil(currentMidiTick / midiTicksPerPart / partsPerBar);
            function quantizeMidiTickToPart(midiTick) {
                return Math.round(midiTick / midiTicksPerPart);
            }
            let key = numSharps;
            if (isMinor)
                key += 3;
            if ((key & 1) == 1)
                key += 6;
            while (key < 0)
                key += 12;
            key = key % 12;
            const pitchChannels = [];
            const noiseChannels = [];
            for (let midiChannel = 0; midiChannel < 16; midiChannel++) {
                if (noteEvents[midiChannel].length == 0)
                    continue;
                const channel = new beepbox.Channel();
                const channelPresetValue = beepbox.EditorConfig.midiProgramToPresetValue(noteEvents[midiChannel][0].program);
                const channelPreset = (channelPresetValue == null) ? null : beepbox.EditorConfig.valueToPreset(channelPresetValue);
                const isDrumsetChannel = (midiChannel == 9);
                const isNoiseChannel = isDrumsetChannel || (channelPreset != null && channelPreset.isNoise == true);
                const channelBasePitch = isNoiseChannel ? beepbox.Config.spectrumBasePitch : beepbox.Config.keys[key].basePitch;
                const intervalScale = isNoiseChannel ? beepbox.Config.noiseInterval : 1;
                const midiIntervalScale = isNoiseChannel ? 0.5 : 1;
                const channelMaxPitch = isNoiseChannel ? beepbox.Config.drumCount - 1 : beepbox.Config.maxPitch;
                if (isNoiseChannel) {
                    if (isDrumsetChannel) {
                        noiseChannels.unshift(channel);
                    }
                    else {
                        noiseChannels.push(channel);
                    }
                }
                else {
                    pitchChannels.push(channel);
                }
                let currentVelocity = 1.0;
                let currentProgram = 0;
                let currentInstrumentVolume = 0;
                let currentInstrumentPan = beepbox.Config.panCenter;
                if (isDrumsetChannel) {
                    const heldPitches = [];
                    let currentBar = -1;
                    let pattern = null;
                    let prevEventPart = 0;
                    let setInstrumentVolume = false;
                    const presetValue = beepbox.EditorConfig.nameToPresetValue("standard drumset");
                    const preset = beepbox.EditorConfig.valueToPreset(presetValue);
                    const instrument = new beepbox.Instrument(false);
                    instrument.fromJsonObject(preset.settings, false);
                    instrument.preset = presetValue;
                    channel.instruments.push(instrument);
                    for (let noteEventIndex = 0; noteEventIndex <= noteEvents[midiChannel].length; noteEventIndex++) {
                        const noMoreNotes = noteEventIndex == noteEvents[midiChannel].length;
                        const noteEvent = noMoreNotes ? null : noteEvents[midiChannel][noteEventIndex];
                        const nextEventPart = noteEvent == null ? Number.MAX_SAFE_INTEGER : quantizeMidiTickToPart(noteEvent.midiTick);
                        if (heldPitches.length > 0 && nextEventPart > prevEventPart && (noteEvent == null || noteEvent.on)) {
                            const bar = Math.floor(prevEventPart / partsPerBar);
                            const barStartPart = bar * partsPerBar;
                            if (currentBar != bar || pattern == null) {
                                currentBar++;
                                while (currentBar < bar) {
                                    channel.bars[currentBar] = 0;
                                    currentBar++;
                                }
                                pattern = new beepbox.Pattern();
                                channel.patterns.push(pattern);
                                channel.bars[currentBar] = channel.patterns.length;
                                pattern.instrument = 0;
                            }
                            if (!setInstrumentVolume || instrument.volume > currentInstrumentVolume) {
                                instrument.volume = currentInstrumentVolume;
                                instrument.pan = currentInstrumentPan;
                                setInstrumentVolume = true;
                            }
                            const drumFreqs = [];
                            let minDuration = channelMaxPitch;
                            let maxDuration = 0;
                            let expression = 1;
                            for (const pitch of heldPitches) {
                                const drum = beepbox.analogousDrumMap[pitch];
                                if (drumFreqs.indexOf(drum.frequency) == -1) {
                                    drumFreqs.push(drum.frequency);
                                }
                                expression = Math.max(expression, Math.round(drum.volume * currentVelocity));
                                minDuration = Math.min(minDuration, drum.duration);
                                maxDuration = Math.max(maxDuration, drum.duration);
                            }
                            const duration = Math.min(maxDuration, Math.max(minDuration, 2));
                            const noteStartPart = prevEventPart - barStartPart;
                            const noteEndPart = Math.min(partsPerBar, Math.min(nextEventPart - barStartPart, noteStartPart + duration * 6));
                            const note = new beepbox.Note(-1, noteStartPart, noteEndPart, expression, true);
                            note.pitches.length = 0;
                            for (let pitchIndex = 0; pitchIndex < Math.min(4, drumFreqs.length); pitchIndex++) {
                                const heldPitch = drumFreqs[pitchIndex + Math.max(0, drumFreqs.length - 4)];
                                if (note.pitches.indexOf(heldPitch) == -1) {
                                    note.pitches.push(heldPitch);
                                }
                            }
                            pattern.notes.push(note);
                            heldPitches.length = 0;
                        }
                        if (noteEvent != null && noteEvent.on && beepbox.analogousDrumMap[noteEvent.pitch] != undefined) {
                            heldPitches.push(noteEvent.pitch);
                            prevEventPart = nextEventPart;
                            currentVelocity = noteEvent.velocity;
                            currentInstrumentVolume = noteEvent.instrumentVolume;
                            currentInstrumentPan = noteEvent.instrumentPan;
                        }
                    }
                }
                else {
                    let currentMidiInterval = 0.0;
                    let currentMidiExpression = 3.0;
                    let pitchBendEventIndex = 0;
                    let expressionEventIndex = 0;
                    function updateCurrentMidiInterval(midiTick) {
                        while (pitchBendEventIndex < pitchBendEvents[midiChannel].length && pitchBendEvents[midiChannel][pitchBendEventIndex].midiTick <= midiTick) {
                            currentMidiInterval = pitchBendEvents[midiChannel][pitchBendEventIndex].interval;
                            pitchBendEventIndex++;
                        }
                    }
                    function updateCurrentMidiExpression(midiTick) {
                        while (expressionEventIndex < expressionEvents[midiChannel].length && expressionEvents[midiChannel][expressionEventIndex].midiTick <= midiTick) {
                            currentMidiExpression = expressionEvents[midiChannel][expressionEventIndex].volume;
                            expressionEventIndex++;
                        }
                    }
                    const instrumentByProgram = [];
                    const heldPitches = [];
                    let currentBar = -1;
                    let pattern = null;
                    let prevEventMidiTick = 0;
                    let prevEventPart = 0;
                    let pitchSum = 0;
                    let pitchCount = 0;
                    for (let noteEvent of noteEvents[midiChannel]) {
                        const nextEventMidiTick = noteEvent.midiTick;
                        const nextEventPart = quantizeMidiTickToPart(nextEventMidiTick);
                        if (heldPitches.length > 0 && nextEventPart > prevEventPart) {
                            const startBar = Math.floor(prevEventPart / partsPerBar);
                            const endBar = Math.ceil(nextEventPart / partsPerBar);
                            for (let bar = startBar; bar < endBar; bar++) {
                                const barStartPart = bar * partsPerBar;
                                const barStartMidiTick = bar * beatsPerBar * midiTicksPerBeat;
                                const barEndMidiTick = (bar + 1) * beatsPerBar * midiTicksPerBeat;
                                const noteStartPart = Math.max(0, prevEventPart - barStartPart);
                                const noteEndPart = Math.min(partsPerBar, nextEventPart - barStartPart);
                                const noteStartMidiTick = Math.max(barStartMidiTick, prevEventMidiTick);
                                const noteEndMidiTick = Math.min(barEndMidiTick, nextEventMidiTick);
                                if (noteStartPart < noteEndPart) {
                                    const presetValue = beepbox.EditorConfig.midiProgramToPresetValue(currentProgram);
                                    const preset = (presetValue == null) ? null : beepbox.EditorConfig.valueToPreset(presetValue);
                                    if (currentBar != bar || pattern == null) {
                                        currentBar++;
                                        while (currentBar < bar) {
                                            channel.bars[currentBar] = 0;
                                            currentBar++;
                                        }
                                        pattern = new beepbox.Pattern();
                                        channel.patterns.push(pattern);
                                        channel.bars[currentBar] = channel.patterns.length;
                                        if (instrumentByProgram[currentProgram] == undefined) {
                                            const instrument = new beepbox.Instrument(isNoiseChannel);
                                            instrumentByProgram[currentProgram] = instrument;
                                            if (presetValue != null && preset != null && (preset.isNoise == true) == isNoiseChannel) {
                                                instrument.fromJsonObject(preset.settings, isNoiseChannel);
                                                instrument.preset = presetValue;
                                            }
                                            else {
                                                instrument.setTypeAndReset(isNoiseChannel ? 2 : 0, isNoiseChannel);
                                                instrument.chord = 0;
                                            }
                                            instrument.volume = currentInstrumentVolume;
                                            instrument.pan = currentInstrumentPan;
                                            channel.instruments.push(instrument);
                                        }
                                        pattern.instrument = channel.instruments.indexOf(instrumentByProgram[currentProgram]);
                                    }
                                    if (instrumentByProgram[currentProgram] != undefined) {
                                        instrumentByProgram[currentProgram].volume = Math.min(instrumentByProgram[currentProgram].volume, currentInstrumentVolume);
                                        instrumentByProgram[currentProgram].pan = Math.min(instrumentByProgram[currentProgram].pan, currentInstrumentPan);
                                    }
                                    const note = new beepbox.Note(-1, noteStartPart, noteEndPart, 3, false);
                                    note.pins.length = 0;
                                    updateCurrentMidiInterval(noteStartMidiTick);
                                    updateCurrentMidiExpression(noteStartMidiTick);
                                    const shiftedHeldPitch = heldPitches[0] * midiIntervalScale - channelBasePitch;
                                    const initialBeepBoxPitch = Math.round((shiftedHeldPitch + currentMidiInterval) / intervalScale);
                                    const heldPitchOffset = Math.round(currentMidiInterval - channelBasePitch);
                                    let firstPin = beepbox.makeNotePin(0, 0, Math.round(currentVelocity * currentMidiExpression));
                                    note.pins.push(firstPin);
                                    const potentialPins = [
                                        { part: 0, pitch: initialBeepBoxPitch, volume: firstPin.volume, keyPitch: false, keyVolume: false }
                                    ];
                                    let prevPinIndex = 0;
                                    let prevPartPitch = (shiftedHeldPitch + currentMidiInterval) / intervalScale;
                                    let prevPartExpression = currentVelocity * currentMidiExpression;
                                    for (let part = noteStartPart + 1; part <= noteEndPart; part++) {
                                        const midiTick = Math.max(noteStartMidiTick, Math.min(noteEndMidiTick - 1, Math.round(midiTicksPerPart * (part + barStartPart))));
                                        const noteRelativePart = part - noteStartPart;
                                        const lastPart = (part == noteEndPart);
                                        updateCurrentMidiInterval(midiTick);
                                        updateCurrentMidiExpression(midiTick);
                                        const partPitch = (currentMidiInterval + shiftedHeldPitch) / intervalScale;
                                        const partExpression = currentVelocity * currentMidiExpression;
                                        const nearestPitch = Math.round(partPitch);
                                        const pitchIsNearInteger = Math.abs(partPitch - nearestPitch) < 0.01;
                                        const pitchCrossedInteger = (Math.abs(prevPartPitch - Math.round(prevPartPitch)) < 0.01)
                                            ? Math.abs(partPitch - prevPartPitch) >= 1.0
                                            : Math.floor(partPitch) != Math.floor(prevPartPitch);
                                        const keyPitch = pitchIsNearInteger || pitchCrossedInteger;
                                        const nearestExpression = Math.round(partExpression);
                                        const expressionIsNearInteger = Math.abs(partExpression - nearestExpression) < 0.01;
                                        const expressionCrossedInteger = (Math.abs(prevPartExpression - Math.round(prevPartExpression)))
                                            ? Math.abs(partExpression - prevPartExpression) >= 1.0
                                            : Math.floor(partExpression) != Math.floor(prevPartExpression);
                                        const keyExpression = expressionIsNearInteger || expressionCrossedInteger;
                                        prevPartPitch = partPitch;
                                        prevPartExpression = partExpression;
                                        if (keyPitch || keyExpression || lastPart) {
                                            const currentPin = { part: noteRelativePart, pitch: nearestPitch, volume: nearestExpression, keyPitch: keyPitch || lastPart, keyVolume: keyExpression || lastPart };
                                            const prevPin = potentialPins[prevPinIndex];
                                            let addPin = false;
                                            let addPinAtIndex = Number.MAX_VALUE;
                                            if (currentPin.keyPitch) {
                                                const slope = (currentPin.pitch - prevPin.pitch) / (currentPin.part - prevPin.part);
                                                let furthestIntervalDistance = Math.abs(slope);
                                                let addIntervalPin = false;
                                                let addIntervalPinAtIndex = Number.MAX_VALUE;
                                                for (let potentialIndex = prevPinIndex + 1; potentialIndex < potentialPins.length; potentialIndex++) {
                                                    const potentialPin = potentialPins[potentialIndex];
                                                    if (potentialPin.keyPitch) {
                                                        const interpolatedInterval = prevPin.pitch + slope * (potentialPin.part - prevPin.part);
                                                        const distance = Math.abs(interpolatedInterval - potentialPin.pitch);
                                                        if (furthestIntervalDistance < distance) {
                                                            furthestIntervalDistance = distance;
                                                            addIntervalPin = true;
                                                            addIntervalPinAtIndex = potentialIndex;
                                                        }
                                                    }
                                                }
                                                if (addIntervalPin) {
                                                    addPin = true;
                                                    addPinAtIndex = Math.min(addPinAtIndex, addIntervalPinAtIndex);
                                                }
                                            }
                                            if (currentPin.keyVolume) {
                                                const slope = (currentPin.volume - prevPin.volume) / (currentPin.part - prevPin.part);
                                                let furthestVolumeDistance = Math.abs(slope);
                                                let addVolumePin = false;
                                                let addVolumePinAtIndex = Number.MAX_VALUE;
                                                for (let potentialIndex = prevPinIndex + 1; potentialIndex < potentialPins.length; potentialIndex++) {
                                                    const potentialPin = potentialPins[potentialIndex];
                                                    if (potentialPin.keyVolume) {
                                                        const interpolatedVolume = prevPin.volume + slope * (potentialPin.part - prevPin.part);
                                                        const distance = Math.abs(interpolatedVolume - potentialPin.volume);
                                                        if (furthestVolumeDistance < distance) {
                                                            furthestVolumeDistance = distance;
                                                            addVolumePin = true;
                                                            addVolumePinAtIndex = potentialIndex;
                                                        }
                                                    }
                                                }
                                                if (addVolumePin) {
                                                    addPin = true;
                                                    addPinAtIndex = Math.min(addPinAtIndex, addVolumePinAtIndex);
                                                }
                                            }
                                            if (addPin) {
                                                const toBePinned = potentialPins[addPinAtIndex];
                                                note.pins.push(beepbox.makeNotePin(toBePinned.pitch - initialBeepBoxPitch, toBePinned.part, toBePinned.volume));
                                                prevPinIndex = addPinAtIndex;
                                            }
                                            potentialPins.push(currentPin);
                                        }
                                    }
                                    const lastToBePinned = potentialPins[potentialPins.length - 1];
                                    note.pins.push(beepbox.makeNotePin(lastToBePinned.pitch - initialBeepBoxPitch, lastToBePinned.part, lastToBePinned.volume));
                                    let maxPitch = channelMaxPitch;
                                    let minPitch = 0;
                                    for (const notePin of note.pins) {
                                        maxPitch = Math.min(maxPitch, channelMaxPitch - notePin.interval);
                                        minPitch = Math.min(minPitch, -notePin.interval);
                                    }
                                    note.pitches.length = 0;
                                    for (let pitchIndex = 0; pitchIndex < Math.min(4, heldPitches.length); pitchIndex++) {
                                        let heldPitch = heldPitches[pitchIndex + Math.max(0, heldPitches.length - 4)] * midiIntervalScale;
                                        if (preset != null && preset.midiSubharmonicOctaves != undefined) {
                                            heldPitch -= 12 * preset.midiSubharmonicOctaves;
                                        }
                                        const shiftedPitch = Math.max(minPitch, Math.min(maxPitch, Math.round((heldPitch + heldPitchOffset) / intervalScale)));
                                        if (note.pitches.indexOf(shiftedPitch) == -1) {
                                            note.pitches.push(shiftedPitch);
                                            const weight = note.end - note.start;
                                            pitchSum += shiftedPitch * weight;
                                            pitchCount += weight;
                                        }
                                    }
                                    pattern.notes.push(note);
                                }
                            }
                        }
                        if (heldPitches.indexOf(noteEvent.pitch) != -1) {
                            heldPitches.splice(heldPitches.indexOf(noteEvent.pitch), 1);
                        }
                        if (noteEvent.on) {
                            heldPitches.push(noteEvent.pitch);
                            currentVelocity = noteEvent.velocity;
                            currentProgram = noteEvent.program;
                            currentInstrumentVolume = noteEvent.instrumentVolume;
                            currentInstrumentPan = noteEvent.instrumentPan;
                        }
                        prevEventMidiTick = nextEventMidiTick;
                        prevEventPart = nextEventPart;
                    }
                    const averagePitch = pitchSum / pitchCount;
                    channel.octave = isNoiseChannel ? 0 : Math.max(0, Math.min(beepbox.Config.scrollableOctaves, Math.round((averagePitch / 12) - 1.5)));
                }
                while (channel.bars.length < songTotalBars) {
                    channel.bars.push(0);
                }
            }
            function compactChannels(channels, maxLength) {
                while (channels.length > maxLength) {
                    let bestChannelIndexA = channels.length - 2;
                    let bestChannelIndexB = channels.length - 1;
                    let fewestConflicts = Number.MAX_VALUE;
                    let fewestGaps = Number.MAX_VALUE;
                    for (let channelIndexA = 0; channelIndexA < channels.length - 1; channelIndexA++) {
                        for (let channelIndexB = channelIndexA + 1; channelIndexB < channels.length; channelIndexB++) {
                            const channelA = channels[channelIndexA];
                            const channelB = channels[channelIndexB];
                            let conflicts = 0;
                            let gaps = 0;
                            for (let barIndex = 0; barIndex < channelA.bars.length && barIndex < channelB.bars.length; barIndex++) {
                                if (channelA.bars[barIndex] != 0 && channelB.bars[barIndex] != 0)
                                    conflicts++;
                                if (channelA.bars[barIndex] == 0 && channelB.bars[barIndex] == 0)
                                    gaps++;
                            }
                            if (conflicts <= fewestConflicts) {
                                if (conflicts < fewestConflicts || gaps < fewestGaps) {
                                    bestChannelIndexA = channelIndexA;
                                    bestChannelIndexB = channelIndexB;
                                    fewestConflicts = conflicts;
                                    fewestGaps = gaps;
                                }
                            }
                        }
                    }
                    const channelA = channels[bestChannelIndexA];
                    const channelB = channels[bestChannelIndexB];
                    const channelAInstrumentCount = channelA.instruments.length;
                    const channelAPatternCount = channelA.patterns.length;
                    for (const instrument of channelB.instruments) {
                        channelA.instruments.push(instrument);
                    }
                    for (const pattern of channelB.patterns) {
                        pattern.instrument += channelAInstrumentCount;
                        channelA.patterns.push(pattern);
                    }
                    for (let barIndex = 0; barIndex < channelA.bars.length && barIndex < channelB.bars.length; barIndex++) {
                        if (channelA.bars[barIndex] == 0 && channelB.bars[barIndex] != 0) {
                            channelA.bars[barIndex] = channelB.bars[barIndex] + channelAPatternCount;
                        }
                    }
                    channels.splice(bestChannelIndexB, 1);
                }
            }
            compactChannels(pitchChannels, beepbox.Config.pitchChannelCountMax);
            compactChannels(noiseChannels, beepbox.Config.noiseChannelCountMax);
            class ChangeImportMidi extends beepbox.ChangeGroup {
                constructor(doc) {
                    super();
                    const song = doc.song;
                    song.tempo = Math.max(beepbox.Config.tempoMin, Math.min(beepbox.Config.tempoMax, beatsPerMinute));
                    song.beatsPerBar = beatsPerBar;
                    song.key = key;
                    song.scale = 11;
                    song.reverb = 1;
                    song.rhythm = 1;
                    beepbox.removeDuplicatePatterns(pitchChannels);
                    beepbox.removeDuplicatePatterns(noiseChannels);
                    this.append(new beepbox.ChangeReplacePatterns(doc, pitchChannels, noiseChannels));
                    song.loopStart = 0;
                    song.loopLength = song.barCount;
                    this._didSomething();
                    doc.notifier.changed();
                }
            }
            this._doc.goBackToStart();
            this._doc.prompt = null;
            this._doc.record(new ChangeImportMidi(this._doc), "replace");
        }
    }
    beepbox.ImportPrompt = ImportPrompt;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const { button, div, span, select, option, optgroup, input } = beepbox.HTML;
    function buildOptions(menu, items) {
        for (let index = 0; index < items.length; index++) {
            menu.appendChild(option({ value: index }, items[index]));
        }
        return menu;
    }
    function buildPresetOptions(isNoise) {
        const menu = select();
        menu.appendChild(optgroup({ label: "Edit" }, option({ value: "copyInstrument" }, "Copy Instrument"), option({ value: "pasteInstrument" }, "Paste Instrument"), option({ value: "randomPreset" }, "Random Preset"), option({ value: "randomGenerated" }, "Random Generated")));
        const customTypeGroup = optgroup({ label: beepbox.EditorConfig.presetCategories[0].name });
        if (isNoise) {
            customTypeGroup.appendChild(option({ value: 2 }, beepbox.EditorConfig.valueToPreset(2).name));
            customTypeGroup.appendChild(option({ value: 3 }, beepbox.EditorConfig.valueToPreset(3).name));
            customTypeGroup.appendChild(option({ value: 4 }, beepbox.EditorConfig.valueToPreset(4).name));
        }
        else {
            customTypeGroup.appendChild(option({ value: 0 }, beepbox.EditorConfig.valueToPreset(0).name));
            customTypeGroup.appendChild(option({ value: 6 }, beepbox.EditorConfig.valueToPreset(6).name));
            customTypeGroup.appendChild(option({ value: 5 }, beepbox.EditorConfig.valueToPreset(5).name));
            customTypeGroup.appendChild(option({ value: 3 }, beepbox.EditorConfig.valueToPreset(3).name));
            customTypeGroup.appendChild(option({ value: 1 }, beepbox.EditorConfig.valueToPreset(1).name));
        }
        menu.appendChild(customTypeGroup);
        for (let categoryIndex = 1; categoryIndex < beepbox.EditorConfig.presetCategories.length; categoryIndex++) {
            const category = beepbox.EditorConfig.presetCategories[categoryIndex];
            const group = optgroup({ label: category.name });
            let foundAny = false;
            for (let presetIndex = 0; presetIndex < category.presets.length; presetIndex++) {
                const preset = category.presets[presetIndex];
                if ((preset.isNoise == true) == isNoise) {
                    group.appendChild(option({ value: (categoryIndex << 6) + presetIndex }, preset.name));
                    foundAny = true;
                }
            }
            if (foundAny)
                menu.appendChild(group);
        }
        return menu;
    }
    function setSelectedValue(menu, value) {
        const stringValue = value.toString();
        if (menu.value != stringValue)
            menu.value = stringValue;
    }
    class Slider {
        constructor(input, _doc, _getChange) {
            this.input = input;
            this._doc = _doc;
            this._getChange = _getChange;
            this._change = null;
            this._value = 0;
            this._oldValue = 0;
            this._whenInput = () => {
                const continuingProspectiveChange = this._doc.lastChangeWas(this._change);
                if (!continuingProspectiveChange)
                    this._oldValue = this._value;
                this._change = this._getChange(this._oldValue, parseInt(this.input.value));
                this._doc.setProspectiveChange(this._change);
            };
            this._whenChange = () => {
                this._doc.record(this._change);
                this._change = null;
            };
            input.addEventListener("input", this._whenInput);
            input.addEventListener("change", this._whenChange);
        }
        updateValue(value) {
            this._value = value;
            this.input.value = String(value);
        }
    }
    class SongEditor {
        constructor(_doc) {
            this._doc = _doc;
            this.prompt = null;
            this._patternEditor = new beepbox.PatternEditor(this._doc);
            this._trackEditor = new beepbox.TrackEditor(this._doc);
            this._loopEditor = new beepbox.LoopEditor(this._doc);
            this._trackContainer = div({ className: "trackContainer" }, this._trackEditor.container, this._loopEditor.container);
            this._barScrollBar = new beepbox.BarScrollBar(this._doc, this._trackContainer);
            this._octaveScrollBar = new beepbox.OctaveScrollBar(this._doc);
            this._piano = new beepbox.Piano(this._doc);
            this._editorBox = div(div({ className: "editorBox noSelection", style: "height: 481px; display: flex; flex-direction: row; margin-bottom: 6px;" }, this._piano.container, this._patternEditor.container, this._octaveScrollBar.container), this._trackContainer, this._barScrollBar.container);
            this._playButton = button({ style: "width: 80px;", type: "button" });
            this._prevBarButton = button({ className: "prevBarButton", style: "width: 40px;", type: "button", title: "Previous Bar (left bracket)" });
            this._nextBarButton = button({ className: "nextBarButton", style: "width: 40px;", type: "button", title: "Next Bar (right bracket)" });
            this._volumeSlider = input({ title: "main volume", style: "width: 5em; flex-grow: 1; margin: 0;", type: "range", min: "0", max: "100", value: "50", step: "1" });
            this._fileMenu = select({ style: "width: 100%;" }, option({ selected: true, disabled: true, hidden: false }, "File"), option({ value: "new" }, "+ New Blank Song"), option({ value: "import" }, "â†‘ Import Song..."), option({ value: "export" }, "â†“ Export Song..."), option({ value: "copyUrl" }, "âŽ˜ Copy Song URL"), option({ value: "shareUrl" }, "â¤³ Share Song URL"), option({ value: "viewPlayer" }, "â–¶ View in Song Player"), option({ value: "copyEmbed" }, "âŽ˜ Copy HTML Embed Code"));
            this._editMenu = select({ style: "width: 100%;" }, option({ selected: true, disabled: true, hidden: false }, "Edit"), option({ value: "undo" }, "Undo (Z)"), option({ value: "redo" }, "Redo (Y)"), option({ value: "copy" }, "Copy Pattern (C)"), option({ value: "pasteNotes" }, "Paste Pattern Notes (V)"), option({ value: "pasteNumbers" }, "Paste Pattern Numbers (â‡§V)"), option({ value: "insertBars" }, "Insert Bar After Selection (âŽ)"), option({ value: "deleteBars" }, "Delete Selected Bar (âŒ«)"), option({ value: "selectAll" }, "Select All (A)"), option({ value: "selectChannel" }, "Select Channel (â‡§A)"), option({ value: "duplicatePatterns" }, "Duplicate Reused Patterns (D)"), option({ value: "transposeUp" }, "Move Notes Up (+)"), option({ value: "transposeDown" }, "Move Notes Down (-)"), option({ value: "forceScale" }, "Snap Notes To Scale"), option({ value: "forceRhythm" }, "Snap Notes To Rhythm"), option({ value: "moveNotesSideways" }, "Move All Notes Sideways..."), option({ value: "beatsPerBar" }, "Change Beats Per Bar..."), option({ value: "barCount" }, "Change Song Length..."), option({ value: "channelSettings" }, "Channel Settings..."), option({ value: "detectKey" }, "Detect Key"));
            this._optionsMenu = select({ style: "width: 100%;" }, option({ selected: true, disabled: true, hidden: false }, "Preferences"), option({ value: "autoPlay" }, "Auto Play On Load"), option({ value: "autoFollow" }, "Auto Follow Track"), option({ value: "showLetters" }, "Show Piano Keys"), option({ value: "showFifth" }, 'Highlight "Fifth" Notes'), option({ value: "showChannels" }, "Show All Channels"), option({ value: "showScrollBar" }, "Octave Scroll Bar"), option({ value: "alwaysShowSettings" }, "Customize All Instruments"));
            this._scaleSelect = buildOptions(select(), beepbox.Config.scales.map(scale => scale.name));
            this._keySelect = buildOptions(select(), beepbox.Config.keys.map(key => key.name).reverse());
            this._tempoSlider = new Slider(input({ style: "margin: 0; width: 4em; flex-grow: 1; vertical-align: middle;", type: "range", min: "0", max: "14", value: "7", step: "1" }), this._doc, (oldValue, newValue) => new beepbox.ChangeTempo(this._doc, oldValue, Math.round(120.0 * Math.pow(2.0, (-4.0 + newValue) / 9.0))));
            this._tempoStepper = input({ style: "width: 3em; margin-left: 0.4em; vertical-align: middle;", type: "number", step: "1" });
            this._reverbSlider = new Slider(input({ style: "margin: 0;", type: "range", min: "0", max: beepbox.Config.reverbRange - 1, value: "0", step: "1" }), this._doc, (oldValue, newValue) => new beepbox.ChangeReverb(this._doc, oldValue, newValue));
            this._rhythmSelect = buildOptions(select(), beepbox.Config.rhythms.map(rhythm => rhythm.name));
            this._pitchedPresetSelect = buildPresetOptions(false);
            this._drumPresetSelect = buildPresetOptions(true);
            this._algorithmSelect = buildOptions(select(), beepbox.Config.algorithms.map(algorithm => algorithm.name));
            this._algorithmSelectRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("algorithm") }, "Algorithm: "), div({ className: "selectContainer" }, this._algorithmSelect));
            this._instrumentSelect = select();
            this._instrumentSelectRow = div({ className: "selectRow", style: "display: none;" }, span({ class: "tip", onclick: () => this._openPrompt("instrumentIndex") }, "Instrument: "), div({ className: "selectContainer" }, this._instrumentSelect));
            this._instrumentVolumeSlider = new Slider(input({ style: "margin: 0;", type: "range", min: -(beepbox.Config.volumeRange - 1), max: "0", value: "0", step: "1" }), this._doc, (oldValue, newValue) => new beepbox.ChangeVolume(this._doc, oldValue, -newValue));
            this._instrumentVolumeSliderRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("instrumentVolume") }, "Volume: "), this._instrumentVolumeSlider.input);
            this._panSlider = new Slider(input({ style: "margin: 0;", type: "range", min: "0", max: beepbox.Config.panMax, value: beepbox.Config.panCenter, step: "1" }), this._doc, (oldValue, newValue) => new beepbox.ChangePan(this._doc, oldValue, newValue));
            this._panSliderRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("pan") }, "Panning: "), this._panSlider.input);
            this._chipWaveSelect = buildOptions(select(), beepbox.Config.chipWaves.map(wave => wave.name));
            this._chipNoiseSelect = buildOptions(select(), beepbox.Config.chipNoises.map(wave => wave.name));
            this._chipWaveSelectRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("chipWave") }, "Wave: "), div({ className: "selectContainer" }, this._chipWaveSelect));
            this._chipNoiseSelectRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("chipNoise") }, "Noise: "), div({ className: "selectContainer" }, this._chipNoiseSelect));
            this._transitionSelect = buildOptions(select(), beepbox.Config.transitions.map(transition => transition.name));
            this._transitionRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("transition") }, "Transition:"), div({ className: "selectContainer" }, this._transitionSelect));
            this._effectsSelect = buildOptions(select(), beepbox.Config.effectsNames);
            this._filterCutoffSlider = new Slider(input({ style: "margin: 0;", type: "range", min: "0", max: beepbox.Config.filterCutoffRange - 1, value: "6", step: "1" }), this._doc, (oldValue, newValue) => new beepbox.ChangeFilterCutoff(this._doc, oldValue, newValue));
            this._filterCutoffRow = div({ className: "selectRow", title: "Low-pass Filter Cutoff Frequency" }, span({ class: "tip", onclick: () => this._openPrompt("filterCutoff") }, "Filter Cut:"), this._filterCutoffSlider.input);
            this._filterResonanceSlider = new Slider(input({ style: "margin: 0;", type: "range", min: "0", max: beepbox.Config.filterResonanceRange - 1, value: "6", step: "1" }), this._doc, (oldValue, newValue) => new beepbox.ChangeFilterResonance(this._doc, oldValue, newValue));
            this._filterResonanceRow = div({ className: "selectRow", title: "Low-pass Filter Peak Resonance" }, span({ class: "tip", onclick: () => this._openPrompt("filterResonance") }, "Filter Peak:"), this._filterResonanceSlider.input);
            this._filterEnvelopeSelect = buildOptions(select(), beepbox.Config.envelopes.map(envelope => envelope.name));
            this._filterEnvelopeRow = div({ className: "selectRow", title: "Low-pass Filter Envelope" }, span({ class: "tip", onclick: () => this._openPrompt("filterEnvelope") }, "Filter Env:"), div({ className: "selectContainer" }, this._filterEnvelopeSelect));
            this._pulseEnvelopeSelect = buildOptions(select(), beepbox.Config.envelopes.map(envelope => envelope.name));
            this._pulseEnvelopeRow = div({ className: "selectRow", title: "Pulse Width Modulator Envelope" }, span({ class: "tip", onclick: () => this._openPrompt("pulseEnvelope") }, "Pulse Env:"), div({ className: "selectContainer" }, this._pulseEnvelopeSelect));
            this._pulseWidthSlider = new Slider(input({ style: "margin: 0;", type: "range", min: "0", max: beepbox.Config.pulseWidthRange - 1, value: "0", step: "1" }), this._doc, (oldValue, newValue) => new beepbox.ChangePulseWidth(this._doc, oldValue, newValue));
            this._pulseWidthRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("pulseWidth") }, "Pulse Width:"), this._pulseWidthSlider.input);
            this._intervalSelect = buildOptions(select(), beepbox.Config.intervals.map(interval => interval.name));
            this._intervalSelectRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("interval") }, "Interval:"), div({ className: "selectContainer" }, this._intervalSelect));
            this._chordSelect = buildOptions(select(), beepbox.Config.chords.map(chord => chord.name));
            this._chordSelectRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("chords") }, "Chords:"), div({ className: "selectContainer" }, this._chordSelect));
            this._vibratoSelect = buildOptions(select(), beepbox.Config.vibratos.map(vibrato => vibrato.name));
            this._vibratoSelectRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("vibrato") }, "Vibrato:"), div({ className: "selectContainer" }, this._vibratoSelect));
            this._phaseModGroup = div({ className: "editor-controls" });
            this._feedbackTypeSelect = buildOptions(select(), beepbox.Config.feedbacks.map(feedback => feedback.name));
            this._feedbackRow1 = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("feedbackType") }, "Feedback:"), div({ className: "selectContainer" }, this._feedbackTypeSelect));
            this._spectrumEditor = new beepbox.SpectrumEditor(this._doc, null);
            this._spectrumRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("spectrum") }, "Spectrum:"), this._spectrumEditor.container);
            this._harmonicsEditor = new beepbox.HarmonicsEditor(this._doc);
            this._harmonicsRow = div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("harmonics") }, "Harmonics:"), this._harmonicsEditor.container);
            this._drumsetGroup = div({ className: "editor-controls" });
            this._feedbackAmplitudeSlider = new Slider(input({ style: "margin: 0; width: 4em;", type: "range", min: "0", max: beepbox.Config.operatorAmplitudeMax, value: "0", step: "1", title: "Feedback Amplitude" }), this._doc, (oldValue, newValue) => new beepbox.ChangeFeedbackAmplitude(this._doc, oldValue, newValue));
            this._feedbackEnvelopeSelect = buildOptions(select({ style: "width: 100%;", title: "Feedback Envelope" }), beepbox.Config.envelopes.map(envelope => envelope.name));
            this._feedbackRow2 = div({ className: "operatorRow" }, div({ style: "margin-right: .1em; visibility: hidden;" }, 1 + "."), div({ style: "width: 3em; margin-right: .3em;" }), this._feedbackAmplitudeSlider.input, div({ className: "selectContainer", style: "width: 5em; margin-left: .3em;" }, this._feedbackEnvelopeSelect));
            this._customizeInstrumentButton = button({ type: "button", style: "margin: 2px 0" }, "Customize Instrument", beepbox.SVG.svg({ style: "flex-shrink: 0; position: absolute; left: 0; top: 50%; margin-top: -1em; pointer-events: none;", width: "2em", height: "2em", viewBox: "-13 -13 26 26" }, beepbox.SVG.g({ transform: "translate(0,1)" }, beepbox.SVG.circle({ cx: "0", cy: "0", r: "6.5", stroke: "currentColor", "stroke-width": "1", fill: "none" }), beepbox.SVG.rect({ x: "-1", y: "-5", width: "2", height: "4", fill: "currentColor", transform: "rotate(30)" }), beepbox.SVG.circle({ cx: "-7.79", cy: "4.5", r: "0.75", fill: "currentColor" }), beepbox.SVG.circle({ cx: "-9", cy: "0", r: "0.75", fill: "currentColor" }), beepbox.SVG.circle({ cx: "-7.79", cy: "-4.5", r: "0.75", fill: "currentColor" }), beepbox.SVG.circle({ cx: "-4.5", cy: "-7.79", r: "0.75", fill: "currentColor" }), beepbox.SVG.circle({ cx: "0", cy: "-9", r: "0.75", fill: "currentColor" }), beepbox.SVG.circle({ cx: "4.5", cy: "-7.79", r: "0.75", fill: "currentColor" }), beepbox.SVG.circle({ cx: "7.79", cy: "-4.5", r: "0.75", fill: "currentColor" }), beepbox.SVG.circle({ cx: "9", cy: "0", r: "0.75", fill: "currentColor" }), beepbox.SVG.circle({ cx: "7.79", cy: "4.5", r: "0.75", fill: "currentColor" }))));
            this._customInstrumentSettingsGroup = div({ className: "editor-controls" }, this._filterCutoffRow, this._filterResonanceRow, this._filterEnvelopeRow, this._transitionRow, div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("effects") }, "Effects:"), div({ className: "selectContainer" }, this._effectsSelect)), this._chordSelectRow, this._vibratoSelectRow, this._intervalSelectRow, this._chipWaveSelectRow, this._chipNoiseSelectRow, this._algorithmSelectRow, this._phaseModGroup, this._feedbackRow1, this._feedbackRow2, this._spectrumRow, this._harmonicsRow, this._drumsetGroup, this._pulseEnvelopeRow, this._pulseWidthRow);
            this._instrumentSettingsGroup = div({ className: "editor-controls" }, this._instrumentSelectRow, this._instrumentVolumeSliderRow, this._panSliderRow, div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("instrumentType") }, "Type: "), div({ className: "selectContainer" }, this._pitchedPresetSelect, this._drumPresetSelect)), this._customizeInstrumentButton, this._customInstrumentSettingsGroup);
	    this._advancedInstrumentSettingsLabel = div({ style: "margin: 3px 0; text-align: center;" }, "Advanced Instrument Settings"),
	    this._advancedSongSettingsLabel = div({ style: "margin: 2px; text-align: center;" }, "Advanced Song Settings"),
            this._promptContainer = div({ className: "promptContainer", style: "display: none;" });
            this.mainLayer = div({ className: "beepboxEditor", tabIndex: "0" }, this._editorBox, div({ className: "editor-widget-column noSelection" }, div({ style: "text-align: center; color: #999;" }, beepbox.EditorConfig.versionDisplayName), div({ className: "editor-widgets" }, div({ className: "editor-controls" }, div({ className: "playback-controls" }, div({ className: "playback-bar-controls" }, this._playButton, this._prevBarButton, this._nextBarButton), div({ className: "playback-volume-controls" }, beepbox.SVG.svg({ style: "flex-shrink: 0;", width: "2em", height: "2em", viewBox: "0 0 26 26" }, beepbox.SVG.path({ d: "M 4 16 L 4 10 L 8 10 L 13 5 L 13 21 L 8 16 z M 15 11 L 16 10 A 7.2 7.2 0 0 1 16 16 L 15 15 A 5.8 5.8 0 0 0 15 12 z M 18 8 L 19 7 A 11.5 11.5 0 0 1 19 19 L 18 18 A 10.1 10.1 0 0 0 18 8 z", fill: "#777" })), this._volumeSlider))), div({ className: "editor-settings" }, div({ className: "editor-song-settings" }, div({ className: "editor-menus" }, div({ className: "selectContainer menu" }, this._fileMenu, beepbox.SVG.svg({ style: "flex-shrink: 0; position: absolute; left: 0; top: 50%; margin-top: -1em; pointer-events: none;", width: "2em", height: "2em", viewBox: "-5 -21 26 26" }, beepbox.SVG.path({ d: "M 2 0 L 2 -16 L 10 -16 L 14 -12 L 14 0 z M 3 -1 L 13 -1 L 13 -11 L 9 -11 L 9 -15 L 3 -15 z", fill: "currentColor" }))), div({ className: "selectContainer menu" }, this._editMenu, beepbox.SVG.svg({ style: "flex-shrink: 0; position: absolute; left: 0; top: 50%; margin-top: -1em; pointer-events: none;", width: "2em", height: "2em", viewBox: "-5 -21 26 26" }, beepbox.SVG.path({ d: "M 0 0 L 1 -4 L 4 -1 z M 2 -5 L 10 -13 L 13 -10 L 5 -2 zM 11 -14 L 13 -16 L 14 -16 L 16 -14 L 16 -13 L 14 -11 z", fill: "currentColor" }))), div({ className: "selectContainer menu" }, this._optionsMenu, beepbox.SVG.svg({ style: "flex-shrink: 0; position: absolute; left: 0; top: 50%; margin-top: -1em; pointer-events: none;", width: "2em", height: "2em", viewBox: "-13 -13 26 26" }, beepbox.SVG.path({ d: "M 5.78 -1.6 L 7.93 -0.94 L 7.93 0.94 L 5.78 1.6 L 4.85 3.53 L 5.68 5.61 L 4.21 6.78 L 2.36 5.52 L 0.27 5.99 L -0.85 7.94 L -2.68 7.52 L -2.84 5.28 L -4.52 3.95 L -6.73 4.28 L -7.55 2.59 L -5.9 1.07 L -5.9 -1.07 L -7.55 -2.59 L -6.73 -4.28 L -4.52 -3.95 L -2.84 -5.28 L -2.68 -7.52 L -0.85 -7.94 L 0.27 -5.99 L 2.36 -5.52 L 4.21 -6.78 L 5.68 -5.61 L 4.85 -3.53 M 2.92 0.67 L 2.92 -0.67 L 2.35 -1.87 L 1.3 -2.7 L 0 -3 L -1.3 -2.7 L -2.35 -1.87 L -2.92 -0.67 L -2.92 0.67 L -2.35 1.87 L -1.3 2.7 L -0 3 L 1.3 2.7 L 2.35 1.87 z", fill: "currentColor" })))), div({ style: "margin: 3px 0; text-align: center; color: #999;" }, "Song Settings"), div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("scale") }, "Scale: "), div({ className: "selectContainer" }, this._scaleSelect)), div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("key") }, "Key: "), div({ className: "selectContainer" }, this._keySelect)), div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("tempo") }, "Tempo: "), span({ style: "display: flex;" }, this._tempoSlider.input, this._tempoStepper)), div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("reverb") }, "Reverb: "), this._reverbSlider.input), div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("rhythm") }, "Rhythm: "), div({ className: "selectContainer" }, this._rhythmSelect))), div({ className: "editor-instrument-settings" }, div({ style: "margin: 3px 0; text-align: center; color: #999;" }, "Instrument Settings"), this._instrumentSettingsGroup)))), this._promptContainer);
            this._wasPlaying = false;
            this._currentPromptName = null;
            this._operatorRows = [];
            this._operatorAmplitudeSliders = [];
            this._operatorEnvelopeSelects = [];
            this._operatorFrequencySelects = [];
            this._drumsetSpectrumEditors = [];
            this._drumsetEnvelopeSelects = [];
            this._refocusStage = () => {
                this.mainLayer.focus();
            };
            this.whenUpdated = () => {
                const trackBounds = this._trackContainer.getBoundingClientRect();
                this._doc.trackVisibleBars = Math.floor((trackBounds.right - trackBounds.left) / 32);
                this._barScrollBar.render();
                this._trackEditor.render();
                const optionCommands = [
                    (this._doc.autoPlay ? "âœ“ " : "") + "Auto Play On Load",
                    (this._doc.autoFollow ? "âœ“ " : "") + "Auto Follow Track",
                    (this._doc.showLetters ? "âœ“ " : "") + "Show Piano Keys",
                    (this._doc.showFifth ? "âœ“ " : "") + 'Highlight "Fifth" Notes',
                    (this._doc.showChannels ? "âœ“ " : "") + "Show All Channels",
                    (this._doc.showScrollBar ? "âœ“ " : "") + "Octave Scroll Bar",
                    (this._doc.alwaysShowSettings ? "âœ“ " : "") + "Customize All Instruments",
                ];
                for (let i = 0; i < optionCommands.length; i++) {
                    const option = this._optionsMenu.children[i + 1];
                    if (option.innerText != optionCommands[i])
                        option.innerText = optionCommands[i];
                }
                const channel = this._doc.song.channels[this._doc.channel];
                const pattern = this._doc.getCurrentPattern();
                const instrumentIndex = this._doc.getCurrentInstrument();
                const instrument = channel.instruments[instrumentIndex];
                const wasActive = this.mainLayer.contains(document.activeElement);
                const activeElement = document.activeElement;
                setSelectedValue(this._scaleSelect, this._doc.song.scale);
                setSelectedValue(this._keySelect, beepbox.Config.keys.length - 1 - this._doc.song.key);
                this._tempoSlider.updateValue(Math.max(0, Math.min(28, Math.round(4.0 + 9.0 * Math.log(this._doc.song.tempo / 120.0) / Math.LN2))));
                this._tempoStepper.value = this._doc.song.tempo.toString();
                this._reverbSlider.updateValue(this._doc.song.reverb);
                setSelectedValue(this._rhythmSelect, this._doc.song.rhythm);
                if (this._doc.song.getChannelIsNoise(this._doc.channel)) {
                    this._pitchedPresetSelect.style.display = "none";
                    this._drumPresetSelect.style.display = "";
                    setSelectedValue(this._drumPresetSelect, instrument.preset);
                }
                else {
                    this._pitchedPresetSelect.style.display = "";
                    this._drumPresetSelect.style.display = "none";
                    setSelectedValue(this._pitchedPresetSelect, instrument.preset);
                }
                if (!this._doc.alwaysShowSettings && instrument.preset != instrument.type) {
                    this._customizeInstrumentButton.style.display = "";
                    this._customInstrumentSettingsGroup.style.display = "none";
                }
                else {
                    this._customizeInstrumentButton.style.display = "none";
                    this._customInstrumentSettingsGroup.style.display = "";
                    if (instrument.type == 2) {
                        this._chipNoiseSelectRow.style.display = "";
                        setSelectedValue(this._chipNoiseSelect, instrument.chipNoise);
                    }
                    else {
                        this._chipNoiseSelectRow.style.display = "none";
                    }
                    if (instrument.type == 3) {
                        this._spectrumRow.style.display = "";
                        this._spectrumEditor.render();
                    }
                    else {
                        this._spectrumRow.style.display = "none";
                    }
                    if (instrument.type == 5) {
                        this._harmonicsRow.style.display = "";
                        this._harmonicsEditor.render();
                    }
                    else {
                        this._harmonicsRow.style.display = "none";
                    }
                    if (instrument.type == 4) {
                        this._drumsetGroup.style.display = "";
                        this._transitionRow.style.display = "none";
                        this._chordSelectRow.style.display = "none";
                        this._filterCutoffRow.style.display = "none";
                        this._filterResonanceRow.style.display = "none";
                        this._filterEnvelopeRow.style.display = "none";
                        for (let i = 0; i < beepbox.Config.drumCount; i++) {
                            setSelectedValue(this._drumsetEnvelopeSelects[i], instrument.drumsetEnvelopes[i]);
                            this._drumsetSpectrumEditors[i].render();
                        }
                    }
                    else {
                        this._drumsetGroup.style.display = "none";
                        this._transitionRow.style.display = "";
                        this._chordSelectRow.style.display = "";
                        this._filterCutoffRow.style.display = "";
                        this._filterResonanceRow.style.display = "";
                        this._filterEnvelopeRow.style.display = "";
                    }
                    if (instrument.type == 0) {
                        this._chipWaveSelectRow.style.display = "";
                        setSelectedValue(this._chipWaveSelect, instrument.chipWave);
                    }
                    else {
                        this._chipWaveSelectRow.style.display = "none";
                    }
                    if (instrument.type == 1) {
                        this._algorithmSelectRow.style.display = "";
                        this._phaseModGroup.style.display = "";
                        this._feedbackRow1.style.display = "";
                        this._feedbackRow2.style.display = "";
                        setSelectedValue(this._algorithmSelect, instrument.algorithm);
                        setSelectedValue(this._feedbackTypeSelect, instrument.feedbackType);
                        this._feedbackAmplitudeSlider.updateValue(instrument.feedbackAmplitude);
                        setSelectedValue(this._feedbackEnvelopeSelect, instrument.feedbackEnvelope);
                        this._feedbackEnvelopeSelect.parentElement.style.color = (instrument.feedbackAmplitude > 0) ? "" : "#999";
                        for (let i = 0; i < beepbox.Config.operatorCount; i++) {
                            const isCarrier = (i < beepbox.Config.algorithms[instrument.algorithm].carrierCount);
                            this._operatorRows[i].style.color = isCarrier ? "white" : "";
                            setSelectedValue(this._operatorFrequencySelects[i], instrument.operators[i].frequency);
                            this._operatorAmplitudeSliders[i].updateValue(instrument.operators[i].amplitude);
                            setSelectedValue(this._operatorEnvelopeSelects[i], instrument.operators[i].envelope);
                            const operatorName = (isCarrier ? "Voice " : "Modulator ") + (i + 1);
                            this._operatorFrequencySelects[i].title = operatorName + " Frequency";
                            this._operatorAmplitudeSliders[i].input.title = operatorName + (isCarrier ? " Volume" : " Amplitude");
                            this._operatorEnvelopeSelects[i].title = operatorName + " Envelope";
                            this._operatorEnvelopeSelects[i].parentElement.style.color = (instrument.operators[i].amplitude > 0) ? "" : "#999";
                        }
                    }
                    else {
                        this._algorithmSelectRow.style.display = "none";
                        this._phaseModGroup.style.display = "none";
                        this._feedbackRow1.style.display = "none";
                        this._feedbackRow2.style.display = "none";
                    }
                    if (instrument.type == 6) {
                        this._pulseEnvelopeRow.style.display = "";
                        this._pulseWidthRow.style.display = "";
                        this._pulseWidthSlider.input.title = beepbox.prettyNumber(Math.pow(0.5, (beepbox.Config.pulseWidthRange - instrument.pulseWidth - 1) * 0.5) * 50) + "%";
                        setSelectedValue(this._pulseEnvelopeSelect, instrument.pulseEnvelope);
                        this._pulseWidthSlider.updateValue(instrument.pulseWidth);
                    }
                    else {
                        this._pulseEnvelopeRow.style.display = "none";
                        this._pulseWidthRow.style.display = "none";
                    }
                    if (instrument.type == 2) {
                        this._vibratoSelectRow.style.display = "none";
                        this._intervalSelectRow.style.display = "none";
                    }
                    else if (instrument.type == 3) {
                        this._vibratoSelectRow.style.display = "none";
                        this._intervalSelectRow.style.display = "none";
                    }
                    else if (instrument.type == 4) {
                        this._vibratoSelectRow.style.display = "none";
                        this._intervalSelectRow.style.display = "none";
                    }
                    else if (instrument.type == 0) {
                        this._vibratoSelectRow.style.display = "";
                        this._intervalSelectRow.style.display = "";
                    }
                    else if (instrument.type == 1) {
                        this._vibratoSelectRow.style.display = "";
                        this._intervalSelectRow.style.display = "none";
                    }
                    else if (instrument.type == 5) {
                        this._vibratoSelectRow.style.display = "";
                        this._intervalSelectRow.style.display = "";
                    }
                    else if (instrument.type == 6) {
                        this._vibratoSelectRow.style.display = "";
                        this._intervalSelectRow.style.display = "none";
                    }
                    else {
                        throw new Error("Unrecognized instrument type: " + instrument.type);
                    }
                }
                for (let chordIndex = 0; chordIndex < beepbox.Config.chords.length; chordIndex++) {
                    const hidden = !beepbox.Config.instrumentTypeHasSpecialInterval[instrument.type] ? beepbox.Config.chords[chordIndex].isCustomInterval : false;
                    const option = this._chordSelect.children[chordIndex];
                    if (hidden) {
                        if (!option.hasAttribute("hidden")) {
                            option.setAttribute("hidden", "");
                        }
                    }
                    else {
                        option.removeAttribute("hidden");
                    }
                }
                for (let effectsIndex = 0; effectsIndex < beepbox.Config.effectsNames.length; effectsIndex++) {
                    const hidden = !beepbox.Config.instrumentTypeHasChorus[instrument.type] ? beepbox.Config.effectsNames[effectsIndex].indexOf("chorus") != -1 : false;
                    const option = this._effectsSelect.children[effectsIndex];
                    if (hidden) {
                        if (!option.hasAttribute("hidden")) {
                            option.setAttribute("hidden", "");
                        }
                    }
                    else {
                        option.removeAttribute("hidden");
                    }
                }
                this._instrumentSelectRow.style.display = (this._doc.song.instrumentsPerChannel > 1) ? "" : "none";
                this._instrumentSelectRow.style.visibility = (pattern == null) ? "hidden" : "";
                if (this._instrumentSelect.children.length != this._doc.song.instrumentsPerChannel) {
                    while (this._instrumentSelect.firstChild)
                        this._instrumentSelect.removeChild(this._instrumentSelect.firstChild);
                    const instrumentList = [];
                    for (let i = 0; i < this._doc.song.instrumentsPerChannel; i++) {
                        instrumentList.push(i + 1);
                    }
                    buildOptions(this._instrumentSelect, instrumentList);
                }
                this._instrumentSettingsGroup.style.color = beepbox.ColorConfig.getChannelColor(this._doc.song, this._doc.channel).noteBright;
                this._filterCutoffSlider.updateValue(instrument.filterCutoff);
                this._filterResonanceSlider.updateValue(instrument.filterResonance);
                setSelectedValue(this._filterEnvelopeSelect, instrument.filterEnvelope);
                setSelectedValue(this._transitionSelect, instrument.transition);
                setSelectedValue(this._effectsSelect, instrument.effects);
                setSelectedValue(this._vibratoSelect, instrument.vibrato);
                setSelectedValue(this._intervalSelect, instrument.interval);
                setSelectedValue(this._chordSelect, instrument.chord);
                this._instrumentVolumeSlider.updateValue(-instrument.volume);
                this._panSlider.updateValue(instrument.pan);
                setSelectedValue(this._instrumentSelect, instrumentIndex);
                this._piano.container.style.display = this._doc.showLetters ? "" : "none";
                this._octaveScrollBar.container.style.display = this._doc.showScrollBar ? "" : "none";
                this._barScrollBar.container.style.display = this._doc.song.barCount > this._doc.trackVisibleBars ? "" : "none";
                let patternWidth = 512;
                if (this._doc.showLetters)
                    patternWidth -= 32;
                if (this._doc.showScrollBar)
                    patternWidth -= 20;
                this._patternEditor.container.style.width = String(patternWidth) + "px";
                this._volumeSlider.value = String(this._doc.volume);
                if (wasActive && activeElement != null && activeElement.clientWidth == 0) {
                    this._refocusStage();
                }
                this._setPrompt(this._doc.prompt);
                if (this._doc.autoFollow && !this._doc.synth.playing) {
                    this._doc.synth.snapToBar(this._doc.bar);
                }
            };
            this._tempoStepperCaptureNumberKeys = (event) => {
                switch (event.keyCode) {
                    case 8:
                    case 13:
                    case 38:
                    case 40:
                    case 37:
                    case 39:
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                    case 54:
                    case 55:
                    case 56:
                    case 57:
                        event.stopPropagation();
                        break;
                }
            };
            this._whenKeyPressed = (event) => {
                if (this.prompt) {
                    if (event.keyCode == 27) {
                        window.history.back();
                    }
                    return;
                }
                this._trackEditor.onKeyPressed(event);
                switch (event.keyCode) {
                    case 32:
                        this._togglePlay();
                        event.preventDefault();
                        break;
                    case 90:
                        if (event.shiftKey) {
                            this._doc.redo();
                        }
                        else {
                            this._doc.undo();
                        }
                        event.preventDefault();
                        break;
                    case 89:
                        this._doc.redo();
                        event.preventDefault();
                        break;
                    case 67:
                        this._trackEditor.copy();
                        event.preventDefault();
                        break;
                    case 13:
                        this._trackEditor.insertBars();
                        event.preventDefault();
                        break;
                    case 8:
                        this._trackEditor.deleteBars();
                        event.preventDefault();
                        break;
                    case 65:
                        if (event.shiftKey) {
                            this._trackEditor.selectChannel();
                        }
                        else {
                            this._trackEditor.selectAll();
                        }
                        event.preventDefault();
                        break;
                    case 68:
                        this._trackEditor.duplicatePatterns();
                        event.preventDefault();
                        break;
                    case 86:
                        if (event.shiftKey) {
                            this._trackEditor.pasteNumbers();
                        }
                        else {
                            this._trackEditor.pasteNotes();
                        }
                        event.preventDefault();
                        break;
                    case 73:
                        if (event.shiftKey) {
                            const instrument = this._doc.song.channels[this._doc.channel].instruments[this._doc.getCurrentInstrument()];
                            const instrumentObject = instrument.toJsonObject();
                            delete instrumentObject["volume"];
                            delete instrumentObject["pan"];
                            delete instrumentObject["preset"];
                            this._copyTextToClipboard(JSON.stringify(instrumentObject));
                        }
                        event.preventDefault();
                        break;
                    case 219:
                        this._doc.synth.prevBar();
                        if (this._doc.autoFollow) {
                            new beepbox.ChangeChannelBar(this._doc, this._doc.channel, Math.floor(this._doc.synth.playhead));
                        }
                        event.preventDefault();
                        break;
                    case 221:
                        this._doc.synth.nextBar();
                        if (this._doc.autoFollow) {
                            new beepbox.ChangeChannelBar(this._doc, this._doc.channel, Math.floor(this._doc.synth.playhead));
                        }
                        event.preventDefault();
                        break;
                    case 189:
                    case 173:
                        this._trackEditor.transpose(false, event.shiftKey);
                        event.preventDefault();
                        break;
                    case 187:
                    case 61:
                        this._trackEditor.transpose(true, event.shiftKey);
                        event.preventDefault();
                        break;
                }
            };
            this._whenPrevBarPressed = () => {
                this._doc.synth.prevBar();
            };
            this._whenNextBarPressed = () => {
                this._doc.synth.nextBar();
            };
            this._togglePlay = () => {
                if (this._doc.synth.playing) {
                    this._pause();
                }
                else {
                    this._play();
                }
            };
            this._setVolumeSlider = () => {
                this._doc.setVolume(Number(this._volumeSlider.value));
            };
            this._whenSetTempo = () => {
                this._doc.record(new beepbox.ChangeTempo(this._doc, -1, parseInt(this._tempoStepper.value) | 0));
            };
            this._whenSetScale = () => {
                this._doc.record(new beepbox.ChangeScale(this._doc, this._scaleSelect.selectedIndex));
            };
            this._whenSetKey = () => {
                this._doc.record(new beepbox.ChangeKey(this._doc, beepbox.Config.keys.length - 1 - this._keySelect.selectedIndex));
            };
            this._whenSetRhythm = () => {
                this._doc.record(new beepbox.ChangeRhythm(this._doc, this._rhythmSelect.selectedIndex));
            };
            this._whenSetPitchedPreset = () => {
                this._setPreset(this._pitchedPresetSelect.value);
            };
            this._whenSetDrumPreset = () => {
                this._setPreset(this._drumPresetSelect.value);
            };
            this._whenSetFeedbackType = () => {
                this._doc.record(new beepbox.ChangeFeedbackType(this._doc, this._feedbackTypeSelect.selectedIndex));
            };
            this._whenSetFeedbackEnvelope = () => {
                this._doc.record(new beepbox.ChangeFeedbackEnvelope(this._doc, this._feedbackEnvelopeSelect.selectedIndex));
            };
            this._whenSetAlgorithm = () => {
                this._doc.record(new beepbox.ChangeAlgorithm(this._doc, this._algorithmSelect.selectedIndex));
            };
            this._whenSetInstrument = () => {
                this._trackEditor.setInstrument(this._instrumentSelect.selectedIndex);
            };
            this._whenCustomizePressed = () => {
                this._doc.record(new beepbox.ChangeCustomizeInstrument(this._doc));
            };
            this._whenSetChipWave = () => {
                this._doc.record(new beepbox.ChangeChipWave(this._doc, this._chipWaveSelect.selectedIndex));
            };
            this._whenSetNoiseWave = () => {
                this._doc.record(new beepbox.ChangeNoiseWave(this._doc, this._chipNoiseSelect.selectedIndex));
            };
            this._whenSetFilterEnvelope = () => {
                this._doc.record(new beepbox.ChangeFilterEnvelope(this._doc, this._filterEnvelopeSelect.selectedIndex));
            };
            this._whenSetPulseEnvelope = () => {
                this._doc.record(new beepbox.ChangePulseEnvelope(this._doc, this._pulseEnvelopeSelect.selectedIndex));
            };
            this._whenSetTransition = () => {
                this._doc.record(new beepbox.ChangeTransition(this._doc, this._transitionSelect.selectedIndex));
            };
            this._whenSetEffects = () => {
                this._doc.record(new beepbox.ChangeEffects(this._doc, this._effectsSelect.selectedIndex));
            };
            this._whenSetVibrato = () => {
                this._doc.record(new beepbox.ChangeVibrato(this._doc, this._vibratoSelect.selectedIndex));
            };
            this._whenSetInterval = () => {
                this._doc.record(new beepbox.ChangeInterval(this._doc, this._intervalSelect.selectedIndex));
            };
            this._whenSetChord = () => {
                this._doc.record(new beepbox.ChangeChord(this._doc, this._chordSelect.selectedIndex));
            };
            this._fileMenuHandler = (event) => {
                switch (this._fileMenu.value) {
                    case "new":
                        this._doc.goBackToStart();
                        this._doc.record(new beepbox.ChangeSong(this._doc, ""));
                        break;
                    case "export":
                        this._openPrompt("export");
                        break;
                    case "import":
                        this._openPrompt("import");
                        break;
                    case "copyUrl":
                        {
                            this._copyTextToClipboard(location.href);
                        }
                        break;
                    case "shareUrl":
                        navigator.share({ url: location.href });
                        break;
                    case "viewPlayer":
                        location.href = "player/#song=" + this._doc.song.toBase64String();
                        break;
                    case "copyEmbed":
                        this._copyTextToClipboard(`<iframe width="384" height="60" style="border: none;" src="${new URL("player/#song=" + this._doc.song.toBase64String(), location.href).href}"></iframe>`);
                        break;
                }
                this._fileMenu.selectedIndex = 0;
            };
            this._editMenuHandler = (event) => {
                switch (this._editMenu.value) {
                    case "undo":
                        this._doc.undo();
                        break;
                    case "redo":
                        this._doc.redo();
                        break;
                    case "copy":
                        this._trackEditor.copy();
                        break;
                    case "insertBars":
                        this._trackEditor.insertBars();
                        break;
                    case "deleteBars":
                        this._trackEditor.deleteBars();
                        break;
                    case "pasteNotes":
                        this._trackEditor.pasteNotes();
                        break;
                    case "pasteNumbers":
                        this._trackEditor.pasteNumbers();
                        break;
                    case "transposeUp":
                        this._trackEditor.transpose(true, false);
                        break;
                    case "transposeDown":
                        this._trackEditor.transpose(false, false);
                        break;
                    case "selectAll":
                        this._trackEditor.selectAll();
                        break;
                    case "selectChannel":
                        this._trackEditor.selectChannel();
                        break;
                    case "duplicatePatterns":
                        this._trackEditor.duplicatePatterns();
                        break;
                    case "detectKey":
                        this._doc.record(new beepbox.ChangeDetectKey(this._doc));
                        break;
                    case "forceScale":
                        this._trackEditor.forceScale();
                        break;
                    case "forceRhythm":
                        this._trackEditor.forceRhythm();
                        break;
                    case "barCount":
                        this._openPrompt("barCount");
                        break;
                    case "beatsPerBar":
                        this._openPrompt("beatsPerBar");
                        break;
                    case "moveNotesSideways":
                        this._openPrompt("moveNotesSideways");
                        break;
                    case "channelSettings":
                        this._openPrompt("channelSettings");
                        break;
                }
                this._editMenu.selectedIndex = 0;
            };
            this._optionsMenuHandler = (event) => {
                switch (this._optionsMenu.value) {
                    case "autoPlay":
                        this._doc.autoPlay = !this._doc.autoPlay;
                        break;
                    case "autoFollow":
                        this._doc.autoFollow = !this._doc.autoFollow;
                        break;
                    case "showLetters":
                        this._doc.showLetters = !this._doc.showLetters;
                        break;
                    case "showFifth":
                        this._doc.showFifth = !this._doc.showFifth;
                        break;
                    case "showChannels":
                        this._doc.showChannels = !this._doc.showChannels;
                        break;
                    case "showScrollBar":
                        this._doc.showScrollBar = !this._doc.showScrollBar;
                        break;
                    case "alwaysShowSettings":
                        this._doc.alwaysShowSettings = !this._doc.alwaysShowSettings;
                        break;
                }
                this._optionsMenu.selectedIndex = 0;
                this._doc.notifier.changed();
                this._doc.savePreferences();
            };
            this._doc.notifier.watch(this.whenUpdated);
            if (!("share" in navigator)) {
                this._fileMenu.removeChild(this._fileMenu.querySelector("[value='shareUrl']"));
            }
            this._phaseModGroup.appendChild(div({ className: "operatorRow", style: "color: #999; height: 1em; margin-top: 0.5em;" }, div({ style: "margin-right: .1em; visibility: hidden;" }, 1 + "."), div({ style: "width: 3em; margin-right: .3em;", class: "tip", onclick: () => this._openPrompt("operatorFrequency") }, "Freq:"), div({ style: "width: 4em; margin: 0;", class: "tip", onclick: () => this._openPrompt("operatorVolume") }, "Volume:"), div({ style: "width: 5em; margin-left: .3em;", class: "tip", onclick: () => this._openPrompt("operatorEnvelope") }, "Envelope:")));
            for (let i = 0; i < beepbox.Config.operatorCount; i++) {
                const operatorIndex = i;
                const operatorNumber = div({ style: "margin-right: .1em; color: #999;" }, i + 1 + ".");
                const frequencySelect = buildOptions(select({ style: "width: 100%;", title: "Frequency" }), beepbox.Config.operatorFrequencies.map(freq => freq.name));
                const amplitudeSlider = new Slider(input({ style: "margin: 0; width: 4em;", type: "range", min: "0", max: beepbox.Config.operatorAmplitudeMax, value: "0", step: "1", title: "Volume" }), this._doc, (oldValue, newValue) => new beepbox.ChangeOperatorAmplitude(this._doc, operatorIndex, oldValue, newValue));
                const envelopeSelect = buildOptions(select({ style: "width: 100%;", title: "Envelope" }), beepbox.Config.envelopes.map(envelope => envelope.name));
                const row = div({ className: "operatorRow" }, operatorNumber, div({ className: "selectContainer", style: "width: 3em; margin-right: .3em;" }, frequencySelect), amplitudeSlider.input, div({ className: "selectContainer", style: "width: 5em; margin-left: .3em;" }, envelopeSelect));
                this._phaseModGroup.appendChild(row);
                this._operatorRows[i] = row;
                this._operatorAmplitudeSliders[i] = amplitudeSlider;
                this._operatorEnvelopeSelects[i] = envelopeSelect;
                this._operatorFrequencySelects[i] = frequencySelect;
                envelopeSelect.addEventListener("change", () => {
                    this._doc.record(new beepbox.ChangeOperatorEnvelope(this._doc, operatorIndex, envelopeSelect.selectedIndex));
                });
                frequencySelect.addEventListener("change", () => {
                    this._doc.record(new beepbox.ChangeOperatorFrequency(this._doc, operatorIndex, frequencySelect.selectedIndex));
                });
            }
            this._drumsetGroup.appendChild(div({ className: "selectRow" }, span({ class: "tip", onclick: () => this._openPrompt("drumsetEnvelope") }, "Envelope:"), span({ class: "tip", onclick: () => this._openPrompt("drumsetSpectrum") }, "Spectrum:")));
            for (let i = beepbox.Config.drumCount - 1; i >= 0; i--) {
                const drumIndex = i;
                const spectrumEditor = new beepbox.SpectrumEditor(this._doc, drumIndex);
                spectrumEditor.container.addEventListener("mousedown", this._refocusStage);
                this._drumsetSpectrumEditors[i] = spectrumEditor;
                const envelopeSelect = buildOptions(select({ style: "width: 100%;", title: "Filter Envelope" }), beepbox.Config.envelopes.map(envelope => envelope.name));
                this._drumsetEnvelopeSelects[i] = envelopeSelect;
                envelopeSelect.addEventListener("change", () => {
                    this._doc.record(new beepbox.ChangeDrumsetEnvelope(this._doc, drumIndex, envelopeSelect.selectedIndex));
                });
                const row = div({ className: "selectRow" }, div({ className: "selectContainer", style: "width: 5em; margin-right: .3em;" }, envelopeSelect), this._drumsetSpectrumEditors[i].container);
                this._drumsetGroup.appendChild(row);
            }
            this._fileMenu.addEventListener("change", this._fileMenuHandler);
            this._editMenu.addEventListener("change", this._editMenuHandler);
            this._optionsMenu.addEventListener("change", this._optionsMenuHandler);
            this._tempoStepper.addEventListener("change", this._whenSetTempo);
            this._scaleSelect.addEventListener("change", this._whenSetScale);
            this._keySelect.addEventListener("change", this._whenSetKey);
            this._rhythmSelect.addEventListener("change", this._whenSetRhythm);
            this._pitchedPresetSelect.addEventListener("change", this._whenSetPitchedPreset);
            this._drumPresetSelect.addEventListener("change", this._whenSetDrumPreset);
            this._algorithmSelect.addEventListener("change", this._whenSetAlgorithm);
            this._instrumentSelect.addEventListener("change", this._whenSetInstrument);
            this._customizeInstrumentButton.addEventListener("click", this._whenCustomizePressed);
            this._feedbackTypeSelect.addEventListener("change", this._whenSetFeedbackType);
            this._feedbackEnvelopeSelect.addEventListener("change", this._whenSetFeedbackEnvelope);
            this._chipWaveSelect.addEventListener("change", this._whenSetChipWave);
            this._chipNoiseSelect.addEventListener("change", this._whenSetNoiseWave);
            this._transitionSelect.addEventListener("change", this._whenSetTransition);
            this._effectsSelect.addEventListener("change", this._whenSetEffects);
            this._filterEnvelopeSelect.addEventListener("change", this._whenSetFilterEnvelope);
            this._pulseEnvelopeSelect.addEventListener("change", this._whenSetPulseEnvelope);
            this._intervalSelect.addEventListener("change", this._whenSetInterval);
            this._chordSelect.addEventListener("change", this._whenSetChord);
            this._vibratoSelect.addEventListener("change", this._whenSetVibrato);
            this._playButton.addEventListener("click", this._togglePlay);
            this._prevBarButton.addEventListener("click", this._whenPrevBarPressed);
            this._nextBarButton.addEventListener("click", this._whenNextBarPressed);
            this._volumeSlider.addEventListener("input", this._setVolumeSlider);
            this._editorBox.addEventListener("mousedown", this._refocusStage);
            this._spectrumEditor.container.addEventListener("mousedown", this._refocusStage);
            this._harmonicsEditor.container.addEventListener("mousedown", this._refocusStage);
            this._tempoStepper.addEventListener("keydown", this._tempoStepperCaptureNumberKeys, false);
            this.mainLayer.addEventListener("keydown", this._whenKeyPressed);
            this._promptContainer.addEventListener("click", (event) => {
                if (event.target == this._promptContainer) {
                    this._doc.undo();
                }
            });
            if (beepbox.isMobile) {
                const autoPlayOption = this._optionsMenu.children[1];
                autoPlayOption.disabled = true;
                autoPlayOption.setAttribute("hidden", "");
            }
        }
        _openPrompt(promptName) {
            this._doc.openPrompt(promptName);
            this._setPrompt(promptName);
        }
        _setPrompt(promptName) {
            if (this._currentPromptName == promptName)
                return;
            this._currentPromptName = promptName;
            if (this.prompt) {
                if (this._wasPlaying && !(this.prompt instanceof beepbox.TipPrompt)) {
                    this._play();
                }
                this._wasPlaying = false;
                this._promptContainer.style.display = "none";
                this._promptContainer.removeChild(this.prompt.container);
                this.prompt.cleanUp();
                this.prompt = null;
                this.mainLayer.focus();
            }
            if (promptName) {
                switch (promptName) {
                    case "export":
                        this.prompt = new beepbox.ExportPrompt(this._doc);
                        break;
                    case "import":
                        this.prompt = new beepbox.ImportPrompt(this._doc);
                        break;
                    case "barCount":
                        this.prompt = new beepbox.SongDurationPrompt(this._doc);
                        break;
                    case "beatsPerBar":
                        this.prompt = new beepbox.BeatsPerBarPrompt(this._doc);
                        break;
                    case "moveNotesSideways":
                        this.prompt = new beepbox.MoveNotesSidewaysPrompt(this._doc);
                        break;
                    case "channelSettings":
                        this.prompt = new beepbox.ChannelSettingsPrompt(this._doc);
                        break;
                    default:
                        this.prompt = new beepbox.TipPrompt(this._doc, promptName);
                        break;
                }
                if (this.prompt) {
                    if (!(this.prompt instanceof beepbox.TipPrompt)) {
                        this._wasPlaying = this._doc.synth.playing;
                        this._pause();
                    }
                    this._promptContainer.style.display = null;
                    this._promptContainer.appendChild(this.prompt.container);
                }
            }
        }
        updatePlayButton() {
            if (this._doc.synth.playing) {
                this._playButton.classList.remove("playButton");
                this._playButton.classList.add("pauseButton");
                this._playButton.title = "Pause (Space)";
                this._playButton.innerText = "Pause";
            }
            else {
                this._playButton.classList.remove("pauseButton");
                this._playButton.classList.add("playButton");
                this._playButton.title = "Play (Space)";
                this._playButton.innerText = "Play";
            }
        }
        _copyTextToClipboard(text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).catch(() => {
                    window.prompt("Copy to clipboard:", text);
                });
                return;
            }
            const textField = document.createElement("textarea");
            textField.innerText = text;
            document.body.appendChild(textField);
            textField.select();
            const succeeded = document.execCommand("copy");
            textField.remove();
            this._refocusStage();
            if (!succeeded)
                window.prompt("Copy this:", text);
        }
        _play() {
            this._doc.synth.play();
            this.updatePlayButton();
        }
        _pause() {
            this._doc.synth.pause();
            if (this._doc.autoFollow) {
                this._doc.synth.snapToBar(this._doc.bar);
            }
            else {
                this._doc.synth.snapToBar();
            }
            this.updatePlayButton();
        }
        _copyInstrument() {
            const channel = this._doc.song.channels[this._doc.channel];
            const instrument = channel.instruments[this._doc.getCurrentInstrument()];
            const instrumentCopy = instrument.toJsonObject();
            instrumentCopy["isDrum"] = this._doc.song.getChannelIsNoise(this._doc.channel);
            window.localStorage.setItem("instrumentCopy", JSON.stringify(instrumentCopy));
        }
        _pasteInstrument() {
            const channel = this._doc.song.channels[this._doc.channel];
            const instrument = channel.instruments[this._doc.getCurrentInstrument()];
            const instrumentCopy = JSON.parse(String(window.localStorage.getItem("instrumentCopy")));
            if (instrumentCopy != null && instrumentCopy["isDrum"] == this._doc.song.getChannelIsNoise(this._doc.channel)) {
                this._doc.record(new beepbox.ChangePasteInstrument(this._doc, instrument, instrumentCopy));
            }
        }
        _randomPreset() {
            const isNoise = this._doc.song.getChannelIsNoise(this._doc.channel);
            this._doc.record(new beepbox.ChangePreset(this._doc, beepbox.pickRandomPresetValue(isNoise)));
        }
        _randomGenerated() {
            this._doc.record(new beepbox.ChangeRandomGeneratedInstrument(this._doc));
        }
        _setPreset(preset) {
            if (isNaN(preset)) {
                switch (preset) {
                    case "copyInstrument":
                        this._copyInstrument();
                        break;
                    case "pasteInstrument":
                        this._pasteInstrument();
                        break;
                    case "randomPreset":
                        this._randomPreset();
                        break;
                    case "randomGenerated":
                        this._randomGenerated();
                        break;
                }
                this._doc.notifier.changed();
            }
            else {
                this._doc.record(new beepbox.ChangePreset(this._doc, parseInt(preset)));
            }
        }
    }
    beepbox.SongEditor = SongEditor;
})(beepbox || (beepbox = {}));
var beepbox;
(function (beepbox) {
    const doc = new beepbox.SongDocument(location.hash);
    const editor = new beepbox.SongEditor(doc);
    const beepboxEditorContainer = document.getElementById("beepboxEditorContainer");
    beepboxEditorContainer.appendChild(editor.mainLayer);
    editor.whenUpdated();
    editor.mainLayer.focus();
    if (!beepbox.isMobile && doc.autoPlay) {
        function autoplay() {
            if (!document.hidden) {
                doc.synth.play();
                editor.updatePlayButton();
                window.removeEventListener("visibilitychange", autoplay);
            }
        }
        if (document.hidden) {
            window.addEventListener("visibilitychange", autoplay);
        }
        else {
            autoplay();
        }
    }
    if ("scrollRestoration" in history)
        history.scrollRestoration = "manual";
    editor.updatePlayButton();
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service_worker.js", { updateViaCache: "all", scope: "/" }).catch(() => { });
    }
})(beepbox || (beepbox = {}));
//# sourceMappingURL=beepbox_editor.js.map

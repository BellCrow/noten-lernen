import { Difficulties } from "./Options";

export const Clefs = Object.freeze({
    Treble: ("Clefs.Treble"),
    Bass: ("Clefs.Bass"),
    Alto: ("Clefs.Alto"),
    Tenor: ("Clefs.Tenor"),
});

export default class Exercise {
    constructor(note, clef) {
        this.note = note;
        this.clef = clef;
    }
    get clefName() {
        switch (this.clef) {
            case (Clefs.Treble):
                return "treble";
            case (Clefs.Bass):
                return "bass";
            case (Clefs.Alto):
                return "alto";
            case (Clefs.Tenor):
                return "tenor";
        }
    }
    get noteName(){
        return this.note.noteName;
    }
    static minBassValue(difficulty) {
        switch (difficulty) {
            case Difficulties.Easy:
                return 28;
            case Difficulties.Normal:
                return 20;
            case Difficulties.Hard:
            default:
                return 11;
        }
    }
    static maxBassValue(difficulty) {
        switch (difficulty) {
            case Difficulties.Easy:
                return 40;
            case Difficulties.Normal:
                return 40;
            case Difficulties.Hard:
            default:
                return 49;
        }
    }
    static minTrebleValue(difficulty) {
        switch (difficulty) {
            case Difficulties.Easy:
                return 40;
            case Difficulties.Normal:
                return 40;
            case Difficulties.Hard:
            default:
                return 32;
        }
    }
    static maxTrebleValue(difficulty) {
        switch (difficulty) {
            case Difficulties.Easy:
                return 52;
            case Difficulties.Normal:
                return 61;
            case Difficulties.Hard:
            default:
                return 69;
        }
    }
    static minAltoValue(difficulty) {
        switch (difficulty) {
            case Difficulties.Easy:
                return 35;
            case Difficulties.Normal:
                return 28;
            case Difficulties.Hard:
            default:
                return 21;
        }
    }
    static maxAltoValue(difficulty) {
        switch (difficulty) {
            case Difficulties.Easy:
                return 47;
            case Difficulties.Normal:
                return 52;
            case Difficulties.Hard:
            default:
                return 59;
        }
    }
    static minTenorValue(difficulty) {
        switch (difficulty) {
            case Difficulties.Easy:
                return 35;
            case Difficulties.Normal:
                return 28;
            case Difficulties.Hard:
            default:
                return 18;
        }
    }
    static maxTenorValue(difficulty) {
        switch (difficulty) {
            case Difficulties.Easy:
                return 47;
            case Difficulties.Normal:
                return 52;
            case Difficulties.Hard:
            default:
                return 56;
        }
    }
}


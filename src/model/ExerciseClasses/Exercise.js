/*
TODO: this should proaably not reside here. 
I should create a clef class, that can hold a note. 
This clef can then be shown with the note by the NoteDisplay I think.
*/

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
}


import * as _ from 'lodash';

import Note from '../../model/Note';
import Exercise from '../../model/ExerciseClasses/Exercise';
import ClefExerciseRanges from '../../model/ExerciseClasses/ClefExerciseRanges';

export default class RandomTeacher
{
    constructor(difficulty, allowedClefs, allowedAccidentals)
    {
        this.difficulty = difficulty;
        this.allowedClefs = allowedClefs;
        this.allowedAccidentals = allowedAccidentals
        //filter out all notes that have an accidental that is not allowed
        var fullPianoRange = Note.PianoNoteRange;
        this.allowedNotes = fullPianoRange.filter(note => this.allowedAccidentals.includes(note.accidental));
    }

    nextExercise()
    {
        /*TODO: 
        i should proabably make it so that we dont issue the same exercise twice
        (gotta add a way to compare two exercises for equality ?)
        */
        var selectedClef = _.sample(this.allowedClefs);
        var upperLimitForClef = ClefExerciseRanges.maxValueForClef(selectedClef);
        var lowerLimitForClef = ClefExerciseRanges.minValueForClef(selectedClef);
        var noteRangeForSelectedClef = this.allowedNotes.filter(note => note.value <= upperLimitForClef && note.value >= lowerLimitForClef);
        var selectedNote = _.sample(noteRangeForSelectedClef);

        return new Exercise(selectedNote,selectedClef);
    }
}
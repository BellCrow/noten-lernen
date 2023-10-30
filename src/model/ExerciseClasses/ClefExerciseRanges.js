import {Clefs} from '../../model/ExerciseClasses/Exercise';
import {Difficulties} from '../../model/Options'

export default class ClefExerciseRanges
{    
    static maxValueForClef(clef, difficulty)
    {
        switch(clef)
        {
            case Clefs.Alto:
                return ClefExerciseRanges.maxAltoValue(difficulty);
            case Clefs.Bass:
                return ClefExerciseRanges.maxBassValue(difficulty);
            case Clefs.Tenor:
                return ClefExerciseRanges.maxTenorValue(difficulty);
            case Clefs.Treble:
                return ClefExerciseRanges.maxTrebleValue(difficulty);
                
        }
    }
    static minValueForClef(clef, difficulty)
    {
        switch(clef)
        {
            case Clefs.Alto:
                return ClefExerciseRanges.minAltoValue(difficulty);
            case Clefs.Bass:
                return ClefExerciseRanges.minBassValue(difficulty);
            case Clefs.Tenor:
                return ClefExerciseRanges.minTenorValue(difficulty);
            case Clefs.Treble:
                return ClefExerciseRanges.minTrebleValue(difficulty);
                
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
}
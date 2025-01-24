<template>
  <div class="game-screen">
    <div class="game-screen-section">
      <button class="quit" @click="quit">
        {{ $t('ABORT') }}
      </button>
      <ScoreLine :result="result" :timeLeft="timeLeft" :isInfiniteRound="!options.gameLength" />
      <FeedbackLine :feedback="feedback" :feedbackNote="feedbackNote" :uniqueId="numAnswers" />
    </div>
    <div class="game-screen-section" id="game-note-display">
      <NoteDisplay :currentExercise="currentExercise" @play="playNote(currentExercise.value)" />
    </div>
    <div class="game-screen-section" id="game-screen-input">
      <ButtonInput v-if="isButtonInputSelected()" @noteInput="checkAnswer" />
      <KeyboardInput v-if="isKeyboardInputSelected()" @noteInput="checkAnswer" />
      <MidiInput v-if="isMidiInputSelected()" @noteInput="(value) => checkAnswer(value, true)" />
      <MousetrapInput v-if="!isMidiInputSelected()" @noteInput="checkAnswer" />
    </div>
  </div>
</template>

<script>
import ScoreLine from '../components/ScoreLine';
import NoteDisplay from '../components/NoteDisplay';
import FeedbackLine from '../components/FeedbackLine';
import ButtonInput from '../components/ButtonInput';
import KeyboardInput from '../components/KeyboardInput';
import MidiInput from '../components/MidiInput';
import MousetrapInput from '../components/MousetrapInput';

import Options, { InputModes } from '../model/Options';
import Statistics from '../model/Statistics';

import Exercise , { Clefs } from '../model/ExerciseClasses/Exercise';
import Note, { Accidentals, Notes } from '../model/Note';
import RandomTeacher from '../model/ExerciseClasses/RandomTeacher'


import * as _ from 'lodash';

export default {
  name: 'Game',
  components: {
    ScoreLine,
    NoteDisplay,
    FeedbackLine,
    ButtonInput,
    KeyboardInput,
    MidiInput,
    MousetrapInput,
  },
  data() {
    return {
      options: Options,
      currentExercise: new Exercise(new Note(Notes.A), Clefs.Alto),
      numCorrect: 0,
      numWrong: 0,
      timeLeft: 0,
      timer: null,
      feedbackNote: 'none',
      feedback: 'none',
      sample: null,
      noteRangeForRound: null,
      teacher:  null,
    }
  },
  computed: {
    numAnswers() {
      return this.numCorrect + this.numWrong;
    },
    accuracy() {
      if (this.numAnswers === 0) {
        return 0;
      }
      return Math.round(100 * this.numCorrect / this.numAnswers);
    },
    score() {
      if (this.numAnswers === 0) {
        return 0;
      }
      return Math.round(this.baseFactor * this.numCorrect * this.numCorrect / this.numAnswers);
    },
    baseFactor() {
      // 20s -> 300, 1min -> 100, 5min -> 20
      return this.options.gameLength ? (6000 / this.options.gameLength) : 0;
    },
    result() {
      return {
        numAnswers: this.numAnswers,
        numCorrect: this.numCorrect,
        numWrong: this.numWrong,
        accuracy: this.accuracy,
        score: this.score
      }
    }
  },
  methods: {
    isButtonInputSelected()
    {
      return this.options.inputMode === InputModes.Button;
    },
    isKeyboardInputSelected()
    {
      return this.options.inputMode === InputModes.Keyboard;
    },
    isMidiInputSelected()
    {
      return this.options.inputMode === InputModes.Midi;
    },

    startGame() {
      this.teacher = new RandomTeacher(this.options.difficulty, this.options.clef, this.options.accidentals.concat([Accidentals.None]));
      this.numCorrect = 0;
      this.numWrong = 0;
      this.timeLeft = this.options.gameLength;
      if (this.options.gameLength) {
        this.timer = setInterval(() => {
          this.timeLeft -= 1;
          if (this.timeLeft < 0) {
            this.onGameFinished();
          }
        }, 1000);
      }
      this.generateNewExercise();
    },
    onExit() {
      clearInterval(this.timer);
      if (this.sample) {
        this.sample.pause();
      }
    },
    onGameFinished() {
      this.onExit();
      Statistics.addScore(this.score,
        this.options.clef,
        this.options.difficulty,
        this.options.accidentals);
      this.$emit('gameEnded', this.result);
    },
    quit() {
      this.onExit();
      this.$emit('gameEnded', null);
    },
    generateNewExercise() {
      this.currentExercise = this.teacher.nextExercise();
    },
    checkAnswer(notes, checkOctave = false) {
      //this.playNote(Utils.getNearestNoteOfValue(value, this.currentExercise.value));
      var isCorrect = false;
      if (checkOctave) {
        isCorrect = notes.some(note => note.equalsAbsolute(this.currentExercise.note));
      }
      else {
        isCorrect = notes.some(note => note.equalsRelative(this.currentExercise.note));
      }

      if (isCorrect) {
        this.onCorrectAnswer(this.currentExercise.note.noteName);
        this.generateNewExercise();
      }
      else {
        this.onWrongAnswer();
      }
    },
    onCorrectAnswer(noteName) {
      this.numCorrect += 1;

      if (this.options.displayNote) {
        this.feedback = 'correct-note';
        this.feedbackNote = noteName;
      } else {
        this.feedback = 'correct';
      }
    },
    onWrongAnswer() {
      this.numWrong += 1;
      this.feedback = 'wrong';
      if ('vibrate' in navigator && this.options.vibration) {
        navigator.vibrate(200);
      }
    },
    playNote(value) {
      if (!this.options.sound) {
        return;
      }
      if (!!this.sample && !this.sample.paused) {
        this.sample.pause();
      }
      this.sample = new Audio('static/samples/piano/' + value + '.mp3');
      this.sample.play();
    }
  },
  mounted() {
    this.startGame();
  }
}
</script>

<style>
.game-screen {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: end;
  flex-flow: row wrap;
  max-width: 720px;
  height: 100%;
}

.game-screen-section {
  display: flex;
  flex: auto;
  min-width: 50%;
  flex-flow: column wrap;
}

#game-screen-input {
  min-width: 100%;
  align-self: start;
}

#game-note-display {
  align-items: center;
  justify-content: flex-end;
}

@media (orientation: landscape) {

  #game-note-display,
  #game-screen-input {
    min-height: 50%;
  }
}

@media (orientation: portrait) {

  #game-note-display,
  #game-screen-input {
    min-height: 33%;
    min-width: 100%;
  }
}

button.quit {
  padding: 5px;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: lightblue;
  cursor: pointer;
}

button.quit:hover {
  background-color: steelblue;
}

button.quit:focus {
  outline: none;
  background-color: lightblue;
}

button.quit:active {
  background-color: yellow;
}
</style>

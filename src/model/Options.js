import * as Lockr from "lockr";

import {Clefs} from '../model/Exercise';//TODO: feels weird that the exercise class defines the clefs

export const InputModes = Object.freeze({
  Button : ("InputModes.Button"),
  Keyboard : ("InputModes.Keyboard"),
  Midi : ("InputModes.Midi")
})

export default {
  inputMode: InputModes.Button,
  gameLength: 60,
  clef: [Clefs.Treble],
  difficulty: "easy",
  accidentals: [],
  sound: false,
  vibration: true,
  displayNote: true,
  language: null,

  loadOptions() {
    const loadedOptions = Lockr.get("options");
    if (!loadedOptions) {
      return;
    }
    Object.assign(this, loadedOptions);
    this.convertOldClefValues();
  },
  convertOldClefValues() {
    if (this.clef === 'all') {
      this.clef = ['treble', 'bass'];
    } else if (this.clef === 'treble' || this.clef === 'bass') {
      this.clef = [this.clef];
    }
  },
  saveOptions() {
    Lockr.set("options", this);
  }
};


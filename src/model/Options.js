import * as Lockr from "lockr";

export const InputModes = Object.freeze({
  Button : Symbol("Button"),
  Keyboard : Symbol("Keyboard"),
  Midi : Symbol("Midi")
})

export default {
  inputMode: InputModes.Button,
  gameLength: 60,
  clef: ["treble"],
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


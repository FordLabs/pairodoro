import { StatusBarItem, window, StatusBarAlignment, workspace } from "vscode";
import PairConfig from "./PairConfig";
import {defaultColor} from "./Configuration";
export default class TimerStatus {
  timerStatus: StatusBarItem;
  interval: any;
  time: number;
  pairConfigs: PairConfig[];
  currentPairIndex: number;

  constructor(commandId: string, alignment: number, pairConfigs: PairConfig[]) {
    this.timerStatus = window.createStatusBarItem(
      StatusBarAlignment.Right,
      alignment
    );
    this.pairConfigs = pairConfigs;
    this.timerStatus.command = commandId;
    this.timerStatus.text = "Have fun pairing!";
    this.timerStatus.color = "#fff";

    this.time = workspace
    .getConfiguration("pairodoro")
    .get("seconds") as number;

    this.currentPairIndex = 0;

    this.interval = setInterval(() => {
      this.updateTimerValue();
    }, 1000);

  }

  show() {
    this.pairConfigs[this.currentPairIndex].show();
    this.timerStatus.show();
  }

  updateTimerValue() {
    if (this.time === 0) {
     this.time  = workspace
     .getConfiguration("pairodoro")
     .get("seconds") as number;
     
     this.displayNextPair();
    }
    this.timerStatus.text = `${this.time}`;
    this.time--;
  }

  clearTimer() {
      clearInterval(this.interval);
  }

    private displayNextPair() {
        this.pairConfigs[this.currentPairIndex].hide();
        this.currentPairIndex = (this.currentPairIndex + 1) % this.pairConfigs.length;
        this.pairConfigs[this.currentPairIndex].show();
    }
}

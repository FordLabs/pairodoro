import { StatusBarItem, window, StatusBarAlignment, workspace } from "vscode";
import PairConfig from "./PairConfig";

export default class TimerStatus {
  timerStatus: StatusBarItem;
  interval: any;
  time: number;
  pairConfigs: PairConfig[];
  currentAuthor: PairConfig;

  constructor(commandId: string, alignment: number, pairConfigs: PairConfig[]) {
    this.timerStatus = window.createStatusBarItem(
      StatusBarAlignment.Right,
      alignment
    );
    this.pairConfigs = pairConfigs;
    this.timerStatus.command = commandId;
    this.timerStatus.text = "Have fun pairing!";
    this.timerStatus.color = "#468b5d";
    this.time = workspace
    .getConfiguration("pairodoro")
    .get("seconds") as number;

    this.currentAuthor = this.pairConfigs[0];

    this.interval = setInterval(() => {
      this.updateTimerValue();
    }, 1000);
  }

  show() {
    this.currentAuthor.show();
    this.timerStatus.show();
  }

  updateTimerValue() {
    if (this.time === 0) {
     this.time  = workspace
     .getConfiguration("pairodoro")
     .get("seconds") as number;
    this.currentAuthor.hide();
     this.currentAuthor = this.pairConfigs[1];
        this.currentAuthor.show();
    }
    this.timerStatus.text = `${this.time}`;
    this.time--;

  }
}

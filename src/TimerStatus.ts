import { StatusBarItem, window, StatusBarAlignment } from "vscode";

export default class TimerStatus {
  timerStatus: StatusBarItem;
  interval: any;
  time: number;

  constructor(commandId: string, alignment: number) {
    this.timerStatus = window.createStatusBarItem(
      StatusBarAlignment.Right,
      alignment
    );
    this.timerStatus.command = commandId;
    this.timerStatus.text = "Have fun pairing!";
    this.timerStatus.color = "#468b5d";
    this.time = 60;

    this.interval = setInterval(() => {
      this.updateTimerValue();
    }, 1000);
  }

  show() {
    this.timerStatus.show();
  }

  updateTimerValue() {
    this.timerStatus.text = `${this.time}`;
    this.time--;
  }
}

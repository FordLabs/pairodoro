import { StatusBarItem, window, StatusBarAlignment } from "vscode";

export default class PairStatus {
  pairStatus: StatusBarItem;
  interval: any;

  constructor(commandId: string, alignment: number) {
    this.pairStatus = window.createStatusBarItem(
      StatusBarAlignment.Right,
      alignment
    );
    this.pairStatus.command = commandId;
    this.pairStatus.text = "Player 1";
    this.pairStatus.color = "#468b5d";
  }

  show() {
    this.pairStatus.show();
  }
}

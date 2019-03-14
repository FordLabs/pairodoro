import {
  StatusBarItem,
  window,
  StatusBarAlignment,
  CompletionTriggerKind
} from "vscode";

export default class PairStatus {
  pairStatus: StatusBarItem;
  interval: any;

  constructor(commandId: string, alignment: number, name: string = "User 1") {
    this.pairStatus = window.createStatusBarItem(
      StatusBarAlignment.Right,
      alignment
    );
    this.pairStatus.command = commandId;
    this.pairStatus.text = name;
    this.pairStatus.color = "#468b5d";
  }

  show() {
    this.pairStatus.show();
  }

  updateName(name: string) {
    this.pairStatus.text = name;
    this.pairStatus.show();
  }
}

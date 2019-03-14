import {
  StatusBarItem,
  window,
  StatusBarAlignment,
  workspace
} from "vscode";

export default class PairConfig {
  pairStatus: StatusBarItem;
  interval: any;

  constructor(commandId: string, alignment: number, propertyName: string) {
    this.pairStatus = window.createStatusBarItem(
      StatusBarAlignment.Right,
      alignment
    );
    this.pairStatus.command = commandId;
    this.pairStatus.text = workspace
      .getConfiguration("pairodoro")
      .get(propertyName) as string;
    this.pairStatus.color = "#468b5d";
  }

  show() {
    this.pairStatus.show();
  }

  hide() {
    this.pairStatus.hide();
  }

  updateName(name: string) {
    this.pairStatus.text = name;
    this.pairStatus.show();
  }
}

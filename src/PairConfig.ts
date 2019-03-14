import {
  StatusBarItem,
  window,
  StatusBarAlignment,
  workspace
} from "vscode";
import {defaultColor} from "./Configuration";


export default class PairConfig {
  pairStatus: StatusBarItem;

  constructor(commandId: string, alignment: number, propertyName: string) {
    this.pairStatus = window.createStatusBarItem(
      StatusBarAlignment.Right,
      alignment
    );
    this.pairStatus.command = commandId;
    this.pairStatus.text = workspace
      .getConfiguration("pairodoro")
      .get(propertyName) as string;
    this.pairStatus.color = defaultColor;
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

import {
  StatusBarItem,
  window,
  StatusBarAlignment,
  workspace
} from "vscode";

export default class PairConfig {
  pairStatus: StatusBarItem;
  currentName: string;

  constructor(commandId: string, alignment: number, propertyName: string) {
    this.pairStatus = window.createStatusBarItem(
      StatusBarAlignment.Right,
      alignment
    );
    this.pairStatus.command = commandId;
    this.currentName = workspace
    .getConfiguration("pairodoro")
    .get(`${propertyName}.name`) as string;
    this.pairStatus.text = this.currentName;
    
      this.pairStatus.color = workspace
    .getConfiguration("pairodoro")
    .get(`${propertyName}.color`) as string;
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

  getName() {
    return this.currentName;
  }
}

import { StatusBarItem, window, StatusBarAlignment, workspace } from "vscode";

export default class PairConfig {
  pairStatus: StatusBarItem;
  currentName: string;

  constructor(alignment: number, propertyName: string) {
    this.pairStatus = window.createStatusBarItem(StatusBarAlignment.Right, alignment);
    this.currentName = workspace.getConfiguration("pairodoro").get(`${propertyName}.name`) as string;
    this.pairStatus.text = this.currentName;
    this.pairStatus.color = workspace.getConfiguration("pairodoro").get(`${propertyName}.color`) as string;
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

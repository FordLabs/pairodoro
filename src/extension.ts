import * as vscode from "vscode";
import TimerStatus from "./TimerStatus";
import PairConfig from "./PairConfig";

let timeRemainingDisplay: TimerStatus;
let player1Config: PairConfig;
let player2Config: PairConfig;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("extension.pairodoro", () => {
    vscode.window.showInformationMessage("Happy Pairing!");
  });
  context.subscriptions.push(disposable);

  player1Config = new PairConfig(200, "player1");
  player2Config = new PairConfig(200, "player2");
  timeRemainingDisplay = new TimerStatus(context, 199, [player1Config, player2Config]);

  timeRemainingDisplay.show();

  // TODO: Move this handler function into a method
  vscode.workspace.onDidChangeTextDocument(e => {
    const currentPair = context.workspaceState.get("currentPair");
    let keystrokeCount = context.workspaceState.get(`${currentPair}`) as number;
    keystrokeCount++;
    context.workspaceState.update(`${currentPair}`, keystrokeCount);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {
  timeRemainingDisplay.clearTimer();
}

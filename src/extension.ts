import * as vscode from "vscode";
import TimerStatus from "./TimerStatus";
import PairConfig from "./PairConfig";

let timeRemainingDisplay: TimerStatus;
let player1Config: PairConfig;
let player2Config: PairConfig;

export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.pairodoro",
    () => {
      // The code you place here will be executed every time your command is executed

      vscode.window.showInformationMessage("Happy Pairing!");
    }
  );

  context.subscriptions.push(disposable);

  const statusBarCommandId = "pairodoro.showPairingStatus";

  player1Config = new PairConfig(statusBarCommandId, 200, "player1");
  player2Config = new PairConfig(statusBarCommandId, 200, "player2");
  timeRemainingDisplay = new TimerStatus(statusBarCommandId, 199, [
    player1Config,
    player2Config
  ]);

  timeRemainingDisplay.show();
}

// this method is called when your extension is deactivated
export function deactivate() {}

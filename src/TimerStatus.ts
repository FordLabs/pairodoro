import {
  StatusBarItem,
  window,
  StatusBarAlignment,
  workspace,
  ProgressLocation,
  commands,
  ExtensionContext
} from "vscode";
import PairConfig from "./PairConfig";
import { statusBarCommandId } from "./Constants";
export default class TimerStatus {
  timerStatus: StatusBarItem;
  interval: any;
  time: number;
  pairConfigs: PairConfig[];
  context: ExtensionContext;

  isPaused = false;
  currentPairIndex = 0;
  pairingInProgress = true;

  constructor(context: ExtensionContext, alignment: number, pairConfigs: PairConfig[]) {
    this.context = context;
    this.pairConfigs = pairConfigs;
    this.timerStatus = window.createStatusBarItem(StatusBarAlignment.Right, alignment);
    this.time = workspace.getConfiguration("pairodoro").get("seconds") as number;
    this.timerStatus.command = statusBarCommandId;
    this.timerStatus.color = "#fff";

    context.subscriptions.push(
      commands.registerCommand(statusBarCommandId, () => {
        if (this.pairingInProgress) {
          this.showPairingInProgressPopup();
        } else {
          this.showStartNewPairingSessionPopup();
        }
      })
    );

    this.initializeStatusBar();
  }

  // Called when (re)creating the timer status bar object
  initializeStatusBar() {
    this.currentPairIndex = 0;
    this.context.workspaceState.update(this.pairConfigs[0].getName(), 0);
    this.context.workspaceState.update(this.pairConfigs[1].getName(), 0);
    this.timerStatus.text = "Happy Pairing!";

    this.interval = setInterval(() => {
      if (!this.isPaused) {
        this.updateTimerValue();
      }
    }, 1000);
  }

  show() {
    this.pairConfigs[this.currentPairIndex].show();
    this.timerStatus.show();
    this.context.workspaceState.update("currentPair", this.pairConfigs[this.currentPairIndex].getName());
  }

  updateTimerValue() {
    // TODO: So when we end & restart a pairing session, player2 gets set
    // this is because we set time to 0, then the block below is called
    // it's possible that we could use some global state management here :)
    if (this.time === 0) {
      this.time = workspace.getConfiguration("pairodoro").get("seconds") as number;
      this.displayNextPair();
      this.context.workspaceState.update("currentPair", this.pairConfigs[this.currentPairIndex].getName());
    }

    if (this.time === 5) {
      this.notifyPairSwap();
    }

    this.timerStatus.text =
      `$(clock) ${Math.floor(this.time / 60)}`.padStart(2, "0") + ":" + `${this.time % 60}`.padStart(2, "0");
    this.time--;
  }

  clearTimer() {
    clearInterval(this.interval);
  }

  showRestartTimerMessage() {
    this.timerStatus.text = "Start Pairing Session";
  }

  private notifyPairSwap() {
    window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: `It's almost ${this.getNextPair().getName()}'s turn to type!`,
        cancellable: true
      },
      (progress, token) => {
        token.onCancellationRequested(() => {});
        progress.report({ increment: 20 });
        const interval = setInterval(() => {
          progress.report({ increment: 20 });
        }, 1000);
        var promise = new Promise(resolve => {
          setTimeout(() => {
            resolve();
            clearInterval(interval);
          }, 5000);
        });
        return promise;
      }
    );
  }

  private displayNextPair() {
    this.pairConfigs[this.currentPairIndex].hide();
    this.currentPairIndex = (this.currentPairIndex + 1) % this.pairConfigs.length;
    this.pairConfigs[this.currentPairIndex].show();
  }

  private getNextPair(): PairConfig {
    return this.pairConfigs[(this.currentPairIndex + 1) % this.pairConfigs.length];
  }

  private showStartNewPairingSessionPopup() {
    window
      .showInformationMessage(
        `Start New Pairing Session for ${this.pairConfigs[0].getName()} & ${this.pairConfigs[1].getName()}?`,
        "Yes",
        "Cancel"
      )
      .then(selection => {
        if (selection === "Yes") {
          this.initializeStatusBar();
          this.pairingInProgress = true;
        } else if (selection === "Cancel") {
          // doing nothing seems to close this just fine
        }
      });
  }

  private showPairingInProgressPopup() {
    window.showInformationMessage("Pause pairing timer?", "Pause", "Continue", "Reset", "End").then(selection => {
      if (selection === "Pause") {
        this.isPaused = true;
      } else if (selection === "Continue") {
        this.isPaused = false;
      } else if (selection === "Reset") {
        this.time = workspace.getConfiguration("pairodoro").get("seconds") as number;
      } else if (selection === "End") {
        window.showInformationMessage(
          `${this.pairConfigs[0].getName()}: Typed 
            ${this.context.workspaceState.get(this.pairConfigs[0].getName())}
            characters.\n
            ${this.pairConfigs[1].getName()}: Typed 
            ${this.context.workspaceState.get(this.pairConfigs[1].getName())}
            characters.`
        );
        this.clearTimer();
        this.showRestartTimerMessage();
        this.time = 0;
        this.pairingInProgress = false;
      }
    });
  }
}

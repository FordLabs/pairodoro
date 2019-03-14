import { StatusBarItem, window, StatusBarAlignment, workspace, ProgressLocation } from "vscode";
import PairConfig from "./PairConfig";
export default class TimerStatus {
  timerStatus: StatusBarItem;
  interval: any;
  time: number;
  pairConfigs: PairConfig[];
  currentPairIndex: number;

  constructor(commandId: string, alignment: number, pairConfigs: PairConfig[]) {
    this.timerStatus = window.createStatusBarItem(
      StatusBarAlignment.Right,
      alignment
    );
    this.pairConfigs = pairConfigs;
    this.timerStatus.command = commandId;
    this.timerStatus.text = "Have fun pairing!";
    this.timerStatus.color = "#fff";

    this.time = workspace
    .getConfiguration("pairodoro")
    .get("seconds") as number;

    this.currentPairIndex = 0;

    this.interval = setInterval(() => {
      this.updateTimerValue();
    }, 1000);

  }

  show() {
    this.pairConfigs[this.currentPairIndex].show();
    this.timerStatus.show();
  }

  updateTimerValue() {
    if (this.time === 0) {
     this.time  = workspace
     .getConfiguration("pairodoro")
     .get("seconds") as number;     
     this.displayNextPair();
    }

    if(this.time === 5) {
        this.notifyPairSwap();
    }
    this.timerStatus.text = `${this.time}`;
    this.time--;
  }

  clearTimer() {
    clearInterval(this.interval);
}

    private notifyPairSwap() {
        window.withProgress({
            location: ProgressLocation.Notification,
            title: `It is now ${this.pairConfigs[this.currentPairIndex].getName()}'s turn to type.`,
            cancellable: true
        }, (progress, token) => {
            token.onCancellationRequested(() => { });
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
        });
    }


    private displayNextPair() {
        this.pairConfigs[this.currentPairIndex].hide();
        this.currentPairIndex = (this.currentPairIndex + 1) % this.pairConfigs.length;
        this.pairConfigs[this.currentPairIndex].show();
    }
}

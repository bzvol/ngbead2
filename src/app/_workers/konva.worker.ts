/// <reference lib="webworker" />

import {ProcessNumbersMessage, ProcessNumbersResult, ResultMessage, WorkerMessage} from "../_models/workerMessage";

console.log('Starting worker...');

self.onmessage = ({data}: MessageEvent<WorkerMessage>) => {
  if (data.type === 'processNumbers') {
    const {numbers} = data as ProcessNumbersMessage;
    processNumbers(numbers);
  }
}

self.onerror = console.error;

function processNumbers(numbers: number[]) {
  self.postMessage(
    new ResultMessage(
      new ProcessNumbersResult(0, 0, 0, 0, 0, 0)));
}

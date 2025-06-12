/// <reference lib="webworker" />

import {ProcessNumbersMessage, ProcessNumbersResult, ResultMessage, WorkerMessage} from "../_models/workerMessage";

console.log('Starting worker...');

let idCounter = 0;
const receivedNumbers: number[] = [];

self.onmessage = ({data}: MessageEvent<WorkerMessage>) => {
  if (data.type === 'processNumbers') {
    const {numbers} = data as ProcessNumbersMessage;
    receivedNumbers.push(...numbers);
    processReceivedNumbers();
  }
}

self.onerror = console.error;

function processReceivedNumbers() {
  const min = Math.min(...receivedNumbers);
  const max = Math.max(...receivedNumbers);

  const sum = receivedNumbers.reduce((sum, num) => sum + num, 0);
  const mean = sum / receivedNumbers.length;

  const sorted = receivedNumbers.sort((a, b) => a - b);
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[sorted.length / 2];

  const variance = receivedNumbers.reduce((sum, num) =>
    sum + Math.pow(num - mean, 2), 0) / receivedNumbers.length;
  const stdDev = Math.sqrt(variance);

  const result = new ProcessNumbersResult(
    ++idCounter,
    receivedNumbers.length,
    min, max,
    mean, median, stdDev
  );

  self.postMessage(new ResultMessage(result));
}

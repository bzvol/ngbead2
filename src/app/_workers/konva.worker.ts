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
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  const sum = numbers.reduce((sum, num) => sum + num, 0);
  const mean = sum / numbers.length;

  const sorted = numbers.sort((a, b) => a - b);
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[sorted.length / 2];

  const variance = numbers.reduce((sum, num) =>
    sum + Math.pow(num - mean, 2), 0) / numbers.length;
  const stdDev = Math.sqrt(variance);

  const result = new ProcessNumbersResult(min, max, mean, median, stdDev);
  self.postMessage(new ResultMessage(result));
}

/// <reference lib="webworker" />

console.log('Starting worker...');

self.onmessage = ({data}: MessageEvent) => {
  console.info('Worker received message:', data);
}

self.onerror = console.error;

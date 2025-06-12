import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  ProcessNumbersMessage,
  ProcessNumbersResult,
  ResultMessage,
  WorkerMessage
} from "../../../_models/workerMessage";

const CHUNK_SIZE = 1000;

@Component({
  selector: 'app-task2-b',
  templateUrl: './task2-b.component.html',
  styleUrls: ['./task2-b.component.less'],
  standalone: false
})
export class Task2BComponent implements OnInit, AfterViewInit {
  worker?: Worker;
  numbers: number[] = [];
  results: readonly ProcessNumbersResult[] = [];
  chunkSize = CHUNK_SIZE;

  loading = false;
  messageReceived = false;
  timeoutInProgress = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('assets/csv/2B.csv', {responseType: 'text'})
      .subscribe(data => this.loadCsv(data as string))
  }

  ngAfterViewInit() {
    this.setupWorker();
  }

  loadCsv(data: string) {
    this.numbers = data
      .split('\n')
      .map(line => parseFloat(line))
      .filter(num => !isNaN(num));

    this.postNumbersToWorker(this.numbers);
  }

  postNumbersToWorker(numbers: number[]) {
    if (!this.worker) console.error('Worker is not initialized');

    for (let i = 0; i < numbers.length; i += this.chunkSize) {
      const chunk = numbers.slice(i, i + this.chunkSize);
      this.worker?.postMessage(new ProcessNumbersMessage(chunk));
    }

    this.loading = true;
    this.messageReceived = false;
    this.timeoutInProgress = true;
    setTimeout(() => {
      this.timeoutInProgress = false;
      if (this.messageReceived) {
        this.loading = false;
      }
    }, 1000);
  }

  setupWorker() {
    this.worker = new Worker(new URL('../../../_workers/konva.worker.ts', import.meta.url));

    this.worker.onmessage = ({data}: MessageEvent<WorkerMessage>) => {
      if (data.type === 'result') {
        const {result} = data as ResultMessage;
        this.results = this.results.concat(result);

        this.messageReceived = true;
        if (!this.timeoutInProgress) {
          this.loading = false;
        }
      }
    }

    this.worker.onerror = console.error;
  }

  addRandomNumbers() {
    const newNumbers = Array.from({length: 1000},
      () => Math.floor(Math.random() * 100));

    this.numbers.push(...newNumbers);
    this.postNumbersToWorker(newNumbers);
  }
}

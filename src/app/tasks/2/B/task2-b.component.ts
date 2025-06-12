import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResultMessage, WorkerMessage} from "../../../_models/workerMessage";

@Component({
  selector: 'app-task2-b',
  templateUrl: './task2-b.component.html',
  styleUrls: ['./task2-b.component.less'],
  standalone: false
})
export class Task2BComponent implements OnInit, AfterViewInit {
  worker?: Worker;
  numbers: number[] = [];

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

    this.postNumbersToWorker();
  }

  postNumbersToWorker() {
    if (!this.worker) console.error('Worker is not initialized');

    this.worker?.postMessage({
      type: 'processNumbers',
      numbers: this.numbers
    });
  }

  setupWorker() {
    this.worker = new Worker(new URL('../../../_workers/konva.worker.ts', import.meta.url));

    this.worker.onmessage = ({data}: MessageEvent<WorkerMessage>) => {
      if (data.type === 'result') {
        const {result} = data as ResultMessage;
        console.info('Result:', result);
      }
    }

    this.worker.onerror = console.error;
  }
}

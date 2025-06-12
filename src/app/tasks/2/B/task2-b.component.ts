import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
      .subscribe(data => this.parseCsv(data as string))
  }

  ngAfterViewInit() {
    this.setupWorker();
  }

  parseCsv(data: string) {
    this.numbers = data
      .split('\n')
      .map(line => parseFloat(line))
      .filter(num => !isNaN(num));
  }

  setupWorker() {
    this.worker = new Worker(new URL('../../../_workers/konva.worker.ts', import.meta.url));

    this.worker.onmessage = ({data}: MessageEvent) => {
      console.info('Received message from worker:', data);
    }

    this.worker.onerror = console.error;
  }
}

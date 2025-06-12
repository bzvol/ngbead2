type WorkerMessageType = 'processNumbers' | 'result';

export abstract class WorkerMessage {
  protected constructor(public type: WorkerMessageType) {
  }
}

export class ProcessNumbersMessage extends WorkerMessage {
  constructor(public numbers: number[]) {
    super('processNumbers');
  }
}

export class ProcessNumbersResult {
  constructor(
    public min: number,
    public max: number,
    public mean: number,
    public median: number,
    public stdDev: number
  ) {
  }
}

export class ResultMessage extends WorkerMessage {
  constructor(public result: ProcessNumbersResult) {
    super('result');
  }
}
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import Konva from "konva";
import {Car} from "../../../_shapes/car";

@Component({
  selector: 'app-task1-a',
  templateUrl: './task1-a.component.html',
  styleUrls: ['./task1-a.component.less'],
  standalone: false
})
export class Task1AComponent implements AfterViewInit {
  @ViewChild('konvaContainer', {static: true})
  containerRef!: ElementRef<HTMLDivElement>;

  stage?: Konva.Stage;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.stage = new Konva.Stage({
      container: this.containerRef.nativeElement,
      width: 600, height: 600
    });

    const layer = new Konva.Layer();

    let car = Car.create({
      x: 50, y: 50,
      width: 70,
      fill: 'red',
      strokeWidth: 3
    });

    layer.add(car);
    this.stage.add(layer);

    console.log(this.stage);
  }
}

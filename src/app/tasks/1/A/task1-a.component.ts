import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import Konva from "konva";
import {Car, CarShapeConfig} from "../../../_shapes/car";

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

    let car = this.createRandomCar({
      x: 50, y: 50,
      width: 70,
      strokeWidth: 3
    });

    layer.add(car.createShape());
    this.stage.add(layer);

    console.log(this.stage);
  }

  createRandomCar(shapeConfig: CarShapeConfig): Car {
    return new Car({
      health: {
        body: Math.floor(Math.random() * 9 + 2),
        wheels: Math.floor(Math.random() * 5 + 1)
      },
      acceleration: Math.floor(Math.random() * 9 + 2),
      maxSpeed: Math.floor(Math.random() * 30 + 20),
      shape: {...shapeConfig, fill: shapeConfig.fill || `hsl(${Math.random() * 360}, 100%, 50%)`}
    });
  }
}

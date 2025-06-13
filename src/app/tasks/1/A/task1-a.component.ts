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

    const cars = Array.from({length: 6}, (_, i) => {
      return this.createRandomCar(i + 1, {
        x: 100 + (i % 3) * 120,
        y: 50 + Math.floor(i / 3) * 180,
        width: 70,
        strokeWidth: 3
      });
    });

    layer.add(...cars.map(car => car.createShape()));
    this.stage.add(layer);
  }

  createRandomCar(id: number, shapeConfig: CarShapeConfig): Car {
    return new Car({
      id: id,
      health: {
        body: Math.floor(Math.random() * 9 + 2),
        wheels: Math.floor(Math.random() * 5 + 1)
      },
      acceleration: Math.floor(Math.random() * 9 + 2),
      maxSpeed: Math.floor(Math.random() * 30 + 20),
      shape: {...shapeConfig, fill: shapeConfig.fill || `hsl(${Math.random() * 360}, 100%, 70%)`}
    });
  }
}

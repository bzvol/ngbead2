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

  protected gameStarted = false;
  protected selectedCar?: Car;

  private stage?: Konva.Stage;
  private carLayer?: Konva.Layer;
  private tooltipLayer?: Konva.Layer;
  private tooltip?: Konva.Group;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.stage = new Konva.Stage({
      container: this.containerRef.nativeElement,
      width: 800, height: 600
    });

    this.carLayer = new Konva.Layer();
    this.tooltipLayer = new Konva.Layer();

    const cars = this.generateCars(6);
    cars.forEach(this.setupCar.bind(this));

    this.stage.add(this.carLayer, this.tooltipLayer);

    this.setupDrivingControls();
  }

  private setupCar(car: Car) {
    const shape = car.shape;

    shape.on('mouseover', () => {
      const mousePos = this.tooltipLayer!.getRelativePointerPosition();
      if (!mousePos) return;

      if (this.tooltip) {
        this.tooltip.x(mousePos.x);
        this.tooltip.y(mousePos.y - 70);
        return;
      }

      this.drawTooltip(mousePos, car);
    });

    shape.on('mouseout', () => {
      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = undefined;
        this.tooltipLayer!.draw();
      }
    });

    shape.on('click', () => this.selectCar(car));

    this.carLayer!.add(shape);
  }

  private generateCars(n: number) {
    return Array.from({length: n}, (_, i) => {
      return this.createRandomCar(i + 1, {
        x: 100 + (i % 3) * 120,
        y: 50 + Math.floor(i / 3) * 180,
        width: 70,
        strokeWidth: 3
      });
    });
  }

  private createRandomCar(id: number, shapeConfig: CarShapeConfig): Car {
    const hue = Math.random() * 360;
    return new Car({
      id: id,
      health: {
        body: Math.floor(Math.random() * 9 + 2),
        wheels: Math.floor(Math.random() * 5 + 1)
      },
      acceleration: Math.floor(Math.random() * 9 + 2),
      maxSpeed: Math.floor(Math.random() * 30 + 20),
      shape: {
        ...shapeConfig,
        fill: shapeConfig.fill || `hsl(${hue}, 100%, 70%)`,
        selectedStroke: shapeConfig.selectedStroke || `hsl(${hue}, 100%, 30%)`,
      }
    });
  }

  private drawTooltip(mousePos: { x: number; y: number }, car: Car) {
    const tooltip = new Konva.Group({
      x: mousePos.x,
      y: mousePos.y - 70
    });

    const tooltipBg = new Konva.Rect({
      width: 230,
      height: 70,
      fill: 'white',
      cornerRadius: 10,
      stroke: 'black',
      strokeWidth: 2
    });

    const tooltipText = new Konva.Text({
      x: 10,
      y: 10,
      text: `Health: Body - ${car.config.health.body}, Wheels - ${car.config.health.wheels}\n`
        + `Acceleration: ${car.config.acceleration}\n`
        + `Max Speed: ${car.config.maxSpeed}`,
      fontSize: 16,
      fill: 'black',
    });

    tooltip.add(tooltipBg, tooltipText);
    this.tooltip = tooltip;

    this.tooltipLayer!.add(tooltip);
  }

  private selectCar(car: Car) {
    if (this.gameStarted) return;

    if (this.selectedCar) {
      if (this.selectedCar.id === car.id) {
        this.selectedCar = undefined;
        car.select();
      }

      return;
    }

    car.select();
    this.selectedCar = car;
  }

  protected startGame() {
    if (this.gameStarted) return;

    if (!this.selectedCar) {
      alert('Please select a car first!');
      return;
    }

    this.gameStarted = true;

    this.selectedCar.shape.moveToTop();
  }

  private setupDrivingControls() {
    document.addEventListener('keydown', (ev) => {
      if (!this.gameStarted || !this.selectedCar) return;

      switch (ev.key) {
        case 'ArrowUp':
        case 'w':
          this.selectedCar.accelerate(true, 1);
          break;
        case 'ArrowDown':
        case 's':
          this.selectedCar.accelerate(true, -1);
          break;
      }
    });

    document.addEventListener('keyup', (ev) => {
      if (!this.gameStarted || !this.selectedCar) return;
      ev.preventDefault();

      switch (ev.key) {
        case 'ArrowUp':
        case 'w':
        case 'ArrowDown':
        case 's':
          this.selectedCar.accelerate(false);
          break;
      }
    });
  }
}

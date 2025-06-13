import Konva from "konva";

export interface CarConfig {
  id: number,
  health: {
    body: number;
    wheels: number;
  },
  acceleration: number,
  maxSpeed: number;
  shape: CarShapeConfig;
}

export interface CarShapeConfig {
  x: number;
  y: number;
  width: number;
  fill?: string;
  stroke?: string;
  selectedStroke?: string;
  strokeWidth?: number;
}

export class Car {
  shape: Konva.Group = this.createShape();
  private body?: Konva.Rect;

  private selected = false;

  constructor(public config: CarConfig) {
  }

  get id(): number {
    return this.config.id;
  }

  private createShape(): Konva.Group {
    const config = this.config.shape;
    const group = new Konva.Group({});

    const height = config.width * 2;
    const body = new Konva.Rect({
      x: config.x,
      y: config.y,
      width: config.width,
      height: height,
      fill: config.fill || 'blue',
      stroke: config.stroke || 'black',
      strokeWidth: config.strokeWidth || 2,
      cornerRadius: 10,
    });
    this.body = body;

    const wheelRadius = config.width / 6;
    const wheels = Array.from({length: 4}, (_, i) => {
      const x = config.x + (i % 2 === 0 ? 0 : config.width);
      const y = config.y + (i < 2 ? 0 : height) + (i < 2 ? 1 : -1) * (wheelRadius + 10);
      return new Konva.Ellipse({
        x: x,
        y: y,
        radiusX: wheelRadius / 1.5,
        radiusY: wheelRadius,
        fill: '#444444',
        stroke: 'black',
        strokeWidth: 2,
      });
    });

    const headlightWidth = config.width / 6;
    const headlights = Array.from({length: 2}, (_, i) => {
      const x = config.x + (i === 0 ? 12 : config.width - 12 - headlightWidth);
      return new Konva.Rect({
        x: x,
        y: config.y,
        width: headlightWidth,
        height: headlightWidth * 0.8,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 2
      });
    });

    const idText = new Konva.Text({
      x: config.x + config.width / 2 - 5,
      y: config.y + height - 26,
      text: this.config.id.toString(),
      fontSize: 20,
      fill: 'black',
      fontFamily: 'Arial',
    });

    group.add(...wheels, body, ...headlights, idText);

    return group;
  }

  select() {
    if (this.selected) {
      this.body!.attrs.stroke = this.config.shape.stroke || 'black';
      this.body!.attrs.strokeWidth -= 2;
      this.selected = false;
      return;
    }

    this.body!.attrs.stroke = this.config.shape.selectedStroke || 'red';
    this.body!.attrs.strokeWidth += 2;
    this.selected = true;
  }
}
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
  strokeWidth?: number;
}

export class Car {
  constructor(private config: CarConfig) {
  }

  createShape(): Konva.Group {
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

    const idText = new Konva.Text({
      x: config.x + config.width / 2 - 5,
      y: config.y + height - 26,
      text: this.config.id.toString(),
      fontSize: 20,
      fill: 'black',
      fontFamily: 'Arial',
    });

    group.add(...wheels, body, idText);

    return group;
  }
}
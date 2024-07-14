import { SVGAttributes } from 'react';
import Diamond from './diamond';
import Rectangle from './rectangle';

export const ShapeComponents = {
  diamond: Diamond,
  rectangle: Rectangle,
};

export type ShapeType = keyof typeof ShapeComponents;

export type ShapeProps = {
  width?: number;
  height?: number;
} & SVGAttributes<SVGElement>;

export type ShapeComponentProps = Partial<ShapeProps> & { type: ShapeType };

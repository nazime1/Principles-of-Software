import { SVGAttributes } from 'react';

type ShapeProps = {
  width: number;
  height: number;
} & SVGAttributes<SVGElement>;

function Rectangle({ width, height, ...svgAttributes }: ShapeProps) {
  return <rect x={0} y={0} width={width} height={height} {...svgAttributes} />;
}

export default Rectangle;

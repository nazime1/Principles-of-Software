import { SVGAttributes } from 'react';

function generatePath(points: number[][]) {
  const path = points.map(([x, y]) => `${x},${y}`).join(' L');
  return `M${path} Z`;
}

type ShapeProps = {
  width: number;
  height: number;
} & SVGAttributes<SVGElement>;

function Diamond({ width, height, ...svgAttributes }: ShapeProps) {
  const diamondPath = generatePath([
    [0, height / 2],
    [width / 2, 0],
    [width, height / 2],
    [width / 2, height],
  ]);

  return <path d={diamondPath} {...svgAttributes} />;
}

export default Diamond;

declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
  }

declare global {
  var dafnyCode: string;
  var branchVal: string;
}

declare module "*.md";
import { Merge } from "../../types/polymophic";

const imports = import.meta.glob('/node_modules/@gouvfr/dsfr/dist/artwork/pictograms/**/*.svg', { eager: true });
const pictograms: Record<string, Record<string, React.FunctionComponent<React.SVGProps<SVGSVGElement>>>> = Object.entries(imports).reduce((acc, [key, val]) => {
  const name = key.split('/').pop()?.split('.')[0];
  if (name) {
    return { ...acc, [name]: val };
  }
  return acc;
}, {});

const names = Object.keys(pictograms);

export type PictogramBaseProps = {
  name: typeof names[number];
  size: string;
}

export type PictogramProps = Merge<React.HTMLAttributes<SVGSVGElement>, PictogramBaseProps>;

export const Pictogram = ({ name, size = '80px', ...props }: PictogramProps) => {
  const PictogramComponent = pictograms[name].ReactComponent;
  if (!PictogramComponent) return null;
  return <PictogramComponent style={{ height: size, width: size }} {...props} />;
};

Pictogram.defaultProps = {
  size: '80px',
}

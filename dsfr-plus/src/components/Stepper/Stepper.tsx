import cn, { Argument, ArgumentArray } from 'classnames';
import { Merge } from '../../types/polymophic';

type StepperCss = {
  "fr-stepper__title": Argument | ArgumentArray;
  "fr-stepper__state": Argument | ArgumentArray;
  "fr-stepper__steps": Argument | ArgumentArray;
  "fr-stepper__details": Argument | ArgumentArray;
}

export type StepperProps = Merge<React.HTMLAttributes<HTMLDivElement>, {
  className?: Argument | ArgumentArray;
  css?: StepperCss;
  currentStep: number;
  steps: number;
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  currentTitle?: React.ReactNode[] | React.ReactNode | string,
  nextStepTitle?: React.ReactNode[] | React.ReactNode | string,
}>;

export const Stepper = ({
  className,
  currentStep,
  currentTitle,
  nextStepTitle,
  steps,
  titleAs: TitleAs = 'h4',
  ...props
}: StepperProps) => {
  return (
    <div className={cn('fr-stepper', className)} {...props}>
      <TitleAs className="fr-stepper__title">
        <span className="fr-stepper__state">{`Étape ${currentStep} sur ${steps}`}</span>
        {currentTitle}
      </TitleAs>
      <div className="fr-stepper__steps" data-fr-current-step={currentStep} data-fr-steps={steps} />
      <p className="fr-stepper__details">
        <span className="fr-text--bold">Étape suivante : </span>
        {nextStepTitle}
      </p>
    </div>
  );
};
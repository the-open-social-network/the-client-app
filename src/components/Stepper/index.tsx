import "./style.scss";
import { Children, useEffect, useRef, useState } from "react";

type StepperProps = {
  active: number;
  children: React.ReactNode;
  resetScrollPosition?: boolean;
}

type StepProps = {
  children: React.ReactNode;
}

export function Stepper({
  active,
  children,
  resetScrollPosition,
}: StepperProps) {
  const steps = Children.toArray(children);

  useEffect(() => {
    if (resetScrollPosition) {
      window.scrollTo(0, 0);
    }
  }, [ active ]);

  return (
    <div className="stepper">
      <header>
        <ol>
          {Array(steps.length).fill(null).map((_, i:number) => (
            <li data-active={i < active} key={i}>
              <span>{i+1}</span>
            </li>
          ))}
        </ol>
      </header>

      <ol className="stepper__content">
        {steps[active - 1]}
      </ol>
    </div>
  )
}

export function Step({ children }: StepProps) {
  return (
    <li>
      {children}
    </li>
  )
}
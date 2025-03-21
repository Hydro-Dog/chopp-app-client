import { PropsWithChildren, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginGuard } from '@shared/hooks';
import { Steps } from 'antd';
import { useGetSteps } from './hooks';

export const OrderProcess = ({ children }: PropsWithChildren<any>) => {
  const { loginGuard } = useLoginGuard();
  const navigate = useNavigate();
  const location = useLocation();
  const steps = useGetSteps();

  const [currentStep, setCurrentStep] = useState<number | undefined>(() => {
    const stepIndex = steps.findIndex((item) => item.path === location.pathname);
    return stepIndex !== -1 ? stepIndex : 0;
  });

  const onChange = (value: number) => {
    loginGuard(() => {
      const step = steps[value];
      if (step) {
        navigate(step.path);
      }
    });
  };
  useEffect(() => {
    setCurrentStep(() => {
      const stepIndex = steps.findIndex((item) => item.path === location.pathname);
      return stepIndex !== -1 ? stepIndex : 0;
    });
  }, [location.pathname, steps]);

  return (
    <div>
      <Steps size="small" current={currentStep} onChange={onChange} items={steps} />
      {children}
    </div>
  );
};

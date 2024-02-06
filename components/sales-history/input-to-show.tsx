import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const InputToShow = ({
  className = 'col-span-auto',
  label = 'Lorem',
  value = 'ipsum',
}: IProps) => {
  return (
    <div className={className}>
      <Label>{label}</Label>
      <Input readOnly value={value} />
    </div>
  );
};

export default InputToShow;

interface IProps {
  className?: string;
  label?: string;
  value?: string | number;
}

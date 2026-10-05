import React from 'react';
import grid from '../assets/grid.svg';
import { cn } from '../../utils';

export const GridBackgroundContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      className={cn(props.className, 'bg-[#0d0d0d]')}
      style={{
        backgroundImage: `url("${grid}")`,
        backgroundSize: '200px 200px',
        boxShadow: '0px 0px 200px 10px inset rgba(0, 0, 0, 0.8)',
      }}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

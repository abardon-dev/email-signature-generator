import { Tooltip } from '@mui/material';
import { useRef, useState, ReactNode, useLayoutEffect, cloneElement } from 'react';

type OverflowTooltipProps = {
  title: ReactNode;
  children: JSX.Element;
};

/**
 * Component used to display a tooltip only when the children is overflowing
 *
 * @param title title of the tooltip
 * @param children JSX.Element to wrap with the tooltip
 */
export const OverflowTooltip = ({ title, children }: OverflowTooltipProps) => {
  const childRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  /** Function used to handle if the children node is overflowing */
  const handleResize = () => {
    if (childRef.current) {
      setIsOverflowing(childRef.current.scrollWidth > childRef.current.clientWidth);
    }
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isOverflowing) {
    return <Tooltip title={title}>{cloneElement(children as React.ReactElement, { ref: childRef })}</Tooltip>;
  }

  return cloneElement(children as React.ReactElement, { ref: childRef });
};

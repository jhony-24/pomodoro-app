import React from 'react';
import { styled } from '@pomodoro/design';

const Button = styled('button', {
  width: '100%',
  padding: 'sp10 sp5',
  borderRadius: 'medium',
  display: 'block',
  fontWeight: 'bold',
  variants: {
    variant: {
      primary: {
        backgroundColor: 'colorOptionPrimary',
      },
      secondary: {
        backgroundColor: 'colorOptionSecondary',
      },
      third: {
        backgroundColor: 'colorOptionThird',
      },
    },
    textVariant: {
      light: {
        color: 'normalText',
      },
    },
  },
});

Button.defaultProps = {
  variant: 'primary',
};

export default function BaseButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
}

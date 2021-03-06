import { css, styled } from '@pomodoro/design';
import BaseButton from '../../../../components/BaseButton';
import RoundAvatar from '../../../../components/RoundAvatar';

export const ModalBody = styled('div', {
  variants: {
    type: {
      body: {
        backgroundColor: 'card',
        borderRadius: 'small',
        width: '450px',
        position: 'relative',
      },
    },
  },
});

export const Loading = styled('div', {
  circularLoading: {
    size: '40px',
    color: 'primary',
    duration: '600ms',
    animation: css.keyframes({
      from: {
        transform: 'rotate(-360deg)',
      },
    }),
  },
});

export const Wrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  variants: {
    variant: {
      header: {
        padding: 'sp20',
      },
      grid: {
        display: 'grid',
        gap: 'sp10',
        gridTemplateColumns: 'repeat(3,1fr)',
      },
      inline: {
        width: 'auto',
        '& > *': {
          marginRight: 'sp10',
          fontWeight: 'bold',
        },
      },
    },
    spacing: {
      10: {
        marginTop: 'sp10',
        marginBottom: 'sp10',
      },
    },
  },
});

export const BaseButtonFloating = styled(BaseButton, {
  color: 'normalText',
  display: 'block',
  width: 'auto',
  margin: 'auto auto -20px',
  padding: 'sp10 30px',
});

export const Divider = styled('div', {
  borderBottom: '1px solid rgba(0,0,0,.1)',
  display: 'flex',
  variants: {
    variant: {
      row: {
        margin: '20px',
        padding: '10px 0',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      col: {
        margin: '20px',
        padding: '10px 0',
        flexDirection: 'column',
      },
    },
  },
  '&:last-of-type': {
    borderBottom: 'none',
  },
});

export const Text = styled('span', {
  fontWeight: 'bold',
  variants: {
    font: {
      title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 'medium',
      },
      subtitle: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 'small',
      },
      clamp: {
        fontWeight: 'bold',
        fontSize: 'small',
        color: 'neutral',
      },
    },
  },
});

# Design language

```javascript

// Base colors of app
const baseColors = {
  primary: '#FF7E7A',
  secondary: '#1CA0F2',
  third: '#ba68c8',
}

// Styled system of pomodoro application
const theme = {
  colors: {
      blackAlpha5: 'rgba(0, 0, 0, 0.05)',
      blackAlpha60: 'rgba(0, 0, 0, 0.60)',
      blackAlpha80: 'rgba(0, 0, 0, 0.80)',
      primary10: '#2967B3',
      primary20: '#3B5897',
      primaryDark: '#1b2242',
      primaryDark20: '#141930',
      card: '#ffffff',
      normalText: '#FFFFFF',
      darkText: '#rgb(20,20,20)',
      neutral: '#4a4e67',
      ...baseColors,
    },
  fontSizes: {
      small: '.9rem',
      regular: '1rem',
      medium: '1.2rem',
      big: '2rem',
  },
  radii: {
      small: '10px',
      medium: '60px',
      full: '100%',
    },
  space: {
      sp5: '5px',
      sp10: '10px',
      sp20: '20px',
  },
}
```

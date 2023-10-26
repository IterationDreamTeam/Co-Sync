import { extendTheme } from '@chakra-ui/react';
import popoverTheme from './popoverTheme';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
  cssVarPrefix: 'ck',
}

const colors =  {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  raisinBlack: {
    50: '#f9f9fa',
    100: '#ededee',
    150: '#e1e1e2',
    200: '#d3d3d5',
    250: '#c3c3c6',
    300: '#b3b3b6',
    350: '#9f9fa4',
    400: '#89898e',
    450: '#6c6c72',
    500: '#3f3f47',
  },
  Interstellar: {
    'PalePink': '#F8EADF',
    'Red-Orange': '#FA5E2D',
    'Amber-Orange':'#d99021',
  }

}

const theme = extendTheme({
  colors,
  config,
  components: {
    Popover: popoverTheme,
  }
})

export default theme;
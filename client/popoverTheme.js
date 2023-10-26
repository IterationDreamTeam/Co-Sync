import { popoverAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import {mode}  from '@chakra-ui/theme-tools'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys); 

const baseStyle = definePartsStyle((props) => ({
  content: {
    boxShadow: 'lg',
    w: '330px',
    bg: mode('Interstellar.Red-Orange', 'raisinBlack.300')(props),
  },
  header: {
    pb: 0,
    borderBottomWidth: '1px',
  },
  body: {
    p: 0,
    bg: mode('.500', 'raisinBlack.300')(props),
  }
}));

const sizes = {
  xl: definePartsStyle({
    content: {
      w: '400px',
    },
  }),
};

const rounded = definePartsStyle({
  content: {
    borderRadius: '35px',
  },
});

const variants = {
  rounded,
};

const popoverTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
});

export default popoverTheme; 
import { defaultTheme } from '@/theme/defaultTheme.ts';
import 'styled-components';

type Theme = typeof defaultTheme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

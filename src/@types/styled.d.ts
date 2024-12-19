import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme
//integracao para definir o tipo od ThemeType
declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType { }
}
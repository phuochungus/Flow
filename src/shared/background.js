import { View } from 'react-native'
import styled from 'styled-components';
import scale from '../constants/responsive';

export const Background = styled(View)`
  background-color: black;
  flex: 1;
  padding: ${props => props.p || 0}px;
`;
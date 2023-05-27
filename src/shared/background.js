import { View } from 'react-native'
import styled from 'styled-components';
import scale from '../constants/responsive';

export const Background = styled(View)`
  background-color: black;
  flex: 1;
  padding: ${scale(23)}px;
`;
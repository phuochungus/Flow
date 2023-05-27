import styled from "styled-components";
import scale from "../constants/responsive";

export const OutlineButton = styled.TouchableOpacity`
  width: ${scale(364)}px;
  height: ${scale(52)}px;
  padding: ${scale(10)}px ${scale(32)}px;
  background: #1e1e1e;
  border: 1px solid #b1b5bb;
  border-radius: 26px;
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alighItems || 'stretch '};
`;
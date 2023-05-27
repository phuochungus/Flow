import styled from 'styled-components';

export const Container = styled.View`
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alighItems || 'center '};
  margin: ${props => props.m || '0px'};
  position: ${props => props.position || 'relative'};
  flex-direction: ${props => props.flexDirection || 'column'};
  padding: ${props => props.p || '0px'};
  background-color: ${props => props.color || 'transparent'};
  border: ${props => props.borderColor || 'transparent'};
  border-radius: ${props => props.borderRadius || 0}px
  `;

export const SizedContainer = styled(Container)`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`;


export const ShadowContainer = styled(Container)`
  height: 90px;
`;

import { Image } from 'react-native'
import styled from 'styled-components';

export const Img = styled(Image).attrs(({ source }) => ({
    source: source,
}))`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
  `;
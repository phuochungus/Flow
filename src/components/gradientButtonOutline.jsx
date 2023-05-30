import {TouchableOpacity} from 'react-native-gesture-handler';
import {Container} from '../shared';

export const GradientButtonOutline = ({children, ...rest}) => {
  return (
    <TouchableOpacity onPress={rest.onPress}>
      <Container
        height={rest.height}
        width={rest.width}
        justifyContent={'center'}
        color={'#1E1E1E'}
        borderColor={'1px solid #B1B5BB'}
        borderRadius={26}>
        {children}
      </Container>
    </TouchableOpacity>
  );
};

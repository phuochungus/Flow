import {Dimensions} from 'react-native';
const designHeight = 926;
function scale(number) {
  return (number * Dimensions.get('window').height) / designHeight;
}

export default scale;

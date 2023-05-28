import { Dimensions } from 'react-native';
const designWidth = 428;
function scale(number) {
  return (number * Dimensions.get('window').width) / designWidth;
}

export default scale;
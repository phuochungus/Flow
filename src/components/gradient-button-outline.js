import { TouchableOpacity } from "react-native-gesture-handler";
import { GradientBlurShadow } from "../screens/SignIn/SignIn";
import { Container } from "../shared";

export const GradientButtonOutline = ({ children, ...rest }) => {
    return (
        <Container
            justifyContent={'center'}
            height={rest.sHeight * 1.6}
            width={rest.sWidth * 1.1}>
            <GradientBlurShadow {...rest} />
            <Container position={'absolute'}>
                <Container
                    position={'absolute'}
                    height={rest.height}
                    width={rest.width}
                    justifyContent={'center'}
                    color={'#1E1E1E'}
                    borderColor={'1px solid #B1B5BB'}
                    borderRadius={26}
                />
                <TouchableOpacity>
                    <Container
                        height={rest.height}
                        width={rest.width}
                        justifyContent={'center'}
                        color={'#1E1E1E'}
                        borderColor={'1px solid #B1B5BB'}
                        borderRadius={26}
                    >
                        {children}
                    </Container>
                </TouchableOpacity>
            </Container>
        </Container>
    );
};
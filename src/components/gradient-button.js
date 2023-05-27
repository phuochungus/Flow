import scale from "../constants/responsive";
import { DropShadowButton, GradientBlurShadow, StyledGradientView } from "../screens/SignIn/SignIn";
import { Container } from "../shared";

export const GradientButton = ({ children, ...rest }) => {
    return (
        <Container
            justifyContent={'center'}
            height={rest.sHeight * 1.6}
            width={rest.sWidth * 1.1}>
            <GradientBlurShadow {...rest} />
            <Container position={'absolute'}>
                <DropShadowButton {...rest}>
                    <StyledGradientView height={rest.height} width={rest.width} pad={`${scale(10)}px ${scale(12)}px`}>
                        {children}
                    </StyledGradientView>
                </DropShadowButton>
            </Container>
        </Container >
    );
};
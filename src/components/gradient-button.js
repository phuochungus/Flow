import scale from "../constants/responsive";
import { DropShadowButton, GradientBlurShadow, StyledGradientView } from "../screens/SignIn/SignIn";
import { Container } from "../shared";

export const GradientButton = ({ children, ...rest }) => {
    return (
        <Container justifyContent={'center'}>
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
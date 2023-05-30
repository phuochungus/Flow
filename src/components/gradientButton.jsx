import {forwardRef} from 'react';
import scale from '../constants/responsive';
import {
  DropShadowButton,
  GradientBlurShadow,
  StyledGradientView,
} from '../screens/SignIn/SignIn';
import {Container} from '../shared';

export const GradientButton = ({children, ...rest}) => {
  return (
    <DropShadowButton {...rest}>
      <StyledGradientView
        height={rest.height}
        width={rest.width}
        pad={`10px 12px`}>
        {children}
      </StyledGradientView>
    </DropShadowButton>
  );
};

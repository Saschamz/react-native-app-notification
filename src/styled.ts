import styled from 'styled-components'
import { Dimensions } from 'react-native'

const { height } = Dimensions.get('screen')

export const AppNotificationContainer = styled.SafeAreaView`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 100;

  ${({ alignBottom, bottomOffset, topOffset }) =>
    alignBottom
      ? `bottom: ${bottomOffset || Math.round(height * 0.07)}px`
      : `top: ${topOffset || Math.round(height * 0.07)}px`};
`

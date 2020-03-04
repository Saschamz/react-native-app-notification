import styled from 'styled-components'
import { Dimensions } from 'react-native'

const { height } = Dimensions.get('screen')

export const AppNotificationContainer = styled.SafeAreaView`
  position: absolute;
  left: 0;
  right: 0;

  ${props =>
    props.alignBottom
      ? `bottom: ${props.bottomOffset || height * 0.07}`
      : `top: ${props.topOffset || height * 0.07}`};
`

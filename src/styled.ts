import styled from 'styled-components'
import { Dimensions } from 'react-native'

const { height } = Dimensions.get('screen')

export const AppNotificationContainer = styled.SafeAreaView`
  position: absolute;
  top: ${height * 0.07};
  left: 0;
  right: 0;
`

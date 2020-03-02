import styled, { css } from 'styled-components/native'
import { SafeAreaView, TouchableOpacity, Text, Dimensions } from 'react-native'
import { CircleView } from 'styled-native-kit'

export const cardShadow = css`
  shadow-color: #948aa5;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.22;
  shadow-radius: 6px;
  elevation: 3;
`

const { height } = Dimensions.get('screen')

export const Wrapper = styled(SafeAreaView)`
  position: absolute;
  top: ${height * 0.2};
  left: 0;
  right: 0;
`

export const Card = styled(TouchableOpacity)`
  background-color: white;
  ${cardShadow};
  padding: ${8 * 2}px ${8 * 1.5}px;
  border-radius: 12;
  margin: 0 ${8 * 2}px;
  margin-bottom: ${8 / 2}px;
`

export const TextContainer = styled.View`
  margin-left: ${8};
  width: 85%;
`

export const Title = styled(Text)`
  font-size: 12;
  text-transform: uppercase;
`

export const Message = styled(Text)`
  font-size: 14;
  line-height: ${14 * 1.3};
`

export const Circle = styled(CircleView).attrs(() => ({
  size: 33
}))``

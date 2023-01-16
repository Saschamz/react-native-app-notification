import { Text, TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export const cardShadow = css`
  shadow-color: #948aa5;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.22;
  shadow-radius: 6px;
  elevation: 3;
`

export const Card = styled(TouchableOpacity)`
  background-color: white;
  ${cardShadow};
  padding: ${8 * 2}px ${8 * 2}px;
  border-radius: 12px;
  margin: 0 ${8 * 2}px;
  margin-bottom: ${8 / 2}px;
`

export const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
`

export const Title = styled(Text)`
  font-size: 12px;
  text-transform: uppercase;
`

export const Message = styled(Text)`
  font-size: 14px;
  line-height: ${14 * 1.3}px;
`

export const BaseImage = styled.Image`
  height: 34px;
  width: 34px;
  border-radius: 2px;
  margin-right: 8px;
`

export const LeftContainer = styled.View`
  margin-right: 8px;
`

export const RightContainer = styled.View`
  margin-left: 8px;
`

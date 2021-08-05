import styled, { css } from "styled-components/native";
import { TouchableOpacity, Text } from "react-native";
import { CircleView } from "styled-native-kit";

export const cardShadow = css`
  shadow-color: #948aa5;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.22;
  shadow-radius: 6px;
  elevation: 3;
`;

export const Card = styled.View`
  background-color: white;
  ${cardShadow};
  padding: ${8 * 2}px ${8 * 1.5}px;
  border-radius: 12px;
  margin: 0 ${8 * 2}px;
  margin-bottom: ${8 / 2}px;
`;

export const TextContainer = styled.View`
  margin-left: 8px;
  width: 85%;
`;

export const Title = styled(Text)`
  font-size: 12px;
  text-transform: uppercase;
`;

export const Message = styled(Text)`
  font-size: 14px;
  line-height: ${14 * 1.3}px;
`;

export const Circle = styled(CircleView).attrs(() => ({
  size: 33,
}))``;

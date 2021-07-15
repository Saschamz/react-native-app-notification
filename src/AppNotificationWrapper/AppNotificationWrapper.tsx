import { useAnimatedValue, useLayout } from "@redmindab/react-hooks";
import React, { Fragment, FunctionComponent, useRef, useState } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";
import { View } from "styled-native-kit";
import {
  AppNotificationComponentProps,
  AppNotificationStyleProps,
  NotificationQueueItem,
} from "../types";
import { Shrink, SlideUpFadeIn } from "./animations";

type OwnProps = AppNotificationStyleProps;

type Props = OwnProps & NotificationQueueItem & AppNotificationComponentProps;

type WrapperProps = {
  height?: number;
  reversed?: boolean;
};

export const AppNotificationWrapper: FunctionComponent<Props> = ({
  animateOut,
  animated = true,
  panEnabled = true,
  alignBottom,
  children,
  onPress,
  animationWrappers = { in: undefined, out: undefined },
}) => {
  const [hide, setHide] = useState(false);
  const [layout, bindLayout] = useLayout();
  const translateX = useAnimatedValue(0);
  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (e, { dx }) => {
        translateX.setValue(dx);
      },
      onPanResponderRelease: (e, { vx, dx }) => {
        const hasTapped = vx + dx === 0;
        if (onPress && hasTapped) {
          onPress();
        }
        const screenWidth = Dimensions.get("window").width;
        if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
          Animated.timing(translateX, {
            toValue: dx > 0 ? screenWidth : -screenWidth,
            duration: 200,
            useNativeDriver: true,
          }).start(() => setHide(true));
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            bounciness: 10,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  let PanWrapper = Fragment;
  let panWrapperProps = {};
  let AnimationWrapper = View;
  const wrapperProps: WrapperProps = {};

  if (animated) {
    if (panEnabled) {
      PanWrapper = Animated.View;
      panWrapperProps = {
        ...pan.panHandlers,
        style: { opacity: +!hide, transform: [{ translateX }] },
      };
    }

    const outAnimation = animationWrappers.out || Shrink;
    const inAnimation = animationWrappers.in || SlideUpFadeIn;

    AnimationWrapper = animateOut ? outAnimation : inAnimation;
    wrapperProps.height = layout.height;

    if (hide) {
      AnimationWrapper = Shrink;
    }

    if (alignBottom && !animateOut) {
      wrapperProps.reversed = true;
    }
  }

  return (
    <AnimationWrapper {...wrapperProps}>
      <PanWrapper {...panWrapperProps}>
        <View {...bindLayout}>{children}</View>
      </PanWrapper>
    </AnimationWrapper>
  );
};

export default AppNotificationWrapper;

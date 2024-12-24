import React, { useState } from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const COLORS = ['#ff4081', '#3f51b5', '#4caf50', '#ffeb3b', '#ff5722'];

const generateRandomValue = (min, max) =>
  Math.random() * (max - min) + min;

const Particle = ({ trigger }) => {
  const translateX = useSharedValue(generateRandomValue(0, width));
  const translateY = useSharedValue(-50);
  const rotateZ = useSharedValue(generateRandomValue(0, 360));
  const scale = useSharedValue(generateRandomValue(0.5, 1.5));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateZ: `${rotateZ.value}deg` },
      { scale: scale.value },
    ],
  }));

  const startAnimation = () => {
    translateY.value = withTiming(height + 50, {
      duration: generateRandomValue(2000, 4000),
      easing: Easing.out(Easing.quad),
    });
    rotateZ.value = withTiming(rotateZ.value + 360, {
      duration: generateRandomValue(2000, 4000),
      easing: Easing.linear,
    });
  };

  if (trigger) {
    startAnimation();
  }

  return (
    <Animated.View
      style={[
        styles.particle,
        animatedStyle,
        { backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)] },
      ]}
    />
  );
};

const ConfettiAnimation = () => {
  const [trigger, setTrigger] = useState(false);

  const handlePress = () => {
    setTrigger(true);
    // Reset trigger after a moment to allow retriggering
    setTimeout(() => setTrigger(false), 1500);
  };

  const particles = Array.from({ length: 50 });

  return (
    <View style={styles.container}>
      <Button title="Show Confetti" onPress={handlePress} />
      {trigger &&
        particles.map((_, index) => <Particle key={index} trigger={trigger} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  particle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default ConfettiAnimation;

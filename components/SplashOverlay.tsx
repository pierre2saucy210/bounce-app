import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, runOnJS } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface SplashOverlayProps {
  onFinish: () => void;
}

export default function SplashOverlay({ onFinish }: SplashOverlayProps) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 800 });
    scale.value = withSequence(
      withTiming(1.1, { duration: 600 }),
      withTiming(1, { duration: 400 })
    );
    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 600 }, (finished) => {
        if (finished) runOnJS(onFinish)();
      });
    }, 1900);
    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value, transform: [{ scale: scale.value }] }));
  const logoStyle = useAnimatedStyle(() => ({ opacity: logoOpacity.value }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LinearGradient colors={['#08050F', '#130D24', '#1C1535']} style={StyleSheet.absoluteFill} />
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Text style={styles.logo}>BOUNCE</Text>
        <Text style={styles.tagline}>Time to bounce back 💖</Text>
        <View style={styles.neonLine} />
        <Text style={styles.loadingText}>Healing starts here</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({ container: { ...StyleSheet.absoluteFillObject, backgroundColor: '#08050F', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }, logoContainer: { alignItems: 'center' }, logo: { fontSize: 52, fontWeight: '900', color: '#FF1E6C', letterSpacing: 4, textShadowColor: '#FF1E6C', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20 }, tagline: { fontSize: 16, color: '#FFFFFF', marginTop: 8, opacity: 0.9 }, neonLine: { width: 120, height: 3, backgroundColor: '#FF1E6C', marginVertical: 20, shadowColor: '#FF1E6C', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 10 }, loadingText: { color: '#8B7AAE', fontSize: 14, marginTop: 30, letterSpacing: 2 } });
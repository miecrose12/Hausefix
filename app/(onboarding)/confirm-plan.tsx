import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  PanResponder,
  Animated,
  PanResponderInstance,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Responsive sizing
const getResponsiveSize = () => {
  if (width < 360) return 'small';
  if (width < 480) return 'medium';
  if (width < 768) return 'large';
  return 'xlarge';
};

const responsiveSize = getResponsiveSize();

const getSizes = () => {
  const sizes = {
    small: {
      headerSize: 24,
      subheaderSize: 11,
      bodySize: 12,
      buttonHeight: 48,
      buttonTextSize: 13,
      paddingH: 14,
      paddingV: 12,
      cardPadding: 12,
      iconSize: 40,
      badgeSize: 80,
      gap: 12,
    },
    medium: {
      headerSize: 28,
      subheaderSize: 12,
      bodySize: 13,
      buttonHeight: 52,
      buttonTextSize: 14,
      paddingH: 16,
      paddingV: 14,
      cardPadding: 14,
      iconSize: 44,
      badgeSize: 100,
      gap: 14,
    },
    large: {
      headerSize: 32,
      subheaderSize: 13,
      bodySize: 14,
      buttonHeight: 56,
      buttonTextSize: 15,
      paddingH: 18,
      paddingV: 16,
      cardPadding: 16,
      iconSize: 48,
      badgeSize: 120,
      gap: 16,
    },
    xlarge: {
      headerSize: 36,
      subheaderSize: 14,
      bodySize: 15,
      buttonHeight: 60,
      buttonTextSize: 16,
      paddingH: 20,
      paddingV: 18,
      cardPadding: 18,
      iconSize: 52,
      badgeSize: 140,
      gap: 18,
    },
  };
  return sizes[responsiveSize];
};

const sizes = getSizes();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes.paddingH,
    paddingVertical: sizes.paddingV,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  headerSpacer: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: sizes.paddingH,
    paddingVertical: sizes.paddingV,
    justifyContent: 'space-between',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: sizes.gap * 2,
  },
  badgeContainer: {
    width: sizes.badgeSize,
    height: sizes.badgeSize,
    borderRadius: 24,
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sizes.gap * 2,
    shadowColor: '#1F2A44',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#10b981',
    overflow: 'hidden',
  },
  checkIcon: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#10b981',
    borderRadius: 100,
    padding: 8,
    width: sizes.badgeSize * 0.65,
    height: sizes.badgeSize * 0.65,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#6ee7b7',
  },
  headline: {
    fontSize: sizes.headerSize,
    fontWeight: '700',
    color: '#1f2942',
    textAlign: 'center',
    marginBottom: sizes.paddingV,
    lineHeight: sizes.headerSize * 1.2,
  },
  subtext: {
    fontSize: sizes.bodySize,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: sizes.bodySize * 1.5,
    marginBottom: sizes.gap * 2,
    maxWidth: '95%',
    alignSelf: 'center',
  },
  planName: {
    fontWeight: '700',
    color: '#1f2942',
  },
  planCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: sizes.cardPadding,
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes.paddingH,
    marginBottom: sizes.gap * 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: sizes.bodySize,
    fontWeight: '700',
    color: '#1f2942',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: sizes.bodySize - 2,
    color: '#9ca3af',
  },
  badgeLabel: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#dcfce7',
    borderRadius: 4,
  },
  badgeText: {
    fontSize: sizes.bodySize - 3,
    fontWeight: '600',
    color: '#16a34a',
  },
  spacer: {
    flex: 1,
  },
  footer: {
    gap: sizes.gap,
  },
  button: {
    width: '100%',
    height: sizes.buttonHeight,
    borderRadius: 12,
    backgroundColor: '#1f2942',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#1f2942',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: sizes.buttonTextSize,
    fontWeight: '600',
    color: '#fff',
  },
  stepIndicator: {
    fontSize: sizes.bodySize - 2,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

interface Plan {
  title: string;
  icon: 'apartment' | 'domain';
  description: string;
  image?: string;
}

export default function ConfirmPlanScreen() {
  const router = useRouter();
  const [scaleAnim] = useState(new Animated.Value(0));
  const [buttonPressed, setButtonPressed] = useState(false);
  const panResponderRef = useRef<PanResponderInstance | null>(null);

  // Landlord Plan Details
  const plan: Plan = useMemo(
    () => ({
      title: 'Landlord Plan',
      icon: 'apartment',
      description: 'Perfect for 1-5 properties',
      image: 'https://images.unsplash.com/photo-1543269865-cbdf26ce6c3f?w=300&h=300&fit=crop',
    }),
    []
  );

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 10,
    }).start();
  }, [scaleAnim]);

  // Pan responder for swipe right to go back
  useEffect(() => {
    panResponderRef.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          router.back();
        }
      },
    });
  }, [router]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleContinue = useCallback(() => {
    setButtonPressed(true);
    setTimeout(() => {
      router.push('/(landlord)/(auth)/landregister');
    }, 200);
  }, [router]);

  const panResponders = panResponderRef.current;

  return (
    <SafeAreaView
      style={styles.container}
      {...(panResponders?.panHandlers || {})}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1f2942" />
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Hero Section */}
        <Animated.View
          style={[
            styles.heroSection,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          {/* Badge with Green Checkmark */}
          <View style={styles.badgeContainer}>
            <View style={styles.checkIcon}>
              <MaterialIcons
                name="check"
                size={sizes.badgeSize * 0.4}
                color="#fff"
              />
            </View>
          </View>

          {/* Headline */}
          <Text style={styles.headline}>Great Choice!</Text>

          {/* Subtext */}
          <Text style={styles.subtext}>
            You've chosen the{' '}
            <Text style={styles.planName}>{plan.title}</Text>. Your journey to
            easier property management starts here.
          </Text>
        </Animated.View>

        {/* Plan Summary Card */}
        <View style={styles.planCard}>
          <View style={styles.cardIconContainer}>
            <MaterialIcons
              name={plan.icon}
              size={28}
              color="#1f2942"
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{plan.title}</Text>
            <Text style={styles.cardSubtitle}>{plan.description}</Text>
          </View>
          <View style={styles.badgeLabel}>
            <Text style={styles.badgeText}>Active</Text>
          </View>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, buttonPressed && styles.buttonPressed]}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue to Login / Sign Up</Text>
            <MaterialIcons
              name="arrow-forward"
              size={sizes.buttonTextSize + 2}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>Step 3 of 4</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
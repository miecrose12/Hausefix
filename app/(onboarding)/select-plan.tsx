import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  PanResponder,
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
      headerSize: 18,
      subheaderSize: 11,
      titleSize: 15,
      subtitleSize: 12,
      bodySize: 11,
      buttonHeight: 40,
      buttonTextSize: 12,
      paddingH: 14,
      paddingV: 12,
      cardRadius: 14,
      gap: 10,
      imageHeight: 200,
      contentPadding: 12,
      sectionGap: 18,
    },
    medium: {
      headerSize: 22,
      subheaderSize: 12,
      titleSize: 17,
      subtitleSize: 13,
      bodySize: 12,
      buttonHeight: 44,
      buttonTextSize: 13,
      paddingH: 16,
      paddingV: 14,
      cardRadius: 16,
      gap: 12,
      imageHeight: 220,
      contentPadding: 14,
      sectionGap: 20,
    },
    large: {
      headerSize: 26,
      subheaderSize: 13,
      titleSize: 19,
      subtitleSize: 14,
      bodySize: 13,
      buttonHeight: 48,
      buttonTextSize: 14,
      paddingH: 18,
      paddingV: 16,
      cardRadius: 18,
      gap: 14,
      imageHeight: 240,
      contentPadding: 16,
      sectionGap: 24,
    },
    xlarge: {
      headerSize: 30,
      subheaderSize: 14,
      titleSize: 21,
      subtitleSize: 15,
      bodySize: 14,
      buttonHeight: 52,
      buttonTextSize: 15,
      paddingH: 20,
      paddingV: 18,
      cardRadius: 20,
      gap: 16,
      imageHeight: 280,
      contentPadding: 18,
      sectionGap: 28,
    },
  };
  return sizes[responsiveSize];
};

const sizes = getSizes();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingHorizontal: sizes.paddingH,
    paddingVertical: sizes.paddingV,
    paddingBottom: sizes.paddingV * 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: sizes.sectionGap,
  },
  subheader: {
    fontSize: sizes.subheaderSize,
    fontWeight: '600',
    color: '#B46A3C',
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  mainTitle: {
    fontSize: sizes.headerSize,
    fontWeight: '800',
    color: '#1f2a44',
    textAlign: 'center',
    lineHeight: sizes.headerSize * 1.3,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: sizes.bodySize,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: sizes.bodySize * 1.5,
  },
  heroSection: {
    borderRadius: sizes.cardRadius,
    overflow: 'hidden',
    marginBottom: sizes.sectionGap,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  heroImage: {
    width: '100%',
    height: sizes.imageHeight,
    backgroundColor: '#f3f4f6',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#B46A3C',
    opacity: 0.25,
  },
  sectionTitle: {
    fontSize: sizes.titleSize,
    fontWeight: '700',
    color: '#1f2a44',
    marginBottom: sizes.gap,
  },
  featureGrid: {
    gap: sizes.gap,
    marginBottom: sizes.sectionGap,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: sizes.cardRadius,
    padding: sizes.contentPadding,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#f3e8db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizes.gap,
    flexShrink: 0,
  },
  featureIcon: {
    color: '#B46A3C',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: sizes.subtitleSize,
    fontWeight: '700',
    color: '#1f2a44',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: sizes.bodySize - 1,
    color: '#6b7280',
    lineHeight: sizes.bodySize * 1.4,
  },
  highlightSection: {
    backgroundColor: '#fff8f4',
    borderRadius: sizes.cardRadius,
    padding: sizes.contentPadding,
    marginBottom: sizes.sectionGap,
    borderLeftWidth: 4,
    borderLeftColor: '#B46A3C',
  },
  highlightTitle: {
    fontSize: sizes.titleSize,
    fontWeight: '700',
    color: '#1f2a44',
    marginBottom: sizes.gap,
  },
  benefitsList: {
    gap: sizes.gap,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkIcon: {
    color: '#B46A3C',
    marginTop: 2,
  },
  benefitText: {
    fontSize: sizes.bodySize,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
    lineHeight: sizes.bodySize * 1.4,
  },
  statSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: sizes.cardRadius,
    padding: sizes.contentPadding,
    marginBottom: sizes.sectionGap,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: sizes.headerSize,
    fontWeight: '800',
    color: '#B46A3C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: sizes.bodySize - 1,
    color: '#6b7280',
    textAlign: 'center',
  },
  ctaSection: {
    alignItems: 'center',
    marginTop: sizes.sectionGap,
  },
  continueButton: {
    width: '100%',
    height: sizes.buttonHeight,
    borderRadius: 10,
    backgroundColor: '#B46A3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sizes.gap,
    shadowColor: '#B46A3C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  continueButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: sizes.buttonTextSize,
    fontWeight: '700',
    color: '#fff',
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backText: {
    fontSize: sizes.bodySize,
    color: '#6b7280',
    fontWeight: '500',
  },
  backTextAccent: {
    color: '#1f2a44',
    fontWeight: '600',
  },
});

type IconName =
  | 'dashboard'
  | 'group'
  | 'assessment'
  | 'build'
  | 'payment'
  | 'security'
  | 'notifications'
  | 'storage'
  | 'trending-up'
  | 'check-circle';

interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: 'dashboard',
    title: 'Unified Dashboard',
    description: 'Monitor all your properties from a single, intuitive dashboard with real-time updates.',
  },
  {
    icon: 'group',
    title: 'Team Coordination',
    description: 'Manage maintenance teams, assign tasks, and track progress effortlessly.',
  },
  {
    icon: 'assessment',
    title: 'Advanced Analytics',
    description: 'Gain insights with detailed reports, revenue tracking, and performance metrics.',
  },
  {
    icon: 'build',
    title: 'Maintenance Management',
    description: 'Schedule maintenance, track repairs, and manage multiple properties efficiently.',
  },
  {
    icon: 'payment',
    title: 'Smart Billing',
    description: 'Automated rent collection, expense tracking, and financial reconciliation.',
  },
  {
    icon: 'security',
    title: 'Data Security',
    description: 'Enterprise-grade encryption and secure backup for all your sensitive data.',
  },
];

const benefits = [
  'Manage unlimited properties in your portfolio',
  'Real-time notifications and alerts for urgent matters',
  'Bulk data export and custom reporting tools',
  'Integration with popular payment gateways',
  'Dedicated support team available 24/7',
  'Monthly performance insights and recommendations',
];

export default function EstateManagementScreen() {
  const router = useRouter();
  const panResponderRef = useRef<PanResponderInstance | null>(null);

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

  const handleContinue = () => {
    router.push('/(landlord)/(auth)/landregister');
  };

  const panResponders = panResponderRef.current;

  return (
    <SafeAreaView
      style={styles.container}
      {...(panResponders?.panHandlers || {})}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.subheader}>HausFix Pro</Text>
            <Text style={styles.mainTitle}>Estate Management System</Text>
            <Text style={styles.subtitle}>
              Professional tools for managing multi-property portfolios with ease and confidence
            </Text>
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=300&fit=crop',
              }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>

          {/* Features Section */}
          <View>
            <Text style={styles.sectionTitle}>Powerful Features</Text>
            <View style={styles.featureGrid}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureCard}>
                  <View style={styles.featureIconContainer}>
                    <MaterialIcons
                      name={feature.icon}
                      size={26}
                      style={styles.featureIcon}
                    />
                  </View>
                  <View style={styles.featureContent}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>
                      {feature.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>



          {/* Highlight Section */}
          <View style={styles.highlightSection}>
            <Text style={styles.highlightTitle}>Why Choose Estate Management?</Text>
            <View style={styles.benefitsList}>
              {benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <MaterialIcons
                    name="check-circle"
                    size={20}
                    style={styles.checkIcon}
                  />
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
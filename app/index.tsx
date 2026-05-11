import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions, ImageSourcePropType } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Responsive sizes based on screen width
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
      illustrationSize: 120,
      titleSize: 24,
      subtitleSize: 14,
      paddingH: 16,
      paddingV: 20,
      buttonHeight: 48,
      buttonTextSize: 15,
      dotSize: 8,
    },
    medium: {
      illustrationSize: 140,
      titleSize: 28,
      subtitleSize: 15,
      paddingH: 20,
      paddingV: 24,
      buttonHeight: 52,
      buttonTextSize: 16,
      dotSize: 10,
    },
    large: {
      illustrationSize: 180,
      titleSize: 32,
      subtitleSize: 16,
      paddingH: 24,
      paddingV: 28,
      buttonHeight: 56,
      buttonTextSize: 17,
      dotSize: 12,
    },
    xlarge: {
      illustrationSize: 380,
      titleSize: 36,
      subtitleSize: 18,
      paddingH: 32,
      paddingV: 32,
      buttonHeight: 60,
      buttonTextSize: 18,
      dotSize: 14,
    },
  };
  return sizes[responsiveSize];
};

const sizes = getSizes();

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
}

// Slideshow data with URI-based images (no local assets needed)
const slides: Slide[] = [
  {
    id: 1,
    title: 'Welcome to HauseFix',
    subtitle: 'Your ultimate tool for property and estate management.',
    image: {
      uri: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=500&fit=crop',
    },
  },
  {
    id: 2,
    title: 'Manage Properties Effortlessly',
    subtitle: 'Organize your properties and tenants in one place.',
    image: {
      uri: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=500&fit=crop',
    },
  },
  {
    id: 3,
    title: 'Simplify Your Workflow',
    subtitle: 'Save time and reduce paperwork with smart automation.',
    image: {
      uri: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=500&fit=crop',
    },
  },
];

const createStyles = (themeColor: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fc',
    },
    mainContent: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: sizes.paddingH,
      paddingVertical: sizes.paddingV,
    },
    slideContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    illustrationContainer: {
      width: sizes.illustrationSize * 1.3,
      height: sizes.illustrationSize * 1.3,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: sizes.paddingV,
    },
    illustration: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    textContent: {
      alignItems: 'center',
      marginBottom: sizes.paddingV * 2,
    },
    title: {
      fontSize: sizes.titleSize,
      fontWeight: '700',
      color: '#1f2937',
      textAlign: 'center',
      lineHeight: sizes.titleSize * 1.3,
      marginBottom: sizes.paddingV / 2,
    },
    titleHighlight: {
      color: themeColor,
    },
    subtitle: {
      fontSize: sizes.subtitleSize,
      color: '#6b7280',
      textAlign: 'center',
      lineHeight: sizes.subtitleSize * 1.5,
      fontWeight: '400',
      maxWidth: '90%',
      alignSelf: 'center',
    },
    footerSection: {
      gap: sizes.paddingV,
    },
    footerContent: {
      alignItems: 'center',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: sizes.dotSize / 2,
      marginBottom: sizes.paddingV,
    },
    dot: {
      height: sizes.dotSize,
      borderRadius: sizes.dotSize / 2,
      backgroundColor: '#d1d5db',
    },
    dotActive: {
      width: sizes.dotSize * 2.5,
      backgroundColor: themeColor,
    },
    dotInactive: {
      width: sizes.dotSize,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: sizes.buttonHeight,
      backgroundColor: themeColor,
      borderRadius: 8,
      shadowColor: themeColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
      alignSelf: 'center',
      paddingHorizontal: sizes.paddingH * 2,
    },
    buttonPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    buttonText: {
      fontSize: sizes.buttonTextSize,
      fontWeight: '600',
      color: '#ffffff',
      letterSpacing: 0.5,
      marginRight: 8,
    },
    termsText: {
      fontSize: sizes.subtitleSize * 0.85,
      color: '#9ca3af',
      textAlign: 'center',
      lineHeight: sizes.subtitleSize * 1.4,
    },
    termsLink: {
      color: themeColor,
      textDecorationLine: 'underline',
      fontWeight: '600',
    },
  });

export default function HomeScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [themeColor] = useState('#051054');
  const [buttonPressed, setButtonPressed] = useState(false);
  const styles = useMemo(() => createStyles(themeColor), [themeColor]);

  const router = useRouter();

  // Auto-play slideshow every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleDotPress = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleGetStarted = useCallback(() => {
    setButtonPressed(true);
    setTimeout(() => {
      router.push('/(onboarding)/select-plan');
    }, 200);
  }, [router]);

  const slide = slides[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        {/* Slide Content */}
        <View style={styles.slideContainer}>
          <View style={styles.illustrationContainer}>
            <Image
              source={slide.image}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContent}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </View>
        </View>

        {/* Footer Section */}
        <View style={[styles.footerSection, styles.footerContent]}>
          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {slides.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleDotPress(index)}
                style={[
                  styles.dot,
                  currentSlide === index
                    ? styles.dotActive
                    : styles.dotInactive,
                ]}
                activeOpacity={0.7}
              />
            ))}
          </View>

          {/* Get Started Button - Links to select-plan */}
          <TouchableOpacity
            onPress={handleGetStarted}
            style={[styles.button, buttonPressed && styles.buttonPressed]}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <MaterialIcons
              name="arrow-forward"
              size={sizes.buttonTextSize + 2}
              color="#ffffff"
            />
          </TouchableOpacity>

          {/* Terms Text */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms</Text>
            {' & '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
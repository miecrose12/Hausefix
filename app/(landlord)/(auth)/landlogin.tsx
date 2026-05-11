import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  PanResponder,
  Keyboard,
  ActivityIndicator,
  Image, // Added Image for the original logo
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

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
      labelSize: 11,
      buttonHeight: 48,
      buttonTextSize: 13,
      paddingH: 14,
      paddingV: 12,
      inputHeight: 48,
      gap: 12,
    },
    medium: {
      headerSize: 28,
      subheaderSize: 12,
      bodySize: 13,
      labelSize: 12,
      buttonHeight: 52,
      buttonTextSize: 14,
      paddingH: 16,
      paddingV: 14,
      inputHeight: 52,
      gap: 14,
    },
    large: {
      headerSize: 32,
      subheaderSize: 13,
      bodySize: 14,
      labelSize: 13,
      buttonHeight: 56,
      buttonTextSize: 15,
      paddingH: 18,
      paddingV: 16,
      inputHeight: 56,
      gap: 16,
    },
    xlarge: {
      headerSize: 36,
      subheaderSize: 14,
      bodySize: 15,
      labelSize: 14,
      buttonHeight: 60,
      buttonTextSize: 16,
      paddingH: 20,
      paddingV: 18,
      inputHeight: 60,
      gap: 18,
    },
  };
  return sizes[responsiveSize];
};

const sizes = getSizes();

type FocusedFieldType = 'email' | 'password' | null;

export default function LandlordLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<FocusedFieldType>(null);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Swipe gesture handler
  const [panResponder] = React.useState(() =>
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && dx > 0;
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx } = gestureState;
        if (dx > 80) {
          Keyboard.dismiss();
          setTimeout(() => router.back(), 100);
        }
      },
    })
  );

  const isValidEmail = useCallback((emailStr: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  }, []);

  const handleSignIn = useCallback(async () => {
    setErrorMessage('');
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setButtonPressed(true);
    setIsLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      setIsLoading(false);
      router.push('/(landlord)/(tabs)');
    }, 1500);
  }, [email, password, isValidEmail, router]);

  const handleGoogleSignIn = useCallback(async () => {
    setErrorMessage('');
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      router.push('/(landlord)/(auth)/(home)');
    }, 1500);
  }, [router]);

  const handleSignUp = useCallback(() => {
    Keyboard.dismiss();
    router.push('/(landlord)/(auth)/landregister');
  }, [router]);

  const handleForgotPassword = useCallback(() => {
    Keyboard.dismiss();
    router.push('/(landlord)/(auth)/landregister');
  }, [router]);

  const isFormValid = email.trim() && password.trim() && isValidEmail(email);
  const isLoggingIn = isLoading || googleLoading;

  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!buttonPressed}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSection}>
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <MaterialIcons name="home" size={40} color="#fff" />
            </View>
            <Text style={styles.logoText}>HausFix Pro</Text>
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to manage your properties</Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, focusedField === 'email' && styles.inputFocused]}
                  placeholder="name@example.com"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(t) => { setEmail(t); setErrorMessage(''); }}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoggingIn}
                />
                <View style={styles.iconButton}>
                  <MaterialIcons name="mail" size={20} color="#9ca3af" />
                </View>
              </View>
              {errorMessage.includes('email') && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput, focusedField === 'password' && styles.inputFocused]}
                  placeholder={showPassword ? 'Enter password' : '••••••••'}
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(t) => { setPassword(t); setErrorMessage(''); }}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  autoCapitalize="none"
                  editable={!isLoggingIn}
                />
                <TouchableOpacity
                  style={[styles.iconButton, (showPassword || password) && styles.iconButtonActive]}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={!password}
                >
                  <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={22}
                    color={showPassword ? '#1F2A44' : '#9ca3af'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {errorMessage !== '' && !errorMessage.includes('email') && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={handleForgotPassword} disabled={isLoggingIn}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.signInButton, !isFormValid && styles.signInButtonDisabled]}
            onPress={handleSignIn}
            disabled={!isFormValid || isLoggingIn}
          >
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} /><Text style={styles.dividerText}>or</Text><View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={isLoggingIn}
          >
            {googleLoading ? (
              <ActivityIndicator color="#1f2942" />
            ) : (
              <>
                {/* Original Multi-color Google Logo */}
                <Image 
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png' }} 
                  style={{ width: 20, height: 20 }}
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.signUpLink}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={handleSignUp} disabled={isLoggingIn}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f8' },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: sizes.paddingH,
    paddingVertical: sizes.paddingV,
    justifyContent: 'space-between',
  },
  topSection: { flex: 1 },
  logoSection: { alignItems: 'center', marginTop: sizes.paddingV * 3, marginBottom: sizes.gap * 3 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#1F2A44',
    justifyContent: 'center', alignItems: 'center', marginBottom: sizes.gap,
    elevation: 4, shadowColor: '#1F2A44', shadowOpacity: 0.2, shadowRadius: 12,
  },
  logoText: { fontSize: sizes.headerSize - 4, fontWeight: '700', color: '#1F2A44' },
  titleSection: { marginBottom: sizes.gap * 2, alignItems: 'center' },
  mainTitle: { fontSize: sizes.headerSize, fontWeight: '700', color: '#1f2942', marginBottom: 6 },
  subtitle: { fontSize: sizes.subheaderSize, color: '#6b7280', textAlign: 'center' },
  formSection: { gap: sizes.gap, marginBottom: sizes.gap * 2 },
  fieldGroup: { gap: 8 },
  label: { fontSize: sizes.labelSize, fontWeight: '600', color: '#374151', marginLeft: 2 },
  inputContainer: { position: 'relative' },
  input: {
    height: sizes.inputHeight, paddingLeft: 14, paddingRight: 50,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e5e7eb',
    borderRadius: 12, fontSize: sizes.bodySize, color: '#1f2942', fontWeight: '500',
  },
  inputFocused: { borderColor: '#1F2A44', borderWidth: 2 },
  passwordInput: { paddingRight: 50 },
  iconButton: { position: 'absolute', right: 12, top: 0, height: sizes.inputHeight, width: 48, justifyContent: 'center', alignItems: 'center' },
  iconButtonActive: { backgroundColor: 'rgba(5, 16, 84, 0.08)', borderRadius: 8 },
  forgotPasswordContainer: { alignItems: 'flex-end', marginBottom: sizes.gap },
  forgotPasswordText: { fontSize: sizes.bodySize - 1, fontWeight: '600', color: '#1F2A44' },
  bottomSection: { gap: sizes.gap * 1.5, marginBottom: sizes.paddingV },
  signInButton: {
    height: sizes.buttonHeight, backgroundColor: '#1F2A44', borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', elevation: 6,
  },
  signInButtonDisabled: { opacity: 0.5 },
  buttonText: { fontSize: sizes.buttonTextSize, fontWeight: '700', color: '#fff' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', gap: sizes.gap, marginVertical: sizes.gap },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
  dividerText: { fontSize: sizes.bodySize - 1, color: '#9ca3af' },
  googleButton: {
    height: sizes.buttonHeight, backgroundColor: '#fff', borderRadius: 12,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
    borderWidth: 1.5, borderColor: '#e5e7eb', elevation: 2,
  },
  googleButtonText: { fontSize: sizes.buttonTextSize, fontWeight: '700', color: '#1f2942' },
  signUpLink: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4, marginTop: sizes.gap },
  signUpText: { fontSize: sizes.bodySize - 1, color: '#6b7280' },
  signUpButtonText: { fontSize: sizes.bodySize - 1, fontWeight: '700', color: '#1F2A44' },
  errorMessage: { fontSize: sizes.bodySize - 1, color: '#dc2626', fontWeight: '600', marginTop: 6 },
});
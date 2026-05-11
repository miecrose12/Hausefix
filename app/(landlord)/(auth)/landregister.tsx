import React, { useState, useCallback, useMemo } from 'react';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes.paddingH,
    paddingVertical: sizes.paddingV,
    justifyContent: 'space-between',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
    backgroundColor: 'rgba(5, 16, 84, 0.05)',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2942',
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: sizes.paddingH,
    paddingVertical: sizes.paddingV,
  },
  titleSection: {
    marginBottom: sizes.gap * 2,
  },
  mainTitle: {
    fontSize: sizes.headerSize,
    fontWeight: '700',
    color: '#1f2942',
    marginBottom: 6,
    lineHeight: sizes.headerSize * 1.2,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: sizes.subheaderSize,
    color: '#6b7280',
    lineHeight: sizes.subheaderSize * 1.5,
    fontWeight: '400',
  },
  formSection: {
    gap: sizes.gap,
    marginBottom: sizes.gap * 2,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: sizes.labelSize,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 2,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: sizes.inputHeight,
    paddingLeft: 14,
    paddingRight: 50,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    fontSize: sizes.bodySize,
    color: '#1f2942',
    fontWeight: '500',
  },
  inputFocused: {
    borderColor: '#1F2A44',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  passwordInput: {
    letterSpacing: 2,
    fontWeight: '600',
    color: '#1f2942',
  },
  passwordInputVisible: {
    letterSpacing: 0,
    fontWeight: '500',
    color: '#1f2942',
  },
  passwordIconButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    height: sizes.inputHeight,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 10,
  },
  passwordIconButtonActive: {
    backgroundColor: 'rgba(5, 16, 84, 0.08)',
  },
  emailIconButton: {
    position: 'absolute',
    right: 14,
    top: 0,
    height: sizes.inputHeight,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    borderRadius: 8,
  },
  strengthMeter: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 2,
    paddingTop: 10,
    marginBottom: 8,
  },
  strengthBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
  },
  strengthBarFilled: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#dc2626',
  },
  strengthBarGood: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f59e0b',
  },
  strengthBarStrong: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  strengthLabel: {
    fontSize: sizes.labelSize - 1,
    color: '#6b7280',
    fontWeight: '600',
    marginLeft: 2,
    marginBottom: 10,
  },
  missingRequirementsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  missingRequirementsLabel: {
    fontSize: sizes.labelSize - 1,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  requirementsList: {
    gap: 6,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
    fontSize: sizes.labelSize - 1,
    fontWeight: '500',
    color: '#78350f',
  },
  spacer: {
    flex: 1,
  },
  footerSection: {
    gap: sizes.gap * 1.5,
    paddingBottom: sizes.paddingV,
  },
  nextButton: {
    height: sizes.buttonHeight,
    backgroundColor: '#1F2A44',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#1F2A44',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: sizes.buttonTextSize,
    fontWeight: '700',
    color: '#fff',
  },
  signInLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  signInText: {
    fontSize: sizes.bodySize - 1,
    color: '#6b7280',
    fontWeight: '500',
  },
  signInButton: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  signInButtonText: {
    fontSize: sizes.bodySize - 1,
    fontWeight: '700',
    color: '#1F2A44',
  },
  spacerView: {
    width: 40,
  },
});

type FocusedFieldType = 'fullName' | 'email' | 'password' | 'confirmPassword' | null;

interface PasswordRequirements {
  minLength: boolean;
  hasNumber: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasSpecialChar: boolean;
}

export default function LandlordSignup() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<FocusedFieldType>(null);
  const [buttonPressed, setButtonPressed] = useState(false);

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

  // Check password requirements
  const getPasswordRequirements = useCallback((): PasswordRequirements => {
    return {
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
  }, [password]);

  const passwordRequirements = useMemo(
    () => getPasswordRequirements(),
    [getPasswordRequirements]
  );

  // Get missing requirements
  const getMissingRequirements = useCallback((): string[] => {
    const missing: string[] = [];
    if (!passwordRequirements.minLength) missing.push('At least 8 characters');
    if (!passwordRequirements.hasUpperCase) missing.push('One uppercase letter');
    if (!passwordRequirements.hasNumber) missing.push('One number');
    if (!passwordRequirements.hasSpecialChar) missing.push('One special character');
    return missing;
  }, [passwordRequirements]);

  const missingRequirements = useMemo(
    () => getMissingRequirements(),
    [getMissingRequirements]
  );

  // Calculate password strength
  const calculatePasswordStrength = useCallback((): number => {
    if (!password) return 0;
    let strength = 0;
    if (passwordRequirements.minLength) strength += 1;
    if (password.length >= 12) strength += 1;
    if (passwordRequirements.hasUpperCase && passwordRequirements.hasLowerCase)
      strength += 1;
    if (passwordRequirements.hasNumber) strength += 1;
    if (passwordRequirements.hasSpecialChar) strength += 1;
    return Math.min(strength, 5);
  }, [password, passwordRequirements]);

  const passwordStrength = useMemo(
    () => calculatePasswordStrength(),
    [calculatePasswordStrength]
  );

  const getStrengthLabel = useCallback((): string => {
    const strength = passwordStrength;
    if (strength === 0) return '';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    if (strength === 4) return 'Strong';
    return 'Very Strong';
  }, [passwordStrength]);

  const getStrengthColor = useCallback((): string => {
    const strength = passwordStrength;
    if (strength === 1) return '#dc2626';
    if (strength === 2) return '#f59e0b';
    if (strength === 3) return '#10b981';
    if (strength >= 4) return '#059669';
    return '#d1d5db';
  }, [passwordStrength]);

  const renderStrengthBars = useCallback(() => {
    const bars = [];
    for (let i = 0; i < 5; i++) {
      let barStyle: any[] = [styles.strengthBar];
      if (i < passwordStrength) {
        if (passwordStrength === 1) barStyle.push(styles.strengthBarFilled);
        else if (passwordStrength === 2) barStyle.push(styles.strengthBarGood);
        else barStyle.push(styles.strengthBarStrong);
      }
      bars.push(<View key={i} style={barStyle} />);
    }
    return bars;
  }, [passwordStrength]);

  const handleNext = useCallback(() => {
    const allRequirementsMet =
      passwordRequirements.minLength &&
      passwordRequirements.hasNumber &&
      passwordRequirements.hasUpperCase &&
      passwordRequirements.hasSpecialChar &&
      password === confirmPassword &&
      fullName &&
      email;

    if (!allRequirementsMet) {
      alert('Please ensure all password requirements are met and passwords match.');
      return;
    }

    setButtonPressed(true);
    Keyboard.dismiss();
    setTimeout(() => {
      router.push('/contactland');
    }, 200);
  }, [
    passwordRequirements,
    password,
    confirmPassword,
    fullName,
    email,
    router,
  ]);

  const handleSignIn = useCallback(() => {
    Keyboard.dismiss();
    router.push('/(landlord)/(auth)/landlogin');
  }, [router]);

  const handleBackPress = useCallback(() => {
    Keyboard.dismiss();
    router.back();
  }, [router]);

  const isPasswordValid =
    passwordRequirements.minLength &&
    passwordRequirements.hasNumber &&
    passwordRequirements.hasUpperCase &&
    passwordRequirements.hasSpecialChar;

  const isFormValid =
    isPasswordValid && password === confirmPassword && fullName && email;

  const passwordsMismatch = confirmPassword && password !== confirmPassword;

  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1F2A44" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
        <View style={styles.spacerView} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!buttonPressed}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Landlord Details</Text>
          <Text style={styles.subtitle}>
            Step 1 of 3: Manage your properties with HausFix Pro.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formSection}>
          {/* Full Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  focusedField === 'fullName' && styles.inputFocused,
                ]}
                placeholder="e.g. Jane Doe"
                placeholderTextColor="#9ca3af"
                value={fullName}
                onChangeText={setFullName}
                onFocus={() => setFocusedField('fullName')}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  focusedField === 'email' && styles.inputFocused,
                ]}
                placeholder="name@example.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
              />
              <View style={styles.emailIconButton}>
                <MaterialIcons name="mail" size={20} color="#9ca3af" />
              </View>
            </View>
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  showPassword && styles.passwordInputVisible,
                  focusedField === 'password' && styles.inputFocused,
                ]}
                placeholder={showPassword ? 'Enter password' : '••••••••'}
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="oneTimeCode"
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={[
                  styles.passwordIconButton,
                  (showPassword || password) && styles.passwordIconButtonActive,
                ]}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.6}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialIcons
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={22}
                  color={showPassword ? '#1F2A44' : '#9ca3af'}
                />
              </TouchableOpacity>
            </View>

            {/* Missing Requirements - Only show when there are missing items */}
            {password && missingRequirements.length > 0 && (
              <View style={styles.missingRequirementsContainer}>
                <Text style={styles.missingRequirementsLabel}>
                  Missing requirements:
                </Text>
                <View style={styles.requirementsList}>
                  {missingRequirements.map((requirement, index) => (
                    <View key={index} style={styles.requirementItem}>
                      <MaterialIcons name="close" size={16} color="#f59e0b" />
                      <Text style={styles.requirementText}>{requirement}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Confirm Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.passwordInput,
                  showConfirmPassword && styles.passwordInputVisible,
                  focusedField === 'confirmPassword' && styles.inputFocused,
                ]}
                placeholder={showConfirmPassword ? 'Re-enter password' : '••••••••'}
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="oneTimeCode"
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={[
                  styles.passwordIconButton,
                  (showConfirmPassword || confirmPassword) &&
                    styles.passwordIconButtonActive,
                ]}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                activeOpacity={0.6}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialIcons
                  name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                  size={22}
                  color={showConfirmPassword ? '#1F2A44' : '#9ca3af'}
                />
              </TouchableOpacity>
            </View>

            {/* Password Mismatch Warning */}
            {passwordsMismatch && (
              <View style={styles.missingRequirementsContainer}>
                <View style={styles.requirementItem}>
                  <MaterialIcons name="close" size={16} color="#f59e0b" />
                  <Text style={styles.requirementText}>Passwords do not match</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.spacer} />

        {/* Footer Section */}
        <View style={styles.footerSection}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              buttonPressed && styles.nextButtonPressed,
              !isFormValid && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            activeOpacity={0.8}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>Next</Text>
            <MaterialIcons
              name="arrow-forward"
              size={sizes.buttonTextSize + 2}
              color="#fff"
            />
          </TouchableOpacity>

          <View style={styles.signInLink}>
            <Text style={styles.signInText}>Already a member?</Text>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignIn}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
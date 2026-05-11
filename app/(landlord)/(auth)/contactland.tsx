import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
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
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  stepIndicator: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9ca3af',
  },
  spacer: {
    width: 48,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 16,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d1d5db',
  },
  progressBar: {
    width: 32,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1F2A44',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: sizes.paddingH,
    paddingVertical: sizes.paddingV,
    paddingBottom: 180,
  },
  titleSection: {
    marginBottom: sizes.gap * 2,
  },
  mainTitle: {
    fontSize: sizes.headerSize,
    fontWeight: '700',
    color: '#1f2942',
    marginBottom: 8,
    lineHeight: sizes.headerSize * 1.2,
  },
  subtitle: {
    fontSize: sizes.subheaderSize,
    color: '#6b7280',
    lineHeight: sizes.subheaderSize * 1.4,
  },
  formSection: {
    gap: sizes.gap * 2,
    marginBottom: sizes.gap,
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
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    overflow: 'hidden',
  },
  phoneContainerFocused: {
    borderColor: '#1F2A44',
    borderWidth: 2,
  },
  phonePrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRightWidth: 1.5,
    borderRightColor: '#e5e7eb',
  },
  phonePrefixText: {
    fontSize: sizes.bodySize,
    fontWeight: '600',
    color: '#9ca3af',
  },
  phoneInput: {
    flex: 1,
    height: sizes.inputHeight,
    paddingHorizontal: 12,
    fontSize: sizes.bodySize,
    color: '#000',
    fontWeight: '500',
  },
  addressContainer: {
    position: 'relative',
  },
  addressInput: {
    width: '100%',
    minHeight: 128,
    paddingLeft: 14,
    paddingRight: 50,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    fontSize: sizes.bodySize,
    color: '#000',
    fontWeight: '500',
    textAlignVertical: 'top',
  },
  addressInputFocused: {
    borderColor: '#1F2A44',
    borderWidth: 2,
  },
  addressIcon: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
  verifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#0d948815',
    borderWidth: 1,
    borderColor: '#0d9488',
    borderRadius: 10,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  verifyButtonVerified: {
    backgroundColor: '#10b98115',
    borderColor: '#10b981',
  },
  verifyButtonDisabled: {
    opacity: 0.6,
  },
  verifyButtonText: {
    fontSize: sizes.labelSize,
    fontWeight: '600',
    color: '#0d9488',
  },
  verifyButtonTextVerified: {
    color: '#10b981',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: sizes.paddingH,
    paddingVertical: sizes.paddingV,
    paddingBottom: 24,
    backgroundColor: '#f6f6f8',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
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
  buttonText: {
    fontSize: sizes.buttonTextSize,
    fontWeight: '700',
    color: '#fff',
  },
});

export default function ContactLand() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [focusedField, setFocusedField] = useState<'phone' | 'address' | null>(null);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  // Format phone number as user types
  const formatPhoneNumber = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 10);
    let formatted = '';

    if (digits.length > 0) {
      if (digits.length <= 3) {
        formatted = digits;
      } else if (digits.length <= 6) {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
      }
    }

    setPhone(formatted);
  };

  const handleVerifyPhone = async () => {
    if (phone.replace(/\D/g, '').length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number');
      return;
    }

    setVerifyLoading(true);

    // Simulate verification delay
    setTimeout(() => {
      setPhoneVerified(true);
      setVerifyLoading(false);
      Alert.alert('Success', 'Phone number verified successfully!');
    }, 1500);
  };

  const handleNext = () => {
    // Validation
    if (!phone.replace(/\D/g, '') || phone.replace(/\D/g, '').length < 10) {
      Alert.alert('Missing Phone', 'Please enter a valid phone number');
      return;
    }

    if (!address.trim()) {
      Alert.alert('Missing Address', 'Please enter your business/primary address');
      return;
    }

    setButtonPressed(true);

    // Navigate to next step
    setTimeout(() => {
      router.push('/addaccount');
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1f2942" />
        </TouchableOpacity>
        <Text style={styles.stepIndicator}>Step 2 of 4</Text>
        <View style={styles.spacer} />
      </View>

      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        <View style={styles.progressDot} />
        <View style={styles.progressBar} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Contact Details</Text>
          <Text style={styles.subtitle}>
            How can tenants and contractors reach you?
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Phone Number */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View
              style={[
                styles.phoneContainer,
                focusedField === 'phone' && styles.phoneContainerFocused,
              ]}
            >
              <View style={styles.phonePrefix}>
                <MaterialIcons
                  name="call"
                  size={20}
                  color="#9ca3af"
                />
                <Text style={styles.phonePrefixText}>+1</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="(555) 000-0000"
                placeholderTextColor="#d1d5db"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={formatPhoneNumber}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[
                styles.verifyButton,
                phoneVerified && styles.verifyButtonVerified,
                (verifyLoading || phoneVerified) && styles.verifyButtonDisabled,
              ]}
              onPress={handleVerifyPhone}
              activeOpacity={0.7}
              disabled={verifyLoading || phoneVerified}
            >
              {verifyLoading ? (
                <ActivityIndicator size="small" color="#0d9488" />
              ) : phoneVerified ? (
                <MaterialIcons name="verified" size={18} color="#10b981" />
              ) : (
                <MaterialIcons name="verified-user" size={18} color="#0d9488" />
              )}
              <Text
                style={[
                  styles.verifyButtonText,
                  phoneVerified && styles.verifyButtonTextVerified,
                ]}
              >
                {phoneVerified ? 'Phone Verified' : 'Verify Phone Number'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Address */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Business/Primary Address</Text>
            <View style={styles.addressContainer}>
              <TextInput
                style={[
                  styles.addressInput,
                  focusedField === 'address' && styles.addressInputFocused,
                ]}
                placeholder="123 Property Lane, City, State"
                placeholderTextColor="#d1d5db"
                multiline
                numberOfLines={4}
                value={address}
                onChangeText={setAddress}
                onFocus={() => setFocusedField('address')}
                onBlur={() => setFocusedField(null)}
              />
              <View style={styles.addressIcon}>
                <MaterialIcons
                  name="location-on"
                  size={24}
                  color="#9ca3af"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[styles.nextButton, buttonPressed && styles.nextButtonPressed]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Next</Text>
          <MaterialIcons
            name="arrow-forward"
            size={sizes.buttonTextSize + 2}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
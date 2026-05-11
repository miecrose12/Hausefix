import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const colors = {
  light: {
    background: '#f8f9fa',
    card: '#ffffff',
    text: '#1a202c',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    primary: '#050f52',
    inputBg: '#f3f4f6',
  },
  dark: {
    background: '#0f1419',
    card: '#1e293b',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    border: '#334155',
    primary: '#050f52',
    inputBg: '#2d3748',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 16,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    fontWeight: '500',
  },
  inputFocused: {
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  rowItem: {
    flex: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  settingDescription: {
    fontSize: 13,
    marginTop: 4,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#050f52',
  },
  secondaryButton: {
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonTextLight: {
    color: '#ffffff',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
});

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  const [profile, setProfile] = useState({
    firstName: 'Alex',
    lastName: 'Thompson',
    email: 'alex.thompson@example.com',
    phone: '+1 (555) 123-4567',
    title: 'Property Manager',
    bio: 'Experienced property manager with 5+ years in real estate',
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    publicProfile: true,
    marketingEmails: false,
  });

  const theme = darkMode ? colors.dark : colors.light;

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => {} }
    ]);
  };

  const handleToggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={28}
              color={theme.text}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Profile Settings
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setDarkMode(!darkMode)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: darkMode ? '#334155' : '#e2e8f0',
          }}
        >
          <Text style={{ fontSize: 20 }}>{darkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Picture Section */}
        <View style={styles.section}>
          <View style={styles.profileHeader}>
            <View
              style={[
                styles.avatarContainer,
                {
                  backgroundColor: darkMode ? '#334155' : '#dbeafe',
                },
              ]}
            >
              <MaterialCommunityIcons
                name="account-circle"
                size={80}
                color={darkMode ? '#60a5fa' : '#2563eb'}
              />
              <TouchableOpacity
                style={[
                  styles.avatarEditButton,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.primary,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="camera"
                  size={18}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.userName, { color: theme.text }]}>
              {profile.firstName} {profile.lastName}
            </Text>
            <Text style={[styles.userRole, { color: theme.textSecondary }]}>
              {profile.title}
            </Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Personal Information
          </Text>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.text }]}>First Name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: focusedInput === 'firstName' ? theme.primary : theme.border,
                  ...(focusedInput === 'firstName' && styles.inputFocused),
                },
              ]}
              placeholder="First name"
              placeholderTextColor={theme.textSecondary}
              value={profile.firstName}
              onChangeText={(val) => handleInputChange('firstName', val)}
              onFocus={() => setFocusedInput('firstName')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Last Name</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: focusedInput === 'lastName' ? theme.primary : theme.border,
                  ...(focusedInput === 'lastName' && styles.inputFocused),
                },
              ]}
              placeholder="Last name"
              placeholderTextColor={theme.textSecondary}
              value={profile.lastName}
              onChangeText={(val) => handleInputChange('lastName', val)}
              onFocus={() => setFocusedInput('lastName')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: focusedInput === 'email' ? theme.primary : theme.border,
                  ...(focusedInput === 'email' && styles.inputFocused),
                },
              ]}
              placeholder="Email address"
              placeholderTextColor={theme.textSecondary}
              value={profile.email}
              onChangeText={(val) => handleInputChange('email', val)}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Phone</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: focusedInput === 'phone' ? theme.primary : theme.border,
                  ...(focusedInput === 'phone' && styles.inputFocused),
                },
              ]}
              placeholder="Phone number"
              placeholderTextColor={theme.textSecondary}
              value={profile.phone}
              onChangeText={(val) => handleInputChange('phone', val)}
              onFocus={() => setFocusedInput('phone')}
              onBlur={() => setFocusedInput(null)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Title</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: focusedInput === 'title' ? theme.primary : theme.border,
                  ...(focusedInput === 'title' && styles.inputFocused),
                },
              ]}
              placeholder="Job title"
              placeholderTextColor={theme.textSecondary}
              value={profile.title}
              onChangeText={(val) => handleInputChange('title', val)}
              onFocus={() => setFocusedInput('title')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Bio</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: focusedInput === 'bio' ? theme.primary : theme.border,
                  ...(focusedInput === 'bio' && styles.inputFocused),
                  minHeight: 100,
                  textAlignVertical: 'top',
                },
              ]}
              placeholder="Tell us about yourself"
              placeholderTextColor={theme.textSecondary}
              value={profile.bio}
              onChangeText={(val) => handleInputChange('bio', val)}
              onFocus={() => setFocusedInput('bio')}
              onBlur={() => setFocusedInput(null)}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Privacy & Security */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Privacy & Security
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.settingRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Email Notifications
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Receive updates via email
                </Text>
              </View>
              <Switch
                value={settings.emailNotifications}
                onValueChange={() => handleToggleSetting('emailNotifications')}
                trackColor={{ false: theme.border, true: '#60a5fa' }}
                thumbColor={settings.emailNotifications ? '#050f52' : '#9ca3af'}
              />
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.border },
              ]}
            />

            <View style={styles.settingRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Two-Factor Authentication
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Add extra security to your account
                </Text>
              </View>
              <Switch
                value={settings.twoFactorAuth}
                onValueChange={() => handleToggleSetting('twoFactorAuth')}
                trackColor={{ false: theme.border, true: '#60a5fa' }}
                thumbColor={settings.twoFactorAuth ? '#050f52' : '#9ca3af'}
              />
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.border },
              ]}
            />

            <View style={styles.settingRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Public Profile
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Make your profile visible to others
                </Text>
              </View>
              <Switch
                value={settings.publicProfile}
                onValueChange={() => handleToggleSetting('publicProfile')}
                trackColor={{ false: theme.border, true: '#60a5fa' }}
                thumbColor={settings.publicProfile ? '#050f52' : '#9ca3af'}
              />
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: theme.border },
              ]}
            />

            <View style={styles.settingRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  Marketing Emails
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Get the latest news and offers
                </Text>
              </View>
              <Switch
                value={settings.marketingEmails}
                onValueChange={() => handleToggleSetting('marketingEmails')}
                trackColor={{ false: theme.border, true: '#60a5fa' }}
                thumbColor={settings.marketingEmails ? '#050f52' : '#9ca3af'}
              />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.secondaryButton,
              { borderColor: theme.border },
            ]}
            onPress={() => router.back()}
          >
            <Text style={[styles.buttonText, { color: theme.text }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
            ]}
            onPress={handleSave}
          >
            <Text style={[styles.buttonText, styles.buttonTextLight]}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
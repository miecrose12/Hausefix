import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBack: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingItemContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
  },
  settingControl: {
    marginLeft: 12,
  },
  inputSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  inputField: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  infoBox: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    flexDirection: 'row',
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  actionButton: {
    marginHorizontal: 24,
    marginBottom: 12,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  dangerButton: {
    marginHorizontal: 24,
    marginBottom: 48,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  darkModeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ToggleSetting {
  id: string;
  icon: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function BusinessSettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [businessName, setBusinessName] = useState('Thompson Properties LLC');
  const [businessEmail, setBusinessEmail] = useState('contact@thompsonproperties.com');
  const [businessPhone, setBusinessPhone] = useState('+1 (555) 123-4567');

  const [toggleSettings, setToggleSettings] = useState<ToggleSetting[]>([
    {
      id: 'notifications',
      icon: 'bell-outline',
      label: 'Email Notifications',
      description: 'Receive business alerts via email',
      enabled: true,
    },
    {
      id: 'reports',
      icon: 'file-chart-outline',
      label: 'Auto-Generate Reports',
      description: 'Automatically create monthly reports',
      enabled: false,
    },
    {
      id: 'analytics',
      icon: 'chart-box-outline',
      label: 'Analytics Tracking',
      description: 'Track business metrics and insights',
      enabled: true,
    },
  ]);

  // Color scheme based on dark mode
  const bgColor = darkMode ? '#0f1419' : '#f8f9fa';
  const cardColor = darkMode ? '#1e293b' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1a202c';
  const textSecondary = darkMode ? '#9ca3af' : '#6b7280';
  const borderColor = darkMode ? '#334155' : '#e5e7eb';
  const primaryColor = '#050f52';

  // Icon colors
  const iconBgOrange = darkMode ? '#7c2d12' : '#fed7aa';
  const iconOrange = darkMode ? '#fb923c' : '#ea580c';
  const iconBgCyan = darkMode ? '#164e63' : '#cffafe';
  const iconCyan = darkMode ? '#22d3ee' : '#0891b2';
  const iconBgBlue = darkMode ? '#1e3a8a' : '#dbeafe';
  const iconBlue = darkMode ? '#60a5fa' : '#2563eb';
  const iconBgPurple = darkMode ? '#4c1d95' : '#f3e8ff';
  const iconPurple = darkMode ? '#d8b4fe' : '#a855f7';
  const iconBgIndigo = darkMode ? '#312e81' : '#e0e7ff';
  const iconIndigo = darkMode ? '#818cf8' : '#4f46e5';

  const handleToggleSetting = (settingId: string) => {
    setToggleSettings(settings =>
      settings.map(setting =>
        setting.id === settingId
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleSaveChanges = () => {
    Alert.alert('Success', 'Business settings have been updated successfully.');
  };

  const handleResetPassword = () => {
    Alert.alert('Reset Password', 'Password reset link has been sent to your email.');
  };

  const handleDeleteBusiness = () => {
    Alert.alert(
      'Delete Business Account',
      'This action cannot be undone. All data will be permanently deleted.',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => Alert.alert('Deleted', 'Business account has been deleted.'),
          style: 'destructive',
        },
      ]
    );
  };

  // Render setting item with dynamic icon colors
  const renderSettingItem = (setting: ToggleSetting, index: number, total: number) => {
    let bgColor = '';
    let iconColor = '';

    switch (setting.id) {
      case 'notifications':
        bgColor = iconBgOrange;
        iconColor = iconOrange;
        break;
      case 'reports':
        bgColor = iconBgCyan;
        iconColor = iconCyan;
        break;
      case 'analytics':
        bgColor = iconBgBlue;
        iconColor = iconBlue;
        break;
      default:
        bgColor = iconBgBlue;
        iconColor = iconBlue;
    }

    return (
      <View
        key={setting.id}
        style={[
          styles.settingItem,
          {
            borderBottomColor: borderColor,
            borderBottomWidth: index < total - 1 ? 1 : 0,
          },
        ]}
      >
        <View
          style={[
            styles.settingItemIcon,
            { backgroundColor: bgColor },
          ]}
        >
          <MaterialCommunityIcons
            name={setting.icon as any}
            size={20}
            color={iconColor}
          />
        </View>
        <View style={styles.settingItemContent}>
          <Text style={[styles.settingLabel, { color: textColor }]}>
            {setting.label}
          </Text>
          <Text style={[styles.settingDescription, { color: textSecondary }]}>
            {setting.description}
          </Text>
        </View>
        <View style={styles.settingControl}>
          <Switch
            value={setting.enabled}
            onValueChange={() => handleToggleSetting(setting.id)}
            trackColor={{
              false: borderColor,
              true: darkMode ? '#60a5fa' : '#93c5fd',
            }}
            thumbColor={setting.enabled ? primaryColor : '#9ca3af'}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={bgColor}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <TouchableOpacity
          style={[
            styles.headerBack,
            { backgroundColor: cardColor },
          ]}
          onPress={handleBackPress}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color={textColor}
          />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: textColor }]}>
            Business Settings
          </Text>
          <Text style={[styles.headerSubtitle, { color: textSecondary }]}>
            Manage your organization
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Business Information Section */}
        <View style={styles.inputSection}>
          <Text style={[styles.inputLabel, { color: textColor }]}>
            Business Information
          </Text>

          <TextInput
            style={[
              styles.inputField,
              {
                backgroundColor: cardColor,
                borderColor: borderColor,
                color: textColor,
              },
            ]}
            placeholder="Business Name"
            placeholderTextColor={textSecondary}
            value={businessName}
            onChangeText={setBusinessName}
          />

          <TextInput
            style={[
              styles.inputField,
              {
                backgroundColor: cardColor,
                borderColor: borderColor,
                color: textColor,
              },
            ]}
            placeholder="Business Email"
            placeholderTextColor={textSecondary}
            value={businessEmail}
            onChangeText={setBusinessEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={[
              styles.inputField,
              {
                backgroundColor: cardColor,
                borderColor: borderColor,
                color: textColor,
              },
            ]}
            placeholder="Business Phone"
            placeholderTextColor={textSecondary}
            value={businessPhone}
            onChangeText={setBusinessPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Business Preferences Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: textSecondary }]}>
            Business Preferences
          </Text>
          <View style={[styles.settingsCard, { backgroundColor: cardColor }]}>
            {toggleSettings.map((setting, index) =>
              renderSettingItem(setting, index, toggleSettings.length)
            )}
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: textSecondary }]}>
            Security
          </Text>
          <View style={[styles.settingsCard, { backgroundColor: cardColor }]}>
            <TouchableOpacity
              style={[
                styles.settingItem,
                { borderBottomColor: borderColor, borderBottomWidth: 1 },
              ]}
            >
              <View
                style={[
                  styles.settingItemIcon,
                  { backgroundColor: iconBgPurple },
                ]}
              >
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={20}
                  color={iconPurple}
                />
              </View>
              <View style={styles.settingItemContent}>
                <Text style={[styles.settingLabel, { color: textColor }]}>
                  Password
                </Text>
                <Text style={[styles.settingDescription, { color: textSecondary }]}>
                  Last changed 3 months ago
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={darkMode ? '#475569' : '#d1d5db'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingItem, { borderBottomColor: borderColor }]}
            >
              <View
                style={[
                  styles.settingItemIcon,
                  { backgroundColor: iconBgIndigo },
                ]}
              >
                <MaterialCommunityIcons
                  name="shield-check-outline"
                  size={20}
                  color={iconIndigo}
                />
              </View>
              <View style={styles.settingItemContent}>
                <Text style={[styles.settingLabel, { color: textColor }]}>
                  Two-Factor Authentication
                </Text>
                <Text style={[styles.settingDescription, { color: textSecondary }]}>
                  Enhanced security for your account
                </Text>
              </View>
              <Switch
                value={false}
                trackColor={{
                  false: borderColor,
                  true: darkMode ? '#60a5fa' : '#93c5fd',
                }}
                thumbColor={'#9ca3af'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Box */}
        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: darkMode ? '#164e63' : '#cffafe',
              borderLeftColor: darkMode ? '#22d3ee' : '#0891b2',
            },
          ]}
        >
          <View style={styles.infoIcon}>
            <MaterialCommunityIcons
              name="information-outline"
              size={20}
              color={darkMode ? '#22d3ee' : '#0891b2'}
            />
          </View>
          <Text
            style={[
              styles.infoText,
              {
                color: darkMode ? '#22d3ee' : '#0891b2',
              },
            ]}
          >
            Changes to your business settings will be applied immediately and may affect your team members' access.
          </Text>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: primaryColor,
            },
          ]}
          onPress={handleSaveChanges}
        >
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={20}
            color="#ffffff"
          />
          <Text style={[styles.actionButtonText, { color: '#ffffff' }]}>
            Save Changes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: cardColor,
              borderWidth: 1,
              borderColor: borderColor,
            },
          ]}
          onPress={handleResetPassword}
        >
          <MaterialCommunityIcons
            name="key-outline"
            size={20}
            color={textColor}
          />
          <Text style={[styles.actionButtonText, { color: textColor }]}>
            Reset Password
          </Text>
        </TouchableOpacity>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: '#dc2626' }]}>
            Danger Zone
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.dangerButton,
            { backgroundColor: darkMode ? '#7f1d1d' : '#fee2e2' },
          ]}
          onPress={handleDeleteBusiness}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={20}
            color="#dc2626"
          />
          <Text style={[styles.dangerButtonText, { color: '#dc2626' }]}>
            Delete Business Account
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Dark Mode Toggle */}
      <TouchableOpacity
        style={[
          styles.darkModeButton,
          {
            backgroundColor: darkMode ? '#334155' : '#e2e8f0',
          },
        ]}
        onPress={() => setDarkMode(!darkMode)}
      >
        <Text style={{ fontSize: 24 }}>{darkMode ? '☀️' : '🌙'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
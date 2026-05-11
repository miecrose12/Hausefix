import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const colors = {
  light: {
    background: '#f8f9fa',
    card: '#ffffff',
    text: '#1a202c',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    primary: '#050f52',
  },
  dark: {
    background: '#0f1419',
    card: '#1e293b',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    border: '#334155',
    primary: '#050f52',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  profileSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  profileCard: {
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
  },
  sectionsContainer: {
    paddingHorizontal: 24,
  },
  section: {
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
  menuList: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuItemChevron: {
    marginLeft: 8,
  },
  logoutButton: {
    marginTop: 16,
    marginBottom: 48,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc2626',
    flex: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 84,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 5,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  navLabelActive: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
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

interface MenuItem {
  id: number;
  iconName: string;
  label: string;
  bgColor: string;
  iconColor: string;
  route?: string;
}

export default function MoreMenuScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('more');

  const theme = darkMode ? colors.dark : colors.light;

  const menuItems: { account: MenuItem[]; preferences: MenuItem[] } = {
    account: [
      {
        id: 1,
        iconName: 'account-circle',
        label: 'Profile Settings',
        bgColor: darkMode ? '#1e3a8a' : '#dbeafe',
        iconColor: darkMode ? '#60a5fa' : '#2563eb',
        route: '/settings/profile/profiles',
      },
      {
        id: 2,
        iconName: 'briefcase-outline',
        label: 'Business Settings',
        bgColor: darkMode ? '#312e81' : '#e0e7ff',
        iconColor: darkMode ? '#818cf8' : '#4f46e5',
        route: '/settings/business/business',
      },
      {
        id: 3,
        iconName: 'shield-account',
        label: 'Roles & Permissions',
        bgColor: darkMode ? '#4c1d95' : '#f3e8ff',
        iconColor: darkMode ? '#d8b4fe' : '#a855f7',
        route: '/settings/roles/roles',
      },
    ],
    preferences: [
      {
        id: 4,
        iconName: 'bell-outline',
        label: 'Notifications',
        bgColor: darkMode ? '#7c2d12' : '#fed7aa',
        iconColor: darkMode ? '#fb923c' : '#ea580c',
        route: '/settings/notification/notification',
      },
      {
        id: 5,
        iconName: 'help-circle-outline',
        label: 'Help & Support',
        bgColor: darkMode ? '#064e3b' : '#d1fae5',
        iconColor: darkMode ? '#6ee7b7' : '#059669',
        route: '/settings/help/help',
      },
    ],
  };

  const handleMenuItemPress = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route as any);
    } else {
      console.log(`${item.label} pressed`);
    }
  };

  const handleLogout = () => {
    console.log('Logout pressed');
    // Add your logout logic here
    // router.push('/(auth)/login');
  };

  const renderMenuSection = (title: string, items: MenuItem[]) => (
    <View key={title} style={styles.section}>
      <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>
        {title}
      </Text>
      <View style={[styles.menuList, { backgroundColor: theme.card }]}>
        {items.map((item: MenuItem, index: number) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              {
                borderBottomColor: theme.border,
                borderBottomWidth: index < items.length - 1 ? 1 : 0,
              },
            ]}
            onPress={() => handleMenuItemPress(item)}
            activeOpacity={0.6}
          >
            <View
              style={[
                styles.menuItemIcon,
                { backgroundColor: item.bgColor },
              ]}
            >
              <MaterialCommunityIcons
                name={item.iconName as any}
                size={20}
                color={item.iconColor}
              />
            </View>
            <Text
              style={[
                styles.menuItemLabel,
                { color: theme.text },
              ]}
            >
              {item.label}
            </Text>
            <View style={styles.menuItemChevron}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={darkMode ? '#475569' : '#d1d5db'}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderNavButton = (iconName: string, label: string) => {
    const isActive = label.toLowerCase() === activeTab;

    return (
      <TouchableOpacity
        key={label}
        style={styles.navButton}
        onPress={() => setActiveTab(label.toLowerCase())}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name={iconName as any}
          size={26}
          color={isActive ? theme.text : '#9ca3af'}
        />
        <Text
          style={[
            isActive ? styles.navLabelActive : styles.navLabel,
            { color: isActive ? theme.text : '#9ca3af' },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>More</Text>
      </View>

      {/* Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileSection}>
          <View
            style={[
              styles.profileCard,
              { backgroundColor: theme.card },
            ]}
          >
            <View
              style={[
                styles.profileAvatar,
                {
                  backgroundColor: darkMode ? '#334155' : '#dbeafe',
                },
              ]}
            >
              <MaterialCommunityIcons
                name="account-circle"
                size={36}
                color={darkMode ? '#ffffff' : '#1a202c'}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: theme.text }]}>
                Alex Thompson
              </Text>
              <Text style={[styles.profileRole, { color: theme.textSecondary }]}>
                Property Manager
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.sectionsContainer}>
          {renderMenuSection('Account & Organization', menuItems.account)}
          {renderMenuSection('Preferences', menuItems.preferences)}

          {/* Logout Button */}
          <TouchableOpacity
            style={[
              styles.logoutButton,
              { backgroundColor: theme.card },
            ]}
            onPress={handleLogout}
            activeOpacity={0.6}
          >
            <View
              style={[
                styles.logoutIcon,
                { backgroundColor: darkMode ? '#7f1d1d' : '#fee2e2' },
              ]}
            >
              <MaterialCommunityIcons
                name="logout"
                size={20}
                color="#dc2626"
              />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View
        style={[
          styles.bottomNav,
          {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
          },
        ]}
      >
        {renderNavButton('home', 'Home')}
        {renderNavButton('office-building', 'Properties')}
        {renderNavButton('account-multiple', 'Tenants')}
        {renderNavButton('wallet', 'Finance')}
        {renderNavButton('dots-horizontal', 'More')}
      </View>

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
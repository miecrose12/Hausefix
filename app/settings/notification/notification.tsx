import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Modal,
  Switch,
  Alert,
  FlatList,
  TextInput,
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
  topActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  filterTabs: {
    paddingHorizontal: 24,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 8,
  },
  filterTab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  notificationCard: {
    marginHorizontal: 24,
    marginBottom: 12,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  notificationCardUnread: {
    borderLeftWidth: 4,
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    marginRight: 10,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
  },
  notificationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  notificationActionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsSection: {
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
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
  },
  settingToggle: {
    marginLeft: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  detailModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  detailModalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    maxHeight: '80%',
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '600',
    width: 80,
  },
  detailValue: {
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  detailActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  detailButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  detailButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  tabsScrollContainer: {
    paddingVertical: 16,
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
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
});

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'payment' | 'property' | 'maintenance' | 'tenant' | 'system';
  timestamp: string;
  read: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
  priority: 'high' | 'medium' | 'low';
}

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export default function NotificationsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // Color scheme
  const bgColor = darkMode ? '#0f1419' : '#f8f9fa';
  const cardColor = '#ffffff'; // All boxes are white now
  const textColor = darkMode ? '#ffffff' : '#1a202c';
  const textSecondary = darkMode ? '#9ca3af' : '#6b7280';
  const borderColor = darkMode ? '#334155' : '#e5e7eb';
  const primaryColor = '#050f52';
  const successColor = darkMode ? '#6ee7b7' : '#059669';
  const warningColor = darkMode ? '#fb923c' : '#ea580c';
  const errorColor = '#dc2626';
  const infoColor = darkMode ? '#22d3ee' : '#0891b2';

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Payment Received',
      message: 'Rent payment of $1,200 received from John Doe for Apartment 3B.',
      type: 'payment',
      timestamp: '2 minutes ago',
      read: false,
      icon: 'cash-multiple',
      iconBg: '#d1fae5',
      iconColor: '#059669',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Maintenance Request',
      message: 'New maintenance request submitted for Water leak in Apartment 2C. Priority: High',
      type: 'maintenance',
      timestamp: '15 minutes ago',
      read: false,
      icon: 'wrench-outline',
      iconBg: '#fed7aa',
      iconColor: '#ea580c',
      priority: 'high',
    },
    {
      id: '3',
      title: 'Tenant Complaint',
      message: 'Sarah Johnson filed a complaint regarding noise from neighboring unit.',
      type: 'tenant',
      timestamp: '1 hour ago',
      read: false,
      icon: 'alert-circle-outline',
      iconBg: '#fecaca',
      iconColor: '#ef4444',
      priority: 'medium',
    },
    {
      id: '4',
      title: 'Property Vacancy',
      message: 'Apartment 1A will be vacant starting next month. Mark it for new tenant search.',
      type: 'property',
      timestamp: '3 hours ago',
      read: true,
      icon: 'home-outline',
      iconBg: '#dbeafe',
      iconColor: '#2563eb',
      priority: 'medium',
    },
    {
      id: '5',
      title: 'System Update',
      message: 'Your account has been updated with new security features. Review changes in settings.',
      type: 'system',
      timestamp: '5 hours ago',
      read: true,
      icon: 'shield-check-outline',
      iconBg: '#f3e8ff',
      iconColor: '#a855f7',
      priority: 'low',
    },
    {
      id: '6',
      title: 'Rental Agreement',
      message: 'New tenant agreement ready for review. Please sign digitally.',
      type: 'tenant',
      timestamp: '6 hours ago',
      read: true,
      icon: 'file-document-outline',
      iconBg: '#e0e7ff',
      iconColor: '#4f46e5',
      priority: 'medium',
    },
  ];

  const notificationSettings: NotificationSetting[] = [
    {
      id: 'payments',
      label: 'Payment Alerts',
      description: 'Notifications for rent payments and transactions',
      enabled: true,
      icon: 'cash-multiple',
      iconBg: '#d1fae5',
      iconColor: '#059669',
    },
    {
      id: 'maintenance',
      label: 'Maintenance Updates',
      description: 'Alerts for maintenance requests and repairs',
      enabled: true,
      icon: 'wrench-outline',
      iconBg: '#fed7aa',
      iconColor: '#ea580c',
    },
    {
      id: 'tenants',
      label: 'Tenant Notifications',
      description: 'Updates about tenant complaints and requests',
      enabled: true,
      icon: 'account-multiple-outline',
      iconBg: '#dbeafe',
      iconColor: '#2563eb',
    },
    {
      id: 'property',
      label: 'Property Updates',
      description: 'Notifications about properties and vacancies',
      enabled: false,
      icon: 'home-outline',
      iconBg: '#e0e7ff',
      iconColor: '#4f46e5',
    },
    {
      id: 'system',
      label: 'System Messages',
      description: 'Important system updates and security alerts',
      enabled: true,
      icon: 'shield-check-outline',
      iconBg: '#f3e8ff',
      iconColor: '#a855f7',
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || notification.type === activeFilter;
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleViewDetail = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowDetailModal(true);
  };

  const handleMarkAsRead = (notification: Notification) => {
    Alert.alert('Success', `Notification marked as ${notification.read ? 'unread' : 'read'}`);
  };

  const handleDelete = (notification: Notification) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => Alert.alert('Deleted', 'Notification has been deleted'),
          style: 'destructive',
        },
      ]
    );
  };

  const handleMarkAllAsRead = () => {
    Alert.alert('Marked', 'All notifications marked as read');
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All',
      'Are you sure you want to delete all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: () => Alert.alert('Cleared', 'All notifications have been deleted'),
          style: 'destructive',
        },
      ]
    );
  };

  const renderNotificationCard = (notification: Notification) => {
    return (
      <TouchableOpacity
        key={notification.id}
        style={[
          styles.notificationCard,
          {
            borderLeftColor: notification.read ? 'transparent' : primaryColor,
          },
          notification.read ? {} : styles.notificationCardUnread,
        ]}
        onPress={() => handleViewDetail(notification)}
      >
        {!notification.read && (
          <View
            style={[
              styles.unreadBadge,
              { backgroundColor: primaryColor },
            ]}
          />
        )}

        <View
          style={[styles.notificationIcon, { backgroundColor: notification.iconBg }]}
        >
          <MaterialCommunityIcons
            name={notification.icon as any}
            size={22}
            color={notification.iconColor}
          />
        </View>

        <View style={styles.notificationContent}>
          <Text style={[styles.notificationTitle, { color: textColor }]}>
            {notification.title}
          </Text>
          <Text
            style={[styles.notificationMessage, { color: textSecondary }]}
            numberOfLines={2}
          >
            {notification.message}
          </Text>
          <Text style={[styles.notificationTime, { color: textSecondary }]}>
            {notification.timestamp}
          </Text>
        </View>

        <View style={styles.notificationActions}>
          <TouchableOpacity
            style={[
              styles.notificationActionButton,
              { backgroundColor: '#f3f4f6' },
            ]}
            onPress={() => handleMarkAsRead(notification)}
          >
            <MaterialCommunityIcons
              name={notification.read ? 'email-outline' : 'email-open-outline'}
              size={16}
              color={textColor}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.notificationActionButton,
              { backgroundColor: '#fee2e2' },
            ]}
            onPress={() => handleDelete(notification)}
          >
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={16}
              color={errorColor}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
          style={[styles.headerBack, { backgroundColor: cardColor }]}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color={textColor} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: textColor }]}>
            Notifications
          </Text>
          <Text style={[styles.headerSubtitle, { color: textSecondary }]}>
            {unreadCount} unread
          </Text>
        </View>
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            style={[
              styles.headerBack,
              { backgroundColor: cardColor },
            ]}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color={textColor}
            />
          </TouchableOpacity>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Top Actions */}
      <View style={styles.topActions}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: primaryColor,
              borderColor: primaryColor,
            },
          ]}
          onPress={handleMarkAllAsRead}
        >
          <MaterialCommunityIcons
            name="check-all"
            size={16}
            color="#ffffff"
          />
          <Text style={[styles.actionButtonText, { color: '#ffffff' }]}>
            Mark All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: cardColor,
              borderColor,
            },
          ]}
          onPress={handleClearAll}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={16}
            color={errorColor}
          />
          <Text style={[styles.actionButtonText, { color: errorColor }]}>
            Clear All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterTabs}
        >
          {['all', 'payment', 'property', 'maintenance', 'tenant', 'system'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                {
                  backgroundColor:
                    activeFilter === filter
                      ? primaryColor
                      : cardColor,
                  borderColor: activeFilter === filter ? primaryColor : borderColor,
                },
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  {
                    color: activeFilter === filter ? '#ffffff' : textColor,
                  },
                ]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              {
                borderColor,
                color: textColor,
              },
            ]}
            placeholder="Search notifications..."
            placeholderTextColor={textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <View>
            {filteredNotifications.map(notification =>
              renderNotificationCard(notification)
            )}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <MaterialCommunityIcons
                name="bell-off-outline"
                size={56}
                color={textSecondary}
              />
            </View>
            <Text style={[styles.emptyText, { color: textColor }]}>
              No notifications
            </Text>
            <Text style={[styles.emptySubtext, { color: textSecondary }]}>
              You're all caught up! Check back later for updates.
            </Text>
          </View>
        )}

        {/* Notification Preferences Section */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionHeader, { color: textSecondary }]}>
            Notification Preferences
          </Text>
          <View style={[styles.settingsCard, { backgroundColor: cardColor }]}>
            {notificationSettings.map((setting, index) => (
              <View
                key={setting.id}
                style={[
                  styles.settingItem,
                  {
                    borderBottomColor: borderColor,
                    borderBottomWidth: index < notificationSettings.length - 1 ? 1 : 0,
                  },
                ]}
              >
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: setting.iconBg },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={setting.icon as any}
                    size={20}
                    color={setting.iconColor}
                  />
                </View>

                <View style={styles.settingContent}>
                  <Text style={[styles.settingLabel, { color: textColor }]}>
                    {setting.label}
                  </Text>
                  <Text style={[styles.settingDescription, { color: textSecondary }]}>
                    {setting.description}
                  </Text>
                </View>

                <View style={styles.settingToggle}>
                  <Switch
                    value={setting.enabled}
                    trackColor={{
                      false: borderColor,
                      true: '#93c5fd',
                    }}
                    thumbColor={setting.enabled ? primaryColor : '#9ca3af'}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Notification Detail Modal */}
      <Modal
        visible={showDetailModal && selectedNotification !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.detailModalOverlay}>
          <View style={styles.detailModalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                {selectedNotification && (
                  <View
                    style={[
                      styles.notificationIcon,
                      { backgroundColor: selectedNotification.iconBg },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={selectedNotification.icon as any}
                      size={22}
                      color={selectedNotification.iconColor}
                    />
                  </View>
                )}
                <Text style={[styles.modalHeader, { color: textColor, margin: 0 }]}>
                  Details
                </Text>
              </View>
              <TouchableOpacity onPress={() => setShowDetailModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {selectedNotification && (
                <>
                  {/* Title and Message */}
                  <View style={styles.detailSection}>
                    <Text style={[styles.detailSectionTitle, { color: textSecondary }]}>
                      Notification
                    </Text>
                    <Text style={[{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: textColor }]}>
                      {selectedNotification.title}
                    </Text>
                    <Text style={[{ fontSize: 14, lineHeight: 20, color: textSecondary }]}>
                      {selectedNotification.message}
                    </Text>
                  </View>

                  {/* Details */}
                  <View style={styles.detailSection}>
                    <Text style={[styles.detailSectionTitle, { color: textSecondary }]}>
                      Information
                    </Text>

                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: textSecondary }]}>
                        Type:
                      </Text>
                      <Text style={[styles.detailValue, { color: textColor }]}>
                        {selectedNotification.type.charAt(0).toUpperCase() +
                          selectedNotification.type.slice(1)}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: textSecondary }]}>
                        Priority:
                      </Text>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 6,
                          backgroundColor:
                            selectedNotification.priority === 'high'
                              ? '#fee2e2'
                              : selectedNotification.priority === 'medium'
                                ? '#fed7aa'
                                : '#d1fae5',
                        }}
                      >
                        <Text
                          style={{
                            color:
                              selectedNotification.priority === 'high'
                                ? errorColor
                                : selectedNotification.priority === 'medium'
                                  ? warningColor
                                  : successColor,
                            fontWeight: '600',
                            fontSize: 12,
                          }}
                        >
                          {selectedNotification.priority.charAt(0).toUpperCase() +
                            selectedNotification.priority.slice(1)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: textSecondary }]}>
                        Time:
                      </Text>
                      <Text style={[styles.detailValue, { color: textColor }]}>
                        {selectedNotification.timestamp}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: textSecondary }]}>
                        Status:
                      </Text>
                      <Text style={[styles.detailValue, { color: textColor }]}>
                        {selectedNotification.read ? 'Read' : 'Unread'}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </ScrollView>

            {/* Actions */}
            {selectedNotification && (
              <View style={styles.detailActions}>
                <TouchableOpacity
                  style={[
                    styles.detailButton,
                    { backgroundColor: cardColor, borderWidth: 1, borderColor },
                  ]}
                  onPress={() => {
                    handleMarkAsRead(selectedNotification);
                    setShowDetailModal(false);
                  }}
                >
                  <MaterialCommunityIcons
                    name={selectedNotification.read ? 'email-outline' : 'email-open-outline'}
                    size={18}
                    color={textColor}
                  />
                  <Text style={[styles.detailButtonText, { color: textColor }]}>
                    {selectedNotification.read ? 'Mark Unread' : 'Mark Read'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.detailButton,
                    { backgroundColor: '#fee2e2' },
                  ]}
                  onPress={() => {
                    handleDelete(selectedNotification);
                    setShowDetailModal(false);
                  }}
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={18}
                    color={errorColor}
                  />
                  <Text style={[styles.detailButtonText, { color: errorColor }]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

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
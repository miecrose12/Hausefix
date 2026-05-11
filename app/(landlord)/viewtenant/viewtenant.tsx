import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

interface TenantData {
  name: string;
  unit: string;
  property: string;
  phone: string;
  email: string;
  emergency: string;
  monthlyRent: string;
  leaseStart: string;
  leaseEnd: string;
  securityDeposit: string;
  paymentStatus: string;
}

const TenantProfileScreen = () => {
  // Light mode only - bright, clean aesthetic - Only #1F2A44 color
  const colors = {
    bg: '#F8F9FC',
    card: '#FFFFFF',
    primary: '#1F2A44',
    text: '#1F2A44',
    textLight: '#6B7280',
    textMuted: '#A0ABA3',
    border: '#E5E7EB',
    borderLight: '#F5F5F5',
    accent: '#1F2A44',
    accentLight: '#E8EEF7',
    success: '#1F2A44',
    successLight: '#E8EEF7',
  };

  const tenantData: TenantData = {
    name: 'James Wilson',
    unit: 'Unit 402',
    property: 'Skyline Apartments',
    phone: '+1 (555) 012-3456',
    email: 'j.wilson@example.com',
    emergency: 'Sarah Wilson (Wife) • (555) 987-6543',
    monthlyRent: '₦500,000.00',
    leaseStart: 'Jan 1, 2024',
    leaseEnd: 'Dec 31, 2024',
    securityDeposit: '₦500,000.00 (Held)',
    paymentStatus: 'UP TO DATE',
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 16,
      backgroundColor: colors.bg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    headerButton: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.primary,
    },
    profileSection: {
      alignItems: 'center',
      paddingVertical: 24,
      paddingHorizontal: 16,
    },
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    avatarText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    name: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 4,
      letterSpacing: -0.5,
    },
    unitInfo: {
      fontSize: 14,
      color: colors.textLight,
      marginBottom: 24,
      fontWeight: '500',
    },
    actionButtonsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 24,
      width: '100%',
    },
    actionButton: {
      alignItems: 'center',
      gap: 8,
    },
    actionButtonIcon: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2,
    },
    actionButtonLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.text,
    },
    mainContent: {
      paddingHorizontal: 16,
      paddingBottom: 40,
      gap: 24,
    },
    sectionHeader: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 12,
      marginLeft: 4,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 2,
      borderWidth: 1,
      borderColor: colors.border,
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    listItemLast: {
      borderBottomWidth: 0,
    },
    listItemLabel: {
      fontSize: 13,
      color: colors.text,
      fontWeight: '500',
    },
    listItemSubLabel: {
      fontSize: 12,
      color: colors.textMuted,
      marginBottom: 4,
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    },
    listItemValue: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    listItemBold: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.accent,
    },
    statusBadge: {
      backgroundColor: colors.accentLight,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
    },
    statusBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    paymentHistoryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      marginLeft: 4,
    },
    viewAllButton: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.accent,
    },
    paymentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    paymentItemLast: {
      borderBottomWidth: 0,
    },
    paymentIcon: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: colors.accentLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    paymentDetails: {
      flex: 1,
    },
    paymentTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    paymentDate: {
      fontSize: 12,
      color: colors.textMuted,
      marginTop: 2,
      fontWeight: '500',
    },
    paymentAmount: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.headerButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Tenant Profile</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JW</Text>
          </View>
          <Text style={styles.name}>{tenantData.name}</Text>
          <Text style={styles.unitInfo}>
            {tenantData.unit} • {tenantData.property}
          </Text>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <MaterialIcons name="message" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionButtonLabel}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <MaterialIcons name="phone" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionButtonLabel}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonIcon}>
                <MaterialIcons name="email" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionButtonLabel}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainContent}>
          {/* Contact Details */}
          <View>
            <Text style={styles.sectionHeader}>Contact Details</Text>
            <View style={styles.card}>
              <View style={styles.listItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.listItemSubLabel}>Phone</Text>
                  <Text style={styles.listItemValue}>{tenantData.phone}</Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.listItemSubLabel}>Email</Text>
                  <Text style={styles.listItemValue}>{tenantData.email}</Text>
                </View>
              </View>

              <View style={[styles.listItem, styles.listItemLast]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.listItemSubLabel}>Emergency Contact</Text>
                  <Text style={styles.listItemValue}>{tenantData.emergency}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Lease Information */}
          <View>
            <Text style={styles.sectionHeader}>Lease Information</Text>
            <View style={styles.card}>
              <View style={styles.listItem}>
                <Text style={styles.listItemLabel}>Monthly Rent</Text>
                <Text style={styles.listItemBold}>{tenantData.monthlyRent}</Text>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.listItemLabel}>Lease Term</Text>
                <View>
                  <Text style={styles.listItemValue}>
                    {tenantData.leaseStart} - {tenantData.leaseEnd}
                  </Text>
                </View>
              </View>

              <View style={styles.listItem}>
                <Text style={styles.listItemLabel}>Security Deposit</Text>
                <Text style={styles.listItemValue}>{tenantData.securityDeposit}</Text>
              </View>

              <View style={[styles.listItem, styles.listItemLast]}>
                <Text style={styles.listItemLabel}>Payment Status</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{tenantData.paymentStatus}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Payment History */}
          <View>
            <View style={styles.paymentHistoryHeader}>
              <Text style={styles.sectionHeader}>Payment History</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllButton}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <View style={styles.paymentItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <View style={styles.paymentIcon}>
                    <MaterialIcons name="check-circle" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.paymentDetails}>
                    <Text style={styles.paymentTitle}>May 2024 Rent</Text>
                    <Text style={styles.paymentDate}>Paid on May 01</Text>
                  </View>
                </View>
                <Text style={styles.paymentAmount}>₦500,000.00</Text>
              </View>

              <View style={[styles.paymentItem, styles.paymentItemLast]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <View style={styles.paymentIcon}>
                    <MaterialIcons name="check-circle" size={20} color={colors.primary} />
                  </View>
                  <View style={styles.paymentDetails}>
                    <Text style={styles.paymentTitle}>April 2024 Rent</Text>
                    <Text style={styles.paymentDate}>Paid on April 02</Text>
                  </View>
                </View>
                <Text style={styles.paymentAmount}>₦500,000.00</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TenantProfileScreen;
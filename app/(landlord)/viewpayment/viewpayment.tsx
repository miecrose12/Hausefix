import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  unit: string;
  tenantName: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;
const isMedium = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 600;
const isTablet = SCREEN_WIDTH >= 600;

// Responsive scaling
const scale = (size: number) => {
  if (isTablet) return size * 1.3;
  if (isSmallScreen) return size * 0.85;
  return size;
};
const verticalScale = (size: number) => {
  if (isTablet) return size * 1.2;
  if (isSmallScreen) return size * 0.9;
  return size;
};

const ViewPaymentScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const colors = {
    bg: '#FFFFFF',
    card: '#FFFFFF',
    primary: '#1F2A44',
    text: '#1F2937',
    textLight: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#E5E7EB',
    paid: '#10B981',
    pending: '#F59E0B',
    overdue: '#EF4444',
    paidLight: '#ECFDF5',
    pendingLight: '#FFFBEB',
    overdueLight: '#FEF2F2',
    accentBlue: '#3B82F6',
  };

  const allTransactions: Transaction[] = [
    { id: '1', unit: 'Unit 402', tenantName: 'Sarah Johnson', amount: 2400, date: 'Sep 05, 2024', status: 'Paid' },
    { id: '2', unit: 'Unit 105', tenantName: 'Mark Richardson', amount: 1850, date: 'Sep 07, 2024', status: 'Pending' },
    { id: '3', unit: 'Unit 308', tenantName: 'Alex Patterson', amount: 2100, date: 'Due Sep 01, 2024', status: 'Overdue' },
    { id: '4', unit: 'Unit 201', tenantName: 'Elena Watson', amount: 3200, date: 'Sep 04, 2024', status: 'Paid' },
    { id: '5', unit: 'Unit 515', tenantName: 'James Mitchell', amount: 2750, date: 'Sep 06, 2024', status: 'Paid' },
    { id: '6', unit: 'Unit 112', tenantName: 'Lisa Anderson', amount: 1950, date: 'Sep 08, 2024', status: 'Pending' },
    { id: '7', unit: 'Unit 603', tenantName: 'David Brown', amount: 2300, date: 'Sep 03, 2024', status: 'Overdue' },
    { id: '8', unit: 'Unit 404', tenantName: 'Sophie Martin', amount: 2600, date: 'Sep 09, 2024', status: 'Paid' },
    { id: '9', unit: 'Unit 221', tenantName: 'Michael Davis', amount: 2150, date: 'Sep 10, 2024', status: 'Pending' },
    { id: '10', unit: 'Unit 507', tenantName: 'Emma Wilson', amount: 3100, date: 'Due Aug 28, 2024', status: 'Overdue' },
  ];

  const getStatusConfig = (status: string): { color: string; bg: string; icon: IconName; darkColor: string } => {
    const configs = {
      Paid: { color: colors.paid, bg: colors.paidLight, icon: 'check-circle' as const, darkColor: '#059669' },
      Pending: { color: colors.pending, bg: colors.pendingLight, icon: 'clock-outline' as const, darkColor: '#D97706' },
      Overdue: { color: colors.overdue, bg: colors.overdueLight, icon: 'alert-circle' as const, darkColor: '#DC2626' },
    };
    return configs[status as keyof typeof configs] || configs.Paid;
  };

  const getStats = () => {
    const filtered = getFilteredTransactions();
    const totalAmount = filtered.reduce((sum, tx) => sum + tx.amount, 0);
    return {
      total: filtered.length,
      amount: totalAmount,
      paid: filtered.filter(tx => tx.status === 'Paid').length,
      pending: filtered.filter(tx => tx.status === 'Pending').length,
      overdue: filtered.filter(tx => tx.status === 'Overdue').length,
    };
  };

  const getFilteredTransactions = () => {
    let filtered = allTransactions;
   
    if (activeFilter !== 'all') {
      filtered = filtered.filter(tx => tx.status.toLowerCase() === activeFilter);
    }
   
    if (searchQuery) {
      filtered = filtered.filter(tx =>
        tx.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.tenantName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
   
    return filtered;
  };

  const stats = getStats();
  const filteredTransactions = getFilteredTransactions();

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const config = getStatusConfig(item.status);
    return (
      <View style={styles.txCardWrapper}>
        <TouchableOpacity
          style={[styles.txCard]}
          activeOpacity={0.6}
        >
          {/* Left Content */}
          <View style={styles.txContentLeft}>
            {/* Status Icon */}
            <View style={[styles.txIconWrapper, { backgroundColor: config.bg }]}>
              <MaterialCommunityIcons
                name={config.icon}
                size={Math.round(scale(20))}
                color={config.color}
              />
            </View>
            {/* Tenant & Unit Info */}
            <View style={styles.txInfo}>
              <Text
                style={[styles.txTenant, { color: colors.primary }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.tenantName}
              </Text>
              <Text style={[styles.txUnit, { color: colors.textMuted }]}>
                {item.unit}
              </Text>
              <Text
                style={[styles.txDate, { color: colors.textMuted }]}
                numberOfLines={1}
              >
                {item.date}
              </Text>
            </View>
          </View>
          {/* Right Content */}
          <View style={styles.txContentRight}>
            <Text
              style={[styles.txAmount, { color: colors.primary }]}
              numberOfLines={1}
            >
              ₦{item.amount.toLocaleString()}
            </Text>
            <View style={[styles.txStatusBadge, { backgroundColor: config.bg }]}>
              <Text style={[styles.txStatusText, { color: config.color }]}>
                {item.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.backBtn}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={Math.round(scale(24))}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: colors.primary }]}>
              Payment Records
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>
              Manage all transactions
            </Text>
          </View>
          <View style={{ width: Math.round(scale(44)) }} />
        </View>
        {/* Key Metrics - Minimalist Design */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View style={styles.metricContent}>
              <Text style={styles.metricValue}>
                {stats.total}
              </Text>
              <Text style={styles.metricLabel}>Transactions</Text>
            </View>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.metricContent}>
              <Text style={styles.metricValue}>
                ₦{stats.amount.toLocaleString()}
              </Text>
              <Text style={styles.metricLabel}>Total Amount</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Search & Filters */}
      <View style={styles.filterSection}>
        {/* Search Bar */}
        <View style={[styles.searchBox, { borderColor: colors.border }]}>
          <MaterialCommunityIcons
            name="magnify"
            size={Math.round(scale(20))}
            color={colors.textMuted}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search unit or tenant..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons
                name="close-circle"
                size={Math.round(scale(18))}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* Filter Buttons - Icon and Text Only */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {[
            { key: 'all', label: 'All', icon: 'view-list', lightIcon: colors.textMuted },
            { key: 'paid', label: 'Paid', icon: 'check-circle', color: colors.paid, lightIcon: colors.paid },
            { key: 'pending', label: 'Pending', icon: 'clock-outline', color: colors.pending, lightIcon: colors.pending },
            { key: 'overdue', label: 'Overdue', icon: 'alert-circle', color: colors.overdue, lightIcon: colors.overdue },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterBtn,
                activeFilter === filter.key && styles.filterBtnActive
              ]}
              onPress={() => setActiveFilter(filter.key as any)}
            >
              <MaterialCommunityIcons
                name={filter.icon as any}
                size={Math.round(scale(16))}
                color={activeFilter === filter.key ? colors.primary : (filter.lightIcon || colors.textMuted)}
              />
              <Text
                style={[
                  styles.filterText,
                  {
                    color: activeFilter === filter.key ? colors.primary : colors.textMuted,
                    fontWeight: activeFilter === filter.key ? '700' : '500',
                  }
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={[styles.emptyIconWrapper, { backgroundColor: colors.border }]}>
              <MaterialCommunityIcons
                name="receipt-text-outline"
                size={Math.round(scale(48))}
                color={colors.textMuted}
              />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.textLight }]}>
              No transactions found
            </Text>
            <Text style={[styles.emptySubtitle, { color: colors.textMuted }]}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  // Header
  headerSection: {
    paddingHorizontal: isTablet ? 32 : isSmallScreen ? 14 : 18,
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    justifyContent: 'space-between'
  },
  backBtn: {
    width: Math.round(scale(44)),
    height: Math.round(scale(44)),
    borderRadius: scale(12) as any,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: Math.round(scale(28)),
    fontWeight: '800',
    marginBottom: 2
  },
  headerSubtitle: {
    fontSize: Math.round(scale(13)),
    fontWeight: '500'
  },
  // Metrics - Minimal styling with full border
  metricsContainer: {
    flexDirection: 'row',
    gap: isTablet ? 20 : isSmallScreen ? 12 : 16,
    marginBottom: verticalScale(4),
  },
  metricCard: {
    flex: 1,
    borderRadius: Math.round(scale(12)),
    paddingVertical: Math.round(scale(14)),
    paddingHorizontal: Math.round(scale(12)),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  metricContent: {
    flex: 1,
    marginRight: 8,
  },
  metricValue: {
    fontSize: Math.round(scale(20)),
    fontWeight: '800',
    color: '#1F2A44',
    marginBottom: 4
  },
  metricLabel: {
    fontSize: Math.round(scale(11)),
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.3
  },
  // Filters
  filterSection: {
    paddingHorizontal: isTablet ? 32 : isSmallScreen ? 14 : 18,
    marginBottom: verticalScale(14),
    backgroundColor: '#FFFFFF',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Math.round(scale(10)),
    paddingHorizontal: Math.round(scale(12)),
    paddingVertical: Math.round(scale(11)),
    marginBottom: verticalScale(12),
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: Math.round(scale(14)),
    fontWeight: '500'
  },
  filterScroll: {
    marginHorizontal: isTablet ? -32 : isSmallScreen ? -14 : -18
  },
  filterContent: {
    paddingHorizontal: isTablet ? 32 : isSmallScreen ? 14 : 18,
    gap: isTablet ? 16 : isSmallScreen ? 10 : 12,
    paddingBottom: 4,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Math.round(scale(10)),
    paddingVertical: Math.round(scale(8)),
    borderRadius: Math.round(scale(8)),
    gap: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Added border for all filter buttons (using colors.border)
    backgroundColor: '#FFFFFF',
  },
  filterBtnActive: {
    borderWidth: 2,
    borderColor: '#1F2A44', // Thicker border for active state using primary color
    backgroundColor: '#F9FAFB', // Slight background tint for active to make it stand out
  },
  filterText: {
    fontSize: Math.round(scale(12)),
    fontWeight: '600'
  },
  // List
  listContent: {
    paddingHorizontal: isTablet ? 32 : isSmallScreen ? 14 : 18,
    paddingBottom: verticalScale(40),
    gap: isSmallScreen ? 8 : 10,
  },
  // Transaction Card - Minimal Design with full border
  txCardWrapper: {
    marginBottom: 0
  },
  txCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Math.round(scale(12)),
    paddingHorizontal: Math.round(scale(12)),
    borderRadius: Math.round(scale(10)),
    backgroundColor: '#FFFFFF',
    borderWidth: 1, // Added full border for cards
    borderColor: '#E5E7EB', // Using colors.border for consistency
  },
  txContentLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Math.round(scale(12)),
    marginRight: 8,
  },
  txIconWrapper: {
    width: Math.round(scale(44)),
    height: Math.round(scale(44)),
    borderRadius: Math.round(scale(10)),
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  txInfo: {
    flex: 1,
    minWidth: 0
  },
  txTenant: {
    fontSize: Math.round(scale(13)),
    fontWeight: '700',
    marginBottom: 2
  },
  txUnit: {
    fontSize: Math.round(scale(11)),
    fontWeight: '500',
    marginBottom: 2
  },
  txDate: {
    fontSize: Math.round(scale(10)),
    fontWeight: '400'
  },
  txContentRight: {
    alignItems: 'flex-end',
    gap: 6,
    minWidth: Math.round(scale(80)),
    flexShrink: 0,
  },
  txAmount: {
    fontSize: Math.round(scale(14)),
    fontWeight: '800'
  },
  txStatusBadge: {
    paddingHorizontal: Math.round(scale(8)),
    paddingVertical: Math.round(scale(4)),
    borderRadius: 16
  },
  txStatusText: {
    fontSize: Math.round(scale(9)),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.2
  },
  // Empty State
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(100),
  },
  emptyIconWrapper: {
    width: Math.round(scale(80)),
    height: Math.round(scale(80)),
    borderRadius: Math.round(scale(40)),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  emptyTitle: {
    fontSize: Math.round(scale(16)),
    fontWeight: '700',
    marginBottom: verticalScale(6),
  },
  emptySubtitle: {
    fontSize: Math.round(scale(13)),
    fontWeight: '500'
  },
});

export default ViewPaymentScreen;
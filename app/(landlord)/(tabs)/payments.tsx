import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Transaction {
  id: string;
  unit: string;
  tenantName: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  tenantInitials: string;
}

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface CardItem {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: IconName;
  color: string;
  progress?: number;
}

const { width } = Dimensions.get('window');
const isSmall = width < 375;
const isMedium = width < 768;

// Color palette - single source of truth
const COLORS = {
  bg: '#FAFBFC',
  card: '#FFFFFF',
  primary: '#1F2A44',
  secondary: '#EC4899',
  accent: '#8B5CF6',
  text: '#1F2937',
  textLight: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  paid: '#10B981',
  pending: '#F59E0B',
  overdue: '#EF4444',
  lightGreen: '#F0FDF4',
  primaryLight: '#E8E5F0',
} as const;

// Status configurations
const STATUS_CONFIG = {
  Paid: { color: COLORS.paid, bg: COLORS.lightGreen, icon: 'check-circle' as const },
  Pending: { color: COLORS.pending, bg: '#FFFBEB', icon: 'clock-outline' as const },
  Overdue: { color: COLORS.overdue, bg: '#FEF2F2', icon: 'alert-circle' as const },
} as const;

// Mock data
const CARD_ITEMS: CardItem[] = [
  {
    id: '1',
    title: 'Total Expected',
    value: '₦42,500',
    subtitle: 'This Month',
    icon: 'wallet',
    color: COLORS.primary,
  },
  {
    id: '2',
    title: 'Collected',
    value: '₦38,200',
    subtitle: '90% Complete',
    icon: 'chart-line',
    color: COLORS.paid,
    progress: 90,
  },
  {
    id: '3',
    title: 'Outstanding',
    value: '₦4,300',
    subtitle: '8 Units Pending',
    icon: 'alert-circle',
    color: COLORS.overdue,
  },
];

const TRANSACTIONS: Transaction[] = [
  { id: '1', unit: 'Unit 402', tenantName: 'Sarah Johnson', amount: 2400, date: 'Sep 05, 2024', status: 'Paid', tenantInitials: 'SJ' },
  { id: '2', unit: 'Unit 105', tenantName: 'Mark Richardson', amount: 1850, date: 'Sep 07, 2024', status: 'Pending', tenantInitials: 'MR' },
  { id: '3', unit: 'Unit 308', tenantName: 'Alex Patterson', amount: 2100, date: 'Due Sep 01, 2024', status: 'Overdue', tenantInitials: 'AP' },
  { id: '4', unit: 'Unit 201', tenantName: 'Elena Watson', amount: 3200, date: 'Sep 04, 2024', status: 'Paid', tenantInitials: 'EW' },
  { id: '5', unit: 'Unit 515', tenantName: 'James Mitchell', amount: 2750, date: 'Sep 06, 2024', status: 'Paid', tenantInitials: 'JM' },
  { id: '6', unit: 'Unit 112', tenantName: 'Lisa Anderson', amount: 1950, date: 'Sep 08, 2024', status: 'Pending', tenantInitials: 'LA' },
];

const TABS = ['overview', 'paid', 'pending', 'overdue'] as const;

// Utility functions
const isDarkCard = (id: string) => id === '1' || id === '2';
const getStatusConfig = (status: string) => STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.Paid;
const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

// Helper function to calculate responsive font size for card values
const getCardValueFontSize = (value: string) => {
  const length = value.length;
  if (length <= 8) return isMedium ? 16 : 18;
  if (length <= 10) return isMedium ? 14 : 16;
  if (length <= 12) return isMedium ? 12 : 14;
  return isMedium ? 11 : 12;
};

// Reusable icon component
const RenderIcon = ({ name, size, color }: { name: IconName; size: number; color: string }) => (
  <MaterialCommunityIcons name={name} size={size} color={color} />
);

// Detail box component
const DetailBox = ({ label, value, icon }: { label: string; value: string; icon: IconName }) => (
  <View style={[styles.detailBox, { backgroundColor: COLORS.primaryLight }]}>
    <View style={[styles.detailIconWrapper, { backgroundColor: COLORS.card }]}>
      <RenderIcon name={icon} size={14} color={COLORS.primary} />
    </View>
    <Text style={[styles.detailLabel, { color: COLORS.textMuted }]}>{label}</Text>
    <Text style={[styles.detailValue, { color: COLORS.primary }]}>{value}</Text>
  </View>
);

interface StatsCardProps {
  item: CardItem;
}

const StatsCard: React.FC<StatsCardProps> = ({ item }) => {
  const isDark = isDarkCard(item.id);
  const valueFontSize = getCardValueFontSize(item.value);
  
  return (
    <View style={[styles.statsCard, isDark && styles.statsCardDark]}>
      <View style={styles.statsTop}>
        <View style={styles.statsInfo}>
          <Text style={[styles.statsLabel, isDark && styles.statsLabelLight]}>
            {item.title}
          </Text>
          <Text 
            style={[
              styles.statsValue, 
              { 
                color: isDark ? '#FFFFFF' : item.color,
                fontSize: valueFontSize 
              }
            ]}
            adjustsFontSizeToFit
            numberOfLines={1}
            minimumFontScale={0.7}
          >
            {item.value}
          </Text>
        </View>
      </View>

      {item.progress ? (
        <View style={styles.progressWrapper}>
          <View style={[styles.progressTrack, isDark && { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
            <View style={[styles.progressBar, { width: `${item.progress}%`, backgroundColor: item.color }]} />
          </View>
          <Text style={[styles.progressLabel, { color: isDark ? '#FFFFFF' : item.color }]}>
            {item.progress}% Collected
          </Text>
        </View>
      ) : (
        <Text style={[styles.statsSubtitle, isDark && styles.statsSubtitleLight]}>
          {item.subtitle}
        </Text>
      )}
    </View>
  );
};

interface TransactionCardProps {
  transaction: Transaction;
  onPress: (tx: Transaction) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, onPress }) => {
  const config = getStatusConfig(transaction.status);
  return (
    <TouchableOpacity
      style={[styles.txCard, transaction.status === 'Overdue' && styles.txCardOverdue]}
      activeOpacity={0.65}
      onPress={() => onPress(transaction)}
    >
      <View style={styles.txLeft}>
        <View style={[styles.txIcon, { backgroundColor: config.bg }]}>
          <RenderIcon name={config.icon} size={16} color={config.color} />
        </View>
        <View style={styles.txMeta}>
          <Text style={styles.txUnit} numberOfLines={1}>
            {transaction.unit} • {transaction.tenantName}
          </Text>
          <Text style={styles.txDate}>{transaction.date}</Text>
        </View>
      </View>

      <View style={styles.txRight}>
        <Text style={styles.txAmount}>{formatCurrency(transaction.amount)}</Text>
        <View style={[styles.txBadge, { backgroundColor: config.bg }]}>
          <Text style={[styles.txBadgeText, { color: config.color }]}>
            {transaction.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Modal content component
interface ModalContentProps {
  transaction: Transaction;
  scrollRef?: React.RefObject<ScrollView | null>;
}

const ModalContent: React.FC<ModalContentProps> = ({ transaction, scrollRef }) => {
  const config = getStatusConfig(transaction.status);
  return (
    <ScrollView
      ref={scrollRef}
      style={styles.modalBody}
      scrollEventThrottle={16}
      contentContainerStyle={styles.modalScrollContent}
      showsVerticalScrollIndicator={true}
    >
      {/* Header Card */}
      <View style={[styles.txDetailCard, { backgroundColor: config.bg }]}>
        <View style={[styles.largeIcon, { backgroundColor: `${config.color}20` }]}>
          <RenderIcon name={config.icon} size={30} color={config.color} />
        </View>
        <Text style={[styles.modalAmount, { color: COLORS.primary }]}>
          {formatCurrency(transaction.amount)}
        </Text>
        <Text style={[styles.modalStatus, { color: config.color }]}>
          {transaction.status}
        </Text>
      </View>

      {/* Details Grid */}
      <View style={styles.detailsGrid}>
        <DetailBox label="Unit" value={transaction.unit} icon="home-outline" />
        <DetailBox label="Tenant" value={transaction.tenantName} icon="account-outline" />
        <DetailBox label="Date" value={transaction.date} icon="calendar-outline" />
        <DetailBox label="Amount" value={formatCurrency(transaction.amount)} icon="currency-usd" />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.primary }]}>
          <RenderIcon name="download" size={16} color="#FFF" />
          <Text style={styles.btnText}>Download Receipt</Text>
        </TouchableOpacity>

        {transaction.status === 'Overdue' && (
          <TouchableOpacity style={[styles.btn, { backgroundColor: COLORS.overdue }]}>
            <RenderIcon name="send" size={16} color="#FFF" />
            <Text style={styles.btnText}>Send Reminder</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.btnOutline, { borderColor: COLORS.border }]}>
          <Text style={[styles.btnOutlineText, { color: COLORS.primary }]}>Close</Text>
        </TouchableOpacity>
      </View>

      {/* Spacer to ensure scrolling to bottom works */}
      <View style={{ height: 12 }} />
    </ScrollView>
  );
};

// Main screen component
const PaymentsScreen: React.FC = () => {
  const router = useRouter();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('overview');
  const scrollViewRef = useRef<ScrollView>(null);
  const modalScrollRef = useRef<ScrollView | null>(null);

  const handleModalOpen = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    // Reset scroll position when modal opens
    setTimeout(() => {
      modalScrollRef.current?.scrollTo({ y: 0, animated: false });
    }, 100);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.bg }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: COLORS.primary }]}>Payments</Text>
          <TouchableOpacity style={[styles.notifBtn, { backgroundColor: COLORS.primaryLight }]} activeOpacity={0.7}>
            <RenderIcon name="bell-outline" size={20} color={COLORS.primary} />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards - Horizontal Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={styles.statsScroll}
          contentContainerStyle={styles.statsContent}
          nestedScrollEnabled={true}
          scrollEnabled={true}
        >
          {CARD_ITEMS.map((item) => (
            <View key={item.id} style={styles.statsWrapper}>
              <StatsCard item={item} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.mainContent}
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Tabs */}
        <View style={styles.tabContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && [styles.tabActive, { backgroundColor: COLORS.primary }],
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                  { color: activeTab === tab ? '#FFFFFF' : COLORS.primary },
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions */}
        <View style={styles.txSection}>
          <View style={styles.txHeader}>
            <Text style={[styles.txTitle, { color: COLORS.primary }]}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/(landlord)/viewpayment/viewpayment')}>
              <Text style={[styles.viewAll, { color: COLORS.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.txList}>
            {TRANSACTIONS.length > 0 ? (
              TRANSACTIONS.map((tx) => (
                <TransactionCard
                  key={tx.id}
                  transaction={tx}
                  onPress={handleModalOpen}
                />
              ))
            ) : (
              <View style={styles.empty}>
                <RenderIcon name="receipt-text-outline" size={56} color={COLORS.border} />
                <Text style={styles.emptyTitle}>No transactions</Text>
                <Text style={styles.emptySubtitle}>Transactions will appear here</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={selectedTransaction !== null}
        onRequestClose={() => setSelectedTransaction(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={[styles.modalHeader, { borderBottomColor: COLORS.primaryLight }]}>
              <TouchableOpacity onPress={() => setSelectedTransaction(null)}>
                <RenderIcon name="close" size={22} color={COLORS.textLight} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: COLORS.primary }]}>Transaction Details</Text>
              <View style={{ width: 26 }} />
            </View>

            {selectedTransaction && (
              <ModalContent transaction={selectedTransaction} scrollRef={modalScrollRef} />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Responsive spacing helpers
const spacing = (base: number) => isMedium ? base - 4 : base;
const fontSize = (base: number) => isSmall ? base - 2 : base;

const styles = StyleSheet.create({
  // Layout
  container: { flex: 1 },
  header: {
    paddingHorizontal: spacing(20),
    paddingVertical: 16,
    paddingTop: 12,
  },
  mainContent: { flex: 1, paddingHorizontal: spacing(20) },
  scrollViewContent: { paddingTop: 8, paddingBottom: 40 },

  // Header
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { fontSize: fontSize(32), fontWeight: '800' },
  notifBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  notifBadge: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.overdue },

  // Stats
  statsScroll: { marginHorizontal: -spacing(20) },
  statsContent: { paddingHorizontal: spacing(20), gap: 12, paddingBottom: 8 },
  statsWrapper: { width: isMedium ? 140 : 160, minWidth: isMedium ? 140 : 160 },
  statsCard: {
    height: isMedium ? 120 : 130,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: spacing(14),
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    justifyContent: 'space-between',
  },
  statsCardDark: { backgroundColor: COLORS.primary, shadowOpacity: 0.2 },
  statsTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  statsInfo: { flex: 1, paddingRight: 8 },
  statsLabel: { 
    fontSize: 10, 
    fontWeight: '700', 
    color: COLORS.textMuted, 
    textTransform: 'uppercase', 
    letterSpacing: 0.4, 
    marginBottom: 6 
  },
  statsLabelLight: { color: 'rgba(255,255,255,0.7)' },
  statsValue: { 
    fontWeight: '800',
    flexShrink: 1,
  },
  statsSubtitle: { fontSize: 11, fontWeight: '500', color: COLORS.textMuted, marginTop: 4 },
  statsSubtitleLight: { color: 'rgba(255,255,255,0.8)' },
  statsIconBox: { width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  progressWrapper: { marginTop: 8 },
  progressTrack: { height: 6, backgroundColor: COLORS.border, borderRadius: 3, overflow: 'hidden', marginBottom: 6 },
  progressBar: { height: '100%', borderRadius: 3 },
  progressLabel: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3 },

  // Tabs
  tabContainer: { flexDirection: 'row', gap: 8, marginBottom: 24, marginTop: 8, flexWrap: 'wrap' },
  tab: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border },
  tabActive: { borderColor: COLORS.primary },
  tabText: { fontSize: 12, fontWeight: '700' },
  tabTextActive: { color: '#FFFFFF' },

  // Transactions
  txSection: { marginBottom: 20 },
  txHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  txTitle: { fontSize: fontSize(18), fontWeight: '800' },
  viewAll: { fontSize: 12, fontWeight: '700' },
  txList: { gap: 10 },
  txCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  txCardOverdue: { borderLeftWidth: 4, borderLeftColor: COLORS.overdue },
  txLeft: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  txIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  txMeta: { flex: 1 },
  txUnit: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  txDate: { fontSize: 11, fontWeight: '500', color: COLORS.textLight },
  txRight: { alignItems: 'flex-end', marginLeft: 8 },
  txAmount: { fontSize: 14, fontWeight: '800', color: COLORS.text, marginBottom: 4 },
  txBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  txBadgeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.3 },

  // Empty state
  empty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textLight, marginTop: 12 },
  emptySubtitle: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '92%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing(20),
    paddingVertical: spacing(16),
    borderBottomWidth: 1,
  },
  modalTitle: { fontSize: fontSize(18), fontWeight: '800' },
  modalBody: { paddingHorizontal: spacing(16), paddingVertical: spacing(20) },
  modalScrollContent: { paddingBottom: 20 },

  // Transaction detail
  txDetailCard: { borderRadius: 20, padding: spacing(28), alignItems: 'center', marginBottom: spacing(24) },
  largeIcon: { width: spacing(64), height: spacing(64), borderRadius: spacing(32), justifyContent: 'center', alignItems: 'center', marginBottom: spacing(12) },
  modalAmount: { fontSize: fontSize(28), fontWeight: '800', marginBottom: spacing(8) },
  modalStatus: { fontSize: fontSize(14), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },

  // Details grid
  detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing(12), marginBottom: spacing(24) },
  detailBox: { flex: isMedium ? 1 : 0, width: isMedium ? '100%' : '48%', borderRadius: 14, padding: spacing(12), alignItems: 'center' },
  detailIconWrapper: { width: spacing(32), height: spacing(32), borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: spacing(6) },
  detailLabel: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: spacing(4) },
  detailValue: { fontSize: 13, fontWeight: '700', textAlign: 'center' },

  // Actions
  actions: { gap: spacing(12), paddingBottom: spacing(20) },
  btn: { flexDirection: 'row', paddingVertical: spacing(14), paddingHorizontal: spacing(16), borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: spacing(8) },
  btnText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  btnOutline: { paddingVertical: spacing(14), borderRadius: 12, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  btnOutlineText: { fontSize: 14, fontWeight: '700' },
});

export default PaymentsScreen;
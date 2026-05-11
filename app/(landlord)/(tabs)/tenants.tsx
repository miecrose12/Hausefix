import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  useWindowDimensions,
  SafeAreaView,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// --- RESPONSIVE UTILITY ---
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375; 

const normalize = (size: number) => {
  const newSize = size * scale;
  return Math.round(Platform.OS === 'ios' ? newSize : newSize - 2);
};

interface Tenant {
  id: number;
  name: string;
  unit: string;
  building: string;
  status: string;
  statusColor: string;
  statusBg: string;
  avatar: string;
  occupancy: number;
}

const TenantsScreen: React.FC = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpenFor, setMenuOpenFor] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedTenantForDelete, setSelectedTenantForDelete] = useState<Tenant | null>(null);
  
  const [tenants, setTenants] = useState<Tenant[]>([
    { id: 1, name: 'Robert Hawkins', unit: 'Unit 402', building: 'Sunset Heights', status: 'Paid', statusColor: '#059669', statusBg: '#D1FAE5', avatar: 'RH', occupancy: 95 },
    { id: 2, name: 'Sarah Jenkins', unit: 'Unit 108', building: 'Oakwood Villas', status: 'Overdue', statusColor: '#DC2626', statusBg: '#FEE2E2', avatar: 'SJ', occupancy: 75 },
    { id: 3, name: 'Michael Chen', unit: 'Unit 215', building: 'Downtown Lofts', status: 'Paid', statusColor: '#059669', statusBg: '#D1FAE5', avatar: 'MC', occupancy: 100 },
    { id: 4, name: 'Emma Thompson', unit: 'Unit 501', building: 'Sunset Heights', status: 'Pending', statusColor: '#D97706', statusBg: '#FEF3C7', avatar: 'ET', occupancy: 88 },
  ]);

  const colors = {
    bg: '#F8F9FC',
    card: '#FFFFFF',
    primary: '#1F2A44',
    buttonBg: '#1F2A44',
    text: '#1F2A44',
    textLight: '#6B7280',
    textMuted: '#A0ABA3',
    border: '#E5E7EB',
    error: '#EF4444',
    overlay: 'rgba(0,0,0,0.5)',
  };

  const isSmallScreen = width < 380;
  const dynamicPadding = normalize(isSmallScreen ? 12 : 16);
  const sidePadding = dynamicPadding * 1.5;

  // REUSABLE NAVIGATION FUNCTION
  const navigateToDetails = useCallback((tenant: Tenant) => {
    setMenuOpenFor(null);
    router.push({
      pathname: '/(landlord)/viewtenant/viewtenant',
      params: {
        id: tenant.id,
        name: tenant.name,
        unit: tenant.unit,
        building: tenant.building,
        avatar: tenant.avatar,
      },
    });
  }, [router]);

  const filteredTenants = useMemo(() => {
    return tenants.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.unit.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, tenants]);

  const TenantCard = ({ tenant }: { tenant: Tenant }) => (
    <View style={[styles.tenantCard, { backgroundColor: colors.card, alignSelf: 'center', width: width > 600 ? 550 : '100%' }]}>
      <View style={[styles.cardContent, { padding: dynamicPadding }]}>
        <View style={styles.avatarSection}>
          {/* Avatar is now clickable and routes to details */}
          <TouchableOpacity 
            style={[styles.avatar, { backgroundColor: colors.buttonBg }]}
            onPress={() => navigateToDetails(tenant)}
          >
            <Text style={styles.avatarText}>{tenant.avatar}</Text>
          </TouchableOpacity>

          <View style={styles.tenantInfo}>
            <View style={styles.tenantHeader}>
              <Text style={[styles.tenantName, { color: colors.text }]} numberOfLines={1}>{tenant.name}</Text>
              <TouchableOpacity 
                style={styles.menuButton}
                onPress={() => setMenuOpenFor(menuOpenFor === tenant.id ? null : tenant.id)}
              >
                <MaterialCommunityIcons name="dots-horizontal" size={normalize(20)} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
            <View style={styles.locationContainer}>
              <MaterialCommunityIcons name="map-marker" size={normalize(14)} color={colors.textMuted} />
              <Text style={[styles.locationText, { color: colors.textMuted }]}>{tenant.unit} • {tenant.building}</Text>
            </View>
          </View>
        </View>

        {menuOpenFor === tenant.id && (
          <View style={[styles.menuPopup, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateToDetails(tenant)}>
              <MaterialCommunityIcons name="eye" size={normalize(18)} color={colors.text} style={styles.menuIcon} />
              <Text style={[styles.menuText, { color: colors.text }]}>View Details</Text>
            </TouchableOpacity>
            <View style={[styles.menuDivider, { borderColor: colors.border }]} />
            <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuOpenFor(null); setSelectedTenantForDelete(tenant); setDeleteModal(true); }}>
              <MaterialCommunityIcons name="delete" size={normalize(18)} color={colors.error} style={styles.menuIcon} />
              <Text style={[styles.menuTextDelete, { color: colors.error }]}>Delete Tenant</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.divider, { borderColor: colors.border, marginVertical: dynamicPadding }]} />

        <View style={styles.detailsSection}>
          <View style={styles.detailGroup}>
            <Text style={[styles.detailLabel, { color: colors.textMuted }]}>Status</Text>
            <View style={[styles.statusBadge, { backgroundColor: tenant.statusBg }]}>
              <Text style={[styles.statusText, { color: tenant.statusColor }]}>{tenant.status}</Text>
            </View>
          </View>
          <View style={styles.detailGroup}>
            <Text style={[styles.detailLabel, { color: colors.textMuted }]}>Occupancy</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{tenant.occupancy}%</Text>
          </View>
          <View style={styles.detailGroup}>
            <Text style={[styles.detailLabel, { color: colors.textMuted }]}>Lease</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>Active</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => { setMenuOpenFor(null); Keyboard.dismiss(); }}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
        <View style={[styles.header, { paddingHorizontal: sidePadding }]}>
          <View style={styles.headerTitleContainer}>
            <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>Management</Text>
            <Text style={[styles.headerTitle, { color: colors.buttonBg, fontSize: normalize(26) }]}>Tenants</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.card, borderColor: colors.border }]}><MaterialCommunityIcons name="magnify" size={22} color={colors.textLight} /></TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.card, borderColor: colors.border }]}><MaterialCommunityIcons name="tune" size={22} color={colors.textLight} /></TouchableOpacity>
          </View>
        </View>

        <View style={[styles.searchContainer, { paddingHorizontal: sidePadding }]}>
          <View style={[styles.searchInputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <MaterialCommunityIcons name="magnify" size={20} color={colors.textLight} style={styles.searchIcon} />
            <TextInput 
              style={[styles.searchInput, { color: colors.text }]} 
              placeholder="Search tenants..." 
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <FlatList
          data={filteredTenants}
          renderItem={({ item }) => <TenantCard tenant={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={[styles.listContent, { paddingHorizontal: sidePadding, paddingBottom: 120 }]}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity style={[styles.fab, { backgroundColor: colors.buttonBg }]} activeOpacity={0.85}>
          <MaterialCommunityIcons name="plus" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 12, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitleContainer: { flex: 1 },
  headerSubtitle: { fontSize: normalize(10), fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 },
  headerTitle: { fontWeight: '800', letterSpacing: -0.5 },
  headerButtons: { flexDirection: 'row', gap: 12 },
  headerButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  searchContainer: { paddingBottom: 16 },
  searchInputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, paddingHorizontal: 12, height: 48 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: normalize(15), fontWeight: '500' },
  listContent: { paddingVertical: 8 },
  tenantCard: { borderRadius: 16, marginBottom: 16, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 10 },
  cardContent: { justifyContent: 'space-between' },
  avatarSection: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: normalize(48), height: normalize(48), borderRadius: normalize(24), justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { fontSize: normalize(14), fontWeight: '700', color: '#FFFFFF' },
  tenantInfo: { flex: 1 },
  tenantHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tenantName: { fontSize: normalize(16), fontWeight: '700', flex: 1 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  locationText: { fontSize: normalize(12), fontWeight: '500', flex: 1 },
  menuButton: { padding: 6 },
  menuPopup: { position: 'absolute', right: 0, top: 40, borderRadius: 12, borderWidth: 1, width: 160, zIndex: 1000, paddingVertical: 4, shadowColor: '#000', shadowOpacity: 0.1, elevation: 5 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 },
  menuIcon: { marginRight: 10 },
  menuText: { fontWeight: '500', fontSize: normalize(13) },
  menuTextDelete: { fontWeight: '600', fontSize: normalize(13) },
  menuDivider: { height: 1, borderTopWidth: 1, marginVertical: 4 },
  divider: { height: 1, borderTopWidth: 1 },
  detailsSection: { flexDirection: 'row', justifyContent: 'space-between' },
  detailGroup: { flex: 1, alignItems: 'flex-start' },
  detailLabel: { fontSize: normalize(9), fontWeight: '700', textTransform: 'uppercase', marginBottom: 6 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6 },
  statusText: { fontSize: normalize(11), fontWeight: '700' },
  detailValue: { fontSize: normalize(14), fontWeight: '700' },
  fab: { position: 'absolute', bottom: 30, right: 20, width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 8, shadowOpacity: 0.3 },
});

export default TenantsScreen;
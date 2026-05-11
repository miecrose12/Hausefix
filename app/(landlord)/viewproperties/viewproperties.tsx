import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Property {
  id: string;
  name: string;
  image: string;
  location: string;
  occupancy: number;
  units: number;
  vacant: number;
  status: string;
  statusColor: string;
}

interface Unit {
  id: string;
  number: string;
  status: 'occupied' | 'vacant';
  tenant?: string;
  rent: number;
}

const COLORS = {
  bg: '#F8F9FC',
  card: '#FFFFFF',
  primary: '#1F2A44',
  accent: '#B46A3C',
  text: '#1F2A44',
  textLight: '#6B7280',
  textMuted: '#A0ABA3',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  buttonBg: '#1F2A44',
} as const;

const ViewPropertiesPage: React.FC = () => {
  const router = useRouter();
  const { id: propertyId, property: propertyString } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'units' | 'analytics'>('overview');

  const property: Property | null = useMemo(() => {
    if (!propertyString || typeof propertyString !== 'string') return null;
    try {
      return JSON.parse(propertyString);
    } catch {
      return null;
    }
  }, [propertyString]);

  const units: Unit[] = useMemo(() => {
    if (!property) return [];
    return Array.from({ length: property.units }, (_, i) => ({
      id: `₦{property.id}-unit-₦{i + 1}`,
      number: `Unit ₦{i + 1}`,
      status: i >= property.units - property.vacant ? 'vacant' : 'occupied',
      tenant: i >= property.units - property.vacant ? undefined : `Tenant ₦{i + 1}`,
      rent: 1200 + Math.random() * 800,
    }));
  }, [property]);

  const stats = useMemo(
    () => [
      { label: 'Total Units', value: property?.units || 0, icon: 'home-multiple' },
      { label: 'Occupied', value: (property?.units || 0) - (property?.vacant || 0), icon: 'check-circle' },
      { label: 'Vacant', value: property?.vacant || 0, icon: 'circle-outline' },
      { label: 'Occupancy Rate', value: `${property?.occupancy || 0}%`, icon: 'percent' },
    ],
    [property]
  );

  if (!property) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: COLORS.bg }]}>
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle" size={48} color={COLORS.error} />
          <Text style={styles.errorText}>Property not found</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.buttonBg }]}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderStatCard = ({ item }: { item: (typeof stats)[0] }) => (
    <View style={[styles.statCard, { backgroundColor: COLORS.card }]}>
      <View style={[styles.statIconContainer, { backgroundColor: `₦{COLORS.accent}15` }]}>
        <MaterialCommunityIcons name={item.icon as any} size={20} color={COLORS.accent} />
      </View>
      <Text style={[styles.statLabel, { color: COLORS.textMuted }]}>{item.label}</Text>
      <Text style={[styles.statValue, { color: COLORS.text }]}>{item.value}</Text>
    </View>
  );

  const renderUnitCard = ({ item }: { item: Unit }) => (
    <View
      style={[
        styles.unitCard,
        {
          backgroundColor: COLORS.card,
          borderLeftColor: item.status === 'occupied' ? COLORS.success : COLORS.warning,
        },
      ]}
    >
      <View style={styles.unitHeader}>
        <Text style={[styles.unitNumber, { color: COLORS.text }]}>{item.number}</Text>
        <View
          style={[
            styles.unitStatus,
            {
              backgroundColor:
                item.status === 'occupied'
                  ? `₦{COLORS.success}20`
                  : `₦{COLORS.warning}20`,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={item.status === 'occupied' ? 'check-circle' : 'circle-outline'}
            size={14}
            color={item.status === 'occupied' ? COLORS.success : COLORS.warning}
          />
          <Text
            style={[
              styles.unitStatusText,
              {
                color: item.status === 'occupied' ? COLORS.success : COLORS.warning,
              },
            ]}
          >
            {item.status === 'occupied' ? 'Occupied' : 'Vacant'}
          </Text>
        </View>
      </View>
      {item.tenant && (
        <Text style={[styles.unitTenant, { color: COLORS.textLight }]}>{item.tenant}</Text>
      )}
      <Text style={[styles.unitRent, { color: COLORS.text }]}>
        ₦{item.rent.toFixed(0)}/month
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.bg }]}>
      {/* Header with Back Button */}
      <View style={[styles.header, { backgroundColor: COLORS.bg }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.text }]}>Property Details</Text>
        <TouchableOpacity style={styles.backButton}>
          <MaterialCommunityIcons name="share-variant" size={24} color={COLORS.textLight} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {/* Hero Image */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: property.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={[styles.occupancyBadgeLarge, { backgroundColor: COLORS.card }]}>
            <Text style={[styles.occupancyValueLarge, { color: COLORS.accent }]}>
              {property.occupancy}%
            </Text>
            <Text style={[styles.occupancyLabelLarge, { color: COLORS.textMuted }]}>
              Occupied
            </Text>
          </View>
        </View>

        {/* Property Info */}
        <View style={styles.infoSection}>
          <Text style={[styles.propertyNameLarge, { color: COLORS.text }]}>
            {property.name}
          </Text>
          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker" size={18} color={COLORS.accent} />
            <Text style={[styles.locationTextLarge, { color: COLORS.textLight }]}>
              {property.location}
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <FlatList
            data={stats}
            renderItem={renderStatCard}
            keyExtractor={(item) => item.label}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.statsGrid}
          />
        </View>

        {/* Tabs */}
        <View style={[styles.tabsContainer, { borderBottomColor: COLORS.border }]}>
          {(['overview', 'units', 'analytics'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tab,
                activeTab === tab && [
                  styles.activeTab,
                  { borderBottomColor: COLORS.accent },
                ],
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tab ? COLORS.accent : COLORS.textLight },
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <View style={styles.tabContent}>
            <View style={styles.infoCard}>
              <Text style={[styles.cardTitle, { color: COLORS.text }]}>Property Information</Text>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={[styles.infoLabel, { color: COLORS.textMuted }]}>Status</Text>
                  <Text style={[styles.infoValue, { color: property.statusColor }]}>
                    {property.status}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={[styles.infoLabel, { color: COLORS.textMuted }]}>Year Built</Text>
                  <Text style={[styles.infoValue, { color: COLORS.text }]}>2018</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={[styles.cardTitle, { color: COLORS.text }]}>Description</Text>
              <Text style={[styles.descriptionText, { color: COLORS.textLight }]}>
                {property.name} is a well-maintained residential property located in a prime area.
                The building features modern amenities, secure parking, and a professional
                management team dedicated to tenant satisfaction.
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={[styles.cardTitle, { color: COLORS.text }]}>Quick Actions</Text>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: COLORS.buttonBg }]}>
                <MaterialCommunityIcons name="pencil" size={18} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Edit Property</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: COLORS.accent }]}>
                <MaterialCommunityIcons name="phone" size={18} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Contact Manager</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'units' && (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
              Units ({property.units})
            </Text>
            <FlatList
              data={units}
              renderItem={renderUnitCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {activeTab === 'analytics' && (
          <View style={styles.tabContent}>
            <View style={styles.infoCard}>
              <Text style={[styles.cardTitle, { color: COLORS.text }]}>Revenue Analytics</Text>
              <View style={styles.analyticsItem}>
                <Text style={[styles.analyticsLabel, { color: COLORS.textMuted }]}>
                  Monthly Revenue
                </Text>
                <Text style={[styles.analyticsValue, { color: COLORS.success }]}>
                  ₦{(property.units * 1500).toLocaleString()}
                </Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={[styles.analyticsLabel, { color: COLORS.textMuted }]}>
                  Average Rent
                </Text>
                <Text style={[styles.analyticsValue, { color: COLORS.text }]}>₦1,500</Text>
              </View>
              <View style={styles.analyticsItem}>
                <Text style={[styles.analyticsLabel, { color: COLORS.textMuted }]}>
                  Lost Revenue (Vacancies)
                </Text>
                <Text style={[styles.analyticsValue, { color: COLORS.error }]}>
                  ₦{(property.vacant * 1500).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 40,
  },
  heroSection: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  occupancyBadgeLarge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 110,
    alignItems: 'center',
  },
  occupancyValueLarge: {
    fontSize: 24,
    fontWeight: '800',
  },
  occupancyLabelLarge: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  propertyNameLarge: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationTextLarge: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statsGrid: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 6,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabContent: {
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  unitCard: {
    backgroundColor: COLORS.card,
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  unitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  unitNumber: {
    fontSize: 16,
    fontWeight: '700',
  },
  unitStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 4,
  },
  unitStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  unitTenant: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  unitRent: {
    fontSize: 14,
    fontWeight: '700',
  },
  analyticsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  analyticsLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  analyticsValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginVertical: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ViewPropertiesPage;
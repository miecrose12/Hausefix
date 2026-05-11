import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type FilterType = 'all' | 'residential' | 'commercial';

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
  buttonBg: '#1F2A44',
} as const;

const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Oakwood Apartments',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: '123 Maple St, Springfield',
    occupancy: 92,
    units: 24,
    vacant: 2,
    status: '2 Vacant',
    statusColor: COLORS.text,
  },
  {
    id: '2',
    name: 'Pinecrest Suites',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: '456 Pine Ln, Riverside',
    occupancy: 100,
    units: 12,
    vacant: 0,
    status: 'Full',
    statusColor: COLORS.success,
  },
];

const PropertiesPage: React.FC = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
  
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(PROPERTIES);

  /**
   * Navigate to property details page
   * This function is called when:
   * 1. User clicks the property image
   * 2. User clicks "View Details" from the menu
   */
  const handleViewDetails = useCallback((property: Property) => {
    setMenuOpenFor(null);
    // Navigate to the property details page with the property data as params
    router.push({
      pathname: '/(landlord)/viewproperties/viewproperties',
      params: { id: property.id, property: JSON.stringify(property) },
    });
  }, [router]);

  /**
   * Handle search functionality
   * Filters properties based on name or location matching the search query
   * Updates filteredProperties state with matching results
   */
  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      // If search is empty, show all properties
      setFilteredProperties(PROPERTIES);
    } else {
      // Filter properties by name or location containing search query (case-insensitive)
      const filtered = PROPERTIES.filter((property) =>
        property.name.toLowerCase().includes(text.toLowerCase()) ||
        property.location.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProperties(filtered);
    }
  }, []);

  /**
   * Clear search and reset to showing all properties
   */
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setFilteredProperties(PROPERTIES);
    setIsSearchActive(false);
  }, []);

  /**
   * Filter Button Component
   * Reusable button for filtering properties by type
   */
  const FilterButton = useCallback(
    ({ label, value }: { label: string; value: FilterType }) => (
      <TouchableOpacity
        onPress={() => setActiveFilter(value)}
        style={[
          styles.filterButton,
          {
            backgroundColor: activeFilter === value ? COLORS.buttonBg : COLORS.card,
            borderColor: activeFilter === value ? COLORS.buttonBg : COLORS.border,
          },
        ]}
      >
        <Text
          style={[
            styles.filterButtonText,
            { color: activeFilter === value ? '#FFFFFF' : COLORS.text },
          ]}
        >
          {label}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={16}
          color={activeFilter === value ? '#FFFFFF' : COLORS.text}
        />
      </TouchableOpacity>
    ),
    [activeFilter]
  );

  /**
   * Property Card Component
   * Displays individual property information with image, details, and menu options
   * 
   * Key interaction points:
   * - Clicking the image navigates to property details
   * - Clicking menu button shows "View Details" option
   * - Menu option also navigates to property details
   */
  const PropertyCard = useCallback(
    ({ property }: { property: Property }) => (
      <View style={[styles.propertyCard, { backgroundColor: COLORS.card }]}>
        {/* Image Container with Occupancy Badge */}
        <View style={styles.imageContainer}>
          {/* 
            Clickable Image
            - Wrapped in TouchableOpacity to make it pressable
            - onPress triggers handleViewDetails to navigate to details page
            - Same navigation as menu's "View Details" option
          */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleViewDetails(property)}
            style={styles.imageWrapper}
          >
            <Image
              source={{ uri: property.image }}
              style={styles.propertyImage}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {/* Occupancy Badge - Shows percentage of occupied units */}
          <View style={[styles.occupancyBadge, { backgroundColor: 'rgba(255,255,255,0.95)' }]}>
            <Text style={styles.occupancyText}>{property.occupancy}% Occupied</Text>
          </View>
        </View>

        {/* Property Information Section */}
        <View style={styles.propertyContent}>
          {/* Header with Property Name and Menu Button */}
          <View style={styles.propertyHeader}>
            <Text style={[styles.propertyName, { color: COLORS.text }]}>{property.name}</Text>

            {/* Menu Button (Three dots) */}
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setMenuOpenFor(menuOpenFor === property.id ? null : property.id)}
            >
              <MaterialCommunityIcons name="dots-horizontal" size={22} color={COLORS.textLight} />
            </TouchableOpacity>

            {/* Dropdown Menu - Shows when menu button is pressed */}
            {menuOpenFor === property.id && (
              <View style={styles.menuPopup}>
                {/* View Details Menu Item - Same navigation as image click */}
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleViewDetails(property)}
                >
                  <MaterialCommunityIcons
                    name="eye"
                    size={18}
                    color={COLORS.text}
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuText}>View Details</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Location Information */}
          <View style={styles.locationContainer}>
            <MaterialCommunityIcons name="map-marker" size={16} color={COLORS.textLight} />
            <Text style={[styles.locationText, { color: COLORS.textLight }]}>
              {property.location}
            </Text>
          </View>

          {/* Divider Line */}
          <View style={[styles.divider, { borderColor: COLORS.border }]} />

          {/* Property Details - Units and Status */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailGroup}>
              <Text style={[styles.detailLabel, { color: COLORS.textMuted }]}>Units</Text>
              <Text style={[styles.detailValue, { color: COLORS.text }]}>{property.units} Units</Text>
            </View>
            <View style={styles.detailGroup}>
              <Text style={[styles.detailLabel, { color: COLORS.textMuted }]}>Status</Text>
              <Text style={[styles.detailValue, { color: property.statusColor }]}>
                {property.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    ),
    [menuOpenFor, handleViewDetails]
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS.bg }]}>
      {/* Header Section with Title and Buttons */}
      <View style={[styles.header, { backgroundColor: COLORS.bg }]}>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerSubtitle, { color: COLORS.textLight }]}>Portfolio</Text>
          <Text style={[styles.headerTitle, { color: COLORS.buttonBg }]}>Properties</Text>
        </View>
        <View style={styles.headerButtons}>
          {/* 
            Search Button
            - Opens search interface when pressed
            - Allows users to filter properties by name or location
          */}
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: COLORS.card, borderColor: COLORS.border }]}
            onPress={() => setIsSearchActive(true)}
          >
            <MaterialCommunityIcons name="magnify" size={22} color={COLORS.textLight} />
          </TouchableOpacity>

          {/* Filter Button - Currently non-functional, can be implemented for advanced filtering */}
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: COLORS.card, borderColor: COLORS.border }]}
          >
            <MaterialCommunityIcons name="tune" size={22} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 
        Search Modal
        - Appears as an overlay when search button is pressed
        - Contains search input field and search results
        - Can be dismissed by pressing back or clear button
      */}
      <Modal
        visible={isSearchActive}
        transparent={true}
        animationType="slide"
        onRequestClose={handleClearSearch}
      >
        <View style={[styles.searchModalContainer, { backgroundColor: COLORS.bg }]}>
          {/* Search Header */}
          <View style={[styles.searchHeader, { backgroundColor: COLORS.bg }]}>
            <View style={[styles.searchInputContainer, { backgroundColor: COLORS.card, borderColor: COLORS.border }]}>
              {/* Search Input Field */}
              <MaterialCommunityIcons name="magnify" size={20} color={COLORS.textLight} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search properties..."
                placeholderTextColor={COLORS.textMuted}
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus={true}
              />
              {/* Clear Button - Shows when search has text */}
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={handleClearSearch}>
                  <MaterialCommunityIcons name="close" size={20} color={COLORS.textLight} />
                </TouchableOpacity>
              )}
            </View>

            {/* Close Button - Dismisses search modal */}
            <TouchableOpacity
              style={styles.searchCloseButton}
              onPress={handleClearSearch}
            >
              <Text style={[styles.searchCloseText, { color: COLORS.buttonBg }]}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* Search Results */}
          <ScrollView
            style={styles.searchResultsContainer}
            contentContainerStyle={styles.searchResultsContent}
            showsVerticalScrollIndicator={false}
          >
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              /* No Results Found Message */
              <View style={styles.noResultsContainer}>
                <MaterialCommunityIcons
                  name="home-search-outline"
                  size={48}
                  color={COLORS.textMuted}
                  style={styles.noResultsIcon}
                />
                <Text style={[styles.noResultsText, { color: COLORS.textMuted }]}>
                  No properties found
                </Text>
                <Text style={[styles.noResultsSubtext, { color: COLORS.textLight }]}>
                  Try a different search term
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>

      {/* Main Content - Filter and Property List */}
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Horizontal Scrollable Filter Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          <FilterButton label="All Properties" value="all" />
          <FilterButton label="Residential" value="residential" />
          <FilterButton label="Commercial" value="commercial" />
        </ScrollView>

        {/* Property Cards List */}
        {PROPERTIES.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </ScrollView>

      {/* 
        Floating Action Button (FAB)
        - Positioned at bottom right
        - Can be used to add new property
        - You may want to add onPress handler to navigate to add property page
      */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: COLORS.buttonBg }]}
        activeOpacity={0.85}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  // Search Modal Styles
  searchModalContainer: {
    flex: 1,
    paddingTop: 20,
  },
  searchHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    height: 44,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  searchCloseButton: {
    padding: 8,
  },
  searchCloseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  searchResultsContainer: {
    flex: 1,
  },
  searchResultsContent: {
    paddingBottom: 140,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  noResultsIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 140,
  },
  filterContainer: {
    paddingVertical: 8,
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterButton: {
    flexDirection: 'row',
    height: 36,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
  propertyCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9,
  },
  // New wrapper for clickable image
  imageWrapper: {
    width: '100%',
    height: '100%',
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  occupancyBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  occupancyText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  propertyContent: {
    padding: 16,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    marginRight: 12,
  },
  menuButton: {
    padding: 4,
  },
  menuPopup: {
    position: 'absolute',
    top: 36,
    right: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 140,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  divider: {
    height: 1,
    borderTopWidth: 1,
    marginBottom: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  detailGroup: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default PropertiesPage;
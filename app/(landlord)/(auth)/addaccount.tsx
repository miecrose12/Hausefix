import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface PropertyTypeItem {
  label: string;
  value: string;
}

interface PropertyTypeGroup {
  category: string;
  icon: string;
  items: PropertyTypeItem[];
}

interface UnitOption {
  label: string;
  value: number;
}

type FocusedField = 'name' | 'address' | 'type' | 'units' | null;

const { width } = Dimensions.get('window');

// Responsive sizing
const getResponsiveSize = () => {
  if (width < 360) return 'small';
  if (width < 480) return 'medium';
  if (width < 768) return 'large';
  return 'xlarge';
};

const responsiveSize = getResponsiveSize();

interface Sizes {
  headerSize: number;
  subheaderSize: number;
  bodySize: number;
  labelSize: number;
  buttonHeight: number;
  buttonTextSize: number;
  paddingH: number;
  paddingV: number;
  inputHeight: number;
  gap: number;
}

const getSizes = (): Sizes => {
  const sizes: Record<string, Sizes> = {
    small: {
      headerSize: 24,
      subheaderSize: 11,
      bodySize: 12,
      labelSize: 11,
      buttonHeight: 48,
      buttonTextSize: 13,
      paddingH: 14,
      paddingV: 12,
      inputHeight: 48,
      gap: 12,
    },
    medium: {
      headerSize: 28,
      subheaderSize: 12,
      bodySize: 13,
      labelSize: 12,
      buttonHeight: 52,
      buttonTextSize: 14,
      paddingH: 16,
      paddingV: 14,
      inputHeight: 52,
      gap: 14,
    },
    large: {
      headerSize: 32,
      subheaderSize: 13,
      bodySize: 14,
      labelSize: 13,
      buttonHeight: 56,
      buttonTextSize: 15,
      paddingH: 18,
      paddingV: 16,
      inputHeight: 56,
      gap: 16,
    },
    xlarge: {
      headerSize: 36,
      subheaderSize: 14,
      bodySize: 15,
      labelSize: 14,
      buttonHeight: 60,
      buttonTextSize: 16,
      paddingH: 20,
      paddingV: 18,
      inputHeight: 60,
      gap: 18,
    },
  };
  return sizes[responsiveSize];
};

const sizes = getSizes();

const propertyTypeGroups: PropertyTypeGroup[] = [
  {
    category: 'Residential',
    icon: 'home',
    items: [
      { label: 'Detached House', value: 'detached_house' },
      { label: 'Semi-Detached House', value: 'semi_detached_house' },
      { label: 'Duplex', value: 'duplex' },
      { label: 'Bungalow', value: 'bungalow' },
      { label: 'Flat / Apartment', value: 'flat_apartment' },
      { label: 'Terrace / Townhouse', value: 'terrace_townhouse' },
      { label: 'Self-Contain', value: 'self_contain' },
      { label: 'Room (Face-me-I-Face-You)', value: 'room_fmify' },
    ],
  },
  {
    category: 'Commercial',
    icon: 'business',
    items: [
      { label: 'Shop', value: 'shop' },
      { label: 'Office Space', value: 'office_space' },
      { label: 'Plaza / Mall Unit', value: 'plaza_mall' },
      { label: 'Warehouse', value: 'warehouse' },
      { label: 'Hall / Event Center', value: 'hall_event' },
    ],
  },
  {
    category: 'Land',
    icon: 'landscape',
    items: [
      { label: 'Residential Land', value: 'residential_land' },
      { label: 'Commercial Land', value: 'commercial_land' },
    ],
  },
];

const unitOptions: UnitOption[] = Array.from({ length: 50 }, (_, i) => ({
  label: i + 1 === 1 ? '1 Unit' : i + 1 === 50 ? '50+ Units' : `${i + 1} Units`,
  value: i + 1,
}));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes.paddingH,
    paddingVertical: sizes.paddingV,
    justifyContent: 'space-between',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#121118',
    flex: 1,
    textAlign: 'center',
  },
  progressContainer: {
    paddingHorizontal: sizes.paddingH,
    paddingTop: sizes.paddingV,
    paddingBottom: sizes.gap,
  },
  progressLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressStep: {
    fontSize: sizes.labelSize,
    fontWeight: '700',
    color: '#1F2A44',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9ca3af',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#dcdbe6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1F2A44',
    borderRadius: 4,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: sizes.paddingH,
    paddingVertical: sizes.paddingV,
    paddingBottom: 200,
  },
  titleSection: {
    marginBottom: sizes.gap * 2,
  },
  mainTitle: {
    fontSize: sizes.headerSize,
    fontWeight: '800',
    color: '#121118',
    marginBottom: 8,
    lineHeight: sizes.headerSize * 1.2,
  },
  subtitle: {
    fontSize: sizes.bodySize,
    color: '#6b7280',
    lineHeight: sizes.bodySize * 1.5,
  },
  formSection: {
    gap: sizes.gap * 1.5,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: sizes.labelSize,
    fontWeight: '700',
    color: '#121118',
    marginLeft: 4,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: sizes.inputHeight,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#dcdbe6',
    borderRadius: 10,
    fontSize: sizes.bodySize,
    color: '#000',
    fontWeight: '500',
  },
  inputFocused: {
    borderColor: '#1F2A44',
    borderWidth: 2,
  },
  inputIcon: {
    position: 'absolute',
    right: 14,
    top: 0,
    height: sizes.inputHeight,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    gap: sizes.gap,
  },
  fieldFlex2: {
    flex: 2,
  },
  fieldFlex1: {
    flex: 1,
  },
  dropdownButton: {
    height: sizes.inputHeight,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#dcdbe6',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownButtonFocused: {
    borderColor: '#1F2A44',
    borderWidth: 2,
  },
  dropdownButtonDisabled: {
    backgroundColor: '#f3f4f6',
    opacity: 0.6,
  },
  dropdownText: {
    flex: 1,
    fontSize: sizes.bodySize,
    color: '#000',
    fontWeight: '500',
  },
  dropdownPlaceholder: {
    color: '#9ca3af',
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  helperContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  helperIcon: {
    marginTop: 2,
  },
  helperText: {
    fontSize: 11,
    color: '#9ca3af',
    lineHeight: 14,
    flex: 1,
    fontWeight: '500',
  },
  disabledFieldContainer: {
    opacity: 0.5,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingHorizontal: sizes.paddingH,
    maxHeight: '80%',
  },
  modalHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#121118',
    marginBottom: 16,
    textAlign: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalCloseButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySection: {
    paddingVertical: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2A44',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 6,
  },
  optionItemSelected: {
    backgroundColor: '#1F2A44',
  },
  optionText: {
    fontSize: sizes.bodySize,
    color: '#121118',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '700',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: sizes.paddingH,
    paddingVertical: sizes.paddingV,
    paddingBottom: 24,
    backgroundColor: '#f6f6f8',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: sizes.gap,
  },
  completeButton: {
    height: sizes.buttonHeight,
    backgroundColor: '#1F2A44',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#1F2A44',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  completeButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  addAnotherButton: {
    height: sizes.buttonHeight,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  addAnotherButtonPressed: {
    backgroundColor: '#f3f4f6',
  },
  buttonText: {
    fontSize: sizes.buttonTextSize,
    fontWeight: '700',
    color: '#fff',
  },
  addAnotherText: {
    fontSize: sizes.buttonTextSize,
    fontWeight: '700',
    color: '#1F2A44',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
});

export default function AddProperty() {
  const router = useRouter();
  const [propertyName, setPropertyName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propertyTypeLabel, setPropertyTypeLabel] = useState('');
  const [units, setUnits] = useState(1);
  const [unitsLabel, setUnitsLabel] = useState('1 Unit');
  const [focusedField, setFocusedField] = useState<FocusedField>(null);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showUnitsModal, setShowUnitsModal] = useState(false);
  const [completePressed, setCompletePressed] = useState(false);

  const isLandType =
    propertyType === 'residential_land' ||
    propertyType === 'commercial_land';

  const handlePropertyTypeSelect = (value: string, label: string) => {
    setPropertyType(value);
    setPropertyTypeLabel(label);
    setShowTypeModal(false);
    setFocusedField(null);
    // Reset units to 1 if land type selected
    if (value === 'residential_land' || value === 'commercial_land') {
      setUnits(1);
      setUnitsLabel('1 Unit');
    }
  };

  const handleUnitsSelect = (value: number, label: string) => {
    setUnits(value);
    setUnitsLabel(label);
    setShowUnitsModal(false);
    setFocusedField(null);
  };

  const handleCompleteRegistration = () => {
    // Validation
    if (!propertyName.trim()) {
      Alert.alert('Missing Property Name', 'Please enter a property name');
      return;
    }

    if (!propertyAddress.trim()) {
      Alert.alert('Missing Address', 'Please enter the property address');
      return;
    }

    if (!propertyType) {
      Alert.alert('Missing Type', 'Please select a property type');
      return;
    }

    if (!isLandType && (!units || units < 1)) {
      Alert.alert('Invalid Units', 'Please select number of units');
      return;
    }

    setCompletePressed(true);

    // Simulate registration completion
    setTimeout(() => {
      Alert.alert('Success', 'Registration completed successfully!');
      router.push('/(landlord)/(auth)/landlogin');
    }, 300);
  };

  const handleAddAnotherProperty = () => {
    // Reset form
    setPropertyName('');
    setPropertyAddress('');
    setPropertyType('');
    setPropertyTypeLabel('');
    setUnits(1);
    setUnitsLabel('1 Unit');
  };

  const CategoryItem = ({ category, index }: { category: PropertyTypeGroup; index: number }) => (
    <View key={category.category}>
      <View style={styles.categoryHeader}>
        <MaterialIcons
          name={category.icon as any}
          size={18}
          color="#1F2A44"
        />
        <Text style={styles.categoryTitle}>{category.category}</Text>
      </View>
      {category.items.map((item) => (
        <TouchableOpacity
          key={item.value}
          style={[
            styles.optionItem,
            propertyType === item.value && styles.optionItemSelected,
          ]}
          onPress={() => handlePropertyTypeSelect(item.value, item.label)}
        >
          <Text
            style={[
              styles.optionText,
              propertyType === item.value && styles.optionTextSelected,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
      {index < propertyTypeGroups.length - 1 && <View style={styles.divider} />}
    </View>
  );

  const UnitItem = ({ item }: { item: UnitOption }) => (
    <TouchableOpacity
      key={item.value}
      style={[
        styles.optionItem,
        units === item.value && styles.optionItemSelected,
      ]}
      onPress={() => handleUnitsSelect(item.value, item.label)}
    >
      <Text
        style={[
          styles.optionText,
          units === item.value && styles.optionTextSelected,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#121118" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Property</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressLabel}>
          <Text style={styles.progressStep}>Step 3 of 3</Text>
          <Text style={styles.progressText}>Almost done!</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Add Your First Property</Text>
          <Text style={styles.subtitle}>
            Tell us about the property you manage so we can help you track it effectively.
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Property Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Property Name</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === 'name' && styles.inputFocused,
              ]}
              placeholder="e.g., Sunset Apartments"
              placeholderTextColor="#9ca3af"
              value={propertyName}
              onChangeText={setPropertyName}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* Property Address */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Property Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  focusedField === 'address' && styles.inputFocused,
                ]}
                placeholder="Street, City, Zip Code"
                placeholderTextColor="#9ca3af"
                value={propertyAddress}
                onChangeText={setPropertyAddress}
                onFocus={() => setFocusedField('address')}
                onBlur={() => setFocusedField(null)}
              />
              <View style={styles.inputIcon}>
                <MaterialIcons
                  name="location-on"
                  size={20}
                  color="#1F2A44"
                />
              </View>
            </View>
          </View>

          {/* Property Type & Units Row */}
          <View style={styles.rowContainer}>
            {/* Property Type Dropdown */}
            <View style={[styles.fieldGroup, styles.fieldFlex2]}>
              <Text style={styles.label}>Property Type</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownButton,
                  focusedField === 'type' && styles.dropdownButtonFocused,
                ]}
                onPress={() => {
                  setFocusedField('type');
                  setShowTypeModal(true);
                }}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !propertyType && styles.dropdownPlaceholder,
                  ]}
                >
                  {propertyTypeLabel || 'Select Type'}
                </Text>
                <MaterialIcons
                  name="expand-more"
                  size={20}
                  color="#9ca3af"
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Number of Units Dropdown - Hidden for Land */}
            {!isLandType && (
              <View style={[styles.fieldGroup, styles.fieldFlex1]}>
                <Text style={styles.label}>Units</Text>
                <TouchableOpacity
                  style={[
                    styles.dropdownButton,
                    focusedField === 'units' && styles.dropdownButtonFocused,
                  ]}
                  onPress={() => {
                    setFocusedField('units');
                    setShowUnitsModal(true);
                  }}
                >
                  <Text style={styles.dropdownText}>{unitsLabel}</Text>
                  <MaterialIcons
                    name="expand-more"
                    size={20}
                    color="#9ca3af"
                    style={styles.dropdownIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Helper Text */}
          <View style={styles.helperContainer}>
            <View style={styles.helperIcon}>
              <MaterialIcons name="info" size={16} color="#1F2A44" />
            </View>
            <Text style={styles.helperText}>
              {isLandType
                ? 'Land properties do not require unit configuration.'
                : 'Each unit represents one rentable space with its own tenant and rent.'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            completePressed && styles.completeButtonPressed,
          ]}
          onPress={handleCompleteRegistration}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Complete Registration</Text>
          <MaterialIcons
            name="check-circle"
            size={sizes.buttonTextSize + 2}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addAnotherButton}
          onPress={handleAddAnotherProperty}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name="add"
            size={sizes.buttonTextSize + 2}
            color="#1F2A44"
          />
          <Text style={styles.addAnotherText}>Add Another Property</Text>
        </TouchableOpacity>
      </View>

      {/* Property Type Modal */}
      <Modal
        visible={showTypeModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowTypeModal(false);
          setFocusedField(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Property Type</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {propertyTypeGroups.map((group, index) => (
                <View key={group.category}>
                  <View style={styles.categoryHeader}>
                    <MaterialIcons
                      name={group.icon as any}
                      size={18}
                      color="#1F2A44"
                    />
                    <Text style={styles.categoryTitle}>{group.category}</Text>
                  </View>
                  {group.items.map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={[
                        styles.optionItem,
                        propertyType === item.value &&
                          styles.optionItemSelected,
                      ]}
                      onPress={() =>
                        handlePropertyTypeSelect(item.value, item.label)
                      }
                    >
                      <Text
                        style={[
                          styles.optionText,
                          propertyType === item.value &&
                            styles.optionTextSelected,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  {index < propertyTypeGroups.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Units Modal */}
      <Modal
        visible={showUnitsModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowUnitsModal(false);
          setFocusedField(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select Number of Units</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {unitOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.optionItem,
                    units === item.value && styles.optionItemSelected,
                  ]}
                  onPress={() => handleUnitsSelect(item.value, item.label)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      units === item.value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
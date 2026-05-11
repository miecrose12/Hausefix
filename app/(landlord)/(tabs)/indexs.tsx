import React, { useState, useMemo, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Modal,
  TextInput, Dimensions, Platform, KeyboardAvoidingView, Alert,
  PanResponder, GestureResponderEvent,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface WithdrawalState {
  amount: string;
  password: string;
  timestamp: string;
  reference: string;
}

interface WithdrawalModalState {
  amount: string;
  showPasswordVerification: boolean;
  showSuccess: boolean;
}

// ========== THEME ==========
const colors = {
  bg: '#F2F2F7',
  card: '#FFFFFF',
  primary: '#1F2A44',
  accent: '#B46A3C',
  textLight: '#6B7280',
  success: '#10B981',
  error: '#EF4444',
  blueBg: '#EFF6FF',
  border: '#E5E7EB',
} as const;

// ========== REUSABLE COMPONENTS ==========
interface FormInputProps {
  label: string;
  value: string;
  placeholder: string;
  icon: IconName;
  keyboardType?: 'default' | 'decimal-pad' | 'number-pad' | 'email-address' | 'phone-pad';
  onChangeText: (text: string) => void;
  multiline?: boolean;
  fontSizes: Record<string, number>;
}

const FormInput: React.FC<FormInputProps> = ({
  label, value, placeholder, icon, keyboardType = 'default',
  onChangeText, multiline = false, fontSizes,
}) => (
  <View style={styles.formGroup}>
    <Text style={[styles.formLabel, { color: colors.primary, fontSize: fontSizes.sm }]}>{label}</Text>
    <View style={[styles.inputWrapper, { borderColor: colors.border }]}>
      <MaterialCommunityIcons name={icon} size={20} color={colors.textLight} style={{ marginRight: 10 }} />
      <TextInput
        style={[styles.textInput, { color: colors.primary, fontSize: fontSizes.sm }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </View>
  </View>
);

interface QuickActionButtonProps {
  icon: IconName;
  label: string;
  onPress: () => void;
  isSmallScreen: boolean;
  fontSizes: Record<string, number>;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon, label, onPress, isSmallScreen, fontSizes,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.quickActionBtn} activeOpacity={0.7}>
    <View style={[styles.quickActionIcon, { backgroundColor: colors.card }]}>
      <MaterialCommunityIcons
        name={icon}
        size={isSmallScreen ? 28 : 32}
        color={colors.primary}
      />
    </View>
    <Text style={[styles.quickActionLabel, { color: colors.primary, fontSize: fontSizes.xs }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// ========== PASSWORD VERIFICATION MODAL ==========
interface PasswordVerificationProps {
  visible: boolean;
  amount: string;
  onConfirm: (password: string) => void;
  onCancel: () => void;
  fontSizes: Record<string, number>;
  spacing: Record<string, number>;
}

const PasswordVerificationModal: React.FC<PasswordVerificationProps> = ({
  visible, amount, onConfirm, onCancel, fontSizes, spacing,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (!password) {
      setError('Please enter your PIN');
      return;
    }
    // ✅ DEFAULT PIN: 1234
    if (password === '1234') {
      onConfirm(password);
      setPassword('');
      setError('');
    } else {
      setError('Wrong Password');
    }
  };

  const handleCancel = () => {
    setPassword('');
    setError('');
    onCancel();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleCancel}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={handleCancel} activeOpacity={1} />
        <View style={[styles.modalContent, { backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.lg }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.primary, fontSize: fontSizes.lg }]}>Confirm Withdrawal</Text>
            <TouchableOpacity onPress={handleCancel}>
              <MaterialCommunityIcons name="close" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
            <View style={[styles.amountDisplayBox, { backgroundColor: colors.blueBg, padding: spacing.md, borderRadius: 16 }]}>
              <Text style={[styles.amountDisplayLabel, { color: colors.textLight, fontSize: fontSizes.sm }]}>Amount to Withdraw</Text>
              <Text style={[styles.amountDisplayValue, { color: colors.primary, fontSize: fontSizes.xl, marginTop: spacing.sm }]}>
                ₦{parseFloat(amount).toLocaleString()}
              </Text>
            </View>

            <View style={[styles.securityMessageBox, { backgroundColor: '#F0FDF4', paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: 12 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                <MaterialCommunityIcons name="shield-check" size={18} color={colors.success} />
                <Text style={[styles.securityMessageText, { color: colors.success, fontSize: fontSizes.xs, flex: 1 }]}>
                  Enter your PIN to confirm this withdrawal
                </Text>
              </View>
            </View>

            <View>
              <Text style={[styles.formLabel, { color: colors.primary, fontSize: fontSizes.sm }]}>PIN *</Text>
              <View style={[styles.inputWrapper, { borderColor: error ? colors.error : colors.border, borderWidth: error ? 1.5 : 1 }]}>
                <MaterialCommunityIcons name="lock-outline" size={20} color={colors.textLight} style={{ marginRight: 10 }} />
                <TextInput
                  style={[styles.textInput, { color: colors.primary, fontSize: fontSizes.sm }]}
                  placeholder="Enter PIN"
                  placeholderTextColor={colors.textLight}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError('');
                  }}
                  secureTextEntry={!showPassword}
                  keyboardType="number-pad"
                  maxLength={4}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialCommunityIcons name={showPassword ? 'eye' : 'eye-off'} size={20} color={colors.textLight} />
                </TouchableOpacity>
              </View>
              {error && (
                <Text style={[styles.errorText, { color: colors.error, fontSize: fontSizes.xs, marginTop: 6 }]}>
                  {error}
                </Text>
              )}
            </View>

            <TouchableOpacity style={styles.forgotPasswordLink}>
              <Text style={[styles.forgotPasswordText, { color: colors.accent, fontSize: fontSizes.sm }]}>
                Forgot PIN?
              </Text>
            </TouchableOpacity>

            <View style={[styles.modalButtonGroup, { gap: spacing.sm, marginTop: spacing.md }]}>
              <TouchableOpacity style={[styles.modalButtonSecondary, { borderColor: colors.border }]} onPress={handleCancel}>
                <Text style={[styles.modalButtonText, { color: colors.primary }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButtonPrimary, { backgroundColor: colors.accent }]} onPress={handleConfirm}>
                <MaterialCommunityIcons name="check" size={18} color="#FFFFFF" />
                <Text style={[styles.modalButtonText, { color: '#FFFFFF', marginLeft: 6 }]}>Verify & Withdraw</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// ========== SUCCESS MODAL ==========
interface SuccessModalProps {
  visible: boolean;
  withdrawalDetails: WithdrawalState;
  onClose: () => void;
  fontSizes: Record<string, number>;
  spacing: Record<string, number>;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible, withdrawalDetails, onClose, fontSizes, spacing,
}) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt: GestureResponderEvent, gestureState) => {
        if (gestureState.dy > 50) onClose();
      },
    })
  ).current;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={onClose} activeOpacity={0.7} />
        <View style={[styles.modalContent, { backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.lg }]}>
          <TouchableOpacity style={styles.successCloseArea} onPress={onClose} activeOpacity={0.5} {...panResponder.panHandlers}>
            <View style={styles.dragHandle} />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingVertical: spacing.lg }}>
            <View style={styles.successContainer}>
              <View style={[styles.successIconContainer, { backgroundColor: colors.success + '15' }]}>
                <View style={[styles.successIconInner, { backgroundColor: colors.success }]}>
                  <MaterialCommunityIcons name="check-circle" size={60} color="#FFFFFF" />
                </View>
              </View>

              <Text style={[styles.successTitle, { color: colors.primary, fontSize: fontSizes.lg, marginTop: spacing.lg }]}>
                Withdrawal Successful!
              </Text>
              <Text style={[styles.successMessage, { color: colors.textLight, fontSize: fontSizes.sm, marginTop: spacing.sm }]}>
                Your withdrawal has been processed
              </Text>

              <View style={[styles.amountBox, { backgroundColor: colors.blueBg, marginTop: spacing.lg, padding: spacing.md, borderRadius: 16 }]}>
                <Text style={[styles.amountLabel, { color: colors.textLight, fontSize: fontSizes.sm }]}>Amount Withdrawn</Text>
                <Text style={[styles.amountValue, { color: colors.primary, fontSize: fontSizes.xxl, marginTop: spacing.xs }]}>
                  ₦{withdrawalDetails.amount}
                </Text>
              </View>

              <View style={[styles.detailsContainer, { marginTop: spacing.lg, gap: spacing.md }]}>
                {[
                  { icon: 'identifier', label: 'Reference ID', value: withdrawalDetails.reference, color: colors.accent },
                  { icon: 'clock-outline', label: 'Date & Time', value: withdrawalDetails.timestamp, color: colors.success },
                  { icon: 'bank-outline', label: 'Account', value: '****1234', color: colors.primary },
                ].map((item) => (
                  <View
                    key={item.label}
                    style={[
                      styles.detailItem,
                      {
                        backgroundColor: '#F9FAFB',
                        padding: spacing.md,
                        borderRadius: 12,
                        borderLeftWidth: 4,
                        borderLeftColor: item.color,
                      },
                    ]}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <MaterialCommunityIcons name={item.icon as IconName} size={20} color={item.color} />
                        <Text style={[styles.detailLabel, { color: colors.textLight, fontSize: fontSizes.xs }]}>
                          {item.label}
                        </Text>
                      </View>
                      <Text style={[styles.detailValue, { color: colors.primary, fontSize: fontSizes.sm, fontWeight: '600' }]}>
                        {item.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={[styles.noticeBox, { backgroundColor: '#FFFBEB', marginTop: spacing.lg, padding: spacing.md, borderRadius: 12, flexDirection: 'row', gap: spacing.sm }]}>
                <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#F59E0B" />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.noticeTitle, { color: colors.primary, fontSize: fontSizes.xs, fontWeight: '600' }]}>
                    Processing Time
                  </Text>
                  <Text style={[styles.noticeText, { color: colors.textLight, fontSize: fontSizes.xs, marginTop: 4 }]}>
                    3minutes - 1 hour depending on your bank
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={[styles.successButton, { backgroundColor: colors.success, marginTop: spacing.lg }]} onPress={onClose}>
              <MaterialCommunityIcons name="home" size={20} color="#FFFFFF" />
              <Text style={[styles.successButtonText, { color: '#FFFFFF', marginLeft: 8 }]}>Back to Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.printButton, { borderColor: colors.accent, marginTop: spacing.sm }]}
              onPress={() => Alert.alert('Receipt', `Reference: ${withdrawalDetails.reference}\nAmount: ₦${withdrawalDetails.amount}\nDate: ${withdrawalDetails.timestamp}`)}
            >
              <MaterialCommunityIcons name="printer" size={20} color={colors.accent} />
              <Text style={[styles.printButtonText, { color: colors.accent, marginLeft: 8 }]}>Print Receipt</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ========== MAIN DASHBOARD ==========
const LandlordDashboard: React.FC = () => {
  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 380;

  // STATE
  const [chartMonths, setChartMonths] = useState(12);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  const [withdrawalModal, setWithdrawalModal] = useState<WithdrawalModalState>({
    amount: '',
    showPasswordVerification: false,
    showSuccess: false,
  });

  const [withdrawalDetails, setWithdrawalDetails] = useState<WithdrawalState>({
    amount: '',
    password: '',
    timestamp: '',
    reference: '',
  });

  const [propertyForm, setPropertyForm] = useState({ name: '', address: '', units: '' });
  const [tenantForm, setTenantForm] = useState({ name: '', propertyId: '', unit: '', rentAmount: '' });

  // RESPONSIVE
  const spacing = useMemo(() => ({
    xs: isSmallScreen ? 4 : 8,
    sm: isSmallScreen ? 12 : 16,
    md: isSmallScreen ? 16 : 20,
    lg: isSmallScreen ? 20 : 24,
    xl: isSmallScreen ? 24 : 32,
  }), [isSmallScreen]);

  const fontSizes = useMemo(() => ({
    xs: isSmallScreen ? 10 : 11,
    sm: isSmallScreen ? 12 : 13,
    base: isSmallScreen ? 14 : 15,
    lg: isSmallScreen ? 16 : 18,
    xl: isSmallScreen ? 20 : 24,
    xxl: isSmallScreen ? 28 : 32,
  }), [isSmallScreen]);

  // HANDLERS
  const handleInitiateWithdraw = () => {
    setWithdrawalModal({ amount: '', showPasswordVerification: false, showSuccess: false });
    setShowWithdrawalModal(true);
  };

  const handleWithdrawAmountSubmit = () => {
    const amount = parseFloat(withdrawalModal.amount);
    if (!withdrawalModal.amount || amount <= 0 || amount > 42850) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount (max: ₦42,850)');
      return;
    }
    setWithdrawalModal((prev) => ({ ...prev, showPasswordVerification: true }));
  };

  const handlePasswordVerification = (password: string) => {
    const reference = 'TRF' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const timestamp = new Date().toLocaleString();
    setWithdrawalDetails({
      amount: parseFloat(withdrawalModal.amount).toLocaleString(),
      password,
      timestamp,
      reference,
    });
    setWithdrawalModal((prev) => ({ ...prev, showPasswordVerification: false, showSuccess: true }));
  };

  const handleCloseSuccess = () => {
    setWithdrawalModal({ amount: '', showPasswordVerification: false, showSuccess: false });
    setShowWithdrawalModal(false);
  };

  const handleAddProperty = () => {
    if (!propertyForm.name || !propertyForm.address || !propertyForm.units) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', `Property "${propertyForm.name}" added successfully`);
    setPropertyForm({ name: '', address: '', units: '' });
    setShowAddPropertyModal(false);
  };

  const handleAddTenant = () => {
    if (!tenantForm.name || !tenantForm.propertyId || !tenantForm.unit || !tenantForm.rentAmount) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', `Tenant "${tenantForm.name}" added successfully`);
    setTenantForm({ name: '', propertyId: '', unit: '', rentAmount: '' });
    setShowAddTenantModal(false);
  };

  // DATA
  const collectionTrend = useMemo(() => {
    const data = [
      { month: 'JAN', amount: 3200000 },
      { month: 'FEB', amount: 3800000 },
      { month: 'MAR', amount: 3500000 },
      { month: 'APR', amount: 4200000 },
      { month: 'MAY', amount: 4800000 },
      { month: 'JUN', amount: 5200000 },
      { month: 'JUL', amount: 5100000 },
      { month: 'AUG', amount: 5400000 },
      { month: 'SEP', amount: 5300000 },
      { month: 'OCT', amount: 5600000 },
      { month: 'NOV', amount: 5800000 },
      { month: 'DEC', amount: 6000000 },
    ];
    return data.slice(-chartMonths);
  }, [chartMonths]);

  const maxAmount = useMemo(() => Math.max(...collectionTrend.map((item) => item.amount)), [collectionTrend]);

  // RENDER
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* MODALS */}
      <Modal
        visible={showWithdrawalModal && !withdrawalModal.showPasswordVerification && !withdrawalModal.showSuccess}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWithdrawalModal(false)}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} onPress={() => setShowWithdrawalModal(false)} activeOpacity={0.5} />
          <View style={[styles.modalContent, { backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.lg }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.primary, fontSize: fontSizes.lg }]}>Withdraw Funds</Text>
              <TouchableOpacity onPress={() => setShowWithdrawalModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
              <View style={[styles.infoBox, { backgroundColor: colors.blueBg }]}>
                <MaterialCommunityIcons name="information" size={16} color={colors.primary} />
                <Text style={[styles.infoText, { color: colors.primary, fontSize: fontSizes.sm }]}>
                  Your available balance is ₦42,850.00
                </Text>
              </View>

              <FormInput
                label="Amount *"
                value={withdrawalModal.amount}
                placeholder="0.00"
                icon="cash"
                keyboardType="decimal-pad"
                onChangeText={(text) => setWithdrawalModal((prev) => ({ ...prev, amount: text }))}
                fontSizes={fontSizes}
              />

              <View style={[styles.summaryBox, { backgroundColor: colors.blueBg, padding: spacing.md, borderRadius: 12 }]}>
                <View style={[styles.summaryRow, { paddingBottom: spacing.sm }]}>
                  <Text style={[styles.summaryLabel, { color: colors.textLight, fontSize: fontSizes.sm }]}>Amount</Text>
                  <Text style={[styles.summaryValue, { color: colors.primary, fontSize: fontSizes.lg }]}>
                    {withdrawalModal.amount ? `₦${parseFloat(withdrawalModal.amount).toLocaleString()}` : '₦0'}
                  </Text>
                </View>
                <View style={[styles.divider, { backgroundColor: colors.border, height: 1, marginVertical: spacing.sm }]} />
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: colors.textLight, fontSize: fontSizes.sm }]}>Account</Text>
                  <Text style={[styles.summaryValue, { color: colors.primary, fontSize: fontSizes.sm }]}>****1234</Text>
                </View>
              </View>

              <View style={[styles.modalButtonGroup, { gap: spacing.sm }]}>
                <TouchableOpacity style={[styles.modalButtonSecondary, { borderColor: colors.border }]} onPress={() => setShowWithdrawalModal(false)}>
                  <Text style={[styles.modalButtonText, { color: colors.primary }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButtonPrimary, { backgroundColor: colors.accent }]} onPress={handleWithdrawAmountSubmit}>
                  <MaterialCommunityIcons name="arrow-right" size={18} color="#FFFFFF" />
                  <Text style={[styles.modalButtonText, { color: '#FFFFFF', marginLeft: 6 }]}>Continue</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <PasswordVerificationModal
        visible={withdrawalModal.showPasswordVerification}
        amount={withdrawalModal.amount}
        onConfirm={handlePasswordVerification}
        onCancel={() => setWithdrawalModal((prev) => ({ ...prev, showPasswordVerification: false }))}
        fontSizes={fontSizes}
        spacing={spacing}
      />

      <SuccessModal
        visible={withdrawalModal.showSuccess}
        withdrawalDetails={withdrawalDetails}
        onClose={handleCloseSuccess}
        fontSizes={fontSizes}
        spacing={spacing}
      />

      {/* Add Property Modal */}
      <Modal visible={showAddPropertyModal} transparent animationType="slide" onRequestClose={() => setShowAddPropertyModal(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} onPress={() => setShowAddPropertyModal(false)} activeOpacity={1} />
          <View style={[styles.modalContent, { backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.lg }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.primary, fontSize: fontSizes.lg }]}>Add Property</Text>
              <TouchableOpacity onPress={() => setShowAddPropertyModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
              <FormInput label="Property Name *" value={propertyForm.name} placeholder="Enter name" icon="home-outline" onChangeText={(text) => setPropertyForm({ ...propertyForm, name: text })} fontSizes={fontSizes} />
              <FormInput label="Address *" value={propertyForm.address} placeholder="Enter address" icon="map-marker-outline" onChangeText={(text) => setPropertyForm({ ...propertyForm, address: text })} multiline fontSizes={fontSizes} />
              <FormInput label="Number of Units *" value={propertyForm.units} placeholder="e.g., 5" icon="layers-triple" keyboardType="number-pad" onChangeText={(text) => setPropertyForm({ ...propertyForm, units: text })} fontSizes={fontSizes} />

              <View style={[styles.modalButtonGroup, { gap: spacing.sm, marginTop: spacing.md }]}>
                <TouchableOpacity style={[styles.modalButtonSecondary, { borderColor: colors.border }]} onPress={() => setShowAddPropertyModal(false)}>
                  <Text style={[styles.modalButtonText, { color: colors.primary }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButtonPrimary, { backgroundColor: colors.accent }]} onPress={handleAddProperty}>
                  <MaterialCommunityIcons name="plus" size={18} color="#FFFFFF" />
                  <Text style={[styles.modalButtonText, { color: '#FFFFFF', marginLeft: 6 }]}>Add</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Add Tenant Modal */}
      <Modal visible={showAddTenantModal} transparent animationType="slide" onRequestClose={() => setShowAddTenantModal(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBackdrop} onPress={() => setShowAddTenantModal(false)} activeOpacity={1} />
          <View style={[styles.modalContent, { backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.lg }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.primary, fontSize: fontSizes.lg }]}>Add Tenant</Text>
              <TouchableOpacity onPress={() => setShowAddTenantModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
              <FormInput label="Tenant Name *" value={tenantForm.name} placeholder="Enter name" icon="account-outline" onChangeText={(text) => setTenantForm({ ...tenantForm, name: text })} fontSizes={fontSizes} />
              <FormInput label="Property *" value={tenantForm.propertyId} placeholder="Select property" icon="home-outline" onChangeText={(text) => setTenantForm({ ...tenantForm, propertyId: text })} fontSizes={fontSizes} />
              <FormInput label="Unit Number *" value={tenantForm.unit} placeholder="e.g., 101" icon="door" onChangeText={(text) => setTenantForm({ ...tenantForm, unit: text })} fontSizes={fontSizes} />
              <FormInput label="Monthly Rent *" value={tenantForm.rentAmount} placeholder="0.00" icon="cash" keyboardType="decimal-pad" onChangeText={(text) => setTenantForm({ ...tenantForm, rentAmount: text })} fontSizes={fontSizes} />

              <View style={[styles.modalButtonGroup, { gap: spacing.sm, marginTop: spacing.md }]}>
                <TouchableOpacity style={[styles.modalButtonSecondary, { borderColor: colors.border }]} onPress={() => setShowAddTenantModal(false)}>
                  <Text style={[styles.modalButtonText, { color: colors.primary }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButtonPrimary, { backgroundColor: colors.accent }]} onPress={handleAddTenant}>
                  <MaterialCommunityIcons name="plus" size={18} color="#FFFFFF" />
                  <Text style={[styles.modalButtonText, { color: '#FFFFFF', marginLeft: 6 }]}>Add</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* MAIN CONTENT */}
      <View style={[styles.header, { paddingHorizontal: spacing.md, paddingTop: spacing.lg }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }}
              style={[styles.avatar, { width: isSmallScreen ? 40 : 48, height: isSmallScreen ? 40 : 48, borderRadius: isSmallScreen ? 20 : 24 }]}
            />
            <View>
              <Text style={[styles.headerSubtitle, { color: colors.textLight, fontSize: fontSizes.xs }]}>Welcome back</Text>
              <Text style={[styles.headerTitle, { color: colors.primary, fontSize: fontSizes.lg }]}>Hi, James 👋</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.notificationBtn, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons name="bell" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Balance Card */}
        <View style={[styles.balanceSection, { paddingHorizontal: spacing.md, marginBottom: spacing.lg }]}>
          <View style={[styles.balanceCard, { backgroundColor: colors.primary, padding: spacing.lg }]}>
            <Text style={[styles.balanceLabel, { color: 'rgba(255,255,255,0.8)', fontSize: fontSizes.sm }]}>Total Balance</Text>
            <View style={[styles.balanceContent, { marginTop: spacing.md }]}>
              <Text style={[styles.balanceAmount, { color: '#FFFFFF', fontSize: fontSizes.xl }]}>₦42,850.00</Text>
              <TouchableOpacity style={[styles.withdrawBtn, { backgroundColor: colors.accent, paddingHorizontal: spacing.md }]} onPress={handleInitiateWithdraw}>
                <Text style={[styles.withdrawBtnText, { color: '#FFFFFF', fontSize: fontSizes.sm }]}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={[styles.statsGrid, { paddingHorizontal: spacing.md, gap: 12, marginBottom: spacing.lg }]}>
          {[
            { icon: 'calendar-month', label: 'Rent Due', value: '₦3,200', bgColor: '#ECFDF5', iconColor: colors.success },
            { icon: 'account-remove', label: 'Overdue', value: '3', bgColor: '#FEF2F2', iconColor: colors.error },
          ].map((stat) => (
            <View key={stat.label} style={[styles.statCard, { backgroundColor: colors.card, padding: spacing.sm }]}>
              <View style={[styles.statIconBox, { backgroundColor: stat.bgColor }]}>
                <MaterialCommunityIcons name={stat.icon as IconName} size={20} color={stat.iconColor} />
              </View>
              <Text style={[styles.statLabel, { color: colors.textLight, fontSize: fontSizes.xs }]}>{stat.label}</Text>
              <Text style={[styles.statValue, { color: colors.primary, fontSize: fontSizes.base }]}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={[styles.quickActionsSection, { paddingHorizontal: spacing.md, marginBottom: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textLight, fontSize: fontSizes.xs }]}>Quick Actions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <QuickActionButton icon="home-plus" label="Add Property" onPress={() => setShowAddPropertyModal(true)} isSmallScreen={isSmallScreen} fontSizes={fontSizes} />
            <QuickActionButton icon="account-plus" label="Add Tenant" onPress={() => setShowAddTenantModal(true)} isSmallScreen={isSmallScreen} fontSizes={fontSizes} />
            <QuickActionButton icon="cash-plus" label="Record Rent" onPress={() => {}} isSmallScreen={isSmallScreen} fontSizes={fontSizes} />
          </ScrollView>
        </View>

        {/* Financial Overview */}
        <View style={[styles.financialSection, { paddingHorizontal: spacing.md, marginBottom: spacing.lg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textLight, fontSize: fontSizes.xs }]}>Financial Overview</Text>
          <View style={[styles.financialCard, { backgroundColor: colors.card, padding: spacing.md }]}>
            <View style={styles.financialCardLeft}>
              <Text style={[styles.financialCardTitle, { color: colors.textLight, fontSize: fontSizes.sm }]}>Expected Yearly Rent</Text>
              <Text style={[styles.financialCardAmount, { color: colors.primary, fontSize: fontSizes.lg }]}>₦5,200,000</Text>
              <View style={styles.financialCardGrowth}>
                <MaterialCommunityIcons name="trending-up" size={14} color={colors.success} />
                <Text style={[styles.growthText, { color: colors.success, fontSize: fontSizes.xs }]}>4.2% from last month</Text>
              </View>
            </View>
            <View style={[styles.financialCardIcon, { backgroundColor: colors.blueBg }]}>
              <MaterialCommunityIcons name="chart-box" size={32} color={colors.primary} />
            </View>
          </View>
        </View>

        {/* Collection Trend */}
        <View style={[styles.trendSection, { paddingHorizontal: spacing.md, paddingBottom: spacing.xl }]}>
          <View style={[styles.trendCard, { backgroundColor: colors.card, padding: spacing.md }]}>
            <View style={styles.trendHeader}>
              <Text style={[styles.trendTitle, { color: colors.primary, fontSize: fontSizes.base }]}>Collection Trend</Text>
              <TouchableOpacity onPress={() => setShowMonthDropdown(!showMonthDropdown)} style={[styles.dropdownButton, { backgroundColor: colors.bg }]}>
                <Text style={[styles.dropdownButtonText, { color: colors.primary, fontSize: fontSizes.xs }]}>{chartMonths} Months</Text>
                <MaterialCommunityIcons name={showMonthDropdown ? 'chevron-up' : 'chevron-down'} size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {showMonthDropdown && (
              <>
                <TouchableOpacity style={styles.dropdownOverlay} onPress={() => setShowMonthDropdown(false)} activeOpacity={1} />
                <View style={[styles.dropdownMenu, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  {[6, 12].map((months) => (
                    <TouchableOpacity
                      key={months}
                      onPress={() => {
                        setChartMonths(months);
                        setShowMonthDropdown(false);
                      }}
                      style={[styles.dropdownItem, { backgroundColor: chartMonths === months ? colors.bg : 'transparent' }]}
                    >
                      <Text style={[styles.dropdownItemText, { color: chartMonths === months ? colors.accent : colors.primary, fontWeight: chartMonths === months ? '700' : '500' }]}>
                        Last {months} Months
                      </Text>
                      {chartMonths === months && <MaterialCommunityIcons name="check" size={18} color={colors.accent} />}
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            <View style={{ marginBottom: spacing.md, marginTop: spacing.md }}>
              <View style={[styles.barsContainer, { height: isSmallScreen ? 100 : 140 }]}>
                {collectionTrend.map((item, idx) => (
                  <View key={idx} style={styles.barWrapper}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: (item.amount / maxAmount) * (isSmallScreen ? 100 : 120),
                          backgroundColor: colors.accent,
                          opacity: 0.4 + (idx / collectionTrend.length) * 0.6,
                        },
                      ]}
                    />
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.monthLabels}>
              {collectionTrend.map((item, idx) => (
                <Text key={idx} style={[styles.monthLabel, { color: colors.textLight, fontSize: fontSizes.xs }]}>
                  {item.month}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// ========== STYLES ==========
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  header: { paddingBottom: 16 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { borderRadius: 24, borderWidth: 2, borderColor: '#FFFFFF' },
  headerSubtitle: { fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  headerTitle: { fontWeight: '700', marginTop: 4 },
  notificationBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  balanceSection: { marginTop: 8 },
  balanceCard: { borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  balanceLabel: { fontWeight: '500' },
  balanceContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  balanceAmount: { fontWeight: '700' },
  withdrawBtn: { paddingVertical: 10, borderRadius: 20 },
  withdrawBtnText: { fontWeight: '700' },
  statsGrid: { flexDirection: 'row' },
  statCard: { flex: 1, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  statIconBox: { borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 12, width: 32, height: 32 },
  statLabel: { fontWeight: '500', marginBottom: 6 },
  statValue: { fontWeight: '700' },
  quickActionsSection: { marginBottom: 24 },
  sectionTitle: { fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 16 },
  quickActionBtn: { alignItems: 'center', marginRight: 24, minWidth: 100 },
  quickActionIcon: { borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4, width: 56, height: 56 },
  quickActionLabel: { fontWeight: '700', textAlign: 'center', marginTop: 4, lineHeight: 16 },
  financialSection: { marginBottom: 24 },
  financialCard: { borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  financialCardLeft: { flex: 1 },
  financialCardTitle: { fontWeight: '500', marginBottom: 8 },
  financialCardAmount: { fontWeight: '700', marginBottom: 6 },
  financialCardIcon: { borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginLeft: 12, width: 70, height: 70 },
  financialCardGrowth: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  growthText: { fontWeight: '600' },
  trendSection: { marginBottom: 24 },
  trendCard: { borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  trendHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  trendTitle: { fontWeight: '700' },
  dropdownButton: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, alignItems: 'center', gap: 6 },
  dropdownButtonText: { fontWeight: '600' },
  dropdownOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 },
  dropdownMenu: { borderRadius: 8, borderWidth: 1, marginBottom: 16, overflow: 'hidden', zIndex: 20 },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  dropdownItemText: { fontSize: 14 },
  barsContainer: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', gap: 6 },
  barWrapper: { flex: 1, alignItems: 'center' },
  bar: { width: '100%', borderTopLeftRadius: 6, borderTopRightRadius: 6, minHeight: 20 },
  monthLabels: { flexDirection: 'row', justifyContent: 'space-around' },
  monthLabel: { fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalBackdrop: { flex: 1 },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%', paddingBottom: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontWeight: '700' },
  formGroup: { marginBottom: 4 },
  formLabel: { fontWeight: '700', marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: '#F9FAFB' },
  textInput: { flex: 1, fontWeight: '500' },
  modalButtonGroup: { flexDirection: 'row' },
  modalButtonPrimary: { flex: 1, paddingVertical: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  modalButtonSecondary: { flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  modalButtonText: { fontWeight: '700', fontSize: 14 },
  infoBox: { flexDirection: 'row', padding: 12, borderRadius: 12, alignItems: 'center', gap: 10 },
  infoText: { flex: 1, fontWeight: '500' },
  summaryBox: { borderRadius: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontWeight: '600' },
  summaryValue: { fontWeight: '700' },
  divider: { width: '100%' },
  amountDisplayBox: { width: '100%', alignItems: 'center', justifyContent: 'center' },
  amountDisplayLabel: { fontWeight: '600' },
  amountDisplayValue: { fontWeight: '700' },
  securityMessageBox: {},
  securityMessageText: { fontWeight: '500' },
  errorText: { fontWeight: '500' },
  forgotPasswordLink: { alignItems: 'center', paddingVertical: 4 },
  forgotPasswordText: { fontWeight: '600' },
  successCloseArea: { height: 30, width: '100%', marginBottom: 16, alignItems: 'center', justifyContent: 'center' },
  dragHandle: { width: 40, height: 4, backgroundColor: '#D1D5DB', borderRadius: 2 },
  successContainer: { alignItems: 'center', paddingHorizontal: 12 },
  successIconContainer: { width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center' },
  successIconInner: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  successTitle: { fontWeight: '700', textAlign: 'center' },
  successMessage: { fontWeight: '500', textAlign: 'center' },
  amountBox: { width: '100%', alignItems: 'center', justifyContent: 'center' },
  amountLabel: { fontWeight: '600' },
  amountValue: { fontWeight: '700' },
  detailsContainer: { width: '100%' },
  detailItem: { width: '100%' },
  detailLabel: { fontWeight: '600' },
  detailValue: { color: '#1F2A44' },
  noticeBox: { width: '100%' },
  noticeTitle: { fontWeight: '600' },
  noticeText: { fontWeight: '500' },
  successButton: { paddingVertical: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' },
  successButtonText: { fontWeight: '700', fontSize: 14 },
  printButton: { paddingVertical: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', borderWidth: 2, backgroundColor: 'transparent' },
  printButtonText: { fontWeight: '700', fontSize: 14 },
});

export default LandlordDashboard;
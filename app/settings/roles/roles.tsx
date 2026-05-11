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
  TextInput,
  KeyboardAvoidingView,
  Platform,
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
  scrollContent: {
    paddingBottom: 120,
  },
  section: {
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
  roleCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  roleCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  roleIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  roleDescription: {
    fontSize: 12,
  },
  memberCount: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rolePermissions: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  permissionCheck: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  permissionText: {
    fontSize: 13,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  smallButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  memberCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 12,
  },
  memberActions: {
    flexDirection: 'row',
    gap: 8,
  },
  memberButton: {
    width: 36,
    height: 36,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  permissionGroup: {
    marginBottom: 24,
  },
  permissionGroupTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  permissionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  permissionToggle: {
    marginLeft: 'auto',
  },
  inputField: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  roleSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  roleOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleOptionText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#ffffff',
  },
  cancelButton: {
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Delete Modal Styles
  deleteModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModalContent: {
    borderRadius: 16,
    padding: 24,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  deleteIcon: {
    alignItems: 'center',
    marginBottom: 16,
  },
  deleteTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  deleteMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  deleteButtonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  deleteConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteConfirmText: {
    fontSize: 14,
    fontWeight: '600',
  },
  deleteCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
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
  emptyState: {
    marginHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 13,
    textAlign: 'center',
  },
});

interface Permission {
  id: string;
  name: string;
  enabled: boolean;
}

interface PermissionGroup {
  title: string;
  permissions: Permission[];
}

interface Role {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  memberCount: number;
  members: Member[];
  permissions: PermissionGroup[];
  badgeBg: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

interface NewMember {
  name: string;
  email: string;
  phone: string;
  role: 'administrator' | 'manager';
}

export default function RolesPermissionsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'role' | 'member'; item: any } | null>(null);

  // Add member form state
  const [newMember, setNewMember] = useState<NewMember>({
    name: '',
    email: '',
    phone: '',
    role: 'manager',
  });

  // Color scheme
  const bgColor = darkMode ? '#0f1419' : '#f8f9fa';
  const cardColor = darkMode ? '#1e293b' : '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1a202c';
  const textSecondary = darkMode ? '#9ca3af' : '#6b7280';
  const borderColor = darkMode ? '#334155' : '#e5e7eb';
  const primaryColor = '#050f52';
  const successColor = darkMode ? '#6ee7b7' : '#059669';
  const errorColor = '#dc2626';
  const inputBg = darkMode ? '#0f1419' : '#f8f9fa';

  // Icon colors
  const roles: Role[] = [
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access and control',
      icon: 'shield-check',
      iconBg: darkMode ? '#312e81' : '#e0e7ff',
      iconColor: darkMode ? '#818cf8' : '#4f46e5',
      memberCount: 2,
      badgeBg: darkMode ? '#312e81' : '#e0e7ff',
      members: [
        { id: '1', name: 'John Smith', email: 'john@example.com', phone: '+1 (555) 123-4567', role: 'Admin', avatar: 'JS' },
        { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 (555) 123-4568', role: 'Admin', avatar: 'SJ' },
      ],
      permissions: [
        {
          title: 'User Management',
          permissions: [
            { id: 'create_users', name: 'Create Users', enabled: true },
            { id: 'edit_users', name: 'Edit Users', enabled: true },
            { id: 'delete_users', name: 'Delete Users', enabled: true },
          ],
        },
        {
          title: 'Property Management',
          permissions: [
            { id: 'manage_properties', name: 'Manage Properties', enabled: true },
            { id: 'view_reports', name: 'View Reports', enabled: true },
            { id: 'export_data', name: 'Export Data', enabled: true },
          ],
        },
        {
          title: 'Financial',
          permissions: [
            { id: 'view_finances', name: 'View Financial Data', enabled: true },
            { id: 'manage_payments', name: 'Manage Payments', enabled: true },
            { id: 'approve_transactions', name: 'Approve Transactions', enabled: true },
          ],
        },
      ],
    },
    {
      id: 'manager',
      name: 'Property Manager',
      description: 'Manage properties and tenants',
      icon: 'briefcase-outline',
      iconBg: darkMode ? '#7c2d12' : '#fed7aa',
      iconColor: darkMode ? '#fb923c' : '#ea580c',
      memberCount: 5,
      badgeBg: darkMode ? '#7c2d12' : '#fed7aa',
      members: [
        { id: '3', name: 'Mike Davis', email: 'mike@example.com', phone: '+1 (555) 234-5678', role: 'Manager', avatar: 'MD' },
        { id: '4', name: 'Emma Wilson', email: 'emma@example.com', phone: '+1 (555) 234-5679', role: 'Manager', avatar: 'EW' },
        { id: '5', name: 'Alex Brown', email: 'alex@example.com', phone: '+1 (555) 234-5680', role: 'Manager', avatar: 'AB' },
      ],
      permissions: [
        {
          title: 'Property Management',
          permissions: [
            { id: 'view_properties', name: 'View Properties', enabled: true },
            { id: 'edit_properties', name: 'Edit Properties', enabled: true },
            { id: 'manage_tenants', name: 'Manage Tenants', enabled: true },
          ],
        },
        {
          title: 'Financial',
          permissions: [
            { id: 'view_finances', name: 'View Financial Data', enabled: true },
            { id: 'manage_payments', name: 'Manage Payments', enabled: false },
            { id: 'approve_transactions', name: 'Approve Transactions', enabled: false },
          ],
        },
      ],
    },
  ];

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setShowPermissionModal(true);
  };

  const handleViewMembers = (role: Role) => {
    setSelectedRole(role);
    setShowMembersModal(true);
  };

  const handleOpenAddMember = () => {
    setNewMember({ name: '', email: '', phone: '', role: 'manager' });
    setShowAddMemberModal(true);
  };

  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.email.trim() || !newMember.phone.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    if (!newMember.email.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email');
      return;
    }

    Alert.alert('Success', `${newMember.name} has been added as ${newMember.role === 'administrator' ? 'Administrator' : 'Property Manager'}`);
    setShowAddMemberModal(false);
    setNewMember({ name: '', email: '', phone: '', role: 'manager' });
  };

  const handleDeleteRole = (role: Role) => {
    setDeleteTarget({ type: 'role', item: role });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget?.type === 'role') {
      Alert.alert('Deleted', `${deleteTarget.item.name} role has been deleted.`);
    } else if (deleteTarget?.type === 'member') {
      Alert.alert('Removed', `${deleteTarget.item.name} has been removed.`);
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleRemoveMember = (member: Member) => {
    setDeleteTarget({ type: 'member', item: member });
    setShowDeleteModal(true);
  };

  const renderSettingItem = (setting: Permission, index: number, total: number) => {
    return (
      <View
        key={setting.id}
        style={[
          styles.permissionItem,
          {
            borderBottomColor: borderColor,
            borderBottomWidth: index < total - 1 ? 1 : 0,
          },
        ]}
      >
        <View
          style={[
            styles.permissionCheck,
            {
              borderColor: setting.enabled ? successColor : borderColor,
              backgroundColor: setting.enabled ? successColor : 'transparent',
            },
          ]}
        >
          {setting.enabled && (
            <MaterialCommunityIcons name="check" size={14} color="#ffffff" />
          )}
        </View>
        <Text style={[styles.permissionText, { color: textColor }]}>
          {setting.name}
        </Text>
      </View>
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
            Roles & Permissions
          </Text>
          <Text style={[styles.headerSubtitle, { color: textSecondary }]}>
            Manage team access levels
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Roles Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: textSecondary }]}>
            System Roles
          </Text>

          {roles.map(role => (
            <View
              key={role.id}
              style={[styles.roleCard, { backgroundColor: cardColor, borderColor }]}
            >
              {/* Role Header */}
              <View style={styles.roleCardHeader}>
                <View style={[styles.roleIcon, { backgroundColor: role.iconBg }]}>
                  <MaterialCommunityIcons
                    name={role.icon as any}
                    size={22}
                    color={role.iconColor}
                  />
                </View>
                <View style={styles.roleInfo}>
                  <Text style={[styles.roleName, { color: textColor }]}>
                    {role.name}
                  </Text>
                  <Text style={[styles.roleDescription, { color: textSecondary }]}>
                    {role.description}
                  </Text>
                </View>
                <View
                  style={[
                    styles.memberCount,
                    {
                      backgroundColor: role.badgeBg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      { color: role.iconColor, fontWeight: '600' },
                    ]}
                  >
                    {role.memberCount}
                  </Text>
                </View>
              </View>

              {/* Permissions Preview */}
              <View style={[styles.rolePermissions, { borderTopColor: borderColor }]}>
                {role.permissions.slice(0, 2).map((group, idx) => (
                  <View key={idx}>
                    <Text
                      style={[
                        styles.permissionGroupTitle,
                        { color: textSecondary, marginTop: idx > 0 ? 8 : 0 },
                      ]}
                    >
                      {group.title}
                    </Text>
                    {group.permissions.slice(0, 2).map(permission => (
                      <View
                        key={permission.id}
                        style={styles.permissionItem}
                      >
                        <View
                          style={[
                            styles.permissionCheck,
                            {
                              borderColor: permission.enabled
                                ? successColor
                                : borderColor,
                              backgroundColor: permission.enabled
                                ? successColor
                                : 'transparent',
                            },
                          ]}
                        >
                          {permission.enabled && (
                            <MaterialCommunityIcons
                              name="check"
                              size={14}
                              color="#ffffff"
                            />
                          )}
                        </View>
                        <Text
                          style={[
                            styles.permissionText,
                            { color: textColor },
                          ]}
                        >
                          {permission.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[
                    styles.smallButton,
                    { backgroundColor: primaryColor },
                  ]}
                  onPress={() => handleEditRole(role)}
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={16}
                    color="#ffffff"
                  />
                  <Text style={[styles.buttonText, { color: '#ffffff' }]}>
                    Edit
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.smallButton,
                    { backgroundColor: cardColor, borderWidth: 1, borderColor },
                  ]}
                  onPress={() => handleViewMembers(role)}
                >
                  <MaterialCommunityIcons
                    name="account-multiple-outline"
                    size={16}
                    color={textColor}
                  />
                  <Text style={[styles.buttonText, { color: textColor }]}>
                    Members
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.smallButton,
                    { backgroundColor: darkMode ? '#7f1d1d' : '#fee2e2' },
                  ]}
                  onPress={() => handleDeleteRole(role)}
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={16}
                    color={errorColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Add Role Button */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: primaryColor }]}
          onPress={() => Alert.alert('Add New Role', 'This will open a form to create a new role.')}
        >
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={20}
            color="#ffffff"
          />
          <Text style={styles.addButtonText}>Create New Role</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Permission Edit Modal */}
      <Modal
        visible={showPermissionModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPermissionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: cardColor },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text style={[styles.modalHeader, { color: textColor }]}>
                {selectedRole?.name} Permissions
              </Text>
              <TouchableOpacity onPress={() => setShowPermissionModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {selectedRole?.permissions.map((group, idx) => (
                <View key={idx} style={styles.permissionGroup}>
                  <Text
                    style={[
                      styles.permissionGroupTitle,
                      { color: textSecondary },
                    ]}
                  >
                    {group.title}
                  </Text>
                  {group.permissions.map(permission => (
                    <View
                      key={permission.id}
                      style={[
                        styles.permissionRow,
                        { borderBottomColor: borderColor },
                      ]}
                    >
                      <Text style={[{ color: textColor }]}>
                        {permission.name}
                      </Text>
                      <View style={styles.permissionToggle}>
                        <Switch
                          value={permission.enabled}
                          trackColor={{
                            false: borderColor,
                            true: darkMode ? '#60a5fa' : '#93c5fd',
                          }}
                          thumbColor={permission.enabled ? primaryColor : '#9ca3af'}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: primaryColor, marginTop: 20 },
              ]}
              onPress={() => {
                setShowPermissionModal(false);
                Alert.alert('Success', 'Permissions updated successfully!');
              }}
            >
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={20}
                color="#ffffff"
              />
              <Text style={styles.addButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Members Modal */}
      <Modal
        visible={showMembersModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMembersModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: cardColor },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text style={[styles.modalHeader, { color: textColor }]}>
                {selectedRole?.name} Members ({selectedRole?.memberCount})
              </Text>
              <TouchableOpacity onPress={() => setShowMembersModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {selectedRole?.members && selectedRole.members.length > 0 ? (
                selectedRole.members.map(member => (
                  <View
                    key={member.id}
                    style={[
                      styles.memberCard,
                      { backgroundColor: inputBg },
                    ]}
                  >
                    <View
                      style={[
                        styles.memberAvatar,
                        { backgroundColor: primaryColor },
                      ]}
                    >
                      <Text
                        style={{
                          color: '#ffffff',
                          fontWeight: 'bold',
                          fontSize: 12,
                        }}
                      >
                        {member.avatar}
                      </Text>
                    </View>
                    <View style={styles.memberInfo}>
                      <Text style={[styles.memberName, { color: textColor }]}>
                        {member.name}
                      </Text>
                      <Text style={[styles.memberRole, { color: textSecondary }]}>
                        {member.email}
                      </Text>
                      <Text style={[styles.memberRole, { color: textSecondary }]}>
                        {member.phone}
                      </Text>
                    </View>
                    <View style={styles.memberActions}>
                      <TouchableOpacity
                        style={[
                          styles.memberButton,
                          { backgroundColor: darkMode ? '#334155' : '#e5e7eb' },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name="pencil-outline"
                          size={16}
                          color={textColor}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.memberButton,
                          {
                            backgroundColor: darkMode ? '#7f1d1d' : '#fee2e2',
                          },
                        ]}
                        onPress={() => handleRemoveMember(member)}
                      >
                        <MaterialCommunityIcons
                          name="trash-can-outline"
                          size={16}
                          color={errorColor}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyState}>
                  <View style={styles.emptyIcon}>
                    <MaterialCommunityIcons
                      name="account-off-outline"
                      size={48}
                      color={textSecondary}
                    />
                  </View>
                  <Text style={[styles.emptyText, { color: textColor }]}>
                    No members yet
                  </Text>
                  <Text
                    style={[
                      styles.emptySubtext,
                      { color: textSecondary, marginBottom: 16 },
                    ]}
                  >
                    Add members to this role to get started
                  </Text>
                </View>
              )}
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.addButton,
                { backgroundColor: primaryColor, marginTop: 20 },
              ]}
              onPress={handleOpenAddMember}
            >
              <MaterialCommunityIcons
                name="account-plus-outline"
                size={20}
                color="#ffffff"
              />
              <Text style={styles.addButtonText}>Add Member</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Member Modal */}
      <Modal
        visible={showAddMemberModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddMemberModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={[styles.modalContent, { backgroundColor: cardColor }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text style={[styles.modalHeader, { color: textColor }]}>
                Add New Member
              </Text>
              <TouchableOpacity onPress={() => setShowAddMemberModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Name Field */}
              <Text style={[styles.inputLabel, { color: textColor }]}>
                Full Name
              </Text>
              <TextInput
                style={[
                  styles.inputField,
                  {
                    backgroundColor: inputBg,
                    borderColor,
                    color: textColor,
                  },
                ]}
                placeholder="Enter full name"
                placeholderTextColor={textSecondary}
                value={newMember.name}
                onChangeText={(text) =>
                  setNewMember({ ...newMember, name: text })
                }
              />

              {/* Email Field */}
              <Text style={[styles.inputLabel, { color: textColor }]}>
                Email Address
              </Text>
              <TextInput
                style={[
                  styles.inputField,
                  {
                    backgroundColor: inputBg,
                    borderColor,
                    color: textColor,
                  },
                ]}
                placeholder="Enter email address"
                placeholderTextColor={textSecondary}
                value={newMember.email}
                onChangeText={(text) =>
                  setNewMember({ ...newMember, email: text })
                }
                keyboardType="email-address"
              />

              {/* Phone Field */}
              <Text style={[styles.inputLabel, { color: textColor }]}>
                Phone Number
              </Text>
              <TextInput
                style={[
                  styles.inputField,
                  {
                    backgroundColor: inputBg,
                    borderColor,
                    color: textColor,
                  },
                ]}
                placeholder="Enter phone number"
                placeholderTextColor={textSecondary}
                value={newMember.phone}
                onChangeText={(text) =>
                  setNewMember({ ...newMember, phone: text })
                }
                keyboardType="phone-pad"
              />

              {/* Role Selector */}
              <Text style={[styles.inputLabel, { color: textColor }]}>
                Assign Role
              </Text>
              <View style={styles.roleSelector}>
                <TouchableOpacity
                  style={[
                    styles.roleOption,
                    {
                      borderColor:
                        newMember.role === 'administrator'
                          ? primaryColor
                          : borderColor,
                      backgroundColor:
                        newMember.role === 'administrator'
                          ? darkMode
                            ? '#312e81'
                            : '#e0e7ff'
                          : 'transparent',
                    },
                  ]}
                  onPress={() =>
                    setNewMember({ ...newMember, role: 'administrator' })
                  }
                >
                  <MaterialCommunityIcons
                    name="shield-check"
                    size={20}
                    color={
                      newMember.role === 'administrator'
                        ? darkMode
                          ? '#818cf8'
                          : '#4f46e5'
                        : textSecondary
                    }
                  />
                  <Text
                    style={[
                      styles.roleOptionText,
                      {
                        color:
                          newMember.role === 'administrator'
                            ? darkMode
                              ? '#818cf8'
                              : '#4f46e5'
                            : textSecondary,
                      },
                    ]}
                  >
                    Administrator
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleOption,
                    {
                      borderColor:
                        newMember.role === 'manager'
                          ? primaryColor
                          : borderColor,
                      backgroundColor:
                        newMember.role === 'manager'
                          ? darkMode
                            ? '#7c2d12'
                            : '#fed7aa'
                          : 'transparent',
                    },
                  ]}
                  onPress={() =>
                    setNewMember({ ...newMember, role: 'manager' })
                  }
                >
                  <MaterialCommunityIcons
                    name="briefcase-outline"
                    size={20}
                    color={
                      newMember.role === 'manager'
                        ? darkMode
                          ? '#fb923c'
                          : '#ea580c'
                        : textSecondary
                    }
                  />
                  <Text
                    style={[
                      styles.roleOptionText,
                      {
                        color:
                          newMember.role === 'manager'
                            ? darkMode
                              ? '#fb923c'
                              : '#ea580c'
                            : textSecondary,
                      },
                    ]}
                  >
                    Property Manager
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Note */}
              <View
                style={{
                  backgroundColor: darkMode ? '#164e63' : '#cffafe',
                  borderLeftWidth: 4,
                  borderLeftColor: darkMode ? '#22d3ee' : '#0891b2',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    color: darkMode ? '#22d3ee' : '#0891b2',
                    fontSize: 13,
                    lineHeight: 18,
                  }}
                >
                  A temporary password will be sent to the provided email address. The user can change it upon first login.
                </Text>
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: primaryColor }]}
              onPress={handleAddMember}
            >
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={20}
                color="#ffffff"
              />
              <Text style={styles.saveButtonText}>Add Member</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.cancelButton,
                { borderColor, backgroundColor: inputBg },
              ]}
              onPress={() => setShowAddMemberModal(false)}
            >
              <MaterialCommunityIcons name="close" size={20} color={textColor} />
              <Text style={[styles.cancelButtonText, { color: textColor }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.deleteModalOverlay}>
          <View
            style={[styles.deleteModalContent, { backgroundColor: cardColor }]}
          >
            <View style={styles.deleteIcon}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={48}
                color={errorColor}
              />
            </View>

            <Text style={[styles.deleteTitle, { color: textColor }]}>
              {deleteTarget?.type === 'role' ? 'Delete Role?' : 'Remove Member?'}
            </Text>

            <Text style={[styles.deleteMessage, { color: textSecondary }]}>
              {deleteTarget?.type === 'role'
                ? `Are you sure you want to delete "${deleteTarget.item.name}"? This action cannot be undone and will affect all members assigned to this role.`
                : `Are you sure you want to remove "${deleteTarget?.item.name}" from this role? They will lose access to all assigned properties and permissions.`}
            </Text>

            <View style={styles.deleteButtonGroup}>
              <TouchableOpacity
                style={[
                  styles.deleteCancelButton,
                  { borderColor, backgroundColor: inputBg },
                ]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={[styles.deleteConfirmText, { color: textColor }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.deleteConfirmButton, { backgroundColor: errorColor }]}
                onPress={handleConfirmDelete}
              >
                <Text style={[styles.deleteConfirmText, { color: '#ffffff' }]}>
                  {deleteTarget?.type === 'role' ? 'Delete' : 'Remove'}
                </Text>
              </TouchableOpacity>
            </View>
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
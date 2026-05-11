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
  TextInput,
  Alert,
  Linking,
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
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  searchContainer: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  searchInput: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqCard: {
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  faqIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  faqContent: {
    flex: 1,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  faqCategory: {
    fontSize: 12,
  },
  faqExpanded: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  faqAnswer: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  contactCard: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactDesc: {
    fontSize: 13,
    marginBottom: 8,
  },
  contactValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  ticketCard: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ticketId: {
    fontSize: 12,
    fontWeight: '700',
  },
  ticketStatus: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ticketTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  ticketDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  ticketDate: {
    fontSize: 11,
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
    maxHeight: '90%',
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
  },
  textArea: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
    gap: 8,
  },
  submitButtonText: {
    fontSize: 15,
    fontWeight: '600',
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
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  resourceCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  resourceIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  resourceDesc: {
    fontSize: 12,
    marginTop: 2,
  },
});

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  date: string;
  borderColor: string;
}

export default function HelpSupportScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Color scheme
  const bgColor = darkMode ? '#0f1419' : '#f8f9fa';
  const cardColor = '#ffffff';
  const textColor = darkMode ? '#ffffff' : '#1a202c';
  const textSecondary = darkMode ? '#9ca3af' : '#6b7280';
  const borderColor = darkMode ? '#334155' : '#e5e7eb';
  const primaryColor = '#050f52';
  const successColor = '#059669';
  const warningColor = '#ea580c';
  const infoColor = '#0891b2';

  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    category: 'general',
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I add a new property?',
      answer: 'To add a new property, go to Properties section, click the "Add Property" button, and fill in the property details including address, unit count, and monthly rent. You can add photos and documents for each property.',
      category: 'property',
      icon: 'home-plus-outline',
      iconBg: '#dbeafe',
      iconColor: '#2563eb',
    },
    {
      id: '2',
      question: 'How can I collect rent payments?',
      answer: 'Navigate to the Finance section, select the property and tenant, then click "Request Payment". You can set payment due dates, send reminders, and track payment status. We support multiple payment methods including bank transfer and mobile money.',
      category: 'finance',
      icon: 'cash-multiple',
      iconBg: '#d1fae5',
      iconColor: '#059669',
    },
    {
      id: '3',
      question: 'How do I manage tenant information?',
      answer: 'In the Tenants section, you can add new tenants, update their information, view lease agreements, and track their rental history. You can also communicate directly with tenants through the messaging feature.',
      category: 'tenant',
      icon: 'account-multiple-outline',
      iconBg: '#fed7aa',
      iconColor: '#ea580c',
    },
    {
      id: '4',
      question: 'What should I do if a payment is overdue?',
      answer: 'Use the automated reminder system to send payment reminders. You can set up automatic reminders 7, 3, and 1 day before the due date. If payment is still overdue, you can take manual action through the Collections feature.',
      category: 'finance',
      icon: 'bell-alert-outline',
      iconBg: '#fecaca',
      iconColor: '#ef4444',
    },
    {
      id: '5',
      question: 'How do I generate financial reports?',
      answer: 'Go to Reports section, select your date range and property. You can generate Income Reports, Expense Reports, and Tax Reports. All reports can be exported as PDF or Excel for your records.',
      category: 'finance',
      icon: 'file-chart-outline',
      iconBg: '#f3e8ff',
      iconColor: '#a855f7',
    },
    {
      id: '6',
      question: 'How do I handle maintenance requests?',
      answer: 'Tenants can submit maintenance requests through the app. You\'ll receive notifications immediately. Track the status, assign to contractors, and tenants will be notified of completion.',
      category: 'maintenance',
      icon: 'wrench-outline',
      iconBg: '#fed7aa',
      iconColor: '#ea580c',
    },
    {
      id: '7',
      question: 'Can I invite team members?',
      answer: 'Yes! Go to Settings > Roles & Permissions to invite team members. You can assign roles like Administrator or Property Manager, and control their access levels to specific properties and features.',
      category: 'account',
      icon: 'account-plus-outline',
      iconBg: '#e0e7ff',
      iconColor: '#4f46e5',
    },
    {
      id: '8',
      question: 'How is my data secured?',
      answer: 'All data is encrypted end-to-end and stored on secure servers. We use industry-standard security protocols and regular security audits. You can also enable two-factor authentication for additional security.',
      category: 'account',
      icon: 'shield-check-outline',
      iconBg: '#f3e8ff',
      iconColor: '#a855f7',
    },
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: 'TKT-2024-001',
      title: 'Payment gateway integration issue',
      description: 'Unable to process payments for one property',
      status: 'in_progress',
      date: '2 days ago',
      borderColor: warningColor,
    },
    {
      id: 'TKT-2024-002',
      title: 'Feature request: Bulk tenant import',
      description: 'Request to import multiple tenants from CSV file',
      status: 'open',
      date: '1 week ago',
      borderColor: infoColor,
    },
    {
      id: 'TKT-2024-003',
      title: 'Lease agreement template added',
      description: 'New templates have been added to your account',
      status: 'resolved',
      date: '3 days ago',
      borderColor: successColor,
    },
  ];

  const categories = ['all', 'property', 'finance', 'tenant', 'maintenance', 'account'];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmitTicket = () => {
    if (!ticketForm.subject.trim() || !ticketForm.description.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', 'Support ticket created! We\'ll respond within 24 hours.');
    setShowTicketModal(false);
    setTicketForm({ subject: '', description: '', category: 'general' });
  };

  const handleSubmitContact = () => {
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', 'Message sent! We\'ll get back to you soon.');
    setShowContactModal(false);
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:+1-800-123-4567');
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@hauseefix.com');
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
            Help & Support
          </Text>
          <Text style={[styles.headerSubtitle, { color: textSecondary }]}>
            Get answers and assistance
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: textSecondary }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={[styles.quickActionCard]}
              onPress={() => setShowTicketModal(true)}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: '#dbeafe' },
                ]}
              >
                <MaterialCommunityIcons
                  name="ticket-outline"
                  size={24}
                  color="#2563eb"
                />
              </View>
              <Text style={[styles.quickActionText, { color: textColor }]}>
                New Ticket
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionCard]}
              onPress={() => setShowContactModal(true)}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: '#fed7aa' },
                ]}
              >
                <MaterialCommunityIcons
                  name="email-outline"
                  size={24}
                  color="#ea580c"
                />
              </View>
              <Text style={[styles.quickActionText, { color: textColor }]}>
                Contact Us
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionCard]}
              onPress={handleCallSupport}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: '#d1fae5' },
                ]}
              >
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={24}
                  color="#059669"
                />
              </View>
              <Text style={[styles.quickActionText, { color: textColor }]}>
                Call Us
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Search */}
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              {
                borderColor,
                color: textColor,
              },
            ]}
            placeholder="Search FAQs..."
            placeholderTextColor={textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Filter */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor:
                      selectedCategory === category ? primaryColor : cardColor,
                    borderColor:
                      selectedCategory === category ? primaryColor : borderColor,
                  },
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    {
                      color: selectedCategory === category ? '#ffffff' : textColor,
                    },
                  ]}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: textSecondary }]}>
            Frequently Asked Questions
          </Text>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(faq => (
              <TouchableOpacity
                key={faq.id}
                style={[styles.faqCard]}
                onPress={() =>
                  setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                }
              >
                <View style={styles.faqHeader}>
                  <View
                    style={[
                      styles.faqIcon,
                      { backgroundColor: faq.iconBg },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={faq.icon as any}
                      size={20}
                      color={faq.iconColor}
                    />
                  </View>
                  <View style={styles.faqContent}>
                    <Text style={[styles.faqQuestion, { color: textColor }]}>
                      {faq.question}
                    </Text>
                    <Text style={[styles.faqCategory, { color: textSecondary }]}>
                      {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                    </Text>
                  </View>
                  <MaterialCommunityIcons
                    name={
                      expandedFAQ === faq.id
                        ? 'chevron-up'
                        : 'chevron-down'
                    }
                    size={20}
                    color={textSecondary}
                  />
                </View>

                {expandedFAQ === faq.id && (
                  <View style={styles.faqExpanded}>
                    <Text
                      style={[styles.faqAnswer, { color: textSecondary }]}
                    >
                      {faq.answer}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <MaterialCommunityIcons
                  name="help-circle-outline"
                  size={48}
                  color={textSecondary}
                />
              </View>
              <Text style={[styles.emptyText, { color: textColor }]}>
                No FAQs found
              </Text>
              <Text style={[styles.emptySubtext, { color: textSecondary }]}>
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        </View>

        {/* Support Tickets */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: textSecondary }]}>
            Your Support Tickets
          </Text>
          {supportTickets.map(ticket => (
            <View
              key={ticket.id}
              style={[
                styles.ticketCard,
                {
                  borderLeftColor: ticket.borderColor,
                },
              ]}
            >
              <View style={styles.ticketHeader}>
                <Text style={[styles.ticketId, { color: textSecondary }]}>
                  {ticket.id}
                </Text>
                <View
                  style={[
                    styles.ticketStatus,
                    {
                      backgroundColor:
                        ticket.status === 'resolved'
                          ? '#d1fae5'
                          : ticket.status === 'in_progress'
                            ? '#fed7aa'
                            : '#dbeafe',
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        ticket.status === 'resolved'
                          ? successColor
                          : ticket.status === 'in_progress'
                            ? warningColor
                            : infoColor,
                      fontWeight: '600',
                    }}
                  >
                    {ticket.status === 'resolved'
                      ? 'Resolved'
                      : ticket.status === 'in_progress'
                        ? 'In Progress'
                        : 'Open'}
                  </Text>
                </View>
              </View>

              <Text style={[styles.ticketTitle, { color: textColor }]}>
                {ticket.title}
              </Text>
              <Text
                style={[styles.ticketDescription, { color: textSecondary }]}
              >
                {ticket.description}
              </Text>
              <Text style={[styles.ticketDate, { color: textSecondary }]}>
                {ticket.date}
              </Text>
            </View>
          ))}
        </View>

        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: textSecondary }]}>
            Contact Methods
          </Text>

          <TouchableOpacity
            style={[styles.contactCard]}
            onPress={handleEmailSupport}
          >
            <View
              style={[
                styles.contactIcon,
                { backgroundColor: '#fed7aa' },
              ]}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#ea580c"
              />
            </View>
            <View style={styles.contactContent}>
              <Text style={[styles.contactTitle, { color: textColor }]}>
                Email Support
              </Text>
              <Text style={[styles.contactDesc, { color: textSecondary }]}>
                Get help via email
              </Text>
              <Text style={[styles.contactValue, { color: primaryColor }]}>
                support@hauseefix.com
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.contactCard]}
            onPress={handleCallSupport}
          >
            <View
              style={[
                styles.contactIcon,
                { backgroundColor: '#d1fae5' },
              ]}
            >
              <MaterialCommunityIcons
                name="phone-outline"
                size={20}
                color="#059669"
              />
            </View>
            <View style={styles.contactContent}>
              <Text style={[styles.contactTitle, { color: textColor }]}>
                Phone Support
              </Text>
              <Text style={[styles.contactDesc, { color: textSecondary }]}>
                Mon-Fri, 9AM-6PM EST
              </Text>
              <Text style={[styles.contactValue, { color: primaryColor }]}>
                +1-800-123-4567
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.contactCard]}>
            <View
              style={[
                styles.contactIcon,
                { backgroundColor: '#dbeafe' },
              ]}
            >
              <MaterialCommunityIcons
                name="chat-outline"
                size={20}
                color="#2563eb"
              />
            </View>
            <View style={styles.contactContent}>
              <Text style={[styles.contactTitle, { color: textColor }]}>
                Live Chat
              </Text>
              <Text style={[styles.contactDesc, { color: textSecondary }]}>
                Chat with our team
              </Text>
              <Text style={[styles.contactValue, { color: primaryColor }]}>
                Available 24/7
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Resources */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: textSecondary }]}>
            Helpful Resources
          </Text>

          <TouchableOpacity style={[styles.resourceCard]}>
            <View
              style={[
                styles.resourceIcon,
                { backgroundColor: '#f3e8ff' },
              ]}
            >
              <MaterialCommunityIcons
                name="book-outline"
                size={20}
                color="#a855f7"
              />
            </View>
            <View style={styles.resourceContent}>
              <Text style={[styles.resourceTitle, { color: textColor }]}>
                Knowledge Base
              </Text>
              <Text style={[styles.resourceDesc, { color: textSecondary }]}>
                Browse detailed guides and tutorials
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.resourceCard]}>
            <View
              style={[
                styles.resourceIcon,
                { backgroundColor: '#dbeafe' },
              ]}
            >
              <MaterialCommunityIcons
                name="video-outline"
                size={20}
                color="#2563eb"
              />
            </View>
            <View style={styles.resourceContent}>
              <Text style={[styles.resourceTitle, { color: textColor }]}>
                Video Tutorials
              </Text>
              <Text style={[styles.resourceDesc, { color: textSecondary }]}>
                Watch step-by-step video guides
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.resourceCard]}>
            <View
              style={[
                styles.resourceIcon,
                { backgroundColor: '#d1fae5' },
              ]}
            >
              <MaterialCommunityIcons
                name="file-document-outline"
                size={20}
                color="#059669"
              />
            </View>
            <View style={styles.resourceContent}>
              <Text style={[styles.resourceTitle, { color: textColor }]}>
                Documentation
              </Text>
              <Text style={[styles.resourceDesc, { color: textSecondary }]}>
                Complete API and feature docs
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={textSecondary}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Submit Ticket Modal */}
      <Modal
        visible={showTicketModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTicketModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text style={[styles.modalHeader, { color: textColor }]}>
                Create Support Ticket
              </Text>
              <TouchableOpacity onPress={() => setShowTicketModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: textColor }]}>
                  Subject
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor,
                      color: textColor,
                      backgroundColor: cardColor,
                    },
                  ]}
                  placeholder="Brief description of your issue"
                  placeholderTextColor={textSecondary}
                  value={ticketForm.subject}
                  onChangeText={(text) =>
                    setTicketForm({ ...ticketForm, subject: text })
                  }
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: textColor }]}>
                  Description
                </Text>
                <TextInput
                  style={[
                    styles.textArea,
                    {
                      borderColor,
                      color: textColor,
                      backgroundColor: cardColor,
                    },
                  ]}
                  placeholder="Provide detailed information about your issue"
                  placeholderTextColor={textSecondary}
                  value={ticketForm.description}
                  onChangeText={(text) =>
                    setTicketForm({ ...ticketForm, description: text })
                  }
                  multiline
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: textColor }]}>
                  Category
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor,
                      color: textColor,
                      backgroundColor: cardColor,
                    },
                  ]}
                  placeholder="e.g., Bug, Feature Request, Payment"
                  placeholderTextColor={textSecondary}
                  value={ticketForm.category}
                  onChangeText={(text) =>
                    setTicketForm({ ...ticketForm, category: text })
                  }
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: primaryColor }]}
              onPress={handleSubmitTicket}
            >
              <MaterialCommunityIcons
                name="send-outline"
                size={18}
                color="#ffffff"
              />
              <Text
                style={[styles.submitButtonText, { color: '#ffffff' }]}
              >
                Submit Ticket
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Contact Us Modal */}
      <Modal
        visible={showContactModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowContactModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <Text style={[styles.modalHeader, { color: textColor }]}>
                Contact Us
              </Text>
              <TouchableOpacity onPress={() => setShowContactModal(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: textColor }]}>
                  Your Name
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor,
                      color: textColor,
                      backgroundColor: cardColor,
                    },
                  ]}
                  placeholder="Enter your full name"
                  placeholderTextColor={textSecondary}
                  value={contactForm.name}
                  onChangeText={(text) =>
                    setContactForm({ ...contactForm, name: text })
                  }
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: textColor }]}>
                  Email Address
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor,
                      color: textColor,
                      backgroundColor: cardColor,
                    },
                  ]}
                  placeholder="your.email@example.com"
                  placeholderTextColor={textSecondary}
                  value={contactForm.email}
                  onChangeText={(text) =>
                    setContactForm({ ...contactForm, email: text })
                  }
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: textColor }]}>
                  Message
                </Text>
                <TextInput
                  style={[
                    styles.textArea,
                    {
                      borderColor,
                      color: textColor,
                      backgroundColor: cardColor,
                    },
                  ]}
                  placeholder="Tell us how we can help"
                  placeholderTextColor={textSecondary}
                  value={contactForm.message}
                  onChangeText={(text) =>
                    setContactForm({ ...contactForm, message: text })
                  }
                  multiline
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: primaryColor }]}
              onPress={handleSubmitContact}
            >
              <MaterialCommunityIcons
                name="send-outline"
                size={18}
                color="#ffffff"
              />
              <Text
                style={[styles.submitButtonText, { color: '#ffffff' }]}
              >
                Send Message
              </Text>
            </TouchableOpacity>
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
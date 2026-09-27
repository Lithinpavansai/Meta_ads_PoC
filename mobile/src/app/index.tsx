import React from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  submittedAt: string;
};

const DUMMY_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    email: 'sarah.connor@example.com',
    phone: '+1 (555) 019-2834',
    submittedAt: '2026-09-27 14:32',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 012-7489',
    submittedAt: '2026-09-27 16:05',
  },
];

export default function LeadsScreen() {
  const renderItem = ({ item }: { item: Lead }) => (
    <View style={styles.card}>
      <Text style={styles.leadName}>{item.name}</Text>
      <Text style={styles.leadDetail}>{item.email}</Text>
      <Text style={styles.leadDetail}>{item.phone}</Text>
      <Text style={styles.leadTimestamp}>Submitted: {item.submittedAt}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leads</Text>
      </View>
      <FlatList
        data={DUMMY_LEADS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  listContent: {
    padding: 20,
    gap: 12,
  },
  card: {
    backgroundColor: '#121212',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#262626',
  },
  leadName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  leadDetail: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 4,
  },
  leadTimestamp: {
    fontSize: 12,
    color: '#737373',
    marginTop: 6,
  },
});

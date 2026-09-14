import { useState } from 'react';
import { FlatList, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader, TransactionRow } from '../Components/FinanceUI';
import { transactions, money } from '../data/mockData';
import { styles } from '../styles/styles';
export default function TransactionsScreen() {
  const [filter, setFilter] = useState('Alle');
  const filtered = transactions.filter(item => filter === 'Alle' || (filter === 'Indtægter' ? item.amount > 0 : item.amount < 0));
  return <SafeAreaView style={styles.screen} edges={['top']}>
    <FlatList contentContainerStyle={styles.content} data={filtered} keyExtractor={item => item.id} renderItem={({
      item
    }) => <View style={styles.transactionSurface}><TransactionRow item={item} /></View>} ListHeaderComponent={<><PageHeader eyebrow="DIT OVERBLIK" title="Transaktioner" subtitle="De små køb og de store linjer." /><View style={styles.summaryCard}><Text style={styles.metricLabel}>Udgifter i det viste eksempel</Text><Text style={styles.summaryValue}>{money(-transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0))}</Text><Text style={styles.subtitle}>September 2026 · {transactions.length} transaktioner</Text></View><View style={styles.filterRow}>{['Alle', 'Udgifter', 'Indtægter'].map(label => <Pressable key={label} accessibilityRole="button" accessibilityState={{
          selected: filter === label
        }} onPress={() => setFilter(label)} style={[styles.filter, filter === label && styles.filterActive]}><Text style={[styles.filterText, filter === label && styles.filterTextActive]}>{label}</Text></Pressable>)}</View><View style={styles.sectionHeading}><Text style={styles.sectionTitle}>September</Text><Text style={styles.muted}>{filtered.length} bevægelser</Text></View></>} ListFooterComponent={<Text style={styles.footnote}>Udvalgte mock-transaktioner. Listen er ikke et fuldt månedsregnskab.</Text>} />
  </SafeAreaView>;
}

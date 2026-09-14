import { useState } from 'react';
import { Modal, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButton, Icon } from './FinanceUI';
import { expenseCategories, parseAmount } from '../data/financeData';
import { styles } from '../styles/styles';

// Mounted fresh for each edit, so unsaved values disappear on Cancel.
export default function EntryModal({ group, entry, onSave, onDelete, onClose }) {
  const [name, setName] = useState(entry?.name ?? '');
  const [amount, setAmount] = useState(entry ? String(entry.amount).replace('.', ',') : '');
  const [category, setCategory] = useState(entry?.category ?? 'Housing');
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  function submit() {
    const parsed = parseAmount(amount);
    if (!name.trim()) { setError('Skriv et navn til posten.'); return; }
    if (parsed === null) { setError('Skriv et beløb mellem 0 og 999.999.999 kr. Brug fx 10.000,50.'); return; }
    onSave({ name: name.trim(), amount: parsed, ...(group.key === 'expenses' ? { category } : {}) });
  }

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalBackdrop}>
        <KeyboardAvoidingView style={styles.modalKeyboard} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.modalCard} accessibilityViewIsModal>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.modalContent}>
              <View style={styles.between}>
                <View style={styles.grow}>
                  <Text style={styles.eyebrow}>{group.label.toUpperCase()}</Text>
                  <Text style={styles.sectionTitle}>{entry ? 'Rediger post' : 'Ny post'}</Text>
                </View>
                <Pressable accessibilityRole="button" accessibilityLabel="Luk formular" onPress={onClose} style={styles.iconButton}><Icon name="close" /></Pressable>
              </View>
              <Text style={styles.subtitle}>{['income', 'expenses'].includes(group.key) ? 'Indtast beløbet pr. måned.' : 'Indtast den aktuelle beholdning, ikke et månedligt bidrag.'}</Text>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput accessibilityLabel="Name" style={styles.entryInput} value={name} onChangeText={setName} placeholder="Fx Rent" maxLength={60} autoCapitalize="sentences" />
              <Text style={styles.inputLabel}>Amount · kr.</Text>
              <TextInput accessibilityLabel="Amount i kroner" style={styles.entryInput} value={amount} onChangeText={setAmount} placeholder="Fx 10.000,50" keyboardType="decimal-pad" maxLength={20} />
              <Text style={styles.muted}>Dansk talformat · Komma til decimaler</Text>
              {group.key === 'expenses' && (
                <>
                  <Text style={styles.inputLabel}>Category</Text>
                  <View style={styles.categoryOptions}>
                    {expenseCategories.map(item => (
                      <Pressable key={item.name} accessibilityRole="button" accessibilityState={{ selected: category === item.name }} onPress={() => setCategory(item.name)} style={[styles.filter, category === item.name && styles.filterActive]}>
                        <Text style={[styles.filterText, category === item.name && styles.filterTextActive]}>{item.name}</Text>
                      </Pressable>
                    ))}
                  </View>
                </>
              )}
              {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
              <ActionButton label="Gem post" icon="checkmark-outline" onPress={submit} />
              <ActionButton label="Annuller" icon="close-outline" secondary onPress={onClose} />
              {entry && !confirmDelete && (
                <Pressable accessibilityRole="button" onPress={() => setConfirmDelete(true)} style={styles.deleteButton}><Text style={styles.error}>Slet post</Text></Pressable>
              )}
              {confirmDelete && (
                <View style={styles.deleteConfirmation}>
                  <Text style={styles.bodyText}>Vil du slette “{entry.name}”?</Text>
                  <Pressable accessibilityRole="button" onPress={onDelete} style={styles.deleteButton}><Text style={styles.error}>Ja, slet posten</Text></Pressable>
                  <ActionButton label="Behold post" secondary icon="arrow-back-outline" onPress={() => setConfirmDelete(false)} />
                </View>
              )}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

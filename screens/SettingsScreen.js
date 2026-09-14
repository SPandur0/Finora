import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader, Icon } from '../Components/FinanceUI';
import { styles, colors } from '../styles/styles';

export default function SettingsScreen() {
  const [name, setName] = useState('Sune');
  const [savingsGoal, setSavingsGoal] = useState('10.000');
  const [notifications, setNotifications] = useState(false);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <KeyboardAvoidingView style={styles.grow} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <PageHeader eyebrow="DINE PRÆFERENCER" title="Settings" subtitle="Et par enkle indstillinger til dig." />
          <View style={styles.entryCard}>
            <View style={styles.inline}>
              <View style={[styles.smallIcon, styles.green]}><Icon name="person-outline" size={19} /></View>
              <Text style={styles.sectionTitle}>Profile</Text>
            </View>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              accessibilityLabel="Name"
              style={styles.entryInput}
              value={name}
              onChangeText={setName}
              placeholder="Dit navn"
              maxLength={60}
              autoCapitalize="words"
            />
          </View>
          <View style={styles.entryCard}>
            <View style={styles.inline}>
              <View style={[styles.smallIcon, styles.lavender]}><Icon name="options-outline" size={19} /></View>
              <Text style={styles.sectionTitle}>Preferences</Text>
            </View>
            <View style={styles.between}>
              <Text style={styles.inputLabel}>Currency</Text>
              <Text style={styles.rowTitle}>DKK</Text>
            </View>
            <Text style={styles.inputLabel}>Monthly savings goal · kr.</Text>
            <TextInput
              accessibilityLabel="Monthly savings goal i kroner"
              style={styles.entryInput}
              value={savingsGoal}
              onChangeText={value => setSavingsGoal(value.replace(/[^0-9.,]/g, ''))}
              placeholder="Fx 10.000"
              keyboardType="decimal-pad"
              maxLength={20}
            />
            <View style={styles.between}>
              <View style={styles.grow}>
                <Text style={styles.inputLabel}>Notifications</Text>
                <Text style={styles.rowMeta}>{notifications ? 'On' : 'Off'} · Kun demo</Text>
              </View>
              <Switch
                accessibilityLabel="Notifications (demo)"
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.green }}
                thumbColor={colors.surface}
              />
            </View>
          </View>
          <Text style={styles.footnote}>Indstillingerne gælder kun her og nulstilles ved genindlæsning. De ændrer ikke dit økonomiske overblik, og der sendes ingen notifikationer.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

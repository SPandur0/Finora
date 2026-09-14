import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { ActionButton } from './FinanceUI';
import { useFinances } from '../context/FinanceContext';
import { months, parseAmount } from '../data/financeData';
import { styles } from '../styles/styles';

function MonthInput({ month, value, onSave }) {
  const [input, setInput] = useState(value === null ? '' : String(value).replace('.', ','));
  const [message, setMessage] = useState('');
  const [invalid, setInvalid] = useState(false);

  function save() {
    const amount = input.trim() === '' ? null : parseAmount(input);
    if (input.trim() !== '' && amount === null) {
      setInvalid(true);
      setMessage('Brug et positivt beløb eller 0, fx 105.000,50. Maks. 999.999.999 kr.');
      return;
    }
    onSave(amount);
    setInvalid(false);
    setMessage(amount === null ? 'Registrering fjernet' : 'Gemt');
  }

  return (
    <View style={styles.entryCard}>
      <Text style={styles.inputLabel}>{month} · kr.</Text>
      <TextInput
        accessibilityLabel={`${month}: Savings + Investments i kroner`}
        value={input}
        onChangeText={text => { setInput(text); setMessage(''); }}
        keyboardType="decimal-pad"
        placeholder="Ikke registreret"
        maxLength={20}
        style={styles.entryInput}
      />
      <ActionButton label="Gem måned" icon="checkmark-outline" secondary onPress={save} />
      {message ? <Text accessibilityLiveRegion="polite" style={invalid ? styles.error : styles.muted}>{message}</Text> : null}
    </View>
  );
}

export default function MonthlySavings() {
  const { monthlySavings, saveMonth } = useFinances();
  return (
    <View>
      <View style={styles.pageHeader}>
        <Text style={styles.sectionTitle}>Monthly Savings History · {new Date().getFullYear()}</Text>
        <Text style={styles.subtitle}>Registrer samlet Savings + Investments for hver måned. Historikken ændrer ikke dine aktuelle konti. Ryd feltet og gem for at fjerne en registrering.</Text>
      </View>
      {months.map((month, index) => (
        <MonthInput key={month} month={month} value={monthlySavings[index]} onSave={amount => saveMonth(index, amount)} />
      ))}
    </View>
  );
}

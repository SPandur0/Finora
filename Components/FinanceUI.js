import { Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from '../styles/styles';
import { money } from '../data/financeData';
export function Icon({
  name,
  color = colors.green,
  size = 22
}) {
  return <Ionicons name={name} size={size} color={color} />;
}
export function PageHeader({
  eyebrow,
  title,
  subtitle
}) {
  return <View style={styles.pageHeader}>
    <Text style={styles.eyebrow}>{eyebrow}</Text>
    <Text style={styles.pageTitle}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>;
}
export function ActionButton({
  label,
  onPress,
  secondary = false,
  icon = 'arrow-forward',
  iconFirst = false
}) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({
    pressed
  }) => [styles.button, secondary && styles.secondaryButton, pressed && styles.pressed]}>
    {iconFirst && <Icon name={icon} color={secondary ? colors.green : '#fff'} size={18} />}
    <Text style={[styles.buttonText, secondary && styles.secondaryButtonText]}>{label}</Text>
    {!iconFirst && <Icon name={icon} color={secondary ? colors.green : '#fff'} size={18} />}
  </Pressable>;
}
export function TransactionRow({
  item
}) {
  return <View style={styles.transactionRow}>
    <View style={[styles.transactionIcon, item.amount > 0 && styles.green]}>
      <Icon name={item.icon} color={item.amount > 0 ? colors.green : colors.ink} size={20} />
    </View>
    <View style={styles.grow}>
      <Text style={styles.rowTitle}>{item.name}</Text>
      <Text style={styles.rowMeta}>{item.category} · {item.date}</Text>
    </View>
    <Text style={[styles.amount, item.amount > 0 && styles.positive]}>{item.amount > 0 ? '+' : '−'}{money(Math.abs(item.amount))}</Text>
  </View>;
}

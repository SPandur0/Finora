import { View, Text } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { history } from '../data/mockData';
import { styles } from '../styles/styles';
export default function BalanceChart() {
  const min = 75000;
  const max = 125000;
  const points = history.map((item, i) => [8 + i * 60, 90 - (item.value - min) / (max - min) * 75]);
  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
  const last = points[points.length - 1];
  return <View accessible accessibilityLabel="Formue fra april til september: 82.200 til 116.650 kroner.">
    <Svg width="100%" height={112} viewBox="0 0 320 110">
      <Defs>
        <LinearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#c9f49b" stopOpacity="0.28" />
          <Stop offset="1" stopColor="#c9f49b" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Path d={`${line} L 308 108 L 8 108 Z`} fill="url(#fill)" />
      <Path d={line} stroke="#ccf5a5" strokeWidth="3" strokeLinejoin="round" fill="none" />
      <Circle cx={last[0]} cy={last[1]} r="5" fill="#ccf5a5" stroke="#244e42" strokeWidth="3" />
    </Svg>
    <View style={styles.chartLabels}>{history.map(item => <Text key={item.month} style={styles.chartLabel}>{item.month}</Text>)}</View>
  </View>;
}

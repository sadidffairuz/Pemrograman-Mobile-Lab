import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { colors } from '@/constants/colors';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Pressable
        style={({ pressed }: { pressed: boolean }) => [styles.heading, pressed && styles.pressedHeading]}
        onPress={() => setIsOpen((value) => !value)}>
        <View style={styles.button}>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            weight="bold"
            tintColor={colors.text}
            style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}
          />
        </View>

        <Text style={styles.titleText}>{title}</Text>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  pressedHeading: {
    opacity: 0.7,
  },
  button: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 12,
    borderRadius: 12,
    marginLeft: 24,
    padding: 16,
  },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

interface SocialAuthButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  onPress,
  disabled,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name="logo-google" size={18} color="#EA4335" />
      </View>
      <Text style={styles.text}>Lanjut dengan Akun Google</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 16,
    gap: 10,
  },
  pressed: {
    backgroundColor: '#F5F6F8',
  },
  disabled: {
    opacity: 0.6,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
});

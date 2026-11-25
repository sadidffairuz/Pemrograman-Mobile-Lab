import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';

interface AuthTabBarProps {
  isRegister: boolean;
  onTabChange: (register: boolean) => void;
}

export const AuthTabBar: React.FC<AuthTabBarProps> = ({
  isRegister,
  onTabChange,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.tab, !isRegister && styles.activeTab]}
        onPress={() => onTabChange(false)}
      >
        <Text style={[styles.tabText, !isRegister && styles.activeTabText]}>
          Masuk
        </Text>
      </Pressable>

      <Pressable
        style={[styles.tab, isRegister && styles.activeTab]}
        onPress={() => onTabChange(true)}
      >
        <Text style={[styles.tabText, isRegister && styles.activeTabText]}>
          Daftar Baru
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#EEF0F5',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: colors.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '800',
  },
});

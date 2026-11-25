import { Alert, Platform } from 'react-native';

export const dialogService = {
  alert: (title: string, message: string, onOk?: () => void): void => {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') {
        window.alert(`${title}\n\n${message}`);
      }
      onOk?.();
      return;
    }

    Alert.alert(
      title,
      message,
      onOk ? [{ text: 'OK', onPress: onOk }] : undefined,
    );
  },

  confirm: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
  ): void => {
    if (Platform.OS === 'web') {
      const confirmed =
        typeof window !== 'undefined'
          ? window.confirm(`${title}\n\n${message}`)
          : true;
      if (confirmed) {
        onConfirm();
      } else {
        onCancel?.();
      }
      return;
    }

    Alert.alert(title, message, [
      {
        text: 'Batal',
        style: 'cancel',
        onPress: onCancel,
      },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: onConfirm,
      },
    ]);
  },
};

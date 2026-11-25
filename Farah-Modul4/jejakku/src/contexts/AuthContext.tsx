
import React, {
  createContext,
  useEffect,
  useState,
} from 'react';

import { supabase } from '../services/auth/supabaseClient';
import { authService } from '../services/auth/authService';

import {
  AuthContextType,
  AuthSession,
  AuthUser,
  LoginCredentials,
  SignUpCredentials,
} from '../types/auth';

// 1. Membuat context
export const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

// 2. Membuat provider
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  // 3. Menyimpan status autentikasi
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 4. Memulihkan session dan memantau perubahan auth
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const currentSession = await authService.getSession();

        if (isMounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }
      } catch (err) {
        if (isMounted) {
          setSession(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Memantau perubahan status autentikasi
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (isMounted) {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          setIsLoading(false);
        }
      }
    );

    initializeAuth();

    // Membersihkan subscription saat komponen dilepas
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // 5. Fungsi login
  const signIn = async (
    credentials: LoginCredentials
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.signIn(credentials);
      return { success: true };
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Gagal masuk ke akun.';

      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  // 6. Fungsi daftar akun
  const signUp = async (
    credentials: SignUpCredentials
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.signUp(credentials);

      setUser(data.user);
      setSession(data.session);

      return { success: true };
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Gagal mendaftar akun.';

      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  // 7. Fungsi logout
  const signOut = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.signOut();

      setUser(null);
      setSession(null);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Gagal keluar dari akun.';

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // 8. Menghapus pesan error
  const clearError = () => {
    setError(null);
  };

  // 9. Membagikan state dan fungsi ke seluruh aplikasi
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

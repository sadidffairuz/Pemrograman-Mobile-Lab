import React, { createContext, useEffect, useState } from 'react';
import { supabase } from '../services/auth/supabaseClient';
import { authService } from '../services/auth/authService';
import {
  AuthContextType,
  AuthSession,
  AuthUser,
  LoginCredentials,
  SignUpCredentials,
} from '../types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const timeoutPromise = new Promise<null>((resolve) =>
          setTimeout(() => resolve(null), 2500),
        );
        const currentSession = await Promise.race([
          authService.getSession(),
          timeoutPromise,
        ]);
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

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (isMounted) {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.signIn(credentials);
      setUser(data.user);
      setSession(data.session);
      return { success: true };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Gagal masuk ke akun.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authService.signUp(credentials);
      setUser(data.user);
      setSession(data.session);
      return { success: true };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Gagal mendaftar akun.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Gagal keluar dari akun.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

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

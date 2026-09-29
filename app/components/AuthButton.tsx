"use client";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { LogIn, LogOut, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import { auth } from "@/utils/config/firebase/firebaseAuthClient";

const googleProvider = new GoogleAuthProvider();

const AuthButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const handleAuth = async () => {
    setError(null);
    setIsLoading(true);

    try {
      if (user) {
        await signOut(auth);
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (authError) {
      if (
        authError &&
        typeof authError === "object" &&
        "code" in authError &&
        authError.code === "auth/popup-closed-by-user"
      ) {
        return;
      }

      setError(
        "Unable to sign in right now. Check that Google Sign-In is enabled in Firebase.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const label = user
    ? `Sign out ${user.displayName ?? user.email ?? ""}`
    : "Sign in with Google";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleAuth}
        disabled={isLoading}
        aria-label={label}
        title={user?.displayName ?? user?.email ?? "Sign in with Google"}
        className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-(--muted-copy) transition-colors hover:bg-(--surface-elevated) hover:text-foreground disabled:cursor-wait disabled:opacity-60"
      >
        {user?.photoURL ? (
          <span
            aria-hidden="true"
            className="h-6 w-6 rounded-full bg-cover bg-center md:h-7 md:w-7"
            style={{ backgroundImage: `url("${user.photoURL}")` }}
          />
        ) : user ? (
          <LogOut className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
        ) : (
          <>
            <UserRound className="h-5 w-5 shrink-0 md:h-6 md:w-6" />
            <span className="hidden text-sm sm:inline">Sign in</span>
            <LogIn className="hidden h-4 w-4 sm:inline" />
          </>
        )}
      </button>

      {error && (
        <p
          role="alert"
          className="absolute right-0 top-full z-10 mt-2 w-64 rounded-lg border border-red-200 bg-background p-3 text-xs text-red-600 shadow-lg"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthButton;

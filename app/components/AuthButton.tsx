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
import { useAuth } from "../../hooks/useAuth";

const googleProvider = new GoogleAuthProvider();

const AuthButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const { user, loading } = useAuth();

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
  const initials = (user?.displayName ?? user?.email ?? "U")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div className="relative hidden md:block">
      <button
        type="button"
        onClick={handleAuth}
        disabled={isLoading}
        aria-label={label}
        title={user?.displayName ?? user?.email ?? "Sign in with Google"}
        className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-(--muted-copy) transition-colors hover:bg-(--surface-elevated) hover:text-foreground disabled:cursor-wait disabled:opacity-60"
      >
        {user ? (
          <>
            {user.photoURL && !avatarFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.photoURL}
                alt=""
                onError={() => setAvatarFailed(true)}
                className="block h-6 w-6 rounded-full object-cover md:h-7 md:w-7"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-(--accent) text-xs font-semibold text-background md:h-7 md:w-7"
              >
                {initials}
              </span>
            )}
            <LogOut className="hidden h-5 w-5 shrink-0 md:block md:h-6 md:w-6" />
          </>
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

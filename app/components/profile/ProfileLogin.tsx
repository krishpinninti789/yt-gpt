"use client";

import { LogIn } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/config/firebase/firebaseAuthClient";

const googleProvider = new GoogleAuthProvider();

const ProfileLogin = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6">
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-(--surface-elevated)">
          <LogIn className="size-7 text-muted-foreground" />
        </div>

        <h1 className="text-xl font-semibold">Sign in to Vidora</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to access your profile, watch history, and other personalized
          features.
        </p>

        <button
          type="button"
          onClick={handleLogin}
          className="mt-6 flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default ProfileLogin;

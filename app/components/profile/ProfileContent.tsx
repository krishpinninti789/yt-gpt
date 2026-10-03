"use client";

import { signOut } from "firebase/auth";
import { Clock3, LogOut, Settings, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

import { auth } from "@/utils/config/firebase/firebaseAuthClient";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const ProfileContent = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      {/* Profile */}
      <section className="flex flex-col items-center text-center">
        <div className="size-24 overflow-hidden rounded-full bg-(--surface-elevated)">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName ?? "Profile"}
              width={100}
              height={100}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <UserRound className="size-10 text-muted-foreground" />
            </div>
          )}
        </div>

        <h1 className="mt-4 text-xl font-semibold">
          {user.displayName ?? "Vidora User"}
        </h1>

        {user.email && (
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        )}
      </section>

      {/* Actions */}
      <section className="mt-8 space-y-2">
        <button
          type="button"
          onClick={() => router.push("/history")}
          className="flex w-full items-center gap-4 rounded-xl p-4 text-left transition-colors hover:bg-(--surface-elevated)"
        >
          <Clock3 className="size-5" />

          <div>
            <p className="text-sm font-medium">History</p>

            <p className="text-xs text-muted-foreground">
              View your watch history
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-4 rounded-xl p-4 text-left text-red-400 transition-colors hover:bg-red-500/10"
        >
          <LogOut className="size-5" />

          <div>
            <p className="text-sm font-medium">Sign out</p>

            <p className="text-xs text-muted-foreground">
              Sign out of your Vidora account
            </p>
          </div>
        </button>
      </section>
    </div>
  );
};

export default ProfileContent;

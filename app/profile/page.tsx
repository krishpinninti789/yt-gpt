"use client";

import ProfileContent from "@/app/components/profile/ProfileContent";
import ProfileLoading from "@/app/components/profile/ProfileLoading";
import ProfileLogin from "@/app/components/profile/ProfileLogin";
import { useAuth } from "@/hooks/useAuth";

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <ProfileLoading />;
  }

  if (!user) {
    return <ProfileLogin />;
  }

  return <ProfileContent />;
};

export default ProfilePage;

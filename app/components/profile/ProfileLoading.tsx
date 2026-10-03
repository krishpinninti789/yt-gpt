const ProfileLoading = () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <div className="animate-pulse">
        <div className="mx-auto size-24 rounded-full bg-(--surface-elevated)" />

        <div className="mx-auto mt-4 h-5 w-40 rounded bg-(--surface-elevated)" />

        <div className="mx-auto mt-2 h-4 w-56 rounded bg-(--surface-elevated)" />

        <div className="mt-8 space-y-3">
          <div className="h-16 rounded-xl bg-(--surface-elevated)" />
          <div className="h-16 rounded-xl bg-(--surface-elevated)" />
          <div className="h-16 rounded-xl bg-(--surface-elevated)" />
        </div>
      </div>
    </div>
  );
};

export default ProfileLoading;

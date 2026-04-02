import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-card ring-1 ring-black/[0.03]">
      <div className="mb-6 flex flex-col gap-y-1">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500">
          Manage your account preferences and personal information.
        </p>
      </div>

      <div className="flex w-full items-start justify-center pb-10">
        <UserProfile 
          routing="hash"
          appearance={{
            elements: {
              rootBox: "w-full focus:outline-none",
              card: "w-full max-w-full shadow-none border-none",
              navbar: "hidden md:flex",
            }
          }}
        />
      </div>
    </div>
  );
}

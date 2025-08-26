import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <SignIn appearance={{ variables: { colorPrimary: "#6c47ff" } }} />
    </div>
  );
}

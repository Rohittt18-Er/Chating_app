import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

const Settings = () => {
  return (
    <>
      <h1>Settings Page</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="action">Logout</button>
      </form>
    </>
  );
};

export default Settings;

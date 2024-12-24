import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignupForm";
import { useState } from "react";

const LoginPage = () => {
  const [openTab, setOpenTab] = useState("login");

  const handleSetOpenTab = (value: string) => setOpenTab(value);

  return (
    <>
      <div className="flex w-full flex-col items-center h-full justify-center mt-28">
        <Tabs
          value={`${openTab}`}
          className="w-[400px] border-2 p-4 border-primary/20"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              onClick={() => handleSetOpenTab("login")}
              value="login"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleSetOpenTab("signUp")}
              value="signUp"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signUp">
            <SignUpForm setOpenTab={setOpenTab} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default LoginPage;

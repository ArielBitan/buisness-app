import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "@/services/user.service";
import PlanSelector from "../PlanSelector";

interface SignupFormProps {
  setOpenTab: (value: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ setOpenTab }) => {
  const { toast } = useToast();
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    plan: "default", // Default selected plan
  });
  const [error, setError] = useState("");

  const signUpMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast({
        title: "Signed up successfully",
        description: `Please log in`,
      });
      setOpenTab("login");
    },
    onError: (error: any) => {
      if (error.response) {
        const errorMessage =
          error.response?.data?.message ||
          "Already used email/username, please log in";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    },
  });

  const handleSignUpSubmit = () => {
    signUpMutation.mutate(signUpData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="p-4">Register</CardTitle>
        <CardDescription className="p-4">
          Please enter email, password, and select a plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={signUpData.email}
            onChange={(e) =>
              setSignUpData({ ...signUpData, email: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={signUpData.password}
            onChange={(e) =>
              setSignUpData({ ...signUpData, password: e.target.value })
            }
          />
        </div>
        <PlanSelector
          selectedPlan={signUpData.plan}
          setSelectedPlan={(plan) => setSignUpData({ ...signUpData, plan })}
        />
      </CardContent>
      <div className="text-red-600 pb-4">{error}</div>
      <CardFooter>
        <Button
          onClick={handleSignUpSubmit}
          disabled={signUpMutation.isPending}
        >
          {signUpMutation.isPending ? "Signing up..." : "Sign Up"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;

import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser } from "@/services/user.service";
import { useUser } from "@/context/userContext";

const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // React Query mutation for login
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { user } = data;
      toast({
        title: "Logged in successfully",
        description: `Welcome back ${user.name}!`,
      });
      navigate("/");
      setUser(user);
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Incorrect email or password.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    },
  });

  const handleLoginSubmit = () => {
    if (!loginData.email || !loginData.password) {
      setError("Please fill in both email and password.");
      return;
    }
    setError("");
    loginMutation.mutate(loginData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="p-4">Welcome Back!</CardTitle>
        <CardDescription className="p-4">
          Please enter your email and password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            placeholder="Enter your email"
            required
            aria-invalid={error ? "true" : "false"}
            aria-describedby="email-error"
          />
          {error && (
            <p id="email-error" className="text-red-600 text-sm">
              {error}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            placeholder="Enter your password"
            required
            aria-invalid={error ? "true" : "false"}
            aria-describedby="password-error"
          />
          {error && (
            <p id="password-error" className="text-red-600 text-sm">
              {error}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleLoginSubmit}
          disabled={loginMutation.isPending}
          className="w-full"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;

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
import { useNavigate } from "react-router-dom";

import api from "@/lib/api";
import axios from "axios";

const LoginForm = () => {
  const { toast } = useToast();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    if (!loginData.username || !loginData.password) {
      setError("Please fill in both username and password.");
      return;
    }

    try {
      const response = await api.post("/user/login", loginData);
      const { _id, username, email, profilePic } = response.data;
      toast({
        title: "Logged in successfully",
        description: `Welcome back ${username}!`,
      });
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Incorrect username or password.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="p-4">Welcome ! </CardTitle>
        <CardDescription className="p-4">
          Please enter your username and password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
          />
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
          />
        </div>
      </CardContent>
      <div className="text-red-600 pb-4">{error}</div>
      <CardFooter>
        <Button onClick={handleLoginSubmit}>Login</Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;

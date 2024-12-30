import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createBusiness } from "@/services/business.service";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/userContext";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  image: z.string().url({
    message: "Please provide a valid image URL.",
  }),
});

export const PLAN_LIMITS = {
  Default: 0,
  Standard: 5,
  Gold: 10,
  Platinum: 20,
};

export const CreateBusinessForm = () => {
  const { user } = useUser();
  if (!user) {
    return;
  }
  const planLimit = PLAN_LIMITS[user.plan];
  const remainingPosts = planLimit - user.businessCount;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      image: "",
    },
  });

  const navigate = useNavigate();

  const createNewBusiness = useMutation({
    mutationFn: createBusiness,
    onSuccess: () => {
      navigate("/businesses");
    },
    onError: (error) => {
      console.error("Error creating business:", error);
    },
  });

  const onSubmit = (data: any) => {
    createNewBusiness.mutate(data);
  };
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Welcome, {user.email}!</h2>
        <p>
          Plan: {user.plan} <br />
          Remaining posts: {remainingPosts}/{planLimit}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input placeholder="Business Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Business Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Category Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {remainingPosts > 0 ? (
            <Button type="submit">Submit</Button>
          ) : (
            <Button disabled={true}>
              You've reached your business limit , please upgrade plan
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};

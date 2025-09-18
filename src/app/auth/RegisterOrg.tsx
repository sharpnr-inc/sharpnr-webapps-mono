import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type React from "react";
import { useState } from "react";
import OrgRegistrationOTPVerification from "@/components/register_comp/RegisterOtpVerication";
import { motion, AnimatePresence } from "framer-motion";
import { fetchOrgTypeList } from "@/api_service/utility_api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerOrganisation } from "@/api_service/RegisterOrg";
import {
  ZodOrgRegsitrationSchema,
  type RegisterOrganizationRequestPayload,
} from "@/interfaces/registerOrg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/context/ModalContext"; // ✅ import context

export default function RegisterOrganization(): React.JSX.Element {
  const [showOtp, setShowOtp] = useState(false);
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const { showModal } = useModal(); // ✅ use modal context

  // 🔹 Fetch org types
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orgTypes"],
    queryFn: fetchOrgTypeList,
  });

  const orgTypes =
    data?.orgTypes?.map((type: string) => ({
      id: type,
      name: type.charAt(0) + type.slice(1).toLowerCase(),
    })) ?? [];

  // 🔹 Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterOrganizationRequestPayload>({
    resolver: zodResolver(ZodOrgRegsitrationSchema),
  });

  // 🔹 Mutation
  const mutation = useMutation({
    mutationFn: registerOrganisation,
    onSuccess: () => {
      showModal("success", "Organization registered successfully 🎉");
      setShowOtp(true);
    },
    onError: (error: any) => {
      console.error("Registration failed:", error);
      const message =
        error?.response?.data?.message || "Something went wrong. Try again!";
      showModal("error", message);
    },
  });

  const onSubmit = (formData: RegisterOrganizationRequestPayload) => {
    // inject orgType into payload
    mutation.mutate({ ...formData, OrgType: selectedType || "" });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <AnimatePresence mode="wait">
        {showOtp ? (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg"
          >
            <OrgRegistrationOTPVerification />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="w-xl"
          >
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Register Organization</CardTitle>
                <CardDescription>
                  Create a new organization account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input
                      id="org-name"
                      placeholder="Acme Inc."
                      {...register("Name")}
                    />
                    {errors.Name && (
                      <p className="text-red-500 text-sm">
                        {errors.Name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2 w-full">
                    <Label htmlFor="org-type">Type of Organization</Label>
                    {isLoading ? (
                      <p className="text-sm text-gray-500">Loading...</p>
                    ) : isError ? (
                      <p className="text-sm text-red-500">
                        Failed to load org types
                      </p>
                    ) : (
                      <Select
                        value={selectedType}
                        onValueChange={(val) => setSelectedType(val)}
                      >
                        <SelectTrigger id="org-type" className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {orgTypes.map((type: any) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("Email")}
                    />
                    {errors.Email && (
                      <p className="text-red-500 text-sm">
                        {errors.Email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="9828823314"
                      {...register("Phone")}
                    />
                    {errors.Phone && (
                      <p className="text-red-500 text-sm">
                        {errors.Phone.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("Password")}
                    />
                    {errors.Password && (
                      <p className="text-red-500 text-sm">
                        {errors.Password.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Registering..." : "Register"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

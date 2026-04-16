import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAppUserProfile } from "@/api/queries";

interface AppUserProfilePageProps {}

const AppUserProfilePage: React.FC<AppUserProfilePageProps> = () => {
  const { data: employeeProfileData, isLoading, isError } = useAppUserProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading profile</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="flex items-center gap-6 p-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl">AR</AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
              {employeeProfileData?.data.first_name +
                " " +
                employeeProfileData?.data.last_name || "Name Not Available"}
            </h2>
            <div className="flex items-center gap-2">
              <Badge>Administrator</Badge>
              <Badge variant="secondary">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {employeeProfileData?.data.email || "Email Not Available"}
            </p>
          </div>

          <div className="ml-auto">
            <Button>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Basic account details and identity information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User ID</span>
              <span>USR-10239</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Department</span>
              <span>Engineering</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role</span>
              <span>System Administrator</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span>12 Jan 2023</span>
            </div>
          </CardContent>
        </Card>

        {/* Organization Details */}
        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
            <CardDescription>
              Corporate and workspace association
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Organization</span>
              <span>Acme Corporation</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Workspace ID</span>
              <span>ORG-ACME-01</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span>Mumbai, India</span>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Authentication and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Two-Factor Authentication
              </span>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Login</span>
              <span>10 Feb 2026, 09:42 AM</span>
            </div>
            <Separator />
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>
              Recent system activity and audit logs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>• Approved access request for Finance team</div>
            <div>• Updated role permissions</div>
            <div>• Logged in from new device</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppUserProfilePage;

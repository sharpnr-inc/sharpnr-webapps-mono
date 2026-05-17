import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@sharpnr/ui";
import { Badge } from "@sharpnr/ui";
import { Button } from "@sharpnr/ui";
import { Separator } from "@sharpnr/ui";

interface AdminRequestPageProps {}

const AdminRequestPage: React.FC<AdminRequestPageProps> = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold">Team Requests</h1>
        <p className="text-sm text-muted-foreground">
          Review and manage team requests such as leave, access permissions, and
          other approvals.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">6</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">4</div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Incoming Requests</CardTitle>
          <CardDescription>Requests submitted by team members</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Request Row */}
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div className="space-y-1">
                <div className="font-medium">Arjun Rao</div>
                <div className="text-sm text-muted-foreground">
                  Leave Request — 12 Feb to 15 Feb
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="secondary">Pending</Badge>
                <Button size="sm">Approve</Button>
                <Button size="sm" variant="destructive">
                  Reject
                </Button>
              </div>
            </div>

            <Separator />

            {/* Another Request */}
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div className="space-y-1">
                <div className="font-medium">Priya Sharma</div>
                <div className="text-sm text-muted-foreground">
                  Access Request — Finance Dashboard
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge>Approved</Badge>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between border rounded-lg p-4">
              <div className="space-y-1">
                <div className="font-medium">Rahul Mehta</div>
                <div className="text-sm text-muted-foreground">
                  Leave Request — 18 Feb
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="destructive">Rejected</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRequestPage;

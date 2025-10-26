"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  MODULE_PERMISSION_TYPES,
  PRIVILEGES,
  PERMISSION_TYPES,
  type ModulePermissionType,
  type ModulePrivilege,
  type Section,
} from "../test/dd";

// State for each module's permissions
interface ModuleState {
  type: ModulePermissionType;
  sectionsVisible: boolean;
  permissions: Record<
    string, // section name
    Record<string, Record<string, boolean>> // submodule -> permission -> boolean
  >;
}

// Fake Employee type
interface Employee {
  id: string;
  name: string;
  role: string;
  modulePermissions: Record<string, ModuleState>; // module_id -> ModuleState
}

// Sample employee
const SAMPLE_EMPLOYEE: Employee = {
  id: "emp_01",
  name: "John Doe",
  role: "Manager",
  modulePermissions: {}, // will initialize dynamically
};

export default function EmployeePrivilegeManager() {
  const [employee, setEmployee] = useState<Employee>(() => {
    const modulePermissions: Record<string, ModuleState> = {};

    PRIVILEGES.forEach((mod) => {
      const sections: Section[] = mod[mod.module_id] as Section[] || [];

      modulePermissions[mod.module_id] = {
        type: "NONE",
        sectionsVisible: false,
        permissions: {},
      };

      sections.forEach((section) => {
        modulePermissions[mod.module_id].permissions[section.section] = {};
        section.modules.forEach((submodule) => {
          modulePermissions[mod.module_id].permissions[section.section][submodule] = {};
          PERMISSION_TYPES.forEach((perm) => {
            modulePermissions[mod.module_id].permissions[section.section][submodule][perm] = false;
          });
        });
      });
    });

    return { ...SAMPLE_EMPLOYEE, modulePermissions };
  });

  const [editing, setEditing] = useState(false);

  const handleModuleTypeChange = (moduleId: string, type: ModulePermissionType) => {
    setEmployee((prev) => {
      const newState = { ...prev };
      const module = newState.modulePermissions[moduleId];
      const sections = Object.keys(module.permissions);

      if (type === "FULL") {
        sections.forEach((section) => {
          Object.keys(module.permissions[section]).forEach((submodule) => {
            PERMISSION_TYPES.forEach((perm) => {
              module.permissions[section][submodule][perm] = true;
            });
          });
        });
        module.sectionsVisible = false;
      } else if (type === "PARTIAL") {
        sections.forEach((section) => {
          Object.keys(module.permissions[section]).forEach((submodule) => {
            PERMISSION_TYPES.forEach((perm) => {
              module.permissions[section][submodule][perm] = false;
            });
          });
        });
        module.sectionsVisible = true;
      } else if (type === "NONE") {
        sections.forEach((section) => {
          Object.keys(module.permissions[section]).forEach((submodule) => {
            PERMISSION_TYPES.forEach((perm) => {
              module.permissions[section][submodule][perm] = false;
            });
          });
        });
        module.sectionsVisible = false;
      }

      module.type = type;
      return newState;
    });
  };

  const handlePermissionToggle = (
    moduleId: string,
    section: string,
    submodule: string,
    perm: string
  ) => {
    setEmployee((prev) => {
      const newState = { ...prev };
      newState.modulePermissions[moduleId].permissions[section][submodule][perm] =
        !newState.modulePermissions[moduleId].permissions[section][submodule][perm];
      return newState;
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md border border-muted rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{employee.name}</h2>
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {editing ? "Close" : "Edit Privilege Policy"}
          </button>
        </div>

        {!editing && (
          <div className="space-y-4">
            {PRIVILEGES.map((privilege) => {
              const moduleState = employee.modulePermissions[privilege.module_id];
              return (
                <Card key={privilege.module_id} className="border border-muted rounded-lg p-3">
                  <CardTitle className="font-semibold">{privilege.module_name}</CardTitle>
                  <CardContent>
                    {Object.keys(moduleState.permissions).map((sectionName) => (
                      <div key={sectionName}>
                        <div className="font-medium">{sectionName}</div>
                        <div className="flex flex-wrap gap-4">
                          {Object.keys(moduleState.permissions[sectionName]).map(
                            (submodule) => (
                              <div key={submodule}>
                                <div className="font-medium">{submodule}</div>
                                <div className="flex gap-2">
                                  {PERMISSION_TYPES.map((perm) => (
                                    <span key={perm} className="text-sm">
                                      {moduleState.permissions[sectionName][submodule][perm]
                                        ? perm
                                        : "-"}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {editing && (
          <div className="space-y-6">
            {PRIVILEGES.map((privilege) => {
              const moduleId = privilege.module_id;
              const moduleData = employee.modulePermissions[moduleId];
              const sections: Section[] = privilege[moduleId] as Section[] || [];

              return (
                <Card
                  key={moduleId}
                  className="shadow-sm border border-muted rounded-xl"
                >
                  <CardHeader className="flex justify-between items-center pb-2">
                    <CardTitle className="text-lg font-semibold">
                      {privilege.module_name}
                    </CardTitle>
                    <Select
                      value={moduleData.type}
                      onValueChange={(value) =>
                        handleModuleTypeChange(moduleId, value as ModulePermissionType)
                      }
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Select Permission" />
                      </SelectTrigger>
                      <SelectContent>
                        {MODULE_PERMISSION_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardHeader>

                  {moduleData.sectionsVisible && (
                    <CardContent className="space-y-4">
                      {sections.map((section) => (
                        <div key={section.section}>
                          <div className="font-medium text-md mb-2">
                            {section.section}
                          </div>
                          <div className="flex flex-col gap-2">
                            {section.modules.map((submodule) => (
                              <div
                                key={submodule}
                                className="flex flex-wrap gap-4 items-center"
                              >
                                <span className="font-medium">{submodule}</span>
                                {PERMISSION_TYPES.map((perm) => (
                                  <label
                                    key={perm}
                                    className="flex items-center gap-2 text-sm text-muted-foreground"
                                  >
                                    <Checkbox
                                      checked={
                                        moduleData.permissions[section.section][submodule][perm]
                                      }
                                      onCheckedChange={() =>
                                        handlePermissionToggle(
                                          moduleId,
                                          section.section,
                                          submodule,
                                          perm
                                        )
                                      }
                                    />
                                    {perm}
                                  </label>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

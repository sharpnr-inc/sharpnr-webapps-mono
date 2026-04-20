import React from "react";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType;
  to: string;
}

export interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
  isSubSection?: boolean;
}

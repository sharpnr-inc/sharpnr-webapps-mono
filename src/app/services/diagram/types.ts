export interface LabelNodeData extends Record<string, unknown> {
  label: string;
  sub?: string;
}

export interface CoreNodeData extends Record<string, unknown> {
  label: string;
  sub: string;
}

export interface ServiceNodeData extends Record<string, unknown> {
  label: string;
  items: string[];
}

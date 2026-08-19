/** Where the floating launcher sits on screen. */
export type IvaPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export type IvaRole = "user" | "assistant";

export interface IvaMessage {
  id: string;
  role: IvaRole;
  /** Plain text for now -- rich content comes with the real backend. */
  text: string;
  at: number;
}

export interface IvaContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  messages: IvaMessage[];
  /** Push a user message and get a (currently canned) assistant reply. */
  send: (text: string) => void;
  clear: () => void;
  isTyping: boolean;
  unread: number;
  assistantName: string;
  suggestions: string[];
  position: IvaPosition;
}

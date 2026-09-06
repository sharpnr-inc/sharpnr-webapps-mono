// No CSS is imported here on purpose. This package is consumed as source, so
// importing ./index.css would make every app compile a second Tailwind build.
// Apps instead pull in the design tokens and scan this package for classes:
//
//   @import "@sharpnr/ui/theme.css";
//   @source "../../../packages/ui/src";

/* -------------------------------------------------------------------------- */
/*                             ShadcnUI Component                             */
/* -------------------------------------------------------------------------- */

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./components/ui/command";

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
} from "./components/ui/button-group";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./components/ui/sidebar";

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./components/ui/sheet";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

export {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "./components/ui/alert";

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./components/ui/input-group";

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./components/ui/empty";

export {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./components/ui/hover-card";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./components/ui/popover";

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

export { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
export { Switch } from "./components/ui/switch";
export { Spinner } from "./components/ui/spinner";
export { Badge, badgeVariants } from "./components/ui/badge";
export { Separator } from "./components/ui/separator";
export { Textarea } from "./components/ui/textarea";
export { Toaster } from "./components/ui/sonner";
export { toast } from "sonner";
export { Input } from "./components/ui/input";
export { Skeleton } from "./components/ui/skeleton";
export { Kbd, KbdGroup } from "./components/ui/kbd";
export { Button, buttonVariants } from "./components/ui/button";
export { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
export { Checkbox } from "./components/ui/checkbox";
export { Label } from "./components/ui/label";
export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./components/ui/avatar";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "./components/ui/carousel";
export type { CarouselApi } from "./components/ui/carousel";

/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */

export { cn } from "./lib/utils";

/* -------------------------------------------------------------------------- */
/*                        Custome Sharpnr UI component                        */
/* -------------------------------------------------------------------------- */

export { GlobalLoader } from "./components/ui/GlobalLoader";
export { GlobalErrorPage } from "./components/ui/global-err";
export { NotFound } from "./components/ui/404Page";
export { SharpnrSidebarFooter } from "./components/ui/SharpnrSidebarFooter";
export type { SharpnrSidebarFooterProps } from "./components/ui/SharpnrSidebarFooter";

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                    ShadcnUI Components (full registry)                     */
/* -------------------------------------------------------------------------- */

export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";

export {
  AspectRatio,
} from "./components/ui/aspect-ratio";

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "./components/ui/attachment";

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb";

export {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "./components/ui/bubble";

export {
  Calendar,
  CalendarDayButton,
} from "./components/ui/calendar";

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "./components/ui/chart";

export type {
  ChartConfig,
} from "./components/ui/chart";

export {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "./components/ui/combobox";

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./components/ui/context-menu";

export {
  DirectionProvider,
  useDirection,
} from "./components/ui/direction";

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "./components/ui/drawer";

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./components/ui/field";

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./components/ui/input-otp";

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "./components/ui/item";

export {
  Marker,
  MarkerContent,
  MarkerIcon,
  markerVariants,
} from "./components/ui/marker";

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./components/ui/menubar";

export {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "./components/ui/message-scroller";

export {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "./components/ui/message";

export {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "./components/ui/native-select";

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./components/ui/navigation-menu";

export {
  Progress,
} from "./components/ui/progress";

export {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "./components/ui/questionnaire";

export {
  RadioGroup,
  RadioGroupItem,
} from "./components/ui/radio-group";

export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";

export {
  Slider,
} from "./components/ui/slider";

export {
  ToggleGroup,
  ToggleGroupItem,
} from "./components/ui/toggle-group";

export {
  Toggle,
  toggleVariants,
} from "./components/ui/toggle";

export { useIsMobile } from "./hooks/use-mobile";
export { SheetProvider, useSheet } from "./hooks/useSheets";
export { ModalProvider, useModal } from "./hooks/useModal";
export type {
  ModalSize,
  OpenModalOptions,
  ModalContextValue,
} from "./hooks/useModal";
export { ThemeProvider, useTheme } from "./hooks/theme-provider";
export { ModeToggle } from "./hooks/ThemeToggle";

/* ── Shared app chrome (header + launcher) ─────────────────
   Moved out of each app's src/components so the six apps that
   render them share one implementation. App-specific data
   (user, logout, routing) is injected via props. */
export { NotificationBell } from "./components/header/NotificationButton";
export { useUserCardStore } from "./components/header/user_card_store";
export { UserCard } from "./components/header/UserCard";
export type { UserCardProps, UserCardUser } from "./components/header/UserCard";
export { default as SharpnrLauncher } from "./components/launcher/SharpnrLauncher";
export type { SharpnrLauncherProps } from "./components/launcher/SharpnrLauncher";
export {
  LAUNCHER_SECTIONS,
  type LauncherItem,
  type LauncherSection,
} from "./components/launcher/launcher.config";

export { AppShell } from "./components/layout/AppShell";
export type { AppShellProps } from "./components/layout/AppShell";

/* ── Public marketing sites ────────────────────────────────
   Every app under apps/ (except docs and sharp-auth) ships a
   public website, and all of them end on the same footer and
   the same "works with" section. Both are driven entirely by
   the app registry in ./components/website/ecosystem.ts,
   which reads its URLs from @sharpnr/env -- so a sibling app
   URL is never written by hand on a landing page. */
export { WebsiteHeader } from "./components/website/WebsiteHeader";
export type {
  WebsiteHeaderProps,
  WebsiteNavItem,
  WebsiteVisitor,
} from "./components/website/WebsiteHeader";
export {
  DefinitionRows,
  PlatformStrip,
  PointList,
  WebsiteClosing,
  WebsiteHero,
  WebsiteSection,
} from "./components/website/sections";
export type {
  DefinitionRow,
  DefinitionRowsProps,
  Point,
  PointListProps,
  WebsiteClosingProps,
  WebsiteHeroProps,
  WebsiteSectionProps,
} from "./components/website/sections";
export { WebsiteFooter } from "./components/website/Footer";
export type { WebsiteFooterProps } from "./components/website/Footer";
export { EcosystemSection } from "./components/website/EcosystemSection";
export type {
  EcosystemLink,
  EcosystemSectionProps,
} from "./components/website/EcosystemSection";
export { Reveal, RevealGroup, DrawPath } from "./components/website/motion";
export {
  Diagram,
  DArrowDefs,
  DLabel,
  DNode,
} from "./components/website/diagram";
export type { DiagramProps } from "./components/website/diagram";
export { TextureLayer } from "./components/website/texture";
export type { TextureLayerProps } from "./components/website/texture";
export { FlowLine } from "./components/website/FlowLine";
export type { FlowLineProps, FlowStep } from "./components/website/FlowLine";
export {
  ECOSYSTEM_APPS,
  ECOSYSTEM_GROUPS,
  ecosystemApp,
  ecosystemGroup,
} from "./components/website/ecosystem";
export type {
  EcosystemApp,
  EcosystemAppId,
  EcosystemGroupId,
} from "./components/website/ecosystem";

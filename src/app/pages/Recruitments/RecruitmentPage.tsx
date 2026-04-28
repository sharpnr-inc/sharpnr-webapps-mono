import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Camera, ArrowLeft, ArrowRight, Check } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SECTIONS = [
  "Profile",
  "Personal",
  "Address",
  "Employment",
  "Bank & PF",
  "Emergency",
] as const;

// ─── Field wrapper ────────────────────────────────────────────────────────────
function F({
  label,
  id,
  children,
  className = "",
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <Label
        htmlFor={id}
        className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
        {step}
      </span>
      <h2 className="text-sm font-semibold tracking-wide">{title}</h2>
      <div className="flex-1 h-px bg-border/60" />
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepIndicator({
  current,
  total,
  labels,
}: {
  current: number;
  total: number;
  labels: readonly string[];
}) {
  return (
    <div className="flex items-center gap-0">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center">
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300
                ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                      ? "bg-primary/15 text-primary ring-2 ring-primary/30"
                      : "bg-muted text-muted-foreground/50"
                }`}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span
              className={`ml-1.5 hidden text-xs font-medium sm:inline transition-colors
              ${active ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/40"}`}
            >
              {labels[i]}
            </span>
            {i < total - 1 && (
              <div
                className={`mx-2 sm:mx-3 h-px w-6 sm:w-10 transition-colors duration-300 ${done ? "bg-primary/60" : "bg-border/60"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Avatar upload ────────────────────────────────────────────────────────────
function AvatarUpload({
  preview,
  onChange,
}: {
  preview: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <div className="relative shrink-0">
        <div className="h-20 w-20 overflow-hidden rounded-2xl bg-muted ring-1 ring-border">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Camera className="h-6 w-6 text-muted-foreground/40" />
            </div>
          )}
        </div>
        <label
          htmlFor="profileImage"
          className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
        >
          <Camera className="h-3 w-3" />
        </label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
        />
      </div>

      <div>
        <p className="text-sm font-medium">Profile photo</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          JPG, PNG or GIF · max 5 MB
        </p>
        <label
          htmlFor="profileImage"
          className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border/80 px-2.5 py-1 text-xs font-medium hover:bg-muted transition-colors"
        >
          Choose file
        </label>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function RecruitmentAddEmployeePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [hasOnlineAccess, setOnline] = useState(false);
  const [step, setStep] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const isLast = step === SECTIONS.length - 1;

  // slide direction
  const [dir, setDir] = useState(1);
  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-10 flex flex-col gap-8">
        {/* ── Title ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: CUBIC }}
        >
          <h1 className="text-xl font-bold tracking-tight">Add employee</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete all sections to register a new employee.
          </p>
        </motion.div>

        {/* ── Step indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05, ease: CUBIC }}
        >
          <StepIndicator
            current={step}
            total={SECTIONS.length}
            labels={SECTIONS}
          />
        </motion.div>

        {/* ── Form panels ── */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -32 }}
              transition={{ duration: 0.28, ease: CUBIC }}
              className="flex flex-col gap-6"
            >
              {/* ── 0: Profile ── */}
              {step === 0 && (
                <>
                  <SectionHeading step={1} title="Profile & access" />
                  <AvatarUpload
                    preview={preview}
                    onChange={handleImageChange}
                  />

                  <Separator className="opacity-50" />

                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <p className="text-sm font-medium">System access</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Allow this employee to log in to the portal.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Switch
                        id="accessSwitch"
                        checked={hasOnlineAccess}
                        onCheckedChange={setOnline}
                      />
                      <Label
                        htmlFor="accessSwitch"
                        className="text-xs font-medium cursor-pointer whitespace-nowrap"
                      >
                        {hasOnlineAccess ? "Enabled" : "Disabled"}
                      </Label>
                    </div>
                  </div>

                  <AnimatePresence>
                    {hasOnlineAccess && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: CUBIC }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-1">
                          <F label="Username" id="username">
                            <Input id="username" placeholder="aarav.sharma" />
                          </F>
                          <F label="Password" id="password">
                            <Input
                              id="password"
                              type="password"
                              placeholder="••••••••"
                            />
                          </F>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}

              {/* ── 1: Personal ── */}
              {step === 1 && (
                <>
                  <SectionHeading step={2} title="Personal information" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <F
                      label="Full name"
                      id="fullName"
                      className="sm:col-span-2"
                    >
                      <Input id="fullName" placeholder="Aarav Sharma" />
                    </F>
                    <F label="Email" id="email">
                      <Input
                        id="email"
                        type="email"
                        placeholder="aarav@example.com"
                      />
                    </F>
                    <F label="Phone" id="phone">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                      />
                    </F>
                    <F label="Date of birth" id="dob">
                      <Input id="dob" type="date" />
                    </F>
                    <F label="Marital status">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Single", "Married", "Divorced", "Widowed"].map(
                            (v) => (
                              <SelectItem key={v} value={v.toLowerCase()}>
                                {v}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </F>
                    <F label="Highest qualification" id="qualification">
                      <Input
                        id="qualification"
                        placeholder="B.Tech Computer Science"
                      />
                    </F>
                    <F label="University / institute" id="university">
                      <Input id="university" placeholder="IIT Delhi" />
                    </F>
                    <F label="Year of passing" id="yearOfPassing">
                      <Input
                        id="yearOfPassing"
                        type="number"
                        placeholder="2021"
                      />
                    </F>
                    <F label="Grade / percentage" id="grade">
                      <Input id="grade" placeholder="8.5 CGPA" />
                    </F>
                  </div>
                </>
              )}

              {/* ── 2: Address ── */}
              {step === 2 && (
                <>
                  <SectionHeading step={3} title="Residential address" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <F
                      label="Street address"
                      id="address"
                      className="sm:col-span-2"
                    >
                      <Textarea
                        id="address"
                        placeholder="123 MG Road, Indiranagar"
                        rows={2}
                        className="resize-none"
                      />
                    </F>
                    <F label="City" id="city">
                      <Input id="city" placeholder="Bengaluru" />
                    </F>
                    <F label="State" id="state">
                      <Input id="state" placeholder="Karnataka" />
                    </F>
                    <F label="Pin code" id="pincode">
                      <Input id="pincode" placeholder="560001" />
                    </F>
                    <F label="Country" id="country">
                      <Input
                        id="country"
                        placeholder="India"
                        defaultValue="India"
                      />
                    </F>
                  </div>
                </>
              )}

              {/* ── 3: Employment ── */}
              {step === 3 && (
                <>
                  <SectionHeading step={4} title="Employment details" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <F label="Designation" id="designation">
                      <Input id="designation" placeholder="Senior Designer" />
                    </F>
                    <F label="Department" id="department">
                      <Input id="department" placeholder="Design & UX" />
                    </F>
                    <F label="Joining date" id="joinDate">
                      <Input id="joinDate" type="date" />
                    </F>
                    <F label="Employment type">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Full-time", "Part-time", "Contract", "Intern"].map(
                            (v) => (
                              <SelectItem key={v} value={v.toLowerCase()}>
                                {v}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </F>
                    <F label="Reporting manager" id="manager">
                      <Input id="manager" placeholder="Arjun Mehta" />
                    </F>
                    <F label="Work location" id="location">
                      <Input id="location" placeholder="Noida HQ" />
                    </F>
                  </div>
                </>
              )}

              {/* ── 4: Bank & PF ── */}
              {step === 4 && (
                <>
                  <SectionHeading step={5} title="Bank & PF details" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <F label="Bank name" id="bankName">
                      <Input id="bankName" placeholder="HDFC Bank" />
                    </F>
                    <F label="Account number" id="accountNumber">
                      <Input id="accountNumber" placeholder="1234567890" />
                    </F>
                    <F label="IFSC code" id="ifsc">
                      <Input id="ifsc" placeholder="HDFC0001234" />
                    </F>
                    <F label="Branch" id="branch">
                      <Input id="branch" placeholder="MG Road" />
                    </F>
                  </div>

                  <Separator className="opacity-50" />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <F label="UAN number" id="uan">
                      <Input id="uan" placeholder="100987654321" />
                    </F>
                    <F label="PF account number" id="pfNumber">
                      <Input id="pfNumber" placeholder="DL/12345/67890" />
                    </F>
                  </div>
                </>
              )}

              {/* ── 5: Emergency ── */}
              {step === 5 && (
                <>
                  <SectionHeading step={6} title="Emergency contact" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <F label="Full name" id="emergencyName">
                      <Input id="emergencyName" placeholder="Priya Sharma" />
                    </F>
                    <F label="Relationship" id="relation">
                      <Input id="relation" placeholder="Wife" />
                    </F>
                    <F label="Phone" id="emergencyPhone">
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        placeholder="+91 98765 43210"
                      />
                    </F>
                    <F label="Email" id="emergencyEmail">
                      <Input
                        id="emergencyEmail"
                        type="email"
                        placeholder="priya@example.com"
                      />
                    </F>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            className="gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Button>

          <span className="text-xs text-muted-foreground tabular-nums">
            {step + 1} / {SECTIONS.length}
          </span>

          {isLast ? (
            <Button size="sm" className="gap-1.5">
              <Check className="h-3.5 w-3.5" />
              Save employee
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => go(step + 1)}
              className="gap-1.5"
            >
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

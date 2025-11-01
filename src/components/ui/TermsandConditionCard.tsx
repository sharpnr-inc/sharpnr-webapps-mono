import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TermsAndConditionsCard() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Terms & Conditions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {/* Item 1 */}
          <AccordionItem value="item-1">
            <AccordionTrigger>1. Company Obligations</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By registering your organization, you agree to comply with all operational and
                data-handling requirements. Failure to provide accurate details may lead to
                suspension or termination of services.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>All submitted information must be factual and up to date.</li>
                <li>Organizations are responsible for maintaining updated contact details.</li>
                <li>Misuse of platform privileges will lead to account review and possible penalties.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Item 2 */}
          <AccordionItem value="item-2">
            <AccordionTrigger>2. Data Privacy</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We are committed to protecting your organization’s data and ensuring transparency in how
                your information is used. Data is processed securely and shared only where legally required.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Your data will not be sold or shared with third parties without consent.</li>
                <li>We comply with global privacy standards including GDPR and Indian IT Act.</li>
                <li>All data is encrypted both at rest and in transit.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Item 3 */}
          <AccordionItem value="item-3">
            <AccordionTrigger>3. User Responsibilities</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                As a registered organization, you are responsible for maintaining your account
                security and ensuring authorized personnel manage access.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Use strong passwords and rotate them periodically.</li>
                <li>Limit administrative access to verified users.</li>
                <li>Report any suspicious activity immediately to the support team.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Item 4 */}
          <AccordionItem value="item-4">
            <AccordionTrigger>4. Payment Policy</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Payment obligations are binding and non-refundable once services are activated unless
                otherwise stated in a separate agreement.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Invoices must be cleared within 15 days of issuance.</li>
                <li>Failure to make timely payments may lead to suspension of services.</li>
                <li>All financial data is processed through secure payment gateways.</li>
                <li>Refunds, where applicable, will be processed within 7–10 business days.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          {/* Item 5 */}
          <AccordionItem value="item-5">
            <AccordionTrigger>5. Termination & Support</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Either party may terminate this agreement with prior notice, subject to the terms
                of active subscriptions and compliance obligations.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Support is available via email and chat during business hours (Mon–Fri).</li>
                <li>In case of termination, user data can be exported within 30 days of notice.</li>
                <li>We reserve the right to suspend accounts violating platform usage terms.</li>
                <li>Critical issues will be prioritized as per the SLA policy.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3 mt-4">
          <Checkbox
            id="agree"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(!!checked)}
          />
          <Label htmlFor="agree" className="text-sm leading-snug">
            I have read and agree to all the Terms & Conditions stated above, including data,
            payment, and privacy policies.
          </Label>
        </div>
      </CardContent>

   
    </Card>
  );
}

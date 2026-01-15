import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, FileText} from 'lucide-react';

export default function OrchestratorGeneralDetailsSetup() {
  const [formData, setFormData] = useState({
    legalName: '',
    companyType: '',
    tradeName: '',
    entityOwnership: '',
    parentCompany: '',
    cin: '',
    gst: '',
    pan: '',
    tan: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
    branchName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className=" mx-auto p-2 space-y-6">
      <div className="space-y-2">
        <p className="text-muted-foreground">
          Please provide your organization's legal and operational details to complete the setup.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Organization Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Basic Organization Details
            </CardTitle>
            <CardDescription>
              Legal name and company classification information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="legalName">
                Organization Legal Registered Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="legalName"
                placeholder="Enter the exact legal name as per registration documents"
                value={formData.legalName}
                onChange={(e) => handleInputChange('legalName', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyType">
                Type of Company <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.companyType}
                onValueChange={(value) => handleInputChange('companyType', value)}
              >
                <SelectTrigger id="companyType">
                  <SelectValue placeholder="Select company type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private-limited">Private Limited (Pvt Ltd)</SelectItem>
                  <SelectItem value="public-limited">Public Limited</SelectItem>
                  <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                  <SelectItem value="partnership">Partnership Firm</SelectItem>
                  <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                  <SelectItem value="opc">One Person Company (OPC)</SelectItem>
                  <SelectItem value="section-8">Section 8 Company (Non-Profit)</SelectItem>
                  <SelectItem value="trust">Trust</SelectItem>
                  <SelectItem value="society">Society</SelectItem>
                  <SelectItem value="cooperative">Cooperative Society</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Legal Registration Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Legal Registration Details
            </CardTitle>
            <CardDescription>
              Tax identification and registration numbers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cin">
                  CIN Number {formData.companyType && (formData.companyType.includes('limited') || formData.companyType === 'opc') && <span className="text-destructive">*</span>}
                </Label>
                <Input
                  id="cin"
                  placeholder="L12345MH2020PTC123456"
                  value={formData.cin}
                  onChange={(e) => handleInputChange('cin', e.target.value)}
                  maxLength={21}
                />
                <p className="text-xs text-muted-foreground">
                  Corporate Identification Number (for companies)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pan">
                  PAN Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="pan"
                  placeholder="ABCDE1234F"
                  value={formData.pan}
                  onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())}
                  maxLength={10}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Permanent Account Number
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gst">GST Number</Label>
                <Input
                  id="gst"
                  placeholder="22ABCDE1234F1Z5"
                  value={formData.gst}
                  onChange={(e) => handleInputChange('gst', e.target.value.toUpperCase())}
                  maxLength={15}
                />
                <p className="text-xs text-muted-foreground">
                  Goods and Services Tax Identification Number
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tan">TAN Number</Label>
                <Input
                  id="tan"
                  placeholder="ABCD12345E"
                  value={formData.tan}
                  onChange={(e) => handleInputChange('tan', e.target.value.toUpperCase())}
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">
                  Tax Deduction Account Number
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </form>
    </div>
  );
}
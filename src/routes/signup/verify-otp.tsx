
import VerifyEmailWithOtpPage from '@/components/signup/VerifyEmailWithOtp';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getValidToken } from '@/utilities/DecodeToken';
import { createFileRoute, redirect,} from '@tanstack/react-router';

import Cookies from 'js-cookie';

import { z } from 'zod';

// Define and validate search params
const verifyOtpSearchSchema = z.object({
  email: z.string().email('Invalid email address'),
  VerificationKey: z.string().min(1, 'Verification key is required'),
});

export const Route = createFileRoute('/signup/verify-otp')({
  // Validate search params
  validateSearch: verifyOtpSearchSchema,
  
  // Run before component loads - validate token
  beforeLoad: ({ search }) => {
    const tokenFromCookie = getValidToken('_sharpnr_web_app_token_');
    
    // Check if token is missing or expired
    if (!tokenFromCookie) {
      Cookies.remove('_sharpnr_web_app_token_');
      throw redirect({ to: '/signup' });
    }
    
    // Check if tokens match
    if (search.VerificationKey !== tokenFromCookie) {
      throw redirect({ to: '/signup' });
    }
    
    // Return validated data to component
    return {
      email: search.email,
      token: search.VerificationKey,
      expiresAt: Date.now() + 180000, // 3 minutes from now
    };
  },
  
  // Error boundary for this route
  errorComponent: ({ error }) => (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verification Error</CardTitle>
          <CardDescription>
            {error.message || 'Something went wrong during verification'}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => window.location.href = '/signup'}>
            Back to Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
  
  component: VerifyEmailWithOtpPage,
});


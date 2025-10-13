import VerifyEmailWithOtpPage from '@/components/signup/VerifyEmailWithOtp';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { createSignupStatusQuery } from '@/api_service/queries/SignupStatus';
import { QueryClient } from '@tanstack/react-query';

// Define and validate search params
const verifyOtpSearchSchema = z.object({
  email: z.string().email('Invalid email address'),
  VerificationKey: z.string().min(1, 'Verification key is required'),
});

export const Route = createFileRoute('/signup/verify-otp')({
  validateSearch: verifyOtpSearchSchema,

  beforeLoad: async ({ search}) => {
    // Run your signup status query
  const queryClient = new QueryClient();
    const data = await queryClient.fetchQuery(createSignupStatusQuery());
     

    switch (data?.data?.status) {
      case 'none':
        throw redirect({ to: '/signup' });
      case 'authenticated':
        throw redirect({ to: '/dashboard' });
      case 'registered':
        // User is allowed to see this page
        break;
      case 'otp_verified':
        // Already verified → redirect to complete registration
        throw redirect({ to: '/signup/complete-registration' });
      default:
        throw redirect({ to: '/signup' });
    }

    // Optional: pass search params to component
    return {
      email: search.email,
      token: search.VerificationKey,
    };
  },

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

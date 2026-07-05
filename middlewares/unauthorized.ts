import api from "./axios";

// Guard so multiple in-flight 401s don't each fire a redirect.
let redirecting = false;

function redirectToAuth() {
  if (redirecting) return;
  redirecting = true;

  // Where the user currently is — full URL so deep links + query survive.
  const returnTo = window.location.href;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url: string | undefined = error.config?.url;

    // Don't bounce on the auth-check call itself — let the caller handle it,
    // otherwise an unauthenticated probe causes a redirect loop.
    const isAuthCheck = url?.includes("verify-authentication");

    if ((status === 401 || status === 403) && !isAuthCheck) {
      redirectToAuth();
    }

    return Promise.reject(error);
  },
);

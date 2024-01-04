# vizualize-Task Application with GitHub Login using Clerk, Next.js, and Supabase

## Prerequisites

- GitHub account
- Node.js installed
- Supabase account
- Clerk.dev account

## Step 1: Setting Up Clerk

1. Follow the [Clerk documentation](https://clerk.com/docs/getting-started) to create and configure your Clerk application.
2. Set up GitHub as an authentication provider in Clerk.

## Step 2: Integrating Clerk with Next.js

   
3. Implement GitHub login in your Next.js app. Follow the [Clerk + Next.js guide](https://clerk.com/docs/integrations/frameworks/next).

## Step 3: Connecting Supabase as the Database Provider

1. Set up a Supabase project and obtain API key and URL.
4. Use Supabase for data storage in your app. Refer to the [Supabase documentation](https://supabase.com/docs/guides/with-nextjs) for guidance.

## Step 4: Real-Time Challenges

If facing challenges with real-time features:

- Ensure Supabase subscription plan supports real-time.
- Verify Supabase real-time configuration.
- Review real-time implementation in your Next.js app.

## .env.local
    NEXT_PUBLIC_SUPABASE_URL= you public Key
    NEXT_PUBLIC_SUPABASE_ANON_KEY= you public anon Key
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= your publish key 
    CLERK_SECRET_KEY=your secret
## Conclusion

Congratulations! You've created a vizualize task app with GitHub login using Clerk, Next.js, and Supabase. Refer to respective documentation for support. Share your experience and improvements with the community. Happy coding!


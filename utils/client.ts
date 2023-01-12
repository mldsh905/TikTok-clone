import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'pfrt1xy9',
  dataset: 'production',
  apiVersion: '2023-01-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

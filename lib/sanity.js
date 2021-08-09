import sanityClient from '@sanity/client';
import sanityImage from '@sanity/image-url';

const options = {
  // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: 'kois',
  projectId: '0nx7z6nj',
  apiVersion: '2021-03-25',
  useCdn: true,
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
};

const client = sanityClient(options);

export const imageBuilder = sanityImage(client);

export const urlFor = (source) => {
  return imageBuilder.image(source).url();
};

export const previewClient = sanityClient({
  ...options,
  useCdn: false,
  token:
    'skC1E9QJnAZLEscHn8zueI7zqToW6tRdZgJ94eFIa2zHDrIwRJhtxIYLxss2pzPIGbUpk0PQO4Bn4upfh',
});

export default client;

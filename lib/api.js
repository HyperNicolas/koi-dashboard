import client, { previewClient } from './sanity';

const getUniquekois = (kois) => {
  const ids = new Set();
  return kois.filter((koi) => {
    if (ids.has(koi.id)) {
      return false;
    } else {
      ids.add(koi.id);
      return true;
    }
  });
};

const getUniqueVarieties = (varieties) => {
  const title = new Set();
  return varieties.filter((variety) => {
    if (title.has(variety.title)) {
      return false;
    } else {
      title.add(variety.title);
      return true;
    }
  });
};

const koiFields = `
    birthDate, 
    "id":id.current, 
    youtube,
    updates,
    "variety":variety->title,
    "breeder":breeder->title, 
    "bloodline":bloodline2->title, 
    "skinType":skinType->title, 
    "sex":sex->title, 
`;

const getClient = (preview) => (preview ? previewClient : client);

export async function getAllVarietyKoi(id, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "koiPrivate" && variety._ref == $id] | order(_createdAt desc)
      {
        ${koiFields}
      }`,
    { id }
  );
  return getUniquekois(results);
}

export async function getAllKoi(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "koiPrivate"]  | order(_updatedAt desc)
      {
        ${koiFields}
      }`);
  return getUniquekois(results);
}

export async function getAllKoisWithSlug() {
  const data = await client.fetch(
    `*[_type == "koiPrivate"]{ 'id': id.current }`
  );
  return data;
}

export async function getKoiById(id, preview) {
  const data = await getClient(preview).fetch(
    `*[_type == "koiPrivate" && id.current == $id] | {
      ${koiFields}
    }`,
    { id }
  );
  return data[0];
}

export async function getAllVarieties() {
  const data = await client.fetch(
    `*[_type == "variety"]
    {
     title
    }`
  );
  return getUniqueVarieties(data);
}

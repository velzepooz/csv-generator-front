import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'development'
    ? '.env.development'
    : '.env.production',
});

export const apiUrls = {
  MAIN: process.env.API_URL,
  GENERATE_CLIENTS_LIST: '/api/csv-generator/clients-list',
};

export const parseFileTypeFromContentType = (header, defaultType = 'csv') => {
  return header
    ? header.split(';')[0].split('/')[1]
    : defaultType;
};

export const getFileNameFromContentDisposition = (
  header,
  defaultName = 'Clients',
) => {
  return header
    ? header.split('filename=')[1].split(';')[0]
    : defaultName;
};

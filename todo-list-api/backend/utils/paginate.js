export const paginate = (query, { page = 1, limit = 10 }) => {
  page = Number(page);
  limit = Number(limit);
  const skip = (page - 1) * limit;
  return query.skip(skip).limit(limit);
};

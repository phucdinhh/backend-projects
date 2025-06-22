export const errorHandler = (err, req, res, _next) => {
  console.error(err);
  if (err.isJoi) return res.status(400).json({ message: err.message });
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Something went wrong" });
};

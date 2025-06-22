export const buildTodoFilter = (ownerId, { completed, search }) => {
  const f = { owner: ownerId };
  if (completed !== undefined) f.completed = completed === "true";
  if (search) f.title = { $regex: search, $options: "i" };
  return f;
};

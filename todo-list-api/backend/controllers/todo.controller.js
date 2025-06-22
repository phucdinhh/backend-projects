import Todo from "../models/todo.model.js";
import Joi from "joi";
import { paginate } from "../utils/paginate.js";
import { buildTodoFilter } from "../utils/filter.js";

export const createTodo = async (req, res, next) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().allow(" ", null),
    });

    await schema.validateAsync(req.body);

    const { title, description } = req.body;
    console.log("🚀 ~ createTodo ~ req.body:", req.body);

    const todo = await Todo.create({ title, description, owner: req.user.id });

    console.log("🚀 ~ createTodo ~ todo:", todo);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const schema = Joi.object({
      title: Joi.string(),
      description: Joi.string().allow(" ", null),
      completed: Joi.boolean(),
    });

    await schema.validateAsync(req.body);

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (!todo.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    Object.assign(todo, req.body);
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await todo.deleteOne();
    res.status(200).json({ message: "Todo deleted successfully" }).end();
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = "createdAt", ...filters } = req.query;
    const mongoFilter = buildTodoFilter(req.user.id, filters);

    let query = Todo.find(mongoFilter).sort(sort);
    const total = await Todo.countDocuments(mongoFilter);

    query = paginate(query, { page, limit });
    const data = await query.exec();

    res.status(200).json({
      data,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};

const express = require("express");
const prisma = require("../prisma");
const router = express.Router();
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({ where: { id: +id } });
    if (book) {
      res.json(book);
    } else {
      next({ status: 404, message: `Book with id: ${id} does not exist.` });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    next({ status: 400, message: "A title must be sent with the request." });
  }

  try {
    const book = await prisma.book.findUnique({ where: { id: +id } });

    if (!book) {
      next({ status: 400, message: `Book with id: ${id} does not exist.` });
    }

    const updateBook = await prisma.book.update({
      where: { id: +id },
      data: { title },
    });
    res.json(updateBook);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    next({ status: 400, message: "You must provide a title for a new book." });
  }

  try {
    const addBook = await prisma.book.create({
      data: { title },
    });
    res.json(addBook);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({
      where: { id: +id },
    });
    if (!book) {
      next({ status: 404, message: `A book with id: ${id} does not exist.` });
    }

    await prisma.book.delete({ where: { id: +id } });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

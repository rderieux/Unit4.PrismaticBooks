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
  } catch (error) {
    next(error);
  }
});

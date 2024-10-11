const prisma = require("../prisma");
const seed = async () => {
  const books = [
    { title: "blah" },
    { title: "foo" },
    { title: "wrong" },
    { title: "read more books" },
    { title: "blah2" },
    { title: "foo2" },
    { title: "wrong2" },
    { title: "read more books2" },
    { title: "blah3" },
    { title: "foo3" },
    { title: "wrong3" },
    { title: "read more books3" },
  ];

  await prisma.book.createMany({ data: books });
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

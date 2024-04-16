const models = [
  { id: 1, name: "Erik" },
  { id: 2, name: "Testing" },
  { id: 3, name: "Testing 3" },
  { id: 4, name: "Testing 4" },
  { id: 5, name: "Testing 5" },
  { id: 6, name: "Testing 6" },
  { id: 7, name: "Testing 7" },
  { id: 8, name: "Testing 8" },
];

// actualizando uno
const updateOne = (id, data) => {
  const current = models.find((current) => current.id === id);
  if (!current) {
    throw new Error(`id(${id}) not found`);
  }

  const indexOf = models.indexOf(current);
  models[indexOf] = { ...models[indexOf], ...data };

  console.log(`updated 1`, [...models]);
};

// actualizando todos los que su id es par
const updatePair = (data) => {
  const records = models.filter((current) => current.id % 2 === 0);
  const indexOfs = records.map((current) => models.indexOf(current));

  for (const index of indexOfs) {
    models[index] = { ...models[index], ...data };
  }

  console.log(`updated ${indexOfs.length}`, [...models]);
};

updateOne(1, { name: "Erik 2" });
updatePair({ isPair: true });

export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `Se lee en ${minutes} min`,
      created: "Creado",
      modified: "Modificado",
      source: "Fuente",
    },
  },
};

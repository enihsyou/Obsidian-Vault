export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `Leitura de ${minutes} min`,
      created: "Criado",
      modified: "Modificado",
      source: "Fonte",
    },
  },
};

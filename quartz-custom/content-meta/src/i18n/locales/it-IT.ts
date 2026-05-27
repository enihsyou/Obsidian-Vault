export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) =>
        minutes === 1 ? "1 minuto" : `${minutes} minuti`,
      created: "Creato",
      modified: "Modificato",
      source: "Sorgente",
    },
  },
};

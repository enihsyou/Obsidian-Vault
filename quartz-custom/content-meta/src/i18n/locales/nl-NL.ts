export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) =>
        minutes === 1 ? "1 minuut leestijd" : `${minutes} minuten leestijd`,
      created: "Aangemaakt",
      modified: "Gewijzigd",
      source: "Bron",
    },
  },
};

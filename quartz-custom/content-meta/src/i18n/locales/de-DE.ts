export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} Min. Lesezeit`,
      created: "Erstellt",
      modified: "Geändert",
      source: "Quelle",
    },
  },
};

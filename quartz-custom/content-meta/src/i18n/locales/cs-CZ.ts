export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} min čtení`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

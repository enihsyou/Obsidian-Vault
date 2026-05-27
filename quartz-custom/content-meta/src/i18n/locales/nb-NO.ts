export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} min lesning`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

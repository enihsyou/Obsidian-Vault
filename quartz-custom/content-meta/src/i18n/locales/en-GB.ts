export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} min read`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

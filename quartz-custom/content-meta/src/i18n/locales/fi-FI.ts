export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} min lukuaika`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

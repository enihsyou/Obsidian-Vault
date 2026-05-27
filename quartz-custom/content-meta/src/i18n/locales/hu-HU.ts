export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} perces olvasás`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

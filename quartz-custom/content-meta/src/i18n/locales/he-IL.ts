export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} דקות קריאה`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

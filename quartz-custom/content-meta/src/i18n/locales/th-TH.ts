export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `อ่านราว ${minutes} นาที`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

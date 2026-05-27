export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} phút đọc`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

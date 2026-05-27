export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} мин оқу`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => {
        if (minutes === 1) {
          return "1 min read";
        }
        return `${minutes} min read`;
      },
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

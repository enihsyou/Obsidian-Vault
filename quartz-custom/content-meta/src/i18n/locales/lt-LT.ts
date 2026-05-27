export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} min skaitymo`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

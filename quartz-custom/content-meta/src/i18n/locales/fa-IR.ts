export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `زمان تقریبی مطالعه: ${minutes} دقیقه`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

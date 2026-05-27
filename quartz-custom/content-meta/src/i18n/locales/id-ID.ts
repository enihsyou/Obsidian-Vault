export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} menit baca`,
      created: "Created",
      modified: "Modified",
      source: "Source",
    },
  },
};

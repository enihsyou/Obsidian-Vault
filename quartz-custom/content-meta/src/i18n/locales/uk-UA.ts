export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} хв читання`,
      created: "Створено",
      modified: "Змінено",
      source: "Джерело",
    },
  },
};

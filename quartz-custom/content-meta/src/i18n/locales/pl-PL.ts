export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} min. czytania `,
      created: "Utworzono",
      modified: "Zmieniono",
      source: "Źródło",
    },
  },
};

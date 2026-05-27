export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} min de lecture`,
      created: "Créé",
      modified: "Modifié",
      source: "Source",
    },
  },
};

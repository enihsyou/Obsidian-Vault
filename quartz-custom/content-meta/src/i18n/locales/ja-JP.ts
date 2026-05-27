export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} min read`,
      created: "作成",
      modified: "更新",
      source: "ソース",
    },
  },
};

export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes} min read`,
      created: "작성",
      modified: "수정",
      source: "소스",
    },
  },
};

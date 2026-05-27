export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes}分钟阅读`,
      created: "创建于",
      modified: "修改于",
      source: "查看源码",
    },
  },
};

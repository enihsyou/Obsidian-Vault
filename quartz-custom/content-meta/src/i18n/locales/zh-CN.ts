export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `${minutes}分钟阅读`,
      created: "创建于",
      modified: "更新于",
      source: "本页源码",
    },
  },
};

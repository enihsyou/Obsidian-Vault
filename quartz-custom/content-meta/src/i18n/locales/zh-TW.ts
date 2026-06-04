export default {
  components: {
    contentMeta: {
      readingTime: ({ minutes }: { minutes: number }) => `閱讀時間約 ${minutes} 分鐘`,
      created: "建立於",
      modified: "更新於",
      source: "查看原始碼",
    },
  },
};

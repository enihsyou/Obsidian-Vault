export default {
  components: {
    recentNotes: {
      title: "最近的笔记",
      seeHistory: "查看历史记录 →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `查看更多${remaining}篇笔记 →`,
    },
  },
};

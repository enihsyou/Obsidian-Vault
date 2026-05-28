export default {
  components: {
    recentNotes: {
      title: "最近的筆記",      seeHistory: "查看歷史記錄 →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `查看更多 ${remaining} 篇筆記 →`,
    },
  },
};

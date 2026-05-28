export default {
  components: {
    recentNotes: {
      title: "最近の記事",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `さらに${remaining}件 →`,
    },
  },
};

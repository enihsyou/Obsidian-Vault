export default {
  components: {
    recentNotes: {
      title: "최근 게시글",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `${remaining}건 더보기 →`,
    },
  },
};

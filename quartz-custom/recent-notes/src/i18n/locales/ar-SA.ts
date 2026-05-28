export default {
  components: {
    recentNotes: {
      title: "آخر الملاحظات",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `تصفح ${remaining} أكثر →`,
    },
  },
};

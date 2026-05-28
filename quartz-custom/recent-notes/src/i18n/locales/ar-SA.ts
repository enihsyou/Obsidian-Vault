export default {
  components: {
    recentNotes: {
      title: "آخر الملاحظات",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `تصفح ${remaining} أكثر →`,
    },
  },
};

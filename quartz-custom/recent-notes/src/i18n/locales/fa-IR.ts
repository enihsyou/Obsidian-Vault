export default {
  components: {
    recentNotes: {
      title: "یادداشت‌های اخیر",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `${remaining} یادداشت دیگر →`,
    },
  },
};

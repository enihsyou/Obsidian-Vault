export default {
  components: {
    recentNotes: {
      title: "یادداشت‌های اخیر",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `${remaining} یادداشت دیگر →`,
    },
  },
};

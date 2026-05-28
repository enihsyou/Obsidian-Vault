export default {
  components: {
    recentNotes: {
      title: "Naujausi Užrašai",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Peržiūrėti dar ${remaining} →`,
    },
  },
};

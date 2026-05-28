export default {
  components: {
    recentNotes: {
      title: "Najnowsze notatki",
      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) =>
        `Zobacz ${remaining} nastepnych →`,
    },
  },
};

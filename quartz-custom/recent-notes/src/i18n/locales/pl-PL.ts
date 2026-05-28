export default {
  components: {
    recentNotes: {
      title: "Najnowsze notatki",
      seeRemainingMore: ({ remaining }: { remaining: number }) =>
        `Zobacz ${remaining} nastepnych →`,
    },
  },
};

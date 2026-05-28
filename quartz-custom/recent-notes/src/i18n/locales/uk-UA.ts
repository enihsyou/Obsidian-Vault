export default {
  components: {
    recentNotes: {
      title: "Останні нотатки",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Переглянути ще ${remaining} →`,
    },
  },
};

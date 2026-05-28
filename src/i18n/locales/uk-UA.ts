export default {
  components: {
    recentNotes: {
      title: "Останні нотатки",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Переглянути ще ${remaining} →`,
    },
  },
};

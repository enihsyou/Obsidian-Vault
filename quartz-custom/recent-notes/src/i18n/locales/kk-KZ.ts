export default {
  components: {
    recentNotes: {
      title: "Соңғы жазбалар",
      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) =>
        `Тағы ${remaining} жазбаны қарау →`,
    },
  },
};

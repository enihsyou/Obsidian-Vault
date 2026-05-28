export default {
  components: {
    recentNotes: {
      title: "Соңғы жазбалар",
      seeRemainingMore: ({ remaining }: { remaining: number }) =>
        `Тағы ${remaining} жазбаны қарау →`,
    },
  },
};

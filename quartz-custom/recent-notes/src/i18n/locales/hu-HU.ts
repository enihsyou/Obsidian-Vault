export default {
  components: {
    recentNotes: {
      title: "Legutóbbi jegyzetek",
      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) =>
        `${remaining} további megtekintése →`,
    },
  },
};

export default {
  components: {
    recentNotes: {
      title: "Legutóbbi jegyzetek",
      seeRemainingMore: ({ remaining }: { remaining: number }) =>
        `${remaining} további megtekintése →`,
    },
  },
};

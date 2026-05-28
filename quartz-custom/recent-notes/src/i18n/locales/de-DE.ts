export default {
  components: {
    recentNotes: {
      title: "Zuletzt bearbeitete Seiten",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `${remaining} weitere ansehen →`,
    },
  },
};

export default {
  components: {
    recentNotes: {
      title: "Notes Recents",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Vegi ${remaining} més →`,
    },
  },
};

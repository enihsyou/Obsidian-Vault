export default {
  components: {
    recentNotes: {
      title: "Notes Recents",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Vegi ${remaining} més →`,
    },
  },
};

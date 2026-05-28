export default {
  components: {
    recentNotes: {
      title: "Recent Notes",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};

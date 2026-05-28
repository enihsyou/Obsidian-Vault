export default {
  components: {
    recentNotes: {
      title: "Recent Notes",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `See ${remaining} more →`,
    },
  },
};

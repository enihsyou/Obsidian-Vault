export default {
  components: {
    recentNotes: {
      title: "Nylige notater",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Se ${remaining} til →`,
    },
  },
};

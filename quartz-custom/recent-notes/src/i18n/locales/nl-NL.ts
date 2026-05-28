export default {
  components: {
    recentNotes: {
      title: "Recente notities",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Zie ${remaining} meer →`,
    },
  },
};

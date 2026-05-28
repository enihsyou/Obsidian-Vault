export default {
  components: {
    recentNotes: {
      title: "Recente notities",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Zie ${remaining} meer →`,
    },
  },
};

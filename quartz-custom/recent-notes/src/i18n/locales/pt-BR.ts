export default {
  components: {
    recentNotes: {
      title: "Notas recentes",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Veja mais ${remaining} →`,
    },
  },
};

export default {
  components: {
    recentNotes: {
      title: "Notas recentes",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Veja mais ${remaining} →`,
    },
  },
};

export default {
  components: {
    recentNotes: {
      title: "Notas Recientes",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Vea ${remaining} más →`,
    },
  },
};

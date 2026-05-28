export default {
  components: {
    recentNotes: {
      title: "Notas Recientes",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Vea ${remaining} más →`,
    },
  },
};

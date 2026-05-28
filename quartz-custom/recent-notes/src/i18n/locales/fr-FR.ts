export default {
  components: {
    recentNotes: {
      title: "Notes Récentes",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Voir ${remaining} de plus →`,
    },
  },
};

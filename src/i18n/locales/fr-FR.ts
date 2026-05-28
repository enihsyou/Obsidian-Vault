export default {
  components: {
    recentNotes: {
      title: "Notes Récentes",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Voir ${remaining} de plus →`,
    },
  },
};

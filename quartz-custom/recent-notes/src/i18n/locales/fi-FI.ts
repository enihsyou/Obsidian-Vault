export default {
  components: {
    recentNotes: {
      title: "Viimeisimmät muistiinpanot",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Näytä ${remaining} lisää →`,
    },
  },
};

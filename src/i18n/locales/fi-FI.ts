export default {
  components: {
    recentNotes: {
      title: "Viimeisimmät muistiinpanot",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Näytä ${remaining} lisää →`,
    },
  },
};

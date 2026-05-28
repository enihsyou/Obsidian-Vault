export default {
  components: {
    recentNotes: {
      title: "Note recenti",
      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) =>
        remaining === 1 ? "Vedi 1 altra →" : `Vedi altre ${remaining} →`,
    },
  },
};

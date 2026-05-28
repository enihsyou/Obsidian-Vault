export default {
  components: {
    recentNotes: {
      title: "Notițe recente",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Vezi încă ${remaining} →`,
    },
  },
};

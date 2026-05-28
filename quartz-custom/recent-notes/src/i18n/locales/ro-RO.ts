export default {
  components: {
    recentNotes: {
      title: "Notițe recente",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Vezi încă ${remaining} →`,
    },
  },
};

export default {
  components: {
    recentNotes: {
      title: "Naujausi Užrašai",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Peržiūrėti dar ${remaining} →`,
    },
  },
};

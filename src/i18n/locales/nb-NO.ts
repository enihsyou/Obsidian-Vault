export default {
  components: {
    recentNotes: {
      title: "Nylige notater",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Se ${remaining} til →`,
    },
  },
};

export default {
  components: {
    recentNotes: {
      title: "Son Notlar",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `${remaining} tane daha gör →`,
    },
  },
};

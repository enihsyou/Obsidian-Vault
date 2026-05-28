export default {
  components: {
    recentNotes: {
      title: "Son Notlar",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `${remaining} tane daha gör →`,
    },
  },
};

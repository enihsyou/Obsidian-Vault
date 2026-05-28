export default {
  components: {
    recentNotes: {
      title: "Nejnovější poznámky",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Zobraz ${remaining} dalších →`,
    },
  },
};

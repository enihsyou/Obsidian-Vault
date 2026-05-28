export default {
  components: {
    recentNotes: {
      title: "Nejnovější poznámky",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Zobraz ${remaining} dalších →`,
    },
  },
};

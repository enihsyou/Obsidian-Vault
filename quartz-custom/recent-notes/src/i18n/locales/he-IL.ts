export default {
  components: {
    recentNotes: {
      title: "הערות אחרונות",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `עיין ב ${remaining} נוספים →`,
    },
  },
};

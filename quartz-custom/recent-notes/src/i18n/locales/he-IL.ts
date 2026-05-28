export default {
  components: {
    recentNotes: {
      title: "הערות אחרונות",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `עיין ב ${remaining} נוספים →`,
    },
  },
};

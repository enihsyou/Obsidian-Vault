export default {
  components: {
    recentNotes: {
      title: "Catatan Terbaru",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Lihat ${remaining} lagi →`,
    },
  },
};

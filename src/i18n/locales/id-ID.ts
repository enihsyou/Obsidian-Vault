export default {
  components: {
    recentNotes: {
      title: "Catatan Terbaru",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Lihat ${remaining} lagi →`,
    },
  },
};

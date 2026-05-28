export default {
  components: {
    recentNotes: {
      title: "Ghi chú gần đây",      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Xem thêm ${remaining} ghi chú →`,
    },
  },
};

export default {
  components: {
    recentNotes: {
      title: "Ghi chú gần đây",
      seeRemainingMore: ({ remaining }: { remaining: number }) => `Xem thêm ${remaining} ghi chú →`,
    },
  },
};

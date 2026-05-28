export default {
  components: {
    recentNotes: {
      title: "บันทึกล่าสุด",
      seeHistory: "See History →",
      seeRemainingMore: ({ remaining }: { remaining: number }) =>
        `ดูเพิ่มอีก ${remaining} รายการ →`,
    },
  },
};

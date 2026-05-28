export default {
  components: {
    recentNotes: {
      title: "บันทึกล่าสุด",
      seeRemainingMore: ({ remaining }: { remaining: number }) =>
        `ดูเพิ่มอีก ${remaining} รายการ →`,
    },
  },
};

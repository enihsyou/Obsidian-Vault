export default {
  components: {
    recentNotes: {
      title: "Недавние заметки",
      seeRemainingMore: ({ remaining }: { remaining: number }) =>
        `Посмотреть оставш${getForm(remaining, "уюся", "иеся", "иеся")} ${remaining} →`,
    },
  },
};

function getForm(number: number, form1: string, form2: string, form5: string): string {
  const remainder100 = number % 100;
  const remainder10 = remainder100 % 10;

  if (remainder100 >= 10 && remainder100 <= 20) return form5;
  if (remainder10 > 1 && remainder10 < 5) return form2;
  if (remainder10 == 1) return form1;
  return form5;
}

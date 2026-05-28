// ../../node_modules/.pnpm/@quartz-community+utils@htt_3a6e7c689d8e8e8bb41cb01f6d37d9c4/node_modules/@quartz-community/utils/dist/date.js
function formatDate(d2, locale = "en-US") {
  return d2.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
}

// ../../node_modules/.pnpm/@quartz-community+utils@htt_3a6e7c689d8e8e8bb41cb01f6d37d9c4/node_modules/@quartz-community/utils/dist/sort.js
function getDate(data) {
  const defaultDateType = data.defaultDateType;
  if (!defaultDateType) {
    return void 0;
  }
  const dates = data.dates;
  return dates?.[defaultDateType];
}
function byDateAndAlphabetical() {
  return (f1, f22) => {
    const f1Date = getDate(f1);
    const f2Date = getDate(f22);
    if (f1Date && f2Date) {
      return f2Date.getTime() - f1Date.getTime();
    } else if (f1Date && !f2Date) {
      return -1;
    } else if (!f1Date && f2Date) {
      return 1;
    }
    const f1Title = (f1.frontmatter?.title ?? "").toLowerCase();
    const f2Title = (f22.frontmatter?.title ?? "").toLowerCase();
    return f1Title.localeCompare(f2Title);
  };
}

// ../../node_modules/.pnpm/@quartz-community+utils@htt_3a6e7c689d8e8e8bb41cb01f6d37d9c4/node_modules/@quartz-community/utils/dist/path.js
function endsWith(s2, suffix) {
  return s2 === suffix || s2.endsWith("/" + suffix);
}
function isFolderPath(fplike) {
  return fplike.endsWith("/") || endsWith(fplike, "index") || endsWith(fplike, "index.md") || endsWith(fplike, "index.html");
}

// ../../node_modules/.pnpm/@quartz-community+utils@htt_3a6e7c689d8e8e8bb41cb01f6d37d9c4/node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/i18n/locales/en-US.ts
var en_US_default = {
  components: {
    recentNotes: {
      title: "Recent Notes",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `See ${remaining} more \u2192`
    }
  }
};

// src/i18n/locales/ar-SA.ts
var ar_SA_default = {
  components: {
    recentNotes: {
      title: "\u0622\u062E\u0631 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `\u062A\u0635\u0641\u062D ${remaining} \u0623\u0643\u062B\u0631 \u2192`
    }
  }
};

// src/i18n/locales/ca-ES.ts
var ca_ES_default = {
  components: {
    recentNotes: {
      title: "Notes Recents",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Vegi ${remaining} m\xE9s \u2192`
    }
  }
};

// src/i18n/locales/cs-CZ.ts
var cs_CZ_default = {
  components: {
    recentNotes: {
      title: "Nejnov\u011Bj\u0161\xED pozn\xE1mky",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Zobraz ${remaining} dal\u0161\xEDch \u2192`
    }
  }
};

// src/i18n/locales/de-DE.ts
var de_DE_default = {
  components: {
    recentNotes: {
      title: "Zuletzt bearbeitete Seiten",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `${remaining} weitere ansehen \u2192`
    }
  }
};

// src/i18n/locales/en-GB.ts
var en_GB_default = {
  components: {
    recentNotes: {
      title: "Recent Notes",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `See ${remaining} more \u2192`
    }
  }
};

// src/i18n/locales/es-ES.ts
var es_ES_default = {
  components: {
    recentNotes: {
      title: "Notas Recientes",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Vea ${remaining} m\xE1s \u2192`
    }
  }
};

// src/i18n/locales/fa-IR.ts
var fa_IR_default = {
  components: {
    recentNotes: {
      title: "\u06CC\u0627\u062F\u062F\u0627\u0634\u062A\u200C\u0647\u0627\u06CC \u0627\u062E\u06CC\u0631",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `${remaining} \u06CC\u0627\u062F\u062F\u0627\u0634\u062A \u062F\u06CC\u06AF\u0631 \u2192`
    }
  }
};

// src/i18n/locales/fi-FI.ts
var fi_FI_default = {
  components: {
    recentNotes: {
      title: "Viimeisimm\xE4t muistiinpanot",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `N\xE4yt\xE4 ${remaining} lis\xE4\xE4 \u2192`
    }
  }
};

// src/i18n/locales/fr-FR.ts
var fr_FR_default = {
  components: {
    recentNotes: {
      title: "Notes R\xE9centes",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Voir ${remaining} de plus \u2192`
    }
  }
};

// src/i18n/locales/he-IL.ts
var he_IL_default = {
  components: {
    recentNotes: {
      title: "\u05D4\u05E2\u05E8\u05D5\u05EA \u05D0\u05D7\u05E8\u05D5\u05E0\u05D5\u05EA",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `\u05E2\u05D9\u05D9\u05DF \u05D1 ${remaining} \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD \u2192`
    }
  }
};

// src/i18n/locales/hu-HU.ts
var hu_HU_default = {
  components: {
    recentNotes: {
      title: "Legut\xF3bbi jegyzetek",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `${remaining} tov\xE1bbi megtekint\xE9se \u2192`
    }
  }
};

// src/i18n/locales/id-ID.ts
var id_ID_default = {
  components: {
    recentNotes: {
      title: "Catatan Terbaru",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Lihat ${remaining} lagi \u2192`
    }
  }
};

// src/i18n/locales/it-IT.ts
var it_IT_default = {
  components: {
    recentNotes: {
      title: "Note recenti",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => remaining === 1 ? "Vedi 1 altra \u2192" : `Vedi altre ${remaining} \u2192`
    }
  }
};

// src/i18n/locales/ja-JP.ts
var ja_JP_default = {
  components: {
    recentNotes: {
      title: "\u6700\u8FD1\u306E\u8A18\u4E8B",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `\u3055\u3089\u306B${remaining}\u4EF6 \u2192`
    }
  }
};

// src/i18n/locales/kk-KZ.ts
var kk_KZ_default = {
  components: {
    recentNotes: {
      title: "\u0421\u043E\u04A3\u0493\u044B \u0436\u0430\u0437\u0431\u0430\u043B\u0430\u0440",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `\u0422\u0430\u0493\u044B ${remaining} \u0436\u0430\u0437\u0431\u0430\u043D\u044B \u049B\u0430\u0440\u0430\u0443 \u2192`
    }
  }
};

// src/i18n/locales/ko-KR.ts
var ko_KR_default = {
  components: {
    recentNotes: {
      title: "\uCD5C\uADFC \uAC8C\uC2DC\uAE00",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `${remaining}\uAC74 \uB354\uBCF4\uAE30 \u2192`
    }
  }
};

// src/i18n/locales/lt-LT.ts
var lt_LT_default = {
  components: {
    recentNotes: {
      title: "Naujausi U\u017Era\u0161ai",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Per\u017Ei\u016Br\u0117ti dar ${remaining} \u2192`
    }
  }
};

// src/i18n/locales/nb-NO.ts
var nb_NO_default = {
  components: {
    recentNotes: {
      title: "Nylige notater",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Se ${remaining} til \u2192`
    }
  }
};

// src/i18n/locales/nl-NL.ts
var nl_NL_default = {
  components: {
    recentNotes: {
      title: "Recente notities",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Zie ${remaining} meer \u2192`
    }
  }
};

// src/i18n/locales/pl-PL.ts
var pl_PL_default = {
  components: {
    recentNotes: {
      title: "Najnowsze notatki",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Zobacz ${remaining} nastepnych \u2192`
    }
  }
};

// src/i18n/locales/pt-BR.ts
var pt_BR_default = {
  components: {
    recentNotes: {
      title: "Notas recentes",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Veja mais ${remaining} \u2192`
    }
  }
};

// src/i18n/locales/ro-RO.ts
var ro_RO_default = {
  components: {
    recentNotes: {
      title: "Noti\u021Be recente",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Vezi \xEEnc\u0103 ${remaining} \u2192`
    }
  }
};

// src/i18n/locales/ru-RU.ts
var ru_RU_default = {
  components: {
    recentNotes: {
      title: "\u041D\u0435\u0434\u0430\u0432\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043E\u0441\u0442\u0430\u0432\u0448${getForm(remaining, "\u0443\u044E\u0441\u044F", "\u0438\u0435\u0441\u044F", "\u0438\u0435\u0441\u044F")} ${remaining} \u2192`
    }
  }
};
function getForm(number, form1, form2, form5) {
  const remainder100 = number % 100;
  const remainder10 = remainder100 % 10;
  if (remainder100 >= 10 && remainder100 <= 20) return form5;
  if (remainder10 > 1 && remainder10 < 5) return form2;
  if (remainder10 == 1) return form1;
  return form5;
}

// src/i18n/locales/th-TH.ts
var th_TH_default = {
  components: {
    recentNotes: {
      title: "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `\u0E14\u0E39\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E2D\u0E35\u0E01 ${remaining} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \u2192`
    }
  }
};

// src/i18n/locales/tr-TR.ts
var tr_TR_default = {
  components: {
    recentNotes: {
      title: "Son Notlar",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `${remaining} tane daha g\xF6r \u2192`
    }
  }
};

// src/i18n/locales/uk-UA.ts
var uk_UA_default = {
  components: {
    recentNotes: {
      title: "\u041E\u0441\u0442\u0430\u043D\u043D\u0456 \u043D\u043E\u0442\u0430\u0442\u043A\u0438",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u0449\u0435 ${remaining} \u2192`
    }
  }
};

// src/i18n/locales/vi-VN.ts
var vi_VN_default = {
  components: {
    recentNotes: {
      title: "Ghi ch\xFA g\u1EA7n \u0111\xE2y",
      seeHistory: "See History \u2192",
      seeRemainingMore: ({ remaining }) => `Xem th\xEAm ${remaining} ghi ch\xFA \u2192`
    }
  }
};

// src/i18n/locales/zh-CN.ts
var zh_CN_default = {
  components: {
    recentNotes: {
      title: "\u6700\u8FD1\u7684\u7B14\u8BB0",
      seeHistory: "\u67E5\u770B\u5386\u53F2\u8BB0\u5F55 \u2192",
      seeRemainingMore: ({ remaining }) => `\u67E5\u770B\u66F4\u591A${remaining}\u7BC7\u7B14\u8BB0 \u2192`
    }
  }
};

// src/i18n/locales/zh-TW.ts
var zh_TW_default = {
  components: {
    recentNotes: {
      title: "\u6700\u8FD1\u7684\u7B46\u8A18",
      seeHistory: "\u67E5\u770B\u6B77\u53F2\u8A18\u9304 \u2192",
      seeRemainingMore: ({ remaining }) => `\u67E5\u770B\u66F4\u591A ${remaining} \u7BC7\u7B46\u8A18 \u2192`
    }
  }
};

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default,
  "ar-SA": ar_SA_default,
  "ca-ES": ca_ES_default,
  "cs-CZ": cs_CZ_default,
  "de-DE": de_DE_default,
  "en-GB": en_GB_default,
  "es-ES": es_ES_default,
  "fa-IR": fa_IR_default,
  "fi-FI": fi_FI_default,
  "fr-FR": fr_FR_default,
  "he-IL": he_IL_default,
  "hu-HU": hu_HU_default,
  "id-ID": id_ID_default,
  "it-IT": it_IT_default,
  "ja-JP": ja_JP_default,
  "kk-KZ": kk_KZ_default,
  "ko-KR": ko_KR_default,
  "lt-LT": lt_LT_default,
  "nb-NO": nb_NO_default,
  "nl-NL": nl_NL_default,
  "pl-PL": pl_PL_default,
  "pt-BR": pt_BR_default,
  "ro-RO": ro_RO_default,
  "ru-RU": ru_RU_default,
  "th-TH": th_TH_default,
  "tr-TR": tr_TR_default,
  "uk-UA": uk_UA_default,
  "vi-VN": vi_VN_default,
  "zh-CN": zh_CN_default,
  "zh-TW": zh_TW_default
};
function i18n(locale) {
  return locales[locale] || en_US_default;
}
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// ../../node_modules/.pnpm/preact@10.29.2/node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// ../../node_modules/.pnpm/@quartz-community+utils@htt_3a6e7c689d8e8e8bb41cb01f6d37d9c4/node_modules/@quartz-community/utils/dist/index.js
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function joinSegments(...args) {
  if (args.length === 0) {
    return "";
  }
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) {
    joined = "/" + joined;
  }
  if (last?.endsWith("/")) {
    joined = joined + "/";
  }
  return joined;
}
function endsWith2(s2, suffix) {
  return s2 === suffix || s2.endsWith("/" + suffix);
}
function trimSuffix(s2, suffix) {
  if (endsWith2(s2, suffix)) {
    s2 = s2.slice(0, -suffix.length);
  }
  return s2;
}
function stripSlashes(s2, onlyStripPrefix) {
  if (s2.startsWith("/")) {
    s2 = s2.substring(1);
  }
  if (!onlyStripPrefix && s2.endsWith("/")) {
    s2 = s2.slice(0, -1);
  }
  return s2;
}

// src/util/path.ts
function simplifySlug2(fp) {
  return simplifySlug(fp);
}
function resolveRelative(current, target) {
  const simplified = simplifySlug2(target);
  const rootPath = pathToRoot(current);
  return joinSegments(rootPath, simplified);
}
function pathToRoot(slug2) {
  let rootPath = slug2.split("/").filter((x2) => x2 !== "").slice(0, -1).map((_2) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}

// src/components/styles/recentNotes.scss
var recentNotes_default = ".recent-notes > h3 {\n  margin: 0.5rem 0 0 0;\n  font-size: 1rem;\n}\n.recent-notes > ul.recent-ul {\n  list-style: none;\n  margin-top: 1rem;\n  padding-left: 0;\n}\n.recent-notes > ul.recent-ul > li {\n  margin: 1rem 0;\n}\n.recent-notes > ul.recent-ul > li .section > .desc > h3 > a {\n  background-color: transparent;\n}\n.recent-notes > ul.recent-ul > li .section > .meta {\n  margin: 0 0 0.5rem 0;\n  opacity: 0.6;\n}";

// src/components/RecentNotes.tsx
var withDefaultDateType = (data, defaultDateType) => ({
  ...data,
  defaultDateType
});
function filterListedPages(pages) {
  return pages.filter((p2) => p2.unlisted !== true);
}
function isTagPageSlug(slug2) {
  if (!slug2) return false;
  return slug2 === "tags" || slug2 === "tags/index" || slug2.startsWith("tags/");
}
function isFolderPageSlug(slug2) {
  if (!slug2) return false;
  return isFolderPath(slug2);
}
var byDateAndAlphabeticalWithConfig = (cfg) => {
  const sortFn = byDateAndAlphabetical();
  return (f1, f22) => sortFn(
    withDefaultDateType(f1, cfg.defaultDateType),
    withDefaultDateType(f22, cfg.defaultDateType)
  );
};
var defaultOptions = (cfg) => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  hideTagPages: false,
  hideFolderPages: false,
  filter: () => true,
  sort: byDateAndAlphabeticalWithConfig(cfg)
});
var RecentNotes_default = ((userOpts) => {
  const RecentNotes = ({
    allFiles,
    fileData,
    displayClass,
    cfg
  }) => {
    const globalCfg = cfg;
    const opts = { ...defaultOptions(globalCfg), ...userOpts };
    const pages = filterListedPages(allFiles).filter((p2) => !opts.hideTagPages || !isTagPageSlug(p2.slug)).filter((p2) => !opts.hideFolderPages || !isFolderPageSlug(p2.slug)).filter(opts.filter).sort(opts.sort);
    const remaining = Math.max(0, pages.length - opts.limit);
    const slug2 = fileData.slug;
    const locale = cfg.locale ?? "en-US";
    return /* @__PURE__ */ u2("div", { class: classNames(displayClass, "recent-notes"), children: [
      /* @__PURE__ */ u2("h3", { children: [
        opts.title ?? i18n(locale).components.recentNotes.title,
        opts.linkToMore && opts.linkToHistory && /* @__PURE__ */ u2("span", { class: "see-more", children: /* @__PURE__ */ u2("a", { href: opts.linkToHistory, class: "external see-more", children: i18n(locale).components.recentNotes.seeHistory }) })
      ] }),
      /* @__PURE__ */ u2("ul", { class: "recent-ul", children: pages.slice(0, opts.limit).map((page) => {
        const title = page.frontmatter?.title ?? "Untitled";
        const tags = page.frontmatter?.tags ?? [];
        return /* @__PURE__ */ u2("li", { class: "recent-li", children: /* @__PURE__ */ u2("div", { class: "section", children: [
          /* @__PURE__ */ u2("div", { class: "desc", children: /* @__PURE__ */ u2("h3", { children: /* @__PURE__ */ u2("a", { href: resolveRelative(slug2, page.slug), class: "internal", children: title }) }) }),
          page.dates && getDate(withDefaultDateType(page, globalCfg.defaultDateType)) && /* @__PURE__ */ u2("p", { class: "meta", children: /* @__PURE__ */ u2(
            "time",
            {
              datetime: getDate(
                withDefaultDateType(page, globalCfg.defaultDateType)
              ).toISOString(),
              children: formatDate(
                getDate(withDefaultDateType(page, globalCfg.defaultDateType)),
                locale
              )
            }
          ) }),
          opts.showTags && /* @__PURE__ */ u2("ul", { class: "tags", children: tags.map((tag) => /* @__PURE__ */ u2("li", { children: /* @__PURE__ */ u2("a", { class: "internal tag-link", href: resolveRelative(slug2, `tags/${tag}`), children: tag }) })) })
        ] }) });
      }) }),
      opts.linkToMore && remaining > 0 && /* @__PURE__ */ u2("p", { children: /* @__PURE__ */ u2("a", { href: resolveRelative(slug2, opts.linkToMore), children: i18n(locale).components.recentNotes.seeRemainingMore({ remaining }) }) })
    ] });
  };
  RecentNotes.css = recentNotes_default;
  return RecentNotes;
});

export { RecentNotes_default as RecentNotes, filterListedPages, isFolderPageSlug, isTagPageSlug };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
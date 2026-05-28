import { QuartzPluginData, SortFn, QuartzComponent } from '@quartz-community/types';
export { QuartzComponent, QuartzComponentProps, StringResource } from '@quartz-community/types';

type RecentNotesPluginData = QuartzPluginData & Record<string, unknown>;
interface RecentNotesOptions {
    title?: string;
    limit: number;
    linkToMore: string | false;
    linkToHistory?: string;
    showTags: boolean;
    hideTagPages: boolean;
    hideFolderPages: boolean;
    filter: (f: RecentNotesPluginData) => boolean;
    sort: SortFn;
}
declare function filterListedPages<T>(pages: T[]): T[];
/** True for Quartz tag-index slugs: `tags`, `tags/index`, or `tags/<anything>`. */
declare function isTagPageSlug(slug: string | undefined): boolean;
/** True for Quartz folder-index slugs; delegates to `isFolderPath` from `@quartz-community/utils`. */
declare function isFolderPageSlug(slug: string | undefined): boolean;
declare const _default: (userOpts?: Partial<RecentNotesOptions>) => QuartzComponent;

export { _default as RecentNotes, type RecentNotesOptions, filterListedPages, isFolderPageSlug, isTagPageSlug };

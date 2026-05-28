# @quartz-community/recent-notes

Displays a list of recently modified or created notes.

## Installation

```bash
npx quartz plugin add github:quartz-community/recent-notes
```

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/recent-notes
    enabled: true
```

For advanced use cases, you can override in TypeScript:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins";

ExternalPlugin.RecentNotes({
  title: "Recent Notes",
  limit: 3,
  showTags: true,
  linkToMore: false,
});
```

## Configuration

| Option            | Type              | Default                 | Description                                                                        |
| ----------------- | ----------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| `title`           | `string`          | `undefined`             | The title of the recent notes section.                                             |
| `limit`           | `number`          | `3`                     | The maximum number of notes to display.                                            |
| `linkToMore`      | `string \| false` | `false`                 | A link to a page with more notes, or `false` to disable.                           |
| `showTags`        | `boolean`         | `true`                  | Whether to display tags for each note.                                             |
| `hideTagPages`    | `boolean`         | `false`                 | Hide generated tag pages (slugs under `tags/`) from the list.                      |
| `hideFolderPages` | `boolean`         | `false`                 | Hide generated folder index pages (slugs ending in `/` or `/index`) from the list. |
| `filter`          | `function`        | `() => true`            | A function to filter the notes.                                                    |
| `sort`            | `function`        | `byDateAndAlphabetical` | A function to sort the notes.                                                      |

## Documentation

See the [Quartz documentation](https://quartz.jzhao.xyz/features/recent%20notes) for more information.

## License

MIT

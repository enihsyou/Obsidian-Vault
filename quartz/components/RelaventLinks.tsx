import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";
import { classNames } from "../util/lang"
import { i18n } from "../i18n";

const RelaventLinks: QuartzComponent = ({ cfg, fileData, displayClass }: QuartzComponentProps) => {
  const relavents = fileData.frontmatter?.relavents;
  if (!relavents) return null;
  return (
    <div class={classNames(displayClass, "relavent-links")}>
      <h3>{i18n(cfg.locale).components.relaventLink.title}</h3>
      <ul>
        {relavents.map((link: string) => (
          <li>
            <a href={link} class="relavent-link">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

RelaventLinks.css = `
.relavent-links h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.relavent-links ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 0;
}

.relavent-links li {
  margin-bottom: 0.5rem;
}
`

export default (() => RelaventLinks) satisfies QuartzComponentConstructor;

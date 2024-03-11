import partytown from "@astrojs/partytown";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { defineConfig } from "astro/config";
import emoji from "remark-emoji";
import remarkMermaid from "remark-mermaidjs";
import remarkSvgBob from "remark-svgbob";
import remarkYoutube from "remark-youtube";
import starlightLinksValidator from "starlight-links-validator";
import { collapsibleFrames } from "/src/plugins/collapsible-frames";
import remarkIncludeCode from "/src/plugins/remark-code-import";

// https://astro.build/config
export default defineConfig({
  site: "https://ratatui.rs",
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false,
      },
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  markdown: {
    remarkPlugins: [remarkIncludeCode, emoji, remarkMermaid, remarkYoutube, remarkSvgBob],
  },
  integrations: [
    starlight({
      title: "Ratatui",
      customCss: ["/src/tailwind.css"],
      logo: {
        dark: "./src/assets/logo-dark.png",
        light: "./src/assets/logo-light.png",
        replacesTitle: true,
      },
      favicon: "/favicon-32.png",
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "/ratatui-og.png",
          },
        },
      ],
      components: {
        Header: "./src/components/Header.astro",
      },
      plugins: [
        starlightLinksValidator({
          errorOnRelativeLinks: false,
        }),
      ],
      expressiveCode: {
        plugins: [pluginCollapsibleSections(), collapsibleFrames()],
      },
      social: {
        github: "https://github.com/ratatui-org/ratatui",
        discord: "https://discord.gg/pMCEU9hNEj",
        matrix: "https://matrix.to/#/#ratatui:matrix.org",
        mastodon: "https://fosstodon.org/@ratatui_rs",
        twitter: "https://twitter.com/ratatui_rs",
        linkedin: "https://www.linkedin.com/company/ratatui-rs",
      },
      sidebar: [
        { label: "Introduction", link: "/introduction/" },
        {
          label: "Installation",
          collapsed: true,
          items: [
            { label: "Installation", link: "/installation/" },
            { label: "Feature Flags", link: "/installation/feature-flags/" },
          ],
        },
        {
          label: "Tutorials",
          collapsed: true,
          items: [
            { label: "Tutorials", link: "/tutorials/" },
            { label: "Hello World", link: "/tutorials/hello-world/" },
            {
              label: "Counter App",
              collapsed: true,
              items: [
                { label: "Overview", link: "/tutorials/counter-app/" },
                { label: "Basic App", link: "/tutorials/counter-app/basic-app/" },
                { label: "Error Handling", link: "/tutorials/counter-app/error-handling/" },
              ],
            },
            {
              label: "JSON Editor",
              collapsed: true,
              items: [
                { label: "JSON Editor", link: "/tutorials/json-editor/" },
                { label: "App.rs", link: "/tutorials/json-editor/app/" },
                { label: "Main.rs", link: "/tutorials/json-editor/main/" },
                {
                  label: "Ui.rs",
                  collapsed: true,
                  items: [
                    { label: "UI", link: "/tutorials/json-editor/ui/" },
                    { label: "Ui.rs - Main", link: "/tutorials/json-editor/ui-main/" },
                    { label: "Ui.rs - Editing", link: "/tutorials/json-editor/ui-editing/" },
                    { label: "Ui.rs - Exit", link: "/tutorials/json-editor/ui-exit/" },
                  ],
                },
                { label: "Conclusion", link: "/tutorials/json-editor/closing-thoughts/" },
              ],
            },
            {
              label: "Async Counter App",
              collapsed: true,
              items: [
                { label: "Async Counter App", link: "/tutorials/counter-async-app/" },
                {
                  label: "Async KeyEvents",
                  link: "/tutorials/counter-async-app/async-event-stream/",
                },
                { label: "Async Render", link: "/tutorials/counter-async-app/full-async-events/" },
                { label: "Introducing Actions", link: "/tutorials/counter-async-app/actions/" },
                {
                  label: "Async Actions",
                  link: "/tutorials/counter-async-app/full-async-actions/",
                },
                { label: "Conclusion", link: "/tutorials/counter-async-app/conclusion/" },
              ],
            },
          ],
        },
        {
          label: "Concepts",
          collapsed: true,
          items: [
            { label: "Concepts", link: "/concepts/" },
            { label: "Layout", link: "/concepts/layout/" },
            { label: "Event Handling", link: "/concepts/event-handling/" },
            {
              label: "Rendering",
              collapsed: true,
              items: [
                { label: "Rendering", link: "/concepts/rendering/" },
                { label: "Under the hood", link: "/concepts/rendering/under-the-hood/" },
              ],
            },
            {
              label: "Application Patterns",
              collapsed: true,
              items: [
                { label: "Application Patterns", link: "/concepts/application-patterns/" },
                {
                  label: "The Elm Architecture",
                  link: "/concepts/application-patterns/the-elm-architecture/",
                },
                {
                  label: "Component Architecture",
                  link: "/concepts/application-patterns/component-architecture/",
                },
                {
                  label: "Flux Architecture",
                  link: "/concepts/application-patterns/flux-architecture/",
                },
              ],
            },
            {
              label: "Backends",
              collapsed: true,
              items: [
                { label: "Backends", link: "/concepts/backends/" },
                { label: "Comparison", link: "/concepts/backends/comparison/" },
                { label: "Raw Mode", link: "/concepts/backends/raw-mode/" },
                { label: "Alternate Screen", link: "/concepts/backends/alternate-screen/" },
                { label: "Mouse Capture", link: "/concepts/backends/mouse-capture/" },
              ],
            },
          ],
        },
        {
          label: "How To",
          collapsed: true,
          items: [
            { label: "How To", link: "/how-to/" },
            {
              label: "Layout UIs",
              collapsed: true,
              items: [
                { label: "Layout UIs", link: "/how-to/layout/" },
                { label: "Create Dynamic Layouts", link: "/how-to/layout/dynamic/" },
                { label: "Center a Rect", link: "/how-to/layout/center-a-rect/" },
                { label: "Collapse Borders", link: "/how-to/layout/collapse-borders/" },
              ],
            },
            {
              label: "Render UIs",
              collapsed: true,
              items: [
                { label: "Render UIs", link: "/how-to/render/" },
                { label: "Display Text", link: "/how-to/render/display-text/" },
                { label: "Style Text", link: "/how-to/render/style-text/" },
                { label: "Overwrite Regions", link: "/how-to/render/overwrite-regions/" },
              ],
            },
            {
              label: "Use Widgets",
              collapsed: true,
              items: [
                { label: "Use Widgets", link: "/how-to/widgets/" },
                { label: "Block", link: "/how-to/widgets/block/" },
                { label: "Paragraph", link: "/how-to/widgets/paragraph/" },
                { label: "Create Custom Widgets", link: "/how-to/widgets/custom/" },
              ],
            },
            {
              label: "Develop Applications",
              collapsed: true,
              items: [
                { label: "Develop Applications", link: "/how-to/develop-apps/" },
                { label: "CLI arguments", link: "/how-to/develop-apps/cli-arguments/" },
                {
                  label: "Configuration Directories",
                  link: "/how-to/develop-apps/config-directories/",
                },
                { label: "Logging with Tracing", link: "/how-to/develop-apps/log-with-tracing/" },
                {
                  label: "Terminal and Event handler",
                  link: "/how-to/develop-apps/terminal-and-event-handler/",
                },
                { label: "Setup Panic Hooks", link: "/how-to/develop-apps/panic-hooks/" },
                { label: "Color_eyre Error Hooks", link: "/how-to/develop-apps/color-eyre/" },
                { label: "Better Panic Hooks", link: "/how-to/develop-apps/better-panic/" },
                { label: "Migrate from tui-rs", link: "/how-to/develop-apps/migrate-from-tui-rs/" },
              ],
            },
          ],
        },
        { label: "FAQ", link: "/faq/" },
        {
          label: "Highlights",
          collapsed: true,
          items: [
            { label: "Highlights", link: "/highlights/" },
            { label: "v0.26", link: "/highlights/v026/" },
            { label: "v0.25", link: "/highlights/v025/" },
            { label: "v0.24", link: "/highlights/v024/" },
            { label: "v0.23", link: "/highlights/v023/" },
            { label: "v0.22", link: "/highlights/v022/" },
            { label: "v0.21", link: "/highlights/v021/" },
          ],
        },
        {
          label: "Showcase",
          collapsed: true,
          items: [
            { label: "Showcase", link: "/showcase/" },
            { label: "Apps", link: "/showcase/apps/" },
            { label: "Built-in Widgets", link: "/showcase/widgets/" },
            { label: "Third Party Widgets", link: "/showcase/third-party-widgets/" },
          ],
        },
        {
          label: "Templates",
          collapsed: true,
          items: [
            { label: "Templates", link: "/templates/" },
            {
              label: "Component",
              collapsed: true,
              items: [
                { label: "Component", link: "/templates/component/" },
                { label: "Project Structure", link: "/templates/component/project-structure/" },
                { label: "Main.rs", link: "/templates/component/main-rs/" },
                { label: "Tui.rs", link: "/templates/component/tui-rs/" },
                { label: "Action.rs", link: "/templates/component/action-rs/" },
                { label: "Components.rs", link: "/templates/component/components-rs/" },
                { label: "Components/home.rs", link: "/templates/component/components-home-rs/" },
                { label: "Config.rs", link: "/templates/component/config-rs/" },
                { label: "Utils.rs", link: "/templates/component/utils-rs/" },
              ],
            },
          ],
        },
        { label: "References", link: "/references/" },
        {
          label: "Developer Guide",
          collapsed: true,
          items: [
            { label: "Developer Guide", link: "/developer-guide/" },
            { label: "Contributing to Ratatui", link: "/developer-guide/ratatui/" },
            { label: "Contributing to Website", link: "/developer-guide/website/" },
            { label: "Git guide", link: "/developer-guide/git-guide/" },
          ],
        },
      ],
      editLink: {
        baseUrl: "https://github.com/ratatui-org/ratatui-website/edit/main/",
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    partytown(),
  ],
  vite: {
    server: {
      watch: {
        ignored: ["**/target/**/*"],
      },
    },
  },
});

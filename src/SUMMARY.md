# Summary

[Introduction to Ratatui](./README.md)

# User Guide

- [Installation](./installation.md)

- [Tutorials](./tutorial/README.md)

  - [Hello World](./tutorial/hello-world/README.md)
  - [Counter App](./tutorial/counter-app/README.md)
    - [Single Function](./tutorial/counter-app/single-function.md)
    - [Multiple Functions](./tutorial/counter-app/multiple-functions.md)
    - [Multiple Files](./tutorial/counter-app/multiple-files.md)
      - [app.rs](./tutorial/counter-app/app.md)
      - [ui.rs](./tutorial/counter-app/ui.md)
      - [event.rs](./tutorial/counter-app/event.md)
      - [tui.rs](./tutorial/counter-app/tui.md)
      - [update.rs](./tutorial/counter-app/update.md)
      - [main.rs](./tutorial/counter-app/main.md)
  - [JSON Editor](./tutorial/json-editor/README.md)
    - [App.rs - Holding application state](./tutorial/json-editor/app.md)
    - [Main.rs - UI loop and event handling](./tutorial/json-editor/main.md)
    - [Ui.rs - Layouts, widgets, frames, oh my!](./tutorial/json-editor/ui.md)
      - [Ui.rs - Main](./tutorial/json-editor/ui-main.md)
      - [Ui.rs - Editing](./tutorial/json-editor/ui-editing.md)
      - [Ui.rs - Exit](./tutorial/json-editor/ui-exit.md)
    - [Conclusion](./tutorial/json-editor/closing_thoughts.md)
  - [Async Counter App](./tutorial/counter-async-app/README.md)
    - [Actions](./tutorial/counter-async-app/actions.md)
    - [Sync Increment & Decrement](./tutorial/counter-async-app/sync-increment-decrement.md)
    - [Async Increment & Decrement](./tutorial/counter-async-app/async-increment-decrement.md)
    - [Async Event Stream](./tutorial/counter-async-app/async-event-stream.md)
    - [Full Async](./tutorial/counter-async-app/full-async.md)
  - [Stopwatch App](./tutorial/stopwatch-app/README.md)

- [How To](./how-to/README.md)

  - [Layout UIs](./how-to/layout/README.md)
    - [Layout Widgets]()
    - [Center a Rect](./how-to/layout/center-a-rect.md)
    - [Nest Blocks]()
  - [Render Text](./how-to/render/README.md)
    - [Display Text](./how-to/render/display-text.md)
    - [Style Text](./how-to/render/style-text.md)
  - [Use Widgets](./how-to/widgets/README.md)
    - [Paragraph](./how-to/widgets/paragraph.md)
    - [Block](./how-to/widgets/block.md)
    - [Create a Widget]()
  - [Develop Applications](./how-to/develop-apps/README.md)
    - [CLI arguments](./how-to/develop-apps/cli-arguments.md)
    - [Configuration Directories](./how-to/develop-apps/config-directories.md)
    - [Tracing](./how-to/develop-apps/tracing.md)
    - [Arrange your App Code](./how-to/develop-apps/arrange-your-app-code.md)
    - [Setup Panic Hooks](./how-to/develop-apps/setup-panic-hooks.md)
    - [Use `better-panic`](./how-to/develop-apps/better-panic.md)

- [FAQ](./faq/README.md)

  - [Duplicate key events](./faq/duplicate-key-events-windows.md)
  - [`tokio` / `async`](./faq/tokio-async.md)
  - [`tui.rs` history](./faq/tui-rs-history.md)
  - [`ratatui` vs `tui-realm`](./faq/ratatui-vs-tui-realm.md)

# Reference

- [Concepts](./concepts/README.md)

  - [Backends](./concepts/backends/README.md)
    - [Comparison](./concepts/backends/comparison.md)
    - [Raw Mode](./concepts/backends/raw-mode.md)
    - [Alternate Screen](./concepts/backends/alternate-screen.md)
    - [Mouse Capture](./concepts/backends/mouse-capture.md)
  - [Rendering](./concepts/rendering.md)
  - [Event Handling](./concepts/event_handling.md)
    - [Key Binding]()
  - [Application Patterns](./concepts/application-patterns/README.md)
    - [The Elm Architecture](./concepts/application-patterns/the-elm-architecture.md)
    - [Component Architecture](./concepts/application-patterns/component-architecture.md)
    - [Flux Architecture](./concepts/application-patterns/flux-architecture.md)
  - [Project Structure]()
  - [Design Patterns]()
    - [Application State]()
    - [Threading]()
    - [Logging]()
    - [Configuration]()

- [Integrations](./integrations/README.md)

- [References](./references/README.md)

  - [Features](./references/features.md)

- [Developer Guide]()

  - [Ratatui](./developer-guide/ratatui.md)
  - [Ratatui Book](./developer-guide/book.md)
  - [License](./LICENSE.md)

---

[Contributors](contributors.md)

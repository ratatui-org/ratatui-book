---
title: Crates TUI
---

In the previous tutorials, we were building purely sequentially operating applications. However,
there are times when you may be interested in running IO operations or heavy computations _in
between_ drawing 2 frames. You can achieve a consistent frame rate for rendering by running these
blocking operations in a background thread or task.

This tutorial will walk you through creating an `async` TUI app that makes an `async` request to
crates.io and lists the results based on a user prompt. This tutorial is a simplified version of the
[crates-tui] application.

[crates-tui]: https://github.com/ratatui-org/crates-tui

![](./crates-tui-demo-1.png)

## Dependencies

Run the following to setup a new project:

```bash
cargo new crates-tui-tutorial --bin
```

Here's all the dependencies required for this tutorial:

```toml title="Cargo.toml"
{{#include @code/crates-tui-tutorial-app/Cargo.toml:7:}}
```

Copy these dependencies into your `Cargo.toml`'s dependencies section.

:::note

[`tokio`] is an asynchronous runtime for the Rust programming language. It provides the building
blocks needed for writing network applications. We recommend you read the
[Tokio documentation](https://tokio.rs/tokio/tutorial).

You may also want to check out the documentation of [`crates_io_api`] before we begin.

:::

[`tokio`]: https://tokio.rs/
[`crates_io_api`]: https://docs.rs/crates_io_api/latest/crates_io_api/

This is what your folder structure should now look like:

```
.
├── Cargo.lock
├── Cargo.toml
└── src
   └── main.rs
```

Let's go through making these files one by one, starting with `main.rs`.

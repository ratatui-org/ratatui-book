# Installation

Installing ratatui is as simple as running the following:

```console
cargo add ratatui
```

And you can start programming TUIs.

`ratatui` is a library (i.e. a Rust crate).
Running the above command in your console will add the latest version of `ratatui` to your project.

If you are interested in adding a specific version, you can run the following:

```console
cargo add ratatui --version 0.19.0
```

## Hello World

To start with a new project, you can run the following:

```console
cargo new project
cd project
cargo add ratatui crossterm
```

```admonish note
`ratatui` has to be combined with a terminal backend.
You can learn more about the different terminal backends in [section on choosing a backend](./choosing-a-backend.md).
For the examples in this book, we are going to use `crossterm`.
```

Modify `src/main.rs` to the following:

```rust,no_run,noplayground
use ratatui::{
  prelude::{CrosstermBackend, Terminal},
  widgets::Paragraph,
};

fn main() -> Result<(), Box<dyn std::error::Error>> {
  crossterm::terminal::enable_raw_mode()?;
  crossterm::execute!(std::io::stderr(), crossterm::terminal::EnterAlternateScreen)?;

  let mut terminal = Terminal::new(CrosstermBackend::new(std::io::stderr()))?;

  loop {
    terminal.draw(|f| {
      f.render_widget(Paragraph::new("Hello World! (press 'q' to quit)"), f.size());
    })?;

    if crossterm::event::poll(std::time::Duration::from_millis(250))? {
      if let crossterm::event::Event::Key(key) = crossterm::event::read()? {
        if key.code == crossterm::event::KeyCode::Char('q') {
          break;
        }
      }
    }
  }

  crossterm::execute!(std::io::stderr(), crossterm::terminal::LeaveAlternateScreen)?;
  crossterm::terminal::disable_raw_mode()?;

  Ok(())
}
```

The above code does 3 things:

1. Sets up (and tears down) the terminal in raw mode and the alternate screen buffer.
1. Renders a `Paragraph` widget using the `CrosstermBackend` in a loop.
1. Polls for a key press event for 250ms and if the key is the letter "q" breaks out of the loop.

We can run our program with:

```
cargo run
```

You can press `q` to exit and go back to your terminal as it was before.

![](https://user-images.githubusercontent.com/1813121/262363304-d601478e-2091-40ce-b96f-671e9bf8904b.gif)

Congratulations! :tada:

You have written a "hello world" terminal user interface.
We will cover more real world and complex applications in the following sections.

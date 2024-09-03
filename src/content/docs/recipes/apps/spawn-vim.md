---
title: Spawn External Editor (Vim)
sidebar:
  order: 9
  label: Spawn External Editor (Vim)
---

In this recipe, we will explore how to spawn an external editor (Vim) from within the TUI app. This
example demonstrates how to temporarily exit the TUI, run an external command, and then return back
to our TUI app.

Full code:

```rust collapsed title="main.rs (click to expand)"
{{ #include @code/recipes/how-to-spawn-vim/src/main.rs }}
```

## Setup

First, let's look at the main function and the event handling logic:

```rust title="main.rs"
{{ #include @code/recipes/how-to-spawn-vim/src/main.rs:action_enum }}

{{ #include @code/recipes/how-to-spawn-vim/src/main.rs:main }}

{{ #include @code/recipes/how-to-spawn-vim/src/main.rs:run }}

{{ #include @code/recipes/how-to-spawn-vim/src/main.rs:handle-events }}
```

After initializing the terminal in `main` function, we enter a loop in `run` function where we draw
the UI and handle events. The `handle_events` function listens for key events and returns an
`Action` based on the key pressed. Here, we are calling `run_editor` function on `Action::EditFile`
which we will define in next section.

## Spawning Vim

Now, let's define the function `run_editor` function attached to `Action::EditFile` action.

```rust title="main.rs"
{{ #include @code/recipes/how-to-spawn-vim/src/main.rs:run_editor }}
```

To spawn Vim from our TUI app, we first need to relinquish control of input and output, allowing Vim
to have full control over the terminal.

The `run_editor` function handles the logic for spawning vim. First, we leave the alternate screen
and disable raw mode to restore terminal to it's original state. This part is similar to what
[`ratatui::restore`](https://docs.rs/ratatui/latest/ratatui/fn.restore.html) function does in the
`main` function. Next, we spawn a child process with
`Command::new("vim").arg("/tmp/a.txt").status()` which launches `vim` to edit the given file. At
this point, we have given up control of our TUI app to vim. Our TUI app will now wait for the exit
status of the child process. Once the user exits Vim, our TUI app regains control over the terminal
by re-entering alternate screen and enabling raw mode. Lastly, we clear the terminal to ensure the
TUI is displayed correctly.

:::note

Before running another application from your app, you must relinquish control of input and output,
allowing the other app to function correctly.

In the example above, we use a simple event-handling setup. However, if you are using advanced
setups like [component template](https://github.com/ratatui-org/templates), you will need to pause
input events before spawning an external process like Vim. Otherwise, Vim won't have full control
over keybindings and it won't work properly.

Using the
[`tui` module](https://github.com/ratatui-org/templates/blob/5e823efc871107345d59e5deff9284235c1f0bbc/component/template/src/tui.rs)
of the component template, you can do something like this to pause and resume event handlers:

```rust
Action::EditFile => {
  tui.exit()?;
  let cmd = String::from("vim");
  let cmd_args = vec!["/tmp/a.txt".into()];
  let status = std::process::Command::new(&command).args(&args).status()?;
  if !status.success() {
    eprintln!("\nCommand failed with status: {}", status);
  }
  tui.enter()?;
  tui.terminal.clear();
}
```

One more thing to note is that when attempting to start an external process without using the
pattern in the component template, issues can arise such as ANSI RGB values being printed into the
TUI upon returning from the external process. This happens because Vim requests the terminal
background color, and when the terminal responds over stdin, those responses are read by Crossterm
instead. If you encounter such issues, please refer to
[orhun/rattler-build@84ea16a](https://github.com/orhun/rattler-build/commit/84ea16a4f5af33e2703b6330fcb977065263cef6)
and [kdheepak/taskwarrior-tui#46](https://github.com/kdheepak/taskwarrior-tui/issues/46). Using
`select!` + `cancellation_token` + `tokio` as in the component template avoids this problem.

:::

## Running code

Running this program will display "Hello ratatui! (press 'q' to quit, 'e' to edit a file)" in the
terminal. Pressing 'e' will spawn a child process to spawn Vim for editing a temporary file and then
return to the ratatui application after Vim is closed.

Feel free to adapt this example to use other editors like `nvim`, `nano`, etc., by changing the
command in the `Action::EditFile` arm.

:::tip

If you prefer to launch the user-specified `$EDITOR` and retrieve the buffer (edited content) back
into your application, you can use the [`edit`](https://crates.io/crates/edit) crate. This can be
particularly useful if you need to capture the changes made by the user in the editor. There's also
[`editor-command`](https://docs.rs/editor-command/latest/editor_command) crate if you want more
control over launching / overriding editors based on `VISUAL` or `EDITOR` environment variables.

Alternatively, you may use the [`edtui`](https://github.com/preiter93/edtui) crate from ratatui's
ecosystem, which provides text editor widget inspired by vim.

:::

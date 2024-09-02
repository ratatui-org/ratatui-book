// ANCHOR: all
// ANCHOR: imports
use ratatui::{
    backend::CrosstermBackend,
    crossterm::{
        event::{self, Event, KeyCode, KeyEventKind},
        terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
        ExecutableCommand,
    },
    widgets::Paragraph,
    DefaultTerminal, Frame,
};
use std::io::{stdout, Result};
use std::process::Command;

type Terminal = ratatui::Terminal<CrosstermBackend<std::io::Stdout>>;
// ANCHOR_END: imports

// ANCHOR: action_enum
enum Action {
    EditFile,
    Quit,
    None,
}
// ANCHOR_END: action_enum

// ANCHOR: main
fn main() -> Result<()> {
    let terminal = ratatui::init();
    let app_result = run(terminal);
    ratatui::restore();
    app_result
}
// ANCHOR_END: main

// ANCHOR: run
fn run(mut terminal: DefaultTerminal) -> Result<()> {
    loop {
        terminal.draw(draw)?;
        match handle_events()? {
            Action::EditFile => run_editor(&mut terminal)?,
            Action::Quit => break,
            Action::None => {}
        }
    }
    Ok(())
}
// ANCHOR_END: run

// ANCHOR: handle-events
fn handle_events() -> Result<Action> {
    if !event::poll(std::time::Duration::from_millis(16))? {
        return Ok(Action::None);
    }
    match event::read()? {
        Event::Key(key) if key.kind == KeyEventKind::Press => match key.code {
            KeyCode::Char('q') => Ok(Action::Quit),
            KeyCode::Char('e') => Ok(Action::EditFile),
            _ => Ok(Action::None),
        },
        _ => Ok(Action::None),
    }
}
// ANCHOR_END: handle-events

// ANCHOR: run_editor
fn run_editor(terminal: &mut Terminal) -> Result<()> {
    stdout().execute(LeaveAlternateScreen)?;
    disable_raw_mode()?;
    Command::new("vim").arg("/tmp/a.txt").status()?;
    stdout().execute(EnterAlternateScreen)?;
    enable_raw_mode()?;
    terminal.clear()?;
    Ok(())
}
// ANCHOR_END: run_editor

// ANCHOR: draw
fn draw(frame: &mut Frame) {
    frame.render_widget(
        Paragraph::new("Hello ratatui! (press 'q' to quit, 'e' to edit a file)"),
        frame.area(),
    );
}
// ANCHOR_END: draw
// ANCHOR_END: all

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod app;

use app::cmd;
use tauri::Manager;

fn main() {
    let ctx = tauri::generate_context!();
    let _ = tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            cmd::open_link,
            cmd::get_manga_detail,
        ])
        .setup(|_app| {
            #[cfg(debug_assertions)]
            {
                let main_window = _app.get_window("main").unwrap();
                main_window.open_devtools();
            }
            Ok(())
        })
        .run(ctx)
        .expect("error while running Manga Viewer");
}

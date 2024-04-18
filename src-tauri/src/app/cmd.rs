use tauri::{api, command, AppHandle, Manager};

use crate::utils::{parse_url, ParsedUrl};

#[command]
pub fn open_link(app: AppHandle, url: String) {
    api::shell::open(&app.shell_scope(), url, None).unwrap();
}

#[command]
pub fn get_manga_detail(url: &str) -> Result<ParsedUrl, String> {
    parse_url(url)
}

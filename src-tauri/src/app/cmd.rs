use tauri::regex::Regex;
use tauri::{api, command, AppHandle, Manager};

#[derive(serde::Serialize)]
pub struct MangaDetail {
    pub domain_name: String,
    pub domain_url: String,
    pub domain_path: String,
    pub domain_icon: String,
}

#[command]
pub fn open_link(app: AppHandle, url: String) {
    api::shell::open(&app.shell_scope(), url, None).unwrap();
}

#[command]
pub async fn get_manga_detail(url: &str) -> Result<MangaDetail, String> {
    let re = Regex::new(r"https://([^/]+)/(.*)").unwrap();
    let mut domain = "".to_string();
    let mut path = "".to_string();

    if let Some(cap) = re.captures(url) {
        domain = cap
            .get(1)
            .map_or("".to_string(), |v| v.as_str().to_string());
        path = cap
            .get(2)
            .map_or("".to_string(), |v| v.as_str().to_string());
    }

    println!("{} {}", domain, path);
    let req_url = "https://mangacross.jp/api/".to_string() + &path;
    println!("{}", req_url);
    let res_text = reqwest::get(req_url)
        .await
        .map_err(|_| "Net Error")?
        .text()
        .await
        .map_err(|_| "Net Error")?;
    print!("{}", res_text);

    let raw_info =
        serde_json::from_str::<serde_json::Value>(&res_text).map_err(|_| "Parsed Error")?;

    Ok(MangaDetail {
        domain_name: "マンガクロス".to_string(),
        domain_icon: "https://mangacross.jp/img/logo_pc.svg".to_string(),
        domain_url: domain.to_string(),
        domain_path: path.to_string(),
    })
}

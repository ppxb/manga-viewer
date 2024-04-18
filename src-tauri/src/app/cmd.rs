use tauri::regex::Regex;
use tauri::{api, command, AppHandle, Manager};

#[derive(serde::Serialize)]
pub struct MangaInfo {
    domain: MangaInfoDomain,
    comic: MangaInfoComic,
}

#[derive(serde::Serialize)]
pub struct MangaInfoDomain {
    name: String,
    url: String,
    path: String,
    icon: String,
}

#[derive(serde::Serialize)]
pub struct MangaInfoComic {
    title: String,
    author: String,
    category: String,
    tags: Vec<String>,
    logo: String,
    episodes: Vec<MangaInfoEpisode>,
    next_publish_at: String,
}

#[derive(serde::Serialize)]
pub struct MangaInfoEpisode {
    page_url: String,
    list_image_url: String,
    publish_start: String,
    sort_volume: i64,
    status: String,
    title: String,
    volume: String,
}

#[command]
pub fn open_link(app: AppHandle, url: String) {
    api::shell::open(&app.shell_scope(), url, None).unwrap();
}

#[command]
pub async fn get_manga_detail(url: &str) -> Result<MangaInfo, String> {
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

    let req_url = "https://mangacross.jp/api/".to_string() + &path;
    let res_text = reqwest::get(req_url)
        .await
        .map_err(|_| "Net Error")?
        .text()
        .await
        .map_err(|_| "Net Error")?;

    let raw = serde_json::from_str::<serde_json::Value>(&res_text).map_err(|_| "Parsed Error")?;

    let tags = raw["comic"]["comic_tags"]
        .as_array()
        .unwrap()
        .iter()
        .map(|tag| tag["name"].as_str().unwrap().to_string())
        .collect::<Vec<String>>();

    let episodes = raw["comic"]["episodes"]
        .as_array()
        .unwrap()
        .iter()
        .map(|episode| MangaInfoEpisode {
            page_url: String::from(episode["page_url"].as_str().unwrap()),
            list_image_url: String::from(episode["list_image_url"].as_str().unwrap()),
            publish_start: String::from(episode["publish_start"].as_str().unwrap()),
            sort_volume: episode["sort_volume"].as_i64().unwrap(),
            status: String::from(episode["status"].as_str().unwrap()),
            volume: String::from(episode["volume"].as_str().unwrap()),
            title: String::from(episode["title"].as_str().unwrap()),
        })
        .collect::<Vec<MangaInfoEpisode>>();
    Ok(MangaInfo {
        domain: MangaInfoDomain {
            name: String::from("マンガクロス"),
            icon: String::from("https://mangacross.jp/img/logo_pc.svg"),
            url: String::from(domain),
            path: String::from(path),
        },
        comic: MangaInfoComic {
            title: String::from(raw["comic"]["title"].as_str().unwrap_or("")),
            author: String::from(raw["comic"]["author"].as_str().unwrap_or("")),
            category: String::from(
                raw["comic"]["comic_category"]["display_name"]
                    .as_str()
                    .unwrap_or(""),
            ),
            tags,
            episodes,
            logo: String::from(raw["comic"]["logo_url"].as_str().unwrap_or("")),
            next_publish_at: String::from(raw["comic"]["next_publish_at"].as_str().unwrap_or("")),
        },
    })
}

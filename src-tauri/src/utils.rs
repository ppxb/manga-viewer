use tauri::regex::Regex;

#[derive(serde::Serialize)]
pub struct ParsedUrl {
    domain: String,
    path: String,
}

pub fn parse_url(url: &str) -> Result<ParsedUrl, String> {
    let re = Regex::new(r"https://([^/]+)/(.*)").unwrap();

    match re.captures(url) {
        Some(cap) => {
            let domain = cap.get(1).map_or("", |v| v.as_str());
            let path = cap.get(2).map_or("", |v| v.as_str());

            if domain.len() > 0 && path.len() > 0 {
                return Ok(ParsedUrl {
                    domain: domain.to_string(),
                    path: path.to_string(),
                });
            }
        }
        _ => (),
    }

    Err("Unspported Url".into())
}

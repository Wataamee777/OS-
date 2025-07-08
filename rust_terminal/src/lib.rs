use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn run_command(cmd: &str) -> String {
    match cmd.trim() {
        "whoami" => "わたあめえ".to_string(),
        "help" => "使えるコマンド: whoami, help, clear".to_string(),
        "clear" => "".to_string(),
        _ => format!("{}: command not found", cmd),
    }
}

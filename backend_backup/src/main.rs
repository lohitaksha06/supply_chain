use dotenv::dotenv;
use std::net::SocketAddr;
use std::sync::Arc;
use tower_http::cors::{Any, CorsLayer};

mod db;
mod models;
mod routes;
mod utils;

#[tokio::main]
async fn main() {
    dotenv().ok();

    // Initialize DB and get pool
    let pool = Arc::new(
        db::get_db_pool()
            .await
            .expect("Failed to connect to DB"),
    );
    db::init_db().await.expect("DB init failed");

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Use the modular route setup
    let app = routes::create_routes(pool.clone()).layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("🚀 Server running at http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

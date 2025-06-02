use axum::Router;
use dotenv::dotenv;
use std::net::SocketAddr;
use std::sync::Arc;
use sqlx::SqlitePool;

mod db;
mod routes;
mod models;

#[tokio::main]
async fn main() {
    dotenv().ok();

    // Initialize DB and get pool
    let pool = Arc::new(
        db::get_db_pool()
            .await
            .expect("Failed to connect to DB")
    );
    db::init_db().await.expect("DB init failed");

    // Use the modular route setup
    let app = routes::create_routes(pool.clone());

    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("🚀 Server running at http://{}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

use axum::{Router, routing::post, extract::State};
use dotenv::dotenv;
use std::net::SocketAddr;
use sqlx::SqlitePool;

mod db;
mod routes;
mod models;

#[tokio::main]
async fn main() {
    dotenv().ok();

    // Initialize DB and get pool
    let pool = db::get_db_pool().await.expect("Failed to connect to DB");
    db::init_db().await.expect("DB init failed");

    // Set up routes and inject state
    let app = Router::new()
        .route("/signup", post(signup))
        .route("/login", post(login))
        .with_state(pool);


    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("🚀 Server running at http://{}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

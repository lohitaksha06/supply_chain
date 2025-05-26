use axum::{Router, routing::post};
use dotenv::dotenv;
use std::net::SocketAddr;
use hyper::Server;

mod db;
mod routes;
mod models;

#[tokio::main]
async fn main() {
    dotenv().ok();
    db::init_db().await.expect("DB init failed");

    let app = Router::new()
        .route("/signup", post(routes::signup));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    println!("Server running on http://{}", addr);
    Server::bind(&addr)

        .serve(app.into_make_service())
        .await
        .unwrap();
}

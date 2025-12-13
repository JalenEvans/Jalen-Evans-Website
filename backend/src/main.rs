mod db;
mod models;
mod routes;
mod error;

use axum::{
    routing::get,
    Router,
};
use tower_http::cors::{CorsLayer, Any};
use routes::post::post_routes;

#[tokio::main]
async fn main() {
    // Get database
    let pool = db::get_db_pool().await;

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // build our application with a single route
    let app: Router = Router::new()
        .route("/", get(|| async { "Hello, World!" }))
        .merge(post_routes())
        .layer(cors)
        .with_state(pool);

    // run our app with hyper, listening locally on port 3000
    let port: i32 = 3000;
    let listener: tokio::net::TcpListener = tokio::net::TcpListener::bind(format!("127.0.0.1:{port}")).await.unwrap();
    println!("Listening at \"127.0.0.1:{port}\"");
    axum::serve(listener, app).await.unwrap();
}

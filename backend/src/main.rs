use axum::{
    routing::get,
    Router,
};

#[tokio::main]
async fn main() {
    // build our application with a single route
    let app = Router::new().route("/", get(|| async { "Hello, World!" }));

    // run our app with hyper, listening locally on port 3000
    let port = 3000;
    let listener = tokio::net::TcpListener::bind(format!("127.0.0.1:{port}")).await.unwrap();
    println!("Listening at \"127.0.0.1:{0}\"", port);
    axum::serve(listener, app).await.unwrap();
}

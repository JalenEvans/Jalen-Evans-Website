use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;

use dotenv::dotenv;

pub async fn get_db_pool() -> PgPool {
    dotenv().ok();

    let database_url: String = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set in .env");

    PgPoolOptions::new().max_connections(5).connect(&database_url).await.expect("Failed to connect to database.")
}
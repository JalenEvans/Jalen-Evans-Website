use axum::{
    extract::{Path, State},
    Json, Router,
    routing::{get, post, put, delete},
};
use sqlx::PgPool;
use uuid::Uuid;

use crate::{models::post::{Post, NewPost}, error::AppError};

pub fn post_routes() -> Router<PgPool> {
    Router::new()
        .route("/posts", get(get_posts))
        .route("/posts", post(create_post))
        .route("/posts/{id}", get(get_post))
        .route("/posts/{id}", put(update_post))
        .route("/posts/{id}", delete(delete_post))
}

async fn create_post(
    State(pool): State<PgPool>,
    Json(new_post): Json<NewPost>,
) -> Result<Json<Post>, AppError> {
    let post = sqlx::query_as!(
        Post,
        r#"
        INSERT INTO post (post_id, title, content) 
        VALUES ($1, $2, $3) 
        RETURNING *
        "#,
        Uuid::new_v4(), &new_post.title, &new_post.content
    )
    .fetch_one(&pool)
    .await?;

    Ok(Json(post))
}

async fn get_posts(State(pool): State<PgPool>) -> Json<Vec<Post>> {
    let posts = sqlx::query_as!(
        Post,
        "SELECT * FROM post ORDER BY created_at DESC",
    )
    .fetch_all(&pool)
    .await
    .unwrap();

    Json(posts)
}

async fn get_post(
    Path(post_id): Path<Uuid>,
    State(pool): State<PgPool>
) -> Result<Json<Post>, AppError> {
    let post = sqlx::query_as!(
        Post,
        r#"
        SELECT post_id, title, content, created_at, updated_at 
        FROM post 
        WHERE post_id = $1
        "#,
        post_id
    )
    .fetch_optional(&pool)
    .await?;

    match post {
        Some(post) => Ok(Json(post)),
        None => Err(AppError::NotFound)
    }
}

async fn update_post(
    Path(post_id): Path<Uuid>,
    State(pool): State<PgPool>,
    Json(updated_post): Json<NewPost>
) -> Result<Json<Post>, AppError> {
    let post: Option<Post> = sqlx::query_as!(
        Post,
        r#"
        UPDATE post 
        SET title = $1, content = $2, updated_at = NOW() 
        WHERE post_id = $3 
        RETURNING *
        "#,
        &updated_post.title, &updated_post.content, post_id
    )
    .fetch_optional(&pool)
    .await?;

    match post {
        Some(post) => Ok(Json(post)),
        None => Err(AppError::NotFound),
    }
}

async fn delete_post(
    Path(post_id): Path<Uuid>,
    State(pool): State<PgPool>
) -> Result<Json<bool>, AppError> {
    let result = sqlx::query!(
        r#"
        DELETE FROM post 
        WHERE post_id = $1
        "#,
        post_id
    )
    .execute(&pool)
    .await?;

    Ok(Json(result.rows_affected() > 0))
}
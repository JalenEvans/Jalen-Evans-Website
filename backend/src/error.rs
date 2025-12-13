use axum::{
    Json, http::StatusCode, response::{IntoResponse, Response}
};
use serde::Serialize;

#[derive(Debug)]
pub enum AppError {
    NotFound,
    Database(sqlx::Error),
}

#[derive(Serialize)]
pub struct ErrorResponse {
    message: String,
}

impl IntoResponse for AppError {
    fn into_response (self) -> Response {
        let (status, message) = match self {
            AppError::NotFound => (StatusCode::NOT_FOUND, "Resource not found."),
            AppError::Database(_) => (StatusCode::INTERNAL_SERVER_ERROR, "Database error"),
        };

        let body = Json(ErrorResponse {
            message: message.to_string(),
        });

        (status, body).into_response()
    }
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        AppError::Database(err)
    }
}
use axum::{
    Json, http::StatusCode, response::{IntoResponse, Response}
};
use serde::Serialize;

#[derive(Debug)]
pub enum AppError {
    NotFound,
    DuplicateTitle,
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
            AppError::DuplicateTitle => (StatusCode::CONFLICT, "A post with this title already exists."),
            AppError::Database(err) => {
                tracing::error!("Database error: {:?}", err);
                (StatusCode::INTERNAL_SERVER_ERROR, "Database error")
            },
        };

        let body = Json(ErrorResponse {
            message: message.to_string(),
        });

        (status, body).into_response()
    }
}

impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        if let sqlx::Error::Database(db_err) = &err {
            if db_err.code().as_deref() == Some("23505") {
                return AppError::DuplicateTitle;
            }
        }

        AppError::Database(err)
    }
}
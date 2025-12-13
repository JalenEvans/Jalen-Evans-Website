use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Deserialize, Serialize, Clone)]
pub struct Post {
    pub post_id: Uuid,
    pub title: String,
    pub content: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: Option<DateTime<Utc>>
}

#[derive(Deserialize)]
pub struct NewPost {
    pub title: String,
    pub content: String,
}
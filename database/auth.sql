CREATE TABLE user (
    id VARCHAR(255) PRIMARY KEY,
    google_id INTEGER NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL);

CREATE TABLE user_session (
    id VARCHAR(255) PRIMARY KEY,
    expires_at DATETIME NOT NULL,
    user_id VARCHAR(255) NOT NULL REFERENCES user(id)
);

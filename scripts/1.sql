create database ludik_todo_db;

use ludik_todo_db;

CREATE TABLE tbl_tasks (
    int_id INT PRIMARY KEY AUTO_INCREMENT,
    vch_title VARCHAR(255) NOT NULL,
    vch_description TEXT,
    vch_status ENUM(
        'pending',
        'in-progress',
        'completed'
    ) NOT NULL,
    dtt_creation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dtt_update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
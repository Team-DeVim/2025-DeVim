DROP TABLE "likes"      IF EXISTS;
DROP TABLE "comment"    IF EXISTS;
DROP TABLE "board"      IF EXISTS;
DROP TABLE "board_type" IF EXISTS;
DROP TABLE "user_role"  IF EXISTS;
DROP TABLE "user"       IF EXISTS;

DROP SEQUENCE "seq_like_no"        IF EXISTS;
DROP SEQUENCE "seq_comment_no"     IF EXISTS;
DROP SEQUENCE "seq_board_no"       IF EXISTS;
DROP SEQUENCE "seq_board_type_no"  IF EXISTS;
DROP SEQUENCE "seq_user_no"        IF EXISTS;


CREATE TABLE "user" (
                        "user_no"            NUMBER PRIMARY KEY,
                        "id"                 VARCHAR2(50)  NOT NULL,
                        "password"           VARCHAR2(50)  NOT NULL,
                        "name"               VARCHAR2(50)  NOT NULL,
                        "social"             NUMBER        NOT NULL,
                        "profile_image_path" VARCHAR2(255),
                        "is_dark"            NUMBER        NOT NULL,
                        "created_dt"         DATE          NOT NULL,
                        "delete_flag"        NUMBER        NOT NULL
);

CREATE TABLE "user_role" (
                             "user_no" NUMBER       NOT NULL,
                             "role"    VARCHAR2(50) NOT NULL
);

CREATE TABLE "board" (
                         "board_no"      NUMBER        PRIMARY KEY,
                         "board_type_no" NUMBER        NOT NULL,
                         "title"         VARCHAR2(50)  NOT NULL,
                         "board_content" VARCHAR2(2000) NOT NULL,
                         "writer"        NUMBER        NOT NULL,
                         "created_dt"    DATE          NOT NULL,
                         "delete_flag"   NUMBER        NOT NULL
);

CREATE TABLE "board_type" (
                              "board_type_no" NUMBER       PRIMARY KEY,
                              "board_name"    VARCHAR2(50) NOT NULL
);

CREATE TABLE "comment" (
                           "comment_no"      NUMBER         PRIMARY KEY,
                           "board_no"        NUMBER         NOT NULL,
                           "comment_content" VARCHAR2(1000) NOT NULL,
                           "writer"          NUMBER         NOT NULL,
                           "created_dt"      DATE           NOT NULL,
                           "delete_flag"     NUMBER         NOT NULL
);

CREATE TABLE "likes" (
                         "like_no"    NUMBER       PRIMARY KEY,
                         "user_no"    NUMBER       NOT NULL,
                         "target_id"  NUMBER       NOT NULL,
                         "target_type" VARCHAR2(50) NOT NULL,
                         "created_dt" DATE         NOT NULL
);


ALTER TABLE "user_role"
    ADD CONSTRAINT "user_user_role"
        FOREIGN KEY ("user_no") REFERENCES "user" ("user_no");

ALTER TABLE "board"
    ADD CONSTRAINT "user_board"
        FOREIGN KEY ("writer") REFERENCES "user" ("user_no");

ALTER TABLE "comment"
    ADD CONSTRAINT "user_comment"
        FOREIGN KEY ("writer") REFERENCES "user" ("user_no");

ALTER TABLE "board"
    ADD CONSTRAINT "board_board_type"
        FOREIGN KEY ("board_type_no") REFERENCES "board_type" ("board_type_no");

ALTER TABLE "comment"
    ADD CONSTRAINT "board_comment"
        FOREIGN KEY ("board_no") REFERENCES "board" ("board_no");

ALTER TABLE "likes"
    ADD CONSTRAINT "user_likes"
        FOREIGN KEY ("user_no") REFERENCES "user" ("user_no");

CREATE SEQUENCE "seq_user_no";
CREATE SEQUENCE "seq_board_no";
CREATE SEQUENCE "seq_board_type_no";
CREATE SEQUENCE "seq_comment_no";
CREATE SEQUENCE "seq_like_no";
CREATE TABLE "user" (
  "user_no" number PRIMARY KEY,
  "id" varchar2(50) NOT NULL,
  "password" varchar2(255) NOT NULL,
  "name" varchar2(50) NOT NULL,
  "social" number NOT NULL,
  "profile_image_path" varchar2(255),
  "created_dt" date NOT NULL,
  "delete_flag" number NOT NULL
);

CREATE TABLE "user_role" (
  "user_no" number NOT NULL,
  "role" varchar2(50) NOT NULL
);

CREATE TABLE "board" (
  "board_no" number PRIMARY KEY,
  "board_type_no" number NOT NULL,
  "title" varchar2(50) NOT NULL,
  "board_content" varchar2(2000) NOT NULL,
  "writer" number NOT NULL,
  "created_dt" date NOT NULL,
  "delete_flag" number NOT NULL
);

CREATE TABLE "board_type" (
  "board_type_no" number PRIMARY KEY,
  "board_name" varchar2(50) NOT NULL
);

CREATE TABLE "comment" (
  "comment_no" number PRIMARY KEY,
  "board_no" number NOT NULL,
  "comment_content" varchar2(1000) NOT NULL,
  "writer" number NOT NULL,
  "created_dt" date NOT NULL,
  "delete_flag" number NOT NULL
);

CREATE TABLE "likes" (
  "like_no" number PRIMARY KEY,
  "user_no" number NOT NULL,
  "target_id" number NOT NULL,
  "target_type" varchar2(50) NOT NULL,
  "created_dt" date NOT NULL
);

CREATE TABLE "main_image" (
  "image_no" number PRIMARY KEY,
  "file_path" varchar2(255) NOT NULL,
  "thumbnail_path" varchar2(255) NOT NULL,
  "priority" number NOT NULL,
  "created_dt" date NOT NULL
);

ALTER TABLE "user_role" ADD CONSTRAINT "user_user_role" FOREIGN KEY ("user_no") REFERENCES "user" ("user_no");

ALTER TABLE "board" ADD CONSTRAINT "user_board" FOREIGN KEY ("writer") REFERENCES "user" ("user_no");

ALTER TABLE "comment" ADD CONSTRAINT "user_comment" FOREIGN KEY ("writer") REFERENCES "user" ("user_no");

ALTER TABLE "board" ADD CONSTRAINT "board_board_type" FOREIGN KEY ("board_type_no") REFERENCES "board_type" ("board_type_no");

ALTER TABLE "comment" ADD CONSTRAINT "board_comment" FOREIGN KEY ("board_no") REFERENCES "board" ("board_no");

ALTER TABLE "likes" ADD CONSTRAINT "user_likes" FOREIGN KEY ("user_no") REFERENCES "user" ("user_no");


create sequence "seq_user_no";
create sequence "seq_board_no";
create sequence "seq_board_type_no";
create sequence "seq_comment_no";
create sequence "seq_like_no";
create sequence "seq_main_image_no";

INSERT INTO "board_type" (
    "board_type_no",
    "board_name"
) VALUES ( 1, '자유게시판' );
INSERT INTO "board_type" (
    "board_type_no",
    "board_name"
) VALUES ( 2, '질문게시판' );
INSERT INTO "board_type" (
    "board_type_no",
    "board_name"
) VALUES ( 3, '공지사항' );



-- These commands will configure a PostgreSQL database to work with Chatterwerks

CREATE TABLE "Users" (
"user_id"  SERIAL NOT NULL ,
"user_name" VARCHAR NOT NULL ,
"user_password" TEXT NOT NULL ,
"registered_on" BIGINT NOT NULL DEFAULT extract(epoch from now()) ,
"last_login" BIGINT ,
PRIMARY KEY ("user_id")
);

CREATE TABLE "Threads" (
"thread_id"  SERIAL NOT NULL ,
"thread_name" VARCHAR NOT NULL ,
"thread_description" TEXT NOT NULL ,
"created_on" BIGINT NOT NULL DEFAULT extract(epoch from now()) ,
PRIMARY KEY ("thread_id")
);

CREATE TABLE "Messages" (
"message_id"  SERIAL NOT NULL ,
"user_id" SMALLINT NOT NULL ,
"thread_id" SMALLINT NOT NULL ,
"message_text" TEXT NOT NULL ,
"message_time" BIGINT NOT NULL DEFAULT extract(epoch from now()) ,
PRIMARY KEY ("message_id")
);

CREATE TABLE "Subscriptions" (
"subscription_id"  SERIAL NOT NULL ,
"user_id" SMALLINT NOT NULL ,
"thread_id" SMALLINT NOT NULL ,
"subscribed_on" BIGINT NOT NULL DEFAULT extract(epoch from now()) ,
PRIMARY KEY ("subscription_id")
);

ALTER TABLE "Messages" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id");
ALTER TABLE "Messages" ADD FOREIGN KEY ("thread_id") REFERENCES "Threads" ("thread_id");
ALTER TABLE "Subscriptions" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id");
ALTER TABLE "Subscriptions" ADD FOREIGN KEY ("thread_id") REFERENCES "Threads" ("thread_id");
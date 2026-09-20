CREATE TABLE IF NOT EXISTS `issues` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` text NOT NULL,
	`name` text NOT NULL,
	`class` text NOT NULL,
	`problem` text NOT NULL,
	`phone` text NOT NULL,
	`reg_time` integer NOT NULL,
	`app_time` integer NOT NULL,
	`closed` integer DEFAULT false NOT NULL,
	`closed_time` integer
);

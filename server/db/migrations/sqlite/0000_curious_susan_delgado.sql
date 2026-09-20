CREATE TABLE IF NOT EXISTS `issues` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` text NOT NULL,
	`name` text NOT NULL,
	`class` text NOT NULL,
	`phone` text NOT NULL,
	`problem` text NOT NULL,
	`reg_time` text NOT NULL,
	`app_time` text NOT NULL,
	`closed` integer NOT NULL,
	`closed_time` text
);

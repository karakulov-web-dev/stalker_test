--

ALTER TABLE `itv` ADD `tv_archive_duration` int not null default 72;

--//@UNDO

ALTER TABLE `itv` DROP `tv_archive_duration`;

--
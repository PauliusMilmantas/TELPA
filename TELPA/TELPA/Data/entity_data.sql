delete topics;
delete employees;
delete learningDays;
delete learningDayTopics;
delete learnedTopics;

set identity_insert topics on
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  1,
  'Matematika',
  'Aukštoji',
  null,
  0);

insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  2,
  'Algoritmų teorija',
  'Įvadas',
  null,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  3,
  'Kompiuterių architektūra',
  'Next level',
  null,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  4,
  'Duomenų bazės',
  'Baronas approved',
  null,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  5,
  'Word pagrindai',
  'Dapkūnas likes this',
  null,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  6,
  'Programų sistemų projektavimas',
  'Extended',
  null,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  7,
  'Anglu k.',
  'Cancer',
  null,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  8,
  'Taikomasis objektinis programavimas',
  'Usher.mp3',
  null,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  9,
  'Diskrečioji matematika',
  'Skersys mldc',
  null,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  10,
  'Kašubologija',
  'Ultimate kursas',
  null,
  0);
set identity_insert topics off








set identity_insert employees on
insert into employees (
  id,
  email,
  passwordHash,
  role,
  name,
  leaderId,
  version)
values (
  1,
  'admin@telpa.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Adminas',
  null,
  0)

insert into employees (
  id,
  email,
  passwordHash,
  role,
  name,
  leaderId,
  version)
values (
  2,
  'jonas@gmail.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Jonas Jonaitis',
  1,
  0)

insert into employees (
  id,
  email,
  passwordHash,
  role,
  name,
  leaderId,
  version)
values (
  3,
  'tomas@gmail.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Tomas Tomaitis',
  1,
  0)

insert into employees (
  id,
  email,
  passwordHash,
  role,
  name,
  leaderId,
  version)
values (
  4,
  'ona@gmail.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Ona Onaitė',
  3,
  0)

insert into employees (
  id,
  email,
  passwordHash,
  role,
  name,
  leaderId,
  version)
values (
  5,
  'vytas@gmail.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Vytas Vytauskas',
  2,
  0)

insert into employees (
  id,
  email,
  passwordHash,
  role,
  name,
  leaderId,
  version)
values (
  6,
  'ignas@gmail.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Ignas Ignaitis',
  2,
  0)

insert into employees (
  id,
  email,
  passwordHash,
  role,
  name,
  leaderId,
  version)
values (
  7,
  'kazimieras@gmail.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Kazimieras Kazimieravas',
  2,
  0)

insert into employees (
  id,
  email,
  passwordHash,
  role,
  name,
  leaderId,
  version)
values (
  8,
  'birute@gmail.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Birutė Birutaitė',
  4,
  0)

insert into employees (
  id,
  email,
  passwordHash,
  role,
  name,
  leaderId,
  version)
values (
  9,
  'olegas@gmail.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Olegas Olegauskas',
  3,
  0)

insert into employees (
  id,
  email,
  passwordHash,
  role,
  name,
  leaderId,
  version)
values (
  10,
  'vladimiras@gmail.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Vladimiras Vladimauskas',
  4,
  0)
set identity_insert employees off








set identity_insert learningDays on
insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  1,
  '2020-04-20',
  'Some intensive learning',
  2,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  2,
  '2020-04-20',
  'Some intensive learning',
  5,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  3,
  '2020-04-20',
  'Some intensive learning',
  4,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  4,
  '2020-04-20',
  'Some intensive learning',
  3,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  5,
  '2020-04-22',
  'Some intensive learning',
  4,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  6,
  '2020-04-22',
  'Some intensive learning',
  6,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  7,
  '2020-04-22',
  'Some intensive learning',
  5,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  8,
  '2020-04-23',
  'Some intensive learning',
  6,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  9,
  '2020-04-24',
  'Some intensive learning',
  6,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  10,
  '2020-04-24',
  'Some intensive learning',
  7,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  11,
  '2021-01-15',
  'Some intensive learning',
  6,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  12,
  '2021-01-15',
  'Some intensive learning',
  7,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  13,
  '2021-01-15',
  'Some intensive learning',
  8,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  14,
  '2021-01-16',
  'Some intensive learning',
  2,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  15,
  '2021-01-16',
  'Some intensive learning',
  3,
  0)  
set identity_insert learningDays off;









set identity_insert learningDayTopics on
insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  1,
  1,
  2,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  2,
  1,
  1,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  3,
  5,
  10,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  4,
  2,
  9,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  5,
  2,
  8,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  6,
  3,
  4,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  7,
  7,
  10,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  8,
  9,
  10,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  9,
  8,
  10,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  10,
  6,
  10,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  11,
  11,
  10,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  12,
  12,
  10,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  13,
  13,
  10,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  14,
  14,
  10,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  15,
  15,
  10,
  0)
set identity_insert learningDayTopics off;










set identity_insert learnedTopics on;
insert into learnedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  1,
  10,
  6,
  0)

insert into learnedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  2,
  10,
  5,
  0)

insert into learnedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  3,
  10,
  7,
  0)

insert into learnedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  4,
  10,
  2,
  0)

insert into learnedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  5,
  2,
  2,
  0)

set identity_insert learnedTopics off;



select * from topics;
select * from employees;
select * from learningDays order by employeeId;
select * from learningDayTopics;
select * from learnedTopics;
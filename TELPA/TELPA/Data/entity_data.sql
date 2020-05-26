delete topics;
delete employees;
delete learningDays;
delete learningDayTopics;

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
  'admin',
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
  'admin',
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
  'admin',
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
  'admin',
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
  'admin',
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
  'admin',
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
  'admin',
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
  'admin',
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
  'admin',
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
  'admin',
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
set identity_insert learningDayTopics off;

select * from topics;
select * from employees;
select * from learningDays order by employeeId;
select * from learningDayTopics;

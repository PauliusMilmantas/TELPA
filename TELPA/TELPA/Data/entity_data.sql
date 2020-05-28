delete employees;
delete invites;
delete learnedTopics;
delete learningDayLinks;
delete learningDays;
delete learningDayTopics;
delete limits;
delete recommendedTopics;
delete topicLinks;
delete topics;

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

insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  11,
  'Procedural Programming',
  'Data and procedures',
  null,
  0);

insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  12,
  'OOP',
  'Objects and methods',
  null,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  13,
  'Functional Programming',
  'Data and functions',
  null,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  14,
  'Haskell',
  'Learn Haskell',
  13,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  15,
  'F#',
  'Learn F#',
  13,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  16,
  'JAVA',
  'This is Java topic',
  12,
  4);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  17,
  'Python',
  'Learn Python',
  12,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  18,
  'LISP',
  'Learn LISP',
  12,
  0);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  19,
  'C#',
  'Learn C# and .NET',
  12,
  2);
  
insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  20,
  'Clojure',
  'Learn Clojure',
  18,
  0);  

insert into topics (
  id,
  name,
  description,
  parentTopicId,
  version)
values (
  21,
  'C',
  'Learn C',
  11,
  1);  
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
  9,
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
  11,
  'tautvydas@email.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Tautvydas Tautvydaitis',
  9,
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
  12,
  'matas@email.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Matas Mataitis',
  11,
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
  13,
  'mykolas@email.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Mykolas Mykolaitis',
  11,
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
  14,
  'rugile@email.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Rugilė Rugilaitė',
  12,
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
  15,
  'lukas@email.com',
  'oV9kgFiyFg6AITdi3W+NUy29cZIEeUBSiva4x39xnbI=',
  null,
  'Lukas Lukaitis',
  12,
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
  '2020-03-20',
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
  2,
  '2020-03-21',
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

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  16,
  '2020-06-01',
  'Learning',
  11,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  17,
  '2020-06-02',
  'Learning',
  12,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  18,
  '2020-06-03',
  'Learning',
  13,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  19,
  '2020-06-03',
  'Learning',
  14,
  0)

insert into learningDays (
  id,
  date,
  comment,
  employeeId,
  version)
values (
  20,
  '2020-06-04',
  'Learning',
  15,
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

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  16,
  16,
  16,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  17,
  17,
  17,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  18,
  18,
  18,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  19,
  19,
  19,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  20,
  20,
  20,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  21,
  16,
  18,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  22,
  16,
  19,
  0)

insert into learningDayTopics (
  id,
  learningDayId,
  topicId,
  version)
values (
  23,
  16,
  20,
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

insert into learnedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  6,
  11,
  11,
  0)

insert into learnedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  7,
  12,
  12,
  0)

insert into learnedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  8,
  13,
  13,
  0)

insert into learnedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  9,
  14,
  14,
  0)

insert into learnedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  10,
  15,
  15,
  0)  

set identity_insert learnedTopics off;






set identity_insert learningDayLinks on;

insert into learningDayLinks (
  id,
  learningDayId,
  link,
  version)
values (
  1,
  16,
  'https://www.one.com/',
  0)

insert into learningDayLinks (
  id,
  learningDayId,
  link,
  version)
values (
  2,
  17,
  'https://www.two.com/',
  0)

insert into learningDayLinks (
  id,
  learningDayId,
  link,
  version)
values (
  3,
  18,
  'https://www.three.com/',
  0)

insert into learningDayLinks (
  id,
  learningDayId,
  link,
  version)
values (
  4,
  19,
  'https://www.four.com/',
  0)

insert into learningDayLinks (
  id,
  learningDayId,
  link,
  version)
values (
  5,
  20,
  'https://www.five.com/',
  0)
set identity_insert learningDayLinks off;








set identity_insert recommendedTopics on;

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  1,
  16,
  11,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  2,
  16,
  12,
  0)


insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  3,
  16,
  13,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  4,
  16,
  14,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  5,
  16,
  15,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  6,
  11,
  12,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  7,
  11,
  13,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  8,
  11,
  14,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  9,
  11,
  15,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  10,
  13,
  11,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  11,
  17,
  11,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  12,
  12,
  11,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  13,
  21,
  11,
  0)

insert into recommendedTopics (
  id,
  topicId,
  employeeId,
  version)
values (
  14,
  21,
  12,
  0)

set identity_insert recommendedTopics off;



set identity_insert topicLinks on;

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  1,
  11,
  'https://www.csharp.com/',
  0)

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  2,
  12,
  'https://www.fsharp.com/',
  0)

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  3,
  13,
  'https://www.c.com/',
  0)

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  4,
  14,
  'https://www.lisp.com/',
  0)

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  5,
  15,
  'https://www.clojure.com/',
  0)

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  6,
  16,
  'https://www.python.com/',
  0)

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  7,
  17,
  'https://www.procedures.com/',
  0)

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  8,
  18,
  'https://www.oop.com/',
  0)

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  9,
  19,
  'https://www.functions.com/',
  0)

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  10,
  20,
  'https://www.haskell.com/',
  0)

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  11,
  21,
  'https://www.oracle.com/',
  0)

insert into topicLinks (
  id,
  topicId,
  link,
  version)
values (
  12,
  21,
  'https://www.java.com/',
  0)

set identity_insert topicLinks off;







set identity_insert limits on;

insert into limits (
  id,
  employeeId,
  startDate,
  endDate,
  maxConsecutiveLearningDays,
  maxTotalLearningDays,
  version)
values (
  1,
  6,
  '2020-04-01',
  '2020-04-30',
  5,
  3,
  0)

insert into limits (
  id,
  employeeId,
  startDate,
  endDate,
  maxConsecutiveLearningDays,
  maxTotalLearningDays,
  version)
values (
  2,
  6,
  '2020-03-01',
  '2020-03-30',
  5,
  4,
  0)

set identity_insert limits off;



select * from employees;
select * from invites;
select * from learnedTopics;
select * from learningDayLinks;
select * from learningDays;
select * from learningDayTopics;
select * from limits;
select * from recommendedTopics;
select * from topicLinks;
select * from topics;
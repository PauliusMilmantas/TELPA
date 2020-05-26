export interface Employee {
  id: number;
  email: string;
  role: string;
  name: string;
  leaderId: string;
  version: number;
}

export interface Invite {
  id: number;
  email: string;
  link: string;
  expiryDate: Date;
  inviterId: number;
  version: number;
}

export interface LearnedTopic {
  id: number;
  topicId: number;
  employeeId: number;
  version: number;
}

export interface LearningDay {
  id: number;
  date: Date;
  comment: string;
  employeeId: number;
  version: number;
}

export interface LearningDayLink {
  id: number;
  learningDayId: number;
  link: string;
  version: number;
}

export interface LearningDayTopic {
  id: number;
  learningDayId: number;
  topicId: number;
  version: number;
}

export interface Limit {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  maxConsecutiveLearningDays: number;
  maxTotalLearningDays: number;
  version: number;
}

export interface RecommendedTopic {
  id: number;
  topicId: number;
  employeeId: number;
  version: number;
}

export interface Topic {
  id: number;
  name: string;
  description: string;
  parentTopicId: number;
  version: number;
}

export interface TopicLink {
  id: number;
  topicId: number;
  link: string;
  version: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  link: string;
  name: string;
  password: string;
}

function repeatingDateLessThan(x: string, y: string): boolean {
  let x_parts = x.split("-");
  let y_parts = y.split("-");
  for (let i = 0; i < 3; i++) {
    if (x_parts[i].includes("*") || y_parts[i].includes("*")) {
      continue;
    } else {
      if (Number(x_parts[i]) >= Number(x_parts[i])) {
        return false;
      }
    }
  }
  return true;
}

export function isInInterval(limit: Limit, date: Date): boolean {
  var date_string = date.toISOString();
  return (
    repeatingDateLessThan(limit.endDate, date_string) &&
    !repeatingDateLessThan(limit.startDate, date_string)
  );
}

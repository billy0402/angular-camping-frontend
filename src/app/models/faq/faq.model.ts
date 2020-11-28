export interface Faq {
  type: string;
  questions: Question[];
}

interface Question {
  title: string;
  content: string;
}

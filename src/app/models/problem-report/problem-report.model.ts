export interface ProblemReport {
  id: number;
  type: number;
  status: number;
  reporterEmail: string;
  reportContent: string;
  reportDate: Date;
  handler: string;
  handleDate: Date;
  handleResult: string | null;
}

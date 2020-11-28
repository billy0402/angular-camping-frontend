export interface CommentAndBadRecord {
  comment: number | null;
  badRecordArray: BadRecord[];
}

export interface BadRecord {
  type: number;
  typeName: string;
  count: number;
}

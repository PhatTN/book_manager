export interface NewBookViewRequest {
  readonly title: string;
  readonly description: string;
  readonly isbn: string;
  readonly authorName?: string;
}

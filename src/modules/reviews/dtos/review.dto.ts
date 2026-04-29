export interface CreateReviewRequest {
  content: string;
  score: number;
}

export const bodyToReview = (body: CreateReviewRequest) => {
  return {
    content: body.content,
    score: body.score,
  };
};
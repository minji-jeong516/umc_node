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
export const responseFromReviews = (reviews: any[]) => {
  const lastReview = reviews[reviews.length - 1];

  return {
    data: reviews.map((review) => ({
      id: review.id,
      content: review.content,
      score: review.score,
      userId: review.userId,
      storeId: review.storeId,
      user: review.user,
      store: review.store,
    })),
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};

export const responseFromMyReviews = (reviews: any[]) => {
  const lastReview = reviews[reviews.length - 1];

  return {
    data: reviews.map((review) => ({
      reviewId: review.id,
      storeId: review.storeId,
      storeName: review.store.name,
      content: review.content,
      score: review.score,
    })),
    pagination: {
      cursor: lastReview ? lastReview.id : null,
    },
  };
};
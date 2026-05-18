export interface CreateReviewRequest {
  /*리뷰 내용*/
  content: string;
  /*리뷰 점수*/
  score: number;
}

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
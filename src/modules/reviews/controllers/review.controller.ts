import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Tags,
} from "tsoa";

import { CreateReviewRequest } from "../dtos/review.dto.js";

import {
  addReview,
  listStoreReviews,
  listMyReviews,
} from "../services/review.service.js";

import {
  ApiResponse,
  success,
} from "../../../common/responses/response.js";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  // 내가 작성한 리뷰 목록 조회
  @Get("me")
  public async handleListMyReviews(
    @Query() cursor?: number
  ): Promise<ApiResponse<any>> {
    const userId = 1;

    const result = await listMyReviews(
      userId,
      cursor ?? 0
    );

    return success(result);
  }
}

@Route("stores")
@Tags("Reviews")
export class StoreReviewController extends Controller {
  // 가게에 리뷰 추가
  @Post("{storeId}/reviews")
  public async handleAddReview(
    @Path() storeId: number,
    @Body() body: CreateReviewRequest
  ): Promise<ApiResponse<any>> {
    const userId = 1;

    const result = await addReview(
      storeId,
      userId,
      body
    );

    return success(result);
  }

  // 가게 리뷰 목록 조회
  @Get("{storeId}/reviews")
  public async handleListStoreReviews(
    @Path() storeId: number,
    @Query() cursor?: number
  ): Promise<ApiResponse<any>> {
    const result = await listStoreReviews(
      storeId,
      cursor ?? 0
    );

    return success(result);
  }
}
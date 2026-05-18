import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Tags,
  Response,
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
  /**
   * 내가 작성한 리뷰 목록 조회 API
   * @summary 현재 로그인한 사용자가 작성한 리뷰 목록을 조회합니다.
   */
  @Get("me")
  @Response<ApiResponse<any>>(200, "내 리뷰 목록 조회 성공")
  public async handleListMyReviews(
    /** 다음 페이지 조회를 위한 커서 값 */
    @Query() cursor?: number
  ): Promise<ApiResponse<any>> {
    const userId = 1;

    const result = await listMyReviews(userId, cursor ?? 0);

    return success(result);
  }
}

@Route("stores")
@Tags("Reviews")
export class StoreReviewController extends Controller {
  /**
   * 가게에 리뷰 추가 API
   * @summary 특정 가게에 리뷰를 작성합니다.
   */
  @Post("{storeId}/reviews")
  @Response<ApiResponse<any>>(200, "리뷰 작성 성공")
  @Response<ApiResponse<null>>(400, "잘못된 리뷰 요청")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleAddReview(
    /** 리뷰를 작성할 가게 ID */
    @Path() storeId: number,

    @Body() body: CreateReviewRequest
  ): Promise<ApiResponse<any>> {
    const userId = 1;

    const result = await addReview(storeId, userId, body);

    return success(result);
  }

  /**
   * 가게 리뷰 목록 조회 API
   * @summary 특정 가게에 작성된 리뷰 목록을 조회합니다.
   */
  @Get("{storeId}/reviews")
  @Response<ApiResponse<any>>(200, "가게 리뷰 목록 조회 성공")
  @Response<ApiResponse<null>>(404, "존재하지 않는 가게")
  public async handleListStoreReviews(
    /** 리뷰를 조회할 가게 ID */
    @Path() storeId: number,

    /** 다음 페이지 조회를 위한 커서 값 */
    @Query() cursor?: number
  ): Promise<ApiResponse<any>> {
    const result = await listStoreReviews(storeId, cursor ?? 0);

    return success(result);
  }
}
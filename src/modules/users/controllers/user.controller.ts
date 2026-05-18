import {
  Body,
  Controller,
  Get,
  Middlewares,
  Post,
  Request,
  Route,
  Tags,
  Response,
} from "tsoa";

import { UserSignUpRequest } from "../dtos/user.dto.js";

import { userSignUp } from "../services/user.service.js";

import { authorizeUser } from "../../../common/middlewares/auth.middleware.js";

import { Request as ExpressRequest } from "express";

import {
  ApiResponse,
  success,
} from "../../../common/responses/response.js";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * 회원가입 API
   * @summary 사용자의 회원가입을 처리합니다.
   */
  @Post("signup")
  @Response<ApiResponse<any>>(200, "회원가입 성공")
  @Response<ApiResponse<null>>(400, "이미 존재하는 이메일 또는 잘못된 요청")
  public async handleUserSignUp(
    @Body() body: UserSignUpRequest
  ): Promise<ApiResponse<any>> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);

    const user = await userSignUp(body);

    return success(user);
  }

  /**
   * 게스트 페이지 조회 API
   * @summary 로그인 없이 접근 가능한 게스트 페이지를 반환합니다.
   */
  @Get("guest")
  @Response<string>(200, "게스트 페이지 조회 성공")
  public async handleGuestPage(): Promise<string> {
    return `
            <h1>게스트 페이지</h1>
            <p>이 페이지는 로그인이 필요 없습니다.</p>
            <ul>
                <li><a href="/api/v1/users/mypage">마이페이지 (로그인 필요)</a></li>
            </ul>
        `;
  }

  /**
   * 로그인 페이지 조회 API
   * @summary 로그인이 필요한 페이지에서 인증 실패 시 이동할 로그인 페이지를 반환합니다.
   */
  @Get("login")
  @Response<string>(200, "로그인 페이지 조회 성공")
  public async handleLoginPage(): Promise<string> {
    return "<h1>로그인 페이지</h1><p>로그인이 필요한 페이지에서 튕겨나오면 여기로 옵니다.</p>";
  }

  /**
   * 마이페이지 조회 API
   * @summary 로그인 쿠키가 있는 사용자만 마이페이지를 조회할 수 있습니다.
   */
  @Get("mypage")
  @Middlewares(authorizeUser())
  @Response<string>(200, "마이페이지 조회 성공")
  @Response<string>(401, "로그인이 필요합니다")
  public async handleMypage(
    @Request() req: ExpressRequest
  ): Promise<string> {
    return `
            <h1>마이페이지</h1>
            <p>환영합니다, ${req.cookies.username}님!</p>
            <p>이 페이지는 로그인한 사람만 볼 수 있습니다.</p>
        `;
  }

  /**
   * 로그인 쿠키 생성 API
   * @summary 테스트용 로그인 쿠키를 생성합니다.
   */
  @Get("set-login")
  @Response<string>(200, "로그인 쿠키 생성 성공")
  public async handleSetLogin(
    @Request() req: ExpressRequest
  ): Promise<string> {
    req.res!.cookie("username", "UMC10th", {
      maxAge: 3600000,
    });

    return '로그인 쿠키(username=UMC10th) 생성 완료! <a href="/api/v1/users/mypage">마이페이지로 이동</a>';
  }

  /**
   * 로그아웃 API
   * @summary 로그인 쿠키를 삭제합니다.
   */
  @Get("set-logout")
  @Response<string>(200, "로그아웃 성공")
  public async handleSetLogout(
    @Request() req: ExpressRequest
  ): Promise<string> {
    req.res!.clearCookie("username");

    return '로그아웃 완료 (쿠키 삭제). <a href="/api/v1/users/guest">메인으로</a>';
  }
}
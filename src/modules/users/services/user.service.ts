import { UserSignUpRequest } from "../dtos/user.dto.js"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { DuplicateUserEmailError } from "../../../common/errors/error.js";

export const userSignUp = async (data: UserSignUpRequest) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const joinUserId = await addUser({
    email: data.email,
    password: hashedPassword,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

   if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }


  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
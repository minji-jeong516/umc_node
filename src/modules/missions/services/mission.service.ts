import {
  findMissionById,
  findUserMission,
  createUserMission,
} from "../repositories/mission.repository.js";

export const challengeMission = async (
  userId: number,
  missionId: number
) => {
  // 1. 미션 존재 확인
  const isExist = await findMissionById(missionId);

  if (!isExist) {
    throw new Error("존재하지 않는 미션입니다.");
  }

  // 2. 이미 도전 중인지 확인
  const already = await findUserMission(userId, missionId);

  if (already) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  // 3. 도전 추가
  const userMissionId = await createUserMission(userId, missionId);

  return {
    userMissionId,
    missionId,
    status: "CHALLENGING",
  };
};
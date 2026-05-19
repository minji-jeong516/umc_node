import {
  findMissionById,
  findUserMission,
  createUserMission,
  getMyChallengingMissions,
  completeMission,
} from "../repositories/mission.repository.js";
import { responseFromMyChallengingMissions } from "../dtos/mission.dto.js";
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
// 진행중인 미션
export const listMyChallengingMissions = async (
  userId: number,
  cursor: number
) => {
  const userMissions = await getMyChallengingMissions(userId, cursor);

  return responseFromMyChallengingMissions(userMissions);
};
// 진행중인 미션을 진행 완료로 바꾸기
export const completeMyMission = async (
  userId: number,
  missionId: number
) => {
  const updatedCount = await completeMission(
    userId,
    missionId
  );

  if (updatedCount === 0) {
    throw new Error("진행 중인 미션이 없습니다.");
  }

  return {
    missionId,
    status: "COMPLETED",
  };
};
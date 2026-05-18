export interface ChallengeMissionResponse {
  /** 사용자 미션 ID */
  userMissionId: number;

  /** 미션 ID */
  missionId: number;

  /** 미션 진행 상태 */
  status: string;
}

export interface CompleteMissionResponse {
  /** 미션 ID */
  missionId: number;

  /** 미션 진행 상태 */
  status: string;
}

export interface MyChallengingMissionsResponse {
  /** 도전 중인 미션 목록 */
  data: any[];

  /** 페이지네이션 정보 */
  pagination: {
    /** 다음 페이지 조회를 위한 커서 값 */
    cursor: number | null;
  };
}

export const responseFromMyChallengingMissions = (
  userMissions: any[]
): MyChallengingMissionsResponse => {
  const lastMission = userMissions[userMissions.length - 1];

  return {
    data: userMissions.map((userMission) => ({
      userMissionId: userMission.id,
      missionId: userMission.missionId,
      status: userMission.status,
      content: userMission.mission.content,
      reward: userMission.mission.reward,
      deadline: userMission.mission.deadline,
      storeId: userMission.mission.storeId,
      storeName: userMission.mission.store.name,
    })),
    pagination: {
      cursor: lastMission ? lastMission.id : null,
    },
  };
};
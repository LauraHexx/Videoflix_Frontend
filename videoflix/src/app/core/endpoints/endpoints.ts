export const UserEndpoints = {
  login: 'login/',
  registration: 'registration/',
  registrationVerifyToken: (token: string) => `registration/verify/${token}/`,
  passwordRest: 'password-reset/request/',
  passwordConfirm: 'password-reset/confirm/',
  logout: 'logout/',
};

export const VideosEndpoints = {
  list: 'video/',
  detail: (id: string) => `video/${id}/`,
  watchHistory: 'userwatchhistory/',
  watchHistoryDetail: (id: string) => `userwatchhistory/${id}/`,
  watchHistoryByVideo: (id: string) => `userwatchhistory/?video=${id}`,
  hero: 'video/random/',
};

const endPoint = 'https://dev.api.churchesapp.com/api/v1/';

export const config = {
  //App version
  version: `${endPoint}user/app/version`,

  //Authentication
  signup: `${endPoint}member`,
  login: `${endPoint}auth/member`,
  verifyOtp: `${endPoint}member/verify`,
  changePassword: `${endPoint}member/change/password`,

  //Profile
  changeProfilePicture: `${endPoint}member/upload`,
  joinChurch: `${endPoint}member/join/`,
  updateProfile: `${endPoint}member/update`,

  //Streams
  getAllStreams: `${endPoint}live/member`,
  getBranchStreams: `${endPoint}live/member`,

  //Bible
  bibleVersions: `${endPoint}bible`,
  listOfBooks: `${endPoint}bible/books`,
  chaptersOfBible: `${endPoint}bible/chapters?bookId=`,
  getNotes: `${endPoint}bible/note/`,
  getBookmarks: `${endPoint}bible/bookmark/`,

  //Prayer request
  prayerrequest: `${endPoint}prayer-request/`,
  getInbox: `${endPoint}prayer-request/inbox/`,
  archivePrayerRequest: `${endPoint}prayer-request/archive/`,
  markAsRead: `${endPoint}prayer-request/read/`,

  //Country
  loadCountries: `${endPoint}country/`,
  loadStates: `${endPoint}country/`,

  //Cards
  loadUserCards: `${endPoint}card/`,
  verifyCard: `${endPoint}card/validate/`,

  //offering
  getWallet: `${endPoint}wallet/destination/`,
  transaction: `${endPoint}transaction/`,
  transactionCost: `${endPoint}user/transaction/cost`,
  plan: `${endPoint}transaction/plan`,
  recurringTransaction: `${endPoint}transaction/recurring`,
  validateTransaction: `${endPoint}transaction/validate/`,
  bankList: `${endPoint}transaction/bank/list/`,
  bankTransaction: `${endPoint}transaction/bank/`,
  transactionHistory: `${endPoint}member/transaction/history`,
  getDestination: `${endPoint}member/destination`,

  //Podcast
  getVideos: `${endPoint}resource/mobile?type=video`,
  getAudios: `${endPoint}resource/mobile?type=audio`,

  //Events
  getEvents: `${endPoint}events/mobile`,
  globalEvents: `${endPoint}events/mobile/global`,
  attendance: `${endPoint}events/attendance/`,
  singleEvent: `${endPoint}events/get/`,
};

export const publicToken = {
  token: `677ec689-cf2f-4581-b958-a77e55edd70f`,
};

export const video = {
  url: 'https://d367c9pgq4rf5n.cloudfront.net/',
};

export const version = {
  number: 1,
  code: '1.0',
};

export const churchdetails = {
  name: 'CAFAM',
};

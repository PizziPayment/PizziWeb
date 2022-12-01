export default function() {
  return {
    accessToken: null,
    refreshToken: null,
    expirationToken: null,
    userLoggedIn: false,
    language: 'fr',
    isDarkTheme: true,
    categories: [],
    avatarUrl: null,
    shopInfos : {
      id:'',
      siret:'',
      name:'',
      email:'',
      address:'',
      zipcode:'',
      city:'',
      phone:'',
      description:'',
      facebook:'',
      instagram:'',
      twitter:'',
      website:'',
    }
  };
}

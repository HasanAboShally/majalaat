


export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyCgf2pFX4RSaFf0NBUdrdQ7hGXRMeoSL7I",
    authDomain: "majalaat-com.firebaseapp.com",
    databaseURL: "https://majalaat-com.firebaseio.com",
    projectId: "majalaat-com",
    storageBucket: "majalaat-com.appspot.com",
    messagingSenderId: "9873944528",
    appId: "1:9873944528:web:84b7b0e34f68a9d637d3d5",
    measurementId: "G-6889SF129C"
  },
  backend: {
        googleSheet: {
      id: "1mdCz50w0GuKWxGU9PEuvV-o614aAXksYELF4LCr1PX4",
      sheets: {
        volunteers: {
          index: 1,
          name: "volunteers"
        },
        usefulLinks: {
          index: 2,
          name: "useful-links"
        }
      }
    }
  }
};

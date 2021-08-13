
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
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



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
} from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCbJ49vQDhbqCafwlK0YVziBCvcdfb3dpQ",
  authDomain: "virgen-salta-4f8e3.firebaseapp.com",
  projectId: "virgen-salta-4f8e3",
  storageBucket: "virgen-salta-4f8e3.appspot.com",
  messagingSenderId: "798955403103",
  appId: "1:798955403103:web:cf0d66391144509b6168ea",
  measurementId: "G-0XWSQBX5XX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);


// export const uploadFile = async(file) => {
//   const storageRef = ref(storage, v4());
//   await uploadBytes(storageRef, file);
//   const url = await getDownloadURL(storageRef);
//   return url
// };

export const uploadFile = async (url, file, updateCb) => {
  const storageRef = ref(storage, `/${url}/`+v4());
  console.log(url)
  const uploadFile = uploadBytesResumable(storageRef, file);
  return new Promise((res, rej) => {
    return uploadFile.on(
      "state_changed",
      updateCb,
      () => rej(null),
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
          res(downloadURL);
        });
      }
    );
  });
};

/** Devuelve las referencias de los archivos buscados por id */
export const listFile = async (id) => {
  let as = [];
  const storageRef = ref(storage, "/");
  return new Promise((res, rej) => {
    listAll(storageRef).then((d) => {
      d.items.forEach((data) => {
        id.forEach((idData) => {
          if (idData.includes(data.fullPath)) {
            as.push(data);
          }
        });
      });
      res(as);
    });
  });
};

import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from 'firebase/storage'
import { v4 } from 'uuid'

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDERING,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID,
} = import.meta.env
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDERING,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
export const storage = getStorage(app)

export const uploadFile = async (url, file, updateCb) => {
  // if (file.type.includes('video')) {
    const storageRef = ref(storage, `/${url}/` + v4())
    const uploadFile = uploadBytesResumable(storageRef, file)
    return new Promise((res, rej) => {
      return uploadFile.on(
        'state_changed',
        updateCb,
        () => rej(null),
        () => {
          getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
            res(downloadURL)
          })
        }
      )
    })
  // }
}
export const uploadFileVideo = async (url, file, updateCb) => {
  const storageRef = ref(storage, `/${url}/` + v4())
  const uploadFile = uploadBytesResumable(storageRef, file)
  return new Promise((res, rej) => {
    return uploadFile.on(
      'state_changed',
      updateCb,
      () => rej(null),
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((downloadURL) => {
          res(downloadURL)
        })
      }
    )
  })
}

/** Devuelve las referencias de los archivos buscados por id */
export const listFile = async (id) => {
  let as = []
  const storageRef = ref(storage, '/')
  return new Promise((res, rej) => {
    listAll(storageRef).then((d) => {
      d.items.forEach((data) => {
        id.forEach((idData) => {
          if (idData.includes(data.fullPath)) {
            as.push(data)
          }
        })
      })
      res(as)
    })
  })
}

export const deleteFile = async (url) => {
  const storageRef = ref(storage, url)
  deleteObject(storageRef)
    .then(() => {})
    .catch((error) => {
      console.log(error)
    })
}

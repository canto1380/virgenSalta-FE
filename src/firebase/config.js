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
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDERING,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDERING,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
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

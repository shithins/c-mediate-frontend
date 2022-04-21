import { storage } from "./firebaseConfig";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function uploadFile(file, type, setProgress) {
  return new Promise(async (resolve, reject) => {
    try {
      const id = uuid();
      const fileName = id + "." + file.name.split(".").pop();
      const storageRef = ref(storage, `${type}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          reject();
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve({ id: fileName, url });
          });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

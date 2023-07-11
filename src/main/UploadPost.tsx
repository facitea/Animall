// import { useState } from 'react';
// import { getFirestore } from "firebase/firestore";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { getAuth } from 'firebase/auth';
// // import { db } from '../firebase'
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// // import { limit } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';
// import heic2any from "heic2any";

// const UploadPost = () => {
//   // const [file, setFile] = useState(null); // 업로드할 파일 상태
//   const [file, setFile] = useState<File | null>(null); // 업로드할 파일 상태
//   const [content, setContent] = useState(''); // 글 내용 상태
//   const auth = getAuth();
//   const userId = auth.currentUser?.uid; // 현재 로그인된 사용자의 ID
//   const nickname = auth.currentUser?.displayName || '무명';
//   const profileImageUrl = auth.currentUser?.photoURL || '';

//   const navigate = useNavigate();

//   const handleChange = async (e: any) => { // 파일 선택 핸들러
//     // setFile(e.target.files[0]);
//     const selectedFile = e.target.files[0];
//     const allowedExtensions = ["heic", "heif", "jpeg", "jpg", "png", "gif"];

//     // if (selectedFile) {
//     //   const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
//     //   if (fileExtension && allowedExtensions.includes(fileExtension)) {
//     //     setFile(selectedFile);
//     //   } else {
//     //     alert("허용되는 이미지 확장자가 아닙니다.");
//     //     return;
//     //   }
//     // }
//     if (selectedFile) {
//       const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
//       if (fileExtension && allowedExtensions.includes(fileExtension)) {
//         if (fileExtension === "heic" || fileExtension === "heif") {
//           try {
//             const convertedFile = await heic2any({ blob: selectedFile, toType: "image/jpeg" });
//             const convertedFileWithType = convertedFile as File;
//             setFile(convertedFileWithType);
//           } catch (error) {
//             console.log(error);
//             alert("이미지 변환 중 오류가 발생했습니다.");
//           }
//         } else {
//           setFile(selectedFile);
//         }
//       } else {
//         alert("허용되는 이미지 확장자가 아닙니다.");
//         return;
//       }
//     }
//   };

//   const handleSubmit = async (e: any) => { // 폼 제출 핸들러
//     e.preventDefault();

//     // Firebase Storage에 사진 업로드
//     const storage = getStorage();
//     let storageRef: any;
//     let uploadTask: any;
//     const fileName = file?.name;
//     if (fileName) {
//       storageRef = ref(storage, `posts/${fileName}`);
//       uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on('state_changed',
//         (snapshot: any) => {
//           // 업로드 진행 상태를 확인할 수 있는 코드를 여기에 추가할 수 있습니다.
//           console.log(snapshot);
//         },
//         (error: any) => {
//           // 업로드 실패시 에러 처리 코드를 여기에 추가할 수 있습니다.
//           console.log(error);
//         },
//         () => {
//           // 업로드 완료 후, 사진의 URL을 받아 Firestore에 저장합니다.
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             const db = getFirestore();
//             const postsCollection = collection(db, 'posts');

//             // Firestore에 데이터 저장
//             await addDoc(postsCollection, {
//               id: userId,
//               nickname: nickname,
//               profileImageUrl: profileImageUrl,
//               imageUrl: downloadURL,
//               likes: 'n',
//               content: content,
//               date: serverTimestamp()
//             });

//             alert('작성 완료');

//             navigate("/BoardList");

//           });
//         }
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleChange} />
//       <textarea value={content} onChange={(e) => setContent(e.target.value)} />
//       <button type="submit">Upload</button>
//     </form>
//   );
// };

// export default UploadPost;

import { useState } from 'react';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import heic2any from "heic2any";

const UploadPost = () => {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const nickname = auth.currentUser?.displayName || '무명';
  const profileImageUrl = auth.currentUser?.photoURL || '';

  const navigate = useNavigate();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    const allowedExtensions = ["heic", "heif", "jpeg", "jpg", "png", "gif"];

    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        if (fileExtension === "heic" || fileExtension === "heif") {
          try {
            const convertedFile = await heic2any({
              blob: selectedFile,
              toType: "image/jpeg",
            });
            if (convertedFile instanceof Blob) {
              const convertedFileWithType = new File([convertedFile], selectedFile.name, {
                lastModified: selectedFile.lastModified,
              });
              setFile(convertedFileWithType);
            }
          } catch (error) {
            console.log(error);
            alert("이미지 변환 중 오류가 발생했습니다.");
          }
        } else {
          setFile(selectedFile);
        }
      } else {
        alert("허용되는 이미지 확장자가 아닙니다.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `posts/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const db = getFirestore();
        const postsCollection = collection(db, 'posts');

        // await addDoc(postsCollection, {
        //   id: userId,
        //   nickname: nickname,
        //   profileImageUrl: profileImageUrl,
        //   imageUrl: downloadURL,
        //   likes: 'n',
        //   content: content,
        //   date: serverTimestamp()
        // });
        const docRef = await addDoc(postsCollection, {
          id: userId,
          nickname: nickname,
          profileImageUrl: profileImageUrl,
          imageUrl: downloadURL,
          likes: 'n',
          content: content,
          date: serverTimestamp()
        });

        const docToUpdate = doc(db, 'posts', docRef.id);
        await updateDoc(docToUpdate, { feedId: docRef.id });

        alert('작성 완료');
        navigate("/BoardList");
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="*/*" onChange={handleChange} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadPost;

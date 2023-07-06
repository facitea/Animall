import { useState } from 'react';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
// import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { limit } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// const UploadPost = () => {
//   const [file, setFile] = useState(null); // 업로드할 파일 상태
//   const [content, setContent] = useState(''); // 글 내용 상태
//   const auth = getAuth();
//   const userId = auth.currentUser?.uid; // 현재 로그인된 사용자의 ID
//   const nickname = auth.currentUser?.displayName || '무명';
//   const profileImageUrl = auth.currentUser?.photoURL || '';

//   const handleChange = (e: any) => { // 파일 선택 핸들러
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e: any) => { // 폼 제출 핸들러
//     e.preventDefault();

//     // Firebase Storage에 사진 업로드
//     const storage = getStorage();
//     let storageRef: any;
//     let uploadTask: any;
//     if (file != null) {
//       const fileName: any = file?.name;
//       storageRef = ref(storage, `posts/${fileName}`);
//       //post라는 폴더에 할당
//       //file.name은 말 그대로 파일의 이름이 되는데 임의의 값을 지정해서 넣어주는게 좋을 것 같다.
//       uploadTask = uploadBytesResumable(storageRef, file);
//     }


//     uploadTask.on('state_changed',
//       (snapshot: any) => {
//         // 업로드 진행 상태를 확인할 수 있는 코드를 여기에 추가할 수 있습니다.
//         console.log(snapshot);
//       },
//       (error: any) => {
//         // 업로드 실패시 에러 처리 코드를 여기에 추가할 수 있습니다.
//         console.log(error);
//       },
//       () => {
//         // 업로드 완료 후, 사진의 URL을 받아 Firestore에 저장합니다.
//         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//           const db = getFirestore();
//           // const docRef = doc(db, 'posts', userId); // userID를 문서 ID로 사용합니다.
//           const postsCollection = collection(db, 'posts');

//           // Firestore에 데이터 저장
//           await addDoc(postsCollection, {
//             id: userId,
//             nicknamme: nickname,
//             profileImageUrl: profileImageUrl,
//             imageUrl: downloadURL,
//             likes: 'n',
//             content: content,
//             date: serverTimestamp()
//             //타임스탬프는 특정 형식.
//           });
//         });
//       }
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleChange} />
//       <textarea value={content} onChange={(e) => setContent(e.target.value)} />
//       <button type="submit">Upload</button>
//     </form>
//   );
// };
const UploadPost = () => {
  // const [file, setFile] = useState(null); // 업로드할 파일 상태
  const [file, setFile] = useState<File | null>(null); // 업로드할 파일 상태
  const [content, setContent] = useState(''); // 글 내용 상태
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // 현재 로그인된 사용자의 ID
  const nickname = auth.currentUser?.displayName || '무명';
  const profileImageUrl = auth.currentUser?.photoURL || '';

  const navigate = useNavigate();

  const handleChange = (e: any) => { // 파일 선택 핸들러
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => { // 폼 제출 핸들러
    e.preventDefault();

    // Firebase Storage에 사진 업로드
    const storage = getStorage();
    let storageRef: any;
    let uploadTask: any;
    const fileName = file?.name;
    if (fileName) {
      storageRef = ref(storage, `posts/${fileName}`);
      uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot: any) => {
          // 업로드 진행 상태를 확인할 수 있는 코드를 여기에 추가할 수 있습니다.
          console.log(snapshot);
        },
        (error: any) => {
          // 업로드 실패시 에러 처리 코드를 여기에 추가할 수 있습니다.
          console.log(error);
        },
        () => {
          // 업로드 완료 후, 사진의 URL을 받아 Firestore에 저장합니다.
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const db = getFirestore();
            const postsCollection = collection(db, 'posts');

            // Firestore에 데이터 저장
            await addDoc(postsCollection, {
              id: userId,
              nicknamme: nickname,
              profileImageUrl: profileImageUrl,
              imageUrl: downloadURL,
              likes: 'n',
              content: content,
              date: serverTimestamp()
            });

            alert('작성 완료');
            
            navigate("/BoardList");

          });
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadPost;

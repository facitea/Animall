// import FeedTemplate from "./FeedTemplate";
// import { db } from '../firebase'
// import { collection, query, orderBy, getDocs, where, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
// // import { useState, useEffect } from 'react'
// import { limit } from 'firebase/firestore';

// const BoardList = () => {
//     let list = [];

//     let lastFeedId: any;

//     const lastFeedIdCheck = async () => {
//         const q = query(collection(db, '게시판'), orderBy('timeStamp', 'desc'), limit(1));
//         const result = await getDocs(q);
//         result.forEach((doc) => {
//             const lastIdCheck: any = doc.data(); // document의 내용물 = doc.data();
//             console.log(lastIdCheck, 'lastIdCheck')
//             const lastId: any = (lastIdCheck.feedId); // DB에 있는 내가 임의로 지정한 id값은 feedId인데, 그 document의 feedid를 lastId에 담는다는 뜻
//             lastFeedId = lastId
//         });
//         console.log(lastFeedId, 'last')
//     };

//     const recentFiveFeedData = async () => {
//         const q = query(
//             collection(db, '게시판'),
//             orderBy('feedId', 'desc'),
//             where('feedId', '<=', lastFeedId),
//             limit(5)
//         );
//         const result = await getDocs(q);
//         result.forEach((doc) => {
//             list.push(doc.data());
//         });
//     }

//     lastFeedIdCheck();
//     recentFiveFeedData();

//     const myCollectionRef = collection(db, 'table');

//     const addNewDocument = async (data: any) => {
//         const docRef = await addDoc(myCollectionRef, data);

//         // 필드 추가 또는 업데이트
//         await updateDoc(docRef, {
//             id: '아이디',
//             nicknamme: '닉네임',
//             profileImageUrl: '사진',
//             imageUrl: 'imageUrl',
//             likes: '라익스',
//             content: '글내용',
//             date: serverTimestamp()
//             //타임스탬프는 특정 형식.
//         });
//     };

//     addNewDocument({});
//     //글 올리는 로직.
//     //렌더링 될때마다 글이 올라가서 두개씩 올라가는건가

//     const getDocumentsByDate = async () => {
//         const q = query(myCollectionRef, orderBy('date'));

//         const querySnapshot = await getDocs(q);
//         const documents = querySnapshot.docs.map((doc) => doc.data());

//         return documents;
//     };

//     getDocumentsByDate().then((result) => {
//         console.log(result, '글내용가져와봄');
//     });

//     // const getRecentDocuments = async (limit: number) => {
//     //     const q = query(collection(db, 'table'), orderBy('date', 'desc'), limit(limit));
//     //     const querySnapshot = await getDocs(q);
//     //     const documents = querySnapshot.docs.map((doc) => doc.data());
//     //     return documents;
//     // };

//     // getRecentDocuments(5).then((result) => {
//     //     console.log(result);
//     // });


//     // const [loadedDocuments, setLoadedDocuments] = useState([]);
//     // const [loadedCount, setLoadedCount] = useState(0);
//     // const documentsPerPage = 2;

//     // useEffect(() => {
//     //     const loadInitialDocuments = async () => {
//     //         const initialDocuments = await getRecentDocuments(documentsPerPage);
//     //         setLoadedDocuments(initialDocuments);
//     //         setLoadedCount(initialDocuments.length);
//     //     };

//     //     loadInitialDocuments();
//     // }, []);








//     // const id = "123";
//     // const nickname = "김창식";
//     // const profileImageUrl = "";
//     // const imageUrl = "";
//     // const likes = "5";
//     // const content = "ㄷㄷ";
//     // const date = "23-06-27 18:50";

//     return (
//         <><FeedTemplate /></>
//     )
// }

// // id="123" nicknamme="김창식" profileImageUrl='' imageUrl='' likes="5" content="ㄷㄷ" date="23-06-27 18:50"

// export default BoardList;







// import { useState, useEffect } from 'react';
// import { db } from '../firebase';
// import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
// import FeedTemplate from "./FeedTemplate";
// import { Timestamp } from 'firebase/firestore';


// type PostData = {
//     id: string;
//     nickname: string;
//     profileImageUrl: string;
//     imageUrl: string;
//     likes: number;
//     content: string;
//     date: Timestamp;
// };

// const BoardList = () => {

//     //    const [posts, setPosts] = useState([]); // 불러온 게시물들을 저장할 상태
//     const [posts, setPosts] = useState<PostData[]>([]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             const postsCollection = collection(db, 'posts');
//             const postsQuery = query(postsCollection, orderBy('date', 'desc'), limit(5)); // 가장 최근의 5개의 게시물을 불러옵니다.
//             const postsSnapshot = await getDocs(postsQuery);
//             // const postsData = postsSnapshot.docs.map((doc) => doc.data());
//             const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as PostData);
//             setPosts(postsData); // 불러온 게시물들을 상태에 저장합니다.
//         };

//         fetchPosts(); // 게시물 불러오기를 시작합니다.
//     }, []);

//     return (
//         <div>
//             {posts.map((post, index) => (
//                 <FeedTemplate key={index} {...post} /> // 각 게시물을 FeedTemplate 컴포넌트로 표시합니다.
//             ))}
//         </div>
//     );
// };

// export default BoardList;

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { db } from '../firebase';
// import { collection, query, orderBy, getDocs, limit, startAfter, DocumentData } from 'firebase/firestore';
// import FeedTemplate from "./FeedTemplate";
// import { Timestamp, QueryDocumentSnapshot } from 'firebase/firestore';

// type PostData = {
//     id: string;
//     nickname: string;
//     profileImageUrl: string;
//     imageUrl: string;
//     likes: number;
//     content: string;
//     date: Timestamp;
// };

// const BoardList = () => {
//     const [posts, setPosts] = useState<PostData[]>([]);
//     const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
//     const observer = useRef<IntersectionObserver | null>(null);

//     const fetchPosts = async (lastDoc: QueryDocumentSnapshot<DocumentData> | null = null) => {
//         let postsQuery;
//         if (lastDoc) {
//             postsQuery = query(
//                 collection(db, 'posts'),
//                 orderBy('date', 'desc'),
//                 startAfter(lastDoc),
//                 limit(5)
//             );
//         } else {
//             postsQuery = query(
//                 collection(db, 'posts'),
//                 orderBy('date', 'desc'),
//                 limit(5)
//             );
//         }

//         const postsSnapshot = await getDocs(postsQuery);
//         const lastVisible = postsSnapshot.docs[postsSnapshot.docs.length - 1];
//         const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as PostData);
//         setPosts(prevPosts => [...prevPosts, ...postsData]);
//         setLastDoc(lastVisible);
//     };

//     useEffect(() => {
//         fetchPosts();
//     }, []);

//     const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
//         if (observer.current) observer.current.disconnect();
//         observer.current = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting) {
//                 fetchPosts(lastDoc);
//             }
//         });
//         if (node) observer.current.observe(node);
//     }, [lastDoc]);

//     return (
//         <div>
//             {posts.map((post, index) => {
//                 if (posts.length === index + 1) {
//                     return <FeedTemplate ref={lastPostElementRef} key={post.id} {...post} />
//                 } else {
//                     return <FeedTemplate key={post.id} {...post} />
//                 }
//             })}
//         </div>
//     );
// };

// export default BoardList;


import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, limit, startAfter, DocumentData } from 'firebase/firestore';
import FeedTemplate from "./FeedTemplate";
import { Timestamp, QueryDocumentSnapshot } from 'firebase/firestore';

type PostData = {
    id: string;
    feedId: string;
    nickname: string;
    profileImageUrl: string;
    imageUrl: string;
    likes: number;
    content: string;
    date: Timestamp;
};

const BoardList = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchPosts = async (startAfterDoc: QueryDocumentSnapshot<DocumentData> | null = null, limitAmount: number) => {
        let postsQuery = query(
            collection(db, 'posts'),
            orderBy('date', 'desc'),
            limit(limitAmount)
        );

        if (startAfterDoc) {
            postsQuery = query(
                collection(db, 'posts'),
                orderBy('date', 'desc'),
                startAfter(startAfterDoc),
                limit(limitAmount)
            );
        }

        const postsSnapshot = await getDocs(postsQuery);
        const lastVisible = postsSnapshot.docs[postsSnapshot.docs.length - 1];
        const postsData = postsSnapshot.docs.map((doc) => ({ id: doc.id, feedId: doc.data().id, ...doc.data() }) as PostData);
        //doc 내의 id값을 이렇게 보여주는 거구만.
        // console.log(postsData, 'postsData');

        if (startAfterDoc) {
            setPosts(prevPosts => [...prevPosts, ...postsData]);
        } else {
            setPosts(postsData);
        }
        setLastDoc(lastVisible);
    };

    useEffect(() => {
        fetchPosts(null, 5);
    }, []);

    const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && lastDoc) {
                fetchPosts(lastDoc, 5);
            }
        });
        if (node) observer.current.observe(node);
    }, [lastDoc]);

    // return (
    //     <div>
    //         {posts.map((post, index) => {
    //             if (posts.length === index + 1) {
    //                 return <FeedTemplate ref={lastPostElementRef} key={post.id} {...post} />;
    //             } else {
    //                 return <FeedTemplate key={post.id} {...post} />;
    //             }
    //         })}
    //     </div>
    // );
    return (
        <div>
            {posts.map((post, index) => {
                const key = `${post.id}_${index}`;
                if (posts.length === index + 1) {
                    return <FeedTemplate ref={lastPostElementRef} key={key} {...post} />;
                } else {
                    return <FeedTemplate key={key} {...post} />;
                }
            })}
        </div>
    );

};

export default BoardList;

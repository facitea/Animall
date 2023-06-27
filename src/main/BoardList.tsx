import FeedTemplate from "./FeedTemplate";
import { db } from '../firebase'
import { collection, query, orderBy, getDocs, where, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { limit } from 'firebase/firestore';

const BoardList = () => {
    let list = [];

    let lastFeedId: any;

    const lastFeedIdCheck = async () => {
        const q = query(collection(db, '게시판'), orderBy('timeStamp', 'desc'), limit(1));
        const result = await getDocs(q);
        result.forEach((doc) => {
            const lastIdCheck: any = doc.data(); // document의 내용물 = doc.data();
            console.log(lastIdCheck, 'lastIdCheck')
            const lastId: any = (lastIdCheck.feedId); // DB에 있는 내가 임의로 지정한 id값은 feedId인데, 그 document의 feedid를 lastId에 담는다는 뜻
            lastFeedId = lastId
        });
        console.log(lastFeedId, 'last')
    };

    const recentFiveFeedData = async () => {
        const q = query(
            collection(db, '게시판'),
            orderBy('feedId', 'desc'),
            where('feedId', '<=', lastFeedId),
            limit(5)
        );
        const result = await getDocs(q);
        result.forEach((doc) => {
            list.push(doc.data());
        });
    }

    lastFeedIdCheck();
    recentFiveFeedData();

    const myCollectionRef = collection(db, 'table');

    const addNewDocument = async (data: any) => {
        const docRef = await addDoc(myCollectionRef, data);

        // 필드 추가 또는 업데이트
        await updateDoc(docRef, {
            id: '아이디',
            nicknamme: '닉네임',
            profileImageUrl: '사진',
            imageUrl: 'imageUrl',
            likes: '라익스',
            content: '글내용',
            date: serverTimestamp()
            //타임스탬프는 특정 형식.
        });
    };

    addNewDocument({});
    //글 올리는 로직.
    //렌더링 될때마다 글이 올라가서 두개씩 올라가는건가

    const getDocumentsByDate = async () => {
        const q = query(myCollectionRef, orderBy('date'));

        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => doc.data());

        return documents;
    };

    getDocumentsByDate().then((result) => {
        console.log(result, '글내용가져와봄');
    });

    // const getRecentDocuments = async (limit: number) => {
    //     const q = query(collection(db, 'table'), orderBy('date', 'desc'), limit(limit));
    //     const querySnapshot = await getDocs(q);
    //     const documents = querySnapshot.docs.map((doc) => doc.data());
    //     return documents;
    // };

    // getRecentDocuments(5).then((result) => {
    //     console.log(result);
    // });


    // const [loadedDocuments, setLoadedDocuments] = useState([]);
    // const [loadedCount, setLoadedCount] = useState(0);
    // const documentsPerPage = 2;

    // useEffect(() => {
    //     const loadInitialDocuments = async () => {
    //         const initialDocuments = await getRecentDocuments(documentsPerPage);
    //         setLoadedDocuments(initialDocuments);
    //         setLoadedCount(initialDocuments.length);
    //     };

    //     loadInitialDocuments();
    // }, []);








    // const id = "123";
    // const nickname = "김창식";
    // const profileImageUrl = "";
    // const imageUrl = "";
    // const likes = "5";
    // const content = "ㄷㄷ";
    // const date = "23-06-27 18:50";

    return (
        <><FeedTemplate /></>
    )
}

// id="123" nicknamme="김창식" profileImageUrl='' imageUrl='' likes="5" content="ㄷㄷ" date="23-06-27 18:50"

export default BoardList;
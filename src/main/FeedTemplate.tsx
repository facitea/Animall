import './FeedTemplate.css'
// import PropTypes from "prop-types";
//아이디, 닉네임, 사진url, 좋아요갯수, 게시글내용, 날짜
import { Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { forwardRef } from 'react';
import { db } from '../firebase';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

// const FeedTemplate = () => {
//     return (
//         <div className="feedContentBox">
//             <div className="feedHeader">
//                 <div className="headerLeft">
//                     <div className="profileImageCircle">
//                         <img className="profileImage" src="msk.png" alt="일론머스크" />
//                     </div>
//                     <div className="userNickname" id="userNickname${moreSectionCount}">{}</div>
//                 </div>

//                 <div>
//                     <div className="feedSetting">설정</div>
//                 </div>
//             </div>

//             <div className="feedImage">
//                 <img id="feedImage${moreSectionCount}" alt="메인사진" />
//             </div>

//             <div className="feedInteraction">
//                 <div className="feedInteractionDetail">
//                     <div className="iLikeIt">좋아요</div>
//                     <div className="wrtComment">댓글</div>
//                     <div className="sendToMsg">메시지</div>
//                 </div>

//                 <div>
//                     <div className="bookmark">저장</div>
//                 </div>
//             </div>

//             <div className="interactionStatus">
//                 <div className="howManyLikey">좋아요 n개</div>
//             </div>

//             <div>
//                 <div className="feedText" id="feedText${moreSectionCount}">{}</div>
//             </div>
//             <div>
//                 <div className="createdDate" id="createdDate${moreSectionCount}">{}</div>
//             </div>
//         </div>
//     )
// }

const FeedTemplate = forwardRef<HTMLDivElement, PostData>(({ id, feedId, nickname, profileImageUrl, imageUrl, likes, content, date }, ref) => {
    // const displayDate = new Date(date.seconds * 1000).toLocaleDateString(); // this converts it to a string in the format "MM/DD/YYYY"

    // console.log(id, nickname, profileImageUrl, imageUrl, likes, content, date);
    // 확실히 id는 작성자다.

    console.log(feedId, 'feedId')

    const displayDate = new Date(date.seconds * 1000).toLocaleString("ko-KR"); // 한국 표준 시간대에 맞게 시간까지 표시

    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUserId(user ? user.uid : null);
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    const isCurrentUser = currentUserId === id;

    // console.log(id, 'id')
    // console.log(currentUserId, 'currentUserId')

    const handleDelete = async () => {
        if (window.confirm('삭제하시겠습니까?')) {

            try {
                // Firestore에서 게시물 데이터 삭제
                await deleteDoc(doc(db, 'posts', feedId));
                alert('삭제되었습니다.')

                // 필요한 경우 다른 작업 수행

            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };


    // const handleDelete = async () => {
    //     try {
    //         await deleteDoc(doc(db, 'posts', id));
    //     } catch (error) {
    //         console.error('Error deleting post:', error);
    //     }
    // };

    return (
        <div className="feedContentBox" ref={ref}>
            <div className="feedHeader">
                <div className="headerLeft">
                    <div className="feedProfileImageCircle">
                        <img className="profileImage" src={profileImageUrl} alt="Profile" />
                    </div>
                    <div className="userNickname">{nickname}</div>
                </div>

                <div>
                    <div className="feedSetting">설정</div>
                </div>
            </div>

            <div className="feedImage">
                <img src={imageUrl} alt="게시물" />
            </div>

            <div className="feedInteraction">
                <div className="feedInteractionDetail">
                    <div className="iLikeIt">좋아요</div>
                    <div className="wrtComment">댓글</div>
                    <div className="sendToMsg">메시지</div>
                </div>

                <div>
                    <div className="bookmark">저장</div>
                </div>
            </div>

            <div className="interactionStatus">
                <div className="howManyLikey">좋아요 {likes}개</div>
            </div>

            <div>
                <div className="feedText">{content}</div>
            </div>
            <div>
                <div className="createdDate">{displayDate}</div>
                {isCurrentUser && <button onClick={handleDelete}>삭제</button>}
            </div>
        </div>
    )
})


// FeedTemplate.propTypes = {
//     id: PropTypes.string.isRequired,
//     nickname: PropTypes.string.isRequired,
//     profileImageUrl: PropTypes.string.isRequired,
//     imageUrl: PropTypes.string.isRequired,
//     likes: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
// };

export default FeedTemplate;
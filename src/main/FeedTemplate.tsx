import './FeedTemplate.css'
// import PropTypes from "prop-types";
//아이디, 닉네임, 사진url, 좋아요갯수, 게시글내용, 날짜
import { Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { forwardRef } from 'react';
import { db } from '../firebase';

type PostData = {
    id: string;
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

const FeedTemplate = forwardRef<HTMLDivElement, PostData>(({ id, nickname, profileImageUrl, imageUrl, likes, content, date }, ref) => {
    // const displayDate = new Date(date.seconds * 1000).toLocaleDateString(); // this converts it to a string in the format "MM/DD/YYYY"
    const displayDate = new Date(date.seconds * 1000).toLocaleString("ko-KR"); // 한국 표준 시간대에 맞게 시간까지 표시

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'posts', id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="feedContentBox" ref={ref}>
            <div className="feedHeader">
                <div className="headerLeft">
                    <div className="profileImageCircle">
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
                <button onClick={handleDelete}>삭제</button>
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
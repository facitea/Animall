import './FeedTemplate.css'
// import PropTypes from "prop-types";
//아이디, 닉네임, 사진url, 좋아요갯수, 게시글내용, 날짜

interface FeedTemplate {
    id: string,
    nicknamme: string,
    profileImageUrl: string,
    imageUrl: string,
    likes: string,
    content: string,
    date: string
}



const FeedTemplate = () => {
    // const FeedDetailData: FeedTemplate = {
    //     id: id,
    //     nicknamme: nicknamme,
    //     profileImageUrl: profileImageUrl,
    //     imageUrl: imageUrl,
    //     likes: likes,
    //     content: content,
    //     date: date
    // }

    return (
        <div className="feedContentBox">
            <div className="feedHeader">
                <div className="headerLeft">
                    <div className="profileImageCircle">
                        <img className="profileImage" src="msk.png" alt="일론머스크" />
                    </div>
                    <div className="userNickname" id="userNickname${moreSectionCount}">{}</div>
                </div>

                <div>
                    <div className="feedSetting">설정</div>
                </div>
            </div>

            <div className="feedImage">
                <img id="feedImage${moreSectionCount}" alt="메인사진" />
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
                <div className="howManyLikey">좋아요 n개</div>
            </div>

            <div>
                <div className="feedText" id="feedText${moreSectionCount}">{}</div>
            </div>
            <div>
                <div className="createdDate" id="createdDate${moreSectionCount}">{}</div>
            </div>
        </div>
    )
}


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
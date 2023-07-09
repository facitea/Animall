import './MyPage.css'
import msk from '../assets/msk.png'
// import jsp from '../assets/박지성.jpg'
// import baloteli from '../assets/발로텔리.jpg'
// import bill from '../assets/빌게이츠.jpg'
// import ahn from '../assets/안철수.jpg'
// import samsung from '../assets/이건희.jpg'
// import dragon from '../assets/이재용.jpg'
// import june from '../assets/정몽준.jpg'
// import bug from '../assets/주커버그.jpg'
import { Link } from "react-router-dom";
import { getFirestore, collection, query, getDocs, where, DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getAuth, signOut } from "firebase/auth";

const MyPage = () => {

    const [userPosts, setUserPosts] = useState<DocumentData>([]);
    const db = getFirestore();
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    const logout = async () => {
        try {
            await signOut(auth);
            alert('로그아웃 되었습니다.');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const postsCollection = collection(db, 'posts');
            const userPostQuery = query(postsCollection, where('id', '==', userId)); // userId에는 현재 로그인된 사용자의 ID를 넣어야 합니다.
            const querySnapshot = await getDocs(userPostQuery);
            const userPostsData = querySnapshot.docs.map((doc) => doc.data());
            setUserPosts(userPostsData);
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="profileTap">
                <div className="profileTable">
                    <div className="profileFirstStair">
                        <div className="profileImageCircle">
                            <img className="profileImage" src={msk} alt="일론머스크" />
                        </div>
                    </div>
                    <div className="profileSecondStair">
                        <div className="relationshipTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>게시물</th>
                                        <th>팔로워</th>
                                        <th>팔로잉</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="personalToSetting">
                                <div className="personalTable">
                                    <div>일론머스크</div>
                                    <div>자기소개안해</div>
                                </div>
                                <div className="settingTable">
                                    <span className="material-symbols-outlined">
                                        settings
                                    </span>
                                </div>
                                <div className='logoutTable'>
                                    <button className="logoutBtn" onClick={logout}>
                                        logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="imageTap">
                {userPosts.map((post: any) => (
                    <div key={post.imageUrl}>
                        <img src={post.imageUrl} alt={post.nickname} />
                    </div>
                ))}
            </div>

            <div className="modalLogIn hidden">
                <div className="modal_overlay"></div>
                <div className="modal_content">
                    <div>
                        <input type="email" id="loginEmail" className="loginEmail" />
                    </div>
                    <div>
                        <input type="password" id="loginPwd" className="loginPwd" />
                    </div>
                    <div>
                        <input type="submit" value="로그인" />
                        <input type="button" value="회원가입" />
                    </div>
                    <div>
                        <a href="#">비밀번호를 잊어버리셨나요?</a>
                        <input type="button" id="closeBtn" value="X" />
                    </div>
                </div>
            </div>

            <input type="button" id="notYetLogin" value="임시버튼.인증=버튼클릭" />
            <div><Link to="/UploadPost" />글쓰기</div>


        </>
    )
}

export default MyPage;
import './MyPage.css'
import msk from '../assets/msk.png'
import jsp from '../assets/박지성.jpg'
import baloteli from '../assets/발로텔리.jpg'
import bill from '../assets/빌게이츠.jpg'
import ahn from '../assets/안철수.jpg'
import samsung from '../assets/이건희.jpg'
import dragon from '../assets/이재용.jpg'
import june from '../assets/정몽준.jpg'
import bug from '../assets/주커버그.jpg'
import { Link } from "react-router-dom";

const MyPage = () => {
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
                                <th>게시물</th>
                                <th>팔로워</th>
                                <th>팔로잉</th>
                                <tr>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                </tr>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="imageTap">
                <div><img src={jsp} alt="박지성" /></div>
                <div><img src={baloteli} alt="발로텔리" /></div>
                <div><img src={bill} alt="빌게이츠" /></div>
                <div><img src={ahn} alt="안철수" /></div>
                <div><img src={samsung} alt="이건희" /></div>
                <div><img src={dragon} alt="이재용" /></div>
                <div><img src={june} alt="정몽준" /></div>
                <div><img src={bug} alt="주커버그" /></div>
                <div><img src="#" alt="주커버그" /></div>
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
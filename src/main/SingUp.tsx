import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const submitSignup = (event: any) => {
        event.preventDefault();
        // const email = document.getElementById("loginEmail").value;
        // const pwd = document.getElementById("loginPwd").value;

        if (!userId || !password) {
            alert("모든 항목 기재해야합니다");
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userId, password)
            .then((userCredential) => {
                // 가입
                const user = userCredential.user;
                alert("가입 성공");
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                console.log("가입 실패");
            });
    };

    return (
        <form onSubmit={submitSignup}>
            <label>
                아이디:
                <input type="text" value={userId} onChange={e => setUserId(e.target.value)} />
            </label>
            <br />
            <label>
                비밀번호:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <br />
            <label>
                닉네임:
                <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
            </label>
            <br />
            <label>
                전화번호:
                <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </label>
            <br />
            <input type="submit" value="회원가입" />
        </form>
    )
}

export default SignUp;

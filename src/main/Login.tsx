import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
// import SignUp from './SingUp';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: any) => {
        event.preventDefault();

        if (!email || !password) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("로그인 성공");
                console.log("로그인 성공");
                // 로그인 후 처리 로직 추가
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("로그인 실패");
                alert("로그인 실패");
                console.log(errorCode, errorMessage)
                // 로그인 실패 처리 로직 추가
            });
    };

    const handleForgotPassword = () => {
        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("비밀번호 재설정 이메일이 전송되었습니다.");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("비밀번호 재설정 이메일 전송 실패");
                console.log(errorCode, errorMessage)
            });
    };

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    이메일:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    비밀번호:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">로그인</button>
            </form>
            <p>
                <button onClick={handleForgotPassword}>비밀번호 찾기</button>
            </p>
            <p>
                회원이 아니신가요? <Link to="/SignUp">회원가입</Link>
            </p>
        </>
    );
}

export default Login;


import "../css/login.css"
import { supabase } from '../supabase/supabase'
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import logo from '../public/logo.png';

//** 로그인만들기 */
const signInWithGoogle = async (e, path) => {
  e.preventDefault();
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: path, // 일반적으로 'google'
      options: {
        redirectTo: "http://localhost:3000/login/redirect",
        queryParams: {
          prompt: 'select_account' // ← 핵심 옵션
        }
      }
    });

    if (error) {
      console.error("로그인 오류:", error.message);
    }
  } catch (error) {
    console.error("로그인 중 예외 발생:", error);
  }
};


export function Login() {
  return (<>
    <div className="login">
      <section className="login_sectoin_new">
        <img src={logo} alt="logo" />
        {/* <h2
          style={{ fontWeight: 700, padding: '10px' }}
        >간편 로그인</h2> */}

        <div style={{ display:'flex', flexDirection:'column', justifyContent: 'center',}}>
          <h2 className="h2">
            꿀 찾으러 가는 중... 🌼
          </h2>
          <div style={{ display:'flex', flexDirection:'column' }}>
            <div
              className="glass-btn"
              onClick={(e) => { signInWithGoogle(e, 'google') }}
            >
              <FcGoogle style={{ padding: '0px 10px', paddingLeft:'0px'}}/>으로 로그인하기
            </div>
            <div
              className="glass-btn"
              onClick={(e) => signInWithGoogle(e, 'github')}
            >
              <IoLogoGithub style={{ padding: '0px 10px', paddingLeft:'0px' }}/>으로 로그인하기
            </div>
          </div>
        </div>
      </section>
    </div>
  </>)
}
import '../css/MyPage.css'
import { useEffect, useState } from 'react';
import { useParams, } from 'react-router-dom';
import { useUserTable } from '../hooks/useUserTable'
import { MyPageTalk } from './MyPage.Talk'
import { MyPageTalkLog } from './MyPage.Talk.Log'
import { MyPageLike } from './MyPage.Like'
import { getUser } from '../utils/getUser';
import { useRegion } from '../hooks/useRegion';
import region from '../utils/region.json';
import { MyPageSell } from './MyPage.Sell';
import { MyPageBuy } from './MyPage.Buy';
import { MyPageGroupBuy } from './MyPage.Group.Buy';
import { MyPageGroupSell } from './MyPage.Group.Sell';

const createNickname = async (name, city, district, email = null) => {
    try {
        const { user } = await getUser();
        if (!user) throw new Error("로그인된 유저가 없습니다.");

        const res = await fetch('https://mkoiswzigibhylmtkzdh.supabase.co/functions/v1/user', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: user.id, name: name, region: JSON.stringify([city, district]),
                email: email === null ? user.email : email
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            console.error("닉네임 업데이트 실패:", errorData.error ?? res.statusText);
            return;
        }
        return await res.json();
    } catch (err) {
        console.error("예외 발생:", err.message);
    }
};

// 변경 페이지
function Default({ user }) {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [city, setCity] = useState(user.info.region[0])
    const [district, setDistrict] = useState(user.info.region[1])
    const [realName, setRealName] = useState('')
    const { citys, districts, setBoth } = useRegion();

    useEffect(() => {
        (async () => {
            try {
                const { user } = await getUser();
                setRealName(user.name);
            } catch (error) {
                console.error("유저 데이터 불러오기 실패:", error);
            }
        })();/*  */
    }, []);

    return (<>
        <div className='wrapper'>
            <span className='title'>내 정보</span>
            <ul className='wrapper_ul'>
                <li className='wrapper_li rhwjd'>
                    <span>이름</span>
                    <p className='none'>{realName}</p>
                </li>
                <li className='wrapper_li'>
                    <span>닉네임</span>
                    {name === null
                        ? (<p className='none'>{user.info.name}</p>)
                        : (<input
                            className='none'
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />)
                    }
                    <button
                        className='wrapper_button'
                        style={{ filter: `${email !== null ? 'brightness(0.8)' : 'brightness(1)'}` }}
                        onClick={(e) => {
                            e.preventDefault();
                            if (email === null && name === null) {
                                setName(user.info.name);
                            }
                            else {
                                createNickname(name, user.info.region[0], user.info.region[1]).then(() => {
                                    user.refetch().then(() => {
                                        setName(null);
                                    });
                                })
                            }
                        }}>
                        수정
                    </button>
                </li>
                <li className='wrapper_li'>
                    <span>이메일</span>
                    {email === null
                        ? (<p className='none'>{user.info.email}</p>)
                        : (<input
                            className='none'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />)
                    }
                    <button
                        className='wrapper_button'
                        style={{ filter: `${name !== null ? 'brightness(0.8)' : 'brightness(1)'}` }}
                        onClick={(e) => {
                            e.preventDefault();
                            if (email === null && name === null) {
                                setEmail(user.info.email);
                            }
                            else {
                                createNickname(user.info.name, user.info.region[0], user.info.region[1], email).then(() => {
                                    user.refetch().then(() => {
                                        setEmail(null);
                                    });
                                })
                            }
                        }}>
                        수정
                    </button>
                </li>
            </ul>
        </div>
        <div className='wrapper'>
            <span className='title' style={{ marginTop: '10px' }}>내 위치</span>
           <ul className='wrapper_ul'>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <select
                        className="wrapper_region"
                        name="region"
                        value={city}
                        onChange={(e) => {
                            e.preventDefault();
                            setCity(e.target.value)
                        }}
                    >
                        {citys.map((o, k) => <option key={k} value={o}>{o}</option>)}
                    </select>
                    <select
                        className="wrapper_region"
                        name="region"
                        value={district}
                        onChange={(e) => {
                            e.preventDefault();
                            setDistrict(e.target.value)
                        }}
                    >
                        {region[city].map((o, k) =>
                            <option key={k} value={o}>{o}</option>
                        )}
                    </select>
                </div>
                <button
                    className='wrapper_button'
                    style={{ width: '100%' }}
                    onClick={(e) => {
                        e.preventDefault();
                        createNickname(user.info.name, city, district).then((obj) => {
                            user.refetch().then(() => {
                                setBoth(city, district);
                            });
                        })
                    }}
                >
                    변경
                </button>
            </ul>
        </div>
    </>)
}

export function MyPage() {
    const user = useUserTable();
    const { tap, item } = useParams();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => { // 사이즈 확인 
        const checkSize = () => {
            setIsMobile(window.innerWidth <= 940);
        };
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    if (user.loading) { return <>로딩중</> }
    switch (tap) {
        case 'talk': {
            if (isMobile) {
                if (!item) { return (<MyPageTalk user={user} />) }
                else { return (<MyPageTalkLog user={user} />) }
            }
            else return (<MyPageTalk user={user} />)
        } break;
        case 'like': {
            return (<MyPageLike user={user} />);
        } break;
        case 'buy': {
            return (<MyPageBuy user={user}/>)
        }
        case 'groupBuy': {
            return (<MyPageGroupBuy user={user}/>)
        }
        case 'sell': {
            return (<MyPageSell user={user} />);
        } break;
        case 'groupSell':{
            return(<MyPageGroupSell user={user}/>)
        }
        default: {
            return (<Default user={user} />)
        } break;
    }
}
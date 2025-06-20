import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import { Provider as ReduxProvider } from "react-redux";
import { redux } from "./store/redux";
import './index.css';
import { Layout } from './components/layout';
import { Login } from './components/Login';
import { LoginRedirect } from './components/Login.redirect'
import { MyPage } from './components/Mypage';
import { TestPage } from './components/testpage';
// import { Trade } from './components/Trade'
// import { UsedSell } from './components/UsedSell';
// import { UsedShare } from './components/UsedShare';
// import { UsedBuy } from './components/UsedBuy';
import { Main } from './components/Main';
import { UsedCreate } from './components/UsedCreate';
import { UsedDetail } from './components/UsedDetail';
import { UsedUpdate } from './components/UsedUpdate';
import BoardListPages from './board/BoardListPages';
import WritePage from './board/WritePage';
import BoardDetailPage from './board/BoardDetailPage';
import EditPage from './board/EditPage';
import { UsedBoard } from './components/UsedBoard';

import { Trade } from './components/Trade';
import { TradeForm } from './components/TradeForm';
import { TradeDetail } from './components/TradeDetail';
import { Notifications } from './components/Notifications';
import { NotificationProvider } from './components/AlertNotifications';


function App() {
  return (
    <BrowserRouter>
      {/* 리덕스 사용 */}
      <ReduxProvider store={redux}>
        <NotificationProvider>
          <Layout>
            <Routes>
              <Route path='/notification' element={<Notifications />}/>
              <Route path='/' element={<Main />} />
              <Route path='/login' element={<Login />} />
              <Route path='/login/redirect' element={<LoginRedirect />} />
              <Route path='/my' element={<MyPage />} />
              <Route path='/my/:tap' element={<MyPage />} />
              <Route path='/my/:tap/:item' element={<MyPage />} />
              {/* 강수아 작업 -- 중고거래, 나눔, 판매 */}
              {/* <Route path='/trade/:id' element={<UsedBoard />} />
            <Route path="/trade/:id/:item" element={<UsedDetail />} />
            <Route path='/trade/deal/register' element={<UsedCreate />} />
            <Route path='/trade/:id/:item/update' element={<UsedUpdate />} /> */}
              {/* 김종현 작업 -- 공구, 전체 */}
              <Route path="/trade" element={<Trade />} />                   {/* 전체페이지 */}
              <Route path="/trade/:tap" element={<Trade />} />              {/* 공구페이지 */}
              <Route path="/trade/:tap/form" element={<TradeForm />} />     {/* 공구 등록 */}
              <Route path="/trade/:tap/form/:id" element={<TradeForm />} /> {/* 공구 수정 */}
              <Route path="/trade/gonggu/:id" element={<TradeDetail />} />  {/* 공구 상품 상세 */}
              {/* 이신아 작업 -- 일반 게시판 */}
              <Route path="/life" element={<BoardListPages />} />
              <Route path="/life/:tap" element={<BoardListPages />} />
              <Route path="/life/write" element={<WritePage />} />
              <Route path="/life/edit/:id" element={<EditPage />} />
              <Route path="/life/:tap/:id" element={<BoardDetailPage />} />
            </Routes>
          </Layout>
        </NotificationProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);


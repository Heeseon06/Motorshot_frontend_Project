import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import motorcycleIcon from '../assets/images/logo_full.svg'; // 오토바이 로고
import '../styles/MainPage.css';

function MainPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1초마다 현재 시간 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 클리어
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} - ${month} - ${day}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로컬 스토리지에서 JWT 토큰 제거
    localStorage.removeItem('user_id'); // 로컬 스토리지에서 사용자 ID 제거
    navigate('/login'); // 로그인 페이지로 리다이렉트
  };

  return (
    <div className="main-page">
      <div className="content-container">
        <img src={motorcycleIcon} alt="Motorcycle Icon" className="motorcycle-icon" />
      </div>
      <p className="date">{formatDate(currentTime)}</p>
      <p className="time">{formatTime(currentTime)}</p>
      <div className="button-container">
        <button className="start-button" onClick={() => navigate('/analysis')}>
          시작하기 →
        </button>
        <button className="logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default MainPage;

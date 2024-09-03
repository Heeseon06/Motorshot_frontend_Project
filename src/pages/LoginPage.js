import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import motorcycleIcon from '../assets/images/logo_full.svg'; // 오토바이 로고

function LoginPage() {
  const [formData, setFormData] = useState({
    userid: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user/login', formData);
      
      // 서버로부터 토큰을 받아와 localStorage에 저장
      const token = response.data.token || response.data.access_token;
      const userId = formData.userid;
  
      if (token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', userId);
        navigate('/'); // 로그인 성공 후 메인 페이지로 이동
      } else {
        setError('로그인 실패: 서버에서 유효한 토큰이나 사용자 ID를 받지 못했습니다.');
      }
      
    } catch (error) {
      setError('로그인 실패: 아이디와 비밀번호를 확인하세요.');
    }
  };

  const handleSignup = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  return (
    <div className="login-page">
      <div className="login-icon-container">
        <img src={motorcycleIcon} alt="Motorcycle Icon" className="login-icon" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>로그인</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          name="userid"
          placeholder="아이디"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
          required
        />
        <div className="button-container">
          <button type="submit" className="login-button">로그인</button>
          <button type="button" className="signup-button" onClick={handleSignup}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

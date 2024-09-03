import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css';
import motorcycleIcon from '../assets/images/motorcycle.png'; // 이미지 import

function SignupPage() {
  const [formData, setFormData] = useState({
    userid: '',
    password: '',
    passwordVerify: '',
    name: '',
    email: '',
    hp: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 입력 필드별로 유효성 검사 수행
    switch (name) {
      case 'userid':
        validateId(value);
        break;
      case 'password':
        validatePassword(value);
        break;
      case 'passwordVerify':
        validatePasswordVerify(value);
        break;
      case 'name':
        validateName(value);
        break;
      case 'email':
        validateEmail(value);
        break;
      case 'hp':
        validateHP(value);
        break;
      default:
        break;
    }
  };

  const validateId = (id) => {
    if (id.length < 4 || !/^[a-zA-Z0-9]+$/.test(id)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        userid: '아이디는 최소 4자 이상이며, 영문자와 숫자만 사용 가능합니다.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { userid, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '비밀번호는 최소 8자 이상이며, 대문자와 특수문자를 포함해야 합니다.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { password, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validatePasswordVerify = (passwordVerify) => {
    if (passwordVerify !== formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordVerify: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { passwordVerify, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validateName = (name) => {
    if (name.trim().length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: '이름을 입력해주세요.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { name, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: '유효한 이메일 주소를 입력해주세요.',
      }));
    } else {
      setErrors((prevErrors) => {
        const { email, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validateHP = (hp) => {
    const hpRegex = /^\d{3}-\d{3,4}-\d{4}$/; // 예: 010-1234-5678
    if (!hpRegex.test(hp)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        hp: '전화번호 형식이 올바르지 않습니다. (예: XXX-XXXX-XXXX)',
      }));
    } else {
      setErrors((prevErrors) => {
        const { hp, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사를 여기서도 추가적으로 확인
    validateId(formData.userid);
    validatePassword(formData.password);
    validatePasswordVerify(formData.passwordVerify);
    validateName(formData.name);
    validateEmail(formData.email);
    validateHP(formData.hp);

    // 에러가 하나라도 있으면 회원가입 진행하지 않음
    if (Object.keys(errors).length > 0) {
      alert('제출하기 전에 오류를 수정해주세요.');
      return;
    }

    // 회원가입 요청을 서버로 전송
    try {
      const response = await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('회원가입이 성공적으로 완료되었습니다!');
        navigate('/login'); // 로그인 페이지로 리디렉션
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-icon-container">
        <img src={motorcycleIcon} alt="Motorcycle Icon" className="signup-icon" />
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>회원가입</h2>
        <input
          type="text"
          name="userid"
          placeholder="아이디 (최소 4자, 영문자와 숫자만 사용)"
          value={formData.userid}
          onChange={handleChange}
          required
        />
        {errors.userid && <p className="error-message">{errors.userid}</p>}
        <input
          type="password"
          name="password"
          placeholder="비밀번호 (최소 8자, 대문자 1개, 특수문자 포함)"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <input
          type="password"
          name="passwordVerify"
          placeholder="비밀번호 확인 (비밀번호와 동일하게 입력)"
          value={formData.passwordVerify}
          onChange={handleChange}
          required
        />
        {errors.passwordVerify && <p className="error-message">{errors.passwordVerify}</p>}
        <input
          type="text"
          name="name"
          placeholder="이름 (필수 입력)"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
        <input
          type="email"
          name="email"
          placeholder="이메일 (유효한 이메일 주소)"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <input
          type="text"
          name="hp"
          placeholder="전화번호 (예: XXX-XXXX-XXXX)"
          value={formData.hp}
          onChange={handleChange}
          required
        />
        {errors.hp && <p className="error-message">{errors.hp}</p>}
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignupPage;

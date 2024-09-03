import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/RecordDBPage.module.css';
import logo_text from '../assets/images/logo_text.svg';
import back from '../assets/images/back.png';
import bikeIcon from '../assets/images/motorcycle.png';
import helmetIcon from '../assets/images/helmet.png';
import dangerIcon from '../assets/images/danger.png';
import speedIcon from '../assets/images/speed.png';
function RecordDBPage() {
  const [records, setRecords] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const detectionVideoRefs = useRef([]); // 동영상 참조를 위한 ref 생성
  // 현재 시간 업데이트
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
  // useEffect를 사용해 데이터 불러오기
  useEffect(() => {
    const fetchRecords = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      if (!token || !userId) {
        console.error('Token or user_id is missing.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/record/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecords(response.data);
      } catch (error) {
        console.error('Failed to fetch records:', error);
      }
    };
    fetchRecords();
  }, []);
  // 검색 결과 필터링
  const filteredVehicles = records.filter(vehicle =>
    vehicle.licensePlate.includes(searchQuery)
  );
  // 상태 아이콘 매핑
  const getStatusIcon = (icon) => {
    switch (icon) {
      case 'helmetIcon': return helmetIcon;
      case 'dangerIcon': return dangerIcon;
      case 'speedIcon': return speedIcon;
      default: return helmetIcon;
    }
  };
  const handleVideoUploadClick = () => {
    navigate('/analysis');
  };
  return (
    <div className={styles.recordDbPage}>
      <div className={styles.sidebar}>
        <ul className={styles.recordList}>
          <img src={logo_text} alt="logo_text" className={styles.logo_text} />
          <li className={styles.menuItem} onClick={handleVideoUploadClick}>
            <img src={back} alt="영상업로드 전환" className={styles.menuIcon} />
          </li>
        </ul>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h2>기록 목록</h2>
          <div className={styles.headerRight}>
            <input
              type="text"
              placeholder="차량번호 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <div className={styles.headerIcons}>
              <img src={helmetIcon} alt="Helmet" />
              <img src={dangerIcon} alt="Danger" />
              <img src={speedIcon} alt="Speed" />
            </div>
          </div>
        </div>
        <div className={styles.recordTable}>
          <table>
            <thead>
              <tr>
                <th>단속번호</th>
                <th>단속유형</th>
                <th>차량번호</th>
                <th>단속시간</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle._id} onClick={() => setSelectedVehicle(vehicle)}>
                  <td>{vehicle._id}</td>
                  <td>{vehicle.type}</td>
                  <td>{vehicle.licensePlate}</td>
                  <td>{new Date(vehicle.time).toLocaleString()}</td>
                  <td><img src={getStatusIcon(vehicle.icon)} alt={`${vehicle.type} 아이콘`} className={styles.statusIcon} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedVehicle && (
          <div className={styles.selectedVehicleInfo}>
            <h3>단속번호: {selectedVehicle._id}</h3>
            <p>유형: {selectedVehicle.type}</p>
            <p>차량번호: {selectedVehicle.licensePlate}</p>
            <p>시간: {new Date(selectedVehicle.time).toLocaleString()}</p>
          </div>
        )}
      </div>
      <div className={styles.currentTime}>
      <p className={styles.dateTime}>{`${formatDate(currentTime)} | ${formatTime(currentTime)}`}</p>
      </div>
      <img src={bikeIcon} alt="오토바이 아이콘" className={styles.bikeIcon} />
    </div>
  );
}
export default RecordDBPage;
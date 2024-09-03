import React from 'react';
import '../styles/DetectionFooter.css';
import helmetIcon from '../assets/images/helmet.png';
import dangerIcon from '../assets/images/danger.png';

function DetectionFooter({ helmetCount, dangerCount }) {
  return (
    <div className="detection-footer">
      <div className="detection-summary">
        <div className="detection-icon">
          <svg className="progress-circle" viewBox="0 0 36 36">
            <path
              className="circle-bg"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle helmet"
              strokeDasharray="75, 100"  // 헬멧미착용 비율에 맞게 수정
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <image
              href={helmetIcon}
              x="9" y="9" height="18px" width="18px" // 아이콘 크기 18px로 조정
            />
          </svg>
        </div>
        <div className="detection-text">
          <p className="detection-label">헬멧미착용</p>
          <p className="detection-count">{helmetCount}</p>
        </div>
      </div>
      <div className="detection-summary">
        <div className="detection-icon">
          <svg className="progress-circle" viewBox="0 0 36 36">
            <path
              className="circle-bg"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle danger"
              strokeDasharray="25, 100"  // 위험운전 비율에 맞게 수정
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <image
              href={dangerIcon}
              x="9" y="9" height="18px" width="18px" // 아이콘 크기 18px로 조정
            />
          </svg>
        </div>
        <div className="detection-text">
          <p className="detection-label">위험운전</p>
          <p className="detection-count">{dangerCount}</p>
        </div>
      </div>
    </div>
  );
}

export default DetectionFooter;

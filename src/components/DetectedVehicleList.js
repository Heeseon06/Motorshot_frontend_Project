import React from 'react';
import '../styles/DetectedVehicleList.css';
import helmetIcon from '../assets/images/helmet.png'; // 필요에 따라 아이콘 추가
import dangerIcon from '../assets/images/danger.png';
import speedIcon from '../assets/images/speed.png';

function DetectedVehicleList({ detectedVehicles, detectionVideoRefs, sampleImage }) {
    
    // 아이콘 매핑: 백엔드에서 가져온 `icon` 필드 값을 프런트엔드의 실제 이미지로 변환
    const iconMap = {
        "icon: helmetIcon": helmetIcon,
        "icon: dangerIcon": dangerIcon,
        "icon: speedIcon": speedIcon,
        // 필요한 경우 다른 아이콘도 추가
    };

    return (
        <div className="vehicle-detection-summary">
            <h3>단속차량</h3>
            {detectedVehicles.map((vehicle, index) => (
                <div key={vehicle._id} className="vehicle-detection-item">
                    <div className="vehicle-video-container">
                        <div className="vehicle-overlay">
                            <img src={iconMap[vehicle.icon]} alt={`${vehicle.type} 아이콘`} className="vehicle-icon" />
                            <p className="vehicle-license">{vehicle.licensePlate}</p>
                            <p className="vehicle-time">{new Date(vehicle.time).toLocaleString()}</p>
                        </div>
                        {vehicle.video ? (
                            <video
                                ref={el => (detectionVideoRefs.current[index] = el)}
                                className="vehicle-thumbnail"
                                controls
                            >
                                <source src={vehicle.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img src={sampleImage} alt="Detection Video" className="vehicle-thumbnail" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DetectedVehicleList;

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60초 타이머
  const navigate = useNavigate();

  useEffect(() => {
    if (score >= 10) {
      navigate('/CongratulationsPage');
    }
  }, [score, navigate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const ballRadius = 20; // 공의 크기를 20으로 설정

    // 공의 시작 위치를 랜덤으로 설정
    let x = Math.random() * (canvas.width - 2 * ballRadius) + ballRadius;
    let y = Math.random() * (canvas.height - 2 * ballRadius) + ballRadius;
    let dx = 2;
    let dy = -2;

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
      }
      x += dx;
      y += dy;
    };

    const interval = setInterval(draw, 10);

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const distance = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);
      if (distance < ballRadius) {
        setScore((prevScore) => {
          const newScore = prevScore + 1;
          const scoreElement = document.getElementById('bbs-score');
          scoreElement.classList.add('bbsanimate-score');
          setTimeout(() => {
            scoreElement.classList.remove('bbsanimate-score');
          }, 500); // 애니메이션 지속 시간과 일치시킴
          return newScore;
        });
      }
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      clearInterval(interval);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          alert('홈으로 이동합니다');
          navigate('/');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // 1초마다 타이머 감소

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigate]);

  return (
    <div className="bbs-error-page">
      <h1>에러가 발생했습니다</h1>
      <h3>공을 10번 누르면..❗❓</h3>
      <p>죄송합니다.😅 페이지를 불러오는 중에 문제가 발생했습니다.</p>
      <canvas ref={canvasRef} width="480" height="320" className="bbs-game-canvas"></canvas>
      <p id="bbs-score" className="bbs-score">점수: {score}</p>
      <p>남은 시간: {timeLeft}초</p>
      <p>타이머가 다 되기 전에 10점을 달성해 보세요!!</p>
      <button className="bbs-home-button" onClick={() => {
        alert('홈으로 이동합니다');
        navigate('/');
      }}>🏠 홈으로</button>
    </div>
  );
};

export default ErrorPage;
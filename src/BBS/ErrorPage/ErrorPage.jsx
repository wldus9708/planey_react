import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60초 타이머
  const [ballColor, setBallColor] = useState("#0095DD"); // 공의 색상
  const [ballRadius, setBallRadius] = useState(20); // 공의 크기
  const [dx, setDx] = useState(2); // 공의 x축 속도
  const [dy, setDy] = useState(-2); // 공의 y축 속도
  const navigate = useNavigate();
  const location = useLocation();
  const statusCode = new URLSearchParams(location.search).get('status');

  useEffect(() => {
    if (score >= 10) {
      navigate('/CongratulationsPage');
    }
  }, [score, navigate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 공의 시작 위치를 랜덤으로 설정
    let x = Math.random() * (canvas.width - 2 * ballRadius) + ballRadius;
    let y = Math.random() * (canvas.height - 2 * ballRadius) + ballRadius;

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = ballColor; // 공의 색상 설정
      ctx.fill();
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        setDx(-dx);
      }
      if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        setDy(-dy);
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
        // 공의 색상, 크기, 속도를 랜덤으로 변경
        setBallColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
        setBallRadius(Math.random() * 20 + 10); // 10에서 30 사이의 크기
        setDx((Math.random() - 0.5) * 4); // -2에서 2 사이의 속도
        setDy((Math.random() - 0.5) * 4); // -2에서 2 사이의 속도
      }
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      clearInterval(interval);
      canvas.removeEventListener('click', handleClick);
    };
  }, [ballColor, ballRadius, dx, dy]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // 1초마다 타이머 감소

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, []);

  return (
    <div className="bbs-error-page">
      <h1>{statusCode}에러가 발생했습니다</h1>
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
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CongratulationsPage.css';

const CongratulationsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.getElementById('bbs-fireworksCanvas');
    const ctx = canvas.getContext('2d');
    const fireworks = [];

    const createFirework = (x, y) => {
      const firework = {
        x,
        y,
        age: 0,
        maxAge: 50,
        particles: []
      };
      for (let i = 0; i < 100; i++) {
        firework.particles.push({
          x,
          y,
          angle: Math.random() * 2 * Math.PI,
          speed: Math.random() * 5 + 2,
          age: 0,
          maxAge: 100,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
      }
      fireworks.push(firework);
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworks.forEach((firework, index) => {
        firework.age++;
        if (firework.age > firework.maxAge) {
          fireworks.splice(index, 1);
        }
        firework.particles.forEach((particle) => {
          particle.age++;
          if (particle.age > particle.maxAge) {
            return;
          }
          particle.x += Math.cos(particle.angle) * particle.speed;
          particle.y += Math.sin(particle.angle) * particle.speed;
          ctx.fillStyle = particle.color;
          ctx.fillRect(particle.x, particle.y, 2, 2);
        });
      });
      requestAnimationFrame(update);
    };

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createFirework(x, y);
    });

    update();

    const timer = setTimeout(() => {
      alert('홈으로 이동합니다');
      navigate('/');
    }, 60000); // 1분 후에 홈으로 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigate]);

  return (
    <div className="bbs-congratulations-page">
      <h1>축하합니다! ⬜안을 클릭해 보세요!!🎉</h1>
      <p>10점을 넘었습니다!</p>
      <canvas id="bbs-fireworksCanvas" width="800" height="600"></canvas>
      <button className="bbs-home-button" onClick={() => {
        alert('홈으로 이동합니다');
        navigate('/');
      }}>🏠 홈으로</button>
    </div>
  );
};

export default CongratulationsPage;
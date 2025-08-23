// ts-ignore
import { useState } from 'react';

const wavePath = (amplitude: number, wavelength: number, length: number) => {
  // Tạo đường path sóng sine dài 'length'
  const step = wavelength / 4;
  let d = `M 0 0 `;
  let x = 0;
  let y = 0;

  while (x < length) {
    d += `q ${step / 2} ${-amplitude} ${step} 0 `;
    d += `q ${step / 2} ${amplitude} ${step} 0 `;
    x += step * 2;
  }
  return d;
};

const AnimatedTassel = ({ x, y, delay, rotation, scale }) => {
  return (
    <svg
      className="tassel-svg"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        animationDelay: `${delay}s`,
      }}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="wave-path"
        d={wavePath(8, 12, 40)}
        stroke="hsl(330, 80%, 65%)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="0" r="6" fill="hsl(330, 80%, 65%)" />
    </svg>
  );
};

const TasselWaveFirework = () => {
  const [tassels, setTassels] = useState<any[]>([]);

  const launchTassels = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const newTassels: {
      id: string;
      x: unknown;
      y: unknown;
      delay: number;
      rotation: number;
      scale: number;
    }[] = [];

    for (let i = 0; i < 20; i++) {
      newTassels.push({
        id: Math.random().toString(36).substr(2, 9),
        x: originX,
        y: originY,
        delay: Math.random() * 0.6,
        rotation: (Math.random() - 0.5) * 60,
        scale: Math.random() * 0.5 + 0.7,
      });
    }

    setTassels((prev) => [...prev, ...newTassels]);

    setTimeout(() => {
      setTassels((prev) => prev.slice(newTassels.length));
    }, 1600);
  };

  return (
    <div
      style={{
        height: '100vh',
        background: '#fff8f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <button
        onClick={launchTassels}
        style={{
          padding: '15px 30px',
          backgroundColor: '#ff4081',
          color: 'white',
          fontSize: 18,
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          position: 'relative',
          zIndex: 10,
        }}
      >
        Tung Dây Tua Sóng
      </button>

      {tassels.map(({ id, x, y, delay, rotation, scale }: any) => (
        <AnimatedTassel
          key={id}
          x={x}
          y={y}
          delay={delay}
          rotation={rotation}
          scale={scale}
        />
      ))}
      <style>{`
        .tassel-svg {
          animation: flyUpFade 1.5s forwards ease-out;
          transform-origin: bottom center;
          pointer-events: none;
        }

        .wave-path {
          animation: waveMotion 1.5s infinite ease-in-out alternate;
          stroke-dasharray: 50;
          stroke-dashoffset: 0;
        }

        @keyframes flyUpFade {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-150px) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes waveMotion {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 50;
          }
        }
      `}</style>
    </div>
  );
};

export default TasselWaveFirework;

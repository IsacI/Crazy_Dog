import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GamepadMapping: React.FC = () => {
  const [gamepadInfo, setGamepadInfo] = useState<any[]>([]);

  useEffect(() => {
    const handleGamepadConnected = (e: GamepadEvent) => {
      setGamepadInfo((prev) => [...prev, e.gamepad]);
    };

    const handleGamepadDisconnected = (e: GamepadEvent) => {
      setGamepadInfo((prev) => prev.filter(gp => gp.index !== e.gamepad.index));
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
    };
  }, []);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h1>Gamepad Mapping</h1>
      {gamepadInfo.length === 0 ? <p>No gamepad connected</p> : (
        <ul>
          {gamepadInfo.map((gp) => (
            <li key={gp.index}>
              <h2>Gamepad {gp.index}</h2>
              <p>ID: {gp.id}</p>
              <p>Buttons: {gp.buttons.length}</p>
              <p>Axes: {gp.axes.length}</p>
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Link to="/">
          <button style={{ margin: '10px 0', padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Página Inicial (Gamepad Mapping)
          </button>
        </Link>
        <Link to="/control-panel">
          <button style={{ margin: '10px 0', padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Painel de Controle
          </button>
        </Link>
        <Link to="/car-game">
          <button style={{ margin: '10px 0', padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Iniciar Jogo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GamepadMapping;

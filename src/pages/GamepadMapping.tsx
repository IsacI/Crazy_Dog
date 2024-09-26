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
    <div>
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
      <Link to="/">
        <button>Página Inicial (Gamepad Mapping)</button>
      </Link>
      <Link to="/control-panel">
        <button>Painel de Controle</button>
      </Link>
      <Link to="/car-game">
        <button>Iniciar Jogo</button>
      </Link>

    </div>
  );
};

export default GamepadMapping;

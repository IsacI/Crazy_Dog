import React, { useState } from 'react';
import { useGamepadState } from './GamepadState';
import WheelDisplay from './WheelDisplay';
import ButtonAxisSelector from './ButtonAxisSelector';
import { Link } from 'react-router-dom';
import minhaImagem from '../img/Design sem nome.png'; 


const ControlPanel: React.FC = () => {
  const { gamepad } = useGamepadState();
  const [selectedAxis, setSelectedAxis] = useState<number>(0);
  const [selectedButtons, setSelectedButtons] = useState({
    accelerator: 7,
    brake: 6,
    gearUp: 4,
    gearDown: 5,
  });

  const handleSelectionChange = (newSelection: any) => {
    setSelectedButtons(newSelection);
    setSelectedAxis(newSelection.axis);
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h1>Control Panel</h1>

      {/* Adicionando a imagem aqui */}
      
      {gamepad ? (
        <div>
          <h2>Gamepad {gamepad.index}</h2>
          <WheelDisplay
            gamepad={gamepad}
            selectedAxis={selectedAxis}
            selectedButtons={selectedButtons}
          />
          <ButtonAxisSelector gamepad={gamepad} onSelectionChange={handleSelectionChange} />
        </div>
      ) : (
        <p>Nenhum gamepad conectado.</p> // Optional message if no gamepad is connected
      )}
      
      <Link to="/">
        <button style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Página Inicial (Gamepad Mapping)
        </button>
      </Link>
    </div>
  );
};

export default ControlPanel;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link para navegação

const CarGame: React.FC = () => {
  const [gamepad, setGamepad] = useState<Gamepad | null>(null);
  const [speed, setSpeed] = useState<number>(0);
  const [gear, setGear] = useState<number>(1);
  const [isStopped, setIsStopped] = useState<boolean>(false);

  // Velocidades mínimas necessárias para mudar de marcha
  const gearUpSpeed = [0, 20, 40, 60, 80];

  useEffect(() => {
    const updateGamepadState = () => {
      const gamepads = navigator.getGamepads();
      const gp = gamepads[0];

      if (gp) {
        setGamepad(gp);

        // Acelerador e freio
        if (isStopped) {
          if (gp.buttons[7]?.pressed) {
            setSpeed(1); // Começa a movimentar lentamente
            setIsStopped(false);
          }
        } else {
          if (gp.buttons[7]?.pressed) {
            setSpeed(prev => Math.min(prev + 1, 100)); // Aumenta a velocidade
          } else if (gp.buttons[6]?.pressed) {
            setSpeed(prev => Math.max(prev - 1, 0)); // Diminui a velocidade
          }

          // Troca de marchas
          if (gp.buttons[4]?.pressed) { // Marcha para cima
            if (speed >= gearUpSpeed[gear - 1]) {
              setGear(prev => Math.min(prev + 1, 5)); // Aumenta a marcha
            } else {
              setIsStopped(true); // Para o carro se a marcha não for trocada na velocidade certa
            }
          }
          if (gp.buttons[5]?.pressed) { // Marcha para baixo
            if (gear > 1) {
              setGear(prev => Math.max(prev - 1, 1)); // Diminui a marcha
            }
          }

          // Para o carro se a velocidade cair a zero
          if (speed === 0) {
            setIsStopped(true);
          }
        }
      }

      requestAnimationFrame(updateGamepadState);
    };

    updateGamepadState();
  }, [speed, gear, isStopped]);

  return (
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: '20px', textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1>Jogo de Carro</h1>
      {gamepad ? (
        <div>
          <h2>Gamepad Conectado</h2>
          <h3>Velocidade: {speed} km/h</h3>
          <h3>Marcha: {gear}</h3>
          {isStopped && <h3 style={{ color: 'red' }}>O carro parou!</h3>}
          <div style={{
            width: '50px',
            height: '100px',
            backgroundColor: 'blue',
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: `translateX(-50%) translateY(${-(speed * 2)}px)`, // Move o carro para cima com a velocidade
            transition: 'transform 0.1s ease-out'
          }} />
        </div>
      ) : (
        <p>Nenhum gamepad conectado. Por favor, conecte um gamepad para jogar.</p>
      )}

      {/* Adiciona o botão de voltar no canto esquerdo */}
      <Link to="/">
        <button style={{
          position: 'absolute', // Posiciona o botão de forma absoluta
          top: '20px', // Alinha o botão no topo da tela
          left: '20px', // Posiciona o botão no canto esquerdo
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'grey', // Cor de fundo do botão
          color: 'white', // Cor da fonte do botão
          border: 'none', // Remove a borda do botão
          borderRadius: '5px', // Bordas arredondadas
          cursor: 'pointer' // Cursor de ponteiro ao passar sobre o botão
        }}>
          Voltar à Página Principal
        </button>
      </Link>
    </div>
  );
};

export default CarGame;

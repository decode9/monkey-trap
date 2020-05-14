import React, { useState, useEffect } from 'react';
import styles from './engine.module.scss';
import { useEvent } from '../../hooks';
import CreateEngine from './createEngine';
import Monkey0 from '../../assets/img/walk/smart monkey_knight_walk_1_000.png';

const initialState = {
	stage: 0,
	jump: 0,
	blocks: [],
	status: 'start',
	sprite: Monkey0,
};
const blockWidth = 80;
const blockHeight = 200;

export default () => {
	//Estado del juego
	const [gameState, setGameState] = useState(initialState);

	// Ejecutar el juego para iniciar
	const [start, setStart] = useState(false);

	// Verificar que el juego este corriendo
	const [started, setStarted] = useState(false);

	//Instancia de motor de juego
	const [engine, setEngine] = useState(null);

	const handleKeyPress = (e) => {
		// ' ' Representa la barra espaciadora
		if (e.key === ' ') {
			//Empezar el juego al pulsar espacio
			if (!started && !start) {
				setStart(true);
			}

			//Si el juego no ha inicializado retorna vacio
			if (engine == null) return;

			//Si corre Salta
			engine.jump();
		}
	};

	useEvent('keyup', handleKeyPress);

	useEffect(() => {
		if (start) {
			setStarted(true);
			setStart(false);

			//create a new engine and save it to the state to use
			setEngine(new CreateEngine((state) => setGameState(state)));
		}

		if (gameState.status === 'fail' && started) {
			setStarted(false);
			alert('You Lost, Try Again');
			setGameState(initialState);
			setStart(true);
		}

		if (gameState.status === 'win' && started) {
			setStarted(false);
			alert('You Won!, Play Again?');
			setGameState(initialState);
			setStart(true);
        }
        // eslint-disable-next-line
	}, [start, gameState]);

	return (
		<div className={styles.container}>
			<div
				className={styles.stage}
				style={{
					transform: `translate(-${gameState.stage}px, 0px)`, //Move Stage
				}}
			>
				<span
					className={styles.character}
					style={{
						transform: `translate(${gameState.stage + 200}px, -${
							gameState.jump
						}px)`, //Move Stage
					}}
				>
					<img src={gameState.sprite} alt="monkey" />
				</span>

				{gameState.blocks.map((block) => (
					<span
						className={styles.block}
						key={block}
						style={{
							transform: `translate(${block}px, 0px)`, // Move Stage
							height: blockHeight,
							width: blockWidth,
						}}
					/>
				))}
			</div>
		</div>
	);
};

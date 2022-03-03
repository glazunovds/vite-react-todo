import { Button, Input } from '@mui/material';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import styled from 'styled-components/macro';
import { v4 as uuid } from 'uuid';

import { ListItem } from '../App';

interface Props {
	onAdd: (item: ListItem) => void;
}

const TodoForm: FC<Props> = ({ onAdd }) => {
	const [inputValue, setInputValueRaw] = useState('');

	const setInputValue = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValueRaw(e.target.value);
	};

	const handleAdd = (e: FormEvent) => {
		e.preventDefault();
		onAdd({ id: uuid(), value: inputValue });
		setInputValueRaw('');
	};

	return (
		<Root>
			<Form onSubmit={handleAdd}>
				<Input
					className='form-input'
					type='text'
					value={inputValue}
					onChange={setInputValue}
				/>
				<Button className='app-button' variant='contained' type='submit'>
					Добавить
				</Button>
			</Form>
		</Root>
	);
};

const Root = styled.div``;
const Form = styled.form`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	.form-input {
		max-width: calc(100% - 180px);
		width: 100%;
	}
`;

export default TodoForm;

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
				<input type='text' value={inputValue} onChange={setInputValue} />
				<button type='submit'>Добавить</button>
			</Form>
		</Root>
	);
};

const Root = styled.div``;
const Form = styled.form`
	display: flex;
	input {
		flex: 1;
	}
`;

export default TodoForm;

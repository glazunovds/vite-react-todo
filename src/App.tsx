import { Card } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import styled from 'styled-components/macro';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

export interface ListItem {
	id: string;
	value: string;
}

const App: FC = () => {
	const [items, setItems] = useState<ListItem[]>([]);
	const addItem = useCallback(
		(item) => {
			setItems((items) => {
				items.push(item);
				return [...items];
			});
		},
		[setItems],
	);

	const removeItem = useCallback(
		(item: ListItem) => {
			setItems((items) => {
				items = items.filter((e) => e.id !== item.id);
				return items;
			});
		},
		[setItems],
	);

	return (
		<Root>
			<Card className='app-card'>
				<FormWrapper>
					<FormHeader>Список дел:</FormHeader>

					<TodoForm onAdd={addItem} />
					<TodoList onRemove={removeItem} items={items} setItems={setItems} />
				</FormWrapper>
			</Card>
		</Root>
	);
};

const Root = styled.div`
	background: rgba(0, 46, 150, 0.2);
	height: 100%;
	padding-top: 100px;
	.app-card {
		width: 500px;
		height: auto;
		display: flex;
		flex-direction: column;
		background: white;
		margin: 0 auto;
	}
`;

const FormHeader = styled.div`
	text-align: center;
	font-size: 24px;
`;

const FormWrapper = styled.div``;

export default App;

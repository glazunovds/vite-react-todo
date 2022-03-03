import { FC, useCallback } from 'react';
import styled from 'styled-components/macro';

import { ListItem } from '../App';
import { Item } from './Item';

interface Props {
	items: ListItem[];
	onRemove: (item: ListItem) => void;
}

const TodoList: FC<Props> = ({ items, onRemove }) => {
	const renderItem = useCallback((item: ListItem, index: number) => {
		return <Item key={item.id} id={item.id} value={item.value} onRemove={onRemove} />;
	}, []);

	return (
		<Root>
			<List>{items.map((item, i) => renderItem(item, i))}</List>
		</Root>
	);
};

const Root = styled.div``;

const List = styled.ul`
	margin: 0;

	.list-item {
		display: flex;
		justify-content: space-between;
	}
`;

export default TodoList;

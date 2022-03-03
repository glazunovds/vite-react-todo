import produce from 'immer';
import { FC, useCallback } from 'react';
import styled from 'styled-components/macro';

import { ListItem } from '../App';
import { Item } from './Item';

interface Props {
	items: ListItem[];
	onRemove: (item: ListItem) => void;
	setItems: (items: ListItem[]) => void;
}

const TodoList: FC<Props> = ({ items, onRemove, setItems }) => {
	const moveItem = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			setItems(
				produce(items, (draft) => {
					draft.splice(dragIndex, 1);
					draft.splice(hoverIndex, 0, items[dragIndex]);
				}),
			);
		},
		[setItems, items],
	);

	return (
		<Root>
			<List>
				{items.map((item, i) => (
					<Item
						key={item.id}
						id={item.id}
						value={item.value}
						onRemove={onRemove}
						index={i}
						moveItem={moveItem}
					/>
				))}
			</List>
		</Root>
	);
};

const Root = styled.div``;

const List = styled.ul`
	margin: 0;
	padding: 6px;
`;

export default TodoList;

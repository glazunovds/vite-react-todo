import DeleteIcon from '@mui/icons-material/Delete';
import { SvgIcon } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Identifier, XYCoord } from 'dnd-core';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components/macro';

import { ListItem } from '../App';

export interface ItemProps {
	id: string;
	value: string;
	onRemove: (item: ListItem) => void;
	index: number;
	moveItem: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
	index: number;
	id: string;
	type: string;
}

export const Item: FC<ItemProps> = ({ id, value, onRemove, index, moveItem }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [{ handlerId }, drop] = useDrop<DragItem, null, { handlerId: Identifier | null }>({
		accept: 'item',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			moveItem(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'item',
		item: () => {
			return { id, index };
		},
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	const handleRemove = () => {
		onRemove({ id: id, value: value });
	};

	return (
		<Div vis={opacity} ref={ref} data-handler-id={handlerId}>
			<Li>
				<div>{value}</div>
				<SvgIcon
					component={DeleteIcon}
					sx={{ color: pink[500] }}
					className='app-icon'
					type='button'
					onClick={handleRemove}
				>
					<></>
				</SvgIcon>
			</Li>
		</Div>
	);
};

const Li = styled.li`
	display: flex;
	justify-content: space-between;
`;

const Div = styled.div<{ vis: number }>`
	border: 1px dashed gray;
	padding: 0.5rem 1rem;
	margin-bottom: 0.5rem;
	background-color: white;
	cursor: move;
	user-select: none;
	opacity: ${({ vis }) => vis};
`;

import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress, SvgIcon } from '@mui/material';
import { pink } from '@mui/material/colors';
import useAxios from 'axios-hooks';
import { Identifier, XYCoord } from 'dnd-core';
import { Images } from 'giphy-api';
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
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));
	const handleRemove = () => {
		onRemove({ id: id, value: value });
	};

	const [{ data, loading, error }] = useAxios<{ data: { images: Images } }>(
		`https://api.giphy.com/v1/gifs/random?api_key=${
			import.meta.env.VITE_GIPHY_API_KEY
		}&rating=g&tag=${encodeURIComponent(value)}`,
		{ useCache: false },
	);

	return (
		<Div vis={opacity} loadingPOSHELNAHUI={loading} ref={ref} data-handler-id={handlerId}>
			<Li>
				<div className='first-wrapper'>
					<div className='app-image'>
						<div className='overlay giphy-image' />
						<CircularProgress className='app-loader' />
						<img
							src={
								!loading && !!data?.data.images
									? data?.data.images.fixed_height_small.url
									: 'https://sun9-8.userapi.com/impf/RnJL30b5vRYl3Ga3nfnRU7XjrjcwWqyYFFVl1w/WTERrlQLYLU.jpg?size=313x311&quality=96&sign=9c161e962e5f433402dc550b46f0af64&type=album'
							}
							alt=''
							className='giphy-image'
						/>
					</div>
					<div>{value}</div>
				</div>
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

const Div = styled.div<{ vis: number; loadingPOSHELNAHUI: boolean }>`
	border: 1px dashed gray;
	padding: 0.5rem 1rem;
	margin-bottom: 0.5rem;
	background-color: white;
	cursor: move;
	user-select: none;
	opacity: ${({ vis }) => vis};

	.first-wrapper {
		display: inline-flex;
		flex: 1;
	}

	.app-image {
		position: relative;

		.overlay {
			position: absolute;
			background: white;
			z-index: 1;
			display: ${({ loadingPOSHELNAHUI }) => (!loadingPOSHELNAHUI ? 'none' : 'block')};
		}

		.giphy-image {
			width: 50px;
			height: 50px;
			min-width: 50px;
			min-height: 50px;
			padding-right: 10px;
		}

		.app-loader {
			position: absolute;
			background: white;
			z-index: 1;
			display: ${({ loadingPOSHELNAHUI }) => (!loadingPOSHELNAHUI ? 'none' : 'block')};
			width: 25px !important;
			height: 25px !important;
			left: 12px;
			top: 12px;
		}
	}
`;

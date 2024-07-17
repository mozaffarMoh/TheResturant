import { Avatar, Grid, Paper } from '@mui/material';

interface IProps {
  item: { id: number; name: string; image: string; position: string };
}

export default function MentorListItem({ item }: IProps) {
  return (
    <div
      key={item.id}
      className="sm-flex-col-col-center-center mb-2 "
    >
      <Avatar
        alt={item.name}
        src={item.image}
        sx={{ width: 100, height: 100 }}
      />
      <div className="text-reg-high">{item.name}</div>
      <div className="text-reg-fw500 line-h-0">{item.position}</div>
    </div>
  );
}

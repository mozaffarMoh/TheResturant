import { Avatar, Grid, Paper } from '@mui/material';

interface IProps {
  items: { id: number; name: string; image: string; position: string }[];
}

export default function MentorListItem({ items }: IProps) {
  return (
    <div className="md-flex-row-col-center-center gap4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="sm-flex-col-col-center-center"
        >
          <Avatar
            alt={item.name}
            src={item.image}
            sx={{ width: 100, height: 100 }}
          />
          <div className="text-reg-high">{item.name}</div>
          <div className="text-reg-fw500 line-h-0">{item.position}</div>
        </div>
      ))}
    </div>
  );
}

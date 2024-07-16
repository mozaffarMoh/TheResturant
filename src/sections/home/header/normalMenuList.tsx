import { ListItemText, MenuItem } from '@mui/material';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';
import Link from 'next/link';

interface IProps {
  indexKey: number;
  href: string;
  title: string;
}

const NormalMenuList = ({ indexKey, href, title }: IProps) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <MenuItem
      key={indexKey}
      className={`${styles.menuListItem} ${isActive(href) && styles.active}`}
    >
      <Link
        href={href}
        style={{ all: 'inherit' }}
      >
        <ListItemText>{title}</ListItemText>
      </Link>
    </MenuItem>
  );
};

export default NormalMenuList;

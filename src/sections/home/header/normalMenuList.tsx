import { ListItemText, MenuItem } from '@mui/material';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface IProps {
  indexKey: number;
  href: string;
  title: string;
}

const NormalMenuList = ({ indexKey, href, title }: IProps) => {
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
    <MenuItem
      key={indexKey}
      className={`${styles.menuListItem} ${isActive(href) && styles.active}`}
    >
      <Link
        href={`/${langCookie}/${href}`}
        style={{ all: 'inherit', border: 'none' }}
      >
        <ListItemText>{title}</ListItemText>
      </Link>
    </MenuItem>
  );
};

export default NormalMenuList;

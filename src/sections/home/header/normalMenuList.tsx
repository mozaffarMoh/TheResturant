import { ListItemText, MenuItem } from '@mui/material';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface IProps {
  indexKey: number;
  href: string;
  title: string;
}

const NormalMenuList = ({ indexKey, href, title }: IProps) => {
  const pathname = usePathname();

  const [isActive, setIsActive] = useState(false);

  const checkActive = () => {
    const pathPieces = href.split('/');
    if (
      pathPieces[3] &&
      (pathPieces[3] == 'events-workshops' ||
        pathPieces[3] == 'book-facility' ||
        pathPieces[3] == 'mentors')
    ) {
      return pathname.includes(pathPieces[3]);
    } else {
      return pathname == href;
    }
  };

  useEffect(() => {
    if (checkActive()) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname]);

  return (
    <MenuItem
      key={indexKey}
      className={`${styles.menuListItem} ${isActive && styles.active}  ${styles.menuListMargin}`}
    >
      <Link
        href={href}
        style={{ all: 'inherit', border: 'none' }}
      >
        <ListItemText>{title}</ListItemText>
      </Link>
    </MenuItem>
  );
};

export default NormalMenuList;

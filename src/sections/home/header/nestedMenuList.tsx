import { Button, Menu, MenuItem } from '@mui/material';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface IProps {
  title: string;
  open: boolean;
  anchorEl: null | HTMLElement;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
  links: { id: number; path: string; value: string }[];
}

const NestedMenuList = ({
  title,
  open,
  anchorEl,
  handleClick,
  handleClose,
  links,
}: IProps) => {
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <Button
        onClick={handleClick}
        className={styles.menuListItem}
        sx={{
          all: 'inherit',
        }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {title}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {' '}
        {links?.map((item, i: number) => (
          <Link
            key={i}
            href={`/${langCookie}/${item.path}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <MenuItem
              key={item.id}
              onClick={handleClose}
              href={`/${langCookie}/${item.path}`}
            >
              {item.value}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  );
};

export default NestedMenuList;

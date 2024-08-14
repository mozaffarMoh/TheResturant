import { Button, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  let isArabic = pathname.startsWith('/ar');
  const isScreen1100 = useMediaQuery('(max-width:1100px)');
  const checkActive = () =>
    links.some((link: any) => pathname.includes(link.path));

  const isListActive = (path: string) => {
    if (pathname.includes(path)) {
      return true;
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
    <>
      <Button
        onClick={handleClick}
        className={`${styles.menuListItem} ${isActive && styles.active}`}
        style={{
          fontSize: '16px',
          margin: isScreen1100 ? '0px 18px' : '3px 5px 0px 5px',
        }}
        endIcon={
          <KeyboardArrowDownIcon
            sx={{
              marginRight: isArabic ? '5px' : '',
              marginLeft: !isArabic ? '5px' : '',
            }}
          />
        }
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
            href={item.path}
            style={{
              textDecoration: 'none',
              color: isListActive(item.path) ? 'red' : 'inherit',
            }}
          >
            <MenuItem
              key={item.id}
              onClick={handleClose}
              href={item.path}
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

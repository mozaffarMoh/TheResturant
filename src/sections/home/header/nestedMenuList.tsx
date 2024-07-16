import { Button, ListItemText, Menu, MenuItem } from '@mui/material';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
        {links?.map((item) => (
          <MenuItem
            key={item.id}
            onClick={handleClose}
          >
            {item.value}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NestedMenuList;

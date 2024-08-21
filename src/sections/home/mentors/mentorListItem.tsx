import { domain } from '@/base-api/endPoints';
import { DefautImage2 } from '@/constant/images';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function MentorListItem({ item }: any) {
  const router = useRouter();
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  let imageURL =
    item?.user?.media?.length > 0 && item?.user?.media[0]?.url
      ? domain + item?.user?.media[0]?.url
      : DefautImage2;
  const ProfessionName = item?.user?.groups?.[0]?.name || '';

  return (
    <div
      className="sm-flex-col-col-center-center mb-2 "
      onClick={() => router.push(`/${langCookie}/home/mentors/${item.slug}`)}
      style={{ cursor: 'pointer' }}
    >
      <Avatar
        alt={'Avatar'}
        src={imageURL}
        sx={{ width: 100, height: 100 }}
      />
      <div className="text-reg-high">{item?.user?.name}</div>
      <div className="text-reg-fw500 line-h-0">{ProfessionName}</div>
    </div>
  );
}

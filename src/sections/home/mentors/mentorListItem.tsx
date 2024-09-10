import { domain } from '@/base-api/endPoints';
import { DefautImage2 } from '@/constant/images';
import { Avatar } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

export default function MentorListItem({ item, key }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const langCurrent = pathname?.slice(1, 3) || 'en';
  let imageURL =
    item && item?.user?.media?.image?.[0]?.url
      ? domain + item?.user?.media?.image?.[0]?.url
      : DefautImage2;

  let professions = item?.user?.groups
    ? item?.user?.groups.map((item: any, i: number) => {
        let comma = i > 0 ? ', ' : '';
        return comma + item?.name;
      })
    : [];

  let professionsList =
    professions?.join('').length < 25
      ? professions
      : professions.join('')?.slice(0, 25) + '...';

  let name =
    item?.user?.name && item?.user?.name.length > 15
      ? item?.user?.name?.slice(0, 15) + '...'
      : item?.user?.name;

  return (
    <div
      key={key}
      className="sm-flex-col-col-center-center mb-2 "
      onClick={() => router.push(`/${langCurrent}/home/mentors/${item.slug}`)}
      style={{ cursor: 'pointer' }}
    >
      <Avatar
        alt={'Avatar'}
        src={imageURL}
        sx={{ width: 100, height: 100 }}
      />
      <div className="text-reg-high">{name}</div>
      <div className="text-reg-fw500 line-h-0">{professionsList}</div>
    </div>
  );
}

import { useUser } from '@/lib/store/user';
import Image from 'next/image';

const Profile = () => {
    const user = useUser((state) => state.user);
    return (
        <div>
            <Image src={user?.user_metadata.avatar_url} alt='userImage'
                width={50}
                height={50}
                className='rounded-full ring-2 ring-green-500'
            />
        </div>
    )
}

export default Profile

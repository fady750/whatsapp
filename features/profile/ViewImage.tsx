import Spinner from '@/app/_components/Spinner';
import Popover from '@mui/material/Popover';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function ViewImage({anchorEl, handleClose}:{anchorEl:any, handleClose:()=>void, }){
    
    const open = Boolean(anchorEl);
    const {data, status} = useSession();
    if(anchorEl === null)return;
    if(status === "loading") return<Spinner/>;
    const user = data?.user
    
    return(
        <Popover 
            open={open}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={{
                top: window.innerHeight / 2,
                left: window.innerWidth / 2,
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            PaperProps={{
                sx: {
                    borderRadius: '18px',
                    width: '50vw',
                    height: '90vh',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
                    overflow: 'hidden',
                },
            }}
        >
            <div className='w-full h-full relative' >
                <div className='w-full h-full absolute top-0 left-0 bg-black/10' />
                <Image
                    fill
                    className=' aspect-square'
                    src={user?.avatar_url}
                    alt='user Image'
                    quality={100}
                />
            </div>
        </Popover>
    )
}


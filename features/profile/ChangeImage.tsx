'use client';

import { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import ChangeImageDialog from './ChangeImageDialog';

export default function ChangeImage() {
  const [ anchorEl , setAnchorEl ] = useState<HTMLElement | null>(null);

  function handleOpen(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
        <div
            onClick={handleOpen}
            className="absolute h-[128px] w-[128px] cursor-pointer text-center rounded-full flex items-center justify-center bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-600"
        >
            <div className="flex flex-col items-center justify-center">
            <ImageIcon fontSize="small" />
            <p className="w-6.5 text-right text-[12px] [word-spacing:0.2rem]">
                change profile photo
            </p>
            </div>
        </div>
        <ChangeImageDialog anchorEl={anchorEl} handleClose={handleClose} />
    </>
  );
}

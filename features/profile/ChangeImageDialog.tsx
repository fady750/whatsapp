import Popover from '@mui/material/Popover';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState, useRef } from 'react';
import ViewImage from './ViewImage';
import UploadImage, { type UploadImageRef } from './UploadImage';
import {deleteProfileImageAction} from "@/app/_lib/action"
import { useSession } from 'next-auth/react';

export default function ChangeImageDialog({anchorEl, handleClose}:{anchorEl: HTMLElement | null; handleClose: () => void})
{
    const [ anchorElViewImage , setAnchorElViewImage ] = useState<HTMLElement | null>(null);
    const [ uploadDialogOpen, setUploadDialogOpen ] = useState(false);
    const uploadImageRef = useRef<UploadImageRef>(null);
    const {update} = useSession();
    
    const open = Boolean(anchorEl);
    // view image
    function handleOpenViewImage(e: React.MouseEvent<HTMLElement>) {
        handleClose()
        setAnchorElViewImage(e.currentTarget);
    }
    
    function handleCloseViewImage() {
        setAnchorElViewImage(null);
    }

    function handleOpenUpload() {
        handleClose();
        setUploadDialogOpen(true);
    }

    function handleCloseUploadDialog() {
        setUploadDialogOpen(false);
        uploadImageRef.current?.reset();
    }

    async function handleRemoveImage(){
        const newImageUrl =  await deleteProfileImageAction();
        await update({
            user: {
                avatar_url: newImageUrl,
            }
        });
        handleClose();
    }
    
    return(
        <>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                PaperProps={{
                sx: {
                    backgroundColor: '#2A2F32',
                    borderRadius: '8px',
                    minWidth: '220px',
                    width: 'fit-content',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.35)',
                    overflow: 'hidden',
                },
                }}
            >
                <div className="flex flex-col p-1 text-primary-100">
                    <button
                        className="px-4 py-2.5 text-left hover:bg-primary-150 transition-colors cursor-pointer text-sm flex items-center justify-start gap-2"
                        onClick={handleOpenViewImage}
                        type="button"
                    >
                        <RemoveRedEyeOutlinedIcon/>
                        <span>  View photo </span>
                    </button>
                    <button
                        className="px-4 py-2.5 text-left  hover:bg-primary-150 transition-colors cursor-pointer text-sm flex items-center justify-start gap-2"
                        onClick={handleClose}
                        type="button"
                    >
                        <CameraAltOutlinedIcon/>
                        <span> Take photo </span>
                    </button>
                    <button
                        className="px-4 py-2.5 text-left hover:bg-primary-150 transition-colors cursor-pointer text-sm flex items-center justify-start gap-2"
                        onClick={handleOpenUpload}
                        type="button"
                    >
                        <FolderCopyOutlinedIcon/>
                        <span>Upload photo </span>
                    </button>
                    <button
                            className="px-4 py-2.5 text-left  rounded-sm hover:bg-red-500 transition-colors cursor-pointer text-sm flex items-center justify-start gap-2"
                            onClick={handleRemoveImage}
                            type="button"
                        >
                            <DeleteOutlineOutlinedIcon/>
                            <span> Remove photo </span>
                    </button>
                </div>
            </Popover>
            <ViewImage anchorEl={anchorElViewImage} handleClose={handleCloseViewImage}/>

            <Dialog
                open={uploadDialogOpen}
                onClose={handleCloseUploadDialog}
                PaperProps={{
                    sx: {
                        backgroundColor: '#2A2F32',
                        borderRadius: '8px',
                        minWidth: '280px',
                        maxWidth: '90vw',
                    },
                }}
                >
                    <DialogTitle className="text-primary-250">Upload photo</DialogTitle>
                    <DialogContent>
                        <UploadImage
                            ref={uploadImageRef}
                            onFileSelected={(file) => {
                                // TODO: upload file to backend, then uploadImageRef.current?.reset()
                                void file;
                            }}
                            showPreview={true}
                        />
                    </DialogContent>
            </Dialog>
            
        </>
    )
}
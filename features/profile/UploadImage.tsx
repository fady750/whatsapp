import {useRef,useState,useCallback,useImperativeHandle,forwardRef,} from 'react';
import {updateProfileImageAction} from "@/app/_lib/action";
import { useSession } from 'next-auth/react';


    export type UploadImageProps = {
        /** Called when user selects an image file. */
        onFileSelected?: (file: File) => void;
        /** If true, show a simple preview of the selected image. */
        showPreview?: boolean;
        /** Custom class for the clickable upload area. */
        className?: string;
        /** Disable choosing another file while uploading. */
        disabled?: boolean;
    };
    
    export type UploadImageRef = {
        /** Clear selected file and preview. Call after successful upload. */
        reset: () => void;
        /** Currently selected file, if any. */
        getFile: () => File | null;
    };

    const UploadImage = forwardRef<UploadImageRef, UploadImageProps>(
   function UploadImage(
        {
            onFileSelected,
            showPreview = true,
            className = '',
            disabled = false,
        },
        ref
    ) {
        const inputRef = useRef<HTMLInputElement>(null);
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        const [preview, setPreview] = useState<string | null>(null);
        const [error, setError] = useState<string | null>(null);
        const {update} = useSession()
    
        const clearPreview = useCallback(() => {
            setPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
            });
            setSelectedFile(null);
            setError(null);
        }, []);
    
        const reset = useCallback(() => {
            clearPreview();
            if (inputRef.current) {
            inputRef.current.value = '';
            }
        }, [clearPreview]);
    
        useImperativeHandle(
            ref,
            () => ({
            reset,
            getFile: () => selectedFile,
            }),
            [reset, selectedFile]
        );
    
        const handleChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
    
            setError(null);
    
            // Revoke previous preview
            setPreview((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return null;
            });
    
            // Hard validation: images only
            if (!file.type.startsWith('image/')) {
                setError('Please select a valid image file.');
                setSelectedFile(null);
                return;
            }
    
            setSelectedFile(file);
    
            if (showPreview) {
                setPreview(URL.createObjectURL(file));
            }
    
            onFileSelected?.(file);
            },
            [onFileSelected, showPreview]
        );
    
        const handleClick = () => {
            if (disabled) return;
            inputRef.current?.click();
        };

        async function handleUploadImage(){
            if(selectedFile === null) return;
            const imageURL = await updateProfileImageAction(selectedFile);
            await update({
                user: {
                    avatar_url: imageURL,
                }
            });
        }

    return (
        <div className={className}>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                aria-label="Upload image"
            />
    
            {!selectedFile ? (
                <button
                type="button"
                onClick={handleClick}
                disabled={disabled}
                className="w-full px-4 py-3 text-left text-primary-250 hover:bg-primary-150 transition-colors cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                Choose a photo
                </button>
            ) : (
                <div className="p-4 space-y-3">
                {showPreview && preview && (
                    <div className="rounded-lg overflow-hidden bg-primary-150 max-h-48 flex justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={preview}
                        alt="Preview"
                        className="max-h-48 object-contain"
                    />
                    </div>
                )}
    
                <p
                    className="text-primary-250 text-sm truncate"
                    title={selectedFile.name}
                >
                    {selectedFile.name}
                </p>
    
                {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                )}
    
                <div className="flex items-center w-full gap-6 justify-between">
                    <div className=' space-x-1' >
                        <button
                            type="button"
                            onClick={handleClick}
                            disabled={disabled}
                            className="text-primary-200 text-sm hover:underline disabled:opacity-50"
                            >
                            Choose another
                        </button>
                        <button
                            type="button"
                            onClick={reset}
                            className="text-primary-100 text-sm hover:underline"
                            >
                            Clear
                        </button>
                    </div>
                    <button onClick={handleUploadImage} className='py-2 px-1 rounded-sm cursor-pointer bg-primary-200 text-sm disabled:opacity-50 '>Uploading Image</button>
                </div>
                </div>
            )}
            </div>
        );
    }
);

    export default UploadImage;

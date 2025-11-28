import IconContainer from '@/shared/ui/IconContainer';
import { EmailIcon, UserIcon } from "@/shared/ui/Icons";
import TextField from '@mui/material/TextField';
import { InputAndIconContainer } from '@/shared/ui/InputContainer';

export default function AddNewContactForm(){
    return(
        <form className='flex pt-6 flex-col items-center gap-8 text-primary-250 w-full' >
                <InputAndIconContainer>
                    <IconContainer styles='items-end!' >
                        <UserIcon/>
                    </IconContainer>
                    <div className='  w-full'>
                        <TextField
                            variant="standard"
                            fullWidth
                            color="success"
                            label="First Name"
                            InputProps={{
                                classes: {
                                    input: "text-primary-250!",
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    color: "var(--my-input-border)",
                                    "&.Mui-focused": { color: "var(--my-input-border-active)" },
                                    "&.MuiInputLabel-shrink": { color: "var(--my-input-border-active)" },
                                    "&:hover": { color: "var(--my-input-border-active)" },
                                }
                            }}
                            sx={{
                                "& .MuiInput-root": {
                                "&:before": {
                                    borderBottomColor: "var(--my-input-border)",  
                                    borderBottomWidth:"2px"
                                },
                                "&:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "var(--my-input-border-active)",
                                },
                                "&.Mui-focused:after": {
                                    borderBottomColor: "var(--my-input-border-active)", 
                                },
                                },
                            }}
                        />
                    </div>
                </InputAndIconContainer>
                <InputAndIconContainer>
                    <IconContainer styles='invisible!' >
                        <UserIcon/>
                    </IconContainer>
                        <TextField
                            variant="standard"
                            fullWidth
                            color="success"
                            label="Last Name"
                            InputProps={{
                                classes: {
                                    input: "text-primary-250!",
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    color: "var(--my-input-border)",
                                    "&.Mui-focused": { color: "var(--my-input-border-active)" },
                                    "&.MuiInputLabel-shrink": { color: "var(--my-input-border-active)" },
                                    "&:hover": { color: "var(--my-input-border-active)" },
                                }
                            }}
                            sx={{
                                "& .MuiInput-root": {
                                "&:before": {
                                    borderBottomColor: "var(--my-input-border)",  
                                    borderBottomWidth:"2px"
                                },
                                "&:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "var(--my-input-border-active)",
                                },
                                "&.Mui-focused:after": {
                                    borderBottomColor: "var(--my-input-border-active)", 
                                },
                                },
                            }}
                        />
                </InputAndIconContainer>
                <InputAndIconContainer>
                    <IconContainer styles='items-end!' >
                        <EmailIcon/>
                    </IconContainer>
                    <TextField
                            variant="standard"
                            fullWidth
                            color="success"
                            label="Email"
                            InputProps={{
                                classes: {
                                    input: "text-primary-250!",
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    color: "var(--my-input-border)",
                                    "&.Mui-focused": { color: "var(--my-input-border-active)" },
                                    "&.MuiInputLabel-shrink": { color: "var(--my-input-border-active)" },
                                    "&:hover": { color: "var(--my-input-border-active)" },
                                }
                            }}
                            sx={{
                                "& .MuiInput-root": {
                                "&:before": {
                                    borderBottomColor: "var(--my-input-border)",  
                                    borderBottomWidth:"2px"
                                },
                                "&:hover:not(.Mui-disabled):before": {
                                    borderBottomColor: "var(--my-input-border-active)",
                                },
                                "&.Mui-focused:after": {
                                    borderBottomColor: "var(--my-input-border-active)", 
                                },
                                },
                            }}
                        />
                </InputAndIconContainer>
        </form>
    )
}
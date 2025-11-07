'use client'
import { OutlinedInput } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InputAdornment from '@mui/material/InputAdornment';
export default function SearchInput(){
    return(
        <div className="px-[20px] mb-[5px] relative z-100 flex h-[44px]" >
            <OutlinedInput
            size="small"
            id="search"
            placeholder="Search or start new chat"
            className="text-primary-50"
            sx={{backgroundColor:"#373737", width:"100%",height:"40px", borderRadius:"100px", color:"#f9f9f9", outlineColor:"#21C063", ":focus":"#21C063" }}
            startAdornment={
                <InputAdornment position="start" sx={{color:"#f9f9f9", borderColor:"#21C063"}}>
                    <SearchRoundedIcon fontSize="small" />
                </InputAdornment>
            }
            inputProps={{
                'aria-label': 'search',
            }}
            />
        </div>
    )
}
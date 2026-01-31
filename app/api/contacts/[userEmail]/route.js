import { getAllUserContact } from "@/app/_lib/data-service"

export async function GET(request, {params}) {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");
    try{
        const data = await getAllUserContact(userEmail);
        return Response.json(data)
    }
    catch{
        return Response.json({message:"there is something wrong in fetch data"})
    }

}
import { apiSiteSettings } from "@/services/db/site-settings";
import { NextResponse } from "next/server";

export async function GET(){
    const {getAllAvailablePaymentMethodSettings} = apiSiteSettings;
    const data = await getAllAvailablePaymentMethodSettings()
    return NextResponse.json(data)
}
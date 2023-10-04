export default async function getSessionDataAddress(sessionToken:any) {
    if (sessionToken) {
        const userAddrheaderRes = await fetch(`https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/user/addresses`, {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
        return userAddrheaderRes.json();
    }
}


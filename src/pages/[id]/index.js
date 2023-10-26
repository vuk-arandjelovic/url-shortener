//getuje ID (short url) iz linka, dodaje count analytic i redirectuje na long url
import React, {useEffect} from "react"
import { useRouter } from "next/router"

const Redirect = () => {
    const router = useRouter();
    const {id} = router.query;
    const isValidUrl = (string) => {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    useEffect(()=>{
        if(!id) return

        const data = JSON.parse(window.localStorage.getItem("data"))
        
        for (let index = 0; index < data.length; index++) {
            if(data[index].short_url == id){ // nadjem ga u dati
                console.log(data[index].count);
                data[index].count = parseInt(data[index].count) +1; // dodam count
                console.log(data[index].count);
                
                console.log(data[index],isValidUrl(data[index].long_url));

                if(isValidUrl(data[index].long_url)){ // proveravam jel valid
                    console.log("Redirected - Works!");
                    window.localStorage.setItem("data",JSON.stringify(data))  // setujem datu
                    console.log(window.localStorage.getItem("data"))
                    window.location.replace(data[index].long_url);  // redirect
                }else{
                    router.push("/404");
                }
                
            }
        }
        // NIKOLIN KOD KOJI kinda RADI ALI MI NE ODGOVARA     ( P r e v i s e   j e   d o b a r )
        //const url = data.filter((item)=> item?.short_url == id)?.[0]
        //console.log(url.count);
        //if(url != undefined){
        //    url.count = parseInt(url?.count) + 1;
        //}
        //console.log(url.count);
        //console.log(url, isValidUrl(url?.long_url))
        //if(url?.long_url){
        //    console.log(url.long_url)
        //    window.location.replace(url.long_url);
        //}else{
            // router.push("/404")
        //}

    }, [router])

    return <div></div>
}

export default Redirect

import { ApiFetcherOptions, ApiFetcherResults } from "@common/types/api"
import { API_URL, STOREFRONT_TOKEN } from "@framework/const"


//function responsible for fetching data

const fetchApi = async <T> ({
    
    query,
    variables } : ApiFetcherOptions
    ): Promise<ApiFetcherResults<T>> => {
    //const url = "http://localhost:4000/graphql"

    //request
    const res = await fetch(API_URL!, {
        method: "POST", //method-type of request
        headers: { //type of data you will get/format of the data
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN!
        },
        body: JSON.stringify({
            query,
            variables
        })
    })
    //extract data from the res/ call function json with returning promise that's why we put prior to it
    const { data, errors } = await res.json()


    // ?? is checking if the left hand expression is null or undefined -> if it is go with right
    // || is checking if the left hand expression is null, undefined, "", 0, false
    if (errors) {
        throw new Error(errors[0].message ?? errors.message)
    }

    return {data}
}


export default fetchApi
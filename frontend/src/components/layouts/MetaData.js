import { Helmet } from "react-helmet-async"

export default function MetaData({title}) {
    return (
        <Helmet>
            <title>{`${title} - AKASH_cart`}</title>
        </Helmet>
    )
}




//import { useEffect } from "react";
import type { InferGetStaticPropsType } from "next";
 import { getAllProducts } from "@framework/product";
 import { getConfig } from "@framework/api/config";
 import { Layout } from "@components/common/"
 import { ProductCard } from "@components/product";
 import { Grid, Hero, Marquee } from "@components/ui"




export async function getStaticProps() {
    const config = getConfig()
    const products = await getAllProducts(config) //fetch data from other file

    return {
        props: {
            products
        },
        revalidate: 4 * 60 * 60
    }
}

export default function Home({
    products
}: InferGetStaticPropsType<typeof getStaticProps>) {


    return (
            <>
                <Grid>
                    {products.slice(0,3).map(product => 
                    <ProductCard 
                        key={product.id}
                        product={product}
                    />
                    )}
                </Grid>
                <Hero
                    headline="NEXT_STORE"
                    description="Gummi bears tart dessert cake dragée. 
                    Soufflé icing biscuit lollipop cake halvah. Gingerbread 
                    liquorice dragée dragée jelly-o candy canes. Marzipan chocolate 
                    dessert carrot cake ice cream sweet. Oat cake topping halvah 
                    fruitcake shortbread muffin marshmallow chocolate bar lollipop. 
                    Toffee marzipan brownie chupa chups candy jelly beans cheesecake. 
                    Caramels lemon drops chupa chups topping cake caramels bonbon. 
                    Muffin tootsie roll danish apple pie jujubes cupcake jelly 
                    beans marshmallow. Macaroon muffin oat cake cake macaroon 
                    oat cake topping. Gingerbread carrot cake cake sugar plum marzipan 
                    donut tootsie roll dessert cookie."
                    />
                <Marquee>
                    { products.slice(0,3).map(product =>
                        <ProductCard
                        key={product.id}
                        variant = "slim"
                        product = {product}
                        />
                        )
                    }
                </Marquee>
                <Grid layout="B">
                    {products.slice(0,3).map(product => 
                    <ProductCard 
                        key={product.id}
                        product={product}
                    />
                    )}
                </Grid>
                <Marquee variant="secondary">
                    { products.slice(0,3).map(product =>
                        <ProductCard
                        key={product.id}
                        variant = "slim"
                        product = {product}
                        />
                        )
                    }
                </Marquee>
            </>
        
    )//to display objects inside a jsx, stringify them
}

Home.Layout = Layout
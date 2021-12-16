import React, {useContext} from "react";
import { Carousel } from "react-bootstrap";
import RecipeContext from "../context/RecipeContext";
import { IRecipe } from "../type";
import noImage from '../noImage.jpg'
import { useNavigate } from "react-router-dom";
import RecipeList from "./RecipeList";

const Home = () => {
    const { recipes } = useContext(RecipeContext);
    const emptyImage = noImage
    const navigate = useNavigate();

    const limitedRecipes = [...recipes].slice(0, 5);


    return (
        <div>
            <div className='carouselContainer' style={{borderRadius: "25px", overflow: 'hidden'}}>
                <Carousel variant='dark' style={{borderRadius: "25px"}}>
                    {limitedRecipes.map((recipe: IRecipe, i: number) => {
                        let image = ''
                        
                        if (recipe.image !== '' && recipe.image !== undefined) {
                            image = recipe.image;
                        } else {
                            image = emptyImage;
                        }
                        return (
                            <Carousel.Item>
                                <img src={image} className='d-block carouselItem w-100' style={{objectFit: 'cover', filter: 'blur(4px'}} onClick={ () => navigate(`/recipe/${recipe.id}`) }/>
                                <Carousel.Caption>
                                    <h3 style={{color: 'white' ,mixBlendMode: 'difference'}}>{recipe.name}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
            <br/>
            <RecipeList/>
        </div>
    )
}

export default Home;
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import {
  FontHeadingThree,
  FontCapition,
  FontBody,
} from "../../styles/typography";
import { ThemeButton } from "../Button/style";
import { DivContainer, CardDiv, Card, List } from "./style";

export const FoodList = () => {
  const { AddToCart, filteredFoods } = useContext(CartContext);

  return (
    <DivContainer>
      <List>
        {filteredFoods.map((el) => (
          <Card key={el.id}>
            <div>
              <img src={el.img} alt="" />
            </div>
            <CardDiv>
              <FontHeadingThree color="--gray100">{el.name}</FontHeadingThree>
              <FontCapition color="--gray50">{el.category}</FontCapition>
              <FontBody color="--green-primary">R${el.price}</FontBody>
              <ThemeButton
                onClick={() =>
                  filteredFoods.map((ele) => {
                    return el.id === ele.id ? AddToCart(el) : null;
                  })
                }
                type="button"
                buttonSize="sm"
              >
                Adicionar
              </ThemeButton>
            </CardDiv>
          </Card>
        ))}
      </List>
    </DivContainer>
  );
};
